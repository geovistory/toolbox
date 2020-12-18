-- 1 (Inherits all for the string from table commons.text)
CREATE TABLE projects.entity_label_config (
  fk_project int,
  fk_class int,
  config jsonb,
  entity_version integer DEFAULT 1
)
INHERITS (
  projects.entity
);

-- 2
SELECT
  commons.init_entity_child_table ('projects.entity_label_config');

-- 3
Create Trigger notify_modification
    After Insert Or Update Or Delete On projects.entity_label_config For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

