'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const helpers = require('../helpers');
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

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

  InfRole.findOrCreateInfRole = function(projectId, role, ctx) {
    return new Promise((resolve, reject) => {
      const dataObject = {
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

      // if the role points to a temporal entity
      if (
        requestedRole.temporal_entity &&
        Object.keys(requestedRole.temporal_entity).length > 0
      ) {
        //create the temporal_entity first
        const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;

        return InfTemporalEntity.findOrCreateInfTemporalEntity(
          projectId,
          requestedRole.temporal_entity,
          ctxWithoutBody
        )
          .then(resultingEntities => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_temporal_entity = resultingEntity.pk_entity;

            // call the api to find or create the role that points to the teEnt

            InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(roles => {
                let res = roles[0];
                res.temporal_entity = helpers.toObject(resultingEntity);
                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role points to a persistent item
      else if (
        requestedRole.persistent_item &&
        Object.keys(requestedRole.persistent_item).length > 0
      ) {
        // prepare parameters
        const InfPersistentItem = InfRole.app.models.InfPersistentItem;

        // find or create the peIt and the role pointing to it
        return InfPersistentItem.findOrCreatePeIt(
          projectId,
          requestedRole.persistent_item,
          ctxWithoutBody
        )
          .then(resultingEntities => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.persistent_item = helpers.toObject(resultingEntity);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role points to a place
      else if (
        requestedRole.place &&
        Object.keys(requestedRole.place).length > 0
      ) {
        // prepare parameters
        const InfPlace = InfRole.app.models.InfPlace;

        // find or create the place and the role pointing to it
        return InfPlace.findOrCreatePlace(
          projectId,
          requestedRole.place,
          ctxWithoutBody
        )
          .then(resultingEntities => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.place = helpers.toObject(resultingEntity);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role points to a appellation
      else if (
        requestedRole.appellation &&
        Object.keys(requestedRole.appellation).length > 0
      ) {
        // prepare parameters
        const InfAppellation = InfRole.app.models.InfAppellation;

        // find or create the appellation and the role pointing to it
        return InfAppellation.create(requestedRole.appellation)
          .then(res => {
            InfAppellation.findById(res.pk_entity)
              .then(resultingEntity => {
                // … prepare the Role to create
                dataObject.fk_entity = resultingEntity.pk_entity;

                return InfRole._findOrCreateByValue(
                  InfRole,
                  projectId,
                  dataObject,
                  requestedRole,
                  ctxWithoutBody
                )
                  .then(resultingRoles => {
                    let res = resultingRoles[0];
                    res.appellation = helpers.toObject(resultingEntity);

                    resolve([res]);
                  })
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role points to a language
      else if (
        requestedRole.language &&
        Object.keys(requestedRole.language).length > 0
      ) {
        // prepare parameters
        const InfLanguage = InfRole.app.models.InfLanguage;

        // find the language and the role pointing to it
        return InfLanguage.find({
          where: { pk_entity: requestedRole.language.pk_entity },
        })
          .then(resultingEntities => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.language = helpers.toObject(resultingEntity);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role points to a time_primitive
      else if (
        requestedRole.time_primitive &&
        Object.keys(requestedRole.time_primitive).length > 0
      ) {
        // prepare parameters
        const InfTimePrimitive = InfRole.app.models.InfTimePrimitive;

        // find or create the time_primitive and the role pointing to it
        delete requestedRole.time_primitive.pk_entity;
        return InfTimePrimitive.create(requestedRole.time_primitive)
          .then(resultingEntity => {
            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.time_primitive = helpers.toObject(resultingEntity);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role has a persistent item as the domain
      if (
        requestedRole.domain_pe_it &&
        Object.keys(requestedRole.domain_pe_it).length > 0
      ) {
        // prepare parameters
        const InfPersistentItem = InfRole.app.models.InfPersistentItem;

        // find or create the peIt and the role pointing to it
        InfPersistentItem.findOrCreatePeIt(
          projectId,
          requestedRole.domain_pe_it,
          ctxWithoutBody
        )
          .then(resultingPeIts => {
            const resultingPeIt = resultingPeIts[0];

            // … prepare the role to create
            dataObject.fk_temporal_entity = resultingPeIt.pk_entity;

            InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.domain_pe_it = helpers.toObject(resultingPeIt);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role has a persistent item as the range
      else if (
        requestedRole.range_pe_it &&
        Object.keys(requestedRole.range_pe_it).length > 0
      ) {
        // prepare parameters
        const InfPersistentItem = InfRole.app.models.InfPersistentItem;

        // find or create the peIt and the role pointing to it
        InfPersistentItem.findOrCreatePeIt(
          projectId,
          requestedRole.range_pe_it,
          ctxWithoutBody
        )
          .then(resultingPeIts => {
            const resultingPeIt = resultingPeIts[0];

            // … prepare the role to create
            dataObject.fk_entity = resultingPeIt.pk_entity;

            InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.range_pe_it = helpers.toObject(resultingPeIt);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role has a chunk as the domain
      else if (
        requestedRole.domain_chunk &&
        Object.keys(requestedRole.domain_chunk).length > 0
      ) {
        // prepare parameters
        const DatChunk = InfRole.app.models.DatChunk;

        // find or create the chunk and the role pointing to it
        DatChunk.create(requestedRole.domain_chunk)
          .then(resultingObject => {
            // … prepare the role to create
            dataObject.fk_subject_data = resultingObject.pk_entity;

            InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.domain_chunk = helpers.toObject(resultingObject);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }

      // if the role has a chunk as the range
      else if (
        requestedRole.range_chunk &&
        Object.keys(requestedRole.range_chunk).length > 0
      ) {
        // prepare parameters
        const DatChunk = InfRole.app.models.DatChunk;

        // find or create the peIt and the role pointing to it
        DatChunk.findOrCreateChunk(
          projectId,
          requestedRole.range_chunk,
          ctxWithoutBody
        )
          .then(resultingObjects => {
            const resultingObject = resultingObjects[0];

            // … prepare the role to create
            dataObject.fk_object_data = resultingObject.pk_entity;

            InfRole._findOrCreateByValue(
              InfRole,
              projectId,
              dataObject,
              requestedRole,
              ctxWithoutBody
            )
              .then(resultingRoles => {
                let res = resultingRoles[0];
                res.range_chunk = helpers.toObject(resultingObject);

                resolve([res]);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      } else {
        InfRole._findOrCreateByValue(
          InfRole,
          projectId,
          dataObject,
          requestedRole,
          ctxWithoutBody
        )
          .catch(err => reject(err))
          .then(result => resolve(result));
      }
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
    const q = new FlatObjectQueryBuilder(InfRole.app.models);

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
    const mainQuery = new FlatObjectQueryBuilder(
      InfRole.app.models
    ).createEntityPreviewListQuery(
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
      joinThisProject.$relation['select'] = false;
      filter['include'] = {
        entity_version_project_rels: joinThisProject,
      };
    }

    return InfRole.findComplex(filter, cb);
  };

  /**
   * Get an array of roles that build the tree of the content of an F2 Expression.
   */
  InfRole.contentTree = function(pkProject, pkExpressionEntity, cb) {
    const q = new FlatObjectQueryBuilder(
      InfRole.app.models
    ).createContentTreeQuery(pkProject, pkExpressionEntity);
    const params = q.params;
    const sql_stmt = q.sql;

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err);
      else if (resultObjects && resultObjects.length && resultObjects[0].data) {
        cb(err, resultObjects[0].data);
      } else {
        cb(false, {});
      }
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
