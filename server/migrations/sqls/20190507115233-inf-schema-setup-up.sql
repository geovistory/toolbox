-------------------------------------------------------------------------
-- 1. DROP table SOURCING
-------------------------------------------------------------------------

DROP TABLE information.sourcing;

DROP TABLE information.sourcing_vt;

-------------------------------------------------------------------------
-- 2. Mark table type_namespace_rel as Deprecated
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('information',
        'type_namespace_rel',
        '_deprecated_type_namespace_rel');

-------------------------------------------------------------------------
-- 3. Mark table namespace as Deprecated
-------------------------------------------------------------------------

SELECT
    commons.rename_versioned_table ('information',
        'namespace',
        '_deprecated_namespace');

ALTER TABLE information._deprecated_namespace DROP CONSTRAINT namespace_fk_project_fkey;

-------------------------------------------------------------------------
-- 4. Mark pk_persistent_item as Deprecated and remove it from v_persistent_item
-------------------------------------------------------------------------
DROP VIEW information.v_persistent_item;
CREATE VIEW information.v_persistent_item AS
 SELECT persistent_item.pk_entity,
    persistent_item.schema_name,
    persistent_item.table_name,
    persistent_item.notes,
    persistent_item.fk_creator,
    persistent_item.fk_last_modifier,
    persistent_item.tmsp_creation,
    persistent_item.tmsp_last_modification,
    persistent_item.sys_period,
    persistent_item.fk_class
   FROM information.persistent_item;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_persistent_item
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_persistent_item_find_or_create();

ALTER TABLE information.persistent_item RENAME COLUMN pk_persistent_item TO _deprecated_pk_persistent_item;


-------------------------------------------------------------------------
-- 5. Mark pk_role as Deprecated
-------------------------------------------------------------------------
ALTER TABLE information.role RENAME COLUMN pk_role TO _deprecated_pk_role;

-------------------------------------------------------------------------
-- 6. Mark pk_temporal_entity as Deprecated and remove it from v_temporal_entity
-------------------------------------------------------------------------
DROP VIEW information.v_temporal_entity;

CREATE VIEW information.v_temporal_entity AS
 SELECT temporal_entity.pk_entity,
    temporal_entity.schema_name,
    temporal_entity.table_name,
    temporal_entity.notes,
    temporal_entity.fk_creator,
    temporal_entity.fk_last_modifier,
    temporal_entity.tmsp_creation,
    temporal_entity.tmsp_last_modification,
    temporal_entity.sys_period,
    temporal_entity.fk_class
   FROM information.temporal_entity;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_temporal_entity
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_temporal_entity_find_or_create();

ALTER TABLE information.temporal_entity RENAME COLUMN pk_temporal_entity TO _deprecated_pk_temporal_entity;

-------------------------------------------------------------------------
-- 7. Make text_property a child of text
-------------------------------------------------------------------------
DELETE FROM information.text_property_vt; 
ALTER TABLE information.text_property ADD COLUMN entity_version integer;
ALTER TABLE information.text_property_vt ADD COLUMN entity_version integer;
SELECT commons.reinit_versioning_triggers('information.text_property');
SELECT commons.make_versioned_table_child_of_text('information.text_property');
UPDATE information.text_property SET string = information.text_property_to_string(text_property_quill_doc);
DELETE FROM information.text_property_vt; -- no way back: Loss of history


-------------------------------------------------------------------------
-- 8. Mark unused text_property columns as deprecated
-------------------------------------------------------------------------
ALTER TABLE information.text_property RENAME COLUMN text_property TO _deprecated_text_property;
ALTER TABLE information.text_property_vt RENAME COLUMN text_property TO _deprecated_text_property;
ALTER TABLE information.text_property RENAME COLUMN text_property_quill_doc TO _deprecated_text_property_quill_doc;
ALTER TABLE information.text_property_vt RENAME COLUMN text_property_quill_doc TO _deprecated_text_property_quill_doc;

-------------------------------------------------------------------------
-- 9. Remove NOT NULL from _deprecated_text_property_quill_doc
-------------------------------------------------------------------------
ALTER TABLE information.text_property ALTER COLUMN _deprecated_text_property_quill_doc DROP NOT NULL; 


-------------------------------------------------------------------------
-- 10. Make appellation a child of text
-------------------------------------------------------------------------
DELETE FROM information.appellation_vt; 
ALTER TABLE information.appellation ADD COLUMN entity_version integer;
ALTER TABLE information.appellation_vt ADD COLUMN entity_version integer;
SELECT commons.reinit_versioning_triggers('information.appellation');
SELECT commons.make_versioned_table_child_of_text('information.appellation');
UPDATE information.appellation SET string = information.appellation_label_to_string(appellation_label);
DELETE FROM information.appellation_vt; -- no way back: Loss of history

-------------------------------------------------------------------------
-- 11. Mark unused appellation columns as deprecated
-------------------------------------------------------------------------
ALTER TABLE information.appellation RENAME COLUMN appellation_label TO _deprecated_appellation_label;
ALTER TABLE information.appellation_vt RENAME COLUMN appellation_label TO _deprecated_appellation_label;
ALTER TABLE information.appellation RENAME COLUMN pk_appellation TO _deprecated_pk_appellation;
ALTER TABLE information.appellation_vt RENAME COLUMN pk_appellation TO _deprecated_pk_appellation;


-------------------------------------------------------------------------
-- 12. Add column metadata
-------------------------------------------------------------------------
ALTER TABLE information.entity ADD COLUMN metadata jsonb;

