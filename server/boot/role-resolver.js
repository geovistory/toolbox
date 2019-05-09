var _ = require('lodash');


module.exports = function (app) {
    var Role = app.models.Role;

    var getPkProject = (context, cb) => {

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
                }else{
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
            app.models.ProProject.findById(pkProject, function (err, project) {
                // A: The datastore produced an error! Pass error to callback
                if (err) return cb(err);
                // A: There's no project by this ID! Pass error to callback
                if (!project) return cb(new Error("Project not found"));

                // Step 2: check if User is part of the Team associated with this Project
                // (using count() because we only want to know if such a record exists)
                var PubAccountProjectRel = app.models.PubAccountProjectRel;
                PubAccountProjectRel.count({
                    account_id: accountId,
                    fk_project: pkProject
                }, function (err, count) {
                    // A: The datastore produced an error! Pass error to callback
                    if (err) return cb(err);

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

        })
    });
};