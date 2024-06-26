BEGIN;

SELECT plan(4);

INSERT INTO data_for_history.api_property(
        tmsp_last_dfh_update,
        dfh_pk_property,
        dfh_property_label_language,
        dfh_property_label
    )
VALUES (
        '2023-06-12 07:54:29.142429+00',
        123,
        'fr',
        'dispose de'
    ),
    (
        '2024-06-12 07:54:29.142429+00',
        123,
        'fr',
        'possède'
    ),
    (
        '2024-06-12 07:54:29.142429+00',
        123,
        'en',
        'owns'
    );

SELECT is(
        'owns',
        pgwar.get_property_label(123, 'en'),
        'Assert the english label is returned'
    );

SELECT is(
        'possède',
        pgwar.get_property_label(123, 'fr'),
        'Assert the most recent french label is returned'
    );

SELECT is(
        'owns',
        pgwar.get_property_label(123, 'de'),
        'Assert the fallback is english'
    );

SELECT is(
        NULL,
        pgwar.get_property_label(999, 'en'),
        'Assert the NULL is returned for non-existing property'
    );

SELECT *
FROM finish();

ROLLBACK;