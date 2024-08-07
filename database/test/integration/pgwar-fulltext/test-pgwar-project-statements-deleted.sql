-- Test the pgwar.project_statements module
BEGIN;

SELECT plan(4);

INSERT INTO pgwar.project_statements (
              pk_entity,
              fk_project,
              fk_subject_info,
              fk_property,
              fk_object_info
       )
VALUES (1, 1, 31, 22, 11),
       (2, 1, 32, 22, 11),
       (3, 1, 33, 22, 11);

SELECT is(
              count(*)::int,
              3,
              'Assert pgwar project statement has three records'
       )
FROM pgwar.project_statements;

SELECT is(
              count(*)::int,
              0,
              'Assert pgwar project statement deleted has 0 records'
       )
FROM pgwar.project_statements_deleted;

-- delete one project statement
DELETE FROM pgwar.project_statements
WHERE pk_entity = 3;

SELECT is(
              count(*)::int,
              1,
              'Assert pgwar project statement deleted has 1 record'
       )
FROM pgwar.project_statements_deleted;

SELECT is(
              CURRENT_TIMESTAMP,
              tmsp_deletion,
              'Assert the deleted record has the transaction timestamp'
       )
FROM pgwar.project_statements_deleted;

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;