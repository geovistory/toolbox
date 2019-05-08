------------------------------------------------------------------------------------------------------------
-- 1. TABULA RASA for SCHEMA data
------------------------------------------------------------------------------------------------------------

DROP SCHEMA data CASCADE; -- no way back, but no ploblem since never used.
CREATE SCHEMA data;


------------------------------------------------------------------------------------------------------------
-- 2. TABLE entity
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.entity
  (
    pk_entity serial PRIMARY KEY,
    schema_name character varying NOT NULL,
    table_name character varying NOT NULL,
    entity_version integer NOT NULL,
    notes text,
    fk_namespace integer,
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone DEFAULT now(),
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange DEFAULT tstzrange(now(), NULL::timestamp with time zone),
    metadata jsonb
  );


------------------------------------------------------------------------------------------------------------
-- 3. Move digital_object here
------------------------------------------------------------------------------------------------------------
ALTER TABLE information.digital_object ADD COLUMN fk_namespace integer;
ALTER TABLE information.digital_object_vt ADD COLUMN fk_namespace integer;
SELECT commons.move_entity_child_with_vt_to_schema('digital_object', 'information', 'data');


------------------------------------------------------------------------------------------------------------
-- 4. Rename digital_object --> digital
------------------------------------------------------------------------------------------------------------
SELECT commons.rename_versioned_table('data', 'digital_object', 'digital');


------------------------------------------------------------------------------------------------------------
-- 5. Make digital a child of text
-------------------------------------------------------------------------

DELETE FROM data.digital WHERE js_quill_data::jsonb = '{}'::jsonb; -- no way back: Loss of history
DELETE FROM data.digital_vt; 
SELECT commons.reinit_versioning_triggers('data.digital');
SELECT commons.make_versioned_table_child_of_text('data.digital');
UPDATE data.digital SET quill_doc = commons.modernize_quill_doc(js_quill_data::jsonb);
UPDATE data.digital SET entity_version = 1;
DELETE FROM data.digital_vt; -- no way back: Loss of history

-------------------------------------------------------------------------
-- 6. Mark unused digital columns as deprecated
-------------------------------------------------------------------------
ALTER TABLE data.digital RENAME COLUMN pk_digital_object TO _deprecated_pk_digital_object;
ALTER TABLE data.digital_vt RENAME COLUMN pk_digital_object TO _deprecated_pk_digital_object;
ALTER TABLE data.digital RENAME COLUMN js_quill_data TO _deprecated_js_quill_data;
ALTER TABLE data.digital_vt RENAME COLUMN js_quill_data TO _deprecated_js_quill_data;

-------------------------------------------------------------------------
-- 7. Table digital, add column fk_system_type
-------------------------------------------------------------------------
ALTER TABLE data.digital ADD COLUMN fk_system_type INT REFERENCES system.system_type (pk_entity);

-------------------------------------------------------------------------
-- 8. Delete all mentionings and chunks --- No way back, loss of data
-------------------------------------------------------------------------
DELETE FROM information.entity_association ea
WHERE ea.fk_property IN (
        SELECT dfh_pk_property
        FROM data_for_history.property_profile_view
        WHERE dfh_fk_property_of_origin = 1218);

DELETE FROM information.chunk;
DELETE FROM information.chunk_vt;

-- Cleanup info_proj_rel
DELETE FROM projects.info_proj_rel
WHERE fk_entity NOT IN ( SELECT pk_entity FROM information.entity);

-------------------------------------------------------------------------
-- 9. Drop function v_chunk_find_or_create
-------------------------------------------------------------------------
DROP TRIGGER on_insert ON information.v_chunk;
DROP FUNCTION information.v_chunk_find_or_create();

-------------------------------------------------------------------------
-- 10. DROP View and Table Chunk
-------------------------------------------------------------------------
DROP VIEW information.v_chunk;
DROP TABLE information.chunk_vt;
DROP TABLE information.chunk;