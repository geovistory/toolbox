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
  
  -- add view v_role
  CREATE OR REPLACE VIEW information.v_role AS
  WITH role_project_count AS (
    SELECT 
        r.pk_entity,
        r.fk_property,
        r.fk_entity,
        r.fk_temporal_entity,     
        COALESCE(count(*) FILTER (where epr.is_in_project = true),0) AS is_in_project_count,
        COALESCE(count(*) FILTER (where epr.ord_num = 0), 0) AS is_standard_in_project_count,
        mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar,
        r.notes,
        r.tmsp_creation,
        r.tmsp_last_modification,
        r.sys_period
      FROM information.role as r
      LEFT JOIN information.entity_version_project_rel as epr on epr.fk_entity = r.pk_entity
      GROUP BY 
        r.pk_entity,
        r.fk_property,
        r.fk_entity,
        r.fk_temporal_entity,
        r.notes,
        r.tmsp_creation,
        r.tmsp_last_modification,
        r.sys_period
    )
    SELECT 
        r.*,	
        
        --make a ranking for each property and te_ent
        ROW_NUMBER() OVER(PARTITION BY r.fk_temporal_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_te_ent,
        p.dfh_range_instances_max_quantifier as range_max_quantifier,
      
        --make a ranking for each property and pe_it
        ROW_NUMBER() OVER(PARTITION BY r.fk_entity, r.fk_property ORDER BY r.is_in_project_count DESC, r.tmsp_creation DESC) AS rank_for_pe_it,
        p.dfh_domain_instances_max_quantifier as domain_max_quantifier
    from role_project_count as r
    inner join data_for_history.property as p
    on r.fk_property = p.dfh_pk_property;


    COMMENT ON VIEW information.v_role IS 'If rank_for_te_ent is bigger than range_max_quantifier, the role can be considered a repo-wide alternative from the perspective of the temporal entits.
      
    If rank_for_pe_it is bigger than domain_max_quantifier, the role can be considered a repo-wide alternative from the perspective of the persistent item.'
  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
   -- drop view v_role
    DROP VIEW IF EXISTS information.v_role;
 
  -- revert previous view v_role
  CREATE OR REPLACE VIEW information.v_role AS
  SELECT 
    r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,     
    COALESCE(count(*) FILTER (where epr.is_in_project = true),0) AS is_in_project_count,
    COALESCE(count(*) FILTER (where epr.ord_num = 0), 0) AS is_standard_in_project_count,
    mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period
  FROM information.role as r
  LEFT JOIN information.entity_version_project_rel as epr on epr.fk_entity = r.pk_entity
  GROUP BY 
    r.pk_entity,
    r.fk_property,
    r.fk_entity,
    r.fk_temporal_entity,
    r.notes,
    r.tmsp_creation,
    r.tmsp_last_modification,
    r.sys_period;


  -- add trigger on insert to execute v_role_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_role
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_role_find_or_create();


  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
