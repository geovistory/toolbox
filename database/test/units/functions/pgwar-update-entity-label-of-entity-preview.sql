BEGIN;

SELECT plan(1);

INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class, entity_label)
VALUES (31, 1, 88, 'Entity 31');

SELECT pgwar.update_entity_label_of_entity_preview(31, 1, 'Foo');

-- Test 2: Check if function update entity label
SELECT is(
        entity_label,
        'Foo',
        'update_entity_label_of_entity_preview updates entity label'
    )
FROM pgwar.entity_preview
WHERE pk_entity = 31
    AND fk_project = 1;

SELECT *
FROM finish();

ROLLBACK;