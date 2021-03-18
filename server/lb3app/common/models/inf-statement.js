'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const helpers = require('../helpers');
var SqlBuilderLbModels = require('../../../dist/lb3/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;
const models = require('../../server/server').models;

var SqlEntityPreviewList = require('../../../dist/lb3/server/sql-builders/sql-entity-preview-list')
  .SqlEntityPreviewList;

module.exports = function (InfStatement) {
  InfStatement.findOrCreateInfStatements = function (
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
      Promise.map(promiseArray, (promise) => promise)
        .catch((err) => reject(err))
        .then((res) => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfStatement.findOrCreateInfStatement = function (pkProject, statement, ctx) {
    return new Promise((resolve, reject) => {
      // the model to find or create
      let model = {
        // pk_entity: statement.pk_entity,
        fk_subject_info: statement.fk_subject_info,
        fk_subject_data: statement.fk_subject_data,
        fk_subject_tables_cell: statement.fk_subject_tables_cell,
        fk_subject_tables_row: statement.fk_subject_tables_row,
        fk_property: statement.fk_property,
        fk_property_of_property: statement.fk_property_of_property,
        fk_object_info: statement.fk_object_info,
        fk_object_data: statement.fk_object_data,
        fk_object_tables_cell: statement.fk_object_tables_cell,
        fk_object_tables_row: statement.fk_object_tables_row,
        // notes: statement.notes,
      };

      let reqStatement =
        ctx && ctx.req && ctx.req.body ? ctx.req.body : statement;
      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      const subject = getSubject(pkProject, reqStatement, ctxWithoutBody);
      const object = getObject(pkProject, reqStatement, ctxWithoutBody);

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
            reqStatement,
            ctxWithoutBody
          )
            .catch((err) => reject(err))
            .then((resArr) => {
              // add related models we retrieved asyncronously
              const result = {
                ...resArr[0],
                ...(subject.relatedModel || {}),
                ...(object.relatedModel || {}),
              };
              resolve(result);
            });
        })
        .catch((err) => reject(err));
    });
  };

  InfStatement.alternativesNotInProjectByEntityPk = function (
    entityPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const statementsInProjectFilter = {
      /** Select statements with fk_object_info and fk_property … */
      where: [
        'fk_object_info',
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

    const findThem = function (err, statements) {
      const entitiesInProj = [];

      for (var i = 0; i < statements.length; i++) {
        entitiesInProj.push(statements[i].pk_entity);
      }

      const filter = {
        /** Select statements with fk_object_info and fk_property … */
        where: [
          'fk_object_info',
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
              object_dimension: {
                $relation: {
                  name: 'object_dimension',
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

  InfStatement.alternativesNotInProjectByTeEntPk = function (
    teEntPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const statementsInProjectFilter = {
      /** Select statements with fk_subject_info and fk_property … */
      where: [
        'fk_subject_info',
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

    const findThem = function (err, statements) {
      const statementsInProj = [];

      for (var i = 0; i < statements.length; i++) {
        statementsInProj.push(statements[i].pk_entity);
      }

      const filter = {
        /** Select statements with fk_subject_info and fk_property … */
        where: [
          'fk_subject_info',
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
          object_dimension: {
            $relation: {
              name: 'object_dimension',
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

  /**
   * Add statements to the project
   *
   * This query will not add any related entitie but the given statements
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfStatement.addToProject = function (pk_project, pk_statements, ctx, cb) {
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
        where pk_entity IN (${pk_statements.map((r) => r * 1)})
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
          object_dimension: {
            $relation: {
              name: 'object_dimension',
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
  InfStatement.paginatedListTargetingEntityPreviews = function (
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
  InfStatement.queryByParams = function (
    ofProject,
    pkProject,
    pkEntity,
    fkObjectInfo,
    fkSubjectInfo,
    pkProperty,
    cb
  ) {
    if (!pkEntity && !fkObjectInfo && !fkSubjectInfo) {
      return cb(
        'please provide at least a pkEntity, fkObjectInfo or fkSubjectInfo'
      );
    }

    const w = {
      pk_entity: pkEntity,
      fk_object_info: fkObjectInfo,
      fk_subject_info: fkSubjectInfo,
      fk_property: pkProperty,
    };
    let where = [];
    Object.keys(w)
      .filter((key) => !!w[key])
      .map((key, index, ar) => {
        let part = [key, '=', w[key]];
        if (index !== 0) part = ['AND', ...part];
        return part;
      })
      .forEach((part) => {
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
      res.forEach((statement) => {
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
  InfStatement.sourcesAndDigitalsOfEntity = function (
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
        subject_chunk: {
          $relation: {
            name: 'subject_chunk',
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
          .filter((statement) => statement.subject_chunk)
          .map((statement) => statement.subject_chunk.fk_text)
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
 * @param {*} reqStatement
 * @param {*} ctxWithoutBody
 */
function getSubject(pkProject, reqStatement, ctxWithoutBody) {
  return new Promise((resolve, reject) => {
    /******************************************************
     * First case: the primary key of subject is known
     *
     * -> return this key without additional function call
     ******************************************************/

    // if fk_subject_information is a given
    if (reqStatement.fk_subject_info) {
      resolve({
        fk: { fk_subject_info: reqStatement.fk_subject_info },
      });
    }
    // if fk_subject_data is a given
    else if (reqStatement.fk_subject_data) {
      resolve({
        fk: { fk_subject_data: reqStatement.fk_subject_data },
      });
    }
    // if fk_subject_tables_cell is a given
    else if (reqStatement.fk_subject_tables_cell) {
      resolve({
        fk: { fk_subject_tables_cell: reqStatement.fk_subject_tables_cell },
      });
    }
    // if fk_subject_tables_row is a given
    else if (reqStatement.fk_subject_tables_row) {
      resolve({
        fk: { fk_subject_tables_row: reqStatement.fk_subject_tables_row },
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
    else if (hasRelatedModel(reqStatement.subject_temporal_entity)) {
      //create the subject first
      return models.InfTemporalEntity.findOrCreateInfTemporalEntity(
        pkProject,
        reqStatement.subject_temporal_entity,
        ctxWithoutBody
      )
        .then((resArray) => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_subject_info: relatedModel.pk_entity },
            relatedModel: { subject_temporal_entity: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if subject is a inf persistent_item
    else if (hasRelatedModel(reqStatement.subject_persistent_item)) {
      //create the subject first
      return models.InfPersistentItem.findOrCreatePeIt(
        pkProject,
        reqStatement.subject_persistent_item,
        ctxWithoutBody
      )
        .then((resArray) => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_subject_info: relatedModel.pk_entity },
            relatedModel: { subject_persistent_item: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if subject is a inf chunk
    else if (hasRelatedModel(reqStatement.subject_chunk)) {
      //create the subject first
      return models.DatChunk.create(reqStatement.subject_chunk)
        .then((res) => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_subject_data: relatedModel.pk_entity },
            relatedModel: { subject_chunk: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }
    // if subject is a inf statement (we have a statement of statement)
    else if (hasRelatedModel(reqStatement.subject_statement)) {
      //create the subject first

      return models.InfStatement.findOrCreateInfStatement(
        pkProject,
        reqStatement.subject_statement,
        ctxWithoutBody
      )
        .then((res) => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_subject_info: relatedModel.pk_entity },
            relatedModel: { subject_statement: relatedModel },
          });
        })
        .catch((err) => reject(err));
    } else {
      reject({
        message: 'Subject of statement not found',
        statement: JSON.stringify(reqStatement),
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
 * @param {*} reqStatement
 * @param {*} ctxWithoutBody
 */
function getObject(pkProject, reqStatement, ctxWithoutBody) {
  return new Promise((resolve, reject) => {
    /******************************************************
     * First case: the primary key of object is known
     *
     * -> return this key without additional function call
     ******************************************************/

    // if fk_object_information is a given
    if (reqStatement.fk_object_info) {
      resolve({
        fk: { fk_object_info: reqStatement.fk_object_info },
      });
    }
    // if fk_object_data is a given
    else if (reqStatement.fk_object_data) {
      resolve({
        fk: { fk_object_data: reqStatement.fk_object_data },
      });
    }
    // if fk_object_tables_cell is a given
    else if (reqStatement.fk_object_tables_cell) {
      resolve({
        fk: { fk_object_tables_cell: reqStatement.fk_object_tables_cell },
      });
    }
    // if fk_object_tables_row is a given
    else if (reqStatement.fk_object_tables_row) {
      resolve({
        fk: { fk_object_tables_row: reqStatement.fk_subject_tables_row },
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
    else if (hasRelatedModel(reqStatement.object_temporal_entity)) {
      //create the object first
      return models.InfTemporalEntity.findOrCreateInfTemporalEntity(
        pkProject,
        reqStatement.object_temporal_entity,
        ctxWithoutBody
      )
        .then((resArray) => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_temporal_entity: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }
    // if object is an inf object_persistent_item
    else if (hasRelatedModel(reqStatement.object_persistent_item)) {
      //create the object first
      return models.InfPersistentItem.findOrCreatePeIt(
        pkProject,
        reqStatement.object_persistent_item,
        ctxWithoutBody
      )
        .then((resArray) => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_persistent_item: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf place
    else if (hasRelatedModel(reqStatement.object_place)) {
      //create the object first
      return models.InfPlace.findOrCreatePlace(
        pkProject,
        reqStatement.object_place,
        ctxWithoutBody
      )
        .then((resArray) => {
          const relatedModel = helpers.toObject(resArray[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_place: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf dimension
    else if (hasRelatedModel(reqStatement.object_dimension)) {
      //create the object first
      return models.InfDimension.create(reqStatement.object_dimension)
        .then((res) => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_dimension: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf appellation
    else if (hasRelatedModel(reqStatement.object_appellation)) {
      //create the object first
      return models.InfAppellation.create(reqStatement.object_appellation)
        .then((res) => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_appellation: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf lang_string     
    else if (hasRelatedModel(reqStatement.object_lang_string)) {
      //create the object first       
      return models.InfLangString.create(reqStatement.object_lang_string)
        .then((res1) => {
          models.InfLangString.findById(res1.pk_entity).then((res) => {
            const relatedModel = helpers.toObject(res);
            // return the foreign key and the related model            
            resolve({
              fk: { fk_object_info: relatedModel.pk_entity },
              relatedModel: { object_lang_string: relatedModel },
            });
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf language
    else if (hasRelatedModel(reqStatement.object_language)) {
      //create the object first
      return models.InfLanguage.find({
        where: { pk_entity: reqStatement.object_language.pk_entity },
      })
        .then((resArr) => {
          const relatedModel = helpers.toObject(resArr[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_language: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf time_primitive
    else if (hasRelatedModel(reqStatement.object_time_primitive)) {
      //create the object first
      return models.InfTimePrimitive.create(reqStatement.object_time_primitive)
        .then((res) => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_time_primitive: relatedModel },
          });
        })
        .catch((err) => reject(err));
    }

    // if object is an inf chunk
    else if (hasRelatedModel(reqStatement.object_chunk)) {
      //create the object first
      return models.DatChunk.findOrCreateChunk(
        pkProject,
        reqStatement.object_chunk,
        ctxWithoutBody
      )
        .then((resArr) => {
          const relatedModel = helpers.toObject(resArr[0]);
          // return the foreign key and the related model
          resolve({
            fk: { fk_object_info: relatedModel.pk_entity },
            relatedModel: { object_chunk: relatedModel },
          });
        })
        .catch((err) => reject(err));
    } else {
      reject({
        message: 'Object of statement not found',
        statement: JSON.stringify(reqStatement),
      });
    }
  });
}
