BEGIN;

SELECT plan(3);

INSERT INTO pgwar.community_statements (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info,
        ord_num_of_domain,
        ord_num_of_range,
        object_label
    )
VALUES 
    (1, 99, 22, 11, 0, 0, 'LABEL'),
    (2, 66, 22, 11, 4, 3, 'LABEL'),
    (3, 44, 22, 11, 4, 3, 'LABEL');


INSERT INTO pgwar.project_statements (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        ord_num_of_domain,
        ord_num_of_range,
        object_label
    )
VALUES 
    (1, 31, 99, 22, 11, 4, 3, 'LABEL'),
    (1, 32, 99, 22, 11, 8, 1, 'LABEL'),
    (2, 31, 66, 22, 11, 4, 3, 'LABEL'),
    (2, 32, 66, 22, 11, 4, 3, 'LABEL');


INSERT INTO pgwar.project_statements_deleted (
        pk_entity,
        fk_project,
        fk_subject_info,
        fk_property,
        fk_object_info,
        tmsp_deletion
    )
VALUES 
    (1, 8765, 99, 22, 11, CURRENT_TIMESTAMP),
    (3, 8765, 44, 22, 11, CURRENT_TIMESTAMP);


-- run the update task
SELECT pgwar.update_community_statements_from_deletes();

SELECT is(
    ord_num_of_domain,
    6::numeric,
    'Assert the ord nums are recalculated for community statement with pk_entity 1'
)
FROM pgwar.community_statements
WHERE pk_entity = 1;

SELECT is_empty(
    'SELECT * FROM pgwar.community_statements WHERE pk_entity = 3;',
    'Assert community statement with pk_entity 3 is deleted'
);

SELECT is(
    offset_tmsp,
    CURRENT_TIMESTAMP,
    'Assert that offset is updated'
)
FROM pgwar.offsets
WHERE job_name = 'update-community-statements-from-deletes';

SELECT *
FROM finish();

ROLLBACK;