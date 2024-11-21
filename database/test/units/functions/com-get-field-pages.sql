-- Test the functions converting literal tables to labels
-- Start transaction and plan the tests.
BEGIN;

SELECT plan(4);

/**
 * Add Mock Data
 */
-- Insert a language for the following project
INSERT INTO information.language(pk_entity, pk_language)
VALUES (1234, 'eng');

-- Insert a project that we can use to add data to
INSERT INTO projects.project (pk_entity, fk_language)
VALUES (345, 1234);

-- Insert an entity Person "1" 
INSERT INTO information.resource (pk_entity, fk_class)
VALUES (1, 21);

-- Insert an entity Person "2" 
INSERT INTO information.resource (pk_entity, fk_class)
VALUES (2, 21);

-- Insert an entity Relationship "3" 
INSERT INTO information.resource (pk_entity, fk_class)
VALUES (3, 633);

-- Insert a statement "3" "has partner" "1" 
INSERT INTO information.statement (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info
    )
VALUES (101, 3, 1436, 1);

-- Insert a statement "3" "has partner" "2" 
INSERT INTO information.statement (
        pk_entity,
        fk_subject_info,
        fk_property,
        fk_object_info
    )
VALUES (102, 3, 1436, 2);

-- Add everything to the project
INSERT INTO projects.info_proj_rel (pk_entity, fk_entity, fk_project, is_in_project, ord_num_of_range)
VALUES (201, 1, 345, true, NULL),
    (202, 2, 345, true, NULL),
    (203, 3, 345, true, NULL),
    (204, 101, 345, true, 1),
    (205, 102, 345, true, 2);

SELECT is(
        commons.get_field_pages(
            '
        [
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
                "targets": {
                "633": {
                    "nestedResource": [
                        {
                            "targets": {},
                            "page": {
                                "property": {
                                    "fkProperty": 1436
                                },
                                "isOutgoing": true,
                                "limit": 1,
                                "offset": 0,
                                "isCircular": true
                            }
                        }
                    ]
                    }
                }
            }
        ]'
        ),
        ('{
            "subfieldPages": [ 
                {
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements": [
                        {
                            "projRel": {
                                "fk_entity": 101,
                                "pk_entity": 204,
                                "fk_project": 345,
                                "is_in_project": true,
                                "ord_num_of_range": 1
                            },
                            "isOutgoing": false,
                            "target": {
                                "entity": {
                                    "resource": {
                                        "fk_class": 633,
                                        "pk_entity": 3
                                    },
                                    "entityPreview": {
                                        "fk_class": 633,
                                        "pk_entity": 3,
                                        "fk_project": 345,
                                        "tmsp_last_modification": "' || (json_build_object('x', now())->>'x')::text || '"
                                    }
                                }
                            },
                            "targetClass": 633,
                            "statement": {
                                "pk_entity": 101,
                                "fk_property": 1436,
                                "fk_object_data": 0,
                                "fk_object_info": 1,
                                "fk_subject_data": 0,
                                "fk_subject_info": 3,
                                "is_in_project_count": 1,
                                "fk_object_tables_row": 0,
                                "fk_object_tables_cell": 0,
                                "fk_subject_tables_row": 0,
                                "fk_subject_tables_cell": 0,
                                "fk_property_of_property": 0,
                                "is_standard_in_project_count": 0
                            }
                        }
                    ],
                    "count": 1,
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
                },
                {
                    "validFor":  "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements": [
                        {
                            "projRel": {
                                "fk_entity": 101,
                                "pk_entity": 204,
                                "fk_project": 345,
                                "is_in_project": true,
                                "ord_num_of_range": 1
                            },
                            "isOutgoing": true,
                            "ordNum": 1,
                            "target": {
                                "entity": {
                                    "resource": {
                                        "fk_class": 21,
                                        "pk_entity": 1
                                    },
                                    "entityPreview": {
                                        "fk_class": 21,
                                        "pk_entity": 1,
                                        "fk_project": 345,
                                        "tmsp_last_modification":  "' || (json_build_object('x', now())->>'x')::text || '"
                                    }
                                }
                            },
                            "targetClass": 21,
                            "statement": {
                                "pk_entity": 101,
                                "fk_property": 1436,
                                "fk_object_data": 0,
                                "fk_object_info": 1,
                                "fk_subject_data": 0,
                                "fk_subject_info": 3,
                                "is_in_project_count": 1,
                                "fk_object_tables_row": 0,
                                "fk_object_tables_cell": 0,
                                "fk_subject_tables_row": 0,
                                "fk_subject_tables_cell": 0,
                                "fk_property_of_property": 0,
                                "is_standard_in_project_count": 0
                            }
                        }
                    ],
                    "count": 2,
                    "page": {
                        "source": {
                            "fkInfo": 3
                        },
                        "property": {
                            "fkProperty": 1436
                        },
                        "isOutgoing": true,
                        "limit": 1,
                        "offset": 0,
                        "scope": {
                            "inProject": 345
                        },
                        "isCircular": true
                    }
                }
            ]
        }'
        )::jsonb,
        'Assert the nested resource is loaded recursively in project scope'
    );



SELECT is(
        commons.get_field_pages(
            '
                [
                    {
                    "pkProject": 99,
                        "page": {
                        "source": { "fkInfo": 1 },
                        "property": {
                            "fkProperty": 1436
                        },
                        "isOutgoing": false,
                        "limit": 1,
                        "offset": 0,
                        "scope": { "notInProject": 99 }
                        },
                        "targets": {
                        "633": {
                            "nestedResource": [
                                {
                                    "targets": {},
                                    "page": {
                                        "property": {
                                            "fkProperty": 1436
                                        },
                                        "isOutgoing": true,
                                        "limit": 1,
                                        "offset": 0,
                                        "isCircular": true
                                    }
                                }
                            ]
                            }
                        }
                    }
                ]'
                ),
                ('{
            "subfieldPages": [
                {
                    "page": {
                        "limit": 1,
                        "scope": {
                            "inRepo": true
                        },
                        "offset": 0,
                        "source": {
                            "fkInfo": 3
                        },
                        "property": {
                            "fkProperty": 1436
                        },
                        "isCircular": true,
                        "isOutgoing": true
                    },
                    "count": 2,
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements": [
                        {
                            "target": {
                                "entity": {
                                    "resource": {
                                        "fk_class": 21,
                                        "pk_entity": 1
                                    }
                                }
                            },
                            "statement": {
                                "pk_entity": 101,
                                "fk_property": 1436,
                                "fk_object_data": 0,
                                "fk_object_info": 1,
                                "fk_subject_data": 0,
                                "fk_subject_info": 3,
                                "is_in_project_count": 1,
                                "fk_object_tables_row": 0,
                                "fk_object_tables_cell": 0,
                                "fk_subject_tables_row": 0,
                                "fk_subject_tables_cell": 0,
                                "fk_property_of_property": 0,
                                "is_standard_in_project_count": 0
                            },
                            "isOutgoing": true,
                            "targetClass": 21
                        }
                    ]
                },
                {
                    "page": {
                        "limit": 1,
                        "scope": {
                            "notInProject": 99
                        },
                        "offset": 0,
                        "source": {
                            "fkInfo": 1
                        },
                        "property": {
                            "fkProperty": 1436
                        },
                        "isOutgoing": false
                    },
                    "count": 1,
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements": [
                        {
                            "target": {
                                "entity": {
                                    "resource": {
                                        "fk_class": 633,
                                        "pk_entity": 3
                                    }
                                }
                            },
                            "statement": {
                                "pk_entity": 101,
                                "fk_property": 1436,
                                "fk_object_data": 0,
                                "fk_object_info": 1,
                                "fk_subject_data": 0,
                                "fk_subject_info": 3,
                                "is_in_project_count": 1,
                                "fk_object_tables_row": 0,
                                "fk_object_tables_cell": 0,
                                "fk_subject_tables_row": 0,
                                "fk_subject_tables_cell": 0,
                                "fk_property_of_property": 0,
                                "is_standard_in_project_count": 0
                            },
                            "isOutgoing": false,
                            "targetClass": 633
                        }
                    ]
                }
            ]
        }'
        )::jsonb,
        'Assert the nested resource is loaded recursively not in project scope'
    );



SELECT is(
        commons.get_field_pages(
            '
        [
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
                "scope": { "inRepo": true }
                },
                "targets": {
                "633": {
                    "nestedResource": [
                        {
                            "targets": {},
                            "page": {
                                "property": {
                                    "fkProperty": 1436
                                },
                                "isOutgoing": true,
                                "limit": 1,
                                "offset": 0,
                                "isCircular": true
                            }
                        }
                    ]
                    }
                }
            }
        ]'
        ),
        ('{
            "subfieldPages":[
                {
                    "page":{
                        "limit":1,
                        "scope":{
                            "inRepo":true
                        },
                        "offset":0,
                        "source":{
                            "fkInfo":1
                        },
                        "property":{
                            "fkProperty":1436
                        },
                        "isOutgoing":false
                    },
                    "count":1,
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements":[
                        {
                            "target":{
                                "entity":{
                                    "resource":{
                                        "fk_class":633,
                                        "pk_entity":3
                                    }
                                }
                            },
                            "statement":{
                                "pk_entity":101,
                                "fk_property":1436,
                                "fk_object_data":0,
                                "fk_object_info":1,
                                "fk_subject_data":0,
                                "fk_subject_info":3,
                                "is_in_project_count":1,
                                "fk_object_tables_row":0,
                                "fk_object_tables_cell":0,
                                "fk_subject_tables_row":0,
                                "fk_subject_tables_cell":0,
                                "fk_property_of_property":0,
                                "is_standard_in_project_count":0
                            },
                            "isOutgoing":false,
                            "targetClass":633
                        }
                    ]
                },
                {
                    "page":{
                        "limit":1,
                        "scope":{
                            "inRepo":true
                        },
                        "offset":0,
                        "source":{
                            "fkInfo":3
                        },
                        "property":{
                            "fkProperty":1436
                        },
                        "isCircular":true,
                        "isOutgoing":true
                    },
                    "count":2,
                    "validFor": "' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements":[
                        {
                            "target":{
                                "entity":{
                                    "resource":{
                                        "fk_class":21,
                                        "pk_entity":1
                                    }
                                }
                            },
                            "statement":{
                                "pk_entity":101,
                                "fk_property":1436,
                                "fk_object_data":0,
                                "fk_object_info":1,
                                "fk_subject_data":0,
                                "fk_subject_info":3,
                                "is_in_project_count":1,
                                "fk_object_tables_row":0,
                                "fk_object_tables_cell":0,
                                "fk_subject_tables_row":0,
                                "fk_subject_tables_cell":0,
                                "fk_property_of_property":0,
                                "is_standard_in_project_count":0
                            },
                            "isOutgoing":true,
                            "targetClass":21
                        }
                    ]
                }
            ]
        }'
        )::jsonb,
        'Assert the nested resource is loaded recursively for inRepo scope'
    );


-- remark: there is a typo in noContraint
SELECT is(
        commons.get_field_pages(
            '
        [
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
                "scope": { "noContraint": true }
                },
                "targets": {
                "633": {
                    "nestedResource": [
                        {
                            "targets": {},
                            "page": {
                                "property": {
                                    "fkProperty": 1436
                                },
                                "isOutgoing": true,
                                "limit": 1,
                                "offset": 0,
                                "isCircular": true
                            }
                        }
                    ]
                    }
                }
            }
        ]'
        ),
        ('{
            "subfieldPages":[
                {
                    "page":{
                        "limit":1,
                        "scope":{
                            "noContraint":true
                        },
                        "offset":0,
                        "source":{
                            "fkInfo":1
                        },
                        "property":{
                            "fkProperty":1436
                        },
                        "isOutgoing":false
                    },
                    "count":1,
                    "validFor":"' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements":[
                        {
                            "target":{
                                "entity":{
                                    "resource":{
                                        "fk_class":633,
                                        "pk_entity":3
                                    }
                                }
                            },
                            "statement":{
                                "pk_entity":101,
                                "fk_property":1436,
                                "fk_object_data":0,
                                "fk_object_info":1,
                                "fk_subject_data":0,
                                "fk_subject_info":3,
                                "is_in_project_count":1,
                                "fk_object_tables_row":0,
                                "fk_object_tables_cell":0,
                                "fk_subject_tables_row":0,
                                "fk_subject_tables_cell":0,
                                "fk_property_of_property":0,
                                "is_standard_in_project_count":0
                            },
                            "isOutgoing":false,
                            "targetClass":633
                        }
                    ]
                },
                {
                    "page":{
                        "limit":1,
                        "scope":{
                            "noContraint":true
                        },
                        "offset":0,
                        "source":{
                            "fkInfo":3
                        },
                        "property":{
                            "fkProperty":1436
                        },
                        "isCircular":true,
                        "isOutgoing":true
                    },
                    "count":2,
                    "validFor":"' || (json_build_object('x', now())->>'x')::text || '",
                    "paginatedStatements":[
                        {
                            "target":{
                                "entity":{
                                    "resource":{
                                        "fk_class":21,
                                        "pk_entity":1
                                    }
                                }
                            },
                            "statement":{
                                "pk_entity":101,
                                "fk_property":1436,
                                "fk_object_data":0,
                                "fk_object_info":1,
                                "fk_subject_data":0,
                                "fk_subject_info":3,
                                "is_in_project_count":1,
                                "fk_object_tables_row":0,
                                "fk_object_tables_cell":0,
                                "fk_subject_tables_row":0,
                                "fk_subject_tables_cell":0,
                                "fk_property_of_property":0,
                                "is_standard_in_project_count":0
                            },
                            "isOutgoing":true,
                            "targetClass":21
                        }
                    ]
                }
            ]
        }'
        )::jsonb,
        'Assert the nested resource is loaded recursively for no constraint scope'
    );



-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;