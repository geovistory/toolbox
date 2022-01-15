ALTER TABLE data_for_history.api_property
  DROP COLUMN dfh_parent_properties;

ALTER TABLE data_for_history.api_property_vt
  DROP COLUMN dfh_parent_properties;

ALTER TABLE data_for_history.api_property
  DROP COLUMN dfh_ancestor_properties;

ALTER TABLE data_for_history.api_property_vt
  DROP COLUMN dfh_ancestor_properties;

