'use strict';
const _ = require('lodash')

module.exports = function (InfRole) {

  InfRole.changeRoleProjectRelation = function (pkProject, isInProject, role, ctx) {

    let requestedRole;

    if (ctx && ctx.req && ctx.req.body) {
      requestedRole = ctx.req.body;
    } else {
      requestedRole = role;
    }

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    return InfRole.changeProjectRelation(pkProject, isInProject, requestedRole, ctxWithoutBody)
      .then(resultingEpr => {

        // attatch the new epr to the Role
        if (requestedRole.entity_version_project_rels && resultingEpr) {
          requestedRole.entity_version_project_rels = [resultingEpr];
        }

        if (requestedRole.temporal_entity) {
          //add the temporal_entity to the project
          const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
          return InfTemporalEntity.changeTeEntProjectRelation(pkProject, isInProject, requestedRole.temporal_entity, ctxWithoutBody)
            .then((results) => {
              requestedRole.temporal_entity = results[0];
              return [requestedRole];
            })
            .catch((err) => {
              console.log(err);
              return err;
            })
        } else if (requestedRole.persistent_item) {
          if (requestedRole.persistent_item.entity_version_project_rels) {
            //add the persistent_item to the project
            const InfPersistentItem = InfRole.app.models.InfPersistentItem;
            return InfPersistentItem.changePeItProjectRelation(pkProject, isInProject, requestedRole.persistent_item, ctxWithoutBody)
              .then((results) => {
                requestedRole.persistent_item = results[0];
                return [requestedRole];
              })
              .catch((err) => {
                console.log(err);
                return err;
              })
          } else {
            return [requestedRole];
          }
        }

        else if (requestedRole.appellation) {
          if (requestedRole.appellation.entity_version_project_rels) {

            //add the appellation to the project
            const InfAppellation = InfRole.app.models.InfAppellation;
            return InfAppellation.changeProjectRelation(pkProject, isInProject, requestedRole.appellation, ctxWithoutBody)
              .then((results) => {
                requestedRole.appellation.entity_version_project_rels = [results];
                return [requestedRole];
              })
              .catch((err) => {
                console.log(err);
                return err;
              })
          } else {
            return [requestedRole];
          }
        } else if (requestedRole.language) {
          if (requestedRole.language.entity_version_project_rels) {

            //add the language to the project
            const InfLanguage = InfRole.app.models.InfLanguage;
            return InfLanguage.changeProjectRelation(pkProject, isInProject, requestedRole.language, ctxWithoutBody)
              .then((results) => {
                requestedRole.entity_version_project_rels = [results];
                return [requestedRole];
              })
              .catch((err) => {
                console.log(err);
                return err;
              })
          } else {
            return [requestedRole];
          }
        } else {
          return [requestedRole];
        }

      })
      .catch((err) => {

      });


  }


  InfRole.findOrCreateInfRole = function (projectId, role, ctx) {
    return new Promise((resolve, reject) => {


      const dataObject = {
        // pk_entity: role.pk_entity,
        fk_entity: role.fk_entity,
        fk_temporal_entity: role.fk_temporal_entity,
        fk_property: role.fk_property,
        notes: role.notes,
      };

      let requestedRole = (ctx && ctx.req && ctx.req.body) ? ctx.req.body : role;

      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      // if the role points to a temporal entity
      if (requestedRole.temporal_entity && Object.keys(requestedRole.temporal_entity).length > 0) {

        //create the temporal_entity first
        const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
        return InfTemporalEntity.findOrCreateInfTemporalEntity(projectId, requestedRole.temporal_entity, ctxWithoutBody)
          .then((resultingTeEnts) => {

            const resultingTeEnt = resultingTeEnts[0];

            // … prepare the Role to create
            dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

            // call the api to find or create the role that points to the teEnt

            InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((roles) => {
                let res = roles[0].toJSON()
                res.temporal_entity = resultingTeEnt;
                resolve([res]);
              })
              .catch(err => reject(err))

          })
          .catch(err => reject(err))

      }

      // if the role points to a persistent item
      else if (requestedRole.persistent_item && Object.keys(requestedRole.persistent_item).length > 0) {

        // prepare parameters
        const InfPersistentItem = InfRole.app.models.InfPersistentItem;

        // find or create the peIt and the role pointing to it
        return InfPersistentItem.findOrCreatePeIt(projectId, requestedRole.persistent_item, ctxWithoutBody)
          .then((resultingPeIts) => {

            const resultingPeIt = resultingPeIts[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingPeIt.pk_entity;

            return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((resultingRoles) => {

                let res = resultingRoles[0].toJSON();
                res.persistent_item = resultingPeIt.toJSON();

                resolve([res]);

              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))

      }

      // if the role points to a place
      else if (requestedRole.place && Object.keys(requestedRole.place).length > 0) {

        // prepare parameters
        const InfPlace = InfRole.app.models.InfPlace;

        // find or create the place and the role pointing to it
        return InfPlace.findOrCreatePlace(projectId, requestedRole.place, ctxWithoutBody)
          .then((resultingEntities) => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((resultingRoles) => {

                let res = resultingRoles[0].toJSON();
                res.place = resultingEntity.toJSON();

                resolve([res]);

              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))

      }

      // if the role points to a appellation
      else if (requestedRole.appellation && Object.keys(requestedRole.appellation).length > 0) {

        // prepare parameters
        const InfAppellation = InfRole.app.models.InfAppellation;

        // find or create the appellation and the role pointing to it
        return InfAppellation.create(requestedRole.appellation)
          .then((resultingEntity) => {

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((resultingRoles) => {

                let res = resultingRoles[0].toJSON();
                res.appellation = resultingEntity.toJSON();

                resolve([res]);

              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))

      }

      // if the role points to a language
      else if (requestedRole.language && Object.keys(requestedRole.language).length > 0) {

        // prepare parameters
        const InfLanguage = InfRole.app.models.InfLanguage;

        // find the language and the role pointing to it
        return InfLanguage.find({ "where": { "pk_entity": requestedRole.language.pk_entity } })
          .then((resultingEntities) => {
            const resultingEntity = resultingEntities[0];

            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((resultingRoles) => {

                let res = resultingRoles[0].toJSON();
                res.language = resultingEntity.toJSON();

                resolve([res]);

              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))
      }

      // if the role points to a time_primitive
      else if (requestedRole.time_primitive && Object.keys(requestedRole.time_primitive).length > 0) {

        // prepare parameters
        const InfTimePrimitive = InfRole.app.models.InfTimePrimitive;

        // find or create the time_primitive and the role pointing to it
        delete requestedRole.time_primitive.pk_entity
        return InfTimePrimitive.create(requestedRole.time_primitive)
          .then((resultingEntity) => {


            // … prepare the Role to create
            dataObject.fk_entity = resultingEntity.pk_entity;

            return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
              .then((resultingRoles) => {

                let res = resultingRoles[0].toJSON();
                res.time_primitive = resultingEntity.toJSON();

                resolve([res]);

              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))
      }
      else {

        InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
          .catch(err => reject(err))
          .then(result => resolve(result))

      }

    });
  }


  InfRole.alternativesNotInProjectByEntityPk = function (entityPk, propertyPk, pkProject, cb) {

    const rolesInProjectFilter = {
      /** Select roles with fk_entity and fk_property … */
      "where": [
        "fk_entity", "=", entityPk,
        "and", "fk_property", "=", propertyPk
      ],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "entity_version_project_rels": {
          "$relation": {
            "name": "entity_version_project_rels",
            "joinType": "inner join",
            "where": [
              "fk_project", "=", pkProject,
              "and", "is_in_project", "=", "true"
            ]
          }
        }
      }
    }

    const findThem = function (err, roles) {

      const entitiesInProj = []

      for (var i = 0; i < roles.length; i++) {
        entitiesInProj.push(roles[i].pk_entity)
      }

      const filter = {
        /** Select roles with fk_entity and fk_property … */
        "where": [
          "fk_entity", "=", entityPk,
          "and", "fk_property", "=", propertyPk
        ],
        "orderBy": [{
          "pk_entity": "asc"
        }],
        "include": {
          /** include the temporal_entity of the role */
          "temporal_entity": {
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "te_roles": {
              "$relation": {
                "name": "te_roles",
                "joinType": "left join",
                  "orderBy": [{
                  "pk_entity": "asc"
                }]
              },
              "language": {
                "$relation": {
                  "name": "language",
                  "joinType": "left join",
                  //"where": ["is_community_favorite", "=", "true"],
                  "orderBy": [{
                    "pk_entity": "asc"
                  }]
                }
                //,...innerJoinThisProject, // … get project's version

              },
              "appellation": {
                "$relation": {
                  "name": "appellation",
                  "joinType": "left join",
                  //  "where": ["is_community_favorite", "=", "true"],
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

      if (entitiesInProj.length > 0) {
        filter.where = filter.where.concat(["and", "pk_entity", "NOT IN", entitiesInProj])
      }

      return InfRole.findComplex(filter, cb);
    };

    InfRole.findComplex(rolesInProjectFilter, findThem);

  };



  InfRole.alternativesNotInProjectByTeEntPk = function (teEntPk, propertyPk, pkProject, cb) {

    const rolesInProjectFilter = {
      /** Select roles with fk_temporal_entity and fk_property … */
      "where": [
        "fk_temporal_entity", "=", teEntPk,
        "and", "fk_property", "=", propertyPk
      ],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "entity_version_project_rels": {
          "$relation": {
            "name": "entity_version_project_rels",
            "joinType": "inner join",
            "where": [
              "fk_project", "=", pkProject,
              "and", "is_in_project", "=", "true"
            ]
          }
        }
      }
    }

    const findThem = function (err, roles) {

      const entitiesInProj = []

      for (var i = 0; i < roles.length; i++) {
        entitiesInProj.push(roles[i].pk_entity)
      }

      const filter = {
        /** Select roles with fk_temporal_entity and fk_property … */
        "where": [
          "fk_temporal_entity", "=", teEntPk,
          "and", "fk_property", "=", propertyPk,
          // "and", [
          //   "is_community_favorite", "=", "true",
          //   "or", "is_in_project_count", "=", "0"
          // ]
        ],
        "orderBy": [{
          "pk_entity": "asc"
        }],
        "include": {

          "language": {
            "$relation": {
              "name": "language",
              "joinType": "left join",
              //"where": ["is_community_favorite", "=", "true"],
              "orderBy": [{
                "pk_entity": "asc"
              }]
            }
            //,...innerJoinThisProject, // … get project's version

          },
          "appellation": {
            "$relation": {
              "name": "appellation",
              "joinType": "left join",
              //  "where": ["is_community_favorite", "=", "true"],
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
          }

        }
      };

      if (entitiesInProj.length > 0) {
        filter.where = filter.where.concat(["and", "pk_entity", "NOT IN", entitiesInProj])
      }

      return InfRole.findComplex(filter, cb);
    };

    InfRole.findComplex(rolesInProjectFilter, findThem);

  };


  InfRole.nestedObjectsOfProject = function (pk_project, pk_roles, cb) {

    const innerJoinThisProject = {
      "$relation": {
        "name": "entity_version_project_rels",
        "joinType": "inner join",
        "where": [
          "fk_project", "=", pk_project,
          "and", "is_in_project", "=", "true"
        ]
      }
    };

    const filter = {
      "where": ["pk_entity", "IN", pk_roles],
      include: {
        "entity_version_project_rels": innerJoinThisProject,
        "temporal_entity": {
          "$relation": {
            "name": "temporal_entity",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          // "entity_version_project_rels": innerJoinThisProject,
          "te_roles": {
            "$relation": {
              "name": "te_roles",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "entity_version_project_rels": innerJoinThisProject,
            "appellation": {
              "$relation": {
                "name": "appellation",
                "joinType": "left join",
                "orderBy": [{
                  "pk_entity": "asc"
                }]
              },
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
    }

    InfRole.findComplex(filter, cb);

  };


  /**
     * Add roles with their associated temporal entity to the project
     *
     * This query will add those things to the project:
     * - Roles that are enabled for auto-adding (using the admin configuration of that class).
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
  InfRole.addToProjectWithTeEnt = function (pk_project, pk_roles, ctx, cb) {
    if (!ctx.req.accessToken.userId) return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId]

    const sql_stmt = `
      select information.add_outgoing_roles_with_te_ens_to_project(ARRAY[${pk_roles.map(r => (r * 1)).join(', ')}], $1, $2);
    `

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);

      InfRole.nestedObjectsOfProject(pk_project, pk_roles, (err, result) => {
        cb(err, result)
      })

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
  InfRole.addToProject = function (pk_project, pk_roles, ctx, cb) {
    if (!ctx.req.accessToken.userId) return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId]

    const sql_stmt = `
      WITH
      -- Find the roles
      roles AS (
        select pk_entity, community_favorite_calendar as calendar
        from information.v_role
        where pk_entity IN (${pk_roles.map(r => (r * 1))})
      )
      -- add the project relations
      insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
      SELECT $1, true, pk_entity, calendar, $2
      from roles;
      `

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err, resultObjects);

      const innerJoinThisProject = {
        "$relation": {
          "name": "entity_version_project_rels",
          "joinType": "inner join",
          "where": [
            "fk_project", "=", pk_project,
            "and", "is_in_project", "=", "true"
          ]
        }
      };

      const filter = {
        where: ["pk_entity", "IN", pk_roles],
        include: {
          "entity_version_project_rels": innerJoinThisProject,
          "appellation": {
            "$relation": {
              "name": "appellation",
              "joinType": "left join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
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

      InfRole.findComplex(filter, cb)

    });
  };
};
