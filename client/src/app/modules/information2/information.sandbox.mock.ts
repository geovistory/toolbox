import { ProjectDetail } from "../../core";

export const crm ={
    '21': {
        dfh_fk_system_type: 8,
        label: 'Person',
        dfh_identifier_in_namespace: 'E21',
        dfh_pk_class: 21,
        roleSets: {
            _84_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 84,
                    dfh_identifier_in_namespace: 'P96_by_mother',
                    dfh_has_domain: 61,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 142,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 84,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 5
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 61,
                label: {
                    sg: 'Bith given as Mother',
                    pl: 'Births given as Mother',
                    'default': 'Births given as Mother'
                }
            },
            _86_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 86,
                    dfh_identifier_in_namespace: 'P98_brought_into_life',
                    dfh_has_domain: 61,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 139,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 86,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 1
                        },
                        {
                            pk_entity: 188,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 86,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 61,
                label: {
                    sg: 'Birth',
                    pl: 'Births',
                    'default': 'Birth'
                }
            },
            _85_ingoing: {
                isOutgoing: false,
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
                            pk_entity: 143,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 85,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 6
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 61,
                label: {
                    sg: 'Birth initiated as biological Father',
                    pl: 'Births initiated as biological Father',
                    'default': 'Births initiated as biological Father'
                }
            },
            _88_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 88,
                    dfh_identifier_in_namespace: 'P100_was_death_of',
                    dfh_has_domain: 63,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 140,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 88,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 63,
                label: {
                    sg: 'Death',
                    pl: 'Deaths',
                    'default': 'Death'
                }
            },
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
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 0
                        },
                        {
                            pk_entity: 176,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1192,
                            fk_property_set: null,
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
                }
            },
            _1188_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1188,
                    dfh_identifier_in_namespace: 'histP15',
                    dfh_has_domain: 442,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 141,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1188,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 3
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 442,
                label: {
                    sg: 'Is member of',
                    pl: 'Is member of',
                    'default': 'Is member of'
                }
            },
            _1196_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1196,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 78,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 131,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 78,
                label: {
                    sg: '[inv.sg: 1196: P143 undefined',
                    pl: '[inv.pl: 1196: P143 undefined',
                    'default': '[inv.pl: 1196: P143 undefined'
                }
            },
            _1180_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1180,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 144,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1180,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 4
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 212,
                label: {
                    sg: 'Found himself / herself at place',
                    pl: 'Found himself / herself  at place',
                    'default': 'Found himself / herself  at place'
                }
            },
            _1198_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1198,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 79,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 133,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 79,
                label: {
                    sg: '[inv.sg: 1198: P143 undefined',
                    pl: '[inv.pl: 1198: P143 undefined',
                    'default': '[inv.pl: 1198: P143 undefined'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1192,
                        property_is_outgoing: false,
                        roleSetKey: '_1192_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 86,
                        property_is_outgoing: false,
                        roleSetKey: '_86_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 88,
                        property_is_outgoing: false,
                        roleSetKey: '_88_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 1188,
                        property_is_outgoing: false,
                        roleSetKey: '_1188_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 1180,
                        property_is_outgoing: false,
                        roleSetKey: '_1180_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 5,
                        fk_property: 84,
                        property_is_outgoing: false,
                        roleSetKey: '_84_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 6,
                        fk_property: 85,
                        property_is_outgoing: false,
                        roleSetKey: '_85_ingoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1192,
                        property_is_outgoing: false,
                        roleSetKey: '_1192_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 86,
                        property_is_outgoing: false,
                        roleSetKey: '_86_ingoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '50': {
        dfh_fk_system_type: null,
        label: 'Time-Span',
        dfh_identifier_in_namespace: 'E52',
        dfh_pk_class: 50,
        roleSets: {
            _68_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 68,
                    dfh_identifier_in_namespace: 'P78_is_identified_by',
                    dfh_has_domain: 50,
                    dfh_has_range: 47,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: []
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 47,
                label: {
                    sg: '[sg: 68: P78_is_identified_by undefined',
                    pl: '[pl: 68: P78_is_identified_by undefined',
                    'default': '[pl: 68: P78_is_identified_by undefined'
                }
            },
            _71_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 71,
                    dfh_identifier_in_namespace: 'P81_ongoing_throughout',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: [
                        {
                            pk_entity: 157,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 71,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        },
                        {
                            pk_entity: 163,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 71,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        }
                    ]
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 71: P81_ongoing_throughout undefined',
                    pl: 'Ongoing throughout',
                    'default': 'Ongoing throughout'
                }
            },
            _72_outgoing: {
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
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        },
                        {
                            pk_entity: 164,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 72,
                            fk_property_set: null,
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
                }
            },
            _73_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 73,
                    dfh_identifier_in_namespace: 'P83_had_at_least_duration',
                    dfh_has_domain: 50,
                    dfh_has_range: 52,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: []
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 52,
                label: {
                    sg: '[sg: 73: P83_had_at_least_duration undefined',
                    pl: '[pl: 73: P83_had_at_least_duration undefined',
                    'default': '[pl: 73: P83_had_at_least_duration undefined'
                }
            },
            _74_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 74,
                    dfh_identifier_in_namespace: 'P84_had_at_most_duration',
                    dfh_has_domain: 50,
                    dfh_has_range: 52,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: []
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 52,
                label: {
                    sg: '[sg: 74: P84_had_at_most_duration undefined',
                    pl: '[pl: 74: P84_had_at_most_duration undefined',
                    'default': '[pl: 74: P84_had_at_most_duration undefined'
                }
            },
            _150_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 150,
                    dfh_identifier_in_namespace: 'P81a_end_of_the_begin',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: [
                        {
                            pk_entity: 159,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 150,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        },
                        {
                            pk_entity: 165,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 150,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 150: P81a_end_of_the_begin undefined',
                    pl: 'End of begin',
                    'default': 'End of begin'
                }
            },
            _151_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 151,
                    dfh_identifier_in_namespace: 'P81b_begin_of_the_end',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: [
                        {
                            pk_entity: 166,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 151,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 4
                        },
                        {
                            pk_entity: 160,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 151,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 3
                        }
                    ]
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 151: P81b_begin_of_the_end undefined',
                    pl: 'Begin of end',
                    'default': 'Begin of end'
                }
            },
            _152_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 152,
                    dfh_identifier_in_namespace: 'P82a_begin_of_the_begin',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: [
                        {
                            pk_entity: 167,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 152,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 3
                        },
                        {
                            pk_entity: 161,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 152,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 4
                        }
                    ]
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 152: P82a_begin_of_the_begin undefined',
                    pl: 'Begin of begin',
                    'default': 'Begin of begin'
                }
            },
            _153_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 153,
                    dfh_identifier_in_namespace: 'P82b_end_of_the_end',
                    dfh_has_domain: 50,
                    dfh_has_range: 335,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: null,
                    dfh_domain_instances_max_quantifier: null,
                    dfh_range_instances_min_quantifier: null,
                    dfh_range_instances_max_quantifier: null,
                    ui_context_config: [
                        {
                            pk_entity: 168,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 153,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 5
                        },
                        {
                            pk_entity: 162,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 153,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 5
                        }
                    ]
                },
                targetMaxQuantity: null,
                targetMinQuantity: null,
                targetClassPk: 335,
                label: {
                    sg: '[sg: 153: P82b_end_of_the_end undefined',
                    pl: 'End of end',
                    'default': 'End of end'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 71,
                        property_is_outgoing: true,
                        roleSetKey: '_71_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 72,
                        property_is_outgoing: true,
                        roleSetKey: '_72_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 150,
                        property_is_outgoing: true,
                        roleSetKey: '_150_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 151,
                        property_is_outgoing: true,
                        roleSetKey: '_151_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 152,
                        property_is_outgoing: true,
                        roleSetKey: '_152_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 5,
                        fk_property: 153,
                        property_is_outgoing: true,
                        roleSetKey: '_153_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 71,
                        property_is_outgoing: true,
                        roleSetKey: '_71_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 72,
                        property_is_outgoing: true,
                        roleSetKey: '_72_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 150,
                        property_is_outgoing: true,
                        roleSetKey: '_150_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 152,
                        property_is_outgoing: true,
                        roleSetKey: '_152_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 151,
                        property_is_outgoing: true,
                        roleSetKey: '_151_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 5,
                        fk_property: 153,
                        property_is_outgoing: true,
                        roleSetKey: '_153_outgoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '60': {
        dfh_fk_system_type: 9,
        label: 'Formation',
        dfh_identifier_in_namespace: 'E66',
        dfh_pk_class: 60,
        roleSets: {
            _83_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 83,
                    dfh_identifier_in_namespace: 'P95_has_formed',
                    dfh_has_domain: 60,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 172,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 83,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        },
                        {
                            pk_entity: 174,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 83,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: 'Formed Group (Organization)',
                    pl: 'Formed Groups (Organizations)',
                    'default': 'Formed Group (Organization)'
                }
            },
            _139_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 139,
                    dfh_identifier_in_namespace: 'P151_was_formed_from',
                    dfh_has_domain: 60,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: -1,
                    ui_context_config: [
                        {
                            pk_entity: 173,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 139,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        },
                        {
                            pk_entity: 175,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 139,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: 'Formed from Group (Organization)',
                    pl: 'Formed from Groups (Organization)',
                    'default': 'Formed from Groups (Organization)'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 83,
                        property_is_outgoing: true,
                        roleSetKey: '_83_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 139,
                        property_is_outgoing: true,
                        roleSetKey: '_139_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 83,
                        property_is_outgoing: true,
                        roleSetKey: '_83_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 139,
                        property_is_outgoing: true,
                        roleSetKey: '_139_outgoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '61': {
        dfh_fk_system_type: 9,
        label: 'Birth',
        dfh_identifier_in_namespace: 'E67',
        dfh_pk_class: 61,
        roleSets: {
            _84_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 84,
                    dfh_identifier_in_namespace: 'P96_by_mother',
                    dfh_has_domain: 61,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 145,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 84,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        },
                        {
                            pk_entity: 111,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 84,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: 'Mother',
                    pl: 'Mothers',
                    'default': 'Mother'
                }
            },
            _86_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 86,
                    dfh_identifier_in_namespace: 'P98_brought_into_life',
                    dfh_has_domain: 61,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 146,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 86,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        },
                        {
                            pk_entity: 112,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 86,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: 'Born child',
                    pl: 'Born children',
                    'default': 'Born child'
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
                            fk_property_set: null,
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
                }
            },
            _1186_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1186,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 61,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 148,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1186,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 4
                        },
                        {
                            pk_entity: 113,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1186,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 363,
                label: {
                    sg: 'Born at this place',
                    pl: 'Born at this places',
                    'default': 'Born at this place'
                }
            },
            _1187_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1187,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 61,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 149,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1187,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 5
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 441,
                label: {
                    sg: 'Born in this building',
                    pl: 'Born in this building',
                    'default': 'Born in this building'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 86,
                        property_is_outgoing: true,
                        roleSetKey: '_86_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 84,
                        property_is_outgoing: true,
                        roleSetKey: '_84_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 85,
                        property_is_outgoing: true,
                        roleSetKey: '_85_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 1186,
                        property_is_outgoing: true,
                        roleSetKey: '_1186_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 5,
                        fk_property: 1187,
                        property_is_outgoing: true,
                        roleSetKey: '_1187_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    '63': {
        dfh_fk_system_type: 9,
        label: 'Death',
        dfh_identifier_in_namespace: 'E69',
        dfh_pk_class: 63,
        roleSets: {
            _88_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 88,
                    dfh_identifier_in_namespace: 'P100_was_death_of',
                    dfh_has_domain: 63,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 194,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 88,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: 'Person that died',
                    pl: 'Persons that died',
                    'default': 'Person that died'
                }
            },
            _1191_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1191,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 63,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 193,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1191,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 363,
                label: {
                    sg: 'Died at this place',
                    pl: 'Died at this places',
                    'default': 'Died at this place'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 1191,
                        property_is_outgoing: true,
                        roleSetKey: '_1191_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 88,
                        property_is_outgoing: true,
                        roleSetKey: '_88_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    '68': {
        dfh_fk_system_type: 8,
        label: 'Group',
        dfh_identifier_in_namespace: 'E74',
        dfh_pk_class: 68,
        roleSets: {
            _83_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 83,
                    dfh_identifier_in_namespace: 'P95_has_formed',
                    dfh_has_domain: 60,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 153,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 83,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 0,
                targetClassPk: 60,
                label: {
                    sg: 'Start (Formation / Foundation)',
                    pl: 'Start (Formations / Foundations)',
                    'default': 'Start (Formation / Foundation)'
                }
            },
            _87_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 87,
                    dfh_identifier_in_namespace: 'P99_dissolved',
                    dfh_has_domain: 62,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 154,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 87,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 1,
                targetClassPk: 62,
                label: {
                    sg: 'End (Dissolution)',
                    pl: 'End (Dissolution)',
                    'default': 'End (Dissolution)'
                }
            },
            _132_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 132,
                    dfh_identifier_in_namespace: 'P144_joined_with',
                    dfh_has_domain: 78,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 209,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 132,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 5
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 78,
                label: {
                    sg: 'Joining',
                    pl: 'Joining',
                    'default': 'Joining'
                }
            },
            _134_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 134,
                    dfh_identifier_in_namespace: 'P146_separated_from',
                    dfh_has_domain: 79,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 210,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 134,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 6
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 79,
                label: {
                    sg: 'Left',
                    pl: 'Left',
                    'default': 'Left'
                }
            },
            _1189_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1189,
                    dfh_identifier_in_namespace: 'histP16',
                    dfh_has_domain: 442,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 155,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1189,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 3
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 442,
                label: {
                    sg: 'Member',
                    pl: 'Members',
                    'default': 'Members'
                }
            },
            _1197_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1197,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 78,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 131,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 78,
                label: {
                    sg: '[inv.sg: 1197: P143 undefined',
                    pl: '[inv.pl: 1197: P143 undefined',
                    'default': '[inv.pl: 1197: P143 undefined'
                }
            },
            _139_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 139,
                    dfh_identifier_in_namespace: 'P151_was_formed_from',
                    dfh_has_domain: 60,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: -1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 60,
                label: {
                    sg: 'Participated in Formation',
                    pl: 'Participated in Formation',
                    'default': 'Participated in Formation'
                }
            },
            _1193_ingoing: {
                isOutgoing: false,
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
                            pk_entity: 179,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1193,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 0
                        },
                        {
                            pk_entity: 152,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1193,
                            fk_property_set: null,
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
                }
            },
            _1182_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1182,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 156,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1182,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 4
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 212,
                label: {
                    sg: 'Localization (time related)',
                    pl: 'Localization (time related)',
                    'default': 'Localization (time related)'
                }
            },
            _1199_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1199,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 79,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 133,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 79,
                label: {
                    sg: '[inv.sg: 1199: P143 undefined',
                    pl: '[inv.pl: 1199: P143 undefined',
                    'default': '[inv.pl: 1199: P143 undefined'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1193,
                        property_is_outgoing: false,
                        roleSetKey: '_1193_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 83,
                        property_is_outgoing: false,
                        roleSetKey: '_83_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 87,
                        property_is_outgoing: false,
                        roleSetKey: '_87_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 1189,
                        property_is_outgoing: false,
                        roleSetKey: '_1189_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 1182,
                        property_is_outgoing: false,
                        roleSetKey: '_1182_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 5,
                        fk_property: 132,
                        property_is_outgoing: false,
                        roleSetKey: '_132_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 6,
                        fk_property: 134,
                        property_is_outgoing: false,
                        roleSetKey: '_134_ingoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1193,
                        property_is_outgoing: false,
                        roleSetKey: '_1193_ingoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '75': {
        dfh_fk_system_type: 8,
        label: 'Actor Appellation',
        dfh_identifier_in_namespace: 'E82',
        dfh_pk_class: 75
    },
    '78': {
        dfh_fk_system_type: 9,
        label: 'Joining',
        dfh_identifier_in_namespace: 'E85',
        dfh_pk_class: 78,
        roleSets: {
            _132_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 132,
                    dfh_identifier_in_namespace: 'P144_joined_with',
                    dfh_has_domain: 78,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 137,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 132,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        },
                        {
                            pk_entity: 195,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 132,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: 'Was joined',
                    pl: 'Was joined',
                    'default': 'Was joined'
                }
            },
            _1196_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1196,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 78,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 131,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: '[sg: 1196: P143 undefined',
                    pl: '[pl: 1196: P143 undefined',
                    'default': '[sg: 1196: P143 undefined'
                }
            },
            _1197_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1197,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 78,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 131,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: '[sg: 1197: P143 undefined',
                    pl: '[pl: 1197: P143 undefined',
                    'default': '[sg: 1197: P143 undefined'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 132,
                        property_is_outgoing: true,
                        roleSetKey: '_132_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 132,
                        property_is_outgoing: true,
                        roleSetKey: '_132_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    '79': {
        dfh_fk_system_type: 9,
        label: 'Leaving',
        dfh_identifier_in_namespace: 'E86',
        dfh_pk_class: 79,
        roleSets: {
            _134_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 134,
                    dfh_identifier_in_namespace: 'P146_separated_from',
                    dfh_has_domain: 79,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 196,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 134,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        },
                        {
                            pk_entity: 197,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 134,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: 'Was left',
                    pl: 'Was left',
                    'default': 'Was left'
                }
            },
            _1198_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1198,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 79,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 133,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: '[sg: 1198: P143 undefined',
                    pl: '[pl: 1198: P143 undefined',
                    'default': '[sg: 1198: P143 undefined'
                }
            },
            _1199_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1199,
                    dfh_identifier_in_namespace: 'P143',
                    dfh_has_domain: 79,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 133,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: '[sg: 1199: P143 undefined',
                    pl: '[pl: 1199: P143 undefined',
                    'default': '[sg: 1199: P143 undefined'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 134,
                        property_is_outgoing: true,
                        roleSetKey: '_134_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 134,
                        property_is_outgoing: true,
                        roleSetKey: '_134_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    '84': {
        dfh_fk_system_type: null,
        label: 'Presence',
        dfh_identifier_in_namespace: 'E93',
        dfh_pk_class: 84,
        roleSets: {
            _148_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 148,
                    dfh_identifier_in_namespace: 'P167_was_at',
                    dfh_has_domain: 84,
                    dfh_has_range: 51,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 1,
                    dfh_domain_instances_max_quantifier: 1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 51,
                label: {
                    sg: 'Geocoordinates',
                    pl: 'Geocoordinates',
                    'default': 'Geocoordinates'
                }
            },
            _1181_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1181,
                    dfh_identifier_in_namespace: 'P166',
                    dfh_has_domain: 84,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 147,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 363,
                label: {
                    sg: '[sg: 1181: P166 undefined',
                    pl: '[pl: 1181: P166 undefined',
                    'default': '[sg: 1181: P166 undefined'
                }
            },
            _1184_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1184,
                    dfh_identifier_in_namespace: 'P166',
                    dfh_has_domain: 84,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 147,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 441,
                label: {
                    sg: 'Is geolocalized',
                    pl: 'Is geolocalized',
                    'default': 'Is geolocalized'
                }
            }
        }
    },
    '212': {
        dfh_fk_system_type: 9,
        label: 'Time-related geographical localisation',
        dfh_identifier_in_namespace: 'histC2',
        dfh_pk_class: 212,
        roleSets: {
            _1178_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1178,
                    dfh_identifier_in_namespace: 'histP13',
                    dfh_has_domain: 212,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 198,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1178,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        },
                        {
                            pk_entity: 202,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1178,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 363,
                label: {
                    sg: 'Was located relative to place',
                    pl: 'Was located relative to places',
                    'default': 'Was located relative to place'
                }
            },
            _1180_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1180,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 199,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1180,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        },
                        {
                            pk_entity: 203,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1180,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 0,
                targetClassPk: 21,
                label: {
                    sg: 'Person located relative to place',
                    pl: 'Person located relative to place',
                    'default': 'Person located relative to place'
                }
            },
            _1182_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1182,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 201,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1182,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 4
                        },
                        {
                            pk_entity: 204,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1182,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 0,
                targetClassPk: 68,
                label: {
                    sg: 'Is location of',
                    pl: 'Is location of',
                    'default': 'Is location of'
                }
            },
            _1183_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1183,
                    dfh_identifier_in_namespace: 'histP14',
                    dfh_has_domain: 212,
                    dfh_has_range: 52,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 0,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 206,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1183,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 0,
                targetClassPk: 52,
                label: {
                    sg: '[sg: 1183: histP14 undefined',
                    pl: '[pl: 1183: histP14 undefined',
                    'default': '[sg: 1183: histP14 undefined'
                }
            },
            _1185_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1185,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 200,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1185,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 3
                        },
                        {
                            pk_entity: 205,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1185,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 441,
                label: {
                    sg: 'Built work located relative to place',
                    pl: 'Built work located relative to places',
                    'default': 'Built work located relative to place'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 1178,
                        property_is_outgoing: true,
                        roleSetKey: '_1178_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1180,
                        property_is_outgoing: true,
                        roleSetKey: '_1180_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 1185,
                        property_is_outgoing: true,
                        roleSetKey: '_1185_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 4,
                        fk_property: 1182,
                        property_is_outgoing: true,
                        roleSetKey: '_1182_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 1178,
                        property_is_outgoing: true,
                        roleSetKey: '_1178_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1180,
                        property_is_outgoing: true,
                        roleSetKey: '_1180_outgoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '363': {
        dfh_fk_system_type: 8,
        label: 'Geographical Place',
        dfh_identifier_in_namespace: 'histC8',
        dfh_pk_class: 363,
        roleSets: {
            _1181_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1181,
                    dfh_identifier_in_namespace: 'P166',
                    dfh_has_domain: 84,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 147,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: []
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 84,
                label: {
                    sg: '[inv.sg: 1181: P166 undefined',
                    pl: '[inv.pl: 1181: P166 undefined',
                    'default': '[inv.pl: 1181: P166 undefined'
                }
            },
            _1186_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1186,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 61,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 183,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1186,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 61,
                label: {
                    sg: 'Is place of birth',
                    pl: 'Is place of births',
                    'default': 'Is place of births'
                }
            },
            _1194_ingoing: {
                isOutgoing: false,
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
                            pk_entity: 180,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1194,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 0
                        },
                        {
                            pk_entity: 181,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1194,
                            fk_property_set: null,
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
                }
            },
            _1191_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1191,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 63,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 211,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1191,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 3
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 63,
                label: {
                    sg: 'Is place of death',
                    pl: 'Is place of death',
                    'default': 'Is place of death'
                }
            },
            _1178_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1178,
                    dfh_identifier_in_namespace: 'histP13',
                    dfh_has_domain: 212,
                    dfh_has_range: 363,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 182,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1178,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 212,
                label: {
                    sg: 'Was place of',
                    pl: 'Was place of',
                    'default': 'Was place of'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1194,
                        property_is_outgoing: false,
                        roleSetKey: '_1194_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 1178,
                        property_is_outgoing: false,
                        roleSetKey: '_1178_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1186,
                        property_is_outgoing: false,
                        roleSetKey: '_1186_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 1191,
                        property_is_outgoing: false,
                        roleSetKey: '_1191_ingoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1194,
                        property_is_outgoing: false,
                        roleSetKey: '_1194_ingoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '364': {
        dfh_fk_system_type: 8,
        label: 'Geographical place type',
        dfh_identifier_in_namespace: 'histC9',
        dfh_pk_class: 364
    },
    '365': {
        dfh_fk_system_type: 9,
        label: 'Appellation for language',
        dfh_identifier_in_namespace: 'histC10',
        dfh_pk_class: 365,
        roleSets: {
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
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 0
                        },
                        {
                            pk_entity: 169,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1113,
                            fk_property_set: null,
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
                }
            },
            _1192_outgoing: {
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
                            pk_entity: 189,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1192,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
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
            _1112_outgoing: {
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
                            pk_entity: 170,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1112,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
                        },
                        {
                            pk_entity: 151,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1112,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 54,
                label: {
                    sg: 'Language',
                    pl: '[pl: 1112: histP10 undefined',
                    'default': 'Language'
                }
            },
            _1193_outgoing: {
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
                            pk_entity: 190,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1193,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
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
                            pk_entity: 192,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1194,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
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
                            pk_entity: 191,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1195,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: null
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
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1113,
                        property_is_outgoing: true,
                        roleSetKey: '_1113_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 2,
                        fk_property: 1112,
                        property_is_outgoing: true,
                        roleSetKey: '_1112_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1113,
                        property_is_outgoing: true,
                        roleSetKey: '_1113_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    }
                ]
            }
        }
    },
    '441': {
        dfh_fk_system_type: 8,
        label: 'Built work',
        dfh_identifier_in_namespace: 'histC11',
        dfh_pk_class: 441,
        roleSets: {
            _1184_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1184,
                    dfh_identifier_in_namespace: 'P166',
                    dfh_has_domain: 84,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 147,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 185,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1184,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 84,
                label: {
                    sg: 'Has geolocalization (time related)',
                    pl: 'Has geolocalizations (time related)',
                    'default': 'Has geolocalizations (time related)'
                }
            },
            _1187_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1187,
                    dfh_identifier_in_namespace: 'P8',
                    dfh_has_domain: 61,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 7,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 212,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1187,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 3
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 61,
                label: {
                    sg: 'Is place of birth',
                    pl: 'Is place of births',
                    'default': 'Is place of births'
                }
            },
            _1195_ingoing: {
                isOutgoing: false,
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
                            pk_entity: 184,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1195,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 0
                        },
                        {
                            pk_entity: 187,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1195,
                            fk_property_set: null,
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
                }
            },
            _1185_ingoing: {
                isOutgoing: false,
                property: {
                    dfh_pk_property: 1185,
                    dfh_identifier_in_namespace: 'histP12',
                    dfh_has_domain: 212,
                    dfh_has_range: 441,
                    dfh_fk_property_of_origin: 1177,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 186,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1185,
                            fk_property_set: null,
                            property_is_outgoing: false,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: -1,
                targetMinQuantity: 0,
                targetClassPk: 212,
                label: {
                    sg: 'Was built at place',
                    pl: 'Was built at places',
                    'default': 'Was built at places'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1195,
                        property_is_outgoing: false,
                        roleSetKey: '_1195_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 1,
                        fk_property: 1184,
                        property_is_outgoing: false,
                        roleSetKey: '_1184_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1185,
                        property_is_outgoing: false,
                        roleSetKey: '_1185_ingoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 3,
                        fk_property: 1187,
                        property_is_outgoing: false,
                        roleSetKey: '_1187_ingoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: 1195,
                        property_is_outgoing: false,
                        roleSetKey: '_1195_ingoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '442': {
        dfh_fk_system_type: 9,
        label: 'Membership',
        dfh_identifier_in_namespace: 'histC12',
        dfh_pk_class: 442,
        roleSets: {
            _1188_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1188,
                    dfh_identifier_in_namespace: 'histP15',
                    dfh_has_domain: 442,
                    dfh_has_range: 21,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 178,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1188,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        },
                        {
                            pk_entity: 207,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1188,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 1
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 21,
                label: {
                    sg: 'Member (Person)',
                    pl: 'Members (Persons)',
                    'default': 'Member (Person)'
                }
            },
            _1189_outgoing: {
                isOutgoing: true,
                property: {
                    dfh_pk_property: 1189,
                    dfh_identifier_in_namespace: 'histP16',
                    dfh_has_domain: 442,
                    dfh_has_range: 68,
                    dfh_fk_property_of_origin: null,
                    dfh_domain_instances_min_quantifier: 0,
                    dfh_domain_instances_max_quantifier: -1,
                    dfh_range_instances_min_quantifier: 1,
                    dfh_range_instances_max_quantifier: 1,
                    ui_context_config: [
                        {
                            pk_entity: 177,
                            fk_ui_context: 104,
                            fk_project: null,
                            fk_property: 1189,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        },
                        {
                            pk_entity: 208,
                            fk_ui_context: 103,
                            fk_project: null,
                            fk_property: 1189,
                            fk_property_set: null,
                            property_is_outgoing: true,
                            ord_num: 2
                        }
                    ]
                },
                targetMaxQuantity: 1,
                targetMinQuantity: 1,
                targetClassPk: 68,
                label: {
                    sg: 'Group (Organization)',
                    pl: 'Group (Organization)',
                    'default': 'Group (Organization)'
                }
            }
        },
        uiContexts: {
            '103': {
                label: 'Editable',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 1188,
                        property_is_outgoing: true,
                        roleSetKey: '_1188_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1189,
                        property_is_outgoing: true,
                        roleSetKey: '_1189_outgoing',
                        fk_property_set: null
                    }
                ]
            },
            '104': {
                label: 'Create',
                uiElements: [
                    {
                        ord_num: 0,
                        fk_property: null,
                        property_is_outgoing: null,
                        fk_property_set: 110,
                        property_set: {
                            pk_entity: 110,
                            description: null,
                            label: 'existence-time',
                            property_set_class_rels: [
                                {
                                    pk_entity: 122,
                                    fk_property_set: 110,
                                    fk_class: 63
                                },
                                {
                                    pk_entity: 123,
                                    fk_property_set: 110,
                                    fk_class: 61
                                },
                                {
                                    pk_entity: 125,
                                    fk_property_set: 110,
                                    fk_class: 60
                                },
                                {
                                    pk_entity: 126,
                                    fk_property_set: 110,
                                    fk_class: 62
                                },
                                {
                                    pk_entity: 127,
                                    fk_property_set: 110,
                                    fk_class: 78
                                },
                                {
                                    pk_entity: 128,
                                    fk_property_set: 110,
                                    fk_class: 79
                                },
                                {
                                    pk_entity: 129,
                                    fk_property_set: 110,
                                    fk_class: 212
                                },
                                {
                                    pk_entity: 130,
                                    fk_property_set: 110,
                                    fk_class: 261
                                },
                                {
                                    pk_entity: 131,
                                    fk_property_set: 110,
                                    fk_class: 262
                                },
                                {
                                    pk_entity: 132,
                                    fk_property_set: 110,
                                    fk_class: 340
                                },
                                {
                                    pk_entity: 133,
                                    fk_property_set: 110,
                                    fk_class: 365
                                },
                                {
                                    pk_entity: 134,
                                    fk_property_set: 110,
                                    fk_class: 442
                                }
                            ]
                        }
                    },
                    {
                        ord_num: 1,
                        fk_property: 1188,
                        property_is_outgoing: true,
                        roleSetKey: '_1188_outgoing',
                        fk_property_set: null
                    },
                    {
                        ord_num: 2,
                        fk_property: 1189,
                        property_is_outgoing: true,
                        roleSetKey: '_1189_outgoing',
                        fk_property_set: null
                    }
                ]
            }
        }
    },
    '443': {
        dfh_fk_system_type: 8,
        label: 'Built work type',
        dfh_identifier_in_namespace: 'histC13',
        dfh_pk_class: 443
    }
}
