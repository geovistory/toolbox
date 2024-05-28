ALTER TABLE data.factoid_mapping
ADD COLUMN title text;

ALTER TABLE data.factoid_mapping
ADD COLUMN comment text;

ALTER TABLE data.factoid_property_mapping
ADD COLUMN comment text;

ALTER TABLE data.factoid_property_mapping
ADD COLUMN fk_default int;