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
  ALTER TABLE data_for_history.property
    ADD COLUMN dfh_fk_property_of_origin INTEGER;
  ALTER TABLE data_for_history.property_vt
    ADD COLUMN dfh_fk_property_of_origin INTEGER;

  -- this column name has to be adapted to the new API labelling
  ALTER TABLE data_for_history.property_profile_view RENAME COLUMN dfh_pk_inherited_property TO dfh_fk_property_of_origin;
  ALTER TABLE data_for_history.property_profile_view_vt RENAME COLUMN dfh_pk_inherited_property TO dfh_fk_property_of_origin;

  -- the data_for_history.inherited_property isn't any more in use, even not in OntoME
  DROP TABLE IF EXISTS data_for_history.inherited_property CASCADE;
  DROP TABLE IF EXISTS data_for_history.inherited_property_vt CASCADE;
  `

  db.runSql(sql, callback)

};

exports.down = function(db, callback) {

  const sql = `

    ALTER TABLE data_for_history.property
      DROP COLUMN dfh_fk_property_of_origin;
    ALTER TABLE data_for_history.property_vt
        DROP COLUMN dfh_fk_property_of_origin;

    ALTER TABLE data_for_history.property_profile_view RENAME COLUMN dfh_fk_property_of_origin TO dfh_pk_inherited_property;
    ALTER TABLE data_for_history.property_profile_view_vt RENAME COLUMN dfh_fk_property_of_origin TO dfh_pk_inherited_property;

    CREATE TABLE data_for_history.inherited_property (
      dfh_pk_inherited_property         integer,
      dfh_is_originated_from_property   integer,
      dfh_inherited_from_class              integer,
      dfh_identifier_in_namespace       text,
      dfh_has_domain                    integer,
      dfh_has_range                     integer,
      dfh_creation_time                 timestamp,
      dfh_modification_time             timestamp,
      dfh_domain_instances_min_quantifier  smallint,
      dfh_domain_instances_max_quantifier  smallint,
      dfh_range_instances_min_quantifier   smallint,
      dfh_range_instances_max_quantifier   smallint,
      dfh_standard_label                varchar(500)
    )
    INHERITS (data_for_history.entity);

    CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON data_for_history.inherited_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

    CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE
    ON data_for_history.inherited_property
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

    CREATE TRIGGER insert_schema_table_name BEFORE INSERT
    ON data_for_history.inherited_property FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();


    -- versioning

    CREATE TABLE data_for_history.inherited_property_vt (LIKE data_for_history.inherited_property);

    CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR UPDATE OR DELETE ON data_for_history.inherited_property
    FOR EACH ROW EXECUTE PROCEDURE versioning(
      'sys_period', 'data_for_history.inherited_property_vt', true
    );

  `

  db.runSql(sql, callback)

};
exports._meta = {
  "version": 1
};
