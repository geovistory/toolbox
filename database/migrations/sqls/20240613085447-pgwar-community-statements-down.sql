-- Step 1: Drop views
DROP VIEW pgwar.v_statements_combined;
DROP VIEW pgwar.v_statements_deleted_combined;

-- Step 2: Drop functions
DROP FUNCTION pgwar.update_community_statements_from_upserts;
DROP FUNCTION pgwar.update_community_statements_from_deletes;

-- Step 3: Drop triggers
DROP TRIGGER after_delete_community_statements ON pgwar.community_statements;

-- Step 4: Drop function
DROP FUNCTION pgwar.handle_community_statements_delete;

-- Step 5: Drop tables
DROP TABLE pgwar.community_statements_deleted;
DROP TABLE pgwar.community_statements;
DROP TABLE pgwar.offsets;

-- Step 6: Drop indexes
DROP INDEX pgwar.project_statements_tmsp_last_modification_idx;
DROP INDEX pgwar.project_statements_deleted_tmsp_deletion_idx;
