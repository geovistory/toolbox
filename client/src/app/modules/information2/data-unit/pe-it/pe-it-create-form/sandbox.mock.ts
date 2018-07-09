import { DfhClass, DfhLabel, DfhProperty, InfRole, InfPersistentItem, InfTemporalEntity, InfEntityProjectRel } from "app/core";
import { PeItDetail, RoleDetail, RoleSet } from "../../../information.models";
import { DfhConfig } from "../../../shared/dfh-config";

export const mockPerson: PeItDetail = {
    peIt: {
        fk_class: 1
    } as InfPersistentItem,
    dfhClass: {
        dfh_pk_class: 1,
        dfh_standard_label: 'Person'
    } as DfhClass,
    ingoingRoleSets: [],
    outgoingRoleSets: [],
    _children: {
        _role_set_1: new  RoleSet( {
            label: {
                default: 'Names',
                sg: 'Name',
                pl: 'Names'
            },
            property: {
                "dfh_pk_property": 1,
                "dfh_identifier_in_namespace": "R63",
                "dfh_has_domain": 3,
                "dfh_has_range": 1,
                "dfh_standard_label": "Named",
                "dfh_domain_instances_min_quantifier": 0,
                "dfh_domain_instances_max_quantifier": -1,
                "dfh_range_instances_min_quantifier": 0,
                "dfh_range_instances_max_quantifier": -1,
            } as DfhProperty,
            _role_list: {
                _role_detail_1: {
                    role: {
                        fk_property: DfhConfig.PROPERTY_PK_R63_NAMES,
                        entity_version_project_rels: [{
                            is_standard_in_project: true
                        }]
                    } as InfRole,
                    _teEnt: {
                        dfhClass: {
                            dfh_pk_class: 3,
                            dfh_identifier_in_namespace: "F52",
                            dfh_standard_label: "Name Use Activity",
                        } as DfhClass,
                        _children: {
                            _role_set_1: new  RoleSet({
                                label: {
                                    default: 'Detailed Name',
                                    sg: 'Detailed Name',
                                    pl: 'Detailed Names'
                                },
                                property: {
                                    "dfh_pk_property": 2,
                                    "dfh_identifier_in_namespace": "R64",
                                    "dfh_has_domain": 3,
                                    "dfh_has_range": 2,
                                    "dfh_standard_label": "Used Name",
                                    "dfh_domain_instances_min_quantifier": 0,
                                    "dfh_domain_instances_max_quantifier": -1,
                                    "dfh_range_instances_min_quantifier": 1,
                                    "dfh_range_instances_max_quantifier": 1,
                                } as DfhProperty,
                                _role_list: {
                                    _role_1: {
                                        role: {
                                            fk_property: DfhConfig.PROPERTY_PK_R64_USED_NAME,
                                            appellation: {
                                                fk_class: DfhConfig.CLASS_PK_APPELLATION
                                            }
                                        } as InfRole,
                                        _appe: {
                                        }
                                    } as RoleDetail
                                },
                            })
                        }
                    }
                }
            }
        })
    }
}



export const generatedMockPerson = {
    "selectPropState": "init",
    "peIt": {
        "fk_class": 363,
        "pi_roles": [
            {
                "entity_version_project_rels": [
                    {
                        "is_standard_in_project": true
                    } as InfEntityProjectRel
                ],
                "fk_property": 1194,
                "temporal_entity": {
                    "fk_class": 365
                }
            } as InfRole
        ]
    } as InfPersistentItem,
    "fkClass": 363,
    "dfhClass": {
        "dfh_pk_class": 363,
        "dfh_identifier_in_namespace": "histC8",
        "dfh_standard_label": "Geographical Place",
        "pk_entity": 97,
        "entity_version": 2,
        "notes": null,
        "tmsp_creation": "2018-04-16T22:06:42.020Z",
        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)",
        "text_properties": [
            {
                "dfh_pk_text_property": 1340,
                "dfh_text_property": "This class refers to portions of the surface of the Earth intended as constellations of matter which can be represented by photographs, paintings and maps. The relevant portion of the surface of the Earth can be covered by water (river, sea, ...). The more specific identity of instances of this class is provided by a controlled vocabulary of geographical place types.",
                "dfh_language_iso_code": "en",
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_fk_property": null,
                "dfh_fk_namespace": null,
                "dfh_fk_class": 363,
                "dfh_fk_project": null,
                "dfh_fk_class_type": null,
                "dfh_fk_property_type": null,
                "dfh_fk_system_type": null,
                "dfh_fk_entity_association": null,
                "dfh_fk_profile": null,
                "dfh_fk_is_subclass_of": null,
                "pk_entity": 195,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-16T22:06:46.433Z",
                "tmsp_last_modification": "2018-06-14T06:50:15.859Z",
                "sys_period": "[\"2018-06-14 06:50:15.859133+00\",)"
            }
        ]
    },
    "_children": {
        "_1194_ingoing": {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1194,
                "dfh_identifier_in_namespace": "histP9",
                "dfh_has_domain": 365,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "isAppellationOf",
                "dfh_fk_property_of_origin": 1111,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 661,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 365,
            "targetClass": {
                "dfh_pk_class": 365,
                "dfh_identifier_in_namespace": "histC10",
                "dfh_standard_label": "Appellation for language",
                "pk_entity": 569,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-19T17:14:58.782Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            },
            "toggle": "collapsed",
            "_role_list": {
                "_undefined": {
                    "role": {
                        "entity_version_project_rels": [
                            {
                                "is_standard_in_project": true
                            } as InfEntityProjectRel
                        ],
                        "fk_property": 1194,
                        "temporal_entity": {
                            "fk_class": 365
                        }
                    },
                    "isCircular": false,
                    "isOutgoing": false,
                    "targetDfhClass": {
                        "dfh_pk_class": 365,
                        "dfh_identifier_in_namespace": "histC10",
                        "dfh_standard_label": "Appellation for language",
                        "pk_entity": 569,
                        "entity_version": 2,
                        "notes": null,
                        "tmsp_creation": "2018-04-19T17:14:58.782Z",
                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                    },
                    "isDisplayRoleForRange": true,
                    "isDisplayRoleForDomain": null,
                    "_teEnt": {
                        "selectPropState": "init",
                        "toggle": "collapsed",
                        "teEnt": {
                            "fk_class": 365
                        } as InfTemporalEntity,
                        "fkClass": 365,
                        "dfhClass": {
                            "dfh_pk_class": 365,
                            "dfh_identifier_in_namespace": "histC10",
                            "dfh_standard_label": "Appellation for language",
                            "pk_entity": 569,
                            "entity_version": 2,
                            "notes": null,
                            "tmsp_creation": "2018-04-19T17:14:58.782Z",
                            "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                            "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)",
                            "text_properties": [
                                {
                                    "dfh_pk_text_property": 1354,
                                    "dfh_text_property": "This class refers to the fact that an entity (actor, group, concept, etc.) can be identified using a specific appellation in a language during a given time span. In other words, the class doesn't refer to the activity of continously or repetedly naming an entity with this specific appellation, but to the possibility of identifying the entity with the given appellation in a given language. The appellation is in this sense a property of the entity for a given time and a given language, and this class is to be intended as an object-specific condition of the entity at a given time (e.g. a pope is called with his function name only after his election).\n\nThe FRBRoo class F52_Name_Use_Activity models the activity actually carried out by a person or a group to use a given appellation, which is a distinct phenomenon. F52_Name_Use_Activity is a subclass of activity while the present class is about the given possibility (by use or by law) of using an appellation for identifying a given entity.",
                                    "dfh_language_iso_code": "en",
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_fk_property": null,
                                    "dfh_fk_namespace": null,
                                    "dfh_fk_class": 365,
                                    "dfh_fk_project": null,
                                    "dfh_fk_class_type": null,
                                    "dfh_fk_property_type": null,
                                    "dfh_fk_system_type": null,
                                    "dfh_fk_entity_association": null,
                                    "dfh_fk_profile": null,
                                    "dfh_fk_is_subclass_of": null,
                                    "pk_entity": 571,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-19T17:14:59.587Z",
                                    "tmsp_last_modification": "2018-04-19T17:14:59.587Z",
                                    "sys_period": "[\"2018-04-19 17:14:59.587379+00\",)"
                                }
                            ]
                        },
                        "_children": {
                            "_1113_outgoing": {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1113,
                                    "dfh_identifier_in_namespace": "histP11",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 40,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "refersToName",
                                    "dfh_fk_property_of_origin": null,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 579,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-19T17:15:00.806Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:18.423Z",
                                    "sys_period": "[\"2018-06-14 06:50:18.423339+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 40,
                                "targetClass": {
                                    "dfh_pk_class": 40,
                                    "dfh_identifier_in_namespace": "E41",
                                    "dfh_standard_label": "Appellation",
                                    "pk_entity": 87,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                },
                                "toggle": "collapsed",
                                "_role_list": {
                                    "_undefined": {
                                        "role": {
                                            "entity_version_project_rels": [
                                                {
                                                    "is_standard_in_project": true
                                                } as InfEntityProjectRel
                                            ],
                                            "fk_property": 1113,
                                            "appellation": {
                                                "appellation_label": {
                                                    "tokens": [
                                                        {
                                                            "id": 0,
                                                            "string": "Max",
                                                            "isSeparator": false
                                                        }
                                                    ],
                                                    "latestTokenId": 0
                                                },
                                                "fk_class": 40
                                            }
                                        },
                                        "isCircular": false,
                                        "isOutgoing": true,
                                        "targetDfhClass": {
                                            "dfh_pk_class": 40,
                                            "dfh_identifier_in_namespace": "E41",
                                            "dfh_standard_label": "Appellation",
                                            "pk_entity": 87,
                                            "entity_version": 2,
                                            "notes": null,
                                            "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                            "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                            "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                        },
                                        "isDisplayRoleForRange": true,
                                        "isDisplayRoleForDomain": null,
                                        "_appe": {
                                            "appellation": {
                                                "appellation_label": {
                                                    "tokens": [
                                                        {
                                                            "id": 0,
                                                            "string": "Max",
                                                            "isSeparator": false
                                                        }
                                                    ]
                                                },
                                                "fk_class": 40
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "_existenceTime": {
                            "roles": [
                                {
                                    "entity_version_project_rels": [
                                        {
                                            "is_standard_in_project": true
                                        } as InfEntityProjectRel
                                    ],
                                    "fk_property": 1113,
                                    "appellation": {
                                        "appellation_label": {
                                            "tokens": [
                                                {
                                                    "id": 0,
                                                    "string": "Max",
                                                    "isSeparator": false
                                                }
                                            ],
                                            "latestTokenId": 0
                                        },
                                        "fk_class": 40
                                    }
                                }  as InfRole
                            ],
                            "toggle": "collapsed",
                            "outgoingRoleSets": [
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 71,
                                        "dfh_identifier_in_namespace": "P81_ongoing_throughout",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 328,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 345,
                                                "dfh_text_property": "This property describes the minimum period of time covered by an E52 Time-Span. Since Time-Spans may not have precisely known\n            temporal extents, the CRM supports statements about the minimum and maximum temporal extents of Time-Spans. This property allows a\n            Time-Span’s minimum temporal extent (i.e. its inner boundary) to be assigned an E61 Time Primitive value. Time Primitives are treated by\n            the CRM as application or system specific date intervals, and are not further analysed. ",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 71,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 531,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                },
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 72,
                                        "dfh_identifier_in_namespace": "P82_at_some_time_within",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 329,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 367,
                                                "dfh_text_property": "This property describes the maximum period of time within which an E52 Time-Span falls. Since Time-Spans may not have precisely\n            known temporal extents, the CRM supports statements about the minimum and maximum temporal extents of Time-Spans. This property allows a\n            Time-Span’s maximum temporal extent (i.e. its outer boundary) to be assigned an E61 Time Primitive value. Time Primitives are treated by\n            the CRM as application or system specific date intervals, and are not further analysed. ",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 72,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 532,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                },
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 150,
                                        "dfh_identifier_in_namespace": "P81a_end_of_the_begin",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 347,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 353,
                                                "dfh_text_property": "This is defined as the first boundary of the property P81",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 150,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 550,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                },
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 151,
                                        "dfh_identifier_in_namespace": "P81b_begin_of_the_end",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 348,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 507,
                                                "dfh_text_property": "This is defined as the second boundary of the property P81",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 151,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 551,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                },
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 152,
                                        "dfh_identifier_in_namespace": "P82a_begin_of_the_begin",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 349,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 508,
                                                "dfh_text_property": "This is defined as the first boundary of the property P82",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 152,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 552,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                },
                                {
                                    "isOutgoing": true,
                                    "property": {
                                        "dfh_pk_property": 153,
                                        "dfh_identifier_in_namespace": "P82b_end_of_the_end",
                                        "dfh_has_domain": 50,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": null,
                                        "dfh_fk_property_of_origin": null,
                                        "dfh_domain_instances_min_quantifier": null,
                                        "dfh_domain_instances_max_quantifier": null,
                                        "dfh_range_instances_min_quantifier": null,
                                        "dfh_range_instances_max_quantifier": null,
                                        "pk_entity": 350,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:28.137Z",
                                        "tmsp_last_modification": "2018-04-18T21:30:28.137Z",
                                        "sys_period": "[\"2018-04-18 21:30:28.137873+00\",)",
                                        "text_properties": [
                                            {
                                                "dfh_pk_text_property": 509,
                                                "dfh_text_property": "This is defined as the second boundary of the property P82",
                                                "dfh_language_iso_code": "en",
                                                "dfh_creation_time": null,
                                                "dfh_modification_time": null,
                                                "dfh_fk_property": 153,
                                                "dfh_fk_namespace": null,
                                                "dfh_fk_class": null,
                                                "dfh_fk_project": null,
                                                "dfh_fk_class_type": null,
                                                "dfh_fk_property_type": null,
                                                "dfh_fk_system_type": null,
                                                "dfh_fk_entity_association": null,
                                                "dfh_fk_profile": null,
                                                "dfh_fk_is_subclass_of": null,
                                                "pk_entity": 553,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-04-18T21:30:40.324Z",
                                                "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                                                "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                                            }
                                        ]
                                    },
                                    "targetClassPk": 335,
                                    "targetClass": {
                                        "dfh_pk_class": 335,
                                        "dfh_identifier_in_namespace": "E61",
                                        "dfh_standard_label": "Time Primitive",
                                        "pk_entity": 226,
                                        "entity_version": 2,
                                        "notes": null,
                                        "tmsp_creation": "2018-04-18T21:30:20.154Z",
                                        "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                        "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                    },
                                    "label": {
                                        "sg": "n.N.",
                                        "pl": "n.N.",
                                        "default": "n.N."
                                    }
                                }
                            ]
                        },
                        "ingoingRoleSets": [],
                        "outgoingRoleSets": [
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1111,
                                    "dfh_identifier_in_namespace": "histP9",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 1,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "isAppellationOf",
                                    "dfh_fk_property_of_origin": null,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 577,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-19T17:15:00.806Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:18.423Z",
                                    "sys_period": "[\"2018-06-14 06:50:18.423339+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 1,
                                "targetClass": {
                                    "dfh_pk_class": 1,
                                    "dfh_identifier_in_namespace": "E1",
                                    "dfh_standard_label": "CRM Entity",
                                    "pk_entity": 83,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1112,
                                    "dfh_identifier_in_namespace": "histP10",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 54,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "hasLanguage",
                                    "dfh_fk_property_of_origin": null,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 578,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-19T17:15:00.806Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:18.423Z",
                                    "sys_period": "[\"2018-06-14 06:50:18.423339+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 54,
                                "targetClass": {
                                    "dfh_pk_class": 54,
                                    "dfh_identifier_in_namespace": "E56",
                                    "dfh_standard_label": "Language",
                                    "pk_entity": 89,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1113,
                                    "dfh_identifier_in_namespace": "histP11",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 40,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "refersToName",
                                    "dfh_fk_property_of_origin": null,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 579,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-19T17:15:00.806Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:18.423Z",
                                    "sys_period": "[\"2018-06-14 06:50:18.423339+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 40,
                                "targetClass": {
                                    "dfh_pk_class": 40,
                                    "dfh_identifier_in_namespace": "E41",
                                    "dfh_standard_label": "Appellation",
                                    "pk_entity": 87,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1192,
                                    "dfh_identifier_in_namespace": "histP9",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 21,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "isAppellationOf",
                                    "dfh_fk_property_of_origin": 1111,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 659,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-14T06:50:17.340Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                                    "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 21,
                                "targetClass": {
                                    "dfh_pk_class": 21,
                                    "dfh_identifier_in_namespace": "E21",
                                    "dfh_standard_label": "Person",
                                    "pk_entity": 84,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1193,
                                    "dfh_identifier_in_namespace": "histP9",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 68,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "isAppellationOf",
                                    "dfh_fk_property_of_origin": 1111,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 660,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-14T06:50:17.340Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                                    "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 68,
                                "targetClass": {
                                    "dfh_pk_class": 68,
                                    "dfh_identifier_in_namespace": "E74",
                                    "dfh_standard_label": "Group",
                                    "pk_entity": 92,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1194,
                                    "dfh_identifier_in_namespace": "histP9",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 363,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "isAppellationOf",
                                    "dfh_fk_property_of_origin": 1111,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 661,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-14T06:50:17.340Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                                    "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 363,
                                "targetClass": {
                                    "dfh_pk_class": 363,
                                    "dfh_identifier_in_namespace": "histC8",
                                    "dfh_standard_label": "Geographical Place",
                                    "pk_entity": 97,
                                    "entity_version": 2,
                                    "notes": null,
                                    "tmsp_creation": "2018-04-16T22:06:42.020Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            },
                            {
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 1195,
                                    "dfh_identifier_in_namespace": "histP9",
                                    "dfh_has_domain": 365,
                                    "dfh_has_range": 441,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "isAppellationOf",
                                    "dfh_fk_property_of_origin": 1111,
                                    "dfh_domain_instances_min_quantifier": null,
                                    "dfh_domain_instances_max_quantifier": null,
                                    "dfh_range_instances_min_quantifier": null,
                                    "dfh_range_instances_max_quantifier": null,
                                    "pk_entity": 662,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-14T06:50:17.340Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                                    "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 441,
                                "targetClass": {
                                    "dfh_pk_class": 441,
                                    "dfh_identifier_in_namespace": "histC11",
                                    "dfh_standard_label": "Built work",
                                    "pk_entity": 637,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-14T06:50:12.390Z",
                                    "tmsp_last_modification": "2018-06-14T06:50:12.390Z",
                                    "sys_period": "[\"2018-06-14 06:50:12.390462+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            }
                        ],
                        "label": "Max"
                    }
                }
            }
        }
    },
    "ingoingRoleSets": [
        {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1178,
                "dfh_identifier_in_namespace": "histP13",
                "dfh_has_domain": 212,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "isRelativeTo",
                "dfh_fk_property_of_origin": null,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 646,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 212,
            "targetClass": {
                "dfh_pk_class": 212,
                "dfh_identifier_in_namespace": "histC2",
                "dfh_standard_label": "Time-related geographical localisation",
                "pk_entity": 597,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-06-10T14:08:51.538Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        },
        {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1181,
                "dfh_identifier_in_namespace": "P166",
                "dfh_has_domain": 84,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "was a presence of",
                "dfh_fk_property_of_origin": 147,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 648,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 84,
            "targetClass": {
                "dfh_pk_class": 84,
                "dfh_identifier_in_namespace": "E93",
                "dfh_standard_label": "Presence",
                "pk_entity": 224,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-18T21:30:20.154Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        },
        {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1186,
                "dfh_identifier_in_namespace": "P8",
                "dfh_has_domain": 61,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "took place on or within",
                "dfh_fk_property_of_origin": 7,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 653,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 61,
            "targetClass": {
                "dfh_pk_class": 61,
                "dfh_identifier_in_namespace": "E67",
                "dfh_standard_label": "Birth",
                "pk_entity": 90,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-16T22:06:42.020Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        },
        {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1191,
                "dfh_identifier_in_namespace": "P8",
                "dfh_has_domain": 63,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "took place on or within",
                "dfh_fk_property_of_origin": 7,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 658,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 63,
            "targetClass": {
                "dfh_pk_class": 63,
                "dfh_identifier_in_namespace": "E69",
                "dfh_standard_label": "Death",
                "pk_entity": 91,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-16T22:06:42.020Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        },
        {
            "isOutgoing": false,
            "property": {
                "dfh_pk_property": 1194,
                "dfh_identifier_in_namespace": "histP9",
                "dfh_has_domain": 365,
                "dfh_has_range": 363,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "isAppellationOf",
                "dfh_fk_property_of_origin": 1111,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 661,
                "entity_version": 1,
                "notes": null,
                "tmsp_creation": "2018-06-14T06:50:17.340Z",
                "tmsp_last_modification": "2018-06-14T06:50:17.340Z",
                "sys_period": "[\"2018-06-14 06:50:17.340156+00\",)",
                "text_properties": []
            },
            "targetClassPk": 365,
            "targetClass": {
                "dfh_pk_class": 365,
                "dfh_identifier_in_namespace": "histC10",
                "dfh_standard_label": "Appellation for language",
                "pk_entity": 569,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-19T17:14:58.782Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        }
    ],
    "outgoingRoleSets": [
        {
            "isOutgoing": true,
            "property": {
                "dfh_pk_property": 1110,
                "dfh_identifier_in_namespace": "histP8",
                "dfh_has_domain": 363,
                "dfh_has_range": 364,
                "dfh_creation_time": null,
                "dfh_modification_time": null,
                "dfh_standard_label": "hasGeographicalPlaceType",
                "dfh_fk_property_of_origin": null,
                "dfh_domain_instances_min_quantifier": null,
                "dfh_domain_instances_max_quantifier": null,
                "dfh_range_instances_min_quantifier": null,
                "dfh_range_instances_max_quantifier": null,
                "pk_entity": 364,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-18T21:30:28.137Z",
                "tmsp_last_modification": "2018-06-14T06:50:18.423Z",
                "sys_period": "[\"2018-06-14 06:50:18.423339+00\",)",
                "text_properties": [
                    {
                        "dfh_pk_text_property": 1386,
                        "dfh_text_property": "Associates a geographical place with the type which defines its identity",
                        "dfh_language_iso_code": "en",
                        "dfh_creation_time": null,
                        "dfh_modification_time": null,
                        "dfh_fk_property": 1110,
                        "dfh_fk_namespace": null,
                        "dfh_fk_class": null,
                        "dfh_fk_project": null,
                        "dfh_fk_class_type": null,
                        "dfh_fk_property_type": null,
                        "dfh_fk_system_type": null,
                        "dfh_fk_entity_association": null,
                        "dfh_fk_profile": null,
                        "dfh_fk_is_subclass_of": null,
                        "pk_entity": 565,
                        "entity_version": 1,
                        "notes": null,
                        "tmsp_creation": "2018-04-18T21:30:40.324Z",
                        "tmsp_last_modification": "2018-04-18T21:30:40.324Z",
                        "sys_period": "[\"2018-04-18 21:30:40.324207+00\",)"
                    }
                ]
            },
            "targetClassPk": 364,
            "targetClass": {
                "dfh_pk_class": 364,
                "dfh_identifier_in_namespace": "histC9",
                "dfh_standard_label": "Geographical place type",
                "pk_entity": 98,
                "entity_version": 2,
                "notes": null,
                "tmsp_creation": "2018-04-16T22:06:42.020Z",
                "tmsp_last_modification": "2018-06-14T06:50:12.793Z",
                "sys_period": "[\"2018-06-14 06:50:12.79349+00\",)"
            },
            "label": {
                "sg": "n.N.",
                "pl": "n.N.",
                "default": "n.N."
            }
        }
    ]
} 