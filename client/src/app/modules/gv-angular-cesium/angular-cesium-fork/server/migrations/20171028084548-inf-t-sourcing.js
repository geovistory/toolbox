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
  -- Table: information.sourcing

CREATE TABLE information.sourcing
(
    pk_sourcing serial PRIMARY KEY,
    fk_source integer,
    fk_entity integer,
    fk_system_type integer,
    position_in_source text COLLATE pg_catalog."default"
)
    INHERITS (information.entity)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE information.sourcing
    OWNER to postgres;

-- Trigger: creation_tmsp

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON information.sourcing
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

-- Trigger: insert_schema_table_name

CREATE TRIGGER insert_schema_table_name
    BEFORE INSERT
    ON information.sourcing
    FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();

-- Trigger: last_modification_tmsp

CREATE TRIGGER last_modification_tmsp
BEFORE INSERT OR UPDATE
    ON information.sourcing
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

    -- Table: information.sourcing_vt

    CREATE TABLE information.sourcing_vt (LIKE information.sourcing);

    -- Trigger: versioning_trigger

    CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR UPDATE OR DELETE ON information.sourcing
    FOR EACH ROW EXECUTE PROCEDURE versioning(
      'sys_period', 'information.sourcing_vt', true
    );

    -- Trigger: create_entity_version_key

    CREATE TRIGGER create_entity_version_key
    BEFORE INSERT
    ON information.sourcing
    FOR EACH ROW
    EXECUTE PROCEDURE commons.create_entity_version_key();

    -- Trigger: update_entity_version_key

    CREATE TRIGGER update_entity_version_key
    BEFORE UPDATE
    ON information.sourcing
    FOR EACH ROW
    EXECUTE PROCEDURE commons.update_entity_version_key();

  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `
  DROP TABLE information.sourcing;

  DROP TABLE information.sourcing_vt;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
