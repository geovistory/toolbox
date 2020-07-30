'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const helpers = require('../helpers');

var SqlTemporalEntityList = require('../../../dist/lb3/server/sql-builders/sql-temporal-entity-list')
  .SqlTemporalEntityList;
var SqlTemporalEntityListAlternatives = require('../../../dist/lb3/server/sql-builders/sql-temporal-entity-list-alternatives')
  .SqlTemporalEntityListAlternatives;
var SqlTemporalEntityOwnProperties = require('../../../dist/lb3/server/sql-builders/sql-te-en-own-properties')
  .SqlTemporalEntityOwnProperties;

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

      InfTemporalEntity.resolveStatementValues(
        pkProject,
        requestedTeEnt.outgoing_statements,
        ctxWithoutBody
      )
        .then(resolvedStatements => {
          const teEnWithResolvedStatements = {
            ...requestedTeEnt,
            outgoing_statements: resolvedStatements,
          };
          InfTemporalEntity._findOrCreateTeEnt(
            InfTemporalEntity,
            pkProject,
            teEnWithResolvedStatements,
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
               * incoming_statements
               ******************************************/
              if (requestedTeEnt.incoming_statements) {
                // prepare parameters
                const InfStatement = InfTemporalEntity.app.models.InfStatement;

                //… filter statements that are truthy (not null), iterate over them,
                // return the promise that the teEnt will be
                // returned together with all nested items
                const promise = Promise.map(
                  requestedTeEnt.incoming_statements.filter(
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
                    res.incoming_statements = [];
                    for (var i = 0; i < statements.length; i++) {
                      const statement = statements[i];
                      if (statement && statement[0]) {
                        res.incoming_statements.push(statement[0]);
                      }
                    }

                    return true;
                  })
                  .catch(err => reject(err));

                // add promise for incoming_statements
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

  InfTemporalEntity.resolveStatementValues = function(
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
        .then(resolvedStatements => {
          resolve([
            ...outgoing_statements_with_fk_object_info,
            ...resolvedStatements,
          ]);
        })
        .catch(error => reject(error));
    });
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
};
