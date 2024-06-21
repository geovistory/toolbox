BEGIN;
SELECT plan(3);

INSERT INTO pgwar.project_statements (
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

INSERT INTO pgwar.community_statements (
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
FROM pgwar.get_outdated_full_texts_in_objects_of_stmt(100);

-- Note that (13, 543) is an object_value and does therefore
-- not show up amongst the entities_for_update
SELECT bag_eq(
        'entities_for_update',
        'VALUES (11, 123), (12, 999), (11, 0), (12, 0)',
        'Contains all 2 pairs of project_id and object entity_id.'
    );

-- add full text of two entities
INSERT INTO pgwar.entity_full_text (
        pk_entity,
        fk_project,
        full_text
    )
VALUES (12, 999, 'full-text'),
 (12, 0, 'full-text');

-- Assert that only two entity remains in entities_for_update
SELECT bag_eq(
        'entities_for_update',
        'VALUES (11, 123), (11, 0)',
        'Assert that only two entity remains in entities_for_update.'
    );

INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        object_value
    )
VALUES (4, 44, 31, 522, 11, NULL),
    (5, 44, 32, 523, 12, NULL),
    (6, 44, 33, 524, 14, NULL),
    (7, 44, 33, 524, 15, NULL),
    (8, 44, 33, 524, 16, NULL),
    (9, 44, 33, 524, 17, NULL);

SELECT is(
        count(*)::int,
        3,
        'Assert the limit of 3 is respected'
    )
FROM pgwar.get_outdated_full_texts_in_objects_of_stmt(3);

SELECT *
FROM finish();

ROLLBACK;