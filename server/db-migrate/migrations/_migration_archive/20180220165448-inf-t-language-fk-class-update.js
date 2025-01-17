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

  -- Drop forein key to data_for_history.class/data_for_history_id

  ALTER TABLE information.language
  DROP CONSTRAINT language_fk_class_fkey;

  -- Drop view depending on language/fk_class

  DROP TRIGGER IF EXISTS on_insert ON information.v_language_version;
  DROP FUNCTION IF EXISTS information.v_language_version_insert();
  DROP VIEW IF EXISTS information.v_language_version;

  -- Change data type of column fk_class from varchar(7) to integer

  ALTER TABLE information.language
  ALTER COLUMN fk_class TYPE integer USING NULL;

  -- Add foreign key to data_for_history.class/dfh_pk_class

  ALTER TABLE information.language
  ADD CONSTRAINT language_fk_class_fkey
  FOREIGN KEY (fk_class)
  REFERENCES data_for_history.class (dfh_pk_class);

  -- versioning

  -- Change data type of column fk_class from varchar(7) to integer

  ALTER TABLE information.language_vt
  ALTER COLUMN fk_class TYPE integer USING NULL;

  -- Create the view again

  CREATE OR REPLACE VIEW information.v_language_version AS
  WITH versions AS (

    SELECT pk_entity,
    true AS is_latest_version,
    entity_version,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    notes,
    fk_creator,
    fk_last_modifier,
    tmsp_creation,
    tmsp_last_modification,
    sys_period
    FROM information.language
    UNION
    SELECT pk_entity,
    false AS is_latest_version,
    entity_version,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    notes,
    fk_creator,
    fk_last_modifier,
    tmsp_creation,
    tmsp_last_modification,
    sys_period
    FROM information.language_vt
  ), statistics AS (
    SELECT DISTINCT
    pk_entity,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    array_agg(epr.fk_project) AS projects,
    count(epr.is_in_project) AS is_in_project_count,
    count(epr.is_standard_in_project) AS is_standard_in_project_count,
    is_latest_version,
    epr.fk_entity_version_concat
    FROM versions versions_1
    LEFT JOIN (
      SELECT
      fk_entity_version_concat,
      fk_project,
      is_in_project,
      is_standard_in_project
      FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((pk_entity || '_'::text) || entity_version)
      GROUP BY
      pk_entity,
      is_latest_version,
      pk_language,
      fk_class,
      lang_type,
      scope,
      iso6392b,
      iso6392t,
      iso6391,
      epr.fk_entity_version_concat
      ORDER BY pk_entity, epr.fk_entity_version_concat
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
    versions.pk_language,
    versions.fk_class,
    versions.lang_type,
    versions.scope,
    versions.iso6392b,
    versions.iso6392t,
    versions.iso6391,
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

    CREATE FUNCTION information.v_language_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.language SET
    notes = NEW.notes,
    fk_class = NEW.fk_class,
    lang_type = NEW.lang_type,
    scope = NEW.scope,
    iso6392b = NEW.iso6392b,
    iso6392t = NEW.iso6392t,
    iso6391 = NEW.iso6391
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.language (
      pk_language,
      notes,
      fk_class,
      lang_type,
      scope,
      iso6392b,
      iso6392t,
      iso6391
    )
    VALUES(
      NEW.pk_language,
      NEW.notes,
      NEW.fk_class,
      NEW.lang_type,
      NEW.scope,
      NEW.iso6392b,
      NEW.iso6392t,
      NEW.iso6391
    )
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
    ON information.v_language_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_language_version_insert();
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `

  -- Drop forein key to data_for_history.class/dfh_pk_class

  ALTER TABLE information.language
  DROP CONSTRAINT language_fk_class_fkey;

  -- Drop view depending on language/fk_class

  DROP TRIGGER IF EXISTS on_insert ON information.v_language_version;
  DROP FUNCTION IF EXISTS information.v_language_version_insert();
  DROP VIEW IF EXISTS information.v_language_version;

  -- Change data type of column fk_class from integer to varchar(7)

  ALTER TABLE information.language
  ALTER COLUMN fk_class TYPE varchar(7) USING NULL;

  -- Add forein key to data_for_history.class/data_for_history_id

  ALTER TABLE information.language
  ADD CONSTRAINT language_fk_class_fkey
  FOREIGN KEY (fk_class)
  REFERENCES data_for_history.class (data_for_history_id);


  -- versioning

  -- Change data type of column fk_class from integer to varchar(7)

  ALTER TABLE information.language_vt
  ALTER COLUMN fk_class TYPE varchar(7) USING NULL;


  -- Create the view again

  CREATE OR REPLACE VIEW information.v_language_version AS
  WITH versions AS (

    SELECT pk_entity,
    true AS is_latest_version,
    entity_version,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    notes,
    fk_creator,
    fk_last_modifier,
    tmsp_creation,
    tmsp_last_modification,
    sys_period
    FROM information.language
    UNION
    SELECT pk_entity,
    false AS is_latest_version,
    entity_version,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    notes,
    fk_creator,
    fk_last_modifier,
    tmsp_creation,
    tmsp_last_modification,
    sys_period
    FROM information.language_vt
  ), statistics AS (
    SELECT DISTINCT
    pk_entity,
    pk_language,
    fk_class,
    lang_type,
    scope,
    iso6392b,
    iso6392t,
    iso6391,
    array_agg(epr.fk_project) AS projects,
    count(epr.is_in_project) AS is_in_project_count,
    count(epr.is_standard_in_project) AS is_standard_in_project_count,
    is_latest_version,
    epr.fk_entity_version_concat
    FROM versions versions_1
    LEFT JOIN (
      SELECT
      fk_entity_version_concat,
      fk_project,
      is_in_project,
      is_standard_in_project
      FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((pk_entity || '_'::text) || entity_version)
      GROUP BY
      pk_entity,
      is_latest_version,
      pk_language,
      fk_class,
      lang_type,
      scope,
      iso6392b,
      iso6392t,
      iso6391,
      epr.fk_entity_version_concat
      ORDER BY pk_entity, epr.fk_entity_version_concat
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
    versions.pk_language,
    versions.fk_class,
    versions.lang_type,
    versions.scope,
    versions.iso6392b,
    versions.iso6392t,
    versions.iso6391,
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

    CREATE FUNCTION information.v_language_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.language SET
    notes = NEW.notes,
    fk_class = NEW.fk_class,
    lang_type = NEW.lang_type,
    scope = NEW.scope,
    iso6392b = NEW.iso6392b,
    iso6392t = NEW.iso6392t,
    iso6391 = NEW.iso6391
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.language (
      pk_language,
      notes,
      fk_class,
      lang_type,
      scope,
      iso6392b,
      iso6392t,
      iso6391
    )
    VALUES(
      NEW.pk_language,
      NEW.notes,
      NEW.fk_class,
      NEW.lang_type,
      NEW.scope,
      NEW.iso6392b,
      NEW.iso6392t,
      NEW.iso6391
    )
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
    ON information.v_language_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_language_version_insert();
  `

  db.runSql(sql, callback)

};

exports._meta = {
  "version": 1
};
