'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const helpers = require('../helpers');
var SqlBuilderLbModels = require('../../dist/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;
const models = require('../../server/server').models;

var SqlEntityPreviewList = require('../../dist/server/sql-builders/sql-entity-preview-list')
  .SqlEntityPreviewList;

module.exports = function(InfRole) {
  InfRole.findOrCreateInfRoles = function(pk_project, roles, ctx) {
    return new Promise((resolve, reject) => {
      const promiseArray = roles.map((role, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfRole.findOrCreateInfRole(pk_project, role, context);
      });
      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfRole.findOrCreateInfRole = function(pkProject, role, ctx) {
    return new Promise((resolve, reject) => {
      // the model to find or create
      let model = {
        // pk_entity: role.pk_entity,
        fk_temporal_entity: role.fk_temporal_entity,
        fk_subject_data: role.fk_subject_data,
        fk_subject_tables_cell: role.fk_subject_tables_cell,
        fk_subject_tables_row: role.fk_subject_tables_row,
        fk_property: role.fk_property,
        fk_property_of_property: role.fk_property_of_property,
        fk_entity: role.fk_entity,
        fk_object_data: role.fk_object_data,
        fk_object_tables_cell: role.fk_object_tables_cell,
        fk_object_tables_row: role.fk_object_tables_row,
        // notes: role.notes,
      };

      let requestedRole = ctx && ctx.req && ctx.req.body ? ctx.req.body : role;
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

          InfRole._findOrCreateByValue(
            InfRole,
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

  InfRole.alternativesNotInProjectByEntityPk = function(
    entityPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const rolesInProjectFilter = {
      /** Select roles with fk_entity and fk_property … */
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

    const findThem = function(err, roles) {
      const entitiesInProj = [];

      for (var i = 0; i < roles.length; i++) {
        entitiesInProj.push(roles[i].pk_entity);
      }

      const filter = {
        /** Select roles with fk_entity and fk_property … */
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
          /** include the temporal_entity of the role */
          temporal_entity: {
            $relation: {
              name: 'temporal_entity',
              joinType: 'inner join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
            te_roles: {
              $relation: {
                name: 'te_roles',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
                where: ['is_in_project_count', '>', '0'], // new
              },
              language: {
                $relation: {
                  name: 'language',
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
              appellation: {
                $relation: {
                  name: 'appellation',
                  joinType: 'left join',
                  //  "where": ["is_community_favorite", "=", "true"],
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

      if (entitiesInProj.length > 0) {
        filter.where = filter.where.concat([
          'and',
          'pk_entity',
          'NOT IN',
          entitiesInProj,
        ]);
      }

      return InfRole.findComplex(filter, cb);
    };

    InfRole.findComplex(rolesInProjectFilter, findThem);
  };

  InfRole.alternativesNotInProjectByTeEntPk = function(
    teEntPk,
    propertyPk,
    pkProject,
    cb
  ) {
    const rolesInProjectFilter = {
      /** Select roles with fk_temporal_entity and fk_property … */
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

    const findThem = function(err, roles) {
      const rolesInProj = [];

      for (var i = 0; i < roles.length; i++) {
        rolesInProj.push(roles[i].pk_entity);
      }

      const filter = {
        /** Select roles with fk_temporal_entity and fk_property … */
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

      if (rolesInProj.length > 0) {
        filter.where = filter.where.concat([
          'and',
          'pk_entity',
          'NOT IN',
          rolesInProj,
        ]);
      }

      return InfRole.findComplex(filter, cb);
    };

    InfRole.findComplex(rolesInProjectFilter, findThem);
  };

  InfRole.nestedObjectsOfProject = function(pk_project, pk_roles, cb) {
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
      where: ['pk_entity', 'IN', pk_roles],
      include: {
        entity_version_project_rels: innerJoinThisProject,
        temporal_entity: {
          $relation: {
            name: 'temporal_entity',
            joinType: 'inner join',
            orderBy: [
              {
                pk_entity: 'asc',
              },
            ],
          },
          // "entity_version_project_rels": innerJoinThisProject,
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
        },
      },
    };

    InfRole.findComplex(filter, cb);
  };

  /**
   * Add roles with their associated temporal entity to the project
   *
   * This query will add those things to the project:
   * - Roles that are enabled for the project
   *
   * This query will not add
   * - The temporal entities (since we can then still decide, which temporal entities will be shown in the result list)
   * - The value-like items (time-primitive, appellation, language), since they never belong to projects
   *
   * See this page for details
   * https://kleiolab.atlassian.net/wiki/spaces/GEOV/pages/693764097/Add+DataUnits+to+Project
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfRole.addToProjectWithTeEnt = function(pk_project, pk_roles, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId];

    const sql_stmt = `
      select information.relate_outgoing_roles_with_te_ens_to_project(ARRAY[${pk_roles
        .map(r => r * 1)
        .join(', ')}], $1, $2, true);
    `;

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);

      InfRole.nestedObjectsOfProject(pk_project, pk_roles, (err, result) => {
        cb(err, result);
      });
    });
  };

  InfRole.removeFromProjectWithTeEnt = function(pk_project, pk_roles, ctx, cb) {
    const q = new SqlBuilderLbModels(InfRole.app.models);

    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId];

    const sql_stmt = `
      select ${q.createSelect('t1', 'ProInfoProjRel')}
       FROM information.relate_outgoing_roles_with_te_ens_to_project(ARRAY[${pk_roles
         .map(r => r * 1)
         .join(', ')}], $1, $2, false) t1;
    `;

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);
      cb(false, resultObjects);
    });
  };

  /**
   * Add roles to the project
   *
   * This query will not add any related entitie but the given roles
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfRole.addToProject = function(pk_project, pk_roles, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId];

    const sql_stmt = `
      WITH
      -- Find the roles
      roles AS (
        select pk_entity, community_favorite_calendar as calendar
        from information.v_role
        where pk_entity IN (${pk_roles.map(r => r * 1)})
      )
      -- add the project relations
      insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
      SELECT $1, true, pk_entity, calendar, $2
      from roles;
      `;

    const connector = InfRole.dataSource.connector;
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
        where: ['pk_entity', 'IN', pk_roles],
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

      InfRole.findComplex(filter, cb);
    });
  };

  /**
   * load paginated list by roles, that point to an
   * entity_preview
   */
  InfRole.paginatedListTargetingEntityPreviews = function(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset,
    cb
  ) {
    const mainQuery = new SqlEntityPreviewList(InfRole.app.models).create(
      fkProject,
      fkSourceEntity,
      fkProperty,
      fkTargetClass,
      isOutgoing,
      limit,
      offset
    );
    const connector = InfRole.dataSource.connector;
    connector.execute(mainQuery.sql, mainQuery.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };

  /**
   * Find role by one of the params
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the role
   */
  InfRole.queryByParams = function(
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
      const joinThisProject = InfRole.app.models.ProInfoProjRel.getJoinObject(
        ofProject,
        pkProject
      );
      // joinThisProject.$relation['select'] = false;
      filter['include'] = {
        entity_version_project_rels: joinThisProject,
      };
    }

    return InfRole.findComplex(filter, (err, res) => {
      if (err) cb(err);
      res.forEach(role => {
        role.fk_subject_tables_row = parseInt(role.fk_subject_tables_row, 10);
        role.fk_subject_tables_cell = parseInt(role.fk_subject_tables_cell, 10);
        role.fk_object_tables_row = parseInt(role.fk_object_tables_row, 10);
        role.fk_object_tables_cell = parseInt(role.fk_object_tables_cell, 10);
      });
      cb(false, res);
    });
  };

  /**
   * Get an nested object with everything needed to display the
   * links made from an entity towards sources and digitals.
   */
  InfRole.sourcesAndDigitalsOfEntity = function(
    ofProject,
    pkProject,
    pkEntity,
    cb
  ) {
    const joinThisProject = InfRole.app.models.ProInfoProjRel.getJoinObject(
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

    return InfRole.findComplex(filter, (err, roles) => {
      if (err) return cb(err);

      const textPks = _.uniq(
        roles
          .filter(role => role.domain_chunk)
          .map(role => role.domain_chunk.fk_text)
      );

      if (!textPks.length) return cb(null, roles);

      InfRole.app.models.DatDigital.findComplex(
        {
          where: ['pk_text', 'IN', textPks],
        },
        (err2, digitals) => {
          if (err2) return cb(err2);

          cb(null, {
            roles,
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
 *   - the key is the name of the role foreign key pointing to the subject
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
    // if subject is a inf role (we have a statement of statement)
    else if (hasRelatedModel(requestedRole.subject_inf_role)) {
      //create the subject first

      return models.InfRole.findOrCreateInfRole(
        pkProject,
        requestedRole.subject_inf_role,
        ctxWithoutBody
      )
        .then(res => {
          const relatedModel = helpers.toObject(res);
          // return the foreign key and the related model
          resolve({
            fk: { fk_temporal_entity: relatedModel.pk_entity },
            relatedModel: { subject_inf_role: relatedModel },
          });
        })
        .catch(err => reject(err));
    } else {
      reject({
        message: 'Subject of role not found',
        role: requestedRole,
      });
    }
  });
}

/**
 *
 * Get the pk_entity of the object asyncronously.
 * The promise will return a js-object with two members:
 * - 'fk', containing one key-value pair
 *   - the key is the name of the role foreign key pointing to the object
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
    // TODO, if needed!

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
    // remove the relation in inf-role.json
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
        message: 'Object of role not found',
        role: requestedRole,
      });
    }
  });
}
