-- 15
ALTER TABLE data.entity DROP CONSTRAINT entity_fk_namespace_fkey;
DROP TABLE IF EXISTS data.namespace;
DROP TABLE IF EXISTS data.namespace_vt;

-- 14
DROP TABLE IF EXISTS data.text_property;
DROP TABLE IF EXISTS data.text_property_vt;

-- 13
DROP TABLE IF EXISTS data.avatar;
DROP TABLE IF EXISTS data.avatar_vt;

-- 12
DROP TABLE IF EXISTS data.data_info_association;
DROP TABLE IF EXISTS data.data_info_association_vt;

-- 11
DROP TABLE IF EXISTS data.values_association;
DROP TABLE IF EXISTS data.values_association_vt;

-- 10
DROP TABLE IF EXISTS data.factoid_role;
DROP TABLE IF EXISTS data.factoid_role_vt;

-- 9
DROP TABLE IF EXISTS data.factoid;
DROP TABLE IF EXISTS data.factoid_vt;

-- 8
DROP TABLE IF EXISTS data.factoid_property_column_rel;
DROP TABLE IF EXISTS data.factoid_property_column_rel_vt;

-- 7
DROP TABLE IF EXISTS data.class_column_rel;
DROP TABLE IF EXISTS data.class_column_rel_vt;

-- 6
DROP TABLE IF EXISTS data.value_association_columns_rel;
DROP TABLE IF EXISTS data.value_association_columns_rel_vt;

-- 5
DROP TABLE IF EXISTS data.factoid_class_digital_rel;
DROP TABLE IF EXISTS data.factoid_class_digital_rel_vt;

-- 4
DROP TABLE IF EXISTS data.cell;
DROP TABLE IF EXISTS data.cell_vt;

-- 3
DROP TABLE IF EXISTS data.column;
DROP TABLE IF EXISTS data.column_vt;

-- 2
DROP TABLE IF EXISTS data.row;
DROP TABLE IF EXISTS data.row_vt;

-- 1.
DROP TABLE data.chunk_vt;
DROP TABLE data.chunk;
ALTER TABLE commons.text DROP CONSTRAINT text_version_unique;

