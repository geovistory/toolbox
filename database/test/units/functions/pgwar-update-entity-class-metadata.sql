BEGIN;

SELECT plan(10);

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_entity, pk_language, iso6391)
VALUES (44, 'fra', 'fr'),
    (55, 'eng', 'en');

-- Insert two projects associated with the language
INSERT INTO projects.project(pk_entity, fk_language)
VALUES (33, 44);

-- Insert class 123
INSERT INTO data_for_history.api_class (
        dfh_pk_class,
        dfh_class_label,
        dfh_class_label_language,
        dfh_parent_classes,
        dfh_ancestor_classes,
        removed_from_api,
        tmsp_last_modification
    )
VALUES (
        123,
        'My Class',
        'en',
        '{1, 2, 3}',
        '{4, 5, 6}',
        false,
        '2024-01-01 19:46:03.190892+00'
    );

-- Insert a entity preview of class 123
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class)
VALUES (66, 33, 123);

-- run the update task
SELECT pgwar.update_entity_class();

/**
 * Test if all four columns are set
 **/
SELECT is(
        parent_classes,
        '[1, 2, 3]',
        'Assert that the parent classes are added'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

SELECT is(
        ancestor_classes,
        '[4, 5, 6]',
        'Assert that the ancestor classes are added'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

SELECT is(
        class_label,
        'My Class',
        'Assert that the class_label is added'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

SELECT is(
        entity_type,
        'teEn',
        'Assert that the entit type is added'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

/**
 * Test if class_modified timestamp is correctly compared with offset
 **/
-- Insert class 123 with current timestamp
INSERT INTO data_for_history.api_class (
        dfh_pk_class,
        dfh_class_label,
        dfh_class_label_language,
        dfh_parent_classes,
        dfh_ancestor_classes,
        removed_from_api,
        tmsp_last_modification
    )
VALUES (
        123,
        'Ma classe',
        'fr',
        '{1, 2, 3}',
        '{4, 5, 6}',
        false,
        CURRENT_TIMESTAMP
    );

-- Should not update anything because _offset is CURRENT_TIMESTAMP
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'My Class',
        'Assert that the class_label is unchanged'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

-- artificially set offset to older timestamp
UPDATE pgwar.offsets
SET offset_tmsp = CURRENT_TIMESTAMP - INTERVAL '1 minute';

-- Should update because _offset older than CURRENT_TIMESTAMP'
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'Ma classe',
        'Assert that the class_label is updated'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

/**
 * Test if project_modified timestamp is correctly compared with offset
 **/
-- change project language
UPDATE projects.project
SET fk_language = 55
WHERE pk_entity = 33;

-- Should not update anything because _offset is CURRENT_TIMESTAMP
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'Ma classe',
        'Assert that the class_label is unchanged'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

-- artificially set offset to older timestamp
UPDATE pgwar.offsets
SET offset_tmsp = CURRENT_TIMESTAMP - INTERVAL '1 minute';

-- Should update because _offset older than CURRENT_TIMESTAMP'
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'My Class',
        'Assert that the class_label is updated'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

/**
 * Test if tmsp_fk_class_modification timestamp is correctly compared with offset
 **/
-- Switch class of entity
SELECT pgwar.upsert_entity_preview_fk_class(66, 33, 456);

-- Insert class 456
INSERT INTO data_for_history.api_class (
        dfh_pk_class,
        dfh_class_label,
        dfh_class_label_language,
        dfh_parent_classes,
        dfh_ancestor_classes,
        removed_from_api,
        tmsp_last_modification
    )
VALUES (
        456,
        'New Class',
        'en',
        '{99}',
        '{100}',
        false,
        '2024-01-01 19:46:03.190892+00'
    );

-- Should not update anything because _offset is CURRENT_TIMESTAMP
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'My Class',
        'Assert that the class_label is unchanged'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

-- artificially set offset to older timestamp
UPDATE pgwar.offsets
SET offset_tmsp = CURRENT_TIMESTAMP - INTERVAL '1 minute';

-- Should update class metadata with new class
SELECT pgwar.update_entity_class();

SELECT is(
        class_label,
        'New Class',
        'Assert that the class_label of new class is set'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 66
    AND fk_project = 33;

SELECT *
FROM finish();

ROLLBACK;