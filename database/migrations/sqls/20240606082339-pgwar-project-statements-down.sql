-- Drop trigger after_delete_pgw_statement
DROP TRIGGER after_delete_pgw_statement ON pgwar.statement;

-- Drop function pgwar.after_delete_pgw_statement
DROP FUNCTION pgwar.after_delete_pgw_statement;

-- Drop trigger after_upsert_pgw_statement
DROP TRIGGER after_upsert_pgw_statement ON pgwar.statement;

-- Drop function pgwar.after_upsert_pgw_statement
DROP FUNCTION pgwar.after_upsert_pgw_statement;

-- Drop trigger after_modify_info_proj_rel
DROP TRIGGER after_modify_info_proj_rel ON projects.info_proj_rel;

-- Drop function pgwar.after_modify_info_proj_rel
DROP FUNCTION pgwar.after_modify_info_proj_rel;

-- Drop function pgwar.update_from_info_proj_rel
DROP FUNCTION pgwar.update_from_info_proj_rel;

-- Drop function pgwar.upsert_project_statements
DROP FUNCTION pgwar.upsert_project_statements;

-- Drop trigger last_modification_tmsp on pgwar.project_statements
DROP TRIGGER last_modification_tmsp ON pgwar.project_statements;

-- Drop table pgwar.project_statements
DROP TABLE pgwar.project_statements;
