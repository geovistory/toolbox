BEGIN;

SELECT plan(1);

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_entity, pk_language, iso6391)
VALUES (44, 'fra', 'fr'),
    (55, 'eng', 'en');

-- Insert two projects associated with the language
INSERT INTO projects.project(pk_entity, fk_language)
VALUES (33, 44);

-- Insert a has type sub property
INSERT INTO data_for_history.api_property (
        dfh_pk_property,
        dfh_property_domain,
        dfh_parent_properties,
        tmsp_last_modification
    )
VALUES (
        654,
        123,
        '{1, 2, 3}', -- 2 = has type
        '2024-01-01 19:46:03.190892+00'
    );

-- Insert a entity preview of class 123
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class)
VALUES (66, 33, 123);

-- Insert a statement of has type sub property 
INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info
    )
VALUES (1, 33, 66, 654, 987654321);


-- run the update task
SELECT pgwar.update_fk_type();

/**
 * Test if all four columns are set
 **/
SELECT is(
        fk_type,
        987654321,
        'Assert that the fk_type is updated'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
AND fk_project = 33;

SELECT *
FROM finish();

ROLLBACK;