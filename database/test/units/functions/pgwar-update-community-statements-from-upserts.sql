BEGIN;

SELECT plan(3);


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
            (2, 32, 66, 22, 11, 4, 3, 'LABEL'),
            (3, 31, 44, 22, 11, 4, 3, 'LABEL'),
            (3, 32, 44, 22, 11, 4, 3, 'LABEL'),
            (3, 33, 44, 22, 11, 4, 3, 'LABEL');

-- run the update task
SELECT pgwar.update_community_statements_from_upserts();

SELECT is(
    count(*),
    3::bigint,
    'Assert that 3 community statments were created'
)
FROM pgwar.community_statements;

SELECT is(
    ord_num_of_domain,
    6::numeric,
    'Assert that ord_num_of_domain is correctly calulated'
)
FROM pgwar.community_statements
WHERE pk_entity = 1;


SELECT is(
    offset_tmsp,
    CURRENT_TIMESTAMP,
    'Assert that offset is updated'
)
FROM pgwar.offsets
WHERE job_name = 'update-community-statements-from-upserts';

SELECT *
FROM finish();

ROLLBACK;