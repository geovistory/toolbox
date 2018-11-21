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
  CREATE OR REPLACE FUNCTION information.queryPeItLabel(
    param_pk_project integer,
    param_pk_entity integer,
    param_pk_ui_context integer,
    OUT pk_entity integer,
    OUT fk_project integer,
    OUT fk_class integer,
    OUT entity_label text,
    OUT class_label varchar,
    OUT entity_type text
    )
      RETURNS SETOF record
      LANGUAGE 'sql'
  
      COST 100
      VOLATILE 
  AS $BODY$
  
    WITH appe_string as (
      SELECT pk_entity, string
      from information.v_appellation
    ),
    text_property_string as (
      SELECT txt.pk_entity, txt.fk_concerned_entity, txt.string,  epr.fk_project, epr.ord_num as txt_order
      from information.v_text_property as txt
      INNER JOIN information.entity_version_project_rel as epr on txt.pk_entity = epr.fk_entity
      WHERE is_in_project = true AND fk_project = param_pk_project
      ORDER BY ord_num
    ),
    role as (
      SELECT r.pk_entity, r.fk_entity, r.fk_temporal_entity, r.fk_property, epr.fk_project, epr.ord_num as role_order
      from information.role as r
      INNER JOIN information.entity_version_project_rel as epr on r.pk_entity = epr.fk_entity
      WHERE is_in_project = true AND fk_project = param_pk_project
      ORDER BY ord_num
    ),
    persistent_item as (
      SELECT pk_entity, fk_class
      from information.v_persistent_item
      WHERE pk_entity = param_pk_entity
    ),
    ordered_fields_per_class AS (
      SELECT c.pk_entity, c.ord_num as field_order,
        CASE 
          WHEN c.property_is_outgoing=true THEN p.dfh_has_domain
          WHEN c.property_is_outgoing=false THEN p.dfh_has_range
          ELSE c.fk_class_for_class_field
        END as fk_class,
        c.fk_property,
        c.property_is_outgoing,
        c.fk_class_field,
        f.used_table
      FROM commons.ui_context_config as c
      LEFT JOIN data_for_history.property as p on p.dfh_pk_property = c.fk_property
      LEFT JOIN commons.class_field as f  on f.pk_entity = c.fk_class_field
      WHERE fk_ui_context = param_pk_ui_context
      ORDER BY fk_class, ord_num
    ),
    ordered_pe_it_fields AS (
      SELECT ordered_fields_per_class.*
      FROM ordered_fields_per_class
      INNER JOIN persistent_item as p on p.fk_class = ordered_fields_per_class.fk_class
      LIMIT 1
    ),
    ordered_pe_it_roles AS (
      select
        pe_it.fk_class,
        pe_it.pk_entity,
        pi_role.fk_project,
        pi_role.fk_entity, 
        pi_role.fk_temporal_entity,  
        pi_role.fk_property,
        field_order,
        pi_role.role_order
      from persistent_item as pe_it
      -- get the roles of the persistent item that are available in the ordered list of fields for the pe-it class
      INNER JOIN ordered_pe_it_fields as pi_fields on pi_fields.fk_class = pe_it.fk_class
      INNER JOIN role as pi_role on pi_role.fk_entity = pe_it.pk_entity AND pi_role.fk_property = pi_fields.fk_property
      ORDER BY role_order
    ),
    ordered_pe_it_text_properties AS (
      select
        pe_it.fk_class,
        pe_it.pk_entity,
        pi_txt.fk_project,
        pi_txt.pk_entity as txt_pk,
        field_order,
        pi_txt.txt_order,
        pi_txt.string
      from persistent_item as pe_it
      -- get the roles of the persistent item that are available in the ordered list of fields for the pe-it class
      INNER JOIN ordered_pe_it_fields as pi_fields on pi_fields.fk_class = pe_it.fk_class
      INNER JOIN text_property_string as pi_txt on pi_txt.fk_concerned_entity = pe_it.pk_entity AND pi_fields.used_table = 'information.text_property'
      ORDER BY txt_order
    ),
    temporal_entity as (
      SELECT teen.pk_entity, teen.fk_class
      from information.v_temporal_entity as teen
      INNER JOIN ordered_pe_it_roles as teen_r on teen_r.fk_temporal_entity = teen.pk_entity
    ),
    ordered_te_en_fields AS (
      SELECT ordered_fields_per_class.*
      FROM ordered_fields_per_class
      INNER JOIN temporal_entity as p on p.fk_class = ordered_fields_per_class.fk_class
      LIMIT 1
    ),
    ordered_te_ent_roles AS (
      select
        te_role.fk_project,
        te_role.fk_entity,  
        te_role.fk_temporal_entity,  
        te_role.fk_property,
        te_fields.field_order,
        te_role.role_order,
        string
      from temporal_entity as te_ent
  
      -- The following line is for performance tuning only
      INNER JOIN ordered_pe_it_roles o_peit_r on o_peit_r.fk_temporal_entity = te_ent.pk_entity
  
      -- get the roles of the temporal entities that are available in the ordered list of fields for the te-ent class
      INNER JOIN ordered_te_en_fields as te_fields on te_fields.fk_class = te_ent.fk_class
      INNER JOIN role as te_role on te_role.fk_property = te_fields.fk_property
  
      -----------------------------------------------------------
      -- get the strings of all related value-like tables
      INNER JOIN appe_string on appe_string.pk_entity = te_role.fk_entity
  
  
      -- add here string-selects for: 
      --   time_primitive
      --   place
      --   ...
  
      -----------------------------------------------------------
  
      ORDER BY field_order
  
    ), 
    string AS (
      SELECT
        o_peit_r.pk_entity,
        o_peit_r.fk_project,
        o_peit_r.fk_class,
        o_peit_r.field_order,
        o_peit_r.role_order as val_order,
        o_teen_r.string
      from ordered_pe_it_roles as o_peit_r
      LEFT JOIN ordered_te_ent_roles as o_teen_r
      ON o_teen_r.fk_temporal_entity = o_peit_r.fk_temporal_entity-- AND o_teen_r.string IS NOT NULL
      UNION
      SELECT	
        o_peit_txt.pk_entity,
        o_peit_txt.fk_project,
        o_peit_txt.fk_class,
        o_peit_txt.field_order,
        o_peit_txt.txt_order as val_order,
        o_peit_txt.string
      from ordered_pe_it_text_properties as o_peit_txt 
      --WHERE o_peit_txt.string IS NOT NULL
    ),
    class AS (
      SELECT 
        CASE 
          WHEN l.dfh_label IS NOT NULL THEN l.dfh_label
          ELSE cpv.dfh_class_standard_label
        END as class_label,
        CASE 
          WHEN cpv.dfh_fk_system_type = 9 THEN 'teEn'
          WHEN cpv.dfh_fk_system_type = 8 THEN 'peIt'
          ELSE NULL
        END as entity_type,
        c.dfh_pk_class
      from data_for_history.class as c
      inner join string as s on s.fk_class = c.dfh_pk_class
      inner join data_for_history.class_profile_view as cpv on c.dfh_pk_class = cpv.dfh_fk_class
      left join data_for_history.label as l on l.dfh_fk_class = c.dfh_pk_class
      LIMIT 1
    ),
    final_select as (
      select DISTINCT 
        s.pk_entity, 
        s.field_order, 
        s.val_order, 
        s.fk_project, 
        s.fk_class, 
        s.string,
        c.class_label,
        c.entity_type
      from string as s
      INNER JOIN class as c on c.dfh_pk_class = s.fk_class
      ORDER BY field_order, val_order
      LIMIT 1
    )
    select pk_entity, fk_project, fk_class, string as entity_label, class_label, entity_type from final_select;
    
  
  $BODY$;
  
  CREATE OR REPLACE FUNCTION information.queryPeItPreview(
    param_pk_project integer,
    param_pk_entity integer,
    param_pk_ui_context integer,
    OUT pk_entity integer,
    OUT fk_project integer,
    OUT fk_class integer,
    OUT entity_label text,
    OUT class_label varchar,
    OUT entity_type text,
    OUT type_label text
    )
      RETURNS SETOF record
      LANGUAGE 'sql'
  
      COST 100
      VOLATILE 
  AS $BODY$
  
      WITH pe_it_label AS (
        select *
        from information.queryPeItLabel(param_pk_project,param_pk_entity,param_pk_ui_context)
      ),
      associated_type AS (
        select ea.pk_entity, ea.fk_range_entity, ea.fk_domain_entity, ea.fk_property,
          (select entity_label from information.queryPeItLabel(param_pk_project, ea.fk_range_entity, param_pk_ui_context))
        from information.entity_association as ea
        inner join information.entity_version_project_rel as epr on ea.pk_entity = epr.fk_entity AND epr.is_in_project = true
        inner join data_for_history.property as p on ea.fk_property = p.dfh_pk_property
        where p.dfh_pk_property IN (1110,1190,1205,1206,1214,1204,1066)
        AND ea.fk_domain_entity = param_pk_entity
      )
      select pe_it_label.*, associated_type.entity_label as type_label
      from pe_it_label
      left join associated_type on associated_type.fk_domain_entity = pe_it_label.pk_entity
  
  $BODY$;
    
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
    DROP FUNCTION information.querypeitpreview(integer, integer, integer);
    DROP FUNCTION information.querypeitlabel(integer, integer, integer);
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



