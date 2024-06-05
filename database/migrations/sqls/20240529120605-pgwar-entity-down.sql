-- Trigger function after_delete_resource
----------------------------------------------
DROP TRIGGER IF EXISTS after_delete_resource ON information.resource;

DROP FUNCTION IF EXISTS pgwar.after_delete_resource;

-- Trigger function after_upsert_resource
----------------------------------------------
DROP TRIGGER IF EXISTS after_upsert_resource ON information.resource;

DROP FUNCTION IF EXISTS pgwar.after_upsert_resource;

-- Trigger function after_modify_info_proj_rel
----------------------------------------------
DROP TRIGGER IF EXISTS after_modify_info_proj_rel ON projects.info_proj_rel;

DROP FUNCTION IF EXISTS pgwar.after_modify_info_proj_rel;

-- Function to upsert fk_project, pk_entity, fk_class on pgwar.entity_preview
-----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.upsert_entity_preview_fk_class;

-- Trigger on projects.project to create new partition on pgwar.entity_preview
------------------------------------------------------------------------------
DROP TRIGGER IF EXISTS add_pgwar_entity_preview_partition ON projects.project;

-- Function to create partition on pgwar.entity_preview
-------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.add_entity_preview_partition;

-- Drop partition for community (fk_project = 0)
--------------------------------------------------
DROP TABLE IF EXISTS pgwar.entity_preview_0;

-- Drop table pgwar.entity_preview
----------------------------------
DROP TABLE IF EXISTS pgwar.entity_preview;

-- Drop schema pgwar
--------------------
DROP SCHEMA IF EXISTS pgwar;

