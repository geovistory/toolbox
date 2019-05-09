'use strict';

const Promise = require('bluebird');
const _ = require('lodash')

module.exports = function (InfTemporalEntity) {

  InfTemporalEntity.changeTeEntProjectRelation = function (pkProject, isInProject, data, ctx) {
    let requestedTeEnt;

    if (ctx && ctx.req && ctx.req.body) {
      requestedTeEnt = ctx.req.body;
    } else {
      requestedTeEnt = data;
    }

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    return InfTemporalEntity.changeProjectRelation(pkProject, isInProject, requestedTeEnt, ctxWithoutBody)
      .then(resultingEpr => {

        // attatch the new epr to the teEnt
        if (requestedTeEnt.entity_version_project_rels && resultingEpr) {
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
            return InfRole.changeRoleProjectRelation(pkProject, isInProject, role, ctxWithoutBody);

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


  InfTemporalEntity.findOrCreateInfTemporalEntity = function (pkProject, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    let requestedTeEnt;

    if (ctx && ctx.req && ctx.req.body) {
      requestedTeEnt = ctx.req.body;
    } else {
      requestedTeEnt = data;
    }

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    return InfTemporalEntity.resolveRoleValues(requestedTeEnt.te_roles).then(resolvedRoles => {

      const teEnWithResolvedRoles = {
        ...requestedTeEnt,
        te_roles: resolvedRoles
      }
      return InfTemporalEntity._findOrCreateTeEnt(InfTemporalEntity, pkProject, teEnWithResolvedRoles, ctxWithoutBody)
        .then((resultingTeEnts) => {

          //TODO pick first item of array
          const resultingTeEnt = resultingTeEnts[0];

          // if there are roles going out of the teEnt …
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
              return InfRole.findOrCreateInfRole(pkProject, role, ctxWithoutBody);
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

                // console.log(res)

                return [res];

              })
              .catch((err) => {
                console.error(err);
                return err;
              })
          }
        });

    }).catch(err => {
      console.error(err);
      return err
    })
  }

  InfTemporalEntity.resolveRoleValues = function (te_roles) {
    return new Promise((resolve, reject) => {
      if (!te_roles || !te_roles.length) resolve([])

      const te_roles_with_fk_entity = te_roles
        .filter(role => !!role.fk_entity)
        .map(role => ({ fk_property: role.fk_property, fk_entity: role.fk_entity }));

      const te_roles_without_fk_entity = te_roles.filter(role => !role.fk_entity);

      Promise.all(
        te_roles_without_fk_entity.map(role => {

          // Time Primitive
          if (role.time_primitive && Object.keys(role.time_primitive).length) {
            const InfTimePrimitive = InfTemporalEntity.app.models.InfTimePrimitive;

            return new Promise((res, rej) => {
              InfTimePrimitive.create(role.time_primitive)
                .then(obj => {
                  res({
                    fk_property: role.fk_property,
                    fk_entity: obj.pk_entity
                  })
                })
            })
          }

          // Language
          if (role.language && Object.keys(role.language).length) {
            const InfLanguage = InfTemporalEntity.app.models.InfLanguage;

            return new Promise((res, rej) => {
              InfLanguage.find({ "where": { "pk_entity": role.language.pk_entity } })
                .then(objs => {
                  res({
                    fk_property: role.fk_property,
                    fk_entity: objs[0].pk_entity
                  })
                })
            })
          }

          // Place
          if (role.place && Object.keys(role.place).length) {
            const InfPlace = InfTemporalEntity.app.models.InfPlace;

            return new Promise((res, rej) => {
              InfPlace.create(role.place)
                .then(obj => {
                  res({
                    fk_property: role.fk_property,
                    fk_entity: obj.pk_entity
                  })
                })
                .catch(err => {
                  reject(err)
                })
            })
          }

          // Appellation
          if (role.appellation && Object.keys(role.appellation).length) {
            const InfAppellation = InfTemporalEntity.app.models.InfAppellation;

            return new Promise((res, rej) => {
              InfAppellation.create(role.appellation)
                .then(obj => {
                  res({
                    fk_property: role.fk_property,
                    fk_entity: obj.pk_entity
                  })
                })
            })
          }

        })
      ).then(resolvedRoles => {
        resolve([...te_roles_with_fk_entity, ...resolvedRoles]);
      })
        .catch(error => reject(error))

    })
  }


  /**
   * internal function to get a rich object of project or repo.
   * a rich object of the TeEn with all its roles
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
   * remote method to get a rich object of project.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.nestedObjectOfProject = function (pkProject, pkEntity, cb) {
    const ofProject = true;
    return InfTemporalEntity.nestedObject(ofProject, pkProject, pkEntity, cb)
  }

  /**
   * remote method to get a rich object of project.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.nestedObjectOfRepo = function (pkEntity, cb) {
    const ofProject = true; // TODO: Check if this should be false
    const pkProject = undefined;
    return InfTemporalEntity.nestedObject(ofProject, pkProject, pkEntity, cb)
  }


  /**
   * Internal function to get graphs of project or repo.
   * a rich object of the TeEn with all its roles
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
   * Remote method to get graphs of project.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphsOfProject = function (pkProject, pkEntities, cb) {
    const ofProject = true;
    return InfTemporalEntity.graphs(ofProject, pkProject, pkEntities, cb)
  }

  /**
   * Remote method to get graphs of repo.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphsOfRepo = function (pkEntities, cb) {
    const ofProject = false;
    const pkProject = undefined;
    return InfTemporalEntity.graphs(ofProject, pkProject, pkEntities, cb)
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
    if (pkProject) {
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        "entity_version_project_rels": InfTemporalEntity.app.models.ProInfoProjRel.getJoinObject(ofProject, pkProject)
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