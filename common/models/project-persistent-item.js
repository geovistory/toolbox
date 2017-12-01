'use strict';

module.exports = function(ProjectPersistentItem) {



  ProjectPersistentItem.search = function(projectId, searchString, limit, page, cb) {

    // Check that limit does not exceed maximum
    if(limit > 200){
      const err = {
        'name': 'Max limit exceeded',
        'status': 403,
        'message': 'Max limit exceeded. The limit can not be bigger than 200.'
      }
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page-1);

    var params = [
      searchString ? '%' + searchString + '%' : '%%',
      limit,
      offset,
      projectId
    ];

    var sql_stmt = `
    Select
    total_count,
    pi.notes,
    pi.pk_persistent_item,
    pi.pk_entity,
    pi.fk_class,
    appellation_labels,
    projects,
    standardAppellation.appellation_label as standard_appellation_label
    FROM
    (
      SELECT
      count(pi.pk_entity) OVER() AS total_count,
      pi.notes,
      pi.pk_persistent_item,
      pi.pk_entity,
      pi.fk_class,
      jsonb_agg(
        json_build_object(
          'pk_entity', pk_appellation,
          'appellation_label', appellation_label,
          'r63_is_in_project', r63_is_in_project,
          'r63_is_standard_in_project', r63_is_standard_in_project
        )
      ) as appellation_labels,
      jsonb_agg(DISTINCT epr.fk_project) as projects

      FROM information.persistent_item AS pi
      INNER JOIN information.entity_project_rel AS epr ON epr.fk_entity=pi.pk_entity
      INNER JOIN
      (
        SELECT
        appe_usage.pk_entity as pk_appellation_usage,
        appellation.pk_entity as pk_appellation,
        appellation.appellation_label as appellation_label,
        r63_in_project.fk_project,
        r63_in_project.is_in_project as r63_is_in_project,
        r63_in_project.is_standard_in_project as r63_is_standard_in_project,
        r63.fk_entity as pk_named_entity
        FROM
        information.role as r64
        INNER JOIN
        (
          SELECT DISTINCT
          token.pk_entity,
          token.appellation_label
          FROM
          (
            SELECT
            tokens.pk_entity,
            tokens.token->>'isSeparator' AS is_separator,
            tokens.token->>'string' AS string,
            tokens.appellation_label
            FROM
            (
              SELECT jsonb_array_elements(appellation_label->'tokens') as token, pk_entity, appellation_label
              FROM information.appellation
            ) AS tokens
          ) AS token
          WHERE token.is_separator = 'false'
          AND token.string iLike $1
        )
        AS appellation
        ON appellation.pk_entity = r64.fk_entity
        INNER JOIN information.temporal_entity AS appe_usage ON appe_usage.pk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN information.role AS r63 ON r63.fk_temporal_entity = r64.fk_temporal_entity
        INNER JOIN information.entity_project_rel AS r63_in_project ON r63_in_project.fk_entity = r63.pk_entity

        WHERE r64.fk_property = 'R64'
        AND r63_in_project.fk_project IN ($4)
        AND r63.fk_property = 'R63'
        AND appe_usage.fk_class = 'F52'
      ) AS appellations
      ON appellations.pk_named_entity = pi.pk_entity

      AND epr.fk_project IN ($4)
      GROUP BY pi.pk_entity, pi.pk_persistent_item, pi.fk_class
      ORDER BY pi.tmsp_last_modification DESC
      LIMIT $2
      OFFSET $3
    ) AS pi

    -- join the standard appellation
    INNER JOIN information."role" AS r63 ON pi.pk_entity = r63.fk_entity
    INNER JOIN information.entity_project_rel AS epr ON epr.fk_entity = r63.pk_entity
    INNER JOIN information.temporal_entity AS appeUsage ON appeUsage.pk_temporal_entity = r63.fk_temporal_entity
    INNER JOIN information."role" AS r64 ON r64.fk_temporal_entity = appeUsage.pk_temporal_entity
    INNER JOIN information.appellation AS standardAppellation ON standardAppellation.pk_entity = r64.fk_entity
    WHERE r63.fk_property = 'R63'
    AND epr.fk_project IN ($4)
    AND epr.is_standard_in_project = true
    AND appeUsage.fk_class = 'F52'
    AND r64.fk_property = 'R64';
    `;


    const connector = PersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  ProjectPersistentItem.afterRemote('search', function (ctx, resultObjects, next) {

    var totalCount = 0;
    if(resultObjects.length > 0){
      totalCount = resultObjects[0].total_count;
    }

    // remove column total_count from all resultObjects
    var data = [];
    if (resultObjects){
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




};
