ALTER TABLE data_for_history.api_property
  ADD COLUMN dfh_parent_properties INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_property_vt
  ADD COLUMN dfh_parent_properties INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_property
  ADD COLUMN dfh_ancestor_properties INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_property_vt
  ADD COLUMN dfh_ancestor_properties INT[] DEFAULT '{}' NOT NULL;

