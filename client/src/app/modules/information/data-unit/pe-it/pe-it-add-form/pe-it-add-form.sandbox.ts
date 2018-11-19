import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information.module';
import { PeItAddFormComponent } from './pe-it-add-form.component';
import { InitPeItEditableStateModule } from 'app/shared';
import { StateSettings } from 'app/core/state/services/state-creator';
import { crm } from 'app/core/active-project/_mock-data';

export default sandboxOf(PeItAddFormComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('PeIt add form | with buttons', {
    context: {
      f: {},
      cancelled: undefined,
      added: undefined,
      basePath: ['sandboxState', '_peIt_add_form'],
      pkProject: 8, // use a pk of a project that has the pkEntity not yet added
      pkEntity: 25893,
      settings: {
        pkUiContext: 1,
        isViewMode: true
      } as StateSettings,
      activeProject: {
        pk_project: 8, // use same pkProject
        crm
      },
      sandboxState: {
        _peIt_add_form: undefined
      },
      stateCreated: false

    },
    template: `
    <gv-init-state [activeProject]="activeProject" [sandboxState]="sandboxState">
      <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" [settings]="settings" (stateCreated)="stateCreated = true"
      ></gv-init-pe-it-editable-state>
    </gv-init-state>


    <div class="container">
      <div class="row" *ngIf="stateCreated">
        <div style="width:430px;height:700px" class="col-6">


          <gv-pe-it-add-form [basePath]="basePath" (formChange)="f = $event"
          (added)="added = $event" addBtn="true" cancelBtn="true"
          (cancel)="cancelled = true" ></gv-pe-it-add-form>

        </div>

        <div class="col-6" >
            <p *ngIf="cancelled">Cancelled</p>
            <p *ngIf="added">Added: {{added | json}}</p>
            <p>Form.valid: {{f.valid | json}}</p>

            <p>Form.touched: {{f.touched | json}}</p>

            <p>Form.dirty: {{f.dirty | json}}</p>

            <p>Form.value </p>
            <ngx-json-viewer [json]="f.value" [expanded]="false"></ngx-json-viewer>

        </div>
      </div>
    </div>
    `
  })
  .add('PeIt add form | no buttons', {
    context: {
      f: {},
      added: undefined,
      basePath: ['_peIt_add_form'],
      pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
      pkEntity: 153083,
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

        <gv-pe-it-add-form [basePath]="basePath" (formChange)="f = $event" (added)="added = $event"></gv-pe-it-add-form>

      </div>

      <div>
        <p *ngIf="added">Added: {{added | json}}</p>
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
  .add('PeIt add form | minimum', {
    context: {
      f: {},
      added: undefined,
      basePath: ['_peIt_add_form'],
      pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
      pkEntity: 153083,
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
            "entity_version_project_rels": [
              {
                "pk_entity_version_project_rel": 10220,
                "fk_project": 52,
                "fk_entity": 152852,
                "fk_entity_version": 1,
                "fk_entity_version_concat": "152852_1",
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
          "_fields": {
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
                    "entity_version_project_rels": [
                      {
                        "pk_entity_version_project_rel": 10227,
                        "fk_project": 52,
                        "fk_entity": 152866,
                        "fk_entity_version": 1,
                        "fk_entity_version_concat": "152866_1",
                        "is_in_project": true,
                        "is_standard_in_project": false,
                        "calendar": null,
                        "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                      }
                    ],
                    "temporal_entity": {
                      "fk_class": 3,
                      "notes": null,
                      "pk_entity_version_concat": "152864_1",
                      "pk_entity": 152864,
                      "entity_version": 1,
                      "is_latest_version": true,
                      "is_community_favorite": true,
                      "entity_version_project_rels": [
                        {
                          "pk_entity_version_project_rel": 10226,
                          "fk_project": 52,
                          "fk_entity": 152864,
                          "fk_entity_version": 1,
                          "fk_entity_version_concat": "152864_1",
                          "is_in_project": true,
                          "is_standard_in_project": null,
                          "calendar": null,
                          "tmsp_last_modification": "2018-06-04T10:18:17.648895+00:00"
                        }
                      ]
                    }
                  },
                  "isCircular": false,
                  "isOutgoing": false,
                  targetClassPk: 3,
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
                      "entity_version_project_rels": [
                        {
                          "pk_entity_version_project_rel": 10226,
                          "fk_project": 52,
                          "fk_entity": 152864,
                          "fk_entity_version": 1,
                          "fk_entity_version_concat": "152864_1",
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
                    "_fields": {
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
                              "entity_version_project_rels": [
                                {
                                  "pk_entity_version_project_rel": 10229,
                                  "fk_project": 52,
                                  "fk_entity": 152870,
                                  "fk_entity_version": 1,
                                  "fk_entity_version_concat": "152870_1",
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
                            targetClassPk: 2,
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
                    "ingoingPropertyFields": [],
                    "outgoingPropertyFields": [
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

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
      <div style="width:430px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-add-form [basePath]="basePath" (formChange)="f = $event" (added)="added = $event"></gv-pe-it-add-form>

      </div>

      <div>
        <p *ngIf="added">Added: {{added | json}}</p>
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



