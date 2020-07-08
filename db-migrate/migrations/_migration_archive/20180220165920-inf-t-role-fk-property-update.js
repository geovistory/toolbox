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

  -- Drop view depending on role/fk_property

  DROP TRIGGER IF EXISTS on_insert ON information.v_role_version;
  DROP FUNCTION IF EXISTS information.v_role_version_insert();
  DROP VIEW IF EXISTS information.v_role_version;

  -- Change data type of column fk_property from varchar(7) to integer

  ALTER TABLE information.role
  ALTER COLUMN fk_property TYPE integer USING NULL;

  -- Add foreign key to data_for_history.property/dfh_pk_property

  ALTER TABLE information.role
  ADD CONSTRAINT role_fk_property_fkey
  FOREIGN KEY (fk_property)
  REFERENCES data_for_history.property (dfh_pk_property);

  -- versioning

  -- Change data type of column fk_property from varchar(7) to integer

  ALTER TABLE information.role_vt
  ALTER COLUMN fk_property TYPE integer USING NULL;


  -- create the view again

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

  ), statistics AS (
    SELECT DISTINCT
    versions_1.pk_entity,
    versions_1.pk_role,
    versions_1.fk_property,
    versions_1.fk_entity,
    versions_1.fk_temporal_entity,
    array_agg(epr.fk_project) AS projects,
    count(epr.is_in_project) AS is_in_project_count,
    count(epr.is_standard_in_project) AS is_standard_in_project_count,
    versions_1.is_latest_version,
    epr.fk_entity_version_concat
    FROM versions versions_1
    LEFT JOIN ( SELECT entity_version_project_rel.fk_entity_version_concat,
      entity_version_project_rel.fk_project,
      entity_version_project_rel.is_in_project,
      entity_version_project_rel.is_standard_in_project
      FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((versions_1.pk_entity || '_'::text) || versions_1.entity_version)
      GROUP BY
      versions_1.pk_entity,
      versions_1.pk_role,
      versions_1.is_latest_version,
      versions_1.fk_property,
      versions_1.fk_entity,
      versions_1.fk_temporal_entity,
      epr.fk_entity_version_concat
      ORDER BY versions_1.pk_entity, epr.fk_entity_version_concat
    )
    , favorites AS (
      SELECT DISTINCT ON (statistics.pk_entity) statistics.pk_entity,
      statistics.is_in_project_count,
      statistics.fk_entity_version_concat,
      statistics.projects
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
    ( SELECT favorites.is_in_project_count IS NOT NULL) AS is_community_favorite
    FROM versions
    LEFT JOIN favorites ON favorites.fk_entity_version_concat = concat((versions.pk_entity || '_'::text) || versions.entity_version)
    ORDER BY versions.pk_entity, versions.tmsp_last_modification DESC;



    -- create trigger function for insert

    CREATE FUNCTION information.v_role_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.role SET
    notes = NEW.notes,
    fk_property = NEW.fk_property,
    fk_entity = NEW.fk_entity,
    fk_temporal_entity = NEW.fk_temporal_entity
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.role (notes, fk_property, fk_entity, fk_temporal_entity)
    VALUES(NEW.notes, NEW.fk_property, NEW.fk_entity, NEW.fk_temporal_entity)
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    END IF;

    -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
    NEW.pk_entity_version_concat = result;

    RETURN NEW;
    END;

    $BODY$;


    -- create trigger on insert

    CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_role_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_role_version_insert();

    `

    db.runSql(sql, callback)

  };

  exports.down = function(db, callback) {

    const sql = `

    -- Drop forein key to data_for_history.property/dfh_pk_property

    ALTER TABLE information.role
    DROP CONSTRAINT role_fk_property_fkey;

    -- Drop view depending on role/fk_property

    DROP TRIGGER IF EXISTS on_insert ON information.v_role_version;
    DROP FUNCTION IF EXISTS information.v_role_version_insert();
    DROP VIEW IF EXISTS information.v_role_version;

    -- Change data type of column fk_property from integer to varchar(7)

    ALTER TABLE information.role
    ALTER COLUMN fk_property TYPE varchar(7) USING NULL;

    -- versioning

    -- Change data type of column fk_property from integer to varchar(7)

    ALTER TABLE information.role_vt
    ALTER COLUMN fk_property TYPE varchar(7) USING NULL;

    -- create the view again

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

    ), statistics AS (
      SELECT DISTINCT
      versions_1.pk_entity,
      versions_1.pk_role,
      versions_1.fk_property,
      versions_1.fk_entity,
      versions_1.fk_temporal_entity,
      array_agg(epr.fk_project) AS projects,
      count(epr.is_in_project) AS is_in_project_count,
      count(epr.is_standard_in_project) AS is_standard_in_project_count,
      versions_1.is_latest_version,
      epr.fk_entity_version_concat
      FROM versions versions_1
      LEFT JOIN ( SELECT entity_version_project_rel.fk_entity_version_concat,
        entity_version_project_rel.fk_project,
        entity_version_project_rel.is_in_project,
        entity_version_project_rel.is_standard_in_project
        FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((versions_1.pk_entity || '_'::text) || versions_1.entity_version)
        GROUP BY
        versions_1.pk_entity,
        versions_1.pk_role,
        versions_1.is_latest_version,
        versions_1.fk_property,
        versions_1.fk_entity,
        versions_1.fk_temporal_entity,
        epr.fk_entity_version_concat
        ORDER BY versions_1.pk_entity, epr.fk_entity_version_concat
      )
      , favorites AS (
        SELECT DISTINCT ON (statistics.pk_entity) statistics.pk_entity,
        statistics.is_in_project_count,
        statistics.fk_entity_version_concat,
        statistics.projects
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
      ( SELECT favorites.is_in_project_count IS NOT NULL) AS is_community_favorite
      FROM versions
      LEFT JOIN favorites ON favorites.fk_entity_version_concat = concat((versions.pk_entity || '_'::text) || versions.entity_version)
      ORDER BY versions.pk_entity, versions.tmsp_last_modification DESC;



      -- create trigger function for insert

      CREATE FUNCTION information.v_role_version_insert()
      RETURNS trigger
      LANGUAGE 'plpgsql'
      AS $BODY$
      DECLARE
      result text;
      BEGIN
      -- if there is a pk_entity, update the existing entity
      IF (NEW.pk_entity IS NOT NULL) THEN

      UPDATE information.role SET
      notes = NEW.notes,
      fk_property = NEW.fk_property,
      fk_entity = NEW.fk_entity,
      fk_temporal_entity = NEW.fk_temporal_entity
      WHERE pk_entity = NEW.pk_entity
      RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

      -- else if there is no pk_entity, insert a new entity
      ELSE

      INSERT INTO information.role (notes, fk_property, fk_entity, fk_temporal_entity)
      VALUES(NEW.notes, NEW.fk_property, NEW.fk_entity, NEW.fk_temporal_entity)
      RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

      END IF;

      -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
      NEW.pk_entity_version_concat = result;

      RETURN NEW;
      END;

      $BODY$;


      -- create trigger on insert

      CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_role_version
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_role_version_insert();
      `

      db.runSql(sql, callback)

    };

    exports._meta = {
      "version": 1
    };
