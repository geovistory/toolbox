import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information2.module';
import { TeEntRoleSetFormComponent } from './te-ent-role-set-form.component';



export default sandboxOf(TeEntRoleSetFormComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt RoleSet Form | Birth (with child)', {
        context: {
            addForm: {},
            createForm: {},
            cancelled: undefined,
            added: undefined,
            parentPath: ['_teEnt', '_roleSet_list', '_6_outgoing'],
            parentTeEntStatePath: ['_teEnt'],
            initState: {
                "activeProject": {
                    "pk_project": 51
                },
                "_teEnt": {
                    "selectPropState": "init",
                    "toggle": "collapsed",
                    "teEnt": {
                        "fk_class": 5,
                        "notes": null,
                        "pk_entity_version_concat": "153955_1",
                        "pk_entity": 153955,
                        "entity_version": 1,
                        "is_latest_version": true,
                        "is_community_favorite": true,
                        "entity_version_project_rels": [
                            {
                                "pk_entity_version_project_rel": 10802,
                                "fk_project": 51,
                                "fk_entity": 153955,
                                "fk_entity_version": 1,
                                "fk_entity_version_concat": "153955_1",
                                "is_in_project": true,
                                "is_standard_in_project": false,
                                "calendar": null,
                                "tmsp_last_modification": "2018-06-05T06:52:33.359446+00:00"
                            }
                        ]
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
                        "_6_outgoing": {
                            _role_set_form: {}, // <- add this to init the role set (gv-te-ent-role-set-form)
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
                            "label": {
                                "sg": "Born child",
                                "pl": "Born children",
                                "default": "Born children"
                            },
                            "toggle": "collapsed",
                            "_role_list": {
                                "_153957": {
                                    "role": {
                                        "fk_property": 6,
                                        "fk_entity": 152852,
                                        "fk_temporal_entity": 153955,
                                        "is_in_project_count": 1,
                                        "is_standard_in_project_count": 0,
                                        "community_favorite_calendar": null,
                                        "pk_entity_version_concat": "153957_1",
                                        "pk_entity": 153957,
                                        "entity_version": 1,
                                        "notes": null,
                                        "is_latest_version": true,
                                        "is_community_favorite": true,
                                        "entity_version_project_rels": [
                                            {
                                                "pk_entity_version_project_rel": 10803,
                                                "fk_project": 51,
                                                "fk_entity": 153957,
                                                "fk_entity_version": 1,
                                                "fk_entity_version_concat": "153957_1",
                                                "is_in_project": true,
                                                "is_standard_in_project": false,
                                                "calendar": null,
                                                "tmsp_last_modification": "2018-06-05T06:52:33.381872+00:00"
                                            }
                                        ],
                                        "appellation": {},
                                        "language": {},
                                        "time_primitive": {}
                                    },
                                    "isOutgoing": true,
                                    "isCircular": true,
                                    "isDisplayRoleForDomain": null,
                                    "isDisplayRoleForRange": false,
                                    "_leaf_peIt": {}
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
                            "label": {
                                "sg": "Born child",
                                "pl": "Born children",
                                "default": "Born children"
                            }
                        }
                    ]
                }
            }

        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

                <gv-te-ent-role-set-form [parentPath]="parentPath" [parentTeEntPath]="parentTeEntStatePath" (createRoles)="createRoles($event)" (addFormChange)="addForm = $event" 
                (createFormChange)="createForm = $event" ></gv-te-ent-role-set-form>
                

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
    .add('TeEnt RoleSet Form | Birth (no child)', {
        context: {
            addForm: {},
            createForm: {},
            cancelled: undefined,
            added: undefined,
            parentPath: ['_teEnt', '_roleSet_list', '_6_outgoing'],
            parentTeEntStatePath: ['_teEnt'],
            initState: {
                "activeProject": {
                    "pk_project": 51
                },
                "_teEnt": {
                    "selectPropState": "init",
                    "toggle": "collapsed",
                    "teEnt": {
                        "fk_class": 5,
                        "notes": null,
                        "pk_entity_version_concat": "153955_1",
                        "pk_entity": 153955,
                        "entity_version": 1,
                        "is_latest_version": true,
                        "is_community_favorite": true,
                        "entity_version_project_rels": [
                            {
                                "pk_entity_version_project_rel": 10802,
                                "fk_project": 51,
                                "fk_entity": 153955,
                                "fk_entity_version": 1,
                                "fk_entity_version_concat": "153955_1",
                                "is_in_project": true,
                                "is_standard_in_project": false,
                                "calendar": null,
                                "tmsp_last_modification": "2018-06-05T06:52:33.359446+00:00"
                            }
                        ]
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
                        "_6_outgoing": {
                            _role_set_form: {}, // <- add this to init the role set (gv-te-ent-role-set-form)
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
                            "label": {
                                "sg": "Born child",
                                "pl": "Born children",
                                "default": "Born children"
                            },
                            "toggle": "collapsed",
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
                            "label": {
                                "sg": "Born child",
                                "pl": "Born children",
                                "default": "Born children"
                            }
                        }
                    ]
                }
            }

        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

                <gv-te-ent-role-set-form [parentPath]="parentPath" [parentTeEntPath]="parentTeEntStatePath" (createRoles)="createRoles($event)" (addFormChange)="addForm = $event" 
                (createFormChange)="createForm = $event" ></gv-te-ent-role-set-form>
                

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
    .add('TeEnt RoleSet Form | Appellation', {
        context: {
            addForm: {},
            createForm: {},
            cancelled: undefined,
            added: undefined,
            parentPath: ['_teEnt', '_roleSet_list', '_2_outgoing'],
            parentTeEntStatePath: ['_teEnt'],
            initState: {
                "activeProject": {
                    "pk_project": 51
                },
                "_teEnt": {
                    "selectPropState": "init",
                    "toggle": "collapsed",
                    "teEnt": {
                      "fk_class": 3,
                      "notes": null,
                      "pk_entity_version_concat": "152854_1",
                      "pk_entity": 152854,
                      "entity_version": 1,
                      "is_latest_version": true,
                      "is_community_favorite": true,
                      "entity_version_project_rels": [
                        {
                          "pk_entity_version_project_rel": 10221,
                          "fk_project": 52,
                          "fk_entity": 152854,
                          "fk_entity_version": 1,
                          "fk_entity_version_concat": "152854_1",
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
                        "label": {
                          "sg": "Entity with this Name",
                          "pl": "Entities with this Name",
                          "default": "Entities with this Name"
                        },
                        "toggle": "collapsed",
                        "_role_list": {
                          "_152856": {
                            "role": {
                              "fk_property": 1,
                              "fk_entity": 152852,
                              "fk_temporal_entity": 152854,
                              "is_in_project_count": 1,
                              "is_standard_in_project_count": 1,
                              "community_favorite_calendar": null,
                              "pk_entity_version_concat": "152856_1",
                              "pk_entity": 152856,
                              "entity_version": 1,
                              "notes": null,
                              "is_latest_version": true,
                              "is_community_favorite": true,
                              "entity_version_project_rels": [
                                {
                                  "pk_entity_version_project_rel": 10222,
                                  "fk_project": 52,
                                  "fk_entity": 152856,
                                  "fk_entity_version": 1,
                                  "fk_entity_version_concat": "152856_1",
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
                            "isCircular": false,
                            "isDisplayRoleForDomain": null,
                            "isDisplayRoleForRange": true,
                            "_leaf_peIt": {}
                          }
                        }
                      },
                      "_2_outgoing": {
                        _role_set_form: {}, // <- add this to init the role set (gv-te-ent-role-set-form)
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
                          "_152860": {
                            "role": {
                              "fk_property": 2,
                              "fk_entity": 152858,
                              "fk_temporal_entity": 152854,
                              "is_in_project_count": 1,
                              "is_standard_in_project_count": 0,
                              "community_favorite_calendar": null,
                              "pk_entity_version_concat": "152860_1",
                              "pk_entity": 152860,
                              "entity_version": 1,
                              "notes": null,
                              "is_latest_version": true,
                              "is_community_favorite": true,
                              "entity_version_project_rels": [
                                {
                                  "pk_entity_version_project_rel": 10224,
                                  "fk_project": 52,
                                  "fk_entity": 152860,
                                  "fk_entity_version": 1,
                                  "fk_entity_version_concat": "152860_1",
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
                                      "string": "Hildegard",
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
                                      "string": "Lanz",
                                      "typeId": 3,
                                      "isSeparator": false
                                    }
                                  ],
                                  "latestTokenId": 4
                                },
                                "fk_class": 2,
                                "notes": null,
                                "pk_entity_version_concat": "152858_1",
                                "pk_entity": 152858,
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
                                      "string": "Hildegard",
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
                                      "string": "Lanz",
                                      "typeId": 3,
                                      "isSeparator": false
                                    }
                                  ],
                                  "latestTokenId": 4
                                },
                                "fk_class": 2,
                                "notes": null,
                                "pk_entity_version_concat": "152858_1",
                                "pk_entity": 152858,
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
                          "_152862": {
                            "role": {
                              "fk_property": 3,
                              "fk_entity": 146438,
                              "fk_temporal_entity": 152854,
                              "is_in_project_count": 1,
                              "is_standard_in_project_count": 0,
                              "community_favorite_calendar": null,
                              "pk_entity_version_concat": "152862_1",
                              "pk_entity": 152862,
                              "entity_version": 1,
                              "notes": null,
                              "is_latest_version": true,
                              "is_community_favorite": true,
                              "entity_version_project_rels": [
                                {
                                  "pk_entity_version_project_rel": 10225,
                                  "fk_project": 52,
                                  "fk_entity": 152862,
                                  "fk_entity_version": 1,
                                  "fk_entity_version_concat": "152862_1",
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
                    "label": "Hildegard Lanz"
                  }
            }

        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

                <gv-te-ent-role-set-form [parentPath]="parentPath" [parentTeEntPath]="parentTeEntStatePath" (createRoles)="createRoles($event)" (addFormChange)="addForm = $event" 
                (createFormChange)="createForm = $event" ></gv-te-ent-role-set-form>
                

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