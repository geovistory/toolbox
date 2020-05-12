'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const helpers = require('../helpers');
var SqlBuilderLbModels = require('../../dist/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;
const models = require('../../server/server').models;

var SqlEntityPreviewList = require('../../dist/server/sql-builders/sql-entity-preview-list')
  .SqlEntityPreviewList;

module.exports = function(InfStatement) {
  InfStatement.findOrCreateInfStatements = function(
    pk_project,
    statements,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const promiseArray = statements.map((statement, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfStatement.findOrCreateInfStatement(
          pk_project,
          statement,
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

  InfStatement.findOrCreateInfStatement = function(pkProject, statement, ctx) {
    return new Promise((resolve, reject) => {
      // the model to find or create
      let model = {
        // pk_entity: statement.pk_entity,
        fk_temporal_entity: statement.fk_temporal_entity,
        fk_subject_data: statement.fk_subject_data,
        fk_subject_tables_cell: statement.fk_subject_tables_cell,
        fk_subject_tables_row: statement.fk_subject_tables_row,
        fk_property: statement.fk_property,
        fk_property_of_property: statement.fk_property_of_property,
        fk_entity: statement.fk_entity,
        fk_object_data: statement.fk_object_data,
        fk_object_tables_cell: statement.fk_object_tables_cell,
        fk_object_tables_row: statement.fk_object_tables_row,
        // notes: statement.notes,
      };

      let requestedRole =
        ctx && ctx.req && ctx.req.body ? ctx.req.body : statement;
      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      const subject = getSubject(pkProject, requestedRole, ctxWithoutBody);
      const object = getObject(pkProject, requestedRole, ctxWithoutBody);

      Promise.all([subject, object])
        .then(([subject, object]) => {
          // add the fk's to subject and to object we retrieved asyncronously
          model = {
            ...model,
            ...subject.fk,
            ...object.fk,
          };

          InfStatement._findOrCreateByValue(
            InfStatement,
            pkProject,
            model,
            requestedRole,
            ctxWithoutBody
          )
            .catch(err => reject(err))
            .then(resArr => {
              // add related models we retrieved asyncronously
              const result = {
                ...resArr[0],
                ...(subject.relatedModel || {}),
                ...(object.relatedModel || {}),
              };
              resolve(result);
            });
        })
        .catch(err => reject(err));
    });
  };

  InfStatement.alternativesNotInProjectByEntityPk = function(
    entityPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const statementsInProjectFilter = {
      /** Select statements with fk_entity and fk_property … */
      where: [
        'fk_entity',
        '=',
        entityPk,
        'and',
        'fk_property',
        '=',
        propertyPk,
      ],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        entity_version_project_rels: {
          $relation: {
            name: 'entity_version_project_rels',
            joinType: 'inner join',
            where: [
              'fk_project',
              '=',
              pkProject,
              'and',
              'is_in_project',
              '=',
              'true',
            ],
          },
        },
      },
    };

    const findThem = function(err, statements) {
      const entitiesInProj = [];

      for (var i = 0; i < statements.length; i++) {
        entitiesInProj.push(statements[i].pk_entity);
      }

      const filter = {
        /** Select statements with fk_entity and fk_property … */
        where: [
          'fk_entity',
          '=',
          entityPk,
          'and',
          'fk_property',
          '=',
          propertyPk,
          'and',
          'is_in_project_count',
          '>',
          '0', // new
        ],
        orderBy: [
          {
            pk_entity: 'asc',
          },
        ],
        include: {
          /** include the subject_temporal_entity of the statement */
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
            outgoing_statements: {
              $relation: {
                name: 'outgoing_statements',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
                where: ['is_in_project_count', '>', '0'], // new
              },
              object_language: {
                $relation: {
                  name: 'object_language',
                  joinType: 'left join',
                  //"where": ["is_community_favorite", "=", "true"],
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
                //,...innerJoinThisProject, // … get project's version
              },
              object_appellation: {
                $relation: {
                  name: 'object_appellation',
                  joinType: 'left join',
                  //  "where": ["is_community_favorite", "=", "true"],
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              object_time_primitive: {
                $relation: {
                  name: 'object_time_primitive',
                  joinType: 'left join',
                  orderBy: [
                    {
                      pk_entity: 'asc',
                    },
                  ],
                },
              },
              object_place: {
                $relation: {
                  name: 'object_place',
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

      if (entitiesInProj.length > 0) {
        filter.where = filter.where.concat([
          'and',
          'pk_entity',
          'NOT IN',
          entitiesInProj,
        ]);
      }

      return InfStatement.findComplex(filter, cb);
    };

    InfStatement.findComplex(statementsInProjectFilter, findThem);
  };

  InfStatement.alternativesNotInProjectByTeEntPk = function(
    teEntPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const statementsInProjectFilter = {
      /** Select statements with fk_temporal_entity and fk_property … */
      where: [
        'fk_temporal_entity',
        '=',
        teEntPk,
        'and',
        'fk_property',
        '=',
        propertyPk,
      ],
      orderBy: [
        {
          pk_entity: 'asc',
        },
      ],
      include: {
        entity_version_project_rels: {
          $relation: {
            name: 'entity_version_project_rels',
            joinType: 'inner join',
            where: [
              'fk_project',
              '=',
              pkProject,
              'and',
              'is_in_project',
              '=',
              'true',
            ],
          },
        },
      },
    };

    const findThem = function(err, statements) {
      const statementsInProj = [];

      for (var i = 0; i < statements.length; i++) {
        statementsInProj.push(statements[i].pk_entity);
      }

      const filter = {
        /** Select statements with fk_temporal_entity and fk_property … */
        where: [
          'fk_temporal_entity',
          '=',
          teEntPk,
          'and',
          'fk_property',
          '=',
          propertyPk,
          'and',
          'is_in_project_count',
          '>',
          '0', // new
        ],
        orderBy: [
          {
            pk_entity: 'asc',
          },
        ],
        include: {
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
          object_time_primitive: {
            $relation: {
              name: 'object_time_primitive',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
          object_place: {
            $relation: {
              name: 'object_place',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
        },
      };

      if (statementsInProj.length > 0) {
        filter.where = filter.where.concat([
          'and',
          'pk_entity',
          'NOT IN',
          statementsInProj,
        ]);
      }

      return InfStatement.findComplex(filter, cb);
    };

    InfStatement.findComplex(statementsInProjectFilter, findThem);
  };

  // InfStatement.removeFromProjectWithTeEnt = function(
  //   pk_project,
  //   pk_statements,
  //   ctx,
  //   cb
  // ) {
  //   const q = new SqlBuilderLbModels(InfStatement.app.models);

  //   if (!ctx.req.accessToken.userId)
  //     return Error('AccessToken.userId is missing');
  //   const accountId = ctx.req.accessToken.userId;
  //   const params = [parseInt(pk_project), accountId];

  //   const sql_stmt = `
  //     select ${q.createSelect('t1', 'ProInfoProjRel')}
  //      FROM information.relate_outgoing_statements_with_te_ens_to_project(ARRAY[${pk_statements
  //        .map(r => r * 1)
  //        .join(', ')}], $1, $2, false) t1;
  //   `;

  //   const connector = InfStatement.dataSource.connector;
  //   connector.execute(sql_stmt, params, (err, resultObjects) => {
  //     if (err) return cb(err, resultObjects);
  //     cb(false, resultObjects);
  //   });
  // };

  /**
   * Add statements to the project
   *
   * This query will not add any related entitie but the given statements
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfStatement.addToProject = function(pk_project, pk_statements, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId];

    const sql_stmt = `
      WITH
      -- Find the statements
      statements AS (
        select pk_entity, community_favorite_calendar as calendar
        from information.v_statement
        where pk_entity IN (${pk_statements.map(r => r * 1)})
      )
      -- add the project relations
      insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
      SELECT $1, true, pk_entity, calendar, $2
      from statements;
      `;

    const connector = InfStatement.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err, resultObjects);

      const innerJoinThisProject = {
        $relation: {
          name: 'entity_version_project_rels',
          joinType: 'inner join',
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
        where: ['pk_entity', 'IN', pk_statements],
        include: {
          entity_version_project_rels: innerJoinThisProject,
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
      };

      InfStatement.findComplex(filter, cb);
    });
  };

  /**
   * load paginated list by statements, that point to an
   * entity_preview
   */
  InfStatement.paginatedListTargetingEntityPreviews = function(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset,
    cb
  ) {
    const mainQuery = new SqlEntityPreviewList(InfStatement.app.models).create(
      fkProject,
      fkSourceEntity,
      fkProperty,
      fkTargetClass,
      isOutgoing,
      limit,
      offset
    );
    const connector = InfStatement.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  /**
   * Find statement by one of the params
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the statement
   */
  InfStatement.queryByParams = function(
    ofProject,
    pkProject,
    pkEntity,
    fkEntity,
    fkTemporalEntity,
    pkProperty,
    cb
  ) {
    if (!pkEntity && !fkEntity && !fkTemporalEntity) {
      return cb(
        'please provide at least a pkEntity, fkEntity or fkTemporalEntity'
      );
    }

    const w = {
      pk_entity: pkEntity,
      fk_entity: fkEntity,
      fk_temporal_entity: fkTemporalEntity,
      fk_property: pkProperty,
    };
    let where = [];
    Object.keys(w)
      .filter(key => !!w[key])
      .map((key, index, ar) => {
        let part = [key, '=', w[key]];
        if (index !== 0) part = ['AND', ...part];
        return part;
      })
      .forEach(part => {
        where = [...where, ...part];
      });

    const filter = {
      where: where,
    };

    if (pkProject) {
      const joinThisProject = InfStatement.app.models.ProInfoProjRel.getJoinObject(
        ofProject,
        pkProject
      );
      // joinThisProject.$relation['select'] = false;
      filter['include'] = {
        entity_version_project_rels: joinThisProject,
      };
    }

    return InfStatement.findComplex(filter, (err, res) => {
      if (err) cb(err);
      res.forEach(statement => {
        statement.fk_subject_tables_row = parseInt(
          statement.fk_subject_tables_row,
          10
        );
        statement.fk_subject_tables_cell = parseInt(
          statement.fk_subject_tables_cell,
          10
        );
        statement.fk_object_tables_row = parseInt(
          statement.fk_object_tables_row,
          10
        );
        statement.fk_object_tables_cell = parseInt(
          statement.fk_object_tables_cell,
          10
        );
      });
      cb(false, res);
    });
  };

  /**
   * Get an nested object with everything needed to display the
   * links made from an entity towards sources and digitals.
   */
  InfStatement.sourcesAndDigitalsOfEntity = function(
    ofProject,
    pkProject,
    pkEntity,
    cb
  ) {
    const joinThisProject = InfStatement.app.models.ProInfoProjRel.getJoinObject(
      ofProject,
      pkProject
    );

    const filter = {
      where: ['fk_entity', '=', pkEntity],
      include: {
        entity_version_project_rels: joinThisProject,
        domain_chunk: {
          $relation: {
            name: 'domain_chunk',
            joinType: 'left join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
        },
      },
    };

    return InfStatement.findComplex(filter, (err, statements) => {
      if (err) return cb(err);

      const textPks = _.uniq(
        statements
          .filter(statement => statement.subject_chunk)
          .map(statement => statement.subject_chunk.fk_text)
      );

      if (!textPks.length) return cb(null, statements);

      InfStatement.app.models.DatDigital.findComplex(
        {
          where: ['pk_text', 'IN', textPks],
        },
        (err2, digitals) => {
          if (err2) return cb(err2);

          cb(null, {
            statements,
            digitals,
          });
        }
      );
    });
  };
};

function hasRelatedModel(relatedModel) {
  return relatedModel && Object.keys(relatedModel).length > 0;
}

/**
 *
 * Get the pk_entity of the subject asyncronously.
 * The promise will return an object with two members:
 * - 'fk', containing one key-value pair
 *   - the key is the name of the statement foreign key pointing to the subject
 *   - the value is the primary key of the subject
 * - 'relatedModelone' (optional), containing one key-value pair
 *   - the key is the name of the related model according to loopbacks model definition
 *   - the value is the related model (e.g. the related time_primitive)
 *
 * @param {*} pkProject
 * @param {*} requestedRole
 * @param {*} ctxWithoutBody
 */
function getSubject(pkProject, requestedRole, ctxWithoutBody) {
  return new Promise((resolve, reject) => {
    /******************************************************
     * First case: the primary key of subject is known
     *
     * -> return this key without additional function call
     ******************************************************/

    // if fk_subject_information is a given
    if (requestedRole.fk_temporal_entity) {
      resolve({
        fk: { fk_temporal_entity: requestedRole.fk_temporal_entity },
      });
    }
    // if fk_subject_data is a given
    else if (requestedRole.fk_subject_data) {
      resolve({
        fk: { fk_subject_data: requestedRole.fk_subject_data },
      });
    }
    // if fk_subject_tables_cell is a given
    else if (requestedRole.fk_subject_tables_cell) {
      resolve({
        fk: { fk_subject_tables_cell: requestedRole.fk_subject_tables_cell },
      });
    }
    // if fk_subject_tables_row is a given
    else if (requestedRole.fk_subject_tables_row) {
      resolve({
        fk: { fk_subject_tables_row: requestedRole.fk_subject_tables_row },
      });
    }

    /******************************************************
     * Second case: the primary key of subject is not known
     * but a related model is given
     *
     * -> find / create the related model to get primary key
     * -> return this new key and the related model
     ******************************************************/

    // if subject is an inf temporal_entity
    else if (hasRelatedModel(requestedRole.temporal_entity)) {
      //create the subject first
      return models.InfTemporalEntity.findOrCreateInfTemporalEntity(
        pkProject,
        requestedRole.temporal_entity,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_temporal_entity: relatedModel.pk_entity },
            relatedModel: { temporal_entity: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if subject is a inf persistent_item
    else if (hasRelatedModel(requestedRole.domain_pe_it)) {
      //create the subject first
      return models.InfPersistentItem.findOrCreatePeIt(
        pkProject,
        requestedRole.domain_pe_it,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_temporal_entity: relatedModel.pk_entity },
            relatedModel: { domain_pe_it: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if subject is a inf chunk
    else if (hasRelatedModel(requestedRole.domain_chunk)) {
      //create the subject first
      return models.DatChunk.create(requestedRole.domain_chunk)
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_subject_data: relatedModel.pk_entity },
            relatedModel: { domain_chunk: relatedModel },
          });
        })
        .catch(err => reject(err));
    }
    // if subject is a inf statement (we have a statement of statement)
    else if (hasRelatedModel(requestedRole.subject_inf_statement)) {
      //create the subject first

      return models.InfStatement.findOrCreateInfStatement(
        pkProject,
        requestedRole.subject_inf_statement,
        ctxWithoutBody
      )
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_temporal_entity: relatedModel.pk_entity },
            relatedModel: { subject_inf_statement: relatedModel },
          });
        })
        .catch(err => reject(err));
    } else {
      reject({
        message: 'Subject of statement not found',
        statement: requestedRole,
      });
    }
  });
}

/**
 *
 * Get the pk_entity of the object asyncronously.
 * The promise will return a js-object with two members:
 * - 'fk', containing one key-value pair
 *   - the key is the name of the statement foreign key pointing to the object
 *   - the value is the primary key of the object
 * - 'relatedModelone' (optional), containing one key-value pair
 *   - the key is the name of the related model according to loopbacks model definition
 *   - the value is the related model (e.g. the related time_primitive)
 *
 * @param {*} pkProject
 * @param {*} requestedRole
 * @param {*} ctxWithoutBody
 */
function getObject(pkProject, requestedRole, ctxWithoutBody) {
  return new Promise((resolve, reject) => {
    /******************************************************
     * First case: the primary key of object is known
     *
     * -> return this key without additional function call
     ******************************************************/

    // if fk_object_information is a given
    if (requestedRole.fk_entity) {
      resolve({
        fk: { fk_entity: requestedRole.fk_entity },
      });
    }
    // if fk_object_data is a given
    else if (requestedRole.fk_object_data) {
      resolve({
        fk: { fk_object_data: requestedRole.fk_object_data },
      });
    }
    // if fk_object_tables_cell is a given
    else if (requestedRole.fk_object_tables_cell) {
      resolve({
        fk: { fk_object_tables_cell: requestedRole.fk_object_tables_cell },
      });
    }
    // if fk_object_tables_row is a given
    else if (requestedRole.fk_object_tables_row) {
      resolve({
        fk: { fk_object_tables_row: requestedRole.fk_subject_tables_row },
      });
    }

    /******************************************************
     * Second case: the primary key of object is not known
     * but a related model is given
     *
     * -> find / create the related model to get primary key
     * -> return this new key and the related model
     ******************************************************/

    // if object is a temporal_entity
    else if (hasRelatedModel(requestedRole.range_temporal_entity)) {
      //create the object first
      return models.InfTemporalEntity.findOrCreateInfTemporalEntity(
        pkProject,
        requestedRole.range_temporal_entity,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { range_temporal_entity: relatedModel },
          });
        })
        .catch(err => reject(err));
    }
    // if object is an inf persistent_item
    else if (hasRelatedModel(requestedRole.persistent_item)) {
      //create the object first
      return models.InfPersistentItem.findOrCreatePeIt(
        pkProject,
        requestedRole.persistent_item,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { persistent_item: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf persistent_item
    // TODO: THIS IS REDUNDANT WITH THE ONE ABOVE!
    // Remove the unsed 'else if' here and
    // remove the relation in inf-statement.json
    else if (hasRelatedModel(requestedRole.range_pe_it)) {
      //create the object first
      return models.InfPersistentItem.findOrCreatePeIt(
        pkProject,
        requestedRole.range_pe_it,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { range_pe_it: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf place
    else if (hasRelatedModel(requestedRole.place)) {
      //create the subject first
      return models.InfPlace.findOrCreatePlace(
        pkProject,
        requestedRole.place,
        ctxWithoutBody
      )
        .then(resArray => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { place: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf appellation
    else if (hasRelatedModel(requestedRole.appellation)) {
      //create the subject first
      return models.InfAppellation.create(requestedRole.appellation)
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { appellation: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf lang_string
    else if (hasRelatedModel(requestedRole.lang_string)) {
      //create the subject first
      return models.InfLangString.create(requestedRole.lang_string)
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { lang_string: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf language
    else if (hasRelatedModel(requestedRole.language)) {
      //create the subject first
      return models.InfLanguage.find({
        where: { pk_entity: requestedRole.language.pk_entity },
      })
        .then(resArr => {
          const relatedModel = helpers.toObject(resArr[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { language: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf time_primitive
    else if (hasRelatedModel(requestedRole.time_primitive)) {
      //create the subject first
      return models.InfTimePrimitive.create(requestedRole.time_primitive)
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { time_primitive: relatedModel },
          });
        })
        .catch(err => reject(err));
    }

    // if object is an inf chunk
    else if (hasRelatedModel(requestedRole.range_chunk)) {
      //create the subject first
      return models.DatChunk.findOrCreateChunk(
        pkProject,
        requestedRole.range_chunk,
        ctxWithoutBody
      )
        .then(resArr => {
          const relatedModel = helpers.toObject(resArr[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_entity: relatedModel.pk_entity },
            relatedModel: { range_chunk: relatedModel },
          });
        })
        .catch(err => reject(err));
    } else {
      reject({
        message: 'Object of statement not found',
        statement: requestedRole,
      });
    }
  });
}
