var _ = require('lodash');
const Promise = require('bluebird');

module.exports = function (app) {
  var Role = app.models.Role;

  Role.isAssociatedWithProject = (accountId, pkProject, cb) => {
    Role.app.models.ProProject.findById(pkProject, function (err, project) {
      // A: The datastore produced an error! Pass error to callback
      if (err)
        return cb(err);
      // A: There's no project by this ID! Pass error to callback
      if (!project)
        return cb(new Error("Project not found"));
      // Step 2: check if User is part of the Team associated with this Project
      // (using count() because we only want to know if such a record exists)
      var PubAccountProjectRel = app.models.PubAccountProjectRel;
      PubAccountProjectRel.count({
        account_id: accountId,
        fk_project: pkProject // TODO: CHECK ROLE HERE
      }, function (err, count) {
        // A: The datastore produced an error! Pass error to callback
        if (err)
          return cb(err);
        if (count > 0) {
          // A: YES. At least one Team associated with this User AND Project
          // callback with TRUE, user is role:`project_member`
          return cb(null, true);
        }
        else {
          // A: NO, User is not in this Project's Team
          // callback with FALSE, user is NOT role:`project_member`
          return cb(null, false);
        }
      });
    });
  }


  var getPkProject = (context, cb) => {
    // Q: Is the request related to a Data entity?
    if (context.model.base.modelName === 'DatEntity') {
      // A: Yes, it is about a dataEntity

      // Q: Is the request about to find a data entity ?
      if (context.method === 'findById') {
        // A: Yes, it is about finding a data entity by id

        // Step 1: find the record with the related namespace and the related project
        context.model.findComplex({
          "where": ['pk_entity', '=', context.modelId],
          "include": {
            "namespace": {
              "$relation": {
                "name": "namespace",
                "joinType": "left join",
                "orderBy": [{
                  "pk_entity": "asc"
                }]
              }
            }
          }
        }, function (err, result) {
          // A: The datastore produced an error! Pass error to callback
          if (err) return cb(err);
          // A: There's no record by this ID! Pass error to callback
          if (!result) return cb(new Error("Item not found"));

          //Q: does the record belong to a namespace that has a fk_project?
          //A: If so, returns the integer, else undefined
          return cb(null, parseInt(_.get(result, '[0].namespace.fk_project')))

        })

      }
      // Q: Does the request want to DELETE a record?
      else if (context.method === 'deleteById') {
        // A: Yes, it wants to delete a record
        // Step 1: find the record
        context.model.findById(context.modelId, function (err, result) {
          // A: The datastore produced an error! Pass error to callback
          if (err) return cb(err);
          // A: There's no record by this ID! Pass error to callback
          if (!result) return cb(new Error("Item not found"));

          //Q: does the record belong to a namespace
          if (result.fk_namespace) {
            // A: Yes, send get pk of project owning the namespace (back via callback)
            getNamespaceProjectPk(app, pkNamespace, cb);
          } else {
            // A: No. send back undefined
            return cb(null)
          }

        })
      }
      else if (context.method === 'bulkDelete') {

        context.model.findComplex({
          "where": ['pk_entity', 'IN', context.remotingContext.args.pks],
          "include": {
            "namespace": {
              "$relation": {
                "name": "namespace",
                "joinType": "left join",
                "orderBy": [{
                  "pk_entity": "asc"
                }]
              }
            }
          }
        }, function (err, result) {
          // A: The datastore produced an error! Pass error to callback
          if (err) return cb(err);
          // A: There's no record by this ID! Pass error to callback
          if (!result || !result.length) return cb(new Error("Items to delete or their namespaces were not found"));

          // Q: what projects do own this item?
          const projectPks = _.uniq(result.map(item => _.get(item, 'namespace.fk_project')));

          // Q: Are there excactly one project pk ?
          if (projectPks.length === 1 && typeof projectPks[0] === 'number') {
            // A: Yes, there is one valid project pk
            cb(null, projectPks[0])

          } else if (projectPks.length > 1) {

            // A: No, there are more than one projects, reject
            return cb('You cannot bulk delete data entities from different namespaces');
          } else {
            // A: No, something else went wrong
            return cb('Something went wrong when bulk deleting data entities. Check if they all have valid fk_namespace');

          }

        })

      } else {
        // A: No, it is no about finding a data entity by id

        // Q: Does the current request provide a PK of the Namespace it wants to access?
        const req = context.remotingContext.req;
        const pkNamespace = parseInt(
          _.get(req, 'query.pkNamespace') ||
          _.get(req, 'body.pkNamespace')
        );

        // A: No. No namespace pk provided, return error
        if (!pkNamespace) return cb('please provide a namespace key');

        // A: Yes, pkNamespace is provided

        // Q: To which project does the namespace belong?
        getNamespaceProjectPk(app, pkNamespace, cb);

      }
    } else {
      // A: No, it is not about a dataEntity


      // Q: Does the request want to DELETE a record?
      if (context.method === 'deleteById') {
        // A: Yes, it wants to delete a record
        // Step 1: find the record
        context.model.findById(context.modelId, function (err, result) {
          // A: The datastore produced an error! Pass error to callback
          if (err) return cb(err);
          // A: There's no record by this ID! Pass error to callback
          if (!result) return cb(new Error("Item not found"));

          //Q: does the record belong to a project
          if (result.fk_project) {
            // A: Yes, send pkProject back via callback
            return cb(null, result.fk_project)
          } else {
            // A: No. send back undefined
            return cb(null)
          }

        })
      } else {
        // A: No, it's not about deleting a record

        const req = context.remotingContext.req;

        // Q: Does the current request provide a PK of the project it wants to access?
        const pkProject = parseInt(
          _.get(req, 'query.pkProject') || // search pk_project in query, where arg is called pkProject
          _.get(req, 'query.pk_project') || // search pk_project in query, where arg is called pk_project
          _.get(req, 'body.fk_project') || // search pk_project in body, for example when an model object is sent
          _.get(req, 'body.entity_version_project_rels[0].fk_project') // searches in the entity_version_project_rel of the sent object
        );
        cb(null, pkProject)
      }
    }

  }

  Role.registerResolver('project_member', function (role, context, cb) {

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var accountId = context.accessToken.userId;
    if (!accountId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    getPkProject(context, function (err, pkProject) {
      if (err) return cb(err);

      if (!pkProject) {
        // A: No. This request does not provide a PK of the project
        return process.nextTick(() => cb(null, false));
      }

      // Q: Is the current logged-in user associated with this Project?
      // Step 1: lookup the requested project
      Role.isAssociatedWithProject(accountId, pkProject, cb);

    })
  });

};


function getNamespaceProjectPk(app, pkNamespace, cb) {
  app.models.DatNamespace.findById(pkNamespace, function (err, result) {
    // A: The datastore produced an error! Pass error to callback
    if (err)
      return cb(err);
    // A: There's no record by this ID! Pass error to callback
    if (!result)
      return cb(new Error("Item not found"));
    //Q: does the record belong to a namespace that has a fk_project?
    //A: If so, returns the integer, else undefined
    return cb(null, parseInt(_.get(result, 'fk_project')));
  });
}
