-- Drop triggers
----------------
DROP TRIGGER add_pgwar_entity_preview_partition ON projects.project;
DROP TRIGGER after_upsert_resource ON information.resource;
DROP TRIGGER after_delete_resource ON information.resource;

-- Drop functions
-----------------
DROP FUNCTION pgwar.add_entity_preview_partition;
DROP FUNCTION pgwar.upsert_entity_preview_fk_class;
DROP FUNCTION pgwar.update_from_resource;
DROP FUNCTION pgwar.after_upsert_resource;
DROP FUNCTION pgwar.after_delete_resource;

-- Drop partitions
------------------
DROP TABLE pgwar.entity_preview_0;

-- Drop tables
--------------
DROP TABLE pgwar.entity_preview;

-- Drop schema
--------------
DROP SCHEMA pgwar;
