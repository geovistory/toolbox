
CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__create(
	  param_pk_entities INT[]
  )
    RETURNS SETOF warehouse.entity_preview_non_recursive
AS $$

    WITH
    -- all entities per project with class label
    tw1 AS (
      SELECT
        t1.pk_entity,
        t1.fk_class,
        t2.fk_project,
        'persistent_item'::varchar AS table_name,
        t3.class_label
      FROM
        information.persistent_item t1,
        projects.info_proj_rel t2,
        warehouse.class_preview t3
      WHERE
        t1.pk_entity = ANY(param_pk_entities)
      AND
        t2.is_in_project = true
      AND
        t1.pk_entity = t2.fk_entity
      AND
        t1.fk_class = t3.dfh_pk_class
      UNION
      SELECT
        t1.pk_entity,
        t1.fk_class,
        t2.fk_project,
        'temporal_entity'::varchar AS table_name,
        t3.class_label
      FROM
        information.temporal_entity t1,
        projects.info_proj_rel t2,
        warehouse.class_preview t3
      WHERE
        t1.pk_entity = ANY(param_pk_entities)
      AND
        t2.is_in_project = true
      AND
        t1.pk_entity = t2.fk_entity
      AND
        t1.fk_class = t3.dfh_pk_class
    ),
    -- all entities per project and repo
    tw2 AS (
      SELECT
        t1.pk_entity,
          t1.fk_class,
        t1.fk_project,
          t1.table_name,
        t1.class_label
      FROM
        tw1 t1
      WHERE
        t1.pk_entity = ANY(param_pk_entities)
      UNION
      SELECT DISTINCT ON (pk_entity)
        t1.pk_entity,
          t1.fk_class,
        NULL::integer AS fk_project,
          t1.table_name,
        t1.class_label
      FROM
        tw1 t1
      WHERE
        t1.pk_entity = ANY(param_pk_entities)
    ),
    -- fields (deprecated/to be changed with pk_property)
    tw3 AS (
      SELECT
        t1.pk_entity,
        t1.ord_num AS field_order,
        CASE
          WHEN t1.property_is_outgoing = true THEN t2.dfh_has_domain
          WHEN t1.property_is_outgoing = false THEN t2.dfh_has_range
          ELSE t1.fk_class_for_class_field
        END AS fk_class,
        t1.fk_class_for_class_field,
        t2.dfh_has_domain as fk_domain_class,
        t2.dfh_has_range as fk_range_class,
        t1.fk_property,
        t1.property_is_outgoing,
        t1.fk_class_field,
        t3.used_table
      FROM
        projects.class_field_config t1
      LEFT JOIN
        data_for_history.property t2 ON t2.dfh_pk_property = t1.fk_property
      LEFT JOIN
        system.class_field t3 ON t3.pk_entity = t1.fk_class_field
        WHERE
        t1.fk_app_context = 45
      AND
        t1.ord_num IS NOT NULL
        ORDER BY (
            CASE
                WHEN t1.property_is_outgoing = true THEN t2.dfh_has_domain
                WHEN t1.property_is_outgoing = false THEN t2.dfh_has_range
                ELSE t1.fk_class_for_class_field
            END), t1.ord_num
    ),
    -- explode with all fields: join all entities with their fields
    tw4 AS (
      --
      SELECT
        tw2.pk_entity,
          tw2.fk_class,
        tw2.fk_project,
          tw2.table_name,
        tw2.class_label,
        t2.field_order,
        t2.fk_class_field,
        t2.fk_property,
        t2.fk_range_class,
        t2.fk_domain_class,
        t2.property_is_outgoing
      FROM
        tw2,
        -- Deprecated: Replace with new pk_property system asap
        tw3 t2
      WHERE
      --AND
        --tw2.fk_project
        tw2.fk_class = t2.fk_class
    ),
    -- select all roles per project with ord_num
    tw5 AS (
      SELECT t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        COALESCE(t2.fk_project, 0) AS project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
      FROM information.v_role t1,
        projects.info_proj_rel t2
        WHERE
        (
          t1.fk_entity = ANY(param_pk_entities)
          OR
          t1.fk_temporal_entity = ANY(param_pk_entities)
        )
        AND t2.fk_entity = t1.pk_entity
        AND t2.is_in_project = true
      UNION
      SELECT t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        NULL::integer AS fk_project,
        0 AS project,
        NULL::integer AS ord_num_of_domain,
        NULL::integer AS ord_num_of_range,
        t1.is_in_project_count
        FROM information.v_role t1
      WHERE
        (
          t1.fk_entity = ANY(param_pk_entities)
          OR
          t1.fk_temporal_entity = ANY(param_pk_entities)
        )
      AND
        t1.is_in_project_count > 0
    ),
    -- select all text_properties per project with ord_num
    tw6 AS (
      SELECT
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        COALESCE(t2.fk_project, 0) AS "coalesce",
        t2.ord_num_of_text_property
        FROM information.v_text_property t1,
        projects.info_proj_rel t2
        WHERE
        t1.fk_concerned_entity = ANY(param_pk_entities)
        AND
        t2.fk_entity = t1.pk_entity AND t2.is_in_project = true
      UNION
      SELECT
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        NULL::integer AS fk_project,
        0 AS "coalesce",
        NULL::integer AS ord_num_of_text_property
        FROM information.v_text_property t1
        WHERE
        t1.fk_concerned_entity = ANY(param_pk_entities)
        AND
        t1.is_in_project_count > 0
    ),
    -- join directly related things and create string
    tw7 AS (
      SELECT
        t1.*,
        COALESCE(t2.ord_num_of_range, t7.ord_num_of_text_property) AS ord_num,
        COALESCE(t3.string, t4.notes, t7.string) AS string,
        COALESCE(t5.pk_entity, t6.pk_entity, t9.pk_entity, t10.pk_entity) AS fk_related_entity
      FROM
        tw4 t1
      -- join outgoing roles
      LEFT JOIN
          tw5 t2
        ON
          t1.fk_property = t2.fk_property
        AND
          t1.fk_project IS NOT DISTINCT FROM t2.fk_project
        AND
          t1.property_is_outgoing = TRUE
        AND
          t2.fk_temporal_entity = t1.pk_entity
      -- join appellation with outgoing roles
      LEFT JOIN
          information.appellation t3
        ON
          t2.fk_entity = t3.pk_entity
      -- join language with outgoing roles
        LEFT JOIN
          information.language t4
        ON
          t2.fk_entity = t4.pk_entity
      -- join persistent_item with outgoing roles
        LEFT JOIN
          information.persistent_item t5
        ON
          t2.fk_entity = t5.pk_entity
      -- join temporal_entity with outgoing roles
        LEFT JOIN
          information.temporal_entity t6
        ON
          t2.fk_entity = t6.pk_entity
      -- join text properties
      LEFT JOIN
          tw6 t7
        ON
          t1.pk_entity = t7.fk_concerned_entity
        AND
          t1.fk_class_field = t7.fk_class_field
        AND
          t1.fk_project IS NOT DISTINCT FROM t7.fk_project
      -- join ingoing roles
      LEFT JOIN
          tw5 t8
        ON
          t1.fk_property = t8.fk_property
        AND
          t1.fk_project IS NOT DISTINCT FROM t8.fk_project
        AND
          t1.property_is_outgoing = FALSE
        AND
          t8.fk_entity = t1.pk_entity
      -- join persistent_item with ingoing roles
        LEFT JOIN
          information.persistent_item t9
        ON
          t8.fk_temporal_entity = t9.pk_entity
      -- join temporal_entity with ingoing roles
        LEFT JOIN
          information.temporal_entity t10
        ON
          t8.fk_temporal_entity = t10.pk_entity
    ),
    -- group for ordered array of strings
    tw8 AS (
      SELECT  pk_entity, fk_class, fk_project, table_name, class_label,
      array_agg(string
        ORDER BY
          t1.field_order ASC,
          t1.ord_num ASC
      ) string_array
      FROM tw7 t1
      GROUP BY pk_entity, fk_class, fk_project, table_name, class_label
    ),
    -- select roles with time primitive
    tw9 AS (
            SELECT r.fk_temporal_entity,
                r.fk_property,
                epr.fk_project,
                epr.calendar,
                tp.julian_day,
                tp.duration
              FROM information.role r,
                projects.info_proj_rel epr,
                information.v_time_primitive tp
              WHERE
          r.fk_temporal_entity = ANY(param_pk_entities)
          AND
          r.pk_entity = epr.fk_entity
          AND (r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153])) AND tp.pk_entity = r.fk_entity AND epr.is_in_project = true
            UNION
            ( SELECT DISTINCT ON (r.fk_temporal_entity, r.fk_property) r.fk_temporal_entity,
                r.fk_property,
                NULL::integer AS fk_project,
                r.community_favorite_calendar,
                tp.julian_day,
                tp.duration
              FROM information.v_role r
                JOIN information.v_time_primitive tp ON tp.pk_entity = r.fk_entity
              WHERE
          r.fk_temporal_entity = ANY(param_pk_entities)
          AND
          r.fk_property = ANY (ARRAY[71, 72, 150, 151, 152, 153])
              ORDER BY r.fk_temporal_entity, r.fk_property, r.is_in_project_count DESC, r.tmsp_creation DESC)
            ),
    -- create time spans
    tw10 AS (
    SELECT
      tw9.fk_project,
        tw9.fk_temporal_entity,
        jsonb_object_agg(
            CASE
                WHEN tw9.fk_property = 71 THEN 'p81'::text
                WHEN tw9.fk_property = 72 THEN 'p82'::text
                WHEN tw9.fk_property = 150 THEN 'p81a'::text
                WHEN tw9.fk_property = 151 THEN 'p81b'::text
                WHEN tw9.fk_property = 152 THEN 'p82a'::text
                WHEN tw9.fk_property = 153 THEN 'p82b'::text
                ELSE tw9.fk_property::text
            END, json_build_object('julianDay', tw9.julian_day, 'duration', tw9.duration, 'calendar', tw9.calendar)) AS time_span
        FROM tw9
        GROUP BY tw9.fk_project, tw9.fk_temporal_entity
    ),
    tw11 AS (
      SELECT
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        array_to_string(t1.string_array, '; ') own_full_text,
        t1.string_array[1] own_entity_label,
        t2.time_span
      FROM
        tw8 t1
      LEFT JOIN
        tw10 t2
      ON
        t1.pk_entity = t2.fk_temporal_entity
      AND
        t1.fk_project IS NOT DISTINCT FROM t2.fk_project
    ),
    -- group related things and create object with fk_related_entities
    tw12 AS (
      SELECT
        t1.pk_entity,
        t1.fk_project,
        jsonb_object_agg(t1.fk_related_entity::text, NULL::unknown) AS related_full_texts,
        array_agg(t1.fk_related_entity
        ORDER BY
          t1.field_order ASC,
          t1.ord_num ASC
        ) AS fk_entity_labels
      FROM tw7 t1
      WHERE t1.fk_related_entity IS NOT NULL
      GROUP BY pk_entity, fk_class, fk_project, table_name, class_label
    ),
    -- join fk_entity_label and related_full_texts
    tw13 AS (
      SELECT
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t2.related_full_texts,
        CASE WHEN t1.own_entity_label IS NOT NULL THEN NULL::integer
          ELSE t2.fk_entity_labels[1]
        END AS fk_entity_label
      FROM
        tw11 t1
      LEFT JOIN
        tw12 t2
      ON
        t1.pk_entity = t2.pk_entity
      AND
        t1.fk_project IS NOT DISTINCT FROM t2.fk_project
    ),
     -- select all entity associations per project with ord_num
    tw14 AS (
       SELECT DISTINCT t1.pk_entity,
          t1.fk_info_domain,
          t1.fk_info_range,
          t1.fk_data_domain,
          t1.fk_data_range,
          t1.fk_property,
          t2.fk_project,
          COALESCE(t2.fk_project, 0) AS project,
          t1.is_in_project_count
        FROM information.v_entity_association t1,
          projects.info_proj_rel t2
        WHERE
         (
          t1.fk_info_domain = ANY(param_pk_entities)
          OR
          t1.fk_info_range = ANY(param_pk_entities)
        )
        AND
        t2.fk_entity = t1.pk_entity AND t2.is_in_project = true
      UNION
      SELECT DISTINCT t1.pk_entity,
          t1.fk_info_domain,
          t1.fk_info_range,
          t1.fk_data_domain,
          t1.fk_data_range,
          t1.fk_property,
          NULL::integer AS fk_project,
          0 AS project,
          t1.is_in_project_count
        FROM information.v_entity_association t1
        WHERE
        (
          t1.fk_info_domain = ANY(param_pk_entities)
          OR
          t1.fk_info_range = ANY(param_pk_entities)
        )
        AND
        t1.is_in_project_count > 0
    ),
    -- get type entity_associations (DEPRECATED)
    tw15 AS (
    SELECT DISTINCT ON (t1.fk_project, t1.fk_property, t1.fk_info_domain)
        t1.fk_project,
        t1.fk_property,
        t1.fk_info_domain,
        t1.fk_info_range,
        t1.is_in_project_count
      FROM
        tw14 t1,
        system.class_has_type_property t2
      WHERE
        (
          t1.fk_info_domain = ANY(param_pk_entities)
          OR
          t1.fk_info_range = ANY(param_pk_entities)
        )
      AND
        t1.fk_project IS NULL AND t1.fk_property = t2.fk_property
      UNION
      SELECT
        t3.fk_project,
        t3.fk_property,
        t3.fk_info_domain,
        t3.fk_info_range,
        t3.is_in_project_count
        FROM
        tw14 t3,
        system.class_has_type_property t4
      WHERE
        (
          t3.fk_info_domain = ANY(param_pk_entities)
          OR
          t3.fk_info_range = ANY(param_pk_entities)
        )
      AND
        t3.fk_project IS NOT NULL AND t3.fk_property = t4.fk_property
      ORDER BY 1, 2, 3, 5 DESC
    ),
    -- join fk_type
    tw16 AS (
      SELECT
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.table_name,
        t1.class_label,
        t1.own_full_text,
        t1.own_entity_label,
        t1.time_span,
        t1.related_full_texts,
        t1.fk_entity_label,
          t2.fk_info_range AS fk_type
        FROM
        tw13 t1
      LEFT JOIN
        tw15 t2
      ON
        t1.pk_entity = t2.fk_info_domain
      AND
        t1.fk_project IS NOT DISTINCT FROM t2.fk_project
    )
    SELECT * FROM tw16;

$$ LANGUAGE SQL;

