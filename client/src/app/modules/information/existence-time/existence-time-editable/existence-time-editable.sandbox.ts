import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { crm } from '../../information.sandbox.mock';
import { Information2Module } from '../../information.module';
import { DfhConfig } from '../../shared/dfh-config';
import { ExistenceTimeEditableComponent } from './existence-time-editable.component';



export default sandboxOf(ExistenceTimeEditableComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('Existence Time Editable | empty ', {
        context: {
            model: {
            },
            basePath: ['_teEnt', '_fields', '_existenceTime'],
            initState: {
                activeProject: {
                    pk_project: 57,
                    crm: crm
                },
                "_teEnt": {
                    _fields: {
                        "_existenceTime": { //  <- Existence Time
                            "roles": [
                            ],
                            "toggle": "expanded",
                        },
                    },
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
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
    
                <div style="width:430px;height:400px" class="d-flex mr-2">
                    <form #f="ngForm">
                       <gv-existence-time-editable 
                       class="form-control"  
                       name="extime"  
                       [(ngModel)]="model.role" 
                       #role="ngModel" 
                       [basePath]="basePath" 
                        mode='create'
                        required
                        >
                        </gv-existence-time-editable>
                    </form>                               
                </div>
                <div>
                    <p>Form.valid: {{f.valid | json}}</p>

                    <p>Form.touched: {{f.touched | json}}</p>

                    <p>Form.dirty: {{f.dirty | json}}</p>

                    <p>Form.value </p>
                    <pre>
                        {{f.value | json}}
                    </pre>
            
                </div>

            </div>
        `
    })
    .add('Existence Time Editable | with 152 ', {
        context: {
            model: {
            },
            basePath: ['_teEnt', '_fields', '_existenceTime'],
            initState: {
                activeProject: {
                    pk_project: 57,
                    crm: crm
                },
                "_teEnt": {
                    _fields: {

                        "_existenceTime": { //  <- Existence Time
                            "roles": [
                            ],
                            "toggle": "expanded",
                            _fields: {
                                '_152_outgoing': {
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
                                    "isOutgoing": true,
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
                                    "label": {
                                        "sg": "At some time within",
                                        "pl": "n.N.",
                                        "default": "At some time within"
                                    }
                                }
                            },
                        }
                    },
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
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
    
                    <gv-existence-time-editable [basePath]="basePath" mode='editable'>
                    </gv-existence-time-editable>
                        
                </div>
             
            </div>
        `
    })
    .add('Existence Time Editable | with 150 & 151 ', {
        context: {
            model: {
            },
            basePath: ['_teEnt', '_existenceTime'],
            initState: {
                activeProject: {
                    pk_project: 57
                },
                "_teEnt": {
                    "_existenceTime": { //  <- Existence Time
                        "roles": [
                        ],
                        "toggle": "expanded",
                        _fields: {
                            '_150_outgoing': {
                                _role_list: {
                                    _undefined: {
                                        role: {
                                            pk_entity: 999,
                                            "fk_property": 150,
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
                                "isOutgoing": true,
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
                            '_151_outgoing': {
                                _role_list: {
                                    _undefined: {
                                        role: {
                                            pk_entity: 999,
                                            "fk_property": 151,
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
                                "isOutgoing": true,
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
                            }
                        },
                        "outgoingPropertyFields": [
                            {
                                "isOutgoing": true,
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
                                "isOutgoing": true,
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
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 151,
                                    "dfh_identifier_in_namespace": "P81a",
                                    "dfh_has_domain": 22,
                                    "dfh_has_range": 335,
                                    "dfh_creation_time": null,
                                    "dfh_modification_time": null,
                                    "dfh_standard_label": "Begin of end",
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
                                "isOutgoing": true,
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
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 150,
                                    "dfh_standard_label": "End of begin",
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
                                "isOutgoing": true,
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
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
    
                    <gv-existence-time-editable [basePath]="basePath">
                    </gv-existence-time-editable>
                        
                </div>
             
            </div>
        `
    })
    .add('Existence Time Editable | with 72 ', {
        context: {
            model: {
            },
            basePath: ['_teEnt', '_existenceTime'],
            initState: {
                activeProject: {
                    pk_project: 57
                },
                "_teEnt": {
                    "_existenceTime": { //  <- Existence Time
                        "roles": [
                        ],
                        "toggle": "expanded",
                        _fields: {

                            '_72_outgoing': {
                                _role_list: {
                                    _undefined: {
                                        role: {
                                            pk_entity: 999,
                                            "fk_property": 72,
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
                                "isOutgoing": true,
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
                            }
                        },
                        "outgoingPropertyFields": [
                            {
                                "isOutgoing": true,
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
                                "isOutgoing": true,
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
                                "isOutgoing": true,
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
                                "isOutgoing": true,
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
                                "isOutgoing": true,
                                "property": {
                                    "dfh_pk_property": 150,
                                    "dfh_standard_label": "End of begin",
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
                                "isOutgoing": true,
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
                    }
                }
            }
        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
    
                    <gv-existence-time-editable [basePath]="basePath">
                    </gv-existence-time-editable>
                        
                </div>
             
            </div>
        `
    })