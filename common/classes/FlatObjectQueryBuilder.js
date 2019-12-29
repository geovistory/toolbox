var logFn = require('../../server/scripts/log-deserialized-sql');

class FlatObjectQueryBuilder {
  constructor(models) {
    this.params = [];
    this.models = models;
  }

  createTemporalEntityListQuery(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset
  ) {
    const mainWhere = `
      --if isOutgoing join with fk_temporal_entity , else fk_entity
      t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} = ${this.addParam(
      fkSourceEntity
    )} --  add the pk_entity of the 'source' entity here
      AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
      AND t2.fk_project = ${this.addParam(fkProject)} -- add the pk_project here
      -- ensure the target entity is a temporal entity
      AND t1.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'} = t3.pk_entity
      AND t1.pk_entity = t2.fk_entity
      AND t2.is_in_project = true
      AND t3.fk_class = ${this.addParam(fkTargetClass)}
    `;

    const sql = `
      WITH
      -- count
      tw1 AS (
       SELECT count(*)
       FROM
          information.v_role t1,
          projects.info_proj_rel t2,
          information.temporal_entity t3
       WHERE
         ${mainWhere}
       GROUP BY TRUE
      ),
      -- roles
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_role t1,
          projects.info_proj_rel t2,
          information.temporal_entity t3
        WHERE
          ${mainWhere}
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      -- temporal_entity
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTemporalEntity')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw2
          CROSS JOIN information.v_temporal_entity t1,
          projects.info_proj_rel t2
        WHERE
          -- if isOutgoing join with fk_entity, else fk_temporal_entity
          tw2.${isOutgoing ? 'fk_entity' : 'fk_temporal_entity'} = t1.pk_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- outgoing_roles of temporal_entity
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw3
          CROSS JOIN information.v_role t1,
          projects.info_proj_rel t2
        WHERE
          tw3.pk_entity = t1.fk_temporal_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      --appellation
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfAppellation')}
        FROM
          tw4
          CROSS JOIN information.v_appellation t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- language
      tw6 AS (
        SELECT
          ${this.createSelect('t1', 'InfLanguage')}
        FROM
          tw4
          CROSS JOIN information.v_language t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- time_primitive
      tw7 AS (
        SELECT
          ${this.createSelect('t1', 'InfTimePrimitive')}
        FROM
          tw4
          CROSS JOIN information.v_time_primitive t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- place
      tw8 AS (
        SELECT
          ${this.createSelect('t1', 'InfPlace')}
        FROM
          tw4
          CROSS JOIN information.v_place t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- ingoing_roles of temporal_entity
      tw9 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw3
          CROSS JOIN information.v_role t1,
          projects.info_proj_rel t2
        WHERE
          tw3.pk_entity = t1.fk_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------
      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.proj_rel ->> 'pk_entity') t1.proj_rel as objects
          FROM
          (
            SELECT
            proj_rel
            FROM
            tw2
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw3
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw4
            UNION ALL
            SELECT
            proj_rel
            FROM
            tw9
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw2
            UNION ALL
            SELECT
            *
            FROM
            tw4
            UNION ALL
            SELECT
            *
            FROM
            tw9
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      temporal_entity AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTemporalEntity')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      appellation AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfAppellation')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t2.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw6
          ) AS t1
        ) as t2
        GROUP BY true
      ),
      time_primitive AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTimePrimitive')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw7
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      place AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPlace')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw8
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      paginatedRoles AS (
        SELECT COALESCE(json_agg(t1.pk_entity), '[]'::json) as json
        FROM
          tw2 as t1
      )
      select
      json_build_object(
        'count', tw1.count,
        'schemas', json_build_object (
          'inf', json_strip_nulls(json_build_object(
            'role', role.json,
            'temporal_entity', temporal_entity.json,
            'appellation', appellation.json,
            'language', language.json,
            'time_primitive', time_primitive.json,
            'place', place.json
          )),
          'pro', json_strip_nulls(json_build_object(
            'info_proj_rel', info_proj_rel.json
          ))
        ),
        'paginatedRoles', paginatedRoles.json
      ) as data

      FROM
      tw1
      LEFT JOIN paginatedRoles ON true
      LEFT JOIN role ON true
      LEFT JOIN temporal_entity ON true
      LEFT JOIN appellation ON true
      LEFT JOIN language ON true
      LEFT JOIN time_primitive ON true
      LEFT JOIN place ON true
      LEFT JOIN info_proj_rel ON true

    `;
    // logFn(sql, this.params)
    return { sql, params: this.params };
  }

  createAlternativeTemporalEntityListQuery(
    fkProject,
    fkSourceEntity,
    fkProperty,
    fkTargetClass,
    isOutgoing,
    limit,
    offset
  ) {
    const sql = `
      WITH
      -- alternative roles (that are in at least one other project)
      tw0 AS (
        SELECT t1.*
        FROM
        information.v_role t1,
        information.temporal_entity t2
        WHERE
        -- if isOutgoing join with fk_temporal_entity , else fk_entity
        t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} =
        ${this.addParam(fkSourceEntity)}
        --  add the pk_entity of the 'source' entity here
        AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
        -- ensure the target entity is a temporal entity
        AND t1.fk_temporal_entity = t2.pk_entity
        -- ensure the target temporal entity has right class
        AND t2.fk_class = ${this.addParam(fkTargetClass)}
        -- ensure the role is in at least one project
        AND t1.is_in_project_count > 0
      EXCEPT
        SELECT t1.*
        FROM
        information.v_role t1,
        projects.info_proj_rel t2,
        information.temporal_entity t3
        WHERE
        --if isOutgoing join with fk_temporal_entity , else fk_entity
        t1.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} =
        ${this.addParam(fkSourceEntity)}
        --  add the pk_entity of the 'source' entity here
        AND t1.fk_property = ${this.addParam(fkProperty)}
         -- add the pk_property
        AND t2.fk_project = ${this.addParam(fkProject)}
        -- add the pk_project here
        -- ensure the target entity is a temporal entity
        AND t1.fk_temporal_entity = t3.pk_entity
        -- ensure the target temporal entity has right class
        AND t3.fk_class = ${this.addParam(fkTargetClass)}
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
      ),
      -- count
      tw1 AS (
        SELECT
          count(*)
        FROM
          tw0
        GROUP BY
          TRUE
      ),
      -- roles
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')}
          --t1.fk_property,
          --t1.fk_entity,
          --t1.fk_temporal_entity,
          --t1.is_in_project_count,
          --t1.is_standard_in_project_count,
          --t1.community_favorite_calendar,
          --t1.range_max_quantifier,
          --t1.domain_max_quantifier,
          --t1.pk_entity
        FROM
          tw0 t1
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      -- temporal_entity
      tw3 AS (
        SELECT
          t1.fk_class,
          t1.notes,
          t1.pk_entity
        FROM
          tw2
          CROSS JOIN information.v_temporal_entity t1
        WHERE
          -- if isOutgoing join with fk_entity, else fk_temporal_entity
          tw2.fk_temporal_entity = t1.pk_entity
      ),
      -- outgoing_roles of temporal_entity
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')}
          --t1.fk_property,
          --t1.fk_entity,
          --t1.fk_temporal_entity,
          --t1.is_in_project_count,
          --t1.is_standard_in_project_count,
          --t1.community_favorite_calendar,
          --t1.range_max_quantifier,
          --t1.domain_max_quantifier,
          --t1.pk_entity
        FROM
          tw3
          CROSS JOIN information.v_role t1
        WHERE
          tw3.pk_entity = t1.fk_temporal_entity
      ),
      --appellation
      tw5 AS (
        SELECT
          t1.quill_doc,
          t1.fk_class,
          t1.string,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_appellation t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- language
      tw6 AS (
        SELECT
          t1.fk_class,
          t1.pk_language,
          t1.lang_type,
          t1.scope,
          t1.iso6392b,
          t1.iso6392t,
          t1.iso6391,
          t1.notes,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_language t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- time_primitive
      tw7 AS (
        SELECT
          t1.fk_class,
          t1.julian_day,
          t1.duration,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_time_primitive t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),
      -- place
      tw8 AS (
        SELECT
          t1.long,
          t1.lat,
          t1.fk_class,
          t1.pk_entity
        FROM
          tw4
          CROSS JOIN information.v_place t1
        WHERE
          tw4.fk_entity = t1.pk_entity
      ),

      ------------------------------------
      --- group parts by model
      ------------------------------------
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw2
            UNION ALL
            SELECT
            *
            FROM
            tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      temporal_entity AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTemporalEntity')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      appellation AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfAppellation')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t2.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw6
          ) AS t1
        ) as t2
        GROUP BY true
      ),
      time_primitive AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTimePrimitive')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw7
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      place AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPlace')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw8
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      paginatedRoles AS (
        SELECT COALESCE(json_agg(t1.pk_entity), '[]'::json) as json
        FROM
          tw2 as t1
      )
      select
      json_build_object(
        'count', tw1.count,
        'schemas', json_build_object (
          'inf', json_strip_nulls(json_build_object(
            'role', role.json,
            'temporal_entity', temporal_entity.json,
            'appellation', appellation.json,
            'language', language.json,
            'time_primitive', time_primitive.json,
            'place', place.json
          ))
        ),
        'paginatedRoles', paginatedRoles.json
      ) as data

      FROM
      tw1
      LEFT JOIN paginatedRoles ON true
      LEFT JOIN role ON true
      LEFT JOIN temporal_entity ON true
      LEFT JOIN appellation ON true
      LEFT JOIN language ON true
      LEFT JOIN time_primitive ON true
      LEFT JOIN place ON true;
    `;
    // logFn(sql, this.params)
    return { sql, params: this.params };
  }

  createPeItMainQuery(fk_project, pk_entity) {
    const sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        information.v_persistent_item t1
      CROSS JOIN
        projects.info_proj_rel t2
      WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(
        fk_project
      )}
      AND t1.pk_entity = ${this.addParam(pk_entity)}
    ),
    -- pi_roles
    tw2 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE tw1.pk_entity = t1.fk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
    ),
    -- temporal_entity
    tw3 AS (
      SELECT
        ${this.createSelect('t1', 'InfTemporalEntity')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw2
        CROSS JOIN
        information.v_temporal_entity t1,
        projects.info_proj_rel t2
      WHERE tw2.fk_temporal_entity = t1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
        fk_project
      )}
    ),
    -- te_roles
    tw4 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE  tw3.pk_entity = t1.fk_temporal_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
    ),
    --appellation
    tw5 AS (
      SELECT
        ${this.createSelect('t1', 'InfAppellation')}
      FROM
        tw4
        CROSS JOIN
        information.v_appellation t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- language
    tw6 AS (
      SELECT
        ${this.createSelect('t1', 'InfLanguage')}
      FROM
        tw4
        CROSS JOIN
        information.v_language t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- time_primitive
    tw7 AS (
      SELECT
        ${this.createSelect('t1', 'InfTimePrimitive')}
      FROM
        tw4
        CROSS JOIN
        information.v_time_primitive t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- place
    tw8 AS (
      SELECT
        ${this.createSelect('t1', 'InfPlace')}
      FROM
        tw4
        CROSS JOIN
        information.v_place t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- persistent_item (geo)
    tw9 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')}
      FROM
        information.v_persistent_item t1
        CROSS JOIN
        tw4
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- ingoing_roles
    tw10 AS (
      SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
      CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE t1.fk_entity = tw3.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
        fk_project
      )}
    ),
    -- domain_entity_associations
    tw11 AS (
      SELECT
        ${this.createSelect('t1', 'InfEntityAssociation')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_entity_association t1,
        projects.info_proj_rel t2
      WHERE t1.fk_info_domain = tw1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
        fk_project
      )}
    ),
    -- text_properties
    tw12 AS (
      SELECT
        ${this.createSelect('t1', 'InfTextProperty')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_text_property t1,
        projects.info_proj_rel t2
      WHERE t1.fk_concerned_entity = tw1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
        fk_project
      )}
    ),
    ------------------------------------
    --- group parts by model
    ------------------------------------

    info_proj_rels AS (
      select distinct on (t1.proj_rel->>'pk_entity')
        t1.proj_rel
      FROM (
        SELECT proj_rel FROM tw1
        UNION ALL
        SELECT proj_rel FROM tw2
        UNION ALL
        SELECT proj_rel FROM tw3
        UNION ALL
        SELECT proj_rel FROM tw4
        UNION ALL
        SELECT proj_rel FROM tw10
        UNION ALL
        SELECT proj_rel FROM tw11
        UNION ALL
        SELECT proj_rel FROM tw12
      ) AS t1
    ),
    persistent_items AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPersistentItem')} as json
      FROM (
        SELECT * FROM tw1
      ) AS t1
    ),
    geo_persistent_items AS (
      select distinct on (t1.pk_entity)
        t1.pk_entity
      FROM (
        SELECT * FROM tw9
      ) AS t1
    ),
    roles AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfRole')} as json
      FROM (
        SELECT * FROM tw2
        UNION ALL
        SELECT * FROM tw4
        UNION ALL
        SELECT * FROM tw10
      ) AS t1
    ),
    entity_associations AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfEntityAssociation')} as json
      FROM (
        SELECT * FROM tw11
      ) AS t1
    ),
    temporal_entities AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTemporalEntity')} as json
      FROM (
        SELECT * FROM tw3
      ) AS t1
    ),
    appellations AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfAppellation')} as json
      FROM (
        SELECT * FROM tw5
      ) AS t1
    ),
    languages AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfLanguage')} as json
      FROM (
        SELECT * FROM tw6
      ) AS t1
    ),
    time_primitives AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTimePrimitive')} as json
      FROM (
        SELECT * FROM tw7
      ) AS t1
    ),
    places AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPlace')} as json
      FROM (
        SELECT * FROM tw8
      ) AS t1
    ),
    text_properties AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTextProperty')} as json
      FROM (
        SELECT * FROM tw12
      ) AS t1
    )
    SELECT 'persistent_item' as model, json_agg(json), count(*) from persistent_items GROUP BY true
    UNION ALL
    SELECT 'role' as model, json_agg(json), count(*) from roles GROUP BY true
    UNION ALL
    SELECT 'entity_association' as model, json_agg(json), count(*) from entity_associations GROUP BY true
    UNION ALL
    SELECT 'temporal_entity' as model, json_agg(json), count(*) from temporal_entities GROUP BY true
    UNION ALL
    SELECT 'appellation' as model, json_agg(json), count(*) from appellations GROUP BY true
    UNION ALL
    SELECT 'language' as model, json_agg(json), count(*) from languages GROUP BY true
    UNION ALL
    SELECT 'time_primitive' as model, json_agg(json), count(*) from time_primitives GROUP BY true
    UNION ALL
    SELECT 'place' as model, json_agg(json), count(*) from places GROUP BY true
    UNION ALL
    SELECT 'text_property' as model, json_agg(json), count(*) from text_properties GROUP BY true
    UNION ALL
    SELECT 'info_proj_rel' as model, json_agg(proj_rel), count(*) from info_proj_rels GROUP BY true
    UNION ALL
    SELECT 'geos' as model, json_agg(pk_entity), count(*) from geo_persistent_items GROUP BY true;
    `;
    // logFn(sql, this.params)
    return { sql, params: this.params };
  }

  createPeItOwnPropertiesQuery(fk_project, pk_entity) {
    const sql = `
      WITH tw1 AS (
        SELECT
          ${this.createSelect('t1', 'InfPersistentItem')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_persistent_item t1
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(
          fk_project
        )}
        AND t1.pk_entity = ${this.addParam(pk_entity)}
      ),
      -- domain_entity_associations
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfEntityAssociation')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_entity_association t1,
          projects.info_proj_rel t2
        WHERE t1.fk_info_domain = tw1.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
      ),
      -- text_properties
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTextProperty')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_text_property t1,
          projects.info_proj_rel t2
        WHERE t1.fk_concerned_entity = tw1.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
      ),
      -- language
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfLanguage')}
        FROM
          tw3
        CROSS JOIN
          information.v_language t1
        WHERE t1.pk_entity = tw3.fk_language
      ),
      -- has type role
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t3', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_role t1,
          data_for_history.v_property t2,
          projects.info_proj_rel t3
        WHERE t1.fk_temporal_entity = tw1.pk_entity
        AND t1.fk_property = t2.pk_property
        AND t2.is_has_type_subproperty = true
        AND t1.pk_entity = t3.fk_entity
        AND t3.is_in_project = true
        AND t3.fk_project = ${this.addParam(fk_project)}
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.proj_rel->>'pk_entity') t1.proj_rel as objects
          FROM (
            SELECT proj_rel FROM tw1
            UNION ALL
            SELECT proj_rel FROM tw2
            UNION ALL
            SELECT proj_rel FROM tw3
            UNION ALL
            SELECT proj_rel FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      persistent_item AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPersistentItem')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_association AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfEntityAssociation')} as objects
          FROM (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTextProperty')} as objects
          FROM (
            SELECT * FROM tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM (
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM (
            SELECT * FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'role', role.json,
          'persistent_item', persistent_item.json,
          'entity_association', entity_association.json,
          'text_property', text_property.json,
          'language', language.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      persistent_item
      LEFT JOIN entity_association ON true
      LEFT JOIN text_property ON true
      LEFT JOIN language ON true
      LEFT JOIN role ON true
      LEFT JOIN info_proj_rel ON true
    `;
    return { sql, params: this.params };
  }

  /**
   *
   * @param {*} fk_project
   * @param {*} pk_entity primary key of the Expression entity, for which we need the tree.
   */
  createContentTreeQuery(fk_project, pk_entity) {
    const sql = `
      -- query recusivly all the entity associations we need to create the tree
      -- tw0 delivers
      -- - pk_entity: the entity_associations we need
      -- - fk_info_domain: the persistent_item we need (Expression Portion)
      -- - fk_data_domain: the data.digital we need
      WITH RECURSIVE tw0 (fk_info_domain, fk_data_domain, fk_property, fk_info_range, fk_data_range, level, pk_entity, path) AS (
          SELECT  fk_info_domain, fk_data_domain, fk_property, fk_info_range, fk_data_range, 0, pk_entity, ARRAY[pk_entity]
          FROM    war.v_entity_association_per_project_and_repo
          WHERE   fk_info_range = ${this.addParam(pk_entity)}
          AND 	  project = ${this.addParam(fk_project)}
          AND		  fk_property IN (1317, 1328, 1329, 1216)

          UNION ALL

          SELECT  p.fk_info_domain, p.fk_data_domain, p.fk_property, p.fk_info_range, p.fk_data_range, t0.level + 1, p.pk_entity, ARRAY_APPEND(t0.path, p.pk_entity)
          FROM    war.v_entity_association_per_project_and_repo p
                  INNER JOIN tw0 t0 ON t0.fk_info_domain = p.fk_info_range
                  WHERE 	p.project = ${this.addParam(fk_project)}
                  AND		p.fk_property IN (1317, 1328, 1329, 1216)

      ),
      -- persistent_items (Expression Portions)
      tw1 AS (
        SELECT
          ${this.createSelect('t1', 'InfPersistentItem')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_persistent_item t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_info_domain
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fk_project)}
      ),
      -- entity_associations
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfEntityAssociation')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_entity_association t1,
          projects.info_proj_rel t2
        WHERE
        tw0.pk_entity = t1.pk_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fk_project)}
      ),
      -- text_properties
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTextProperty')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_text_property t1,
          projects.info_proj_rel t2
        WHERE t1.fk_concerned_entity = tw1.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
      ),
      -- language
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfLanguage')}
        FROM
          tw3
        CROSS JOIN
          information.v_language t1
        WHERE t1.pk_entity = tw3.fk_language
      ),
      -- has type role
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t3', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_role t1,
          data_for_history.v_property t2,
          projects.info_proj_rel t3
        WHERE t1.fk_temporal_entity = tw1.pk_entity
        AND t1.fk_property = t2.pk_property
        AND t2.is_has_type_subproperty = true
        AND t1.pk_entity = t3.fk_entity
        AND t3.is_in_project = true
        AND t3.fk_project = ${this.addParam(fk_project)}
      ),
      -- has appellation for language roles
      tw6 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_role t1,
          projects.info_proj_rel t2
        WHERE t1.fk_entity = tw1.pk_entity
        AND t1.fk_property = 1111
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fk_project)}
      ),
      -- digital
      tw7 AS (
        SELECT
          ${this.createSelect('t1', 'DatDigital')}
        FROM
          tw0
        CROSS JOIN
          data.digital t1
        WHERE t1.pk_entity = tw0.fk_data_domain
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.proj_rel->>'pk_entity') t1.proj_rel as objects
          FROM (
            SELECT proj_rel FROM tw1
            UNION ALL
            SELECT proj_rel FROM tw2
            UNION ALL
            SELECT proj_rel FROM tw3
            UNION ALL
            SELECT proj_rel FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      persistent_item AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPersistentItem')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_association AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfEntityAssociation')} as objects
          FROM (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTextProperty')} as objects
          FROM (
            SELECT * FROM tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLanguage')} as objects
          FROM (
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM (
            SELECT * FROM tw5
            UNION ALL
            SELECT * FROM tw6
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      digital AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'DatDigital')} as objects
          FROM (
            SELECT * FROM tw7
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'role', role.json,
          'persistent_item', persistent_item.json,
          'entity_association', entity_association.json,
          'text_property', text_property.json,
          'language', language.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        )),
        'dat', json_strip_nulls(json_build_object(
          'digital', digital.json
        ))
      ) as data
      FROM
      entity_association
      LEFT JOIN persistent_item ON true
      LEFT JOIN text_property ON true
      LEFT JOIN language ON true
      LEFT JOIN role ON true
      LEFT JOIN digital ON true
      LEFT JOIN info_proj_rel ON true
    `;
    return { sql, params: this.params };
  }

  createPeItGeoQuery(fk_project, pkEntities) {
    const sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', 'InfPersistentItem')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        information.v_persistent_item t1
      CROSS JOIN
        projects.info_proj_rel t2
      WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(
        fk_project
      )}
      AND t1.pk_entity IN (${this.addParams(pkEntities)})
    ),
    -- pi_roles
    tw2 AS (
    SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw1
      CROSS JOIN
        information.v_role t1
      CROSS JOIN
        information.v_temporal_entity t3,
        projects.info_proj_rel t2
      WHERE tw1.pk_entity = t1.fk_entity
      AND t3.fk_class = 84 AND t1.fk_temporal_entity = t3.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
    ),
    -- temporal_entity
    tw3 AS (
      SELECT
        ${this.createSelect('t1', 'InfTemporalEntity')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw2
        CROSS JOIN
        information.v_temporal_entity t1,
        projects.info_proj_rel t2
      WHERE tw2.fk_temporal_entity = t1.pk_entity
      AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
        fk_project
      )}
    ),
    -- te_roles
    tw4 AS (
    SELECT
        ${this.createSelect('t1', 'InfRole')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN
        information.v_role t1,
        projects.info_proj_rel t2
      WHERE  tw3.pk_entity = t1.fk_temporal_entity
      AND t1.fk_property = ANY(ARRAY[148, 71, 72, 150, 151, 152, 153])
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
          fk_project
        )}
    ),
    -- time_primitive
    tw5 AS (
      SELECT
        ${this.createSelect('t1', 'InfTimePrimitive')}
      FROM
        tw4
        CROSS JOIN
        information.v_time_primitive t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    -- place
    tw6 AS (
      SELECT
        ${this.createSelect('t1', 'InfPlace')}
      FROM
        tw4
        CROSS JOIN
        information.v_place t1
      WHERE tw4.fk_entity = t1.pk_entity
    ),
    info_proj_rels AS (
      select distinct on (t1.proj_rel->>'pk_entity')
        t1.proj_rel
      FROM (
        SELECT proj_rel FROM tw1
        UNION ALL
        SELECT proj_rel FROM tw2
        UNION ALL
        SELECT proj_rel FROM tw3
        UNION ALL
        SELECT proj_rel FROM tw4
      ) AS t1
    ),
    persistent_items AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPersistentItem')} as json
      FROM (
        SELECT * FROM tw1
      ) AS t1
    ),
    roles AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfRole')} as json
      FROM (
        SELECT * FROM tw2
        UNION ALL
        SELECT * FROM tw4
      ) AS t1
    ),
    temporal_entities AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTemporalEntity')} as json
      FROM (
        SELECT * FROM tw3
      ) AS t1
    ),
    time_primitives AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfTimePrimitive')} as json
      FROM (
        SELECT * FROM tw5
      ) AS t1
    ),
    places AS (
      select distinct on (t1.pk_entity)
      ${this.createBuildObject('t1', 'InfPlace')} as json
      FROM (
        SELECT * FROM tw6
      ) AS t1
    )


    SELECT 'persistent_item' as model, json_agg(json), count(*) from persistent_items GROUP BY true
    UNION ALL
    SELECT 'role' as model, json_agg(json), count(*) from roles GROUP BY true
    UNION ALL
    SELECT 'temporal_entity' as model, json_agg(json), count(*) from temporal_entities GROUP BY true
    UNION ALL
    SELECT 'time_primitive' as model, json_agg(json), count(*) from time_primitives GROUP BY true
    UNION ALL
    SELECT 'place' as model, json_agg(json), count(*) from places GROUP BY true
    UNION ALL
    SELECT 'info_proj_rel' as model, json_agg(proj_rel), count(*) from info_proj_rels GROUP BY true

    `;
    return { sql, params: this.params };
  }

  /**
   * Helpers
   */

  getColumns(modelName) {
    const propDefs = this.models[modelName].definition.properties;
    const columns = [];
    for (const colName in propDefs) {
      if (propDefs.hasOwnProperty(colName)) {
        if (!propDefs[colName].hidden) columns.push(colName);
      }
    }
    return columns;
  }
  createSelect(alias, model) {
    const columns = this.getColumns(model);
    return columns.map(c => alias + '.' + c).join(`,
    `);
  }
  createBuildObject(alias, model) {
    const columns = this.getColumns(model);
    return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `;
  }
  addParam(val) {
    this.params.push(val);
    return '$' + this.params.length;
  }

  addParams(vals) {
    return vals.map(val => this.addParam(val)).join(',');
  }
}
module.exports = FlatObjectQueryBuilder;
