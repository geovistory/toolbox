-- Test the creation of project and community entities
-- after modifying information.resource and projects.info_proj_rel
-- Start transaction and plan the tests.
BEGIN;
SELECT plan(1);

INSERT INTO projects.project (pk_entity)
VALUES (33);

INSERT INTO pgwar.entity_preview (
        pk_entity,
        fk_project,
        fk_class,
        entity_label,
        class_label,
        type_label,
        full_text
    )
VALUES (
        22,
        33,
        0,
        'S. Ziminian',
        'Geographical Place',
        'Parrocchia',
        'S. Ziminian"	"Name: S. Ziminian.
Type: Parrocchia.'
    );
-- Assert the fk_class has been updated on the community entity preview
SELECT IS (
        ts_vector,
        'geograph:4B name:8C parrocchia:3B,12C place:5B type:11C ziminian:2A,7C,10C'::tsvector,
        'Assert the ts_vector is set'
    )
FROM pgwar.entity_preview
WHERE fk_project = 33
    AND pk_entity = 22;
-- Finish the tests and clean up.
SELECT *
FROM finish();
ROLLBACK;