-- 18
DROP TABLE IF EXISTS data.property_of_property;
DROP TABLE IF EXISTS data.property_of_property_vt;

-- 17
ALTER TABLE data.data_association ADD COLUMN fk_info_domain integer;
ALTER TABLE data.data_association_vt ADD COLUMN fk_info_domain integer;

-- 16
ALTER TABLE data.data_association RENAME COLUMN fk_info_value_range TO fk_info_range;
ALTER TABLE data.data_association_vt RENAME COLUMN fk_info_value_range TO fk_info_range;

-- 15
ALTER TABLE data.factoid_role DROP COLUMN fk_info_value_range;
ALTER TABLE data.factoid_role_vt DROP COLUMN fk_info_value_range;

-- 14 
ALTER TABLE data.factoid_role DROP COLUMN fk_data_range;
ALTER TABLE data.factoid_role_vt DROP COLUMN fk_data_range;

-- 13
ALTER TABLE data.factoid_role ADD COLUMN fk_range_cell INTEGER REFERENCES data.cell (pk_entity);
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_range_cell INTEGER REFERENCES data.cell (pk_entity); 
ALTER TABLE data.factoid_role ADD COLUMN fk_range_chunk INTEGER REFERENCES data.chunk (pk_entity);
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_range_chunk INTEGER REFERENCES data.chunk (pk_entity);

-- 12
ALTER TABLE data.cell DROP COLUMN numeric_value;
ALTER TABLE data.cell_vt DROP COLUMN numeric_value; 

-- 11
ALTER TABLE data.column DROP COLUMN is_imported;
ALTER TABLE data.column_vt DROP COLUMN is_imported; 

-- 10
ALTER TABLE data.column DROP COLUMN fk_original_column;
ALTER TABLE data.column_vt DROP COLUMN fk_original_column; 

-- 9
ALTER TABLE data.column DROP COLUMN fk_column_type;
ALTER TABLE data.column_vt DROP COLUMN fk_column_type; 

-- 8
ALTER TABLE data.column ADD COLUMN fk_meta_data integer not null     REFERENCES system.system_type (pk_entity);
ALTER TABLE data.column_vt ADD COLUMN fk_meta_data integer not null  REFERENCES system.system_type (pk_entity);

-- 7
DROP TABLE IF EXISTS data.property_of_property_mapping;
DROP TABLE IF EXISTS data.property_of_property_mapping_vt;

-- 6
SELECT commons.rename_versioned_table('data', 'class_column_mapping', 'class_column_rel');

-- 5
ALTER TABLE data.data_association_mapping RENAME COLUMN fk_factoid_mapping TO fk_factoid_class_digital_rel;
ALTER TABLE data.data_association_mapping_vt RENAME COLUMN fk_factoid_mapping TO fk_factoid_class_digital_rel;

-- 4
SELECT commons.rename_versioned_table('data', 'data_association_mapping', 'value_association_columns_rel');

-- 3
ALTER TABLE data.factoid_role_mapping RENAME COLUMN fk_factoid_mapping TO fk_factoid_class_digital_rel;
ALTER TABLE data.factoid_role_mapping_vt RENAME COLUMN fk_factoid_mapping TO fk_factoid_class_digital_rel;

-- 2
SELECT commons.rename_versioned_table('data', 'factoid_role_mapping', 'factoid_property_column_rel');

-- 1
SELECT commons.rename_versioned_table('data', 'factoid_mapping', 'factoid_class_digital_rel')
