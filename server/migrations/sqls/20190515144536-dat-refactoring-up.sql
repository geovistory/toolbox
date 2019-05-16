-- 1
SELECT commons.rename_versioned_table('data', 'factoid_class_digital_rel', 'factoid_mapping');

-- 2
SELECT commons.rename_versioned_table('data', 'factoid_property_column_rel', 'factoid_role_mapping');

-- 3
ALTER TABLE data.factoid_role_mapping RENAME COLUMN fk_factoid_class_digital_rel TO fk_factoid_mapping;
ALTER TABLE data.factoid_role_mapping_vt RENAME COLUMN fk_factoid_class_digital_rel TO fk_factoid_mapping; 

-- 4
SELECT commons.rename_versioned_table('data', 'value_association_columns_rel', 'data_association_mapping');

-- 5
ALTER TABLE data.data_association_mapping RENAME COLUMN fk_factoid_class_digital_rel TO fk_factoid_mapping;
ALTER TABLE data.data_association_mapping_vt RENAME COLUMN fk_factoid_class_digital_rel TO fk_factoid_mapping; 

-- 6
SELECT commons.rename_versioned_table('data', 'class_column_rel', 'class_column_mapping');

-- 7
CREATE TABLE data.property_of_property_mapping
  (
    fk_property_of_property INTEGER NOT NULL REFERENCES data_for_history.property_of_property (dfh_pk_property_of_property),
    fk_domain_factoid_role_mapping INTEGER REFERENCES data.factoid_role_mapping (pk_entity),
    fk_domain_data_association_mapping INTEGER REFERENCES data.data_association_mapping (pk_entity),
    fk_range_column INTEGER NOT NULL REFERENCES data.column (pk_entity)
  )
INHERITS (data.entity);
  
SELECT commons.init_entity_child_table('data.property_of_property_mapping');

-- 8
ALTER TABLE data.column DROP COLUMN fk_meta_data;
ALTER TABLE data.column_vt DROP COLUMN fk_meta_data; 

-- 9
ALTER TABLE data.column ADD COLUMN fk_column_type integer not null REFERENCES system.system_type (pk_entity);
ALTER TABLE data.column_vt ADD COLUMN fk_column_type integer not null  REFERENCES system.system_type (pk_entity);

-- 10
ALTER TABLE data.column ADD COLUMN fk_original_column integer REFERENCES data.column (pk_entity);
ALTER TABLE data.column_vt ADD COLUMN fk_original_column integer  REFERENCES data.column (pk_entity);

-- 11
ALTER TABLE data.column ADD COLUMN is_imported BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE data.column_vt ADD COLUMN is_imported BOOLEAN NOT NULL;

-- 12
ALTER TABLE data.cell ADD COLUMN numeric_value NUMERIC;
ALTER TABLE data.cell_vt ADD COLUMN numeric_value NUMERIC;

-- 13
ALTER TABLE data.factoid_role DROP COLUMN fk_range_cell;
ALTER TABLE data.factoid_role_vt DROP COLUMN fk_range_cell; 
ALTER TABLE data.factoid_role DROP COLUMN fk_range_chunk;
ALTER TABLE data.factoid_role_vt DROP COLUMN fk_range_chunk; 

-- 14
ALTER TABLE data.factoid_role ADD COLUMN fk_data_range integer;
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_data_range integer;

-- 15
ALTER TABLE data.factoid_role ADD COLUMN fk_info_value_range integer;
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_info_value_range integer;

-- 16
ALTER TABLE data.data_association RENAME COLUMN fk_info_range TO fk_info_value_range;
ALTER TABLE data.data_association_vt RENAME COLUMN fk_info_range TO fk_info_value_range;

-- 17
ALTER TABLE data.data_association DROP COLUMN fk_info_domain;
ALTER TABLE data.data_association_vt DROP COLUMN fk_info_domain;

-- 18
CREATE TABLE data.property_of_property
  (
    fk_property_of_property INTEGER NOT NULL REFERENCES data_for_history.property_of_property (dfh_pk_property_of_property),
    fk_domain_factoid_role INTEGER REFERENCES data.factoid_role (pk_entity),
    fk_domain_data_association INTEGER REFERENCES data.data_association (pk_entity),
    fk_data_range INTEGER NOT NULL,
    fk_info_value_range INTEGER NOT NULL
  )
INHERITS (data.entity);
  
SELECT commons.init_entity_child_table('data.property_of_property');
