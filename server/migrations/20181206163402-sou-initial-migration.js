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


------------------------------------------------------------------------------------------------------------
-- TABLE sources.row (including *_vt)                                                                    #1
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.row
  (
    fk_digital_object INTEGER NOT NULL REFERENCES information.digital_object (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.row');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.column (including *_vt)                                                                 #2
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.column
  (
    fk_digital_object INTEGER NOT NULL REFERENCES information.digital_object (pk_entity),
    fk_data_type INTEGER NOT NULL REFERENCES commons.system_type (pk_entity),
    fk_metad_data INTEGER NOT NULL REFERENCES commons.system_type (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.column');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.cell (including *_vt)                                                                   #3
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.cell
  (
    fk_column INTEGER NOT NULL REFERENCES sources.column (pk_entity),
    fk_row INTEGER NOT NULL REFERENCES sources.row (pk_entity),
    value VARCHAR
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.cell');


------------------------------------------------------------------------------------------------------------
-- TABLE factoid_class_dataset_rel (including *_vt)                                                      #4
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.factoid_class_dataset_rel
  (
    fk_digital_object INTEGER NOT NULL REFERENCES information.digital_object (pk_entity),
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.factoid_class_dataset_rel');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.value_association_columns_rel (including *_vt)                                          #5
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.value_association_columns_rel
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_column INTEGER NOT NULL REFERENCES sources.column (pk_entity),
    fk_range_column INTEGER NOT NULL REFERENCES sources.column (pk_entity),
    fk_factoid_class_dataset_rel INTEGER NOT NULL REFERENCES sources.factoid_class_dataset_rel (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.value_association_columns_rel');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.class_column_rel (including *_vt)                                                       #6
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.class_column_rel
  (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class),
    fk_column INTEGER NOT NULL REFERENCES sources.column (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.class_column_rel');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.factoid_property_column_rel (including *_vt)                                            #7
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.factoid_property_column_rel
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_column INTEGER NOT NULL REFERENCES sources.column (pk_entity),
    fk_factoid_class_dataset_rel INTEGER NOT NULL REFERENCES sources.factoid_class_dataset_rel (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.factoid_property_column_rel');


------------------------------------------------------------------------------------------------------------
-- TABLE sources.factoid (including *_vt)                                                                #8
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.factoid
  (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.factoid');
  
  
------------------------------------------------------------------------------------------------------------
-- TABLE sources.factoid_role (including *_vt)                                                           #9
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.factoid_role
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_factoid INTEGER NOT NULL REFERENCES sources.factoid (pk_entity),
    fk_range_cell INTEGER NOT NULL REFERENCES sources.cell (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.factoid_role');
  

------------------------------------------------------------------------------------------------------------
-- TABLE sources.values_association (including *_vt)                                                     #10
------------------------------------------------------------------------------------------------------------

  CREATE TABLE sources.values_association
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_cell INTEGER NOT NULL REFERENCES sources.cell (pk_entity),
    fk_range_cell INTEGER NOT NULL REFERENCES sources.cell (pk_entity)
  )
  INHERITS (sources.entity);
  
  SELECT commons.init_entity_child_table('sources.values_association');

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

  -- #10
  DROP TABLE IF EXISTS sources.values_association;
  DROP TABLE IF EXISTS sources.values_association_vt;
  
  -- #9
  DROP TABLE IF EXISTS sources.factoid_role;
  DROP TABLE IF EXISTS sources.factoid_role_vt;
  
  -- #8
  DROP TABLE IF EXISTS sources.factoid;
  DROP TABLE IF EXISTS sources.factoid_vt;

  -- #7
  DROP TABLE IF EXISTS sources.factoid_property_column_rel;
  DROP TABLE IF EXISTS sources.factoid_property_column_rel_vt;

  -- #6
  DROP TABLE IF EXISTS sources.class_column_rel;
  DROP TABLE IF EXISTS sources.class_column_rel_vt;

  -- #5
  DROP TABLE IF EXISTS sources.value_association_columns_rel;
  DROP TABLE IF EXISTS sources.value_association_columns_rel_vt;

  -- #4
  DROP TABLE IF EXISTS sources.factoid_class_dataset_rel;
  DROP TABLE IF EXISTS sources.factoid_class_dataset_rel_vt;

  -- #3
  DROP TABLE IF EXISTS sources.cell;
  DROP TABLE IF EXISTS sources.cell_vt;

  -- #2
  DROP TABLE IF EXISTS sources.column;
  DROP TABLE IF EXISTS sources.column_vt;
  
  -- #1
  DROP TABLE IF EXISTS sources.row;
  DROP TABLE IF EXISTS sources.row_vt;

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



