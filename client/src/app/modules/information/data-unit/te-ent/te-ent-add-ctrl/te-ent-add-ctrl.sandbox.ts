import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information.module';
import { TeEntAddCtrlComponent } from './te-ent-add-ctrl.component';
import { InfTemporalEntity } from '../../../../../core';
import { crm } from '../../../information.sandbox.mock';




export default sandboxOf(TeEntAddCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TeEnt Add Ctrl | Birth ', {
        context: {
            model: {
                "parentRole": {
                    pk_entity: 99,
                    fk_class: 111
                }
            },
            parentPath: ['_role_detail_1'],
            initState: {
                activeProject: {
                    crm: crm
                },
                _role_detail_1: {
                  role: {
                    fk_property: 1186,
                    fk_entity: 34156,
                    fk_temporal_entity: 34170,
                    is_in_project_count: 2,
                    is_standard_in_project_count: 1,
                    community_favorite_calendar: null,
                    pk_entity_version_concat: '34174_1',
                    pk_entity: 34174,
                    entity_version: 1,
                    notes: null,
                    is_latest_version: true,
                    is_community_favorite: true,
                    temporal_entity: {
                      fk_class: 61,
                      notes: null,
                      pk_entity_version_concat: '34170_1',
                      pk_entity: 34170,
                      entity_version: 1,
                      is_latest_version: true,
                      is_community_favorite: true,
                      te_roles: [
                        {
                          fk_property: 72,
                          fk_entity: 34013,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: 'gregorian',
                          pk_entity_version_concat: '34172_1',
                          pk_entity: 34172,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {
                            pk_entity: 34013,
                            fk_class: 335,
                            julian_day: 2447162,
                            duration: '1 year'
                          }
                        },
                        {
                          fk_property: 85,
                          fk_entity: 34119,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: null,
                          pk_entity_version_concat: '34176_1',
                          pk_entity: 34176,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {}
                        },
                        {
                          fk_property: 72,
                          fk_entity: 33969,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: 'gregorian',
                          pk_entity_version_concat: '34187_1',
                          pk_entity: 34187,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {
                            pk_entity: 33969,
                            fk_class: 335,
                            julian_day: 2378497,
                            duration: '1 year'
                          }
                        },
                        {
                          fk_property: 85,
                          fk_entity: 34142,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: null,
                          pk_entity_version_concat: '34189_1',
                          pk_entity: 34189,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {}
                        }
                      ]
                    },
                    entity_version_project_rels: [
                      {
                        is_in_project: true,
                        is_standard_in_project: true
                      }
                    ]
                  },
                  isCircular: false,
                  isOutgoing: false,
                  targetClassPk: 61,
                  isDisplayRoleForRange: true,
                  _teEnt: {
                    selectPropState: 'init',
                    toggle: 'collapsed',
                    teEnt: {
                      fk_class: 61,
                      notes: null,
                      pk_entity_version_concat: '34170_1',
                      pk_entity: 34170,
                      entity_version: 1,
                      is_latest_version: true,
                      is_community_favorite: true,
                      te_roles: [
                        {
                          fk_property: 72,
                          fk_entity: 34013,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: 'gregorian',
                          pk_entity_version_concat: '34172_1',
                          pk_entity: 34172,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {
                            pk_entity: 34013,
                            fk_class: 335,
                            julian_day: 2447162,
                            duration: '1 year'
                          }
                        },
                        {
                          fk_property: 85,
                          fk_entity: 34119,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: null,
                          pk_entity_version_concat: '34176_1',
                          pk_entity: 34176,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {}
                        },
                        {
                          fk_property: 72,
                          fk_entity: 33969,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: 'gregorian',
                          pk_entity_version_concat: '34187_1',
                          pk_entity: 34187,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {
                            pk_entity: 33969,
                            fk_class: 335,
                            julian_day: 2378497,
                            duration: '1 year'
                          }
                        },
                        {
                          fk_property: 85,
                          fk_entity: 34142,
                          fk_temporal_entity: 34170,
                          is_in_project_count: 1,
                          is_standard_in_project_count: 0,
                          community_favorite_calendar: null,
                          pk_entity_version_concat: '34189_1',
                          pk_entity: 34189,
                          entity_version: 1,
                          notes: null,
                          is_latest_version: true,
                          is_community_favorite: true,
                          language: {},
                          appellation: {},
                          time_primitive: {}
                        }
                      ]
                    },
                    fkClass: 61,
                    _fields: {
                      _existenceTime: {
                        type: 'ExistenceTimeDetail',
                        roles: [
                          {
                            fk_property: 72,
                            fk_entity: 34013,
                            fk_temporal_entity: 34170,
                            is_in_project_count: 1,
                            is_standard_in_project_count: 0,
                            community_favorite_calendar: 'gregorian',
                            pk_entity_version_concat: '34172_1',
                            pk_entity: 34172,
                            entity_version: 1,
                            notes: null,
                            is_latest_version: true,
                            is_community_favorite: true,
                            language: {},
                            appellation: {},
                            time_primitive: {
                              pk_entity: 34013,
                              fk_class: 335,
                              julian_day: 2447162,
                              duration: '1 year'
                            }
                          }
                        ],
                        toggle: 'collapsed',
                        _fields: {
                          _72_outgoing: {
                            type: 'PropertyField',
                            isOutgoing: true,
                            property: {
                              dfh_pk_property: 72,
                              dfh_identifier_in_namespace: 'P82_at_some_time_within',
                              dfh_has_domain: 50,
                              dfh_has_range: 335,
                              dfh_fk_property_of_origin: null,
                              dfh_domain_instances_min_quantifier: null,
                              dfh_domain_instances_max_quantifier: null,
                              dfh_range_instances_min_quantifier: null,
                              dfh_range_instances_max_quantifier: null,
                              ui_context_config: [
                                {
                                  pk_entity: 158,
                                  fk_ui_context: 103,
                                  fk_project: null,
                                  fk_property: 72,
                                  fk_class_field: null,
                                  property_is_outgoing: true,
                                  ord_num: 1
                                },
                                {
                                  pk_entity: 164,
                                  fk_ui_context: 104,
                                  fk_project: null,
                                  fk_property: 72,
                                  fk_class_field: null,
                                  property_is_outgoing: true,
                                  ord_num: 1
                                }
                              ]
                            },
                            targetMaxQuantity: null,
                            targetMinQuantity: null,
                            targetClassPk: 335,
                            label: {
                              sg: '[sg: 72: P82_at_some_time_within undefined',
                              pl: 'At some time within',
                              'default': 'At some time within'
                            },
                            _role_list: {
                              _34172: {
                                role: {
                                  fk_property: 72,
                                  fk_entity: 34013,
                                  fk_temporal_entity: 34170,
                                  is_in_project_count: 1,
                                  is_standard_in_project_count: 0,
                                  community_favorite_calendar: 'gregorian',
                                  pk_entity_version_concat: '34172_1',
                                  pk_entity: 34172,
                                  entity_version: 1,
                                  notes: null,
                                  is_latest_version: true,
                                  is_community_favorite: true,
                                  language: {},
                                  appellation: {},
                                  time_primitive: {
                                    pk_entity: 34013,
                                    fk_class: 335,
                                    julian_day: 2447162,
                                    duration: '1 year'
                                  }
                                },
                                isCircular: false,
                                isOutgoing: true,
                                targetClassPk: 335,
                                isDisplayRoleForRange: true,
                                _timePrimitive: {
                                  timePrimitive: {
                                    pk_entity: 34013,
                                    fk_class: 335,
                                    julian_day: 2447162,
                                    duration: '1 year'
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      _85_outgoing: {
                        isOutgoing: true,
                        property: {
                          dfh_pk_property: 85,
                          dfh_identifier_in_namespace: 'P97_from_father',
                          dfh_has_domain: 61,
                          dfh_has_range: 21,
                          dfh_fk_property_of_origin: null,
                          dfh_domain_instances_min_quantifier: 0,
                          dfh_domain_instances_max_quantifier: -1,
                          dfh_range_instances_min_quantifier: 1,
                          dfh_range_instances_max_quantifier: 1,
                          ui_context_config: [
                            {
                              pk_entity: 147,
                              fk_ui_context: 103,
                              fk_project: null,
                              fk_property: 85,
                              fk_class_field: null,
                              property_is_outgoing: true,
                              ord_num: 3
                            }
                          ]
                        },
                        targetMaxQuantity: 1,
                        targetMinQuantity: 1,
                        targetClassPk: 21,
                        label: {
                          sg: 'Father',
                          pl: 'Fathers',
                          'default': 'Father'
                        },
                        type: 'PropertyField',
                        toggle: 'collapsed',
                        _role_list: {
                          _34176: {
                            role: {
                              fk_property: 85,
                              fk_entity: 34119,
                              fk_temporal_entity: 34170,
                              is_in_project_count: 1,
                              is_standard_in_project_count: 0,
                              community_favorite_calendar: null,
                              pk_entity_version_concat: '34176_1',
                              pk_entity: 34176,
                              entity_version: 1,
                              notes: null,
                              is_latest_version: true,
                              is_community_favorite: true,
                              language: {},
                              appellation: {},
                              time_primitive: {},
                              entity_version_project_rels: [
                                {
                                  is_in_project: true,
                                  is_standard_in_project: true
                                }
                              ]
                            },
                            isCircular: false,
                            isOutgoing: true,
                            targetClassPk: 21,
                            isDisplayRoleForRange: true,
                            _leaf_peIt: {
                              fkClass: 21,
                              loading: true,
                              _fields: {
                                _1192_ingoing: {
                                  isOutgoing: false,
                                  property: {
                                    dfh_pk_property: 1192,
                                    dfh_identifier_in_namespace: 'histP9',
                                    dfh_has_domain: 365,
                                    dfh_has_range: 21,
                                    dfh_fk_property_of_origin: 1111,
                                    dfh_domain_instances_min_quantifier: 0,
                                    dfh_domain_instances_max_quantifier: -1,
                                    dfh_range_instances_min_quantifier: 1,
                                    dfh_range_instances_max_quantifier: 1,
                                    ui_context_config: [
                                      {
                                        pk_entity: 138,
                                        fk_ui_context: 103,
                                        fk_project: null,
                                        fk_property: 1192,
                                        fk_class_field: null,
                                        property_is_outgoing: false,
                                        ord_num: 0
                                      },
                                      {
                                        pk_entity: 176,
                                        fk_ui_context: 104,
                                        fk_project: null,
                                        fk_property: 1192,
                                        fk_class_field: null,
                                        property_is_outgoing: false,
                                        ord_num: 0
                                      }
                                    ]
                                  },
                                  targetMaxQuantity: -1,
                                  targetMinQuantity: 0,
                                  targetClassPk: 365,
                                  label: {
                                    sg: 'Name',
                                    pl: 'Names',
                                    'default': 'Names'
                                  },
                                  type: 'PropertyField',
                                  toggle: 'collapsed',
                                  _role_list: {
                                    _34130: {
                                      role: {
                                        fk_property: 1192,
                                        fk_entity: 34119,
                                        fk_temporal_entity: 34121,
                                        is_in_project_count: 1,
                                        is_standard_in_project_count: 1,
                                        community_favorite_calendar: null,
                                        pk_entity_version_concat: '34130_1',
                                        pk_entity: 34130,
                                        entity_version: 1,
                                        notes: null,
                                        is_latest_version: true,
                                        is_community_favorite: true,
                                        entity_version_project_rels: [
                                          {
                                            pk_entity_version_project_rel: 1400,
                                            fk_project: 12,
                                            fk_entity: 34130,
                                            fk_entity_version: 1,
                                            fk_entity_version_concat: '34130_1',
                                            is_in_project: true,
                                            is_standard_in_project: true,
                                            calendar: null,
                                            tmsp_last_modification: '2018-07-10T08:42:31.568214+00:00'
                                          }
                                        ],
                                        temporal_entity: {
                                          fk_class: 365,
                                          notes: null,
                                          pk_entity_version_concat: '34121_1',
                                          pk_entity: 34121,
                                          entity_version: 1,
                                          is_latest_version: true,
                                          is_community_favorite: true,
                                          entity_version_project_rels: [
                                            {
                                              pk_entity_version_project_rel: 1396,
                                              fk_project: 12,
                                              fk_entity: 34121,
                                              fk_entity_version: 1,
                                              fk_entity_version_concat: '34121_1',
                                              is_in_project: true,
                                              is_standard_in_project: false,
                                              calendar: null,
                                              tmsp_last_modification: '2018-07-10T08:42:27.617498+00:00'
                                            }
                                          ]
                                        }
                                      },
                                      isCircular: false,
                                      isOutgoing: false,
                                      targetClassPk: 365,
                                      isDisplayRoleForDomain: null,
                                      isDisplayRoleForRange: true,
                                      _teEnt: {
                                        selectPropState: 'init',
                                        toggle: 'collapsed',
                                        teEnt: {
                                          fk_class: 365,
                                          notes: null,
                                          pk_entity_version_concat: '34121_1',
                                          pk_entity: 34121,
                                          entity_version: 1,
                                          is_latest_version: true,
                                          is_community_favorite: true,
                                          entity_version_project_rels: [
                                            {
                                              pk_entity_version_project_rel: 1396,
                                              fk_project: 12,
                                              fk_entity: 34121,
                                              fk_entity_version: 1,
                                              fk_entity_version_concat: '34121_1',
                                              is_in_project: true,
                                              is_standard_in_project: false,
                                              calendar: null,
                                              tmsp_last_modification: '2018-07-10T08:42:27.617498+00:00'
                                            }
                                          ]
                                        },
                                        fkClass: 365,
                                        _fields: {
                                          _1113_outgoing: {
                                            isOutgoing: true,
                                            property: {
                                              dfh_pk_property: 1113,
                                              dfh_identifier_in_namespace: 'histP11',
                                              dfh_has_domain: 365,
                                              dfh_has_range: 40,
                                              dfh_fk_property_of_origin: null,
                                              dfh_domain_instances_min_quantifier: 0,
                                              dfh_domain_instances_max_quantifier: 1,
                                              dfh_range_instances_min_quantifier: 1,
                                              dfh_range_instances_max_quantifier: 1,
                                              ui_context_config: [
                                                {
                                                  pk_entity: 150,
                                                  fk_ui_context: 103,
                                                  fk_project: null,
                                                  fk_property: 1113,
                                                  fk_class_field: null,
                                                  property_is_outgoing: true,
                                                  ord_num: 0
                                                },
                                                {
                                                  pk_entity: 169,
                                                  fk_ui_context: 104,
                                                  fk_project: null,
                                                  fk_property: 1113,
                                                  fk_class_field: null,
                                                  property_is_outgoing: true,
                                                  ord_num: 0
                                                }
                                              ]
                                            },
                                            targetMaxQuantity: 1,
                                            targetMinQuantity: 1,
                                            targetClassPk: 40,
                                            label: {
                                              sg: 'Detailed Name',
                                              pl: 'Detailed Names',
                                              'default': 'Detailed Name'
                                            },
                                            type: 'PropertyField',
                                            toggle: 'collapsed',
                                            _role_list: {
                                              _34127: {
                                                role: {
                                                  fk_property: 1113,
                                                  fk_entity: 34123,
                                                  fk_temporal_entity: 34121,
                                                  is_in_project_count: 1,
                                                  is_standard_in_project_count: 0,
                                                  community_favorite_calendar: null,
                                                  pk_entity_version_concat: '34127_1',
                                                  pk_entity: 34127,
                                                  entity_version: 1,
                                                  notes: null,
                                                  is_latest_version: true,
                                                  is_community_favorite: true,
                                                  entity_version_project_rels: [
                                                    {
                                                      pk_entity_version_project_rel: 1399,
                                                      fk_project: 12,
                                                      fk_entity: 34127,
                                                      fk_entity_version: 1,
                                                      fk_entity_version_concat: '34127_1',
                                                      is_in_project: true,
                                                      is_standard_in_project: false,
                                                      calendar: null,
                                                      tmsp_last_modification: '2018-07-10T08:42:27.710988+00:00'
                                                    }
                                                  ],
                                                  appellation: {
                                                    appellation_label: {
                                                      tokens: [
                                                        {
                                                          id: 0,
                                                          string: 'Hans',
                                                          isSeparator: false
                                                        },
                                                        {
                                                          string: ' ',
                                                          isSeparator: true
                                                        },
                                                        {
                                                          string: 'Peter',
                                                          isSeparator: false
                                                        }
                                                      ],
                                                      latestTokenId: 2
                                                    },
                                                    fk_class: 40,
                                                    notes: null,
                                                    pk_entity_version_concat: '34123_1',
                                                    pk_entity: 34123,
                                                    entity_version: 1,
                                                    is_latest_version: true,
                                                    is_community_favorite: true
                                                  },
                                                  language: {},
                                                  time_primitive: {}
                                                },
                                                isCircular: false,
                                                isOutgoing: true,
                                                targetClassPk: 40,
                                                isDisplayRoleForDomain: null,
                                                isDisplayRoleForRange: false,
                                                _appe: {
                                                  appellation: {
                                                    appellation_label: {
                                                      tokens: [
                                                        {
                                                          id: 0,
                                                          string: 'Hans',
                                                          isSeparator: false
                                                        },
                                                        {
                                                          string: ' ',
                                                          isSeparator: true
                                                        },
                                                        {
                                                          string: 'Peter',
                                                          isSeparator: false
                                                        }
                                                      ],
                                                      latestTokenId: 2
                                                    },
                                                    fk_class: 40,
                                                    notes: null,
                                                    pk_entity_version_concat: '34123_1',
                                                    pk_entity: 34123,
                                                    entity_version: 1,
                                                    is_latest_version: true,
                                                    is_community_favorite: true
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          _existenceTime: {
                                            type: 'ExistenceTimeDetail',
                                            roles: [
                                              {
                                                fk_property: 72,
                                                fk_entity: 34125,
                                                fk_temporal_entity: 34121,
                                                is_in_project_count: 1,
                                                is_standard_in_project_count: 0,
                                                community_favorite_calendar: 'julian',
                                                pk_entity_version_concat: '34126_1',
                                                pk_entity: 34126,
                                                entity_version: 1,
                                                notes: null,
                                                is_latest_version: true,
                                                is_community_favorite: true,
                                                entity_version_project_rels: [
                                                  {
                                                    pk_entity_version_project_rel: 1398,
                                                    fk_project: 12,
                                                    fk_entity: 34126,
                                                    fk_entity_version: 1,
                                                    fk_entity_version_concat: '34126_1',
                                                    is_in_project: true,
                                                    is_standard_in_project: false,
                                                    calendar: 'julian',
                                                    tmsp_last_modification: '2018-07-10T08:42:27.705507+00:00'
                                                  }
                                                ],
                                                appellation: {},
                                                language: {},
                                                time_primitive: {
                                                  pk_entity: 34125,
                                                  fk_class: 335,
                                                  julian_day: 1846704,
                                                  duration: '1 year'
                                                }
                                              }
                                            ],
                                            toggle: 'collapsed',
                                            _fields: {
                                              _72_outgoing: {
                                                type: 'PropertyField',
                                                isOutgoing: true,
                                                property: {
                                                  dfh_pk_property: 72,
                                                  dfh_identifier_in_namespace: 'P82_at_some_time_within',
                                                  dfh_has_domain: 50,
                                                  dfh_has_range: 335,
                                                  dfh_fk_property_of_origin: null,
                                                  dfh_domain_instances_min_quantifier: null,
                                                  dfh_domain_instances_max_quantifier: null,
                                                  dfh_range_instances_min_quantifier: null,
                                                  dfh_range_instances_max_quantifier: null,
                                                  ui_context_config: [
                                                    {
                                                      pk_entity: 158,
                                                      fk_ui_context: 103,
                                                      fk_project: null,
                                                      fk_property: 72,
                                                      fk_class_field: null,
                                                      property_is_outgoing: true,
                                                      ord_num: 1
                                                    },
                                                    {
                                                      pk_entity: 164,
                                                      fk_ui_context: 104,
                                                      fk_project: null,
                                                      fk_property: 72,
                                                      fk_class_field: null,
                                                      property_is_outgoing: true,
                                                      ord_num: 1
                                                    }
                                                  ]
                                                },
                                                targetMaxQuantity: null,
                                                targetMinQuantity: null,
                                                targetClassPk: 335,
                                                label: {
                                                  sg: '[sg: 72: P82_at_some_time_within undefined',
                                                  pl: 'At some time within',
                                                  'default': 'At some time within'
                                                },
                                                _role_list: {
                                                  _34126: {
                                                    role: {
                                                      fk_property: 72,
                                                      fk_entity: 34125,
                                                      fk_temporal_entity: 34121,
                                                      is_in_project_count: 1,
                                                      is_standard_in_project_count: 0,
                                                      community_favorite_calendar: 'julian',
                                                      pk_entity_version_concat: '34126_1',
                                                      pk_entity: 34126,
                                                      entity_version: 1,
                                                      notes: null,
                                                      is_latest_version: true,
                                                      is_community_favorite: true,
                                                      entity_version_project_rels: [
                                                        {
                                                          pk_entity_version_project_rel: 1398,
                                                          fk_project: 12,
                                                          fk_entity: 34126,
                                                          fk_entity_version: 1,
                                                          fk_entity_version_concat: '34126_1',
                                                          is_in_project: true,
                                                          is_standard_in_project: false,
                                                          calendar: 'julian',
                                                          tmsp_last_modification: '2018-07-10T08:42:27.705507+00:00'
                                                        }
                                                      ],
                                                      appellation: {},
                                                      language: {},
                                                      time_primitive: {
                                                        pk_entity: 34125,
                                                        fk_class: 335,
                                                        julian_day: 1846704,
                                                        duration: '1 year'
                                                      }
                                                    },
                                                    isCircular: false,
                                                    isOutgoing: true,
                                                    targetClassPk: 335,
                                                    isDisplayRoleForDomain: null,
                                                    isDisplayRoleForRange: false,
                                                    _timePrimitive: {
                                                      timePrimitive: {
                                                        pk_entity: 34125,
                                                        fk_class: 335,
                                                        julian_day: 1846704,
                                                        duration: '1 year'
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              pkEntity: 34119,
                              peIt: {
                                fk_class: 21,
                                pk_entity_version_concat: '34119_1',
                                pk_entity: 34119,
                                entity_version: 1,
                                notes: null,
                                is_latest_version: true,
                                is_community_favorite: true,
                                entity_version_project_rels: [
                                  {
                                    pk_entity_version_project_rel: 1395,
                                    fk_project: 12,
                                    fk_entity: 34119,
                                    fk_entity_version: 1,
                                    fk_entity_version_concat: '34119_1',
                                    is_in_project: true,
                                    is_standard_in_project: false,
                                    calendar: null,
                                    tmsp_last_modification: '2018-07-10T08:42:21.398146+00:00'
                                  }
                                ],
                                dfh_class: {
                                  dfh_pk_class: 21,
                                  dfh_identifier_in_namespace: 'E21',
                                  dfh_standard_label: 'Person',
                                  pk_entity: 84,
                                  entity_version: 2,
                                  notes: null,
                                  tmsp_creation: '2018-04-16T22:06:42.020384+00:00',
                                  tmsp_last_modification: '2018-06-14T06:50:12.79349+00:00',
                                  sys_period: '["2018-06-14 06:50:12.79349+00",)'
                                }
                              },
                              selectPropState: 'init'
                            }
                          }
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
                        <gv-te-ent-add-ctrl [parentPath]="parentPath" name="parentRole" [(ngModel)]="model.parentRole" #parentRole="ngModel" required>
                        </gv-te-ent-add-ctrl>
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
