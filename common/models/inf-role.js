'use strict';

module.exports = function (InfRole) {

  InfRole.changeRoleProjectRelation = function (projectId, isInProject, role, ctx) {

    let requestedRole;

    if (ctx) {
      requestedRole = ctx.req.body;
    } else {
      requestedRole = role;
    }

    return InfRole.changeProjectRelation(projectId, isInProject, requestedRole)
      .then(resultingEpr => {

        // attatch the new epr to the Role
        if (requestedRole.entity_version_project_rels && resultingEpr) {
          requestedRole.entity_version_project_rels = [resultingEpr];
        }

        if (requestedRole.temporal_entity) {
          //add the temporal_entity to the project
          const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
          return InfTemporalEntity.changeTeEntProjectRelation(projectId, isInProject, requestedRole.temporal_entity)
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
            return InfPersistentItem.changePeItProjectRelation(projectId, isInProject, requestedRole.persistent_item)
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
            return InfAppellation.changeProjectRelation(projectId, isInProject, requestedRole.appellation)
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
            return InfLanguage.changeProjectRelation(projectId, isInProject, requestedRole.language)
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

    let requestedRole = ctx ? ctx.req.body : role;


    if (requestedRole.temporal_entity && Object.keys(requestedRole.temporal_entity).length > 0) {

      //create the temporal_entity first
      const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
      return InfTemporalEntity.findOrCreateInfTemporalEntity(projectId, requestedRole.temporal_entity)
        .then((resultingTeEnts) => {

          const resultingTeEnt = resultingTeEnts[0];

          // … prepare the Role to create
          dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

          // call the api to find or create the role that points to the teEnt
          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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
      return InfPersistentItem.findOrCreatePeIt(projectId, requestedRole.persistent_item)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingPeIt.pk_entity;

          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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
      return InfPlace.findOrCreatePlace(projectId, requestedRole.place)
        .then((resultingEntities) => {
          const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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

          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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
      return InfLanguage.find({"where": {"pk_entity": requestedRole.language.pk_entity}})
       .then((resultingEntities) => {
        const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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
      return InfTimePrimitive.create(requestedRole.time_primitive)
        .then((resultingEntity) => {
          

          // … prepare the Role to create 
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)
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

      return InfRole.findOrCreateByValue(InfRole, projectId, dataObject, requestedRole)

    }

  }


  InfRole.alternativesNotInProjectByEntityPk = function (entityPk, propertyPk, projectId, cb) {

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
              "fk_project", "=", projectId,
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



  InfRole.alternativesNotInProjectByTeEntPk = function (teEntPk, propertyPk, projectId, cb) {

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
              "fk_project", "=", projectId,
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
};