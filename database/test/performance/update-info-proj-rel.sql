-- Check performance of updating info_proj_rels
BEGIN;
/********* 
 ***** END OF HELPER FUNCTIONS
 *********/
SELECT plan(1);

-- Drop all triggers except the one for pgwar
DROP TRIGGER IF EXISTS after_epr_upsert ON projects.info_proj_rel;

--DROP TRIGGER IF EXISTS after_modify_info_proj_rel ON projects.info_proj_rel;
DROP TRIGGER IF EXISTS create_entity_version_key ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS creation_tmsp ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS insert_schema_table_name ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS last_modification_tmsp ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS notify_modification ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS on_upsert ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS update_entity_version_key ON projects.info_proj_rel;

DROP TRIGGER IF EXISTS versioning_trigger ON projects.info_proj_rel;

-- Prepare procedure to update 10k rows
PREPARE update_info_proj_rels AS WITH updated_rows AS (
    SELECT pk_entity
    FROM projects.info_proj_rel
    ORDER BY pk_entity
    LIMIT 10000
)
UPDATE projects.info_proj_rel
SET is_in_project = is_in_project
FROM updated_rows
WHERE info_proj_rel.pk_entity = updated_rows.pk_entity;

-- Assert that it performs ok
SELECT performs_ok(
        'update_info_proj_rels',
        10000,
        'Assert that updateing  with a name takes less than 10s'
    );

SELECT *
FROM finish();

ROLLBACK;