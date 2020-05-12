'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const helpers = require('../helpers');

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
        requestedTeEnt.outgoing_statements,
        ctxWithoutBody
      )
        .then(resolvedRoles => {
          const teEnWithResolvedRoles = {
            ...requestedTeEnt,
            outgoing_statements: resolvedRoles,
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
               * outgoing_statements (= outgoing_statements)
               ******************************************/
              if (requestedTeEnt.outgoing_statements) {
                // prepare parameters
                const InfStatement = InfTemporalEntity.app.models.InfStatement;

                //… filter statements that are truthy (not null), iterate over them,
                // return the promise that the teEnt will be
                // returned together with all nested items
                const promise = Promise.map(
                  requestedTeEnt.outgoing_statements.filter(
                    statement => statement
                  ),
                  statement => {
                    // use the pk_entity from the created teEnt to set the fk_subject_info of the statement
                    statement.fk_subject_info = resultingEntity.pk_entity;

                    // find or create the Entity and the statement pointing to the Entity
                    return InfStatement.findOrCreateInfStatement(
                      pkProject,
                      statement,
                      ctxWithoutBody
                    );
                  }
                )
                  .then(statements => {
                    //attach the statements to resultingTeEnt
                    res.outgoing_statements = [];
                    for (var i = 0; i < statements.length; i++) {
                      const statement = statements[i];
                      if (statement && statement[0]) {
                        res.outgoing_statements.push(statement[0]);
                      }
                    }

                    return true;
                  })
                  .catch(err => reject(err));

                // add promise for outgoing_statements
                promiseArray.push(promise);
              }

              /******************************************
               * ingoing_statements
               ******************************************/
              if (requestedTeEnt.ingoing_statements) {
                // prepare parameters
                const InfStatement = InfTemporalEntity.app.models.InfStatement;

                //… filter statements that are truthy (not null), iterate over them,
                // return the promise that the teEnt will be
                // returned together with all nested items
                const promise = Promise.map(
                  requestedTeEnt.ingoing_statements.filter(
                    statement => statement
                  ),
                  statement => {
                    // use the pk_entity from the created teEnt to set the fk_subject_info of the statement
                    statement.fk_object_info = resultingEntity.pk_entity;

                    // find or create the Entity and the statement pointing to the Entity
                    return InfStatement.findOrCreateInfStatement(
                      pkProject,
                      statement,
                      ctxWithoutBody
                    );
                  }
                )
                  .then(statements => {
                    //attach the statements to resultingTeEnt
                    res.ingoing_statements = [];
                    for (var i = 0; i < statements.length; i++) {
                      const statement = statements[i];
                      if (statement && statement[0]) {
                        res.ingoing_statements.push(statement[0]);
                      }
                    }

                    return true;
                  })
                  .catch(err => reject(err));

                // add promise for ingoing_statements
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
    outgoing_statements,
    ctxWithoutBody
  ) {
    return new Promise((resolve, reject) => {
      if (!outgoing_statements || !outgoing_statements.length) resolve([]);

      const outgoing_statements_with_fk_object_info = outgoing_statements
        .filter(statement => !!statement.fk_object_info)
        .map(statement => ({
          fk_property: statement.fk_property,
          fk_object_info: statement.fk_object_info,
        }));

      const outgoing_statements_without_fk_object_info = outgoing_statements.filter(
        statement => !statement.fk_object_info
      );

      Promise.all(
        outgoing_statements_without_fk_object_info.map(statement => {
          // Time Primitive
          if (
            statement.time_primitive &&
            Object.keys(statement.time_primitive).length
          ) {
            const InfTimePrimitive =
              InfTemporalEntity.app.models.InfTimePrimitive;

            return new Promise((res, rej) => {
              InfTimePrimitive.create(statement.time_primitive).then(obj => {
                res({
                  fk_property: statement.fk_property,
                  fk_object_info: obj.pk_entity,
                });
              });
            });
          }

          // Language
          if (statement.language && Object.keys(statement.language).length) {
            const InfLanguage = InfTemporalEntity.app.models.InfLanguage;

            return new Promise((res, rej) => {
              InfLanguage.find({
                where: { pk_entity: statement.language.pk_entity },
              }).then(objs => {
                res({
                  fk_property: statement.fk_property,
                  fk_object_info: objs[0].pk_entity,
                });
              });
            });
          }

          // Place
          if (statement.place && Object.keys(statement.place).length) {
            const InfPlace = InfTemporalEntity.app.models.InfPlace;

            return new Promise((res, rej) => {
              InfPlace.create(statement.place)
                .then(obj => {
                  res({
                    fk_property: statement.fk_property,
                    fk_object_info: obj.pk_entity,
                  });
                })
                .catch(err => {
                  reject(err);
                });
            });
          }

          // Appellation
          if (
            statement.appellation &&
            Object.keys(statement.appellation).length
          ) {
            const InfAppellation = InfTemporalEntity.app.models.InfAppellation;

            return new Promise((res, rej) => {
              InfAppellation.create(statement.appellation).then(obj => {
                res({
                  fk_property: statement.fk_property,
                  fk_object_info: obj.pk_entity,
                });
              });
            });
          }
        })
      )
        .then(resolvedRoles => {
          resolve([
            ...outgoing_statements_with_fk_object_info,
            ...resolvedRoles,
          ]);
        })
        .catch(error => reject(error));
    });
  };

  // /**
  //  * internal function to get a rich object of project or repo.
  //  * a rich object of the TeEn with all its statements
  //  *
  //  * @param  {number} pkProject primary key of project
  //  * @param  {number} pkEntity  pk_entity of the teEn
  //  */
  // InfTemporalEntity.nestedObject = function(
  //   ofProject,
  //   pkProject,
  //   pkEntity,
  //   cb
  // ) {
  //   const filter = {
  //     where: ['pk_entity', '=', pkEntity],
  //     include: InfTemporalEntity.getIncludeObject(ofProject, pkProject),
  //   };

  //   return InfTemporalEntity.findComplex(filter, cb);
  //   // return InfTemporalEntity.findComplex(filter, (err, res) => {
  //   //   if (err) return cb(err)

  //   //   const promises = []
  //   //   res.forEach(teEn => {
  //   //     teEn.outgoing_statements.forEach((statement, ri) => {

  //   //       if (
  //   //         Object.keys(statement.range_temporal_entity).length > 0
  //   //         // &&
  //   //         // statement.range_temporal_entity.pk_entity !== teEn.pk_entity
  //   //       ) {
  //   //         const promise = new Promise((resolve, reject) => {

  //   //           const filter = {
  //   //             "where": ["pk_entity", "=", statement.range_temporal_entity.pk_entity],
  //   //             "include": InfTemporalEntity.getIncludeObject(ofProject, pkProject)
  //   //           }

  //   //           InfTemporalEntity.findComplex(filter, (err, res) => {
  //   //             if (err) return cb(err);
  //   //             statement.range_temporal_entity = res[0]

  //   //           })

  //   //         })
  //   //         promises.push(promise);
  //   //       }
  //   //     })
  //   //   })

  //   //   Promise.all(promises)
  //   //     .then(() => {
  //   //       cb(false, res)
  //   //     })
  //   //     .catch(err => cb(err))
  //   // });
  // };

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

  // /**
  //  * remote method to get a rich object of project.
  //  * a rich object of the TeEn with all its statements
  //  *
  //  * @param  {number} pkProject primary key of project
  //  * @param  {number} pkEntity  pk_entity of the teEn
  //  */
  // InfTemporalEntity.nestedObjectOfProject = function(pkProject, pkEntity, cb) {
  //   const ofProject = true;
  //   return InfTemporalEntity.nestedObject(ofProject, pkProject, pkEntity, cb);
  // };

  // /**
  //  * Internal function to create the include property of
  //  * a filter object for findComplex()
  //  *
  //  * Usage: add the returned object to the include property of a persistent item relation
  //  * of findComplex() filter, e.g.:
  //  * {
  //  *    ...
  //  *    include: InfPersistentItem.getIncludeObject(true, 123)
  //  * }
  //  *
  //  * @param ofProject {boolean}
  //  * @param project {number}
  //  * @returns include object of findComplex filter
  //  */
  // InfTemporalEntity.getIncludeObject = function(ofProject, pkProject) {
  //   let projectJoin = {};

  //   // if a pkProject is provided, create the relation
  //   if (pkProject) {
  //     // get the join object. If ofProject is false, the join will be a left join.
  //     projectJoin = {
  //       entity_version_project_rels: InfTemporalEntity.app.models.ProInfoProjRel.getJoinObject(
  //         ofProject,
  //         pkProject
  //       ),
  //     };
  //   }

  //   return {
  //     ...projectJoin,
  //     outgoing_statements: {
  //       $relation: {
  //         name: 'outgoing_statements',
  //         joinType: 'inner join',
  //         orderBy: [
  //           {
  //             pk_entity: 'asc',
  //           },
  //         ],
  //       },
  //       ...projectJoin,
  //       appellation: {
  //         $relation: {
  //           name: 'appellation',
  //           joinType: 'left join',
  //           orderBy: [
  //             {
  //               pk_entity: 'asc',
  //             },
  //           ],
  //         },
  //       },
  //       language: {
  //         $relation: {
  //           name: 'language',
  //           joinType: 'left join',
  //           orderBy: [
  //             {
  //               pk_entity: 'asc',
  //             },
  //           ],
  //         },
  //       },
  //       time_primitive: {
  //         $relation: {
  //           name: 'time_primitive',
  //           joinType: 'left join',
  //           orderBy: [
  //             {
  //               pk_entity: 'asc',
  //             },
  //           ],
  //         },
  //       },
  //       place: {
  //         $relation: {
  //           name: 'place',
  //           joinType: 'left join',
  //           orderBy: [
  //             {
  //               pk_entity: 'asc',
  //             },
  //           ],
  //         },
  //       },
  //     },
  //     ingoing_statements: {
  //       $relation: {
  //         name: 'ingoing_statements',
  //         joinType: 'left join',
  //       },
  //       ...projectJoin,
  //       temporal_entity: {
  //         $relation: {
  //           name: 'temporal_entity',
  //           joinType: 'left join',
  //         },
  //         outgoing_statements: {
  //           $relation: {
  //             name: 'outgoing_statements',
  //             joinType: 'inner join',
  //             orderBy: [
  //               {
  //                 pk_entity: 'asc',
  //               },
  //             ],
  //           },
  //           ...projectJoin,
  //           appellation: {
  //             $relation: {
  //               name: 'appellation',
  //               joinType: 'left join',
  //               orderBy: [
  //                 {
  //                   pk_entity: 'asc',
  //                 },
  //               ],
  //             },
  //           },
  //           language: {
  //             $relation: {
  //               name: 'language',
  //               joinType: 'left join',
  //               orderBy: [
  //                 {
  //                   pk_entity: 'asc',
  //                 },
  //               ],
  //             },
  //           },
  //           time_primitive: {
  //             $relation: {
  //               name: 'time_primitive',
  //               joinType: 'left join',
  //               orderBy: [
  //                 {
  //                   pk_entity: 'asc',
  //                 },
  //               ],
  //             },
  //           },
  //           place: {
  //             $relation: {
  //               name: 'place',
  //               joinType: 'left join',
  //               orderBy: [
  //                 {
  //                   pk_entity: 'asc',
  //                 },
  //               ],
  //             },
  //           },
  //         },
  //       },
  //     },
  //   };
  // };

  /**
   * Adds temporal entity, its outgoing statements to add
   * and the text properties to the project
   */
  // InfTemporalEntity.addToProject = function(pk_project, pk_entity, ctx, cb) {
  //   if (!ctx.req.accessToken.userId)
  //     return Error('AccessToken.userId is missing');
  //   const accountId = ctx.req.accessToken.userId;

  //   const mainQuery = new SqlTeEnAddToProject(
  //     InfTemporalEntity.app.models
  //   ).create(pk_project, pk_entity, accountId);

  //   const connector = InfTemporalEntity.dataSource.connector;
  //   connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
  //     if (err) return cb(err);
  //     InfTemporalEntity.ownProperties(pk_project, pk_entity, (err, result) => {
  //       cb(err, result);
  //     });
  //   });
  // };
};
