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
  -- Table: information.language

  CREATE TABLE information.language
  (
    pk_language character(3) PRIMARY KEY, -- iso_lang
    fk_class VARCHAR(7) REFERENCES data_for_history.class (data_for_history_id),
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
  INHERITS (information.entity)
  WITH (
    OIDS = FALSE
  )
  TABLESPACE pg_default;

  ALTER TABLE information.language
  OWNER to postgres;

  -- Trigger: creation_tmsp

  CREATE TRIGGER creation_tmsp
  BEFORE INSERT
  ON information.language
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation();

  -- Trigger: last_modification_tmsp

  CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT
  ON information.language
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification();

  -- Table: information.language_vt

  CREATE TABLE information.language_vt (LIKE information.language);

  -- Trigger: versioning_trigger

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR UPDATE OR DELETE ON information.language
  FOR EACH ROW EXECUTE PROCEDURE versioning(
    'sys_period', 'information.language_vt', true
  );
  `;

  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.language;
  DROP TABLE information.language_vt;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
