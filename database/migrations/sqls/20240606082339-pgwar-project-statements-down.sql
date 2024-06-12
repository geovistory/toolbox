-- Drop trigger and function to delete pgwar.project_statements
---------------------------------------------------------------
DROP TRIGGER IF EXISTS after_delete_pgw_statement ON pgwar.statement;

DROP FUNCTION IF EXISTS pgwar.after_delete_pgw_statement;

-- Drop trigger and function after upsert on pgwar.statement
------------------------------------------------------------
DROP TRIGGER IF EXISTS after_upsert_pgw_statement ON pgwar.statement;

DROP FUNCTION IF EXISTS pgwar.after_upsert_pgw_statement;

-- Drop trigger and function after upsert on projects.info_proj_rel
-------------------------------------------------------------------
DROP TRIGGER IF EXISTS after_modify_info_proj_rel_proj_stmt ON projects.info_proj_rel;

DROP FUNCTION IF EXISTS pgwar.after_modify_info_proj_rel_proj_stmt;

-- Drop function to upsert on pgwar.project_statements
------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.upsert_project_statements;

-- Drop table pgwar.project_statements
--------------------------------------
DROP TABLE IF EXISTS pgwar.project_statements;








