-- Drop Triggers
-------------------------------------------------------------
DROP TRIGGER after_update_field_change ON pgwar.field_change;
DROP TRIGGER after_insert_field_change ON pgwar.field_change;
DROP TRIGGER after_modify_project_statements ON pgwar.project_statements;

-- Drop Functions
-------------------------------------------------------------
DROP FUNCTION pgwar.field_change_notify_upsert;
DROP FUNCTION pgwar.update_field_change_on_project_statements_modification;
DROP FUNCTION pgwar.upsert_field_change;

-- Drop Table
-------------------------------------------------------------
DROP TABLE pgwar.field_change;
