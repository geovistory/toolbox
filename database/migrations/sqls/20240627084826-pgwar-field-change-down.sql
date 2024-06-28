-- Function pgwar.field_change_notify_upsert
----------------------------------------------
DROP FUNCTION IF EXISTS  pgwar.field_change_notify_upser;
DROP TRIGGER IF EXISTS  after_insert_field_change ON pgwar.field_change;
DROP TRIGGER IF EXISTS  after_update_field_change ON pgwar.field_change;

-- Trigger after_modify_project_statements
----------------------------------------------
DROP TRIGGER IF EXISTS  after_modify_project_statements ON pgwar.project_statements;

-- Function upsert_field_change
----------------------------------------------
DROP FUNCTION IF EXISTS  pgwar.upsert_field_change;
DROP FUNCTION IF EXISTS  pgwar.update_field_change_on_project_statements_modification;

------ Table pgwar.field_change -----------------------------------------------------
---------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS  pgwar.field_change;




