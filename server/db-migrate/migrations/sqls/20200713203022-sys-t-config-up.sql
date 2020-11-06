-- 1 (Inherits all for the string from table commons.text)
Create Table system.config (
    key varchar,
    config jsonb,
    entity_version integer Default 1
)
Inherits (
    system.entity
);

-- 2
Select
    commons.init_entity_child_table ('system.config');

-- 3
INSERT INTO system.config (key, config) VALUES (
    'SYS_CONFIG',
    '{
        "classes": {
            "40": {
                "mapsToListType": {
                    "appellation": "true"
                }
            },
            "51": {
                "mapsToListType": {
                    "place": "true"
                }
            },
            "52": {
                "mapsToListType": {
                    "dimension": {
                        "measurementUnitClass": 56
                    }
                }
            },
            "54": {
                "mapsToListType": {
                    "language": "true"
                }
            },
            "335": {
                "mapsToListType": {
                    "timePrimitive": "true"
                }
            },
            "657": {
                "mapsToListType": {
                    "langString": "true"
                }
            }
        }
    }'
)
