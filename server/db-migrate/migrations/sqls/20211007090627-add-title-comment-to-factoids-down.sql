ALTER TABLE data.factoid_mapping
DROP COLUMN title;

ALTER TABLE data.factoid_mapping
DROP COLUMN comment;

ALTER TABLE data.factoid_property_mapping
DROP COLUMN comment;

ALTER TABLE data.factoid_property_mapping
DROP COLUMN fk_default_entity;