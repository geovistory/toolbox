import { sandboxOf } from 'angular-playground';
import { DfhClass, DfhProperty, InfRole } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, RoleSet, ExistenceTimeDetail } from '../../../information.models';
import { Information2Module } from '../../../information.module';
import { TeEntEditableComponent } from './te-ent-editable.component';
import { DfhConfig } from '../../../shared/dfh-config';



export default sandboxOf(TeEntEditableComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Editable ', {
        context: {
            model: {
            },
            parentPath: ['_162156'],
            initState: {
                activeProject: {
                    pk_project: 57
                },
                "_162156": {
                    "role": {
                        "fk_property": 1,
                        "fk_entity": 162152,
                        "fk_temporal_entity": 162154,
                        "is_in_project_count": 1,
                        "is_standard_in_project_count": 1,
                        "community_favorite_calendar": null,
                        "pk_entity_version_concat": "162156_1",
                        "pk_entity": 162156,
                        "entity_version": 1,
                        "notes": null,
                        "is_latest_version": true,
                        "is_community_favorite": true,
                        "entity_version_project_rels": [
                            {
                                "pk_entity_version_project_rel": 11027,
                                "fk_project": 57,
                                "fk_entity": 162156,
                                "fk_entity_version": 1,
                                "fk_entity_version_concat": "162156_1",
                                "is_in_project": true,
                                "is_standard_in_project": true,
                                "calendar": null,
                                "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
                            }
                        ],
                        "temporal_entity": {
                            "fk_class": 3,
                            "notes": null,
                            "pk_entity_version_concat": "162154_1",
                            "pk_entity": 162154,
                            "entity_version": 1,
                            "is_latest_version": true,
                            "is_community_favorite": true,
                            "entity_version_project_rels": [
                                {
                                    "pk_entity_version_project_rel": 11026,
                                    "fk_project": 57,
                                    "fk_entity": 162154,
                                    "fk_entity_version": 1,
                                    "fk_entity_version_concat": "162154_1",
                                    "is_in_project": true,
                                    "is_standard_in_project": null,
                                    "calendar": null,
                                    "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
                                }
                            ]
                        }
                    },
                    "isCircular": false,
                    "isOutgoing": false,
                    targetClassPk: 3,
                    "isDisplayRoleForDomain": null,
                    "isDisplayRoleForRange": true,
                    "_teEnt": {
                        "_existenceTime": { //  <- Existence Time
                            "roles": [
                            ],
                            "toggle": "collapsed",
                            _children: {
                                _152_ingoing: {
                                    isOutgoing: false,
                                    property: {
                                        dfh_pk_property: 152,
                                        dfh_identifier_in_namespace: 'P82a',
                                        dfh_has_domain: 22,
                                        dfh_has_range: 335,
                                        dfh_creation_time: null,
                                        dfh_modification_time: null,
                                        dfh_standard_label: 'Begin of begin',
                                        dfh_domain_instances_min_quantifier: 0,
                                        dfh_domain_instances_max_quantifier: 1,
                                        dfh_range_instances_min_quantifier: 0,
                                        dfh_range_instances_max_quantifier: 1,
                                        pk_entity: 802,
                                        entity_version: 1,
                                        notes: null,
                                        tmsp_creation: '2018-06-12T16:17:27.567Z',
                                        tmsp_last_modification: '2018-06-12T16:17:27.567Z',
                                        sys_period: '["2018-06-12 16:17:27.567791+00",)',
                                        text_properties: []
                                    },
                                    targetClassPk: 22,
                                    targetClass: {
                                        dfh_pk_class: 22,
                                        dfh_identifier_in_namespace: 'E2',
                                        dfh_standard_label: 'Temporal Entity',
                                        pk_entity: 787,
                                        entity_version: 1,
                                        notes: null,
                                        tmsp_creation: '2018-06-12T16:17:27.562Z',
                                        tmsp_last_modification: '2018-06-12T16:17:27.562Z',
                                        sys_period: '["2018-06-12 16:17:27.562493+00",)'
                                    },
                                    label: {
                                        sg: 'Begin of begin',
                                        pl: 'n.N.',
                                        'default': 'Begin of begin'
                                    },
                                    _role_list: {
                                        _undefined: {
                                            role: {
                                                pk_entity: 999,
                                                "fk_property": 152,
                                                "time_primitive": {
                                                    fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                                                    "duration": "1 year",
                                                    "julian_day": 2451558
                                                },
                                                "entity_version_project_rels": [
                                                    {
                                                        "calendar": "julian"
                                                    }
                                                ]
                                            },
                                            isCircular: false,
                                            isOutgoing: false,
                                            targetClassPk: 22,
                                            isDisplayRoleForRange: true,
                                            _timePrimitive: {
                                                timePrimitive: {
                                                    fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                                                    "duration": "1 year",
                                                    "julian_day": 2451558
                                                }
                                            }
                                        }
                                    },
                                    rolesNotInProjectLoading: false,
                                    roleStatesInOtherProjectsVisible: true,
                                }
                            },
                            "ingoingRoleSets": [
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 71,
                                        "dfh_identifier_in_namespace": "P81",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "Ongoing throughout",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 798,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "Ongoing throughout",
                                        "pl": "n.N.",
                                        "default": "Ongoing throughout"
                                    }
                                },
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 72,
                                        "dfh_identifier_in_namespace": "P82",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "At some time within",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 801,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "At some time within",
                                        "pl": "n.N.",
                                        "default": "At some time within"
                                    }
                                },
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 150,
                                        "dfh_identifier_in_namespace": "P81a",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "End of begin",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 799,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "End of begin",
                                        "pl": "n.N.",
                                        "default": "End of begin"
                                    }
                                },
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 151,
                                        "dfh_identifier_in_namespace": "P81b",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "Begin of end",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 800,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "Begin of end",
                                        "pl": "n.N.",
                                        "default": "Begin of end"
                                    }
                                },
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 152,
                                        "dfh_identifier_in_namespace": "P82a",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "Begin of begin",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 802,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "Begin of begin",
                                        "pl": "n.N.",
                                        "default": "Begin of begin"
                                    }
                                },
                                {
                                    "isOutgoing": false,
                                    "property": {
                                        "dfh_pk_property": 153,
                                        "dfh_identifier_in_namespace": "P82b",
                                        "dfh_has_domain": 22,
                                        "dfh_has_range": 335,
                                        "dfh_creation_time": null,
                                        "dfh_modification_time": null,
                                        "dfh_standard_label": "End of end",
                                        "dfh_domain_instances_min_quantifier": 0,
                                        "dfh_domain_instances_max_quantifier": 1,
                                        "dfh_range_instances_min_quantifier": 0,
                                        "dfh_range_instances_max_quantifier": 1,
                                        "pk_entity": 803,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                        "text_properties": []
                                    },
                                    "targetClassPk": 22,
                                    "targetClass": {
                                        "dfh_pk_class": 22,
                                        "dfh_identifier_in_namespace": "E2",
                                        "dfh_standard_label": "Temporal Entity",
                                        "pk_entity": 787,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                        "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                        "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                    },
                                    "label": {
                                        "sg": "End of end",
                                        "pl": "n.N.",
                                        "default": "End of end"
                                    }
                                }
                            ]
                        },
                        "selectPropState": "init",
                        "toggle": "collapsed",
                        "teEnt": {
                            "fk_class": 3,
                            "notes": null,
                            "pk_entity_version_concat": "162154_1",
                            "pk_entity": 162154,
                            "entity_version": 1,
                            "is_latest_version": true,
                            "is_community_favorite": true,
                            "entity_version_project_rels": [
                                {
                                    "pk_entity_version_project_rel": 11026,
                                    "fk_project": 57,
                                    "fk_entity": 162154,
                                    "fk_entity_version": 1,
                                    "fk_entity_version_concat": "162154_1",
                                    "is_in_project": true,
                                    "is_standard_in_project": null,
                                    "calendar": null,
                                    "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
                                }
                            ]
                        },
                        "fkClass": 3,
                        "dfhClass": {
                            "dfh_pk_class": 3,
                            "dfh_identifier_in_namespace": "F52",
                            "dfh_standard_label": "Name Use Activity",
                            "pk_entity": 783,
                            "entity_version": 1,
                            "notes": null,
                            "tmsp_creation": "2018-06-12T16:17:27.562Z",
                            "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                            "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)",
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
                                    "pk_entity": 791,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 1,
                                "targetClass": {
                                    "dfh_pk_class": 1,
                                    "dfh_identifier_in_namespace": "E21",
                                    "dfh_standard_label": "Person",
                                    "pk_entity": 781,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
                                "label": {
                                    "sg": "Entity with this Name",
                                    "pl": "Entities with this Name",
                                    "default": "Entities with this Name"
                                },
                                "toggle": "collapsed",
                                "_role_list": {
                                    "_162156": {
                                        "role": {
                                            "fk_property": 1,
                                            "fk_entity": 162152,
                                            "fk_temporal_entity": 162154,
                                            "is_in_project_count": 1,
                                            "is_standard_in_project_count": 1,
                                            "community_favorite_calendar": null,
                                            "pk_entity_version_concat": "162156_1",
                                            "pk_entity": 162156,
                                            "entity_version": 1,
                                            "notes": null,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
                                            "entity_version_project_rels": [
                                                {
                                                    "pk_entity_version_project_rel": 11027,
                                                    "fk_project": 57,
                                                    "fk_entity": 162156,
                                                    "fk_entity_version": 1,
                                                    "fk_entity_version_concat": "162156_1",
                                                    "is_in_project": true,
                                                    "is_standard_in_project": true,
                                                    "calendar": null,
                                                    "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
                                                }
                                            ],
                                            "appellation": {},
                                            "language": {},
                                            "time_primitive": {}
                                        },
                                        "isCircular": false,
                                        "isOutgoing": true,
                                        targetClassPk: 1,
                                        "isDisplayRoleForDomain": null,
                                        "isDisplayRoleForRange": true,
                                        "_leaf_peIt": {
                                            "dfhClass": {
                                                "dfh_pk_class": 1,
                                                "dfh_identifier_in_namespace": "E21",
                                                "dfh_standard_label": "Person",
                                                "pk_entity": 781,
                                                "entity_version": 1,
                                                "notes": null,
                                                "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                                "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                                "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                            }
                                        }
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
                                    "pk_entity": 792,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 2,
                                "targetClass": {
                                    "dfh_pk_class": 2,
                                    "dfh_identifier_in_namespace": "E82",
                                    "dfh_standard_label": "Actor Appellation",
                                    "pk_entity": 782,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
                                "label": {
                                    "sg": "Detailed Name",
                                    "pl": "Detailed Names",
                                    "default": "Detailed Name"
                                },
                                "toggle": "collapsed",
                                "_role_list": {
                                    "_162160": {
                                        "role": {
                                            "fk_property": 2,
                                            "fk_entity": 162158,
                                            "fk_temporal_entity": 162154,
                                            "is_in_project_count": 1,
                                            "is_standard_in_project_count": 0,
                                            "community_favorite_calendar": null,
                                            "pk_entity_version_concat": "162160_1",
                                            "pk_entity": 162160,
                                            "entity_version": 1,
                                            "notes": null,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
                                            "entity_version_project_rels": [
                                                {
                                                    "pk_entity_version_project_rel": 11029,
                                                    "fk_project": 57,
                                                    "fk_entity": 162160,
                                                    "fk_entity_version": 1,
                                                    "fk_entity_version_concat": "162160_1",
                                                    "is_in_project": true,
                                                    "is_standard_in_project": null,
                                                    "calendar": null,
                                                    "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
                                                }
                                            ],
                                            "appellation": {
                                                "appellation_label": {
                                                    "tokens": [
                                                        {
                                                            "id": 0,
                                                            "string": "Claudia",
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
                                                            "string": "Bernasconi",
                                                            "typeId": 3,
                                                            "isSeparator": false
                                                        }
                                                    ],
                                                    "latestTokenId": 4
                                                },
                                                "fk_class": 2,
                                                "notes": null,
                                                "pk_entity_version_concat": "162158_1",
                                                "pk_entity": 162158,
                                                "entity_version": 1,
                                                "is_latest_version": true,
                                                "is_community_favorite": true
                                            },
                                            "language": {},
                                            "time_primitive": {}
                                        },
                                        "isCircular": false,
                                        "isOutgoing": true,
                                        targetClassPk: 2,
                                        "isDisplayRoleForDomain": null,
                                        "isDisplayRoleForRange": null,
                                        "_appe": {
                                            "appellation": {
                                                "appellation_label": {
                                                    "tokens": [
                                                        {
                                                            "id": 0,
                                                            "string": "Claudia",
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
                                                            "string": "Bernasconi",
                                                            "typeId": 3,
                                                            "isSeparator": false
                                                        }
                                                    ],
                                                    "latestTokenId": 4
                                                },
                                                "fk_class": 2,
                                                "notes": null,
                                                "pk_entity_version_concat": "162158_1",
                                                "pk_entity": 162158,
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
                                    "pk_entity": 793,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 4,
                                "targetClass": {
                                    "dfh_pk_class": 4,
                                    "dfh_identifier_in_namespace": "E56",
                                    "dfh_standard_label": "Language",
                                    "pk_entity": 784,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
                                "label": {
                                    "sg": "Language",
                                    "pl": "Languages",
                                    "default": "Language"
                                },
                                "toggle": "collapsed",
                                "_role_list": {
                                    "_162162": {
                                        "role": {
                                            "fk_property": 3,
                                            "fk_entity": 155717,
                                            "fk_temporal_entity": 162154,
                                            "is_in_project_count": 1,
                                            "is_standard_in_project_count": 0,
                                            "community_favorite_calendar": null,
                                            "pk_entity_version_concat": "162162_1",
                                            "pk_entity": 162162,
                                            "entity_version": 1,
                                            "notes": null,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
                                            "entity_version_project_rels": [
                                                {
                                                    "pk_entity_version_project_rel": 11030,
                                                    "fk_project": 57,
                                                    "fk_entity": 162162,
                                                    "fk_entity_version": 1,
                                                    "fk_entity_version_concat": "162162_1",
                                                    "is_in_project": true,
                                                    "is_standard_in_project": null,
                                                    "calendar": null,
                                                    "tmsp_last_modification": "2018-06-12T16:17:27.90064+00:00"
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
                                                "pk_entity_version_concat": "155717_1",
                                                "pk_entity": 155717,
                                                "entity_version": 1,
                                                "is_latest_version": true,
                                                "is_community_favorite": true
                                            },
                                            "time_primitive": {}
                                        },
                                        "isCircular": false,
                                        "isOutgoing": true,
                                        targetClassPk: 4,
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
                                                "pk_entity_version_concat": "155717_1",
                                                "pk_entity": 155717,
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
                                    "pk_entity": 791,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 1,
                                "targetClass": {
                                    "dfh_pk_class": 1,
                                    "dfh_identifier_in_namespace": "E21",
                                    "dfh_standard_label": "Person",
                                    "pk_entity": 781,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
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
                                    "pk_entity": 792,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 2,
                                "targetClass": {
                                    "dfh_pk_class": 2,
                                    "dfh_identifier_in_namespace": "E82",
                                    "dfh_standard_label": "Actor Appellation",
                                    "pk_entity": 782,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
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
                                    "pk_entity": 793,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 4,
                                "targetClass": {
                                    "dfh_pk_class": 4,
                                    "dfh_identifier_in_namespace": "E56",
                                    "dfh_standard_label": "Language",
                                    "pk_entity": 784,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
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
                                    "pk_entity": 797,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.567Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.567Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.567791+00\",)",
                                    "text_properties": []
                                },
                                "targetClassPk": 363,
                                "targetClass": {
                                    "dfh_pk_class": 363,
                                    "dfh_identifier_in_namespace": "histC8",
                                    "dfh_standard_label": "Geographical Place",
                                    "pk_entity": 788,
                                    "entity_version": 1,
                                    "notes": null,
                                    "tmsp_creation": "2018-06-12T16:17:27.562Z",
                                    "tmsp_last_modification": "2018-06-12T16:17:27.562Z",
                                    "sys_period": "[\"2018-06-12 16:17:27.562493+00\",)"
                                },
                                "label": {
                                    "sg": "n.N.",
                                    "pl": "n.N.",
                                    "default": "n.N."
                                }
                            }
                        ],
                        "label": "Claudia Bernasconi"
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
    
                    <gv-te-ent-editable [parentPath]="parentPath">
                    </gv-te-ent-editable>
                        
                </div>
             
            </div>
        `
    })