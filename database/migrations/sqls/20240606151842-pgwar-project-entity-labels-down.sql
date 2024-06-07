-- drop function get_project_entity_label with jsonb parameter
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int, label_config jsonb);

-- drop function get_target_label_of_field
DROP FUNCTION IF EXISTS pgwar.get_target_label_of_field(entity_id int, project_id int, field jsonb);

-- drop function get_target_labels_of_outgoing_field
DROP FUNCTION IF EXISTS pgwar.get_target_labels_of_outgoing_field(entity_id int, project_id int, property_id int, limit_count int);

-- drop function get_target_labels_of_incoming_field
DROP FUNCTION IF EXISTS pgwar.get_target_labels_of_incoming_field(entity_id int, project_id int, property_id int, limit_count int);

-- drop function get_project_entity_label with class_id parameter
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int, class_id int);

-- drop function get_project_entity_label without class_id parameter
DROP FUNCTION IF EXISTS pgwar.get_project_entity_label(entity_id int, project_id int);

-- drop function get_entity_label_config
DROP FUNCTION IF EXISTS pgwar.get_entity_label_config(class_id int, project_id int);
