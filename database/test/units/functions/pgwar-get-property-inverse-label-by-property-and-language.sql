BEGIN;

SELECT plan(4);

INSERT INTO data_for_history.api_property(
        tmsp_last_dfh_update,
        dfh_pk_property,
        dfh_property_label_language,
        dfh_property_inverse_label
    )
VALUES (
        '2023-06-12 07:54:29.142429+00',
        123,
        'fr',
        'est en propriété de'
    ),
    (
        '2024-06-12 07:54:29.142429+00',
        123,
        'fr',
        'est en possession de'
    ),
    (
        '2024-06-12 07:54:29.142429+00',
        123,
        'en',
        'is owned by'
    );

SELECT is(
        'is owned by',
        pgwar.get_property_inverse_label(123, 'en'),
        'Assert the english label is returned'
    );

SELECT is(
        'est en possession de',
        pgwar.get_property_inverse_label(123, 'fr'),
        'Assert the most recent french label is returned'
    );

SELECT is(
        'is owned by',
        pgwar.get_property_inverse_label(123, 'de'),
        'Assert the fallback is english'
    );

SELECT is(
        NULL,
        pgwar.get_property_inverse_label(999, 'en'),
        'Assert the NULL is returned for non-existing property'
    );


SELECT *
FROM finish();

ROLLBACK;