'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const helpers = require('../helpers');
var SqlBuilderLbModels = require('../../dist/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;
var SqlTemporalEntityList = require('../../dist/server/sql-builders/sql-temporal-entity-list')
  .SqlTemporalEntityList;
var SqlTemporalEntityListAlternatives = require('../../dist/server/sql-builders/sql-temporal-entity-list-alternatives')
  .SqlTemporalEntityListAlternatives;
var SqlTemporalEntityOwnProperties = require('../../dist/server/sql-builders/sql-te-en-own-properties')
  .SqlTemporalEntityOwnProperties;

var SqlTeEnAddToProject = require('../../dist/server/sql-builders/sql-te-en-add-to-project')
  .SqlTeEnAddToProject;

module.exports = function(InfTemporalEntity) {
  InfTemporalEntity.temporalEntityList = function(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset,
    cb
  ) {
    const mainQuery = new SqlTemporalEntityList(
      InfTemporalEntity.app.models
    ).create(
      fkProject,
      fkSourceEntity,
      fkProperty,
      fkTargetClass,
      isOutgoing,
      limit,
      offset
    );
    const connector = InfTemporalEntity.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  InfTemporalEntity.alternativeTemporalEntityList = function(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset,
    cb
  ) {
    const mainQuery = new SqlTemporalEntityListAlternatives(
      InfTemporalEntity.app.models
    ).create(
      fkProject,
      fkSourceEntity,
      fkProperty,
      fkTargetClass,
      isOutgoing,
      limit,
      offset
    );
    const connector = InfTemporalEntity.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  InfTemporalEntity.findOrCreateInfTemporalEntities = function(
    pk_project,
    items,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const promiseArray = items.map((item, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfTemporalEntity.findOrCreateInfTemporalEntity(
          pk_project,
          item,
          context
        );
      });
      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfTemporalEntity.findOrCreateInfTemporalEntity = function(
    pkProject,
    data,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const dataObject = {
        pk_entity: data.pk_entity,
        notes: data.notes,
        fk_class: data.fk_class,
      };

      let requestedTeEnt;

      if (ctx && ctx.req && ctx.req.body) {
        requestedTeEnt = ctx.req.body;
      } else {
        requestedTeEnt = data;
      }

      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      InfTemporalEntity.resolveRoleValues(
        pkProject,
        requestedTeEnt.te_roles,
        ctxWithoutBody
      )
        .then(resolvedRoles => {
          const teEnWithResolvedRoles = {
            ...requestedTeEnt,
            te_roles: resolvedRoles,
          };
          InfTemporalEntity._findOrCreateTeEnt(
            InfTemporalEntity,
            pkProject,
            teEnWithResolvedRoles,
            ctxWithoutBody
          )
            .then(resultingEntities => {
              // pick first item of array
              const resultingEntity = resultingEntities[0];
              const res = helpers.toObject(resultingEntity);

              // Array of Promises
              const promiseArray = [];

              /******************************************
               * te_roles (= outgoing_roles)
               ******************************************/
              if (requestedTeEnt.te_roles) {
                // prepare parameters
                const InfRole = InfTemporalEntity.app.models.InfRole;

                //… filter roles that are truthy (not null), iterate over them,
                // return the promise that the teEnt will be
                // returned together with all nested items
                const promise = Promise.map(
                  requestedTeEnt.te_roles.filter(role => role),
                  role => {
                    // use the pk_entity from the created teEnt to set the fk_temporal_entity of the role
                    role.fk_temporal_entity = resultingEntity.pk_entity;

                    // find or create the Entity and the role pointing to the Entity
                    return InfRole.findOrCreateInfRole(
                      pkProject,
                      role,
                      ctxWithoutBody
                    );
                  }
                )
                  .then(roles => {
                    //attach the roles to resultingTeEnt
                    res.te_roles = [];
                    for (var i = 0; i < roles.length; i++) {
                      const role = roles[i];
                      if (role && role[0]) {
                        res.te_roles.push(role[0]);
                      }
                    }

                    return true;
                  })
                  .catch(err => reject(err));

                // add promise for outgoing_roles
                promiseArray.push(promise);
              }

              /******************************************
               * ingoing_roles
               ******************************************/
              if (requestedTeEnt.ingoing_roles) {
                // prepare parameters
                const InfRole = InfTemporalEntity.app.models.InfRole;

                //… filter roles that are truthy (not null), iterate over them,
                // return the promise that the teEnt will be
                // returned together with all nested items
                const promise = Promise.map(
                  requestedTeEnt.ingoing_roles.filter(role => role),
                  role => {
                    // use the pk_entity from the created teEnt to set the fk_temporal_entity of the role
                    role.fk_entity = resultingEntity.pk_entity;

                    // find or create the Entity and the role pointing to the Entity
                    return InfRole.findOrCreateInfRole(
                      pkProject,
                      role,
                      ctxWithoutBody
                    );
                  }
                )
                  .then(roles => {
                    //attach the roles to resultingTeEnt
                    res.ingoing_roles = [];
                    for (var i = 0; i < roles.length; i++) {
                      const role = roles[i];
                      if (role && role[0]) {
                        res.ingoing_roles.push(role[0]);
                      }
                    }

                    return true;
                  })
                  .catch(err => reject(err));

                // add promise for ingoing_roles
                promiseArray.push(promise);
              }

              if (promiseArray.length === 0) return resolve([res]);
              else
                return Promise.map(promiseArray, promise => promise).then(
                  () => {
                    resolve([res]);
                  }
                );
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  };

  InfTemporalEntity.resolveRoleValues = function(
    pkProject,
    te_roles,
    ctxWithoutBody
  ) {
    return new Promise((resolve, reject) => {
      if (!te_roles || !te_roles.length) resolve([]);

      const te_roles_with_fk_entity = te_roles
        .filter(role => !!role.fk_entity)
        .map(role => ({
          fk_property: role.fk_property,
          fk_entity: role.fk_entity,
        }));

      const te_roles_without_fk_entity = te_roles.filter(
        role => !role.fk_entity
      );

      Promise.all(
        te_roles_without_fk_entity.map(role => {
          // Time Primitive
          if (role.time_primitive && Object.keys(role.time_primitive).length) {
            const InfTimePrimitive =
              InfTemporalEntity.app.models.InfTimePrimitive;

            return new Promise((res, rej) => {
              InfTimePrimitive.create(role.time_primitive).then(obj => {
                res({
                  fk_property: role.fk_property,
                  fk_entity: obj.pk_entity,
                });
              });
            });
          }

          // Language
          if (role.language && Object.keys(role.language).length) {
            const InfLanguage = InfTemporalEntity.app.models.InfLanguage;

            return new Promise((res, rej) => {
              InfLanguage.find({
                where: { pk_entity: role.language.pk_entity },
              }).then(objs => {
                res({
                  fk_property: role.fk_property,
                  fk_entity: objs[0].pk_entity,
                });
              });
            });
          }

          // Place
          if (role.place && Object.keys(role.place).length) {
            const InfPlace = InfTemporalEntity.app.models.InfPlace;

            return new Promise((res, rej) => {
              InfPlace.create(role.place)
                .then(obj => {
                  res({
                    fk_property: role.fk_property,
                    fk_entity: obj.pk_entity,
                  });
                })
                .catch(err => {
                  reject(err);
                });
            });
          }

          // Appellation
          if (role.appellation && Object.keys(role.appellation).length) {
            const InfAppellation = InfTemporalEntity.app.models.InfAppellation;

            return new Promise((res, rej) => {
              InfAppellation.create(role.appellation).then(obj => {
                res({
                  fk_property: role.fk_property,
                  fk_entity: obj.pk_entity,
                });
              });
            });
          }

          // // Temporal Entity
          // if (role.temporal_entity && Object.keys(role.temporal_entity).length) {

          //   return new Promise((res, rej) => {
          //     InfTemporalEntity.findOrCreateInfTemporalEntity(pkProject, role.temporal_entity, ctxWithoutBody)
          //       .then(obj => {
          //         const fk_entity = obj[0].pk_entity;
          //         res({
          //           fk_property: role.fk_property,
          //           fk_entity
          //         })
          //       })
          //   })
          // }
        })
      )
        .then(resolvedRoles => {
          resolve([...te_roles_with_fk_entity, ...resolvedRoles]);
        })
        .catch(error => reject(error));
    });
  };

  InfTemporalEntity.addToProject = function(pk_project, pk_entity, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;

    const params = [pk_entity, pk_project, accountId];

    const sql_stmt = `SELECT information.add_pe_it_to_project($1, $2, $3)`;

    const connector = InfTemporalEntity.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);

      InfTemporalEntity.ownProperties(pk_project, pk_entity, (err, result) => {
        cb(err, result);
      });
    });
  };

  /**
   * internal function to get a rich object of project or repo.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.nestedObject = function(
    ofProject,
    pkProject,
    pkEntity,
    cb
  ) {
    const filter = {
      where: ['pk_entity', '=', pkEntity],
      include: InfTemporalEntity.getIncludeObject(ofProject, pkProject),
    };

    return InfTemporalEntity.findComplex(filter, cb);
    // return InfTemporalEntity.findComplex(filter, (err, res) => {
    //   if (err) return cb(err)

    //   const promises = []
    //   res.forEach(teEn => {
    //     teEn.te_roles.forEach((role, ri) => {

    //       if (
    //         Object.keys(role.range_temporal_entity).length > 0
    //         // &&
    //         // role.range_temporal_entity.pk_entity !== teEn.pk_entity
    //       ) {
    //         const promise = new Promise((resolve, reject) => {

    //           const filter = {
    //             "where": ["pk_entity", "=", role.range_temporal_entity.pk_entity],
    //             "include": InfTemporalEntity.getIncludeObject(ofProject, pkProject)
    //           }

    //           InfTemporalEntity.findComplex(filter, (err, res) => {
    //             if (err) return cb(err);
    //             role.range_temporal_entity = res[0]

    //           })

    //         })
    //         promises.push(promise);
    //       }
    //     })
    //   })

    //   Promise.all(promises)
    //     .then(() => {
    //       cb(false, res)
    //     })
    //     .catch(err => cb(err))
    // });
  };

  /**
   * remote method to get a schema object with the
   * own properties of the temporal entity of project.
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.ownProperties = function(pkProject, pkEntity, cb) {
    const mainQuery = new SqlTemporalEntityOwnProperties(
      InfTemporalEntity.app.models
    ).create(pkProject, pkEntity);
    const connector = InfTemporalEntity.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  /**
   * remote method to get a rich object of project.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.nestedObjectOfProject = function(pkProject, pkEntity, cb) {
    const ofProject = true;
    return InfTemporalEntity.nestedObject(ofProject, pkProject, pkEntity, cb);
  };

  /**
   * Internal function to get graphs of project or repo.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphs = function(ofProject, pkProject, pkEntities, cb) {
    const filter = {
      where: ['pk_entity', 'IN', pkEntities],
      include: InfTemporalEntity.getIncludeObject(ofProject, pkProject),
    };

    return InfTemporalEntity.findComplex(filter, cb);
  };

  /**
   * Remote method to get graphs of project.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphsOfProject = function(pkProject, pkEntities, cb) {
    const ofProject = true;
    return InfTemporalEntity.graphs(ofProject, pkProject, pkEntities, cb);
  };

  /**
   * Remote method to get graphs of repo.
   * a rich object of the TeEn with all its roles
   *
   * @param  {number} pkEntity  pk_entity of the teEn
   */
  InfTemporalEntity.graphsOfRepo = function(pkEntities, cb) {
    const ofProject = false;
    const pkProject = undefined;
    return InfTemporalEntity.graphs(ofProject, pkProject, pkEntities, cb);
  };

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
  InfTemporalEntity.getIncludeObject = function(ofProject, pkProject) {
    let projectJoin = {};

    // if a pkProject is provided, create the relation
    if (pkProject) {
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        entity_version_project_rels: InfTemporalEntity.app.models.ProInfoProjRel.getJoinObject(
          ofProject,
          pkProject
        ),
      };
    }

    return {
      ...projectJoin,
      te_roles: {
        $relation: {
          name: 'te_roles',
          joinType: 'inner join',
          orderBy: [
            {
              pk_entity: 'asc',
            },
          ],
        },
        ...projectJoin,
        appellation: {
          $relation: {
            name: 'appellation',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
        language: {
          $relation: {
            name: 'language',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
        time_primitive: {
          $relation: {
            name: 'time_primitive',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
        place: {
          $relation: {
            name: 'place',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
      },
      ingoing_roles: {
        $relation: {
          name: 'ingoing_roles',
          joinType: 'left join',
        },
        ...projectJoin,
        temporal_entity: {
          $relation: {
            name: 'temporal_entity',
            joinType: 'left join',
          },
          te_roles: {
            $relation: {
              name: 'te_roles',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            ...projectJoin,
            appellation: {
              $relation: {
                name: 'appellation',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            language: {
              $relation: {
                name: 'language',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            time_primitive: {
              $relation: {
                name: 'time_primitive',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
            place: {
              $relation: {
                name: 'place',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
            },
          },
        },
      },
    };
  };

  /**
   * Adds temporal entity, its outgoing roles to add
   * and the text properties to the project
   */
  InfTemporalEntity.addToProject = function(pk_project, pk_entity, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;

    const mainQuery = new SqlTeEnAddToProject(
      InfTemporalEntity.app.models
    ).create(pk_project, pk_entity, accountId);

    const connector = InfTemporalEntity.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      InfTemporalEntity.ownProperties(pk_project, pk_entity, (err, result) => {
        cb(err, result);
      });
    });
  };
};
