-- Triggers
----------------------------------------------
DROP TRIGGER after_modify_info_proj_rel ON projects.info_proj_rel;
DROP TRIGGER after_upsert_pgw_statement ON pgwar.statement;
DROP TRIGGER after_delete_pgw_statement ON pgwar.statement;
DROP TRIGGER last_modification_tmsp ON pgwar.project_statements;
DROP TRIGGER after_delete_project_statements ON pgwar.project_statements;

-- Functions
----------------------------------------------
DROP FUNCTION pgwar.after_modify_info_proj_rel();
DROP FUNCTION pgwar.update_from_info_proj_rel(projects.info_proj_rel, boolean);
DROP FUNCTION pgwar.after_upsert_pgw_statement();
DROP FUNCTION pgwar.after_delete_pgw_statement();
DROP FUNCTION pgwar.handle_project_statements_delete();
DROP FUNCTION pgwar.upsert_project_statements(pgwar.project_statements);

-- Tables
----------------------------------------------
DROP TABLE pgwar.project_statements;
DROP TABLE pgwar.project_statements_deleted;