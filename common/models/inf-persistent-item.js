'use strict';

const Promise = require('bluebird');
const Config = require('../config/Config');


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

        /******************************************
         * domain_entity_associations
         ******************************************/
        if (requestedPeIt.domain_entity_associations) {

          // prepare parameters
          const InfEntityAssociation = InfPersistentItem.app.models.InfEntityAssociation;

          //… filter items that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          const promise = Promise.map(requestedPeIt.domain_entity_associations.filter(item => (item)), (item) => {
            // use the pk_entity from the created peIt to set the fk_domain_entity of the item
            item.fk_domain_entity = resultingPeIt.pk_entity;
            // find or create the item
            return InfEntityAssociation.findOrCreateInfEntityAssociation(projectId, item);
          }).then((items) => {
            //attach the items to peit.domain_entity_associations
            res.domain_entity_associations = [];
            for (var i = 0; i < items.length; i++) {
              const item = items[i];
              if (item && item[0]) {
                res.domain_entity_associations.push(item[0]);
              }
            }
            return true;

          }).catch((err) => {
            return err;
          })

          // add promise for text properties
          promiseArray.push(promise)

        }

        /******************************************
         * type_namespace_rels
         ******************************************/
        if (requestedPeIt.type_namespace_rels) {

          // prepare parameters
          const InfTypeNamespaceRel = InfPersistentItem.app.models.InfTypeNamespaceRel;

          //… filter items that are truthy (not null), iterate over them,
          // return the promise that the PeIt will be
          // returned together with all nested items
          const promise = Promise.map(requestedPeIt.type_namespace_rels.filter(item => (item)), (item) => {
            // use the pk_entity from the created peIt to set the fk_persistent_item of the item
            item.fk_persistent_item = resultingPeIt.pk_entity;
            // find or create the item
            return InfTypeNamespaceRel.findOrCreateInfTypeNamespaceRel(projectId, item);
          }).then((items) => {
            //attach the items to peit.type_namespace_rels
            res.type_namespace_rels = [];
            for (var i = 0; i < items.length; i++) {
              const item = items[i];
              if (item && item[0]) {
                res.type_namespace_rels.push(item[0]);
              }
            }
            return true;

          }).catch((err) => {
            return err;
          })

          // add promise
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
   * Check if authorized to relate type with namespace
   * - pk_namespace must be of "Geovistory Ongoing"
   * - or pk_project must be in fk_project of namespace  
   */
  InfPersistentItem.beforeRemote('findOrCreateType', function (context, obj, next) {
    const pk_project = context.req.query.pk_project;
    const pk_namespace = context.req.query.pk_namespace;
    const errorMsg = 'You\'re not authorized to perform this action.';
    // let pass if namespace is "Geovistory Ongoing"
    if (pk_namespace == Config.PK_NAMESPACE__GEOVISTORY_ONGOING) {
      next()
    }

    return InfPersistentItem.app.models.InfNamespace.findById(pk_namespace)
      .then((nmsp) => {
        // let pass if namespace belongs to project
        if (nmsp && nmsp.fk_project == pk_project) {
          next();
        }
        else return Promise.reject(new Error(errorMsg));;
      })
      .catch(() => {
        return Promise.reject(new Error(errorMsg))
      })

  });

  /**
   * Remote method to create instances of E55 types.
   * 
   * Adds a type_namespace_rel between peIt and namespace
   * 
   */
  InfPersistentItem.findOrCreateType = function (pk_project, pk_namespace, data, ctx) {

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

  InfPersistentItem.searchInProject = function (projectId, searchString, pkClasses, limit, page, cb) {

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

    const pkClassParamNrs = pkClasses.map((c, i) => '$' + (i + params.length + 1)).join(', ');
    params = [...params, ...pkClasses]

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
      --INNER JOIN epr_of_project as epr on epr.fk_entity = te_ent.pk_entity
    ),
    pe_it_in_projet AS (
      SELECT pi.pk_entity, pi.fk_class, pi.tmsp_last_modification
      FROM information.v_persistent_item as pi
      INNER JOIN epr_of_project as epr on epr.fk_entity = pi.pk_entity
      WHERE pi.fk_class IN (${pkClassParamNrs})
    )
    Select
    count(pi.pk_entity) OVER() AS total_count,
    pi.pk_entity,
    pi.fk_class,
    appellation_labels,
    ts_headline(appellation_string, q),
    appellation_string,
    projects_array as projects,
    row_to_json(information.queryPeItPreview($4,pi.pk_entity,45)) as preview
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
      setweight(to_tsvector(string_agg(appellations.appellation_string, ' • ')), 'A') as document,
	    projects.projects_array
      FROM pe_it_in_projet AS pi
      INNER JOIN
      (
        SELECT DISTINCT
        appe_in_project.pk_entity as pk_appellation,
        appe_in_project.appellation_string,
        appe_in_project.appellation_label as appellation_label,
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
        -- WHERE r64.fk_property = 1113 --'R64'
        -- AND r63.fk_property IN (1192, 1193, 1194, 1195) --'R63'
        WHERE appe_usage.fk_class = 365 --'F52'
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity, r63_in_project.ord_num
        ORDER BY r63_in_project.ord_num ASC
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
      INNER JOIN (SELECT fk_entity, jsonb_agg(fk_project) as projects_array from epr_of_project GROUP BY fk_entity) AS projects
      ON projects.fk_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, projects.fk_entity, projects.projects_array
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


  InfPersistentItem.searchInRepo = function (searchString, limit, page, fk_class, fk_namespace, cb) {

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

    var queryString = searchString.replace(':', ',').replace('(', ',').replace(')', ',').trim(' ').split(' ').map(word => {
      return word + ':*'
    }).join(' & ');


    var params = [
      queryString,
      limit,
      offset
    ];

    var where = '';
    if (fk_class) {
      params.push(fk_class);
      where = ' AND pi.fk_class = $4';
    }

    let innerJoinNamespace = '';
    if (fk_namespace) {
      params.push(fk_namespace);
      innerJoinNamespace = `
      INNER JOIN (
        SELECT fk_persistent_item
        FROM information.type_namespace_rel
        WHERE fk_namespace = $`+ params.length + `
      ) AS namsepace_rel ON namsepace_rel.fk_persistent_item = pi.pk_entity
      `;
    }

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
          'r63_is_standard_in_project_count', r63_is_standard_in_project_count,
          'rank_for_pe_it', rank_for_pe_it
        )
      ) as appellation_labels,
      string_agg(appellations.appellation_string, ' • ') AS appellation_string,
	    projects_array as projects,
      setweight(to_tsvector(string_agg(appellations.appellation_string, ' • ')), 'A') as document
      FROM information.v_persistent_item AS pi
      ${innerJoinNamespace}
      INNER JOIN
      (
        SELECT DISTINCT
        appellation.pk_entity as pk_appellation,
        appellation.appellation_string,
        appellation.appellation_label as appellation_label,
        jsonb_agg(DISTINCT r63_in_project.fk_project) as projects,
        count(CASE WHEN r63_in_project.is_in_project THEN 1 END) as r63_is_in_project_count,
        count(CASE WHEN r63_in_project.is_standard_in_project THEN 1 END) as r63_is_standard_in_project_count,
        r63.rank_for_pe_it,
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
        -- WHERE r64.fk_property = 1113 --'R64'
        -- AND r63.fk_property IN (1192, 1193, 1194, 1195) --'R63'
        WHERE appe_usage.fk_class = 365 --'F52'
        GROUP BY pk_appellation, appellation_string, appellation_label, pk_named_entity, r63.rank_for_pe_it
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity
    	INNER JOIN (
        SELECT fk_entity, jsonb_agg(fk_project) as projects_array 
        from information.entity_version_project_rel 
        WHERE is_in_project = true
        GROUP BY fk_entity) AS projects
	    ON projects.fk_entity = pi.pk_entity
      GROUP BY pi.pk_entity, pi.fk_class, pi.tmsp_last_modification, projects.fk_entity, projects.projects_array
      ORDER BY pi.tmsp_last_modification DESC
    ) AS pi, to_tsquery($1) q
    WHERE document @@ q ${where}
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

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": InfPersistentItem.getIncludeObject(true, projectId)
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
            "orderBy": [{ "pk_entity": "asc" }]
          }
        },
        /** include all roles … */
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join",
            "orderBy": [{ "pk_entity": "asc" }]
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
   * Internal function to create the include property of 
   * a filter object for findComplex()
   * 
   * Usage: add the returned object to the include property of a persistent item relation
   * of findComplex() filter, e.g.:
   * {
   *    ...
   *    include: InfPersistentItem.getIncludeObject(true, 123)
   * }
   * 
   * @param ofProject {boolean}
   * @param project {number}
   * @returns include object of findComplex filter
   */
  InfPersistentItem.getIncludeObject = function (ofProject, pkProject) {
    const joinThisProject = InfPersistentItem.app.models.InfEntityProjectRel.getJoinObject(ofProject, pkProject)

    return {
      "entity_version_project_rels": joinThisProject,
      "dfh_class": {
        "$relation": {
          "name": "dfh_class",
          "joinType": "inner join",
          "orderBy": [{ "pk_entity": "asc" }]
        }
      },
      domain_entity_associations: {
        $relation: {
          name: "domain_entity_associations",
          joinType: "left join",
          "orderBy": [{ "pk_entity": "asc" }]
        },
        "entity_version_project_rels": joinThisProject,
        range_pe_it: {
          $relation: {
            name: "range_pe_it",
            joinType: "inner join",
            "orderBy": [{ "pk_entity": "asc" }]
          },
          "pi_roles": {
            "$relation": {
              "name": "pi_roles",
              "joinType": "left join"
            },
            "entity_version_project_rels": joinThisProject,
            "temporal_entity": {
              "$relation": {
                "name": "temporal_entity",
                "joinType": "inner join",
                "orderBy": [{
                  "pk_entity": "asc"
                }]
              },
              "entity_version_project_rels": joinThisProject,
              "te_roles": {
                "$relation": {
                  "name": "te_roles",
                  "joinType": "inner join",
                  "orderBy": [{
                    "pk_entity": "asc"
                  }]
                },
                "entity_version_project_rels": joinThisProject,
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
                }
              }
            }
          }
        }
      },
      "pi_roles": {
        "$relation": {
          "name": "pi_roles",
          "joinType": "left join"
        },
        "entity_version_project_rels": joinThisProject,
        "temporal_entity": {
          "$relation": {
            "name": "temporal_entity",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          "entity_version_project_rels": joinThisProject,
          "te_roles": {
            "$relation": {
              "name": "te_roles",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            },
            "entity_version_project_rels": joinThisProject,
            "appellation": {
              "$relation": {
                "name": "appellation",
                "joinType": "left join",
                "orderBy": [{
                  "pk_entity": "asc"
                }]
              }
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
      },
      text_properties: {
        "$relation": {
          "name": "text_properties",
          "joinType": "left join",
          "orderBy": [{ "pk_entity": "asc" }]
        },
        entity_version_project_rels: joinThisProject,
        "language": {
          "$relation": {
            "name": "language",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        }
      }
    }
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
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   * 
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfNamespaceClassAndProject = function (pk_namespace, pk_project, pk_typed_class, cb) {

    // get the pk_property of the property leading from the typed class to the type class
    // E.g. get the pk_property of "has geographical place type – histP8" for the pk_class of "histC8 Geographical Place"
    const pkProperty = Config.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] ? Config.PK_CLASS_PK_HAS_TYPE_MAP[pk_typed_class] : -1;

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
            "orderBy": [{ "pk_entity": "asc" }]
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



  /**
   * Query instances of E55 Type 
   * 
   * Where 
   *	- types are related to the given namespace  
   *	- types are in given project
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class) 
   *  - optional: the type has the pk_entity. This is for querying a specific type.
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   * 
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfNamespaceNested = function (pk_namespace, pk_project, pk_entity, cb) {

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
            "orderBy": [{ "pk_entity": "asc" }]
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
        "text_properties": {
          "$relation": {
            "name": "text_properties",
            "joinType": "left join"
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

    if (pk_entity) {
      filter.where = ["pk_entity", "=", pk_entity];
    }

    return InfPersistentItem.findComplex(filter, cb);
  }



  /**
   * Query instance of E55 Type 
   * 
   * Where 
   *	- types are in given project
   *  - the type has the pk_entity.
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   * 
   * @param pk_project
   * @param pk_entity
   */
  InfPersistentItem.typeNested = function (pk_project, pk_entity, cb) {

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
      where: ["pk_entity", "=", pk_entity],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "entity_version_project_rels": innerJoinThisProject,
        "text_properties": {
          "$relation": {
            "name": "text_properties",
            "joinType": "left join"
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
              },
              "language": {
                "$relation": {
                  "name": "language",
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
   *	- types are in given project
   *	- types are related to the namespace enabled by given project or the namespace geovistory ongoing
   *    TODO: There is the need of a namespace_proj_rel table that says: This project has enabled this namespace for this class 
   *	- types are types of the given typed_class (where class is domain of a property where property is inherited from has_type pk=2 and range is class) 
   *
   * Eager loading
   *  - The appellations of given language
   *  - TODO: The entity_associations of property "has broader term" used for hierarchy
   * 
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfPersistentItem.typesOfClassAndProject = function (pk_project, pk_typed_class, cb) {

    // TODO: use namespace_proj_rel instead of entity_version_project_rels
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

    // Find activated namespace
    InfPersistentItem.app.models.InfNamespace.findComplex({
      "include": {
        "entity_version_project_rels": innerJoinThisProject
      }
    },
      // Find types
      (error, namespace) => {

        // assign geovistory ongoing or, if available, the activated namespace
        const pk_namespace = !namespace.length ? Config.PK_NAMESPACE__GEOVISTORY_ONGOING : namespace.pk_entity;

        InfPersistentItem.typesOfNamespaceClassAndProject(pk_namespace, pk_project, pk_typed_class, cb);
      }
    );
  }



  /**
   * Add a persistent item to project
   * 
   * This query will add those things to the project:
   * - Roles that are enabled for auto-adding (using the admin configuration of that class).
   * - Entity associationss enabled for auto-adding (using the admin configuration of that class).
   *   This will add the type for example. If the type is not activated by the project, the association is added but nothing will be displayed in that project.
   *   Currently, there is no information displayed to the user, concerning the possible 'loss' of type information upon adding it to the project.
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
  InfPersistentItem.addToProject = function (pk_project, pk_entity, cb) {
    const params = [pk_entity, pk_project]

    const sql_stmt = `
      -- Relate given persistent item to given project --
      ----------------------------------------------------

      WITH pe_it AS (
        select pk_entity, fk_class from information.persistent_item where pk_entity = $1
        ),
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
      -- Find all roles related to the given persistent item pk_entity 
      -- that are of an auto-add property
      pe_it_roles AS (
        select r.pk_entity, r.fk_temporal_entity, r.fk_property, r.fk_entity, addp.max_quantifier, r.community_favorite_calendar as calendar
        from information.v_role as r
        inner join pe_it on r.fk_entity = pe_it.pk_entity
        inner join auto_add_properties as addp on (
          addp.dfh_pk_property = r.fk_property AND addp.fk_class = pe_it.fk_class 
        )
        -- take only the max quantity of rows for that property, exclude repo-alternatives
        WHERE r.rank_for_pe_it <= r.domain_max_quantifier OR r.domain_max_quantifier = -1  OR r.domain_max_quantifier IS NULL
      ),
      -- Find all temporal entities related to pe_it_roles
      -- that are of an auto-add property
      te_ents AS (
        select fk_temporal_entity as pk_entity
        from pe_it_roles
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
      -- find all entity associations that involve the pe_it
      -- that are of an auto-add property
      pe_it_entity_associations AS (
        -- where pe_it is domain
        select ea.pk_entity, ea.fk_domain_entity, ea.fk_property, ea.fk_range_entity, addp.max_quantifier
        from information.v_entity_association as ea
        inner join pe_it on ea.fk_domain_entity = pe_it.pk_entity
        inner join auto_add_properties as addp on (addp.dfh_pk_property = ea.fk_property AND addp.fk_class = pe_it.fk_class)		
        -- take only the max allowed rows
        WHERE ea.rank_for_domain <= ea.range_max_quantifier OR ea.range_max_quantifier = -1 OR ea.range_max_quantifier IS NULL
        
        UNION
        
        -- where pe_it is range
        select ea.pk_entity, ea.fk_domain_entity, ea.fk_property, ea.fk_range_entity, addp.max_quantifier
        from information.v_entity_association as ea
        inner join pe_it on ea.fk_range_entity = pe_it.pk_entity
        inner join auto_add_properties as addp on (addp.dfh_pk_property = ea.fk_property AND addp.fk_class = pe_it.fk_class)		
        -- take only the max allowed rows
        WHERE ea.rank_for_range <= ea.domain_max_quantifier OR ea.domain_max_quantifier = -1  OR ea.domain_max_quantifier IS NULL
      ),
      -- TODO: find all entity associations that involve the te_ents (for types or mentionings of te_ents!)

      -- get a list of all pk_entities of repo version
      pk_entities_of_repo AS (
        select pk_entity, null::calendar_type as calendar from pe_it
        UNION
        select pk_entity, null::calendar_type as calendar from pe_it_entity_associations
        UNION
        select pk_entity, calendar from pe_it_roles 
        UNION 
        select pk_entity, null::calendar_type as calendar from te_ents
        UNION
        select pk_entity, calendar from te_ent_roles
      )
      --,
      ---- get a list of all pk_entities that the project manually removed
      --pk_entities_excluded_by_project AS (
      --  SELECT fk_entity as pk_entity
      --  FROM information.v_entity_version_project_rel as epr 
      --  where epr.is_in_project = false and epr.fk_project = $2
      --),
      ---- get final list of pk_entities to add to project
      --pk_entities_to_add AS (
      --  select pk_entity, calendar from pk_entities_of_repo
      --  EXCEPT
      --  select pk_entity, null::calendar_type from pk_entities_excluded_by_project
      --)
      ----select * from pk_entities_to_add;

      insert into information.v_entity_version_project_rel (fk_project, is_in_project, fk_entity, calendar)
      SELECT $2, true, pk_entity, calendar
      from pk_entities_of_repo;
    `

    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err, resultObjects);

      InfPersistentItem.nestedObjectOfProject(pk_project, pk_entity, (err, result) => {
        cb(err, result)
      })

    });
  }


  InfPersistentItem.preview = function (pk_project, pk_entity, pk_ui_context, cb) {
    const sql_stmt = 'select * from information.queryPeItPreview($1,$2,$3)';
    const params = [pk_project, pk_entity, pk_ui_context];
    const connector = InfPersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  }
};