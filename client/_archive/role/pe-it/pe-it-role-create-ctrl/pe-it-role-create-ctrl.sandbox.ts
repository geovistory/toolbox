import { sandboxOf } from 'angular-playground';
import { DfhClass, DfhProperty, InfRole, ProProject } from 'app/core';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { RoleDetail, PropertyField } from 'app/core/state/models';
import { Information2Module } from '../../../information.module';
import { roleCreateMock } from './mock';
import { PeItRoleCreateCtrlComponent } from './pe-it-role-create-ctrl.component';
import { crm } from '../../../information.sandbox.mock';
import { DfhConfig } from '../../../shared/dfh-config';



export default sandboxOf(PeItRoleCreateCtrlComponent, {
  imports: [
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('PeIt Role Create Ctrl | Name ', {
    context: {
      model: {
      },
      parentPath: ['_property_field_1'],
      index: 'new_role_0',
      initState: {
        activeProject: {
          crm: crm
        },
        '_property_field_1': {
          _role_list: {
            "new_role_0": {
              "role": {
                "fk_property": 1193,
                "fk_entity": 33995,
                "temporal_entity": {
                  "fk_class": 365
                }
              },
              "isCircular": false,
              "targetClassPk": 365,
              "isOutgoing": false,
              "toggle": "expanded",
              "_teEnt": {
                "selectPropState": "init",
                "toggle": "collapsed",
                "teEnt": {
                  "fk_class": 365
                },
                "fkClass": 365,
                "_fields": {
                  "_1113_outgoing": {
                    "isOutgoing": true,
                    "property": {
                      "dfh_pk_property": 1113,
                      "dfh_identifier_in_namespace": "histP11",
                      "dfh_has_domain": 365,
                      "dfh_has_range": 40,
                      "dfh_fk_property_of_origin": null,
                      "dfh_domain_instances_min_quantifier": 0,
                      "dfh_domain_instances_max_quantifier": 1,
                      "dfh_range_instances_min_quantifier": 1,
                      "dfh_range_instances_max_quantifier": 1,
                      "ui_context_config": [
                        {
                          "pk_entity": 169,
                          "fk_ui_context": 104,
                          "fk_project": null,
                          "fk_property": 1113,
                          "fk_class_field": null,
                          "property_is_outgoing": true,
                          "ord_num": 0
                        },
                        {
                          "pk_entity": 150,
                          "fk_ui_context": 103,
                          "fk_project": null,
                          "fk_property": 1113,
                          "fk_class_field": null,
                          "property_is_outgoing": true,
                          "ord_num": 0
                        }
                      ]
                    },
                    "targetClassPk": 40,
                    "label": {
                      "sg": "Detailed Name",
                      "pl": "Detailed Names",
                      "default": "Detailed Name"
                    },
                    "type": "PropertyField",
                    "toggle": "expanded",
                    "_role_list": {
                      "_undefined": {
                        "role": {
                          "appellation": {
                            "fk_class": 40
                          },
                          "entity_version_project_rels": [
                            {
                              "is_in_project": true,
                              "is_standard_in_project": true
                            }
                          ]
                        },
                        "isCircular": false,
                        "isOutgoing": true,
                        "targetClassPk": 40,
                        "isDisplayRoleForRange": true,
                        "_appe": {
                          "appellation": {
                            "appellation_label": {
                              "tokens": [
                                {
                                  "id": 0,
                                  "string": "",
                                  "isSeparator": false
                                }
                              ],
                              "latestTokenId": 0
                            }
                          }
                        }
                      }
                    }
                  },
                  "_field_48": {
                    "type": "ExistenceTimeDetail",
                    "roles": [],
                    "toggle": "expanded"
                  }
                }
              }
            }
          }
        }
      }
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-pe-it-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-role-create-ctrl>
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
  .add('PeIt Role Create Ctrl | Massive mock ', {
    context: {
      model: {
      },
      parentPath: ['_property_field_1'],
      index: '_role_detail_1',
      initState: {
        activeProject: {
          pk_entity: 52
        } as ProProject,
        '_property_field_1': {
          _role_list: {
            _role_detail_1: roleCreateMock
          }
        }
      }
    },
    template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-pe-it-role-create-ctrl [parentPath]="parentPath" [index]="index"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-role-create-ctrl>
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
