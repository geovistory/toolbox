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
                return err;
              })
          } else {
            return [requestedRole];
          }
        }

        // else if (requestedRole.place) {
        //   if (requestedRole.place.eprs) {
        //     //add the place to the project
        //     const InfPlace = InfRole.app.models.InfPlace;
        //     return InfPlace.changeProjectRelation(projectId, isInProject, requestedRole.place)
        //       .then((results) => {
        //         requestedRole.place = results[0];
        //         return [requestedRole];
        //       })
        //       .catch((err) => {
        //         return err;
        //       })
        //   } else {
        //     return [requestedRole];
        //   }
        // } 

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

    const dataObject = {
      // pk_entity: role.pk_entity,
      fk_entity: role.fk_entity,
      fk_temporal_entity: role.fk_temporal_entity,
      fk_property: role.fk_property,
      notes: role.notes,
    };

    let requestedRole = (ctx && ctx.req.body) ? ctx.req.body : role;

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    if (requestedRole.temporal_entity && Object.keys(requestedRole.temporal_entity).length > 0) {

      //create the temporal_entity first
      const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
      return InfTemporalEntity.findOrCreateInfTemporalEntity(projectId, requestedRole.temporal_entity, ctxWithoutBody)
        .then((resultingTeEnts) => {

          const resultingTeEnt = resultingTeEnts[0];

          // … prepare the Role to create
          dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

          // call the api to find or create the role that points to the teEnt
          return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)
            .then((roles) => {

              let res = roles[0].toJSON()
              res.temporal_entity = resultingTeEnt;

              return [res];

            })
            .catch((err) => {
              return err;
            })

        })
        .catch((err) => {
          return err;
        })

    }

    // if the role points to a persistent item
    if (requestedRole.persistent_item && Object.keys(requestedRole.persistent_item).length > 0) {

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

              let res = resultingRole[0].toJSON();
              res.persistent_item = resultingPeIt.toJSON();

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

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

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

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

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

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

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })
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

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })
    }
    else {

      return InfRole._findOrCreateByValue(InfRole, projectId, dataObject, requestedRole, ctxWithoutBody)

    }

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
          /** include the temporal_entity of the role */
          "temporal_entity": {
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
              //  "where": ["is_community_favorite", "=", "true"],
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "te_roles": {
              "$relation": {
                "name": "te_roles",
                "joinType": "left join",
                // "where": ["rank_for_te_ent", "=", "1"],
                // "where":s ["rank_for_te_ent", "<=", "range_max_quantifier", "OR", "range_max_quantifier", "=", "-1", "OR", "range_max_quantifier", "IS NULL"],
                "orderBy": [{
                  "rank_for_te_ent": "asc"
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
    -- Relate given roles with its temporal entities to given project --
    ----------------------------------------------------

    WITH 
    -- Find "auto-add-properties" for all classes 
    -- TODO: Add a filter for properties enabled by given project
       auto_add_properties AS (
      -- select the fk_class and the properties that are auto add because of a ui_context_config
      select p.dfh_has_domain as fk_class, p.dfh_pk_property, p.dfh_range_instances_max_quantifier as max_quantifier
      from data_for_history.property as p
      inner join commons.ui_context_config as ctxt on p.dfh_pk_property = ctxt.fk_property
      Where ctxt.fk_ui_context = 47 AND ctxt.ord_num is not null AND ctxt.property_is_outgoing = true
      UNION
      select p.dfh_has_range as fk_class, p.dfh_pk_property, p.dfh_domain_instances_max_quantifier as max_quantifier
      from data_for_history.property as p
      inner join commons.ui_context_config as ctxt on p.dfh_pk_property = ctxt.fk_property
      Where ctxt.fk_ui_context = 47 AND ctxt.ord_num is not null AND ctxt.property_is_outgoing = false
      UNION
      -- select the fk_class and the properties that are auto add because of a property set
      select ctxt.fk_class_for_class_field, psprel.fk_property, p.dfh_domain_instances_max_quantifier as max_quantifier
      from data_for_history.property as p
      inner join commons.class_field_property_rel as psprel on psprel.fk_property = p.dfh_pk_property
      inner join commons.ui_context_config as ctxt on psprel.fk_class_field = ctxt.fk_class_field
      Where ctxt.fk_ui_context = 47 AND ctxt.ord_num is not null AND psprel.property_is_outgoing = false
      UNION
      select ctxt.fk_class_for_class_field, psprel.fk_property, p.dfh_range_instances_max_quantifier as max_quantifier
      from data_for_history.property as p
      inner join commons.class_field_property_rel as psprel on psprel.fk_property = p.dfh_pk_property
      inner join commons.ui_context_config as ctxt on psprel.fk_class_field = ctxt.fk_class_field
      Where ctxt.fk_ui_context = 47 AND ctxt.ord_num is not null AND psprel.property_is_outgoing = true
    ),
  -- Find the roles
    pe_it_roles AS (
        select pk_entity, fk_temporal_entity
      from information.v_role 
      where pk_entity IN (${pk_roles.map(r => (r * 1))})
    ),
    -- Find all roles related to temporal entities mached by pe_it_roles
    -- that are of an auto-add property
    te_ent_roles AS (
      select r.pk_entity, r.fk_temporal_entity, r.fk_property, r.fk_entity, addp.max_quantifier, r.community_favorite_calendar as calendar
      from information.v_role as r
      inner join pe_it_roles as pi_r on pi_r.fk_temporal_entity = r.fk_temporal_entity
      inner join information.temporal_entity as te on te.pk_entity = pi_r.fk_temporal_entity
      inner join auto_add_properties as addp on (addp.dfh_pk_property = r.fk_property AND addp.fk_class = te.fk_class)
      -- take only the max quantity of rows for that property, exclude repo-alternatives
      WHERE r.rank_for_te_ent <= r.range_max_quantifier OR r.range_max_quantifier = -1 OR r.range_max_quantifier IS NULL
    ),
   
    -- TODO: find all entity associations that involve the te_ents (for types or mentionings of te_ents!)

    -- get a list of all pk_entities of repo version
    pk_entities_of_repo AS (
      select pk_entity, null::calendar_type as calendar from pe_it_roles
      UNION
      select fk_temporal_entity, null::calendar_type as calendar from pe_it_roles
      UNION 
      select pk_entity, calendar from te_ent_roles
    ),
    -- get a list of all pk_entities that the project manually removed
    pk_entities_excluded_by_project AS (
      SELECT fk_entity as pk_entity
      FROM information.v_entity_version_project_rel as epr 
      where epr.is_in_project = false and epr.fk_project = 12
    ),
    -- get final list of pk_entities to add to project
    pk_entities_to_add AS (
      select pk_entity, calendar from pk_entities_of_repo
    --  EXCEPT
    --  select pk_entity, null::calendar_type from pk_entities_excluded_by_project
    )
    --  select * from pk_entities_to_add;

    insert into information.v_entity_version_project_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
    SELECT $1, true, pk_entity, calendar, $2
    from pk_entities_to_add;
    `

    const connector = InfRole.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err, resultObjects);

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
      insert into information.v_entity_version_project_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
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