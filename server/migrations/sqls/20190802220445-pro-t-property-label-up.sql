/* Replace with your SQL commands */
CREATE TABLE projects.property_label (
  pk_entity serial PRIMARY KEY,
  label text,
  fk_project int,
  fk_language int,
  fk_system_type int,
  fk_property int,
  fk_domain_class int,
  fk_range_class int,
  FOREIGN KEY (fk_project) REFERENCES projects.project (pk_entity),
  FOREIGN KEY (fk_domain_class) REFERENCES data_for_history.class (dfh_pk_class),
  FOREIGN KEY (fk_range_class) REFERENCES data_for_history.class (dfh_pk_class),
  FOREIGN KEY (fk_property) REFERENCES data_for_history.property (dfh_pk_property),
  FOREIGN KEY (fk_system_type) REFERENCES system.system_type (pk_entity),
  FOREIGN KEY (fk_language) REFERENCES information.language (pk_entity)
)
INHERITS (
  projects.entity
);

SELECT
  commons.init_entity_child_table ('projects.property_label');

