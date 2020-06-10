-------------------------------------------------------------------------
-- 1. REWORK SCHEMA SYSTEM_CONFIG
-------------------------------------------------------------------------

CREATE TABLE system.entity (
    pk_entity serial PRIMARY KEY,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp WITH time zone DEFAULT now(),
    tmsp_last_modification timestamp WITH time zone,
    sys_period tstzrange DEFAULT tstzrange( now(), NULL::timestamp WITH time zone)
);

-------------------------------------------------------------------------
-- 2. MOVE TABLE system_type with versioning table
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('system_type', 'projects', 'system');


-------------------------------------------------------------------------
-- 3. MOVE TABLE ui_context with versioning table
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('ui_context', 'projects', 'system');

-------------------------------------------------------------------------
-- 4. MOVE TABLE class_field with versioning table
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('class_field', 'projects', 'system');

-------------------------------------------------------------------------
-- 5. MOVE TABLE class_field_property_rel with versioning table
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('class_field_property_rel', 'projects', 'system');

-------------------------------------------------------------------------
-- 6. MOVE TABLE class_has_type_property with versioning table
-------------------------------------------------------------------------
SELECT commons.move_entity_child_with_vt_to_schema('class_has_type_property', 'projects', 'system');


-------------------------------------------------------------------------
-- 7. DROP system_type.pk_system_type
-------------------------------------------------------------------------
DROP VIEW IF EXISTS projects.v_system_type_label_text_property;
DROP VIEW IF EXISTS projects.v_project_label_text_property;
ALTER TABLE system.system_type DROP COLUMN pk_system_type;

-------------------------------------------------------------------------
-- 8. RENAME ui_context --> app_context
-------------------------------------------------------------------------
SELECT commons.rename_versioned_table('system', 'ui_context', 'app_context');

-------------------------------------------------------------------------
-- 9. CREATE TABLE system_relevant_class
-------------------------------------------------------------------------
CREATE TABLE system.system_relevant_class (
    fk_class integer NOT NULL,
    required_by_entities boolean,
    required_by_sources boolean,
    required_by_contr_vocabs boolean,
    FOREIGN KEY (fk_class) REFERENCES data_for_history.class (dfh_pk_class)
)
INHERITS (system.entity);
SELECT commons.init_entity_child_table ('system.system_relevant_class');


-------------------------------------------------------------------------
-- 10. CREATE TABLE system_relevant_type
-------------------------------------------------------------------------
CREATE TABLE system.system_relevant_type (
    fk_type integer NOT NULL,
    FOREIGN KEY (fk_type) REFERENCES information.persistent_item (pk_entity)
)
INHERITS (system.entity);
SELECT commons.init_entity_child_table ('system.system_relevant_type');