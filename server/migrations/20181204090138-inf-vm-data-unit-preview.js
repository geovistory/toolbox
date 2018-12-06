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
    -- VIEW that gets a class preview (with label)
------------------------------------------------------------------------------------------------------------

    CREATE OR REPLACE VIEW information.v_class_preview AS
    SELECT DISTINCT ON (dfh_pk_class)
            CASE
                WHEN l.dfh_label IS NOT NULL THEN l.dfh_label::character varying
                ELSE cpv.dfh_class_standard_label
            END AS class_label,
            CASE
                WHEN cpv.dfh_fk_system_type = 9 THEN 'teEn'::text
                WHEN cpv.dfh_fk_system_type = 8 THEN 'peIt'::text
                ELSE NULL::text
            END AS entity_type,
        c.dfh_pk_class
      FROM data_for_history.class c
        JOIN data_for_history.class_profile_view cpv ON c.dfh_pk_class = cpv.dfh_fk_class
        LEFT JOIN data_for_history.label l ON l.dfh_fk_class = c.dfh_pk_class AND l.com_fk_system_type = 184
      ORDER BY dfh_pk_class, l.dfh_label; -- This will prefer custom labels over dfh_class_standard_label in distinct clause


------------------------------------------------------------------------------------------------------------
-- VIEW that gets ordered fields per class (useful to join data related to class instances in right order)
------------------------------------------------------------------------------------------------------------

      CREATE OR REPLACE VIEW information.v_ordered_fields_per_class AS
      SELECT c.pk_entity,
         c.ord_num AS field_order,
             CASE
                 WHEN c.property_is_outgoing = true THEN p.dfh_has_domain
                 WHEN c.property_is_outgoing = false THEN p.dfh_has_range
                 ELSE c.fk_class_for_class_field
             END AS fk_class,
         c.fk_property,
         c.property_is_outgoing,
         c.fk_class_field,
         f.used_table
        FROM commons.ui_context_config c
          LEFT JOIN data_for_history.property p ON p.dfh_pk_property = c.fk_property
          LEFT JOIN commons.class_field f ON f.pk_entity = c.fk_class_field
       WHERE c.fk_ui_context = 45
       ORDER BY (
             CASE
                 WHEN c.property_is_outgoing = true THEN p.dfh_has_domain
                 WHEN c.property_is_outgoing = false THEN p.dfh_has_range
                 ELSE c.fk_class_for_class_field
             END), c.ord_num;
     


------------------------------------------------------------------------------------------------------------
    -- VIEW that gets all the labels/strings per teEn in the repo version
    -- Attention: This view gets replaced further below, for some "recursive" join
------------------------------------------------------------------------------------------------------------

    CREATE OR REPLACE VIEW information.v_te_en_strings_per_field_repo AS 
      SELECT 
      teen.pk_entity,
      teen.fk_class,
      teen_field.fk_property,
      teen_field.field_order,
      r.fk_entity,
      r.rank_for_te_ent as rank,
      CASE 
        WHEN field_order=0 THEN COALESCE(appe.string, lang.notes) 
        ELSE null
      END	 as string_0,
      CASE 
        WHEN field_order=1 THEN COALESCE(appe.string, lang.notes) 
        ELSE null
      END as string_1,
      COALESCE(appe.string, lang.notes) as all_strings

      -- teen
      from information.v_temporal_entity as teen

      -- field
      INNER JOIN information.v_ordered_fields_per_class teen_field on teen_field.fk_class = teen.fk_class

      -- role
      LEFT JOIN information.v_role as r
        on teen_field.fk_property = r.fk_property
        and teen.pk_entity = r.fk_temporal_entity
    
      -----------------------------------------------------------
      -- get the strings of all tables connected to teen via role-fk_entity

      --   appellation
      LEFT JOIN information.v_appellation as appe
        ON r.fk_entity = appe.pk_entity
      --   language
      LEFT JOIN information.v_language as lang
        ON r.fk_entity = lang.pk_entity
      --   time_primitive
      --   place
      --   persistent_item
      --   temporal_entity
      -----------------------------------------------------------


      -----------------------------------------------------------
      -- get the tables connected directly to teen
      --   text_property
      -----------------------------------------------------------
      WHERE (	r.range_max_quantifier = -1 OR r.rank_for_te_ent <=	r.range_max_quantifier )
      AND r.is_in_project_count > 0
      ORDER BY field_order, rank_for_te_ent;
      
      
      
------------------------------------------------------------------------------------------------------------
      -- VIEW that gets all the labels/strings per teEn and project
      -- Attention: This view gets replaced further below, for some "recursive" join
------------------------------------------------------------------------------------------------------------

      CREATE VIEW information.v_te_en_strings_per_field_and_project AS 
      SELECT 
      epr.fk_project,
      teen.pk_entity,
      teen.fk_class,
      teen_field.fk_property,
      teen_field.field_order,
      r.fk_entity,
      epr2.ord_num,
      CASE 
        WHEN field_order=0 THEN COALESCE(appe.string, lang.notes) 
        ELSE null
      END	 as string_0,
      CASE 
        WHEN field_order=1 THEN COALESCE(appe.string, lang.notes) 
        ELSE null
      END as string_1,
      COALESCE(appe.string, lang.notes) as all_strings

      -- teen
      from information.v_temporal_entity as teen
      INNER JOIN  information.entity_version_project_rel as epr on epr.fk_entity = teen.pk_entity AND epr.is_in_project = true

      -- field
      INNER JOIN information.v_ordered_fields_per_class teen_field on teen_field.fk_class = teen.fk_class

      -- role
      LEFT JOIN information.v_role as r
        on teen_field.fk_property = r.fk_property
        and teen.pk_entity = r.fk_temporal_entity
        LEFT JOIN information.entity_version_project_rel as epr2 
          on epr2.fk_entity = r.pk_entity 
          and epr2.fk_project = epr.fk_project
          and epr2.is_in_project = true

      -----------------------------------------------------------
      -- get the strings of all tables connected to teen via role-fk_entity

      --   appellation
      LEFT JOIN information.v_appellation as appe
        ON r.fk_entity = appe.pk_entity
      --   language
      LEFT JOIN information.v_language as lang
        ON r.fk_entity = lang.pk_entity
      --   time_primitive
      --   place
      --   persistent_item
      --   temporal_entity
      -----------------------------------------------------------


      -----------------------------------------------------------
      -- get the tables connected directly to teen
      --   text_property
      -----------------------------------------------------------
      ORDER BY field_order;

------------------------------------------------------------------------------------------------------------
      -- VIEW that creates time span objects per TeEn, project and repo version
------------------------------------------------------------------------------------------------------------
      CREATE OR REPLACE VIEW information.v_te_en_time_span_per_project_and_repo AS
      WITH role_with_time_primitive as (
        SELECT 
        r.fk_temporal_entity,
        r.fk_property,
        epr.fk_project,
        epr.calendar,
        tp.julian_day,
        tp.duration
        FROM  information.entity_version_project_rel as epr 
        INNER JOIN information.v_role as r on r.pk_entity = epr.fk_entity
        INNER JOIN information.v_time_primitive as tp on tp.pk_entity = r.fk_entity
        WHERE 
        epr.is_in_project = true
        
        UNION
        
        SELECT 
        r.fk_temporal_entity,
        r.fk_property,
        null::integer as fk_project,
        r.community_favorite_calendar,
        tp.julian_day,
        tp.duration
        FROM information.v_role as r
        INNER JOIN information.v_time_primitive as tp on tp.pk_entity = r.fk_entity
        AND r.rank_for_te_ent = 1
            )
      select
      fk_project,
      fk_temporal_entity,
      jsonb_object_agg(
        CASE 
      	WHEN fk_property=71 THEN 'p81'
        WHEN fk_property=72 THEN 'p82'
        WHEN fk_property=150 THEN 'p81a'
        WHEN fk_property=151 THEN 'p81b'
        WHEN fk_property=152 THEN 'p82a'
        WHEN fk_property=153 THEN 'p82b'
        ELSE fk_property::text
        END
        
      , json_build_object('julianDay', julian_day, 'duration', duration,  'calendar', calendar) ) as time_span
      FROM role_with_time_primitive
      GROUP BY fk_project, fk_temporal_entity;
        

------------------------------------------------------------------------------------------------------------
      -- VIEW that unions TeEn project and repo version and adds time span objects
------------------------------------------------------------------------------------------------------------
        
      CREATE OR REPLACE VIEW information.v_te_en_preview as
      WITH teen_with_label as ( 
        select 
        teen_strings.fk_project,
        teen_strings.pk_entity,
        teen_strings.fk_class,
        string_agg(string_0, ' ') as entity_label,
        string_agg(string_1, ' ') as entity_label_2,
        string_agg(all_strings, ', ' ORDER BY field_order) || '.' as full_text,
        teen_time_span.time_span
        from  information.v_te_en_strings_per_field_and_project as teen_strings
          LEFT JOIN information.v_te_en_time_span_per_project_and_repo as teen_time_span 
          ON teen_time_span.fk_project = teen_strings.fk_project AND teen_time_span.fk_temporal_entity = pk_entity 
        Group By teen_strings.fk_project, pk_entity, fk_class, teen_time_span.time_span
        UNION 
        select 
        null as fk_project,
        teen_strings.pk_entity,
        teen_strings.fk_class,
        string_agg(string_0, ' ') as entity_label,
        string_agg(string_1, ' ') as entity_label_2,
        string_agg(all_strings, ', ' ORDER BY field_order) || '.' as full_text,
        teen_time_span.time_span
        from  information.v_te_en_strings_per_field_repo as teen_strings
          LEFT JOIN information.v_te_en_time_span_per_project_and_repo as teen_time_span 
          ON teen_time_span.fk_project IS NULL AND teen_time_span.fk_temporal_entity = pk_entity 
        Group By pk_entity, fk_class, teen_time_span.time_span
      )
      SELECT DISTINCT
      teen_with_label.fk_project,
      pk_entity,
      fk_class,
      entity_label,
      full_text,
      time_span
      FROM teen_with_label;



------------------------------------------------------------------------------------------------------------
      -- VIEW that gets all the labels/strings per peIt in the repo version
------------------------------------------------------------------------------------------------------------
     
      CREATE OR REPLACE VIEW information.v_pe_it_strings_per_field_repo AS 
      WITH pi_role as (
        SELECT * 
        FROM information.v_role as r
        WHERE ( r.domain_max_quantifier = -1 OR	r.rank_for_pe_it <= r.domain_max_quantifier)
        AND r.is_in_project_count > 0 
      )
      SELECT DISTINCT
        peit.pk_entity,
        peit.fk_class,
        peit_field.fk_property,
        peit_field.field_order,
        r.fk_entity,
        r.fk_temporal_entity,
        ROW_NUMBER () OVER (
         PARTITION BY peit.pk_entity
         ORDER BY field_order, r.rank_for_pe_it 
         ) as rank,
        r.range_max_quantifier,
        CASE 
          WHEN field_order=0 THEN COALESCE(teen_preview.entity_label, txt_prop.string )-- add text_property here 
          ELSE null
        END	as entity_label,
        COALESCE(teen_preview.full_text) as all_strings
      
        -- peit
        from information.v_persistent_item as peit
      
        -- field
        INNER JOIN information.v_ordered_fields_per_class peit_field on peit_field.fk_class = peit.fk_class
      
        -- role
        LEFT JOIN pi_role as r
          on peit_field.fk_property = r.fk_property
          and peit.pk_entity = r.fk_entity
      
        -----------------------------------------------------------
        -- get the strings of the teen connected to peit via role
        
        --   temporal_entity
        LEFT JOIN information.v_te_en_preview as teen_preview
          ON r.fk_temporal_entity = teen_preview.pk_entity
          AND teen_preview.fk_project IS NULL
        -----------------------------------------------------------
      
      
        -----------------------------------------------------------
        -- get the tables connected directly to peit
        --   text_property
        -----------------------------------------------------------
        LEFT JOIN  
         information.v_text_property txt_prop ON txt_prop.fk_concerned_entity = peit.pk_entity 
         
        ORDER BY pk_entity, field_order;


------------------------------------------------------------------------------------------------------------
        -- VIEW that gets all the labels/strings per PeIt and project
------------------------------------------------------------------------------------------------------------
         
        CREATE OR REPLACE VIEW information.v_pe_it_strings_per_field_and_project AS
        SELECT DISTINCT epr.fk_project,
            peit.pk_entity,
            peit.fk_class,
            peit_field.fk_property,
            peit_field.field_order,
            r.fk_entity,
            r.fk_temporal_entity,
            epr2.ord_num,
          ROW_NUMBER () OVER (
          PARTITION BY peit.pk_entity, epr.fk_project
          ORDER BY field_order, epr2.ord_num
          ) as rank,
          CASE
            WHEN peit_field.field_order = 0 THEN COALESCE(teen_preview.entity_label, txt_prop.string)
            ELSE NULL::text
          END AS entity_label,
            COALESCE(teen_preview.full_text, txt_prop.string) AS all_strings
          -- peit
            FROM information.v_persistent_item peit
            JOIN information.entity_version_project_rel epr ON epr.fk_entity = peit.pk_entity
          
          -- field
            JOIN information.v_ordered_fields_per_class peit_field ON peit_field.fk_class = peit.fk_class
          -- role
            LEFT JOIN information.v_role r ON peit_field.fk_property = r.fk_property AND peit.pk_entity = r.fk_entity
            LEFT JOIN information.entity_version_project_rel epr2 ON epr2.fk_entity = r.pk_entity AND epr2.fk_project = epr.fk_project
          
          -----------------------------------------------------------
          -- get the strings of the teen connected to peit via role
          --   temporal_entity
            LEFT JOIN information.v_te_en_preview teen_preview ON r.fk_temporal_entity = teen_preview.pk_entity AND teen_preview.fk_project = epr.fk_project
          -----------------------------------------------------------


          -----------------------------------------------------------
          -- get the tables connected directly to peit
          --   text_property
          LEFT JOIN (
            SELECT * FROM information.v_text_property  as t
            LEFT JOIN information.entity_version_project_rel epr3 ON epr3.fk_entity = t.pk_entity 
          ) as txt_prop 
          ON txt_prop.fk_concerned_entity = peit.pk_entity 
          AND txt_prop.fk_project = epr.fk_project
          AND txt_prop.fk_class_field = peit_field.fk_class_field
          -----------------------------------------------------------
          ORDER BY fk_project, field_order, ord_num;



  ------------------------------------------------------------------------------------------------------------
          -- VIEW that unions PeIt project and repo version
  ------------------------------------------------------------------------------------------------------------
    
          CREATE OR REPLACE VIEW information.v_pe_it_preview as
          WITH peit_with_label as ( 
            SELECT
            fk_project,
            pk_entity,
            fk_class,
            array_to_string((array_agg(entity_label order by rank))[1:1], '; ') as entity_label,
            string_agg(all_strings, ' ') as full_text
            from information.v_pe_it_strings_per_field_and_project as strings
            WHERE (entity_label is not null OR strings.all_strings is not null)
            Group By fk_project, pk_entity, fk_class
            
            UNION
            
            SELECT
            null::integer as fk_project,
            pk_entity,
            fk_class,
            array_to_string((array_agg(entity_label order by rank))[1:1], '; ') as entity_label,
            string_agg(all_strings, ' ') as full_text
            from information.v_pe_it_strings_per_field_repo as strings
            WHERE (entity_label is not null OR strings.all_strings is not null)
            Group By fk_project, pk_entity, fk_class
          )
          SELECT DISTINCT
          peit_with_label.fk_project,
          pk_entity,
          fk_class,
          entity_label,
          full_text
          FROM peit_with_label
          ORDER BY fk_project;




  ------------------------------------------------------------------------------------------------------------
          -- MATERIALIZED VIEW for data_unit preview
  ------------------------------------------------------------------------------------------------------------

          CREATE MATERIALIZED VIEW information.vm_data_unit_preview as
          WITH type_info_per_project AS (
                  select distinct ea.fk_domain_entity, type_preview.fk_project, type_preview.entity_label as type_label, type_preview.pk_entity as pk_type
                  from information.entity_association as ea
                  inner join information.entity_version_project_rel as epr on ea.pk_entity = epr.fk_entity AND epr.is_in_project = true
                  inner join data_for_history.property as p on ea.fk_property = p.dfh_pk_property
              inner join information.v_pe_it_preview as type_preview on ea.fk_range_entity = type_preview.pk_entity and epr.fk_project = type_preview.fk_project
                  where p.dfh_pk_property IN (1110,1190,1205,1206,1214,1204,1066)
          ),
          type_info_per_repo AS (
                  select distinct ea.fk_domain_entity, type_preview.entity_label as type_label, ea.rank_for_domain, type_preview.pk_entity as pk_type
                  from information.v_entity_association as ea
                  inner join data_for_history.property as p on ea.fk_property = p.dfh_pk_property
              inner join information.v_pe_it_preview as type_preview on ea.fk_range_entity = type_preview.pk_entity
                  where p.dfh_pk_property IN (1110,1190,1205,1206,1214,1204,1066) AND   ea.rank_for_domain = 1
          ),
          data_unit as (
            select 
            fk_project,
            pk_entity,
            fk_class,
            entity_label,
            full_text,
            null::jsonb as time_span
            from information.v_pe_it_preview 
            UNION
            select
            fk_project,
            pk_entity,
            fk_class,
            entity_label,
            full_text,
            time_span
            from information.v_te_en_preview 
          )
          select 
            data_unit.fk_project,
            data_unit.pk_entity,
            data_unit.fk_class,
            data_unit.entity_label,
            class_info.class_label,
            class_info.entity_type,
            COALESCE(type_info_per_project.type_label, type_info_per_repo.type_label) as type_label,
            COALESCE(type_info_per_project.pk_type, type_info_per_repo.pk_type) as pk_type,
            data_unit.full_text as full_text,
            setweight(to_tsvector(coalesce(data_unit.entity_label,'')), 'A') || 
            setweight(to_tsvector(coalesce(type_info_per_project.type_label, type_info_per_repo.type_label, class_info.class_label, '')), 'B') || 
            setweight(to_tsvector(coalesce(data_unit.full_text,'')), 'C')     
                   as ts_vector,
            time_span
          from data_unit
          LEFT JOIN type_info_per_project 
            on type_info_per_project.fk_domain_entity = data_unit.pk_entity 
            and data_unit.fk_project = type_info_per_project.fk_project
          LEFT JOIN type_info_per_repo
            on type_info_per_repo.fk_domain_entity = data_unit.pk_entity 
            and data_unit.fk_project is null

          INNER JOIN information.v_class_preview as class_info on class_info.dfh_pk_class = data_unit.fk_class;

          CREATE UNIQUE INDEX vm_data_unit_preview_unique
            ON information.vm_data_unit_preview (pk_entity, fk_project);


  ------------------------------------------------------------------------------------------------------------
          -- REPLACE VIEW from above, that gets all the labels/strings per teEn and project
          -- now with a join to the materialized view in order to add peIt labels to the teEn
  ------------------------------------------------------------------------------------------------------------

          CREATE OR REPLACE VIEW information.v_te_en_strings_per_field_and_project AS 
          SELECT 
          epr.fk_project,
          teen.pk_entity,
          teen.fk_class,
          teen_field.fk_property,
          teen_field.field_order,
          r.fk_entity,
          epr2.ord_num,
          CASE 
            WHEN field_order=0 THEN COALESCE(appe.string, lang.notes, peit.entity_label) 
            ELSE null
          END	 as string_0,
          CASE 
            WHEN field_order=1 THEN COALESCE(appe.string, lang.notes, peit.entity_label) 
            ELSE null
          END as string_1,
          COALESCE(appe.string, lang.notes, peit.entity_label) as all_strings
    
          -- teen
          from information.v_temporal_entity as teen
          INNER JOIN  information.entity_version_project_rel as epr on epr.fk_entity = teen.pk_entity AND epr.is_in_project = true
    
          -- field
          INNER JOIN information.v_ordered_fields_per_class teen_field on teen_field.fk_class = teen.fk_class
    
          -- role
          LEFT JOIN information.v_role as r
            on teen_field.fk_property = r.fk_property
            and teen.pk_entity = r.fk_temporal_entity
            LEFT JOIN information.entity_version_project_rel as epr2 
              on epr2.fk_entity = r.pk_entity 
              and epr2.fk_project = epr.fk_project
              and epr2.is_in_project = true
    
          -----------------------------------------------------------
          -- get the strings of all tables connected to teen via role-fk_entity
    
          --   appellation
          LEFT JOIN information.v_appellation as appe
            ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
            ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          --   persistent_item
          LEFT JOIN information.vm_data_unit_preview as peit
            ON r.fk_entity = peit.pk_entity AND peit.fk_project = epr.fk_project
          --   temporal_entity
          -----------------------------------------------------------
    
    
          -----------------------------------------------------------
          -- get the tables connected directly to teen
          --   text_property
          -----------------------------------------------------------
          ORDER BY field_order;





  ------------------------------------------------------------------------------------------------------------
          -- REPLACE VIEW from above, that gets all the labels/strings of repo
          -- now with a join to the materialized view in order to add peIt labels to the teEn
  ------------------------------------------------------------------------------------------------------------


          CREATE OR REPLACE VIEW information.v_te_en_strings_per_field_repo AS 
          SELECT 
          teen.pk_entity,
          teen.fk_class,
          teen_field.fk_property,
          teen_field.field_order,
          r.fk_entity,
          r.rank_for_te_ent as rank,
          CASE 
            WHEN field_order=0 THEN COALESCE(appe.string, lang.notes, peit.entity_label) 
            ELSE null
          END	 as string_0,
          CASE 
            WHEN field_order=1 THEN COALESCE(appe.string, lang.notes, peit.entity_label) 
            ELSE null
          END as string_1,
          COALESCE(appe.string, lang.notes, peit.entity_label) as all_strings
    
          -- teen
          from information.v_temporal_entity as teen
    
          -- field
          INNER JOIN information.v_ordered_fields_per_class teen_field on teen_field.fk_class = teen.fk_class
    
          -- role
          LEFT JOIN information.v_role as r
            on teen_field.fk_property = r.fk_property
            and teen.pk_entity = r.fk_temporal_entity
        
          -----------------------------------------------------------
          -- get the strings of all tables connected to teen via role-fk_entity
    
          --   appellation
          LEFT JOIN information.v_appellation as appe
            ON r.fk_entity = appe.pk_entity
          --   language
          LEFT JOIN information.v_language as lang
            ON r.fk_entity = lang.pk_entity
          --   time_primitive
          --   place
          --   persistent_item
        LEFT JOIN information.vm_data_unit_preview as peit
            ON r.fk_entity = peit.pk_entity AND peit.fk_project IS NULL
          --   temporal_entity
          -----------------------------------------------------------
    
    
          -----------------------------------------------------------
          -- get the tables connected directly to teen
          --   text_property
          -----------------------------------------------------------
          WHERE (	r.range_max_quantifier = -1 OR r.rank_for_te_ent <=	r.range_max_quantifier )
          AND r.is_in_project_count > 0
          ORDER BY field_order, rank_for_te_ent;


  ------------------------------------------------------------------------------------------------------------
          -- TABLE that stores the latest refresh date of information.vm_data_unit_preview 
  ------------------------------------------------------------------------------------------------------------
            CREATE TABLE commons.vm_refresh_date (
              information_vm_data_unit_preview timestamp with time zone
            );

  ------------------------------------------------------------------------------------------------------------
          -- FUNCTION that refreshes information.vm_data_unit_preview, if the latest modification of 
          -- information.entity_version_project_rel is newer than the latest refresh stored in commons.vm_refresh_date
  ------------------------------------------------------------------------------------------------------------
            CREATE OR REPLACE FUNCTION information.refresh_vm_data_unit_preview()
            RETURNS boolean
            LANGUAGE plpgsql
            AS $$
            DECLARE
              refresh_needed boolean;
              refreshed boolean;
            BEGIN
              
            select into refresh_needed (
                (
              select information_vm_data_unit_preview from commons.vm_refresh_date
              order by information_vm_data_unit_preview desc
              limit 1
                )
                <
                (
              select tmsp_last_modification from information.entity_version_project_rel
              order by tmsp_last_modification desc
              limit 1
                )
            );
            
          IF (refresh_needed = true OR refresh_needed IS NULL) THEN 
              REFRESH MATERIALIZED VIEW CONCURRENTLY information.vm_data_unit_preview;
            
              INSERT INTO commons.vm_refresh_date (information_vm_data_unit_preview)
              VALUES (now());
                  
              refreshed = true;
            ELSE 		  
                refreshed = false;
            END IF;
                  
            RETURN refreshed;
            END $$;



		  


  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
    DROP FUNCTION information.refresh_vm_data_unit_preview();

    DROP TABLE commons.vm_refresh_date;

    DROP MATERIALIZED VIEW IF EXISTS information.vm_data_unit_preview CASCADE;

    DROP VIEW IF EXISTS information.v_pe_it_preview CASCADE;

    DROP VIEW IF EXISTS information.v_te_en_preview CASCADE;

    DROP VIEW IF EXISTS information.v_pe_it_strings_per_field_and_project CASCADE;

    DROP VIEW IF EXISTS information.v_pe_it_strings_per_field_repo CASCADE;

    DROP VIEW IF EXISTS information.v_te_en_strings_per_field_and_project CASCADE;

    DROP VIEW IF EXISTS information.v_te_en_strings_per_field_repo CASCADE;

    DROP VIEW IF EXISTS information.v_ordered_fields_per_class CASCADE;

    DROP VIEW IF EXISTS information.v_class_preview;
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



