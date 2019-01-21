'use strict';

var dbm;
var type;
var seed;

/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {

  const sql = `
  ------------------------------------------------------------------------------------------------------------
  -- REPLACE VEIW v_text_property  (add is_in_project_count)
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW information.v_text_property AS
  SELECT text_property.pk_entity,
      text_property.schema_name,
      text_property.table_name,
      text_property.notes,
      text_property.fk_creator,
      text_property.fk_last_modifier,
      text_property.tmsp_creation,
      text_property.tmsp_last_modification,
      text_property.sys_period,
      text_property.text_property,
      text_property.fk_concerned_entity,
      text_property.text_property_quill_doc,
      text_property.fk_language,
      text_property.fk_class_field,
      information.text_property_to_string(text_property.text_property_quill_doc) AS string,
    count(epr.fk_project) is_in_project_count
     FROM information.text_property
     LEFT JOIN information.entity_version_project_rel as epr
      on epr.fk_entity = text_property.pk_entity 
      and epr.is_in_project = true
     GROUP BY (
       text_property.pk_entity,
      text_property.schema_name,
      text_property.table_name,
      text_property.notes,
      text_property.fk_creator,
      text_property.fk_last_modifier,
      text_property.tmsp_creation,
      text_property.tmsp_last_modification,
      text_property.sys_period,
      text_property.text_property,
      text_property.fk_concerned_entity,
      text_property.text_property_quill_doc,
      text_property.fk_language,
      text_property.fk_class_field
     );

  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_text_properties_per_project_and_repo                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_text_properties_per_project_and_repo AS (
    -- select all text_property per project
    SELECT DISTINCT t.*, epr.fk_project, coalesce(epr.fk_project,0)
    FROM information.v_text_property t
    JOIN information.entity_version_project_rel as epr
      on epr.fk_entity = t.pk_entity 
      and epr.is_in_project = true
    
    UNION
    -- select all roles per repo
    SELECT DISTINCT t.*, NULL::INT, 0
    FROM information.v_text_property t
    WHERE t.is_in_project_count > 0
  );

  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_roles_per_project_and_repo                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo AS (
    -- select all roles per project
    SELECT DISTINCT r.fk_entity, r.fk_temporal_entity, r.fk_property, epr.fk_project, epr.ord_num rank_for_pe_it,  epr.ord_num rank_for_te_ent, coalesce(epr.fk_project,0) project
    FROM information.v_role r
    LEFT JOIN information.entity_version_project_rel as epr
      on epr.fk_entity = r.pk_entity 
      and epr.is_in_project = true
    
    UNION
    -- select all roles per repo
    SELECT DISTINCT r.fk_entity, r.fk_temporal_entity, r.fk_property, NULL::INT, rank_for_pe_it, rank_for_te_ent, 0
    FROM information.v_role r
    WHERE r.is_in_project_count > 0
  );


  
  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_entities                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_entities AS (
    -- select all TeEn and PeIt per project
    SELECT DISTINCT 
      e.pk_entity, 
      epr.fk_project,
      epr.fk_project project,
      CASE WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class ELSE te.fk_class END AS fk_class,
      e.table_name
    FROM information.entity_version_project_rel epr
    JOIN information.entity e on e.pk_entity = epr.fk_entity
    LEFT JOIN information.persistent_item pi on e.pk_entity = pi.pk_entity
    LEFT JOIN information.temporal_entity te on e.pk_entity = te.pk_entity
    WHERE epr.is_in_project = true
    AND e.table_name IN ('temporal_entity', 'persistent_item')
    UNION
    -- select all TeEn and PeIt per repo
    SELECT DISTINCT 
      e.pk_entity, 
      NULL::integer as fk_project,
      0,
      CASE WHEN pi.pk_entity IS NOT NULL THEN pi.fk_class ELSE te.fk_class END AS fk_class,
      e.table_name
    FROM information.entity e
    LEFT JOIN information.persistent_item pi on e.pk_entity = pi.pk_entity
    LEFT JOIN information.temporal_entity te on e.pk_entity = te.pk_entity
    WHERE e.table_name IN ('temporal_entity', 'persistent_item')
  
    ORDER BY pk_entity
    --LIMIT 10
  );


  ------------------------------------------------------------------------------------------------------------
  -- VEIW  v_own_entity_label                                                          #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS ( 
      WITH entities AS (
      SELECT * FROM warehouse.v_entities 
      ),
    first_field AS (
      SELECT e.*, f.fk_property, f.fk_class_field, f.fk_class
      FROM information.v_ordered_fields_per_class f
      JOIN entities e ON f.fk_class = e.fk_class
      WHERE field_order = 0
    ),
    string_from_first_role AS (
      SELECT * FROM (
        SELECT first_field.*, COALESCE(appe.string, lang.notes) as string_from_first_role,
          ROW_NUMBER () OVER (
          PARTITION BY first_field.pk_entity, first_field.project
          ORDER BY
          r.rank_for_pe_it
          ) as role_number
        FROM first_field
        LEFT JOIN  warehouse.v_roles_per_project_and_repo as r
        on first_field.fk_property = r.fk_property
        and first_field.pk_entity = r.fk_temporal_entity
        and r.fk_project IS NOT DISTINCT FROM first_field.fk_project
  
        -----------------------------------------------------------
        -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
        --   appellation
        LEFT JOIN information.v_appellation as appe
        ON r.fk_entity = appe.pk_entity
        --   language
        LEFT JOIN information.v_language as lang
        ON r.fk_entity = lang.pk_entity
        --   time_primitive
        --   place
      ) AS all_roles
      where role_number = 1
  
    ),
    string_from_first_text_prop AS (
      SELECT * FROM  (
        SELECT coalesce(string_from_first_role.fk_project, 0) as p, string_from_first_role.*, txtp.string as string_from_first_text_prop,
          ROW_NUMBER () OVER (
          PARTITION BY string_from_first_role.pk_entity, string_from_first_role.project
          ORDER BY txtp.tmsp_creation DESC
          ) as txtp_number
        FROM string_from_first_role
        LEFT JOIN warehouse.v_text_properties_per_project_and_repo as txtp 
        ON string_from_first_role.fk_class_field IS NOT DISTINCT FROM txtp.fk_class_field 
        AND txtp.fk_concerned_entity = string_from_first_role.pk_entity 
        AND txtp.fk_project IS NOT DISTINCT FROM string_from_first_role.fk_project 
      ) as all_txtp
      where txtp_number = 1
    )
    SELECT pk_entity, fk_project, COALESCE(string_from_first_role, string_from_first_text_prop) entity_label,  project
    FROM string_from_first_text_prop
  );
 


  ------------------------------------------------------------------------------------------------------------
  -- VEIW  v_own_full_text                                                          #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_own_full_text AS ( 
      WITH entities AS (
      SELECT * FROM warehouse.v_entities 
      ),
    field AS (
      SELECT e.*, f.fk_property, f.fk_class_field, f.fk_class, field_order
      FROM information.v_ordered_fields_per_class f
      JOIN entities e ON f.fk_class = e.fk_class
      WHERE field_order IS NOT NULL
    ),
    string_from_role AS (
      SELECT * FROM (
        SELECT field.*, 
        COALESCE(appe.string, lang.notes) as string,
          ROW_NUMBER () OVER (
          PARTITION BY field.pk_entity, field.project
          ORDER BY
          r.rank_for_pe_it
          ) as role_number
        FROM field
        LEFT JOIN  warehouse.v_roles_per_project_and_repo as r
        on field.fk_property = r.fk_property
        and field.pk_entity = r.fk_temporal_entity
        and r.fk_project IS NOT DISTINCT FROM field.fk_project
  
        -----------------------------------------------------------
        -- get the strings directly connected to entity via role-fk_entity (not via intermediate entity/PeIt)
  
        --   appellation
        LEFT JOIN information.v_appellation as appe
        ON r.fk_entity = appe.pk_entity
        --   language
        LEFT JOIN information.v_language as lang
        ON r.fk_entity = lang.pk_entity
        --   time_primitive
        --   place
      ) AS all_roles
  
    ),
    string_from_text_prop AS (
      SELECT * FROM  (
        SELECT 
        field.*, 
        regexp_replace(txtp.string, E'[\\n\\r]+', '', 'g' ) as string,
          ROW_NUMBER () OVER (
          PARTITION BY field.pk_entity, field.project
          ORDER BY txtp.tmsp_creation DESC
          ) as txtp_number
        FROM field
        LEFT JOIN warehouse.v_text_properties_per_project_and_repo as txtp 
        ON field.fk_class_field IS NOT DISTINCT FROM txtp.fk_class_field 
        AND txtp.fk_concerned_entity = field.pk_entity 
        AND txtp.fk_project IS NOT DISTINCT FROM field.fk_project 
      ) as all_txtp
    ),
      all_stings AS (
        SELECT *
            FROM  string_from_text_prop
            UNION
            SELECT *
            FROM string_from_role
      ),
      aggregated AS (
      SELECT pk_entity, fk_project, project, string_agg(string, ', ' ORDER BY field_order) as own_full_text
          FROM all_stings
        GROUP BY pk_entity, fk_project, project
      )					   
      SELECT * 
      FROM aggregated
  );


  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_fk_entity_label                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_fk_entity_label AS ( 
      WITH entities AS (
        SELECT * FROM warehouse.v_entities 
      )
      SELECT entities.*, a.fk_entity_label
      FROM entities
      LEFT JOIN 
    (
      (
        SELECT r.fk_entity as pk_entity, fk_temporal_entity as fk_entity_label, r.fk_project,
          ROW_NUMBER () OVER (
          PARTITION BY r.fk_entity, coalesce(r.fk_project, 0)
          ORDER BY
          r.rank_for_pe_it
          ) as rank
        FROM warehouse.v_roles_per_project_and_repo r
        JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0  AND ucc.property_is_outgoing = false
        JOIN information.entity e on r.fk_temporal_entity = e.pk_entity AND e.table_name = 'temporal_entity'
      )
      UNION
      (
        SELECT  r.fk_temporal_entity as pk_entity, r.fk_entity as fk_entity_label, r.fk_project,
          ROW_NUMBER () OVER (
          PARTITION BY r.fk_temporal_entity, coalesce(r.fk_project, 0)
          ORDER BY
          r.rank_for_te_ent
          ) as rank
        FROM warehouse.v_roles_per_project_and_repo r
        JOIN commons.ui_context_config ucc ON ucc.fk_property = r.fk_property AND ucc.ord_num = 0 AND ucc.property_is_outgoing = true
        JOIN information.entity e on r.fk_entity = e.pk_entity AND e.table_name = 'persistent_item'
      )
    ) AS a 
    ON a.pk_entity = entities.pk_entity AND a.fk_project IS NOT DISTINCT FROM entities.fk_project
    WHERE rank = 1
  );



  ------------------------------------------------------------------------------------------------------------
  -- VEIW  v_entity_association_per_project_and_repo                                                          #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_entity_association_per_project_and_repo AS (
    -- select all entity_association per project
    SELECT DISTINCT ea.pk_entity, ea.fk_range_entity, ea.fk_domain_entity, ea.fk_property, epr.fk_project, epr.ord_num rank_for_domain,  epr.ord_num rank_for_range, coalesce(epr.fk_project,0) project
    FROM information.v_entity_association ea
    LEFT JOIN information.entity_version_project_rel as epr
      on epr.fk_entity = ea.pk_entity 
      and epr.is_in_project = true
    
    UNION
    -- select all entity_association per repo
    SELECT DISTINCT ea.pk_entity, ea.fk_range_entity, ea.fk_domain_entity,  ea.fk_property, NULL::INT, rank_for_domain, rank_for_range, 0
    FROM information.v_entity_association ea
    WHERE ea.is_in_project_count > 0
  );


  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_fk_type                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_fk_type AS ( 
    WITH entities AS (
      SELECT * FROM warehouse.v_entities 
     )
      SELECT DISTINCT ea.fk_domain_entity pk_entity, ea.fk_project, ea.project, ea.fk_range_entity fk_type 
      FROM warehouse.v_entity_association_per_project_and_repo ea
      JOIN information.entity_version_project_rel epr ON ea.pk_entity = epr.fk_entity
      JOIN data_for_history.property p ON ea.fk_property = p.dfh_pk_property
      WHERE p.dfh_pk_property = ANY (ARRAY[1110, 1190, 1205, 1206, 1214, 1204, 1066])
      AND ea.rank_for_domain = 1
   );


  ------------------------------------------------------------------------------------------------------------
  -- VEIW  v_related_full_texts                                                          # 
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_related_full_texts AS ( 
    WITH entities AS (
      SELECT * FROM warehouse.v_entities 
     ),
     all_dependencies AS (
      SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text--, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
     -- LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.fk_project IS NULL
      UNION
      SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text--, pre.own_full_text
      FROM warehouse.v_roles_per_project_and_repo r
      JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
     -- LEFT JOIN warehouse.entity_preview pre ON pre.pk_entity = e.pk_entity AND pre.fk_project IS NULL
    ), 
    agg AS(
      select pk_entity, project, fk_project, jsonb_object_agg(all_dependencies.pk_related_full_text::text, ''
        -- all_dependencies.own_full_text
        ) related_full_texts
      FROM all_dependencies
      group by pk_entity, project, fk_project
    )
    select pk_entity, project, fk_project, related_full_texts
    FROM agg
   );


  ------------------------------------------------------------------------------------------------------------
  -- VEIW v_entity_preview_non_recursive                                                           #
  ------------------------------------------------------------------------------------------------------------
  CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS ( 
      WITH entities AS (
        SELECT * FROM warehouse.v_entities 
      ),
      add_class_label AS (
        SELECT entities.*, c.class_label
        FROM entities
        JOIN warehouse.class_preview c 
        ON c.dfh_pk_class = entities.fk_class
      ),
      add_own_entity_label AS (
      -- this only adds an entity label if the label is the entities own label (non recirsive)
        SELECT a.*, l.entity_label
        FROM add_class_label a
        LEFT JOIN warehouse.v_own_entity_label l
        ON a.pk_entity = l.pk_entity 
        AND a.project = l.project
      ),
      add_time_span AS (
        SELECT a.*, t.time_span
        FROM add_own_entity_label a	
        LEFT JOIN information.v_te_en_time_span_per_project_and_repo t
        ON a.pk_entity = t.fk_temporal_entity 
        AND a.fk_project IS NOT DISTINCT FROM t.fk_project
      ),
      add_own_full_text AS (
        SELECT a.*, t.own_full_text
        FROM add_time_span a	
        LEFT JOIN warehouse.v_own_full_text t
        ON a.pk_entity = t.pk_entity 
        AND a.project = t.project
      ),
      add_fk_entity_label AS (
        SELECT a.*, t.fk_entity_label
        FROM add_own_full_text a	
        LEFT JOIN warehouse.v_fk_entity_label t
        ON a.pk_entity = t.pk_entity 
        AND a.fk_project IS NOT DISTINCT FROM t.fk_project
      ),
      add_fk_type AS (
        SELECT a.*, t.fk_type
        FROM add_fk_entity_label a	
        LEFT JOIN warehouse.v_fk_type t
        ON a.pk_entity = t.pk_entity 
        AND a.project = t.project
      )
      SELECT *
      FROM add_fk_type
    );
    
  

    ------------------------------------------------------------------------------------------------------------
    -- VEIW v_entity_preview                                                                  #
    ------------------------------------------------------------------------------------------------------------
    CREATE OR REPLACE VIEW warehouse.v_entity_preview AS (
      WITH previews_non_recursive AS (
        SELECT * FROM warehouse.v_entity_preview_non_recursive
      ),
      fill_entity_label AS (
        SELECT 
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.fk_class,
        CASE WHEN (t1.table_name = 'persistent_item') THEN 'peIt' WHEN (t1.table_name = 'temporal_entity') THEN 'teEn' END as entity_type,
        t1.class_label,
        coalesce(t1.entity_label,t2.entity_label) entity_label,
        t1.time_span,
        t1.own_full_text,
        t1.fk_entity_label,
        t1.fk_type
        FROM previews_non_recursive t1
        LEFT JOIN previews_non_recursive t2
        ON t1.fk_entity_label = t2.pk_entity
        AND t1.project = t2.project
      ),
      fill_type_label AS (
        SELECT 
        t1.*,
        t2.entity_label type_label
        FROM fill_entity_label t1
        LEFT JOIN fill_entity_label t2
        ON t1.fk_type = t2.pk_entity
        AND t1.project = t2.project
      ),
    full_text_dependencies AS (
        SELECT r.fk_temporal_entity as pk_entity, r.project, r.fk_project, e.pk_entity as pk_related_full_text, pre.own_full_text
        FROM warehouse.v_roles_per_project_and_repo r
        JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name = 'persistent_item'
        LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
        UNION
        SELECT r.fk_entity as pk_entity, r.project,  r.fk_project,  e.pk_entity as pk_related_full_text, pre.own_full_text
        FROM warehouse.v_roles_per_project_and_repo r
        JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name = 'temporal_entity'
        LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
      ), 
      aggregated_related_full_texts AS(
        select pk_entity, project, fk_project, jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) related_full_texts
        FROM full_text_dependencies
        group by pk_entity, project, fk_project
      ),
      related_full_text AS (
      SELECT t1.*, t2.related_full_texts
      FROM fill_type_label t1
      LEFT JOIN aggregated_related_full_texts t2
       ON t1.pk_entity = t2.pk_entity
         AND t1.project = t2.project
      ),
      add_full_text AS (
        SELECT 
          *, 
          (
            SELECT array_to_string(ARRAY[
              --coalesce(f.type_label, f.class_label, ''),
              f.own_full_text,
              array_to_string(array_agg(value), ', ')
            ]::text[] , ', ')
            FROM jsonb_each_text(f.related_full_texts)	
          ) as full_text	 
        FROM related_full_text  f   
      ),
      add_ts_vector AS (
        SELECT 
          t.*,
          setweight(to_tsvector(coalesce(t.entity_label, '')), 'A') || 
          setweight(to_tsvector(coalesce(t.type_label, t.class_label, '')), 'B') || 
          setweight(to_tsvector(coalesce(t.full_text,'')), 'C') as ts_vector
        FROM add_full_text t
      )
      SELECT * FROM add_ts_vector
    );
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
  

  DROP VIEW IF EXISTS warehouse.v_entity_preview;
  DROP VIEW IF EXISTS warehouse.v_entity_preview_non_recursive;
  DROP VIEW IF EXISTS warehouse.v_fk_type;
  DROP VIEW IF EXISTS warehouse.v_entity_association_per_project_and_repo;
  DROP VIEW IF EXISTS warehouse.v_related_full_texts;
  DROP VIEW IF EXISTS warehouse.v_fk_entity_label;
  DROP VIEW IF EXISTS warehouse.v_own_full_text;
  DROP VIEW IF EXISTS warehouse.v_own_entity_label;
  DROP VIEW IF EXISTS warehouse.v_entities;
  DROP VIEW IF EXISTS warehouse.v_roles_per_project_and_repo;
  DROP VIEW IF EXISTS warehouse.v_text_properties_per_project_and_repo;

  `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
