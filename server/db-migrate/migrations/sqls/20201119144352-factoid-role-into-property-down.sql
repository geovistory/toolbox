-- table data.factoid_role_mapping
ALTER TABLE data.factoid_property_mapping RENAME TO factoid_role_mapping;
ALTER TABLE data.factoid_property_mapping_vt RENAME TO factoid_role_mapping_vt;
  
-- table data.property_of_property
ALTER TABLE data.property_of_property RENAME COLUMN fk_domain_factoid_property TO fk_domain_factoid_role;
ALTER TABLE data.property_of_property_vt RENAME COLUMN fk_domain_factoid_property_vt TO fk_domain_factoid_role;

-- table data.property_of_property_mapping
ALTER TABLE data.property_of_property_mapping RENAME COLUMN fk_domain_factoid_property_mapping TO fk_domain_factoid_role_mapping;
ALTER TABLE data.property_of_property_mapping_vt RENAME COLUMN fk_domain_factoid_property_mapping_vt TO fk_domain_factoid_role_mapping;

-- table data.factoid_role_mapping new column is_outgoing
ALTER TABLE data.factoid_role_mapping DROP COLUMN is_outgoing;