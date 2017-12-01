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
  -- Table: information.text_property

CREATE TABLE information.text_property
(
    pk_text_property serial PRIMARY KEY,
    text_property text COLLATE pg_catalog."default",
    text_property_xml xml,
    fk_system_type integer,
    fk_language character(3) COLLATE pg_catalog."default",
    fk_entity integer
)
    INHERITS (information.entity)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE information.text_property
    OWNER to postgres;

-- Trigger: creation_tmsp

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON information.text_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

-- Trigger: insert_schema_table_name

CREATE TRIGGER insert_schema_table_name
    BEFORE INSERT
    ON information.text_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();

-- Trigger: last_modification_tmsp

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT
    ON information.text_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

    -- Table: information.text_property_vt

    CREATE TABLE information.text_property_vt (LIKE information.text_property);

    -- Trigger: versioning_trigger

    CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR UPDATE OR DELETE ON information.text_property
    FOR EACH ROW EXECUTE PROCEDURE versioning(
      'sys_period', 'information.text_property_vt', true
    );
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
DROP TABLE information.text_property;

DROP TABLE information.text_property_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
