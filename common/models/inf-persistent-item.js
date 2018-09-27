'use strict';

const Promise = require('bluebird');
const InfConfig = require('../config/InfConfig');


module.exports = function (InfPersistentItem) {

  InfPersistentItem.changePeItProjectRelation = function (projectId, isInProject, data, ctx) {
    let requestedPeIt;

    if (ctx) {
      requestedPeIt = ctx.req.body;
    } else {
      requestedPeIt = data;
    }

    return InfPersistentItem.changeProjectRelation(projectId, isInProject, requestedPeIt)
      .then(resultingEpr => {

        // attatch the new epr to the peIt
        if (requestedPeIt.entity_version_project_rels && resultingEpr) {
          requestedPeIt.entity_version_project_rels = [resultingEpr];
        }


        if (requestedPeIt.pi_roles) {

          // prepare parameters
          const InfRole = InfPersistentItem.app.models.InfRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          return Promise.map(requestedPeIt.pi_roles.filter(role => (role)), (role) => {

            // add role to project
            return InfRole.changeRoleProjectRelation(projectId, isInProject, role);

          })
            .then((roles) => {

              requestedPeIt.pi_roles = [];
              for (var i = 0; i < roles.length; i++) {
                const role = roles[i];
                if (role && role[0]) {
                  requestedPeIt.pi_roles.push(role[0]);
                }
              }

              return [requestedPeIt];

            })
            .catch((err) => {
              return err;
            })

        } else {
          return [requestedPeIt];
        }
      })
      .catch((err) => {
        return err;
      });

  }


  InfPersistentItem.findOrCreatePeIt = function (projectId, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    let requestedPeIt;

    if (ctx) {
      requestedPeIt = ctx.req.body;
    } else {
      requestedPeIt = data;
    }

    return InfPersistentItem.findOrCreatePeItOrTeEnt(InfPersistentItem, projectId, dataObject)
      .then((resultingPeIts) => {
        // pick first item of array
        const resultingPeIt = resultingPeIts[0];
        const res = resultingPeIt.toJSON();

        // Array of Promises
        const promiseArray = []

        /******************************************
         * pi-roles
         ******************************************/
        if (requestedPeIt.pi_roles) {

          // prepare parameters
          const InfRole = InfPersistentItem.app.models.InfRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          const promise = Promise.map(requestedPeIt.pi_roles.filter(role => (role)), (role) => {
            // use the pk_entity from the created peIt to set the fk_entity of the role
            role.fk_entity = resultingPeIt.pk_entity;
            // find or create the teEnt and the role pointing to the teEnt
            return InfRole.findOrCreateInfRole(projectId, role);
          }).then((roles) => {
            //attach the roles to peit.pi_roles
            res.pi_roles = [];
            for (var i = 0; i < roles.length; i++) {
              const role = roles[i];
              if (role && role[0]) {
                res.pi_roles.push(role[0]);
              }
            }
            return true;

          }).catch((err) => {
            return err;
          })

          // add promise for pi_roles
          promiseArray.push(promise)

        }

        /******************************************
         * text_properties
         ******************************************/
        if (requestedPeIt.text_properties) {

          // prepare parameters
          const InfTextProperty = InfPersistentItem.app.models.InfTextProperty;

          //… filter items that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          const promise = Promise.map(requestedPeIt.text_properties.filter(item => (item)), (item) => {
            // use the pk_entity from the created peIt to set the fk_concerned_entity of the item
            item.fk_concerned_entity = resultingPeIt.pk_entity;
            // find or create the item
            return InfTextProperty.findOrCreateInfTextProperty(projectId, item);
          }).then((items) => {
            //attach the items to peit.text_properties
            res.text_properties = [];
            for (var i = 0; i < items.length; i++) {
              const item = items[i];
              if (item && item[0]) {
                res.text_properties.push(item[0]);
              }
            }
            return true;

          }).catch((err) => {
            return err;
          })

          // add promise for text properties
          promiseArray.push(promise)

        }


        if (promiseArray.length === 0) return resultingPeIts;
        else return Promise.map(promiseArray, (promise) => promise).then(() => {
          return [res]
        });

      })
      .catch((err) => {

      });

  }

  /**
   * Remote method to create instances of E55 types.
   * 
   * Adds a type_namespace_rel between peIt and namespace
   * 
   * TODO: ACL che 
   */
  InfPersistentItem.findOrCreateType = function (pk_project, pk_namespace, data, ctx) {

    /** 
     * Check if authorized
     * - pk_namespace must be of "Geovistory Ongoing"
     * TODO: - or pk_project must be in fk_project of namespace  
     */
    if (pk_namespace !== InfConfig.PK_NAMESPACE__GEOVISTORY_ONGOING) {
      return new Error('Authorization needed')
    }

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    let requestedPeIt;

    if (ctx) {
      requestedPeIt = ctx.req.body;
    } else {
      requestedPeIt = data;
    }

    // Add type_namespace_rel
    return InfPersistentItem.findOrCreatePeIt(pk_project, data, ctx)
      .then(resultingPeIts => {
        const res = resultingPeIts[0]

        const InfTypeNamespaceRel = InfPersistentItem.app.models.InfTypeNamespaceRel;
        const x = new InfTypeNamespaceRel({
          fk_persistent_item: res.pk_entity,
          fk_namespace: pk_namespace
        })

        // create it in DB
        return x.save().then(tyNaRel => {
          return [res]
        });

      })

  }

  InfPersistentItem.searchInProject = function (projectId, searchString, limit, page, cb) {

    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        'name': 'Max limit exceeded',
        'status': 403,
        'message': 'Max limit exceeded. The limit can not be bigger than 200.'
      }
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page - 1);

    if (searchString) {
      var queryString = searchString.trim(' ').split(' ').map(word => {
        return word + ':*'
      }).join(' & ');
    } else {
      var queryString = '';
    }


    var params = [
      queryString,
      limit,
      offset,
      projectId
    ];

    var sql_stmt = `

    WITH
    epr_of_project AS (
      SELECT fk_project, fk_entity, is_in_project, is_standard_in_project, ord_num
      FROM information.entity_version_project_rel
      WHERE is_in_project = true AND fk_project IN ($4)
    ),
    appe_in_project AS (
      SELECT DISTINCT
      token.pk_entity,
      token.appellation_label,
      string_agg(token.string, '' ORDER BY row_number) as appellation_string
      FROM
      (
        SELECT
        ROW_NUMBER() OVER() AS row_number,
        tokens.pk_entity,
        tokens.token->>'isSeparator' AS is_separator,
        tokens.token->>'string' AS string,
        tokens.appellation_label
        FROM
        (
          SELECT jsonb_array_elements(appellation_label->'tokens') as token, appe.pk_entity, appellation_label
          FROM information.v_appellation as appe
          -- INNER JOIN epr_of_project as epr on epr.fk_entity_version_concat = appe.pk_entity_version_concat
        ) AS tokens
        -- WHERE tokens.token->>'isSeparator' = 'false'
      ) AS token
      -- add where clause here to search in forenames, last names etc.
      GROUP BY   token.pk_entity, token.appellation_label
    ),
    roles_in_project AS (
      SELECT ro.fk_entity, ro.fk_property, ro.fk_temporal_entity, ro.pk_entity
      FROM information.v_role as ro
      INNER JOIN epr_of_project as epr on epr.fk_entity = ro.pk_entity
    ),
    te_ent_in_project AS (
      SELECT te_ent.pk_entity, te_ent.fk_class
      FROM information.v_temporal_entity as te_ent
      INNER JOIN epr_of_project as epr on epr.fk_entity = te_ent.pk_entity
    ),
    pe_it_in_projet AS (
      SELECT pi.pk_entity, pi.fk_class, pi.tmsp_last_modification
      FROM information.v_persistent_item as pi
      INNER JOIN epr_of_project as epr on epr.fk_entity = pi.pk_entity
    )
    Select
    count(pi.pk_entity) OVER() AS total_count,
    pi.pk_entity,
    pi.fk_class,
    appellation_labels,
    ts_headline(appellation_string, q),
    appellation_string,
    projects
    FROM
    (
      SELECT
      pi.pk_entity,
      pi.fk_class,
      jsonb_agg(
        json_build_object(
          'pk_entity', pk_appellation,
          'appellation_label', appellation_label,
          'r63_is_in_project_count', r63_is_in_project_count,
          'r63_is_standard_in_project_count', r63_is_standard_in_project_count
        )
      ) as appellation_labels,
      string_agg(appellations.appellation_string, ' • ') AS appellation_string,
      appellations.projects,
      setweight(to_tsvector(string_agg(appellations.appellation_string, ' • ')), 'A') as document
      FROM pe_it_in_projet AS pi
      INNER JOIN
      (
        SELECT DISTINCT
        appe_in_project.pk_entity as pk_appellation,
        appe_in_project.appellation_string,
        appe_in_project.appellation_label as appellation_label,
        jsonb_agg(DISTINCT r63_in_project.fk_project) as projects,
        count(CASE WHEN r63_in_project.is_in_project THEN 1 END) as r63_is_in_project_count,
        count(CASE WHEN r63_in_project.is_standard_in_project THEN 1 END) as r63_is_standard_in_project_count,
        r63.fk_entity as pk_named_entity,
        r63_in_project.ord_num
        FROM
        roles_in_project as r64
        INNER JOIN appe_in_project ON appe_in_project.pk_entity = r64.fk_entity
        INNER JOIN te_ent_in_project AS appe_usage ON appe_usage.pk_entity = r64.fk_temporal_entity
        INNER JOIN roles_in_project AS r63 ON r63.fk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN epr_of_project AS r63_in_project ON r63_in_project.fk_entity = r63.pk_entity
        WHERE r64.fk_property = 1113 --'R64'
        AND r63.fk_property IN (1192, 1193, 1194, 1195) --'R63'
        AND appe_usage.fk_class = 365 --'F52'
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity, r63_in_project.ord_num
        ORDER BY r63_in_project.ord_num ASC
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, appellations.projects
      ORDER BY pi.tmsp_last_modification DESC
    ) AS pi, to_tsquery($1) q
    ` +
      (queryString === '' ? '' : 'WHERE  document @@ q') +
      `
    ORDER BY ts_rank(document, q) DESC
    LIMIT $2
    OFFSET $3
    `;

    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  InfPersistentItem.afterRemote('searchInProject', function (ctx, resultObjects, next) {

    var totalCount = 0;
    if (resultObjects.length > 0) {
      totalCount = resultObjects[0].total_count;
    }

    // remove column total_count from all resultObjects
    var data = [];
    if (resultObjects) {
      data = resultObjects.map(searchHit => {
        delete searchHit.total_count;
        return searchHit;
      })
    }

    if (!ctx.res._headerSent) {

      ctx.res.set('X-Total-Count', totalCount);

      ctx.result = {
        'totalCount': totalCount,
        'data': data
      }
      next();

    } else {
      next();
    }

  })


  InfPersistentItem.searchInRepo = function (searchString, limit, page, cb) {

    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        'name': 'Max limit exceeded',
        'status': 403,
        'message': 'Max limit exceeded. The limit can not be bigger than 200.'
      }
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page - 1);

    var queryString = searchString.trim(' ').split(' ').map(word => {
      return word + ':*'
    }).join(' & ');


    var params = [
      queryString,
      limit,
      offset
    ];

    var sql_stmt = `
    Select
    count(pi.pk_entity) OVER() AS total_count,
    pi.pk_entity,
    pi.fk_class,
    appellation_labels,
    ts_headline(appellation_string, q),
    appellation_string,
    projects
    FROM
    (
      SELECT
      pi.pk_entity,
      pi.fk_class,
      jsonb_agg(
        json_build_object(
          'pk_entity', pk_appellation,
          'appellation_label', appellation_label,
          'r63_is_in_project_count', r63_is_in_project_count,
          'r63_is_standard_in_project_count', r63_is_standard_in_project_count
        )
      ) as appellation_labels,
      string_agg(appellations.appellation_string, ' • ') AS appellation_string,
      appellations.projects,
      setweight(to_tsvector(string_agg(appellations.appellation_string, ' • ')), 'A') as document
      FROM information.v_persistent_item AS pi
      INNER JOIN
      (
        SELECT DISTINCT
        appellation.pk_entity as pk_appellation,
        appellation.appellation_string,
        appellation.appellation_label as appellation_label,
        jsonb_agg(DISTINCT r63_in_project.fk_project) as projects,
        count(CASE WHEN r63_in_project.is_in_project THEN 1 END) as r63_is_in_project_count,
        count(CASE WHEN r63_in_project.is_standard_in_project THEN 1 END) as r63_is_standard_in_project_count,
        r63.fk_entity as pk_named_entity
        FROM
        information.v_role as r64
        INNER JOIN
        (
          SELECT DISTINCT
          token.pk_entity,
          token.appellation_label
          ,
          string_agg(token.string, '' ORDER BY row_number) as appellation_string
          FROM
          (
            SELECT
            ROW_NUMBER() OVER() AS row_number,
            tokens.pk_entity,
            tokens.token->>'isSeparator' AS is_separator,
            tokens.token->>'string' AS string,
            tokens.appellation_label
            FROM
            (
              SELECT jsonb_array_elements(appellation_label->'tokens') as token, pk_entity, appellation_label
              FROM information.v_appellation
            ) AS tokens
            -- WHERE tokens.token->>'isSeparator' = 'false'
          ) AS token
          -- add where clause here to search in forenames, last names etc.
          GROUP BY   token.pk_entity, token.appellation_label
        )
        AS appellation
        ON appellation.pk_entity = r64.fk_entity
        INNER JOIN information.v_temporal_entity AS appe_usage ON appe_usage.pk_entity = r64.fk_temporal_entity
        INNER JOIN information.v_role AS r63 ON r63.fk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN information.entity_version_project_rel AS r63_in_project ON r63_in_project.fk_entity = r63.pk_entity
        WHERE r64.fk_property = 1113 --'R64'
        AND r63.fk_property IN (1192, 1193, 1194, 1195) --'R63'
        AND appe_usage.fk_class = 365 --'F52'
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, appellations.projects
      ORDER BY pi.tmsp_last_modification DESC
    ) AS pi, to_tsquery($1) q
    WHERE document @@ q
    ORDER BY ts_rank(document, q) DESC
    LIMIT $2
    OFFSET $3
    `;


    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  InfPersistentItem.afterRemote('searchInRepo', function (ctx, resultObjects, next) {

    var totalCount = 0;
    if (resultObjects.length > 0) {
      totalCount = resultObjects[0].total_count;
    }

    // remove column total_count from all resultObjects
    var data = [];
    if (resultObjects) {
      data = resultObjects.map(searchHit => {
        delete searchHit.total_count;
        return searchHit;
      })
    }

    if (!ctx.res._headerSent) {

      ctx.res.set('X-Total-Count', totalCount);

      ctx.result = {
        'totalCount': totalCount,
        'data': data
      }
      next();

    } else {
      next();
    }

  })

  /**
   * nestedObjectOfProject - get a rich object of the PeIt with all its
   * roles > temporal entities > roles > PeIts
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the persistent item
   */
  InfPersistentItem.nestedObjectOfProject = function (projectId, pkEntity, cb) {

    const innerJoinThisProject = {
      "$relation": {
        "name": "entity_version_project_rels",
        "joinType": "inner join",
        "where": [
          "fk_project", "=", projectId,
          "and", "is_in_project", "=", "true"
        ]
      }
    };

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": {
        "entity_version_project_rels": innerJoinThisProject,
        "dfh_class": {
          "$relation": {
            "name": "dfh_class",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join"
          },
          "entity_version_project_rels": innerJoinThisProject,
          "temporal_entity": {
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "entity_version_project_rels": innerJoinThisProject,
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
                // "entity_version_project_rels": innerJoinThisProject
              },
              "language": {
                "$relation": {
                  "name": "language",
                  "joinType": "left join",
                  "orderBy": [{
                    "pk_entity": "asc"
                  }]
                }
                // ,
                // "entity_version_project_rels": innerJoinThisProject
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
    }

    return InfPersistentItem.findComplex(filter, cb);
  }


  InfPersistentItem.nestedObjectOfRepo = function (pkEntity, cb) {

    const filter = {
      /** Select persistent item by pk_entity … */
      "where": ["pk_entity", "=", pkEntity],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "dfh_class": {
          "$relation": {
            "name": "dfh_class",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        /** include all roles … */
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },

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
                  "orderBy": [{
                    "pk_entity": "asc"
                  }]
                }
              },
              "appellation": {
                "$relation": {
                  "name": "appellation",
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
    }

    return InfPersistentItem.findComplex(filter, cb);
  }



  /**
   * Query instances of E55 Type 
   * 
   * Where 
   *	- types are related to the given namespace  
   *	- types are in given project
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class) 
   *
   * Eager loading
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   *  - TODO: The appellations of given language
   * 
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfNamespaceClassAndProject = function (pk_namespace, pk_project, pk_typed_class, cb) {

    // get the pk_property of the property leading from the typed class to the type class
    // E.g. get the pk_property of "has geographical place type – histP8" for the pk_class of "histC8 Geographical Place"
    const pkProperty = InfConfig.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] ? InfConfig.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] : -1;

    const innerJoinThisProject = {
      "$relation": {
        "name": "entity_version_project_rels",
        "joinType": "inner join",
        "select": {
          include: [
            "pk_entity_version_project_rel",
            "pk_entity",
            "fk_project",
            "fk_entity",
          ]
        },
        "where": [
          "fk_project", "=", pk_project,
          "and", "is_in_project", "=", "true"
        ]
      }
    };

    const filter = {
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "type_namespace_rels": {
          "$relation": {
            select: false,
            "name": "type_namespace_rels",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          "namespace": {
            "$relation": {
              select: false,
              "name": "namespace",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }],
              where: ["pk_entity", "=", pk_namespace]
            }
          }
        },
        "entity_version_project_rels": innerJoinThisProject,
        "dfh_class": {
          "$relation": {
            select: false,
            "name": "dfh_class",
            "joinType": "inner join",
            "orderBy": [
              {
                "pk_entity": "asc"
              }
            ]
          },
          "ingoing_properties": {
            "$relation": {
              select: false,
              "name": "ingoing_properties",
              "joinType": "inner join",
              where: ["dfh_pk_property", "=", pkProperty]
            }
          }
        },
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join"
          },
          "entity_version_project_rels": innerJoinThisProject,
          "temporal_entity": {
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "entity_version_project_rels": innerJoinThisProject,
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
                // "entity_version_project_rels": innerJoinThisProject
              },
              "language": {
                "$relation": {
                  "name": "language",
                  "joinType": "left join",
                  "orderBy": [{
                    "pk_entity": "asc"
                  }]
                }
                // ,
                // "entity_version_project_rels": innerJoinThisProject
              }
            }
          }
        }
      }
    }

    return InfPersistentItem.findComplex(filter, cb);
  }

};