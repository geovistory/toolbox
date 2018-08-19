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
    CREATE OR REPLACE VIEW information.v_role_version AS
    
    WITH versions AS (
      SELECT role.pk_entity,
        true AS is_latest_version,
        role.entity_version,
        role.pk_role,
        role.fk_property,
        role.fk_entity,
        role.fk_temporal_entity,
        role.notes,
        role.fk_creator,
        role.fk_last_modifier,
        role.tmsp_creation,
        role.tmsp_last_modification,
        role.sys_period
        FROM information.role
    UNION
      SELECT role_vt.pk_entity,
        false AS is_latest_version,
        role_vt.entity_version,
        role_vt.pk_role,
        role_vt.fk_property,
        role_vt.fk_entity,
        role_vt.fk_temporal_entity,
        role_vt.notes,
        role_vt.fk_creator,
        role_vt.fk_last_modifier,
        role_vt.tmsp_creation,
        role_vt.tmsp_last_modification,
        role_vt.sys_period
        FROM information.role_vt
    )
    , statistics AS (
      SELECT DISTINCT versions_1.pk_entity,
        versions_1.pk_role,
        versions_1.fk_property,
        versions_1.fk_entity,
        versions_1.fk_temporal_entity,
        array_agg(epr.fk_project) AS projects,
  mode() WITHIN GROUP (ORDER BY epr.calendar) AS community_favorite_calendar ,
        count(epr.is_in_project) AS is_in_project_count,
        count(*) FILTER (where epr.is_standard_in_project = true) AS is_standard_in_project_count,
        versions_1.is_latest_version,
        epr.fk_entity_version_concat
        FROM versions versions_1
          LEFT JOIN ( SELECT entity_version_project_rel.fk_entity_version_concat,
                entity_version_project_rel.fk_project,
                entity_version_project_rel.is_in_project,
                entity_version_project_rel.is_standard_in_project, 
                entity_version_project_rel.calendar  -- <- new line
                FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((versions_1.pk_entity || '_'::text) || versions_1.entity_version)
            WHERE epr.is_in_project = true
      GROUP BY versions_1.pk_entity, versions_1.pk_role, versions_1.is_latest_version, versions_1.fk_property, versions_1.fk_entity, versions_1.fk_temporal_entity, epr.fk_entity_version_concat
      ORDER BY versions_1.pk_entity, epr.fk_entity_version_concat
  ),
    favorites AS (
      SELECT DISTINCT ON (statistics.pk_entity) statistics.pk_entity,
        statistics.is_in_project_count,
        statistics.is_standard_in_project_count,
        statistics.fk_entity_version_concat,
        statistics.projects,
        statistics.community_favorite_calendar
        FROM statistics
      WHERE statistics.is_in_project_count > 0
      ORDER BY statistics.pk_entity, statistics.is_in_project_count DESC, statistics.fk_entity_version_concat DESC
    )
  SELECT versions.pk_entity,
  versions.entity_version,
  concat((versions.pk_entity || '_'::text) || versions.entity_version) AS pk_entity_version_concat,
  favorites.projects,
  versions.fk_property,
  versions.fk_entity,
  versions.fk_temporal_entity,
  versions.notes,
  versions.fk_creator,
  versions.fk_last_modifier,
  versions.tmsp_creation,
  versions.tmsp_last_modification,
  versions.sys_period,
  versions.is_latest_version,
  ( SELECT favorites.is_in_project_count IS NOT NULL) AS is_community_favorite,
  COALESCE(favorites.is_in_project_count,0) AS is_in_project_count,
  COALESCE(favorites.is_standard_in_project_count,0) AS is_standard_in_project_count,
  favorites.community_favorite_calendar
  FROM versions
  LEFT JOIN favorites ON favorites.fk_entity_version_concat = concat((versions.pk_entity || '_'::text) || versions.entity_version)
  ORDER BY versions.pk_entity, versions.tmsp_last_modification DESC;
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `

  `

  db.runSql(sql, callback)

};


exports._meta = {
  "version": 1
};
