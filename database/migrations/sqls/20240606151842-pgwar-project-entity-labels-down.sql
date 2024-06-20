/***
* Revert Functions and Triggers
***/

/***
* Triggers
***/

-- Drop trigger on_modify_project_statement
DROP TRIGGER IF EXISTS on_modify_project_statement ON pgwar.statement;

-- Drop trigger on_upsert_entity_preview_fk_class
DROP TRIGGER IF EXISTS on_upsert_entity_preview_fk_class ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_preview_entity_label
DROP TRIGGER IF EXISTS on_upsert_entity_preview_entity_label ON pgwar.entity_preview;

-- Drop trigger on_upsert_entity_label_config
DROP TRIGGER IF EXISTS on_upsert_entity_label_config ON projects.entity_label_config;

-- Drop function pgwar.update_entity_label_on_project_statement_change
DROP FUNCTION IF EXISTS pgwar.update_entity_label_on_project_statement_change;

-- Drop function pgwar.update_entity_label_on_fk_class_change
DROP FUNCTION IF EXISTS pgwar.update_entity_label_on_fk_class_change;

-- Drop function pgwar.update_entity_label_on_entity_label_change
DROP FUNCTION IF EXISTS pgwar.update_entity_label_on_entity_label_change;

-- Drop function pgwar.update_entity_label_on_entity_label_config_change
DROP FUNCTION IF EXISTS pgwar.update_entity_label_on_entity_label_config_change;

/***
* Functions
***/

-- Drop function pgwar.update_entity_label_of_entity_preview
DROP FUNCTION IF EXISTS pgwar.update_entity_label_of_entity_preview;

-- Drop function pgwar.get_project_entity_label(entity_id int, project_id int, label_config jsonb)
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int, label_config jsonb);

-- Drop function pgwar.get_target_label_of_field
DROP FUNCTION IF EXISTS pgwar.get_target_label_of_field;

-- Drop function pgwar.get_target_labels_of_outgoing_field
DROP FUNCTION IF EXISTS pgwar.get_target_labels_of_outgoing_field;

-- Drop function pgwar.get_target_labels_of_incoming_field
DROP FUNCTION IF EXISTS pgwar.get_target_labels_of_incoming_field;

-- Drop function pgwar.get_project_entity_label(entity_id int, project_id int, class_id int)
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int, class_id int);

-- Drop function pgwar.get_project_entity_label(entity_id int, project_id int)
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int);

-- Drop function pgwar.get_entity_label_config
DROP FUNCTION IF EXISTS pgwar.get_entity_label_config;
