import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information2.module';
import { TeEntRoleAddCtrlComponent } from './te-ent-role-add-ctrl.component';




export default sandboxOf(TeEntRoleAddCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Role Add Ctrl | Appe ', {
        context: {
            model: {
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
            },
            parentPath: ['_2_outgoing'],
            intermediatePathSegment: '_role_list',
            index: '_152870',
            initState: {
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
            }

        },
        template: `
            <gv-init-state [initState]="initState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-te-ent-role-add-ctrl [parentPath]="parentPath" [intermediatePathSegment]="intermediatePathSegment" [index]="index"
                            name="role" [(ngModel)]="model.role" #role="ngModel" required>
                        </gv-te-ent-role-add-ctrl>
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
