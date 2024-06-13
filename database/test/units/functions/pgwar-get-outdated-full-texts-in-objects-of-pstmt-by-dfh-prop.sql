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

-- add full text for all entities
INSERT INTO pgwar.entity_full_text (
        pk_entity,
        fk_project,
        full_text
    )
VALUES (31, 123, 'full-text'),
    (11, 123, 'full-text'),
    (32, 999, 'full-text'),
    (12, 999, 'full-text'),
    (33, 543, 'full-text');

PREPARE entities_for_update AS
SELECT pk_entity,
    fk_project
FROM pgwar.get_outdated_full_texts_in_objects_of_pstmt_by_dfh_prop(100);

-- assert no entity for update found
SELECT is_empty(
        'entities_for_update',
        'Assert no project entity needs update'
    );

-- Update three dfh-properties
INSERT INTO data_for_history.api_property(
        tmsp_last_dfh_update,
        dfh_pk_property
    )
VALUES (clock_timestamp(), 522),
    (clock_timestamp(), 523),
    (clock_timestamp(), 524);

SELECT bag_eq(
        'entities_for_update',
        'VALUES (11, 123), (12, 999)',
        'Contains the subject of the statement with modfied property.'
    );

SELECT is(
        count(*)::int,
        1,
        'Assert the limit of 1 is respected'
    )
FROM pgwar.get_outdated_full_texts_in_objects_of_pstmt_by_dfh_prop(1);

SELECT *
FROM finish();

ROLLBACK;