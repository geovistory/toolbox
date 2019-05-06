
-------------------------------------------------------------------------
-- REWORK SCHEMA PROJECTS
-------------------------------------------------------------------------

DROP VIEW projects.v_system_type_label_text_property;
DROP VIEW projects.v_project_label_text_property;


-------------------------------------------------------------------------
-- REWORK SCHEMA DATA
-------------------------------------------------------------------------

ALTER SCHEMA sources RENAME TO data;

-------------------------------------------------------------------------
-- REWORK SCHEMA COMMONS
-------------------------------------------------------------------------

CREATE TABLE commons.text(
    fk_information_entity INTEGER NOT NULL REFERENCES information.entity (pk_entity), fk_digital INTEGER NOT NULL REFERENCES information.entity (pk_entity) quill_doc jsonb NOT NULL CHECK (commons.validate_quill_doc (quill_doc)), versioned boolean, version integer)
INHERITS (
    commons.entity
);

SELECT
    commons.init_entity_child_table ('commons.text');

----------- MIGRATE

UPDATE
    information.digital_object
SET
    js_quill_data = commons.modernize_quill_doc (js_quill_data::jsonb);

UPDATE
    information.digital_object_vt
SET
    js_quill_data = commons.modernize_quill_doc (js_quill_data::jsonb);

----------- DELETE ALL MENTIONINGS ----------------

DELETE FROM information.entity_association ea
WHERE ea.fk_property IN (
        SELECT
            dfh_pk_property
        FROM
            data_for_history.property_profile_view
        WHERE
            dfh_fk_property_of_origin = 1218)
    DELETE FROM information.entity_version_project_rel
    WHERE fk_entity NOT IN (
            SELECT
                pk_entity
            FROM
                information.entity)
            ----------- DELETE ALL CHUNKS ----------------
            DELETE FROM information.chunk;

DELETE FROM information.chunk_vt;

