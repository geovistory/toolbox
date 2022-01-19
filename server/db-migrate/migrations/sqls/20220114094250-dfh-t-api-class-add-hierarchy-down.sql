ALTER TABLE data_for_history.api_class
  DROP COLUMN dfh_parent_classes;

ALTER TABLE data_for_history.api_class_vt
  DROP COLUMN dfh_parent_classes;

ALTER TABLE data_for_history.api_class
  DROP COLUMN dfh_ancestor_classes;

ALTER TABLE data_for_history.api_class_vt
  DROP COLUMN dfh_ancestor_classes;

