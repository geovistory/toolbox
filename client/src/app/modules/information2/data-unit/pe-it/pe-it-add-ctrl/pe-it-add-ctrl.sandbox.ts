import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information2.module';
import { PeItAddCtrlComponent } from '../pe-it-add-ctrl/pe-it-add-ctrl.component';

export default sandboxOf(PeItAddCtrlComponent, {
    imports: [
        InitPeItEditableStateModule,
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('PeIt add ctrl | minimum mock data', {
        context: {
            model: {},
            basePath: ['_peIt_add_form'],
            pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
            pkEntity: 152831,
            state: {
                activeProject: {
                    pk_project: -1 // use same pkProject
                } as Project,
                _peIt_add_form: {
                    "pkEntity": 152852,
                    "selectPropState": "init",
                    "fkClass": 1,
                    "peIt": {
                        "fk_class": 1,
                        "pk_entity_version_concat": "152852_1",
                        "pk_entity": 152852,
                        "entity_version": 1,
                        "notes": "Hildegard Lanz",
                        "is_latest_version": true,
                        "is_community_favorite": true,
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
                    "_roleSet_list": {
                        "_1_ingoing": {
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
                            "targetClass": {
                                "dfh_pk_class": 3,
                                "dfh_identifier_in_namespace": "F52",
                                "dfh_standard_label": "Name Use Activity",
                                "pk_entity": 728,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
                            "label": {
                                "sg": "Name",
                                "pl": "Names",
                                "default": "Names"
                            },
                            "toggle": "collapsed",
                            "_role_list": {
                                "_152866": {
                                    "role": {
                                        "fk_property": 1,
                                        "fk_entity": 152852,
                                        "fk_temporal_entity": 152864,
                                        "is_in_project_count": 1,
                                        "is_standard_in_project_count": 0,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "152866_1",
                                        "pk_entity": 152866,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": true,
                                        "temporal_entity": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152864_1",
                                            "pk_entity": 152864,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        }
                                    },
                                    "isCircular": false,
                                    "isOutgoing": false,
                                    "targetDfhClass": {
                                        "dfh_pk_class": 3,
                                        "dfh_identifier_in_namespace": "F52",
                                        "dfh_standard_label": "Name Use Activity",
                                        "pk_entity": 728,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                    },
                                    "isDisplayRoleForDomain": null,
                                    "isDisplayRoleForRange": false,
                                    "_teEnt": {
                                        "selectPropState": "init",
                                        "toggle": "collapsed",
                                        "teEnt": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152864_1",
                                            "pk_entity": 152864,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true,
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
                                        "_roleSet_list": {
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
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Detailed Name",
                                                    "pl": "Detailed Names",
                                                    "default": "Detailed Name"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152870": {
                                                        "role": {
                                                            "fk_property": 2,
                                                            "fk_entity": 152868,
                                                            "fk_temporal_entity": 152864,
                                                            "is_in_project_count": 1,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152870_1",
                                                            "pk_entity": 152870,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Hildegards",
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
                                                                            "string": "Lanzs",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152868_1",
                                                                "pk_entity": 152868,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            },
                                                            "language": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 2,
                                                            "dfh_identifier_in_namespace": "E82",
                                                            "dfh_standard_label": "Actor Appellation",
                                                            "pk_entity": 727,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForDomain": null,
                                                        "isDisplayRoleForRange": null,
                                                        "_appe": {
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Hildegards",
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
                                                                            "string": "Lanzs",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152868_1",
                                                                "pk_entity": 152868,
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
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 738,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 4,
                                                "targetClass": {
                                                    "dfh_pk_class": 4,
                                                    "dfh_identifier_in_namespace": "E56",
                                                    "dfh_standard_label": "Language",
                                                    "pk_entity": 729,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 742,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 363,
                                                "targetClass": {
                                                    "dfh_pk_class": 363,
                                                    "dfh_identifier_in_namespace": "histC8",
                                                    "dfh_standard_label": "Geographical Place",
                                                    "pk_entity": 733,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "n.N.",
                                                    "pl": "n.N.",
                                                    "default": "n.N."
                                                }
                                            }
                                        ],
                                        "label": "Hildegards Lanzs"
                                    }
                                }
                            }
                        }
                    },
                    "label": "Hildegard Lanz"
                }
            }
        },
        template: `

            <gv-init-state [initState]="state"></gv-init-state>
            <div class="d-flex justify-content-center mt-5">
            
            
                <div style="width:430px;height:400px" class="d-flex">
            
            
                    <form #f="ngForm">
                        <gv-pe-it-add-ctrl [basePath]="basePath"
                            name="peIt" [(ngModel)]="model.peIt" #peIt="ngModel" required>
                        </gv-pe-it-add-ctrl>
                    </form>     
                    
                </div>


                <div style="height:500px; overflow:scroll;">
                    <p>Form.valid: {{f?.valid | json}}</p>

                    <p>Form.touched: {{f?.touched | json}}</p>

                    <p>Form.dirty: {{f?.dirty | json}}</p>

                    <p>Form.value </p>
                    <pre>
                        {{f?.value | json}}
                    </pre>

                </div>

            </div>


        `
    })
    .add('PeIt add ctrl | more mock data', {
        context: {
            model: {},
            basePath: ['_peIt_add_form'],
            pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
            pkEntity: 152831,
            state: {
                activeProject: {
                    pk_project: -1 // use same pkProject
                } as Project,
                "_peIt_add_form": {
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
                    "_roleSet_list": {
                        "_1_ingoing": {
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
                            "targetClass": {
                                "dfh_pk_class": 3,
                                "dfh_identifier_in_namespace": "F52",
                                "dfh_standard_label": "Name Use Activity",
                                "pk_entity": 728,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
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
                                        "temporal_entity": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152833_1",
                                            "pk_entity": 152833,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        }
                                    },
                                    "isCircular": false,
                                    "isOutgoing": false,
                                    "targetDfhClass": {
                                        "dfh_pk_class": 3,
                                        "dfh_identifier_in_namespace": "F52",
                                        "dfh_standard_label": "Name Use Activity",
                                        "pk_entity": 728,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                    },
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
                                            "is_community_favorite": true
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
                                        "_roleSet_list": {
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
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
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
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
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
                                                            "language": {},
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
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 2,
                                                            "dfh_identifier_in_namespace": "E82",
                                                            "dfh_standard_label": "Actor Appellation",
                                                            "pk_entity": 727,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
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
                                                "targetClass": {
                                                    "dfh_pk_class": 4,
                                                    "dfh_identifier_in_namespace": "E56",
                                                    "dfh_standard_label": "Language",
                                                    "pk_entity": 729,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
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
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 4,
                                                            "dfh_identifier_in_namespace": "E56",
                                                            "dfh_standard_label": "Language",
                                                            "pk_entity": 729,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
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
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 738,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 4,
                                                "targetClass": {
                                                    "dfh_pk_class": 4,
                                                    "dfh_identifier_in_namespace": "E56",
                                                    "dfh_standard_label": "Language",
                                                    "pk_entity": 729,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 742,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 363,
                                                "targetClass": {
                                                    "dfh_pk_class": 363,
                                                    "dfh_identifier_in_namespace": "histC8",
                                                    "dfh_standard_label": "Geographical Place",
                                                    "pk_entity": 733,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "n.N.",
                                                    "pl": "n.N.",
                                                    "default": "n.N."
                                                }
                                            }
                                        ],
                                        "label": "Felix Ackermann"
                                    }
                                },
                                "_152845": {
                                    "role": {
                                        "fk_property": 1,
                                        "fk_entity": 152831,
                                        "fk_temporal_entity": 152843,
                                        "is_in_project_count": 3,
                                        "is_standard_in_project_count": 1,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "152845_1",
                                        "pk_entity": 152845,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": true,
                                        "temporal_entity": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152843_1",
                                            "pk_entity": 152843,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        }
                                    },
                                    "isCircular": false,
                                    "isOutgoing": false,
                                    "targetDfhClass": {
                                        "dfh_pk_class": 3,
                                        "dfh_identifier_in_namespace": "F52",
                                        "dfh_standard_label": "Name Use Activity",
                                        "pk_entity": 728,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                    },
                                    "isDisplayRoleForRange": true,
                                    "_teEnt": {
                                        "selectPropState": "init",
                                        "toggle": "collapsed",
                                        "teEnt": {
                                            "fk_class": 3,
                                            "notes": null,
                                            "pk_entity_version_concat": "152843_1",
                                            "pk_entity": 152843,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
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
                                        "_roleSet_list": {
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
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Entity with this Name",
                                                    "pl": "Entities with this Name",
                                                    "default": "Entities with this Name"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152845": {
                                                        "role": {
                                                            "fk_property": 1,
                                                            "fk_entity": 152831,
                                                            "fk_temporal_entity": 152843,
                                                            "is_in_project_count": 3,
                                                            "is_standard_in_project_count": 1,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152845_1",
                                                            "pk_entity": 152845,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Detailed Name",
                                                    "pl": "Detailed Names",
                                                    "default": "Detailed Name"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_152849": {
                                                        "role": {
                                                            "fk_property": 2,
                                                            "fk_entity": 152847,
                                                            "fk_temporal_entity": 152843,
                                                            "is_in_project_count": 3,
                                                            "is_standard_in_project_count": 3,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "152849_1",
                                                            "pk_entity": 152849,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "language": {},
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Felixs",
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
                                                                            "string": "Ackermanns",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152847_1",
                                                                "pk_entity": 152847,
                                                                "entity_version": 1,
                                                                "is_latest_version": true,
                                                                "is_community_favorite": true
                                                            },
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 2,
                                                            "dfh_identifier_in_namespace": "E82",
                                                            "dfh_standard_label": "Actor Appellation",
                                                            "pk_entity": 727,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_appe": {
                                                            "appellation": {
                                                                "appellation_label": {
                                                                    "tokens": [
                                                                        {
                                                                            "id": 0,
                                                                            "string": "Felixs",
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
                                                                            "string": "Ackermanns",
                                                                            "typeId": 3,
                                                                            "isSeparator": false
                                                                        }
                                                                    ],
                                                                    "latestTokenId": 4
                                                                },
                                                                "fk_class": 2,
                                                                "notes": null,
                                                                "pk_entity_version_concat": "152847_1",
                                                                "pk_entity": 152847,
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
                                                "targetClass": {
                                                    "dfh_pk_class": 4,
                                                    "dfh_identifier_in_namespace": "E56",
                                                    "dfh_standard_label": "Language",
                                                    "pk_entity": 729,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Language",
                                                    "pl": "Languages",
                                                    "default": "Language"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154103": {
                                                        "role": {
                                                            "fk_property": 3,
                                                            "fk_entity": 146438,
                                                            "fk_temporal_entity": 152843,
                                                            "is_in_project_count": 0,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154103_1",
                                                            "pk_entity": 154103,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": false,
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
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 4,
                                                            "dfh_identifier_in_namespace": "E56",
                                                            "dfh_standard_label": "Language",
                                                            "pk_entity": 729,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
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
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 737,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 2,
                                                "targetClass": {
                                                    "dfh_pk_class": 2,
                                                    "dfh_identifier_in_namespace": "E82",
                                                    "dfh_standard_label": "Actor Appellation",
                                                    "pk_entity": 727,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 738,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 4,
                                                "targetClass": {
                                                    "dfh_pk_class": 4,
                                                    "dfh_identifier_in_namespace": "E56",
                                                    "dfh_standard_label": "Language",
                                                    "pk_entity": 729,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                    "pk_entity": 742,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:17.302Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:17.302Z",
                                                    "sys_period": "[\"2018-06-04 10:18:17.302383+00\",)",
                                                    "text_properties": []
                                                },
                                                "targetClassPk": 363,
                                                "targetClass": {
                                                    "dfh_pk_class": 363,
                                                    "dfh_identifier_in_namespace": "histC8",
                                                    "dfh_standard_label": "Geographical Place",
                                                    "pk_entity": 733,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "n.N.",
                                                    "pl": "n.N.",
                                                    "default": "n.N."
                                                }
                                            }
                                        ],
                                        "label": "Felixs Ackermanns"
                                    }
                                }
                            }
                        },
                        "_6_ingoing": {
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
                            "targetClass": {
                                "dfh_pk_class": 5,
                                "dfh_identifier_in_namespace": "E67",
                                "dfh_standard_label": "Birth",
                                "pk_entity": 730,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
                            "label": {
                                "sg": "Birth",
                                "pl": "Births",
                                "default": "Birth"
                            },
                            "toggle": "collapsed",
                            "_role_list": {
                                "_154076": {
                                    "role": {
                                        "fk_property": 6,
                                        "fk_entity": 152831,
                                        "fk_temporal_entity": 154070,
                                        "is_in_project_count": 0,
                                        "is_standard_in_project_count": 0,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "154076_1",
                                        "pk_entity": 154076,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": false,
                                        "temporal_entity": {
                                            "fk_class": 5,
                                            "notes": null,
                                            "pk_entity_version_concat": "154070_1",
                                            "pk_entity": 154070,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        }
                                    },
                                    "isCircular": false,
                                    "isOutgoing": false,
                                    "targetDfhClass": {
                                        "dfh_pk_class": 5,
                                        "dfh_identifier_in_namespace": "E67",
                                        "dfh_standard_label": "Birth",
                                        "pk_entity": 730,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                    },
                                    "isDisplayRoleForRange": true,
                                    "_teEnt": {
                                        "selectPropState": "init",
                                        "toggle": "collapsed",
                                        "teEnt": {
                                            "fk_class": 5,
                                            "notes": null,
                                            "pk_entity_version_concat": "154070_1",
                                            "pk_entity": 154070,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        },
                                        "fkClass": 5,
                                        "dfhClass": {
                                            "dfh_pk_class": 5,
                                            "dfh_identifier_in_namespace": "E67",
                                            "dfh_standard_label": "Birth",
                                            "pk_entity": 730,
                                            "entity_version": 1,
                                            "notes": null,
                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)",
                                            "text_properties": []
                                        },
                                        "_roleSet_list": {
                                            "_4_outgoing": {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Mother",
                                                    "pl": "Mothers",
                                                    "default": "Mother"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154073": {
                                                        "role": {
                                                            "fk_property": 4,
                                                            "fk_entity": 153776,
                                                            "fk_temporal_entity": 154070,
                                                            "is_in_project_count": 0,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154073_1",
                                                            "pk_entity": 154073,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": false,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "_5_outgoing": {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Father",
                                                    "pl": "Fathers",
                                                    "default": "Father"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154072": {
                                                        "role": {
                                                            "fk_property": 5,
                                                            "fk_entity": 153776,
                                                            "fk_temporal_entity": 154070,
                                                            "is_in_project_count": 0,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154072_1",
                                                            "pk_entity": 154072,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": false,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "_6_outgoing": {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Born child",
                                                    "pl": "Born children",
                                                    "default": "Born children"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154076": {
                                                        "role": {
                                                            "fk_property": 6,
                                                            "fk_entity": 152831,
                                                            "fk_temporal_entity": 154070,
                                                            "is_in_project_count": 0,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154076_1",
                                                            "pk_entity": 154076,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": false,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Mother",
                                                    "pl": "Mothers",
                                                    "default": "Mother"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Father",
                                                    "pl": "Fathers",
                                                    "default": "Father"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Born child",
                                                    "pl": "Born children",
                                                    "default": "Born children"
                                                }
                                            }
                                        ]
                                    }
                                },
                                "_154107": {
                                    "role": {
                                        "fk_property": 6,
                                        "fk_entity": 152831,
                                        "fk_temporal_entity": 154105,
                                        "is_in_project_count": 1,
                                        "is_standard_in_project_count": 0,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "154107_1",
                                        "pk_entity": 154107,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": true,
                                        "temporal_entity": {
                                            "fk_class": 5,
                                            "notes": null,
                                            "pk_entity_version_concat": "154105_1",
                                            "pk_entity": 154105,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        }
                                    },
                                    "isCircular": false,
                                    "isOutgoing": false,
                                    "targetDfhClass": {
                                        "dfh_pk_class": 5,
                                        "dfh_identifier_in_namespace": "E67",
                                        "dfh_standard_label": "Birth",
                                        "pk_entity": 730,
                                        "entity_version": 1,
                                        "notes": null,
                                        "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                        "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                        "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                    },
                                    "isDisplayRoleForRange": true,
                                    "_teEnt": {
                                        "selectPropState": "init",
                                        "toggle": "collapsed",
                                        "teEnt": {
                                            "fk_class": 5,
                                            "notes": null,
                                            "pk_entity_version_concat": "154105_1",
                                            "pk_entity": 154105,
                                            "entity_version": 1,
                                            "is_latest_version": true,
                                            "is_community_favorite": true
                                        },
                                        "fkClass": 5,
                                        "dfhClass": {
                                            "dfh_pk_class": 5,
                                            "dfh_identifier_in_namespace": "E67",
                                            "dfh_standard_label": "Birth",
                                            "pk_entity": 730,
                                            "entity_version": 1,
                                            "notes": null,
                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)",
                                            "text_properties": []
                                        },
                                        "_roleSet_list": {
                                            "_4_outgoing": {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Mother",
                                                    "pl": "Mothers",
                                                    "default": "Mother"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154109": {
                                                        "role": {
                                                            "fk_property": 4,
                                                            "fk_entity": 153629,
                                                            "fk_temporal_entity": 154105,
                                                            "is_in_project_count": 1,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154109_1",
                                                            "pk_entity": 154109,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "_6_outgoing": {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Born child",
                                                    "pl": "Born children",
                                                    "default": "Born children"
                                                },
                                                "toggle": "collapsed",
                                                "_role_list": {
                                                    "_154107": {
                                                        "role": {
                                                            "fk_property": 6,
                                                            "fk_entity": 152831,
                                                            "fk_temporal_entity": 154105,
                                                            "is_in_project_count": 1,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154107_1",
                                                            "pk_entity": 154107,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": true,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": true,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                            }
                                                        }
                                                    },
                                                    "_154111": {
                                                        "role": {
                                                            "fk_property": 6,
                                                            "fk_entity": 153041,
                                                            "fk_temporal_entity": 154105,
                                                            "is_in_project_count": 0,
                                                            "is_standard_in_project_count": 0,
                                                            "community_favorite_calendar": null,
                                                            "pk_entity_version_concat": "154111_1",
                                                            "pk_entity": 154111,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "is_latest_version": true,
                                                            "is_community_favorite": false,
                                                            "language": {},
                                                            "appellation": {},
                                                            "time_primitive": {}
                                                        },
                                                        "isCircular": false,
                                                        "isOutgoing": true,
                                                        "targetDfhClass": {
                                                            "dfh_pk_class": 1,
                                                            "dfh_identifier_in_namespace": "E21",
                                                            "dfh_standard_label": "Person",
                                                            "pk_entity": 726,
                                                            "entity_version": 1,
                                                            "notes": null,
                                                            "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                            "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                            "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                        },
                                                        "isDisplayRoleForRange": true,
                                                        "_leaf_peIt": {
                                                            "dfhClass": {
                                                                "dfh_pk_class": 1,
                                                                "dfh_identifier_in_namespace": "E21",
                                                                "dfh_standard_label": "Person",
                                                                "pk_entity": 726,
                                                                "entity_version": 1,
                                                                "notes": null,
                                                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Mother",
                                                    "pl": "Mothers",
                                                    "default": "Mother"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Father",
                                                    "pl": "Fathers",
                                                    "default": "Father"
                                                }
                                            },
                                            {
                                                "isOutgoing": true,
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
                                                "targetClassPk": 1,
                                                "targetClass": {
                                                    "dfh_pk_class": 1,
                                                    "dfh_identifier_in_namespace": "E21",
                                                    "dfh_standard_label": "Person",
                                                    "pk_entity": 726,
                                                    "entity_version": 1,
                                                    "notes": null,
                                                    "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                                    "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                                    "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                                                },
                                                "label": {
                                                    "sg": "Born child",
                                                    "pl": "Born children",
                                                    "default": "Born children"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
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
                            "targetClass": {
                                "dfh_pk_class": 3,
                                "dfh_identifier_in_namespace": "F52",
                                "dfh_standard_label": "Name Use Activity",
                                "pk_entity": 728,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
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
                            "targetClass": {
                                "dfh_pk_class": 5,
                                "dfh_identifier_in_namespace": "E67",
                                "dfh_standard_label": "Birth",
                                "pk_entity": 730,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
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
                            "targetClass": {
                                "dfh_pk_class": 5,
                                "dfh_identifier_in_namespace": "E67",
                                "dfh_standard_label": "Birth",
                                "pk_entity": 730,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
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
                            "targetClass": {
                                "dfh_pk_class": 5,
                                "dfh_identifier_in_namespace": "E67",
                                "dfh_standard_label": "Birth",
                                "pk_entity": 730,
                                "entity_version": 1,
                                "notes": null,
                                "tmsp_creation": "2018-06-04T10:18:05.637Z",
                                "tmsp_last_modification": "2018-06-04T10:18:05.637Z",
                                "sys_period": "[\"2018-06-04 10:18:05.637764+00\",)"
                            },
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

            <gv-init-state [initState]="state"></gv-init-state>
            <div class="d-flex justify-content-center mt-5">
            
            
                <div style="width:430px;height:400px" class="d-flex">
            
            
                    <form #f="ngForm">
                        <gv-pe-it-add-ctrl [basePath]="basePath"
                            name="peIt" [(ngModel)]="model.peIt" #peIt="ngModel" required>
                        </gv-pe-it-add-ctrl>
                    </form>     
                    
                </div>


                <div style="height:500px; overflow:scroll;">
                    <p>Form.valid: {{f?.valid | json}}</p>

                    <p>Form.touched: {{f?.touched | json}}</p>

                    <p>Form.dirty: {{f?.dirty | json}}</p>

                    <p>Form.value </p>
                    <pre>
                        {{f?.value | json}}
                    </pre>

                </div>

            </div>


        `
    })
    .add('PeIt add ctrl | data from api', {
        context: {
            model: {},
            basePath: ['_peIt_add_form'],
            pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
            pkEntity: 152831,
            state: {
                activeProject: {
                    pk_project: -1 // use same pkProject
                } as Project,
                _peIt_add_form: undefined
            }
        },
        template: `
        <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_add_form = $event"
        ></gv-init-pe-it-editable-state>
    
        <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
         
        
            <div style="width:430px;height:400px" class="d-flex">
        
                <gv-init-state [initState]="state"></gv-init-state>
        
                <form #f="ngForm">
                    <gv-pe-it-add-ctrl [basePath]="basePath"
                        name="val" [(ngModel)]="model.val" #val="ngModel" required>
                    </gv-pe-it-add-ctrl>
                </form>     
                
            </div>


            <div style="height:500px; overflow:scroll;">
                <p>Form.valid: {{f?.valid | json}}</p>

                <p>Form.touched: {{f?.touched | json}}</p>

                <p>Form.dirty: {{f?.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f?.value | json}}
                </pre>

            </div>

        </div>


    `
    })


