import { sandboxOf } from 'angular-playground';
import { TeEntLabelComponent } from './te-ent-label.component';
import { Information2Module } from '../../information.module';

const classConfigAppellationForLanguage = {
    subclassOf: 'teEnt',
    label: 'Naming',
    dfh_identifier_in_namespace: 'histC10',
    dfh_pk_class: 365,
    uiContexts: {
        '45': {
            label: 'Editable',
            uiElements: [
                {
                    ord_num: 0,
                    fk_property: 1113,
                    property_is_outgoing: true,
                    propertyFieldKey: '_1113_outgoing',
                    fk_class_field: null
                },
                {
                    ord_num: 1,
                    fk_property: 1112,
                    property_is_outgoing: true,
                    propertyFieldKey: '_1112_outgoing',
                    fk_class_field: null
                },
                {
                    ord_num: 2,
                    fk_property: null,
                    property_is_outgoing: null,
                    fk_class_field: 48,
                    class_field: {
                        pk_entity: 48,
                        description: 'Existence Time or Time Span of a Temporal Entity',
                        label: 'When'
                    },
                    propSetKey: '_field_48'
                }
            ]
        },
        '46': {
            label: 'Create',
            uiElements: [
                {
                    ord_num: 0,
                    fk_property: 1113,
                    property_is_outgoing: true,
                    propertyFieldKey: '_1113_outgoing',
                    fk_class_field: null
                }
            ]
        }
    },
    propertyFields: {
        _1113_outgoing: {
            type: 'PropertyField',
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
                        pk_entity: 128,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1113,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: 0,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 134,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1113,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: 0,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 40,
            label: {
                sg: 'String',
                pl: 'Strings',
                'default': 'String'
            }
        },
        _1192_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
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
                        pk_entity: 130,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1192,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 135,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1192,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 21,
            label: {
                sg: 'Entity with this Name',
                pl: 'Entities with this Name',
                'default': 'Entity with this Name'
            }
        },
        _1193_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1193,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 68,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: [
                    {
                        pk_entity: 133,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1193,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 136,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1193,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 68,
            label: {
                sg: 'Entity with this Name',
                pl: 'Entities with this Name',
                'default': 'Entity with this Name'
            }
        },
        _1194_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1194,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 363,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: [
                    {
                        pk_entity: 131,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1194,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 137,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1194,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 363,
            label: {
                sg: 'Entity with this Name',
                pl: 'Entities with this Name',
                'default': 'Entity with this Name'
            }
        },
        _1195_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1195,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 441,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: [
                    {
                        pk_entity: 132,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1195,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 139,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1195,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 441,
            label: {
                sg: 'Entity with this Name',
                pl: 'Entities with this Name',
                'default': 'Entity with this Name'
            }
        },
        _1112_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1112,
                dfh_identifier_in_namespace: 'histP10',
                dfh_has_domain: 365,
                dfh_has_range: 54,
                dfh_fk_property_of_origin: null,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: [
                    {
                        pk_entity: 129,
                        fk_ui_context: 46,
                        fk_project: null,
                        fk_property: 1112,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: null,
                        fk_class_for_class_field: null
                    },
                    {
                        pk_entity: 138,
                        fk_ui_context: 45,
                        fk_project: null,
                        fk_property: 1112,
                        fk_class_field: null,
                        property_is_outgoing: true,
                        ord_num: 1,
                        fk_class_for_class_field: null
                    }
                ]
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 54,
            label: {
                sg: 'Language',
                pl: 'Languages',
                'default': 'Language'
            }
        },
        _1200_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1200,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 364,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: []
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 364,
            label: {
                sg: 'Named Geoplace-Type',
                pl: 'Named Geoplace-Types',
                'default': 'Named Geoplace-Type'
            }
        },
        _1201_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1201,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 443,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: []
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 443,
            label: {
                sg: '[sg: 1201: histP9 undefined',
                pl: '[pl: 1201: histP9 undefined',
                'default': '[sg: 1201: histP9 undefined'
            }
        },
        _1202_outgoing: {
            type: 'PropertyField',
            isOutgoing: true,
            property: {
                dfh_pk_property: 1202,
                dfh_identifier_in_namespace: 'histP9',
                dfh_has_domain: 365,
                dfh_has_range: 219,
                dfh_fk_property_of_origin: 1111,
                dfh_domain_instances_min_quantifier: 0,
                dfh_domain_instances_max_quantifier: -1,
                dfh_range_instances_min_quantifier: 1,
                dfh_range_instances_max_quantifier: 1,
                ui_context_config: []
            },
            targetMaxQuantity: 1,
            targetMinQuantity: 1,
            targetClassPk: 219,
            label: {
                sg: '[sg: 1202: histP9 undefined',
                pl: '[pl: 1202: histP9 undefined',
                'default': '[sg: 1202: histP9 undefined'
            }
        }
    }
}


const _fieldsOfAppellationForLanguage = {
    _1113_outgoing: {
        type: 'PropertyField',
        _role_list: {
            _40843: {
                role: {
                    fk_property: 1113,
                    fk_entity: 31022,
                    fk_temporal_entity: 32334,
                    is_in_project_count: 1,
                    is_standard_in_project_count: 0,
                    community_favorite_calendar: null,
                    pk_entity: 40843,
                    notes: '13683_20180808-2',
                    entity_version_project_rels: [
                        {
                            pk_entity_version_project_rel: 12778,
                            pk_entity: 57863,
                            fk_project: 15,
                            fk_entity: 40843,
                            fk_entity_version: 1,
                            fk_entity_version_concat: '40843_1',
                            is_in_project: true,
                            is_standard_in_project: true,
                            calendar: null,
                            ord_num: null,
                            tmsp_last_modification: '2018-09-03T13:40:48.773249+00:00'
                        }
                    ],
                    appellation: {
                        appellation_label: {
                            tokens: [
                                {
                                    id: 0,
                                    string: 'Giacomo',
                                    isSeparator: false
                                },
                                {
                                    id: 1,
                                    string: ' ',
                                    isSeparator: true
                                },
                                {
                                    id: 2,
                                    string: 'Vaghi',
                                    isSeparator: false
                                }
                            ],
                            latestTokenId: 2
                        },
                        fk_class: 40,
                        notes: '1423_20180808-1',
                        pk_entity: 31022
                    },
                    language: {},
                    time_primitive: {},
                    place: {}
                },
                isCircular: false,
                isOutgoing: true,
                targetClassPk: 40,
                isDisplayRoleForDomain: null,
                isDisplayRoleForRange: true,
                _appe: {
                    appellation: {
                        appellation_label: {
                            tokens: [
                                {
                                    id: 0,
                                    string: 'Giacomo',
                                    isSeparator: false
                                },
                                {
                                    id: 1,
                                    string: ' ',
                                    isSeparator: true
                                },
                                {
                                    id: 2,
                                    string: 'Vaghi',
                                    isSeparator: false
                                }
                            ],
                            latestTokenId: 2
                        },
                        fk_class: 40,
                        notes: '1423_20180808-1',
                        pk_entity: 31022
                    }
                }
            },
            _fake: {
                role: {
                    fk_property: 1113,
                    fk_entity: 31022,
                    fk_temporal_entity: 32334,
                    is_in_project_count: 1,
                    is_standard_in_project_count: 0,
                    community_favorite_calendar: null,
                    pk_entity: 40843,
                    notes: '13683_20180808-2',
                    entity_version_project_rels: [
                        {
                            pk_entity_version_project_rel: 12778,
                            pk_entity: 57863,
                            fk_project: 15,
                            fk_entity: 40843,
                            fk_entity_version: 1,
                            fk_entity_version_concat: '40843_1',
                            is_in_project: true,
                            is_standard_in_project: true,
                            calendar: null,
                            ord_num: null,
                            tmsp_last_modification: '2018-09-03T13:40:48.773249+00:00'
                        }
                    ],
                    appellation: {
                        appellation_label: {
                            tokens: [
                                {
                                    id: 0,
                                    string: 'Giacomo',
                                    isSeparator: false
                                },
                                {
                                    id: 1,
                                    string: ' ',
                                    isSeparator: true
                                },
                                {
                                    id: 2,
                                    string: 'Vaghi',
                                    isSeparator: false
                                }
                            ],
                            latestTokenId: 2
                        },
                        fk_class: 40,
                        notes: '1423_20180808-1',
                        pk_entity: 31022
                    },
                    language: {},
                    time_primitive: {},
                    place: {}
                },
                isCircular: false,
                isOutgoing: true,
                targetClassPk: 40,
                isDisplayRoleForDomain: null,
                isDisplayRoleForRange: true,
                _appe: {
                    appellation: {
                        appellation_label: {
                            tokens: [
                                {
                                    id: 0,
                                    string: 'Giacomo',
                                    isSeparator: false
                                },
                                {
                                    id: 1,
                                    string: ' ',
                                    isSeparator: true
                                },
                                {
                                    id: 2,
                                    string: 'Vaghi',
                                    isSeparator: false
                                }
                            ],
                            latestTokenId: 2
                        },
                        fk_class: 40,
                        notes: '1423_20180808-1',
                        pk_entity: 31022
                    }
                }
            }
        },
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
                    pk_entity: 128,
                    fk_ui_context: 46,
                    fk_project: null,
                    fk_property: 1113,
                    fk_class_field: null,
                    property_is_outgoing: true,
                    ord_num: 0,
                    fk_class_for_class_field: null
                },
                {
                    pk_entity: 134,
                    fk_ui_context: 45,
                    fk_project: null,
                    fk_property: 1113,
                    fk_class_field: null,
                    property_is_outgoing: true,
                    ord_num: 0,
                    fk_class_for_class_field: null
                }
            ]
        },
        targetMaxQuantity: 1,
        targetMinQuantity: 1,
        targetClassPk: 40,
        label: {
            sg: 'String',
            pl: 'Strings',
            'default': 'String'
        },
        toggle: 'expanded',
        dragEnabled: false
    },
    _1112_outgoing: {
        type: 'PropertyField',
        _role_list: {
            _45098: {
                role: {
                    fk_property: 1112,
                    fk_entity: 19703,
                    fk_temporal_entity: 32334,
                    is_in_project_count: 1,
                    is_standard_in_project_count: 0,
                    community_favorite_calendar: null,
                    pk_entity: 45098,
                    notes: '13683_20180808-3',
                    entity_version_project_rels: [
                        {
                            pk_entity_version_project_rel: 17033,
                            pk_entity: 62118,
                            fk_project: 15,
                            fk_entity: 45098,
                            fk_entity_version: 1,
                            fk_entity_version_concat: '45098_1',
                            is_in_project: true,
                            is_standard_in_project: true,
                            calendar: null,
                            ord_num: null,
                            tmsp_last_modification: '2018-09-03T13:40:48.773249+00:00'
                        }
                    ],
                    appellation: {},
                    language: {
                        fk_class: 54,
                        pk_language: 'ita',
                        lang_type: 'living',
                        scope: 'individual',
                        iso6392b: 'ita',
                        iso6392t: 'ita',
                        iso6391: 'it ',
                        notes: 'Italian',
                        pk_entity: 19703
                    },
                    time_primitive: {},
                    place: {}
                },
                isCircular: false,
                isOutgoing: true,
                targetClassPk: 54,
                isDisplayRoleForDomain: null,
                isDisplayRoleForRange: true,
                _lang: {
                    language: {
                        fk_class: 54,
                        pk_language: 'ita',
                        lang_type: 'living',
                        scope: 'individual',
                        iso6392b: 'ita',
                        iso6392t: 'ita',
                        iso6391: 'it ',
                        notes: 'Italian',
                        pk_entity: 19703
                    }
                }
            }
        },
        isOutgoing: true,
        property: {
            dfh_pk_property: 1112,
            dfh_identifier_in_namespace: 'histP10',
            dfh_has_domain: 365,
            dfh_has_range: 54,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            ui_context_config: [
                {
                    pk_entity: 129,
                    fk_ui_context: 46,
                    fk_project: null,
                    fk_property: 1112,
                    fk_class_field: null,
                    property_is_outgoing: true,
                    ord_num: null,
                    fk_class_for_class_field: null
                },
                {
                    pk_entity: 138,
                    fk_ui_context: 45,
                    fk_project: null,
                    fk_property: 1112,
                    fk_class_field: null,
                    property_is_outgoing: true,
                    ord_num: 1,
                    fk_class_for_class_field: null
                }
            ]
        },
        targetMaxQuantity: 1,
        targetMinQuantity: 1,
        targetClassPk: 54,
        label: {
            sg: 'Language',
            pl: 'Languages',
            'default': 'Language'
        },
        toggle: 'expanded',
        dragEnabled: false
    },
    _field_48: {
        type: 'ExistenceTimeDetail',
        toggle: 'expanded',
        roles: [
            {
                fk_property: 150,
                fk_entity: 80492,
                fk_temporal_entity: 32334,
                is_in_project_count: 1,
                is_standard_in_project_count: 0,
                community_favorite_calendar: 'gregorian',
                pk_entity: 80493,
                notes: null,
                entity_version_project_rels: [
                    {
                        pk_entity_version_project_rel: 27813,
                        pk_entity: 80495,
                        fk_project: 15,
                        fk_entity: 80493,
                        fk_entity_version: null,
                        fk_entity_version_concat: null,
                        is_in_project: true,
                        is_standard_in_project: false,
                        calendar: 'gregorian',
                        ord_num: null,
                        tmsp_last_modification: '2018-10-04T09:53:16.229917+00:00'
                    }
                ],
                appellation: {},
                language: {},
                time_primitive: {
                    pk_entity: 80492,
                    fk_class: 335,
                    julian_day: 2378497,
                    duration: '1 year'
                },
                place: {}
            },
            {
                fk_property: 151,
                fk_entity: 80491,
                fk_temporal_entity: 32334,
                is_in_project_count: 1,
                is_standard_in_project_count: 0,
                community_favorite_calendar: 'gregorian',
                pk_entity: 80494,
                notes: null,
                entity_version_project_rels: [
                    {
                        pk_entity_version_project_rel: 27814,
                        pk_entity: 80496,
                        fk_project: 15,
                        fk_entity: 80494,
                        fk_entity_version: null,
                        fk_entity_version_concat: null,
                        is_in_project: true,
                        is_standard_in_project: false,
                        calendar: 'gregorian',
                        ord_num: null,
                        tmsp_last_modification: '2018-10-04T09:53:16.23213+00:00'
                    }
                ],
                appellation: {},
                language: {},
                time_primitive: {
                    pk_entity: 80491,
                    fk_class: 335,
                    julian_day: 2415021,
                    duration: '1 year'
                },
                place: {}
            }
        ],
        _fields: {
            _150_outgoing: {
                type: 'PropertyField',
                _role_list: {
                    _80493: {
                        role: {
                            fk_property: 150,
                            fk_entity: 80492,
                            fk_temporal_entity: 32334,
                            is_in_project_count: 1,
                            is_standard_in_project_count: 0,
                            community_favorite_calendar: 'gregorian',
                            pk_entity: 80493,
                            notes: null,
                            entity_version_project_rels: [
                                {
                                    pk_entity_version_project_rel: 27813,
                                    pk_entity: 80495,
                                    fk_project: 15,
                                    fk_entity: 80493,
                                    fk_entity_version: null,
                                    fk_entity_version_concat: null,
                                    is_in_project: true,
                                    is_standard_in_project: false,
                                    calendar: 'gregorian',
                                    ord_num: null,
                                    tmsp_last_modification: '2018-10-04T09:53:16.229917+00:00'
                                }
                            ],
                            appellation: {},
                            language: {},
                            time_primitive: {
                                pk_entity: 80492,
                                fk_class: 335,
                                julian_day: 2378497,
                                duration: '1 year'
                            },
                            place: {}
                        },
                        isCircular: false,
                        isOutgoing: true,
                        targetClassPk: 335,
                        isDisplayRoleForDomain: null,
                        isDisplayRoleForRange: false,
                        _timePrimitive: {
                            timePrimitive: {
                                pk_entity: 80492,
                                fk_class: 335,
                                julian_day: 2378497,
                                duration: '1 year'
                            }
                        }
                    }
                },
                isOutgoing: true,
                property: {
                    dfh_pk_property: 150,
                    dfh_identifier_in_namespace: 'P81a',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: []
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 150: P81a undefined',
                    pl: 'End of begin',
                    'default': 'End of begin'
                }
            },
            _151_outgoing: {
                type: 'PropertyField',
                _role_list: {
                    _80494: {
                        role: {
                            fk_property: 151,
                            fk_entity: 80491,
                            fk_temporal_entity: 32334,
                            is_in_project_count: 1,
                            is_standard_in_project_count: 0,
                            community_favorite_calendar: 'gregorian',
                            pk_entity: 80494,
                            notes: null,
                            entity_version_project_rels: [
                                {
                                    pk_entity_version_project_rel: 27814,
                                    pk_entity: 80496,
                                    fk_project: 15,
                                    fk_entity: 80494,
                                    fk_entity_version: null,
                                    fk_entity_version_concat: null,
                                    is_in_project: true,
                                    is_standard_in_project: false,
                                    calendar: 'gregorian',
                                    ord_num: null,
                                    tmsp_last_modification: '2018-10-04T09:53:16.23213+00:00'
                                }
                            ],
                            appellation: {},
                            language: {},
                            time_primitive: {
                                pk_entity: 80491,
                                fk_class: 335,
                                julian_day: 2415021,
                                duration: '1 year'
                            },
                            place: {}
                        },
                        isCircular: false,
                        isOutgoing: true,
                        targetClassPk: 335,
                        isDisplayRoleForDomain: null,
                        isDisplayRoleForRange: false,
                        _timePrimitive: {
                            timePrimitive: {
                                pk_entity: 80491,
                                fk_class: 335,
                                julian_day: 2415021,
                                duration: '1 year'
                            }
                        }
                    }
                },
                isOutgoing: true,
                property: {
                    dfh_pk_property: 151,
                    dfh_identifier_in_namespace: 'P81b',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: []
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 151: P81b undefined',
                    pl: 'Begin of end',
                    'default': 'Begin of end'
                }
            }
        }
    }
}

export default sandboxOf(TeEntLabelComponent, {
    imports: [
        Information2Module
    ],
    declareComponent: false
})

    .add('TeEntLabel | Naming collapsed', {
        context: {
            classConfigAppellationForLanguage,
            _fieldsOfAppellationForLanguage,
            toggle: 'expanded'
        },
        template: `
            <div class="row m-5">
                <div style="width:430px;height:700px" class="col">

                    <div class="d-flex border border-success">
                        <gv-te-ent-label class="gv-grow-1"
                        [children]="_fieldsOfAppellationForLanguage"
                        [classConfig]="classConfigAppellationForLanguage"
                        [toggle]="toggle"
                        (onToggle)="(toggle === 'expanded' ? toggle = 'collapsed' : toggle = 'expanded')"
                        ></gv-te-ent-label>
                    </div>

                    <button (click)="(toggle === 'expanded' ? toggle = 'collapsed' : toggle = 'expanded')" class="mt-5">toggle</button>
                </div>

                <div class="col" style="height:700px; overflow:scroll">
                    <p>_fields</p>
                    <pre>
                        {{_fieldsOfAppellationForLanguage | json}}
                    </pre>

                </div>
                <div class="col" style="height:700px; overflow:scroll">

                    <p>classConfig</p>
                    <pre>
                        {{classConfigAppellationForLanguage | json}}
                    </pre>
                </div>
            </div>
        `
    })
