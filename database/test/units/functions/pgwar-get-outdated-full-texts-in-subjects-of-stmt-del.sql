BEGIN;
SELECT plan(3);

INSERT INTO pgwar.project_statements_deleted (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_value
    )
VALUES (1, 123, 31, 522, 11, NULL),
    (2, 999, 32, 523, 12, NULL),
    (3, 543, 33, 524, 13, '{}');

INSERT INTO pgwar.community_statements_deleted (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_value
    )
VALUES (1, 31, 522, 11, NULL),
    (2, 32, 523, 12, NULL),
    (3, 33, 524, 13, '{}');


PREPARE entities_for_update AS
SELECT pk_entity,
    fk_project
FROM pgwar.get_outdated_full_texts_in_subjects_of_stmt_del(10);

SELECT bag_eq(
        'entities_for_update',
        'VALUES (31, 123), (32, 999), (33, 543),  (31, 0), (32, 0), (33, 0)',
        'Contains all 6 pairs of project_id and subject entity_id.'
    );

-- add full text for two of the entities
INSERT INTO pgwar.entity_full_text (
        pk_entity,
        fk_project,
        full_text
    )
VALUES (32, 999, 'full-text'),
    (33, 543, 'full-text'),
    (32, 0, 'full-text'),
    (33, 0, 'full-text');

-- Assert that only one entity remains in entities_for_update
SELECT bag_eq(
        'entities_for_update',
        'VALUES (31, 123), (31, 0)',
        'Assert that only one entity remains in entities_for_update.'
    );

INSERT INTO pgwar.project_statements_deleted (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_value
    )
VALUES (4, 44, 31, 522, 11, NULL),
    (5, 44, 32, 523, 12, NULL),
    (6, 44, 33, 524, 13, NULL),
    (7, 44, 33, 524, 13, NULL),
    (8, 44, 33, 524, 13, NULL),
    (9, 44, 33, 524, 13, NULL);

SELECT is(
        count(*)::int,
        3,
        'Assert the limit of 3 is respected'
    )
FROM pgwar.get_outdated_full_texts_in_subjects_of_stmt_del(3);

SELECT *
FROM finish();

ROLLBACK;