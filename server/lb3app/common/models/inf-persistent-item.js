'use strict';

const Promise = require('bluebird');
const Config = require('../config/Config');
const _ = require('lodash');
const helpers = require('../helpers');
var SqlPeItOwnProperties = require('../../../dist/lb3/server/sql-builders/sql-pe-it-own-properties')
  .SqlPeItOwnProperties;
var SqlTypesOfProject = require('../../../dist/lb3/server/sql-builders/sql-types-of-project')
  .SqlTypesOfProject;

module.exports = function(InfPersistentItem) {
  InfPersistentItem.findOrCreateInfPersistentItems = function(
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

        return InfPersistentItem.findOrCreatePeIt(pk_project, item, context);
      });
      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfPersistentItem.findOrCreatePeIt = function(pkProject, data, ctx, cb) {
    return new Promise((resolve, reject) => {
      const dataObject = {
        pk_entity: data.pk_entity,
        notes: data.notes,
        fk_class: data.fk_class,
      };

      let requestedPeIt;

      if (ctx && ctx.req && ctx.req.body) {
        requestedPeIt = ctx.req.body;
      } else {
        requestedPeIt = data;
      }

      // Add F2 Expression, if this is a F4 Manifestation Singleton
      if (requestedPeIt.fk_class == 220) {
        requestedPeIt.outgoing_statements = [
          ...(requestedPeIt.outgoing_statements || []),
          { fk_property: 1016, object_persistent_item: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a F3 Manifestation Product Type
      else if (requestedPeIt.fk_class == 219) {
        requestedPeIt.incoming_statements = [
          ...(requestedPeIt.incoming_statements || []),
          { fk_property: 979, subject_persistent_item: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a F5 Item
      else if (requestedPeIt.fk_class == 221) {
        requestedPeIt.incoming_statements = [
          ...(requestedPeIt.incoming_statements || []),
          { fk_property: 1316, subject_persistent_item: { fk_class: 218 } },
        ];
      }
      // Add F2 Expression, if this is a geovC4 Web Request
      else if (requestedPeIt.fk_class == 502) {
        requestedPeIt.incoming_statements = [
          ...(requestedPeIt.incoming_statements || []),
          { fk_property: 1305, subject_persistent_item: { fk_class: 218 } },
        ];
      }

      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      InfPersistentItem._findOrCreatePeIt(
        InfPersistentItem,
        pkProject,
        dataObject,
        ctxWithoutBody
      )
        .then(resultingEntities => {
          // pick first item of array
          const resultingEntity = resultingEntities[0];
          const res = helpers.toObject(resultingEntity);

          // Array of Promises
          const promiseArray = [];

          /******************************************
           * incoming_statements
           ******************************************/
          if (requestedPeIt.incoming_statements) {
            // prepare parameters
            const InfStatement = InfPersistentItem.app.models.InfStatement;

            //… filter statements that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.incoming_statements.filter(statement => statement),
              statement => {
                // use the pk_entity from the created peIt to set the fk_object_info of the statement
                statement.fk_object_info = resultingEntity.pk_entity;
                // find or create the teEnt and the statement pointing to the teEnt
                return InfStatement.findOrCreateInfStatement(
                  pkProject,
                  statement,
                  ctxWithoutBody
                );
              }
            )
              .then(statements => {
                //attach the statements to peit.incoming_statements
                res.incoming_statements = [];
                for (var i = 0; i < statements.length; i++) {
                  const statement = statements[i];
                  if (statement && statement[0]) {
                    res.incoming_statements.push(statement[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for incoming_statements
            promiseArray.push(promise);
          }

          /******************************************
           * outgoing_statements (statements, where pe_it is domain / subject)
           ******************************************/
          if (requestedPeIt.outgoing_statements) {
            // prepare parameters
            const InfStatement = InfPersistentItem.app.models.InfStatement;

            //… filter statements that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.outgoing_statements.filter(statement => statement),
              statement => {
                // use the pk_entity from the created peIt to set the fk_subject_info of the statement
                statement.fk_subject_info = resultingEntity.pk_entity;
                // find or create the teEnt and the statement pointing to the teEnt
                return InfStatement.findOrCreateInfStatement(
                  pkProject,
                  statement,
                  ctxWithoutBody
                );
              }
            )
              .then(statements => {
                //attach the statements to peit.outgoing_statements
                res.outgoing_statements = [];
                for (var i = 0; i < statements.length; i++) {
                  const statement = statements[i];
                  if (statement && statement[0]) {
                    res.outgoing_statements.push(statement[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for outgoing_statements
            promiseArray.push(promise);
          }

          /******************************************
           * text_properties
           ******************************************/
          if (requestedPeIt.text_properties) {
            // prepare parameters
            const InfTextProperty =
              InfPersistentItem.app.models.InfTextProperty;

            //… filter items that are truthy (not null), iterate over them,
            // return the promise that the PeIt will be
            // returned together with all nested items
            const promise = Promise.map(
              requestedPeIt.text_properties.filter(item => item),
              item => {
                // use the pk_entity from the created peIt to set the fk_concerned_entity of the item
                item.fk_concerned_entity = resultingEntity.pk_entity;
                // find or create the item
                return InfTextProperty.findOrCreateInfTextProperty(
                  pkProject,
                  item,
                  ctxWithoutBody
                );
              }
            )
              .then(items => {
                //attach the items to peit.text_properties
                res.text_properties = [];
                for (var i = 0; i < items.length; i++) {
                  const item = items[i];
                  if (item && item[0]) {
                    res.text_properties.push(item[0]);
                  }
                }
                return true;
              })
              .catch(err => {
                reject(err);
              });

            // add promise for text properties
            promiseArray.push(promise);
          }

          if (promiseArray.length === 0) return resolve([res]);
          else
            return Promise.map(promiseArray, promise => promise).then(() => {
              resolve([res]);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  /**
   * Query instance of E55 Type
   *
   * Where
   *	- types are in given project
   *  - the type has the pk_entity.
   *
   * Eager loading
   *  - The appellations of given language
   *
   * @param pk_project
   * @param pk_entity
   */
  InfPersistentItem.typeNested = function(pk_project, pk_entity, cb) {
    const innerJoinThisProject = {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: 'inner join',
        select: {
          include: ['pk_entity', 'fk_project', 'fk_entity'],
        },
        where: [
          'fk_project',
          '=',
          pk_project,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };

    const filter = {
      where: ['pk_entity', '=', pk_entity],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        entity_version_project_rels: innerJoinThisProject,
        text_properties: {
          $relation: {
            name: 'text_properties',
            joinType: 'left join',
          },
        },
        incoming_statements: {
          $relation: {
            name: 'incoming_statements',
            joinType: 'left join',
          },
          entity_version_project_rels: innerJoinThisProject,
          subject_temporal_entity: {
            $relation: {
              name: 'subject_temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            entity_version_project_rels: innerJoinThisProject,
            outgoing_statements: {
              $relation: {
                name: 'outgoing_statements',
                joinType: 'inner join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              entity_version_project_rels: innerJoinThisProject,
              object_appellation: {
                $relation: {
                  name: 'object_appellation',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              object_language: {
                $relation: {
                  name: 'object_language',
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
      },
    };

    return InfPersistentItem.findComplex(filter, (err, res) => {
      if (err) cb(err);
      else cb(null, res[0]);
    });
  };
  /**
   * Get all types of project with
   * - persistent_item
   * - info_proj_rel
   * no other related data is loaded.
   */
  InfPersistentItem.typesOfProject = function(pkProject, cb) {
    const mainQuery = new SqlTypesOfProject(
      InfPersistentItem.app.models
    ).create(pkProject);
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  InfPersistentItem.ownProperties = function(pkProject, pkEntity, cb) {
    const mainQuery = new SqlPeItOwnProperties(
      InfPersistentItem.app.models
    ).create(pkProject, pkEntity);
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };
};
