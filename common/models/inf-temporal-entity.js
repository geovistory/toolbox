'use strict';

const Promise = require('bluebird');

module.exports = function(InfTemporalEntity) {

  InfTemporalEntity.changeTeEntProjectRelation = function(projectId, isInProject, data, ctx) {
    let requestedTeEnt;

    if (ctx) {
      requestedTeEnt = ctx.req.body;
    } else {
      requestedTeEnt = data;
    }

    return InfTemporalEntity.changeProjectRelation(projectId, isInProject, requestedTeEnt)
      .then(resultingEpr => {

        // attatch the new epr to the teEnt
        if(requestedTeEnt.entity_version_project_rels && resultingEpr){
          requestedTeEnt.entity_version_project_rels = [resultingEpr];
        }


        if (requestedTeEnt.te_roles) {

          // prepare parameters
          const InfRole = InfTemporalEntity.app.models.InfRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          return Promise.map(requestedTeEnt.te_roles.filter(role => (role)), (role) => {

              // add role to project
              return InfRole.changeRoleProjectRelation(projectId, isInProject, role);

            })
            .then((roles) => {

              requestedTeEnt.te_roles = [];
              for (var i = 0; i < roles.length; i++) {
                const role = roles[i];
                if (role && role[0]) {
                  requestedTeEnt.te_roles.push(role[0]);
                }
              }

              return [requestedTeEnt];

            })
            .catch((err) => {
              return err;
            })

        } else {
          return [requestedTeEnt];
        }
      })
      .catch((err) => {
        return err;
      });

  }


  InfTemporalEntity.findOrCreateInfTemporalEntity = function(projectId, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    let requestedTeEnt;

    if (ctx) {
      requestedTeEnt = ctx.req.body;
    } else {
      requestedTeEnt = data;
    }

    return InfTemporalEntity.findOrCreatePeItOrTeEnt(InfTemporalEntity, projectId, dataObject)
      .then((resultingTeEnts) => {

        //TODO pick first item of array
        const resultingTeEnt = resultingTeEnts[0];

        // if there are roles going from the teEnt to a peIt …
        if (requestedTeEnt.te_roles) {

          // prepare parameters
          const InfRole = InfTemporalEntity.app.models.InfRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the teEnt will be
          // returned together with all nested items
          return Promise.map(requestedTeEnt.te_roles.filter(role => (role)), (role) => {
              // use the pk_entity from the created teEnt to set the fk_temporal_entity of the role
              role.fk_temporal_entity = resultingTeEnt.pk_entity;

              // find or create the Entity and the role pointing to the Entity
              return InfRole.findOrCreateInfRole(projectId, role);
            })
            .then((roles) => {

              //attach the roles to resultingTeEnt
              let res = resultingTeEnt.toJSON();
              res.te_roles = [];
              for (var i = 0; i < roles.length; i++) {
                const role = roles[i];
                if (role && role[0]) {
                  res.te_roles.push(role[0]);
                }
              }

              console.log(res)

              return [res];

            })
            .catch((err) => {
              return err;
            })
        }
      });

  }


  /**
   * nestedObject - get a rich object of the TeEn with all its
   * roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.nestedObject = function (ofProject, pkProject, pkEntity, cb) {

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": InfTemporalEntity.getIncludeObject(ofProject, pkProject)
    }

    return InfTemporalEntity.findComplex(filter, cb);
  }

    /**
   * graphs - get a rich object of the TeEn with all its
   * roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphs = function (ofProject, pkProject, pkEntities, cb) {

    const filter = {
      "where": ["pk_entity", "IN", pkEntities],
      "include": InfTemporalEntity.getIncludeObject(ofProject, pkProject)
    }

    return InfTemporalEntity.findComplex(filter, cb);
  }



  /**
   * Internal function to create the include property of 
   * a filter object for findComplex()
   * 
   * Usage: add the returned object to the include property of a persistent item relation
   * of findComplex() filter, e.g.:
   * {
   *    ...
   *    include: InfPersistentItem.getIncludeObject(true, 123)
   * }
   * 
   * @param ofProject {boolean}
   * @param project {number}
   * @returns include object of findComplex filter
   */
  InfTemporalEntity.getIncludeObject = function (ofProject, pkProject) {
    
    let projectJoin = {};
    
    // if a pkProject is provided, create the relation
    if(pkProject){
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        "entity_version_project_rels":InfTemporalEntity.app.models.InfEntityProjectRel.getJoinObject(ofProject, pkProject)
      }
    }
  

    return {
      ...projectJoin,
      "te_roles": {
        "$relation": {
          "name": "te_roles",
          "joinType": "inner join",
          "orderBy": [{
            "pk_entity": "asc"
          }]
        },
        ...projectJoin,
        "appellation": {
          "$relation": {
            "name": "appellation",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "language": {
          "$relation": {
            "name": "language",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "time_primitive": {
          "$relation": {
            "name": "time_primitive",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "place": {
          "$relation": {
            "name": "place",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        }
      }
    }
  }

};