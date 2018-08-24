import { sandboxOf } from 'angular-playground';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information.module';
import { PeItRoleSetFormComponent } from './pe-it-role-set-form.component';



export default sandboxOf(PeItRoleSetFormComponent, {
    imports: [
        InitStateModule,
        InitPeItEditableStateModule,
        Information2Module
    ],
    declareComponent: false
})

    .add('PeIt RoleSet Form | Appellation ', {
        context: {
            addForm: {},
            createForm: {},
            cancelled: undefined,
            added: undefined,
            parentPath: ['_peIt_editable', '_children', '_1_ingoing'],
            parentPeItStatePath: ['_peIt_editable'],
            initState: {
                "activeProject": {
                    "pk_project": 52
                },
                "_peIt_editable": {
                    "pkEntity": 152831,
                    "selectPropState": "init",
                    "fkClass": 1,
                    "peIt": {
                        "fk_class": 1,
                        "pk_entity_version_concat": "152831_1",
                        "pk_entity": 152831,
                        "entity_version": 1,
                        "notes": "Felix Ackermann",
                        "is_latest_version": true,
                        "is_community_favorite": true,
                        "entity_version_project_rels": [
                            {
                                "pk_entity_version_project_rel": 10209,
                                "fk_project": 52,
                                "fk_entity": 152831,
                                "fk_entity_version": 1,
                                "fk_entity_version_concat": "152831_1",
                                "is_in_project": true,
                                "is_standard_in_project": null,
                                "calendar": null,
                                "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                            }
                        ],
                        "dfh_class": {
                            "dfh_pk_class": 1,
                            "dfh_identifier_in_namespace": "E21",
                            "dfh_standard_label": "Person",
                            "pk_entity": 726,
                            "entity_version": 1,
                            "notes": null,
                            "tmsp_creation": "2018-06-04T10:18:05.637764+00:00",
                            "tmsp_last_modification": "2018-06-04T10:18:05.637764+00:00",
                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                        }
                    },
                    "dfhClass": {
                        "dfh_pk_class": 1,
                        "dfh_identifier_in_namespace": "E21",
                        "dfh_standard_label": "Person",
                        "pk_entity": 726,
                        "entity_version": 1,
                        "notes": null,
                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)",
                        "text_properties": []
                    },
                    "_children": {
                        "_1_ingoing": {
                            _role_set_form: {}, // <- add this to init the role set (gv-pe-it-role-set-form)
                            "isOutgoing": false,
                            "property": {
                                "dfh_pk_property": 1,
                                "dfh_identifier_in_namespace": "R63",
                                "dfh_has_domain": 3,
                                "dfh_has_range": 1,
                                "dfh_creation_time": null,
                                "dfh_modification_time": null,
                                "dfh_standard_label": "Named",
                                "dfh_domain_instances_min_quantifier": 0,
                                "dfh_domain_instances_max_quantifier": -1,
                                "dfh_range_instances_min_quantifier": 0,
                                "dfh_range_instances_max_quantifier": -1,
                                "pk_entity": 736,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                "text_properties": []
                            },
                            "targetClassPk": 3,
                            "label": {
                                "sg": "Name",
                                "pl": "Names",
                                "default": "Names"
                            },
                            "toggle": "collapsed",
                            "_role_list": {
                                "_152835": {
                                    "role": {
                                        "fk_property": 1,
                                        "fk_entity": 152831,
                                        "fk_temporal_entity": 152833,
                                        "is_in_project_count": 3,
                                        "is_standard_in_project_count": 3,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "152835_1",
                                        "pk_entity": 152835,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": true,
                                        "entity_version_project_rels": [
                                            {
                                                "pk_entity_version_project_rel": 10211,
                                                "fk_project": 52,
                                                "fk_entity": 152835,
                                                "fk_entity_version": 1,
                                                "fk_entity_version_concat": "152835_1",
                                                "is_in_project": true,
                                                "is_standard_in_project": true,
                                                "calendar": null,
                                                "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                            }
                                        ],
                                        "temporal_entity": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152833_1",
                                            "pk_entity": 152833,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
                                            "entity_version_project_rels": [
                                                {
                                                    "pk_entity_version_project_rel": 10210,
                                                    "fk_project": 52,
                                                    "fk_entity": 152833,
                                                    "fk_entity_version": 1,
                                                    "fk_entity_version_concat": "152833_1",
                                                    "is_in_project": true,
                                                    "is_standard_in_project": null,
                                                    "calendar": null,
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                                }
                                            ]
                                        }
                                    },
                                    "isOutgoing": false,
                                    "isCircular": false,
                                    "isDisplayRoleForDomain": null,
                                    "isDisplayRoleForRange": true,
                                    "_teEnt": {
                                        "selectPropState": "init",
                                        "toggle": "collapsed",
                                        "teEnt": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152833_1",
                                            "pk_entity": 152833,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
                                            "entity_version_project_rels": [
                                                {
                                                    "pk_entity_version_project_rel": 10210,
                                                    "fk_project": 52,
                                                    "fk_entity": 152833,
                                                    "fk_entity_version": 1,
                                                    "fk_entity_version_concat": "152833_1",
                                                    "is_in_project": true,
                                                    "is_standard_in_project": null,
                                                    "calendar": null,
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                                }
                                            ]
                                        },
                                        "fkClass": 3,
                                        "dfhClass": {
                                            "dfh_pk_class": 3,
                                            "dfh_identifier_in_namespace": "F52",
                                            "dfh_standard_label": "Name Use Activity",
                                            "pk_entity": 728,
                                            "entity_version": 1,
                                            "notes": null,
                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)",
                                            "text_properties": []
                                        },
                                        "_children": {
                                            "_1_outgoing": {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 1,
                                                    "dfh_identifier_in_namespace": "R63",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 1,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Named",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 0,
                                                    "dfh_range_instances_max_quantifier": -1,
                                                    "pk_entity": 736,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 1,
                                                "label": {
                                                    "sg": "Entity with this Name",
                                                    "pl": "Entities with this Name",
                                                    "default": "Entities with this Name"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152835": {
                                                        "role": {
                                                            "fk_property": 1,
                                                            "fk_entity": 152831,
                                                            "fk_temporal_entity": 152833,
                                                            "is_in_project_count": 3,
                                                            "is_standard_in_project_count": 3,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152835_1",
                                                            "pk_entity": 152835,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "entity_version_project_rels": [
                                                                {
                                                                    "pk_entity_version_project_rel": 10211,
                                                                    "fk_project": 52,
                                                                    "fk_entity": 152835,
                                                                    "fk_entity_version": 1,
                                                                    "fk_entity_version_concat": "152835_1",
                                                                    "is_in_project": true,
                                                                    "is_standard_in_project": true,
                                                                    "calendar": null,
                                                                    "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                                                }
                                                            ],
                                                            "appellation": {},
                                                            "language": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isOutgoing": true,
                                                        "isCircular": true,
                                                        "isDisplayRoleForDomain": null,
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {}
                                                    }
                                                }
                                            },
                                            "_2_outgoing": {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 2,
                                                    "dfh_identifier_in_namespace": "R64",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 2,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Used Name",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 1,
                                                    "dfh_range_instances_max_quantifier": 1,
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "label": {
                                                    "sg": "Detailed Name",
                                                    "pl": "Detailed Names",
                                                    "default": "Detailed Name"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152839": {
                                                        "role": {
                                                            "fk_property": 2,
                                                            "fk_entity": 152837,
                                                            "fk_temporal_entity": 152833,
                                                            "is_in_project_count": 3,
                                                            "is_standard_in_project_count": 2,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152839_1",
                                                            "pk_entity": 152839,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "entity_version_project_rels": [
                                                                {
                                                                    "pk_entity_version_project_rel": 10213,
                                                                    "fk_project": 52,
                                                                    "fk_entity": 152839,
                                                                    "fk_entity_version": 1,
                                                                    "fk_entity_version_concat": "152839_1",
                                                                    "is_in_project": true,
                                                                    "is_standard_in_project": null,
                                                                    "calendar": null,
                                                                    "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                                                }
                                                            ],
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Felix",
                                                                            "typeId": 1,
                                                                            "isSeparator": false
                                                                        },
                                                                        {
                                                                            "id": 1,
                                                                            "string": " ",
                                                                            "isSeparator": true
                                                                        },
                                                                        {
                                                                            "id": 2,
                                                                            "string": "Ackermann",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152837_1",
                                                                "pk_entity": 152837,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            },
                                                            "language": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isOutgoing": true,
                                                        "isCircular": false,
                                                        "isDisplayRoleForDomain": null,
                                                        "isDisplayRoleForRange": null,
                                                        "_appe": {
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Felix",
                                                                            "typeId": 1,
                                                                            "isSeparator": false
                                                                        },
                                                                        {
                                                                            "id": 1,
                                                                            "string": " ",
                                                                            "isSeparator": true
                                                                        },
                                                                        {
                                                                            "id": 2,
                                                                            "string": "Ackermann",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152837_1",
                                                                "pk_entity": 152837,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "_3_outgoing": {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 3,
                                                    "dfh_identifier_in_namespace": "R61",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 4,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Occured in kind of context",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 1,
                                                    "dfh_range_instances_max_quantifier": 1,
                                                    "pk_entity": 738,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 4,
                                                "label": {
                                                    "sg": "Language",
                                                    "pl": "Languages",
                                                    "default": "Language"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152841": {
                                                        "role": {
                                                            "fk_property": 3,
                                                            "fk_entity": 146438,
                                                            "fk_temporal_entity": 152833,
                                                            "is_in_project_count": 3,
                                                            "is_standard_in_project_count": 2,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152841_1",
                                                            "pk_entity": 152841,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "entity_version_project_rels": [
                                                                {
                                                                    "pk_entity_version_project_rel": 10214,
                                                                    "fk_project": 52,
                                                                    "fk_entity": 152841,
                                                                    "fk_entity_version": 1,
                                                                    "fk_entity_version_concat": "152841_1",
                                                                    "is_in_project": true,
                                                                    "is_standard_in_project": null,
                                                                    "calendar": null,
                                                                    "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                                                                }
                                                            ],
                                                            "appellation": {},
                                                            "language": {
                                                                "fk_class": 4,
                                                                "lang_type": "living",
                                                                "scope": "individual",
                                                                "iso6392b": "ger",
                                                                "iso6392t": "deu",
                                                                "iso6391": "de ",
                                                                "notes": "German",
                                                                "pk_entity_version_concat": "146438_1",
                                                                "pk_entity": 146438,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            },
                                                            "time_primitive": {}
                                                        },
                                                        "isOutgoing": true,
                                                        "isCircular": false,
                                                        "isDisplayRoleForDomain": null,
                                                        "isDisplayRoleForRange": null,
                                                        "_lang": {
                                                            "language": {
                                                                "fk_class": 4,
                                                                "lang_type": "living",
                                                                "scope": "individual",
                                                                "iso6392b": "ger",
                                                                "iso6392t": "deu",
                                                                "iso6391": "de ",
                                                                "notes": "German",
                                                                "pk_entity_version_concat": "146438_1",
                                                                "pk_entity": 146438,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "ingoingRoleSets": [],
                                        "outgoingRoleSets": [
                                            {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 1,
                                                    "dfh_identifier_in_namespace": "R63",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 1,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Named",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 0,
                                                    "dfh_range_instances_max_quantifier": -1,
                                                    "pk_entity": 736,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 1,
                                                "label": {
                                                    "sg": "Entity with this Name",
                                                    "pl": "Entities with this Name",
                                                    "default": "Entities with this Name"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 2,
                                                    "dfh_identifier_in_namespace": "R64",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 2,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Used Name",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 1,
                                                    "dfh_range_instances_max_quantifier": 1,
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "label": {
                                                    "sg": "Detailed Name",
                                                    "pl": "Detailed Names",
                                                    "default": "Detailed Name"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 3,
                                                    "dfh_identifier_in_namespace": "R61",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 4,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Occured in kind of context",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 1,
                                                    "dfh_range_instances_max_quantifier": 1,
                                                    "pk_entity": 738,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 4,
                                                "label": {
                                                    "sg": "Language",
                                                    "pl": "Languages",
                                                    "default": "Language"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
                                                "property": {
                                                    "dfh_pk_property": 7,
                                                    "dfh_identifier_in_namespace": "R63",
                                                    "dfh_has_domain": 3,
                                                    "dfh_has_range": 363,
                                                    "dfh_creation_time": null,
                                                    "dfh_modification_time": null,
                                                    "dfh_standard_label": "Named",
                                                    "dfh_domain_instances_min_quantifier": 0,
                                                    "dfh_domain_instances_max_quantifier": -1,
                                                    "dfh_range_instances_min_quantifier": 0,
                                                    "dfh_range_instances_max_quantifier": -1,
                                                    "pk_entity": 742,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 363,
                                                "label": {
                                                    "sg": "n.N.",
                                                    "pl": "n.N.",
                                                    "default": "n.N."
                                                }
                                            }
                                        ],
                                        "label": "Felix Ackermann"
                                    }
                                }
                            },
                        } 
                    },
                    "ingoingRoleSets": [
                        {
                            "isOutgoing": false,
                            "property": {
                                "dfh_pk_property": 1,
                                "dfh_identifier_in_namespace": "R63",
                                "dfh_has_domain": 3,
                                "dfh_has_range": 1,
                                "dfh_creation_time": null,
                                "dfh_modification_time": null,
                                "dfh_standard_label": "Named",
                                "dfh_domain_instances_min_quantifier": 0,
                                "dfh_domain_instances_max_quantifier": -1,
                                "dfh_range_instances_min_quantifier": 0,
                                "dfh_range_instances_max_quantifier": -1,
                                "pk_entity": 736,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                "text_properties": []
                            },
                            "targetClassPk": 3,
                            "label": {
                                "sg": "Name",
                                "pl": "Names",
                                "default": "Names"
                            }
                        },
                        {
                            "isOutgoing": false,
                            "property": {
                                "dfh_pk_property": 4,
                                "dfh_identifier_in_namespace": "P96",
                                "dfh_has_domain": 5,
                                "dfh_has_range": 1,
                                "dfh_creation_time": null,
                                "dfh_modification_time": null,
                                "dfh_standard_label": "By Mother",
                                "dfh_domain_instances_min_quantifier": 1,
                                "dfh_domain_instances_max_quantifier": -1,
                                "dfh_range_instances_min_quantifier": 1,
                                "dfh_range_instances_max_quantifier": 1,
                                "pk_entity": 739,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                "text_properties": []
                            },
                            "targetClassPk": 5,
                            "label": {
                                "sg": "Bith given as Mother",
                                "pl": "Births given as Mother",
                                "default": "Births given as Mother"
                            }
                        },
                        {
                            "isOutgoing": false,
                            "property": {
                                "dfh_pk_property": 5,
                                "dfh_identifier_in_namespace": "P97",
                                "dfh_has_domain": 5,
                                "dfh_has_range": 1,
                                "dfh_creation_time": null,
                                "dfh_modification_time": null,
                                "dfh_standard_label": "From Father",
                                "dfh_domain_instances_min_quantifier": 1,
                                "dfh_domain_instances_max_quantifier": -1,
                                "dfh_range_instances_min_quantifier": 1,
                                "dfh_range_instances_max_quantifier": 1,
                                "pk_entity": 740,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                "text_properties": []
                            },
                            "targetClassPk": 5,
                            "label": {
                                "sg": "Birth initiated as biological Father",
                                "pl": "Births initiated as biological Father",
                                "default": "Births initiated as biological Father"
                            }
                        },
                        {
                            "isOutgoing": false,
                            "property": {
                                "dfh_pk_property": 6,
                                "dfh_identifier_in_namespace": "P98",
                                "dfh_has_domain": 5,
                                "dfh_has_range": 1,
                                "dfh_creation_time": null,
                                "dfh_modification_time": null,
                                "dfh_standard_label": "Brought into life",
                                "dfh_domain_instances_min_quantifier": 1,
                                "dfh_domain_instances_max_quantifier": 1,
                                "dfh_range_instances_min_quantifier": 1,
                                "dfh_range_instances_max_quantifier": 9,
                                "pk_entity": 741,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                "text_properties": []
                            },
                            "targetClassPk": 5,
                            "label": {
                                "sg": "Birth",
                                "pl": "Births",
                                "default": "Birth"
                            }
                        }
                    ],
                    "outgoingRoleSets": [],
                    "label": "Felix Ackermann"
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex bg-secondary">
   
                    <gv-pe-it-role-set-form [parentPath]="parentPath" [parentPeItPath]="parentPeItStatePath" (createRoles)="createRoles($event)" (addFormChange)="addForm = $event" 
                    (createFormChange)="createForm = $event" ></gv-pe-it-role-set-form>
                    

                </div>
                <div style="height:400px; overflow:scroll">
                    <p *ngIf="cancelled">Cancelled</p>
                    <p *ngIf="added">Added: {{added | json}}</p>

                    <p>Add-Form.valid: {{addForm.valid | json}}</p>
        
                    <p>Add-Form.touched: {{addForm.touched | json}}</p>
        
                    <p>Add-Form.dirty: {{addForm.dirty | json}}</p>
        
                    <p>Add-Form.value </p>
                    <pre>
                        {{addForm.value | json}}
                    </pre>

                    <p>Create-Form.valid: {{createForm.valid | json}}</p>
        
                    <p>Create-Form.touched: {{createForm.touched | json}}</p>
        
                    <p>Create-Form.dirty: {{createForm.dirty | json}}</p>
        
                    <p>Create-Form.value </p>
                    <pre>
                        {{createForm.value | json}}
                    </pre>
        
                </div>
            </div>
        `
    })