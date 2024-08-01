-- Test the functions converting literal tables to labels
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(1);

/**
 * Test the get field pages function
 */
SELECT is(
        commons.get_field_pages(
            --Req we want test
            '[
            {
                "pkProject": 345,
                "page": {
                "source": { "fkInfo": 1 },
                "property": {
                    "fkProperty": 1436
                },
                "isOutgoing": false,
                "limit": 1,
                "offset": 0,
                "scope": { "inProject": 345 }
                },
                "targets": {}
            }
        ]'
        ),
        -- Resp we want
        ('{
            "subfieldPages": [
                {
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements": [],
                    "count": 0,
                    "page": {
                        "source": {
                            "fkInfo": 1
                        },
                        "property": {
                            "fkProperty": 1436
                        },
                        "isOutgoing": false,
                        "limit": 1,
                        "offset": 0,
                        "scope": {
                            "inProject": 345
                        }
                    }
                }
            ]
        }')::jsonb,
        'Assert the response contains an empty array of paginated statements'
    );

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;