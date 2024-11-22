-- Revert trigger and trigger function for after_delete_resource
-------------------------------------------------------------
DROP TRIGGER after_delete_resource ON information.resource;

DROP FUNCTION pgwar.after_delete_resource;

-- Revert triggers and trigger function for after_upsert_resource
--------------------------------------------------------------
DROP TRIGGER after_update_resource ON information.resource;

DROP TRIGGER after_insert_resource ON information.resource;

DROP FUNCTION pgwar.after_upsert_resource;

-- Revert function to update pgwar from resource
----------------------------------------------
DROP FUNCTION pgwar.update_from_resource;

-- Revert function to upsert fk_project, pk_entity, fk_class on pgwar.entity_preview
-----------------------------------------------------------------------------
DROP FUNCTION pgwar.upsert_entity_preview_fk_class;

-- Revert table pgwar.entity_preview
------------------------------
DROP TABLE pgwar.entity_preview;

-- Revert schema pgwar
------------------------------
DROP SCHEMA pgwar;