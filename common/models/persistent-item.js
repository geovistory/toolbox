'use strict';

const Promise = require('bluebird');

module.exports = function(PersistentItem) {

  PersistentItem.addPeItToProject = function(projectId, data, ctx) {
    let requestedPeIt;

    if (ctx) {
      requestedPeIt = ctx.req.body;
    } else {
      requestedPeIt = data;
    }

    return PersistentItem.addToProject(projectId, requestedPeIt)
      .then(resultingEpr => {

        // attatch the new epr to the peIt

        requestedPeIt.entity_version_project_rels = [resultingEpr];


        if (requestedPeIt.pi_roles) {

          // prepare parameters
          const InformationRole = PersistentItem.app.models.InformationRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          return Promise.map(requestedPeIt.pi_roles.filter(role => (role)), (role) => {

              // add role to project
              return InformationRole.addRoleToProject(projectId, role);

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


  PersistentItem.findOrCreatePeIt = function(projectId, data, ctx) {

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

    return PersistentItem.findOrCreateVersion(PersistentItem, projectId, dataObject)
      .then((resultingPeIts) => {
        // pick first item of array
        const resultingPeIt = resultingPeIts[0];

        // if there are roles…
        if (requestedPeIt.pi_roles) {

          // prepare parameters
          const InformationRole = PersistentItem.app.models.InformationRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          return Promise.map(requestedPeIt.pi_roles.filter(role => (role)), (role) => {
              // use the pk_entity from the created peIt to set the fk_entity of the role
              role.fk_entity = resultingPeIt.pk_entity;
              // find or create the teEnt and the role pointing to the teEnt
              return InformationRole.findOrCreateInformationRole(projectId, role);
            })
            .then((roles) => {

              //attach the roles to peit.pi_roles
              const res = resultingPeIt.toJSON();
              res.pi_roles = [];
              for (var i = 0; i < roles.length; i++) {
                const role = roles[i];
                if (role && role[0]) {
                  res.pi_roles.push(role[0]);
                }
              }

              return [res];

            })
            .catch((err) => {
              return err;
            })

        } else {
          return resultingPeIts;
        }
      })
      .catch((err) => {

      });

  }


  PersistentItem.searchInProject = function(projectId, searchString, limit, page, cb) {

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
      SELECT fk_project, fk_entity, entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project
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
          FROM information.v_appellation_version as appe
          INNER JOIN epr_of_project as epr on epr.fk_entity_version_concat = appe.pk_entity_version_concat
        ) AS tokens
        -- WHERE tokens.token->>'isSeparator' = 'false'
      ) AS token
      -- add where clause here to search in forenames, last names etc.
      GROUP BY   token.pk_entity, token.appellation_label
    ),
    roles_in_project AS (
      SELECT ro.fk_entity, ro.fk_property, ro.fk_temporal_entity, ro.is_community_favorite, ro.pk_entity_version_concat, epr.is_standard_in_project
      FROM information.v_role_version as ro
      INNER JOIN epr_of_project as epr on epr.fk_entity_version_concat = ro.pk_entity_version_concat
    ),
    te_ent_in_project AS (
      SELECT te_ent.pk_entity, te_ent.fk_class, te_ent.is_community_favorite
      FROM information.v_temporal_entity_version as te_ent
      INNER JOIN epr_of_project as epr on epr.fk_entity_version_concat = te_ent.pk_entity_version_concat
    ),
    pe_it_in_projet AS (
      SELECT pi.pk_entity, pi.fk_class,  pi.entity_version,  pi.pk_entity_version_concat,  pi.tmsp_last_modification
      FROM information.v_persistent_item_version as pi
      INNER JOIN epr_of_project as epr on epr.fk_entity_version_concat = pi.pk_entity_version_concat
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
      pi.entity_version,
      pi.pk_entity_version_concat,
      pi.fk_class,
      jsonb_agg(
        json_build_object(
          'pk_entity', pk_appellation,
          'appellation_label', appellation_label,
          'r63_is_standard_in_project', is_standard_in_project,
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
        r63.is_standard_in_project,
        jsonb_agg(DISTINCT r63_in_project.fk_project) as projects,
        count(CASE WHEN r63_in_project.is_in_project THEN 1 END) as r63_is_in_project_count,
        count(CASE WHEN r63_in_project.is_standard_in_project THEN 1 END) as r63_is_standard_in_project_count,
        r63.fk_entity as pk_named_entity
        FROM
        roles_in_project as r64
        INNER JOIN appe_in_project ON appe_in_project.pk_entity = r64.fk_entity
        INNER JOIN te_ent_in_project AS appe_usage ON appe_usage.pk_entity = r64.fk_temporal_entity
        INNER JOIN roles_in_project AS r63 ON r63.fk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN epr_of_project AS r63_in_project ON r63_in_project.fk_entity_version_concat = r63.pk_entity_version_concat
        WHERE r64.fk_property = 'R64'
        -- AND r64.is_community_favorite = true
        AND r63.fk_property = 'R63'
        AND appe_usage.fk_class = 'F52'
        AND appe_usage.is_community_favorite = true
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity, r63.is_standard_in_project
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, pi.pk_entity_version_concat, pi.entity_version, appellations.projects
      ORDER BY pi.tmsp_last_modification DESC
    ) AS pi, to_tsquery($1) q
    ` +
      (queryString === '' ? '' : 'WHERE  document @@ q') +
      `
    ORDER BY ts_rank(document, q) DESC
    LIMIT $2
    OFFSET $3
    `;

    const connector = PersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  PersistentItem.afterRemote('searchInProject', function(ctx, resultObjects, next) {

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


  PersistentItem.searchInRepo = function(searchString, limit, page, cb) {

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
      pi.entity_version,
      pi.pk_entity_version_concat,
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
      FROM information.v_persistent_item_version AS pi
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
        information.v_role_version as r64
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
              FROM information.v_appellation_version
              WHERE is_community_favorite = true
            ) AS tokens
            -- WHERE tokens.token->>'isSeparator' = 'false'
          ) AS token
          -- add where clause here to search in forenames, last names etc.
          GROUP BY   token.pk_entity, token.appellation_label
        )
        AS appellation
        ON appellation.pk_entity = r64.fk_entity
        INNER JOIN information.v_temporal_entity_version AS appe_usage ON appe_usage.pk_entity = r64.fk_temporal_entity
        INNER JOIN information.v_role_version AS r63 ON r63.fk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN information.entity_version_project_rel AS r63_in_project ON r63_in_project.fk_entity_version_concat = r63.pk_entity_version_concat
        WHERE r64.fk_property = 'R64'
        AND r64.is_community_favorite = true
        AND r63.fk_property = 'R63'
        AND appe_usage.fk_class = 'F52'
        AND appe_usage.is_community_favorite = true
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, pi.pk_entity_version_concat, pi.entity_version, appellations.projects
      ORDER BY pi.tmsp_last_modification DESC
    ) AS pi, to_tsquery($1) q
    WHERE document @@ q
    ORDER BY ts_rank(document, q) DESC
    LIMIT $2
    OFFSET $3
    `;


    const connector = PersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  PersistentItem.afterRemote('searchInRepo', function(ctx, resultObjects, next) {

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
  PersistentItem.nestedObjectOfProject = function(projectId, pkEntity, cb) {

    const innerJoinThisProject = {
      "$relation": {
        "name": "entity_version_project_rels",
        "joinType": "inner join",
        "where": ["fk_project", "=", projectId]
      }
    };

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": {
        "entity_version_project_rels": innerJoinThisProject,
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
                "entity_version_project_rels": innerJoinThisProject
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

    return PersistentItem.findComplex(filter, cb);
  }


  PersistentItem.nestedObjectOfRepo = function(pkEntity, cb) {

    const filter = {
      /** Select persistent item by pk_entity … */
      "where": ["pk_entity", "=", pkEntity, "and", "is_community_favorite", "=", "true"],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {

        /** include all roles … */
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join",
            //  "where": ["is_community_favorite", "=", "true"],
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          "entity_version_project_rels": {
            "$relation": {
              "name": "entity_version_project_rels",
              "joinType": "left join"
              //  "where": ["is_community_favorite", "=", "true"],
            }
          },

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
              }
              //,...innerJoinThisProject, // … get project's version

            }
          }
        }
      }
    }

    return PersistentItem.findComplex(filter, cb);
  }



};