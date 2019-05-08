-- 12
ALTER TABLE information.entity DROP COLUMN metadata;


-- 11
ALTER TABLE information.appellation RENAME COLUMN _deprecated_appellation_label TO appellation_label;
ALTER TABLE information.appellation_vt RENAME COLUMN _deprecated_appellation_label TO appellation_label;
ALTER TABLE information.appellation RENAME COLUMN _deprecated_pk_appellation TO pk_appellation;
ALTER TABLE information.appellation_vt RENAME COLUMN _deprecated_pk_appellation TO pk_appellation;

-- 10
SELECT commons.unmake_versioned_table_child_of_text('information.appellation');
ALTER TABLE information.appellation DROP COLUMN entity_version;
ALTER TABLE information.appellation_vt DROP COLUMN entity_version;


-- 9.
--ALTER TABLE information.text_property ALTER COLUMN _deprecated_text_property_quill_doc SET NOT NULL; 

-- 8.
ALTER TABLE information.text_property RENAME COLUMN _deprecated_text_property TO text_property;
ALTER TABLE information.text_property_vt RENAME COLUMN _deprecated_text_property TO text_property;
ALTER TABLE information.text_property RENAME COLUMN _deprecated_text_property_quill_doc TO text_property_quill_doc;
ALTER TABLE information.text_property_vt RENAME COLUMN _deprecated_text_property_quill_doc TO text_property_quill_doc;

-- 7.
SELECT commons.unmake_versioned_table_child_of_text('information.text_property');
ALTER TABLE information.text_property DROP COLUMN entity_version;
ALTER TABLE information.text_property_vt DROP COLUMN entity_version;

-- 6.
ALTER TABLE information.temporal_entity RENAME COLUMN _deprecated_pk_temporal_entity TO pk_temporal_entity;

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
    temporal_entity.fk_class,
    temporal_entity.pk_temporal_entity
   FROM information.temporal_entity;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_temporal_entity
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_temporal_entity_find_or_create();

-- 5. 
ALTER TABLE information.role RENAME COLUMN _deprecated_pk_role TO pk_role;

-- 4.
ALTER TABLE information.persistent_item RENAME COLUMN _deprecated_pk_persistent_item TO pk_persistent_item;

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
    persistent_item.fk_class,
    persistent_item.pk_persistent_item
   FROM information.persistent_item;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_persistent_item
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_persistent_item_find_or_create();


-- 3.
ALTER TABLE information._deprecated_namespace
    ADD CONSTRAINT namespace_fk_project_fkey FOREIGN KEY (fk_project) REFERENCES projects.project (_deprecated_pk_project);

SELECT
    commons.rename_versioned_table ('information',
        '_deprecated_namespace',
        'namespace');

-- 2.

SELECT
    commons.rename_versioned_table ('information',
        '_deprecated_type_namespace_rel',
        'type_namespace_rel');

-- 1.

CREATE TABLE information.sourcing (
    pk_sourcing serial PRIMARY KEY,
    fk_source integer,
    fk_entity integer,
    fk_system_type integer,
    position_in_source text)
INHERITS (
    information.entity
);

SELECT
    commons.init_entity_child_table ('information.sourcing');

