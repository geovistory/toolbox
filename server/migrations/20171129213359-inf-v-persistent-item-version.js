'use strict';

var dbm;
var type;
var seed;

/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `

  -- create view

  CREATE OR REPLACE VIEW information.v_persistent_item_version AS
  -- union all versions
  WITH versions AS
  (
    SELECT persistent_item.pk_entity,
    lower(persistent_item.sys_period) AS tmsp,
    true AS is_latest_version,
    persistent_item.entity_version,
    persistent_item.pk_persistent_item,
    persistent_item.fk_class,
    persistent_item.notes
    FROM information.persistent_item
    UNION
    SELECT persistent_item_vt.pk_entity,
    lower(persistent_item_vt.sys_period) AS tmsp,
    false AS is_latest_version,
    persistent_item_vt.entity_version,
    persistent_item_vt.pk_persistent_item,
    persistent_item_vt.fk_class,
    persistent_item_vt.notes
    FROM information.persistent_item_vt
  ),
  -- count for each version is_in_project as is_in_project_count
  statistics AS
  (
    SELECT DISTINCT versions.pk_entity,
    versions.pk_persistent_item,
    versions.fk_class,
    array_agg(epr.fk_project) AS projects,
    count(epr.is_in_project) AS is_in_project_count,
    count(epr.is_standard_in_project) AS is_standard_in_project_count,
    versions.is_latest_version,
    epr.fk_entity_version_concat
    FROM versions
    LEFT JOIN ( SELECT
      fk_entity_version_concat,
      fk_project,
      is_in_project,
      is_standard_in_project
      FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat(versions.pk_entity || '_' || versions.entity_version)
      GROUP BY versions.pk_entity, versions.pk_persistent_item, versions.tmsp, versions.is_latest_version, versions.fk_class, epr.fk_entity_version_concat
      ORDER BY versions.pk_entity, epr.fk_entity_version_concat
    ),
    -- Get the favorite version of each entity. The favorite version is
    -- the version with the highest is_in_project_count, and if two or more
    -- versions have the same is_in_project_count, it takes the latest
    -- created version as favorite.
    favorites AS
    (
      SELECT DISTINCT ON (pk_entity) pk_entity, is_in_project_count, fk_entity_version_concat, projects
      FROM statistics
      WHERE is_in_project_count > 0
      ORDER BY pk_entity, is_in_project_count DESC, fk_entity_version_concat desc
    )
    -- Left outer join of all versions with the favorites and create flag is_commity_favorite
    SELECT
    versions.pk_entity,
    versions.entity_version,
    concat(versions.pk_entity || '_' || versions.entity_version) pk_entity_version,
    versions.tmsp as timestamp,
    versions.notes,
    favorites.projects,
    versions.fk_class,
    versions.is_latest_version,
    (SELECT favorites.is_in_project_count IS NOT NULL)::boolean as is_community_favorite
    FROM versions
    LEFT OUTER JOIN favorites
    ON favorites.fk_entity_version_concat = concat(versions.pk_entity || '_' || versions.entity_version)
    ORDER BY versions.pk_entity, versions.tmsp DESC;


    -- create trigger function for insert

    CREATE FUNCTION information.v_persistent_item_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    INSERT INTO information.persistent_item (fk_class,notes)
    VALUES(NEW.fk_class, NEW.notes);
    RETURN NEW;
    END;
    $BODY$;


    -- create trigger function for update

    CREATE FUNCTION information.v_persistent_item_version_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    BEGIN
    IF NEW.fk_class <> OLD.fk_class OR NEW.notes <> OLD.notes THEN
    UPDATE information.persistent_item
    SET fk_class = NEW.fk_class,
    notes = NEW.notes
    WHERE pk_entity = (
      SELECT pk_entity
      FROM v_persistent_item_version
      WHERE pk_entity_version = NEW.pk_entity_version
    ) OR pk_entity = NEW.pk_entity;
    END IF;
    RETURN NEW;
    END;
    $BODY$;


    -- create trigger on insert

    CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_persistent_item_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_persistent_item_version_insert();


    -- create trigger on update

    CREATE TRIGGER on_update
    INSTEAD OF UPDATE
    ON information.v_persistent_item_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_persistent_item_version_update();
    `
    db.runSql(sql, callback)

  };

  exports.down = function(db, callback) {
    const sql = `
    DROP TRIGGER IF EXISTS on_update ON information.v_persistent_item_version;
    DROP TRIGGER IF EXISTS on_insert ON information.v_persistent_item_version;
    DROP FUNCTION IF EXISTS information.v_persistent_item_version_update();
    DROP FUNCTION IF EXISTS information.v_persistent_item_version_insert();
    DROP VIEW IF EXISTS information.v_persistent_item_version;
    `
    db.runSql(sql, callback)
  };
  exports._meta = {
    "version": 1
  };
