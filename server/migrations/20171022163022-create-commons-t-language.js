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
  -- Table: commons.language

  CREATE TABLE commons.language
  (
    pk_language character(3) PRIMARY KEY, -- iso_lang
    lang_type character varying,
    scope character varying,
    iso6392b character(3),
    iso6392t character(3),
    iso6391 character(3),
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone)
  )
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE commons.language
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON commons.language
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT
  ON commons.language
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: commons.language_vt

  CREATE TABLE commons.language_vt (LIKE commons.language);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON commons.language
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'commons.language_vt', true
  );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE commons.language;
  DROP TABLE commons.language_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
