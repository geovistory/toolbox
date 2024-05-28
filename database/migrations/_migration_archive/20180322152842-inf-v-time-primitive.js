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


  const sql = `CREATE OR REPLACE VIEW information.v_time_primitive_version AS
  WITH versions AS (
           SELECT time_primitive.pk_entity,
              true AS is_latest_version,
              time_primitive.entity_version,
              time_primitive.pk_time_primitive,
              time_primitive.fk_class,
              time_primitive.duration,
              time_primitive.begin,
              time_primitive.notes,
              time_primitive.fk_creator,
              time_primitive.fk_last_modifier,
              time_primitive.tmsp_creation,
              time_primitive.tmsp_last_modification,
              time_primitive.sys_period
             FROM information.time_primitive
          UNION
           SELECT time_primitive_vt.pk_entity,
              false AS is_latest_version,
              time_primitive_vt.entity_version,
              time_primitive_vt.pk_time_primitive,
              time_primitive_vt.fk_class,
              time_primitive_vt.duration,
              time_primitive_vt.begin,
              time_primitive_vt.notes,
              time_primitive_vt.fk_creator,
              time_primitive_vt.fk_last_modifier,
              time_primitive_vt.tmsp_creation,
              time_primitive_vt.tmsp_last_modification,
              time_primitive_vt.sys_period
             FROM information.time_primitive_vt
          )
          , statistics AS (
           SELECT DISTINCT versions_1.pk_entity,
              versions_1.pk_time_primitive,
              versions_1.fk_class,
              versions_1.duration,
              versions_1.begin,
              array_agg(epr.fk_project) AS projects,
              count(epr.is_in_project) AS is_in_project_count,
              count(*) FILTER (where epr.is_standard_in_project = true) AS is_standard_in_project_count,
              versions_1.is_latest_version,
              epr.fk_entity_version_concat
             FROM versions versions_1
               LEFT JOIN ( SELECT entity_version_project_rel.fk_entity_version_concat,
                      entity_version_project_rel.fk_project,
                      entity_version_project_rel.is_in_project,
                      entity_version_project_rel.is_standard_in_project
                     FROM information.entity_version_project_rel) epr ON epr.fk_entity_version_concat = concat((versions_1.pk_entity || '_'::text) || versions_1.entity_version)
                  WHERE epr.is_in_project = true
            GROUP BY versions_1.pk_entity, versions_1.pk_time_primitive, versions_1.is_latest_version, versions_1.fk_class, versions_1.duration, versions_1.begin, epr.fk_entity_version_concat
            ORDER BY versions_1.pk_entity, epr.fk_entity_version_concat
       ),
          favorites AS (
           SELECT DISTINCT ON (statistics.pk_entity) statistics.pk_entity,
              statistics.is_in_project_count,
              statistics.is_standard_in_project_count,
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
      versions.fk_class,
      versions.duration,
      TO_CHAR(versions.begin, 'J') as julian_day,
      versions.notes,
      versions.fk_creator,
      versions.fk_last_modifier,
      versions.tmsp_creation,
      versions.tmsp_last_modification,
      versions.sys_period,
      versions.is_latest_version,
      ( SELECT favorites.is_in_project_count IS NOT NULL) AS is_community_favorite,
      COALESCE(favorites.is_in_project_count,0) AS is_in_project_count,
      COALESCE(favorites.is_standard_in_project_count,0) AS is_standard_in_project_count
     FROM versions
       LEFT JOIN favorites ON favorites.fk_entity_version_concat = concat((versions.pk_entity || '_'::text) || versions.entity_version)
    ORDER BY versions.pk_entity, versions.tmsp_last_modification DESC;


    -- create trigger function for insert

   CREATE FUNCTION information.v_time_primitive_version_insert()
   RETURNS trigger
   LANGUAGE 'plpgsql'
   AS $BODY$
   DECLARE
   result text;
   BEGIN
   -- if there is a pk_entity, update the existing entity
   IF (NEW.pk_entity IS NOT NULL) THEN

   UPDATE information.time_primitive SET
   fk_class = NEW.fk_class,
   notes = NEW.notes,

   --convert given julian day number to timestamp without time zone
   begin = to_date(NEW.julian_day::text, 'J'),
   duration = NEW.duration
   WHERE pk_entity = NEW.pk_entity
   RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

   -- else if there is no pk_entity, insert a new entity
   ELSE

   INSERT INTO information.time_primitive (notes, fk_class, begin, duration)

   --convert given julian day number to timestamp without time zone
   VALUES(NEW.notes, NEW.fk_class, to_date(NEW.julian_day::text, 'J'), NEW.duration)
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
    ON information.v_time_primitive_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_time_primitive_version_insert();

  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  var sql = `
  DROP TRIGGER IF EXISTS on_insert ON information.v_time_primitive_version;
  DROP FUNCTION IF EXISTS information.v_time_primitive_version_insert();
  DROP VIEW IF EXISTS information.v_time_primitive_version;
  `


  db.runSql(sql, callback)

};

