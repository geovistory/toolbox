ALTER TABLE data_for_history.api_class
  ADD COLUMN dfh_parent_classes INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_class_vt
  ADD COLUMN dfh_parent_classes INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_class
  ADD COLUMN dfh_ancestor_classes INT[] DEFAULT '{}' NOT NULL;

ALTER TABLE data_for_history.api_class_vt
  ADD COLUMN dfh_ancestor_classes INT[] DEFAULT '{}' NOT NULL;

