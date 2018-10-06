import { ProjectCrm } from 'app/core';

export const crm: ProjectCrm = {
  classes: {
    '21': {
      subclassOf: 'peIt',
      label: 'Person',
      dfh_identifier_in_namespace: 'E21',
      dfh_pk_class: 21,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1192,
              property_is_outgoing: false,
              roleSetKey: '_1192_ingoing',
              fk_property_set: null,
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
              fk_property: 84,
              property_is_outgoing: false,
              roleSetKey: '_84_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 5,
              fk_property: 85,
              property_is_outgoing: false,
              roleSetKey: '_85_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 6,
              fk_property: 1180,
              property_is_outgoing: false,
              roleSetKey: '_1180_ingoing',
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
            }
          ]
        }
      },
      roleSets: {
        _84_ingoing: {
          type: 'RoleSet',
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
                pk_entity: 262,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_property_set: null
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
        _85_ingoing: {
          type: 'RoleSet',
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
                pk_entity: 263,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 265,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 88,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 266,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 270,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 269,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1188,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_property_set: null
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
        _86_ingoing: {
          type: 'RoleSet',
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
            dfh_range_instances_max_quantifier: -1,
            ui_context_config: [
              {
                pk_entity: 261,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
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
        _1196_ingoing: {
          type: 'RoleSet',
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
            ui_context_config: [
              {
                pk_entity: 264,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1196,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
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
          type: 'RoleSet',
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
                pk_entity: 267,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1180,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
            ui_context_config: [
              {
                pk_entity: 268,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1198,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
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
      }
    },
    '50': {
      label: 'Time-Span',
      dfh_identifier_in_namespace: 'E52',
      dfh_pk_class: 50,
      uiContexts: {},
      roleSets: {
        _68_outgoing: {
          type: 'RoleSet',
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
        _73_outgoing: {
          type: 'RoleSet',
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
          type: 'RoleSet',
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
        _71_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
        _150_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
      }
    },
    '60': {
      subclassOf: 'teEnt',
      label: 'Formation',
      dfh_identifier_in_namespace: 'E66',
      dfh_pk_class: 60,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
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
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        }
      },
      roleSets: {
        _83_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 259,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 83,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 260,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 139,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
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
      }
    },
    '61': {
      subclassOf: 'teEnt',
      label: 'Birth',
      dfh_identifier_in_namespace: 'E67',
      dfh_pk_class: 61,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 86,
              property_is_outgoing: true,
              roleSetKey: '_86_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
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
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            },
            {
              ord_num: 1,
              fk_property: 86,
              property_is_outgoing: true,
              roleSetKey: '_86_outgoing',
              fk_property_set: null
            }
          ]
        }
      },
      roleSets: {
        _84_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 249,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 254,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
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
        _85_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 252,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 256,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_property_set: null
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
        _86_outgoing: {
          type: 'RoleSet',
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
            dfh_range_instances_max_quantifier: -1,
            ui_context_config: [
              {
                pk_entity: 250,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 255,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 21,
          label: {
            sg: 'Born child',
            pl: 'Born children',
            'default': 'Born children'
          }
        },
        _1186_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 251,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1186,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 257,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1186,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 253,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 258,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 5,
                fk_class_for_property_set: null
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
      }
    },
    '63': {
      subclassOf: 'teEnt',
      label: 'Death',
      dfh_identifier_in_namespace: 'E69',
      dfh_pk_class: 63,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            },
            {
              ord_num: 1,
              fk_property: 88,
              property_is_outgoing: true,
              roleSetKey: '_88_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: 1191,
              property_is_outgoing: true,
              roleSetKey: '_1191_outgoing',
              fk_property_set: null
            }
          ]
        },
        '104': {
          label: 'Create',
          uiElements: []
        }
      },
      roleSets: {
        _88_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 297,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 88,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 298,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1191,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
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
      }
    },
    '68': {
      subclassOf: 'peIt',
      label: 'Group',
      dfh_identifier_in_namespace: 'E74',
      dfh_pk_class: 68,
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
              fk_property: 1182,
              property_is_outgoing: false,
              roleSetKey: '_1182_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 4,
              fk_property: 1189,
              property_is_outgoing: false,
              roleSetKey: '_1189_ingoing',
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
            },
            {
              ord_num: 7,
              fk_property: 139,
              property_is_outgoing: false,
              roleSetKey: '_139_ingoing',
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
      },
      roleSets: {
        _83_ingoing: {
          type: 'RoleSet',
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
                pk_entity: 285,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 83,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 286,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 87,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 288,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 132,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 289,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 134,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 284,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1189,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
          type: 'RoleSet',
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
            ui_context_config: [
              {
                pk_entity: 290,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 139,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 7,
                fk_class_for_property_set: null
              }
            ]
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
          type: 'RoleSet',
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
                pk_entity: 283,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 291,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 287,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1182,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
      }
    },
    '75': {
      subclassOf: 'peIt',
      label: 'Actor Appellation',
      dfh_identifier_in_namespace: 'E82',
      dfh_pk_class: 75,
      uiContexts: {}
    },
    '78': {
      subclassOf: 'teEnt',
      label: 'Joining',
      dfh_identifier_in_namespace: 'E85',
      dfh_pk_class: 78,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: []
        },
        '104': {
          label: 'Create',
          uiElements: []
        }
      },
      roleSets: {
        _132_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
          type: 'RoleSet',
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
      }
    },
    '79': {
      subclassOf: 'teEnt',
      label: 'Leaving',
      dfh_identifier_in_namespace: 'E86',
      dfh_pk_class: 79,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: []
        },
        '104': {
          label: 'Create',
          uiElements: []
        }
      },
      roleSets: {
        _134_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
          type: 'RoleSet',
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
      }
    },
    '84': {
      label: 'Presence',
      dfh_identifier_in_namespace: 'E93',
      dfh_pk_class: 84,
      uiContexts: {},
      roleSets: {
        _148_outgoing: {
          type: 'RoleSet',
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
          type: 'RoleSet',
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
          type: 'RoleSet',
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
      subclassOf: 'teEnt',
      label: 'Time-related geographical localisation',
      dfh_identifier_in_namespace: 'histC2',
      dfh_pk_class: 212,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: []
        },
        '104': {
          label: 'Create',
          uiElements: []
        }
      },
      roleSets: {
        _1178_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
      }
    },
    '363': {
      subclassOf: 'peIt',
      label: 'Geographical Place',
      dfh_identifier_in_namespace: 'histC8',
      dfh_pk_class: 363,
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
        }
      },
      roleSets: {
        _1181_ingoing: {
          type: 'RoleSet',
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
          type: 'RoleSet',
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
                pk_entity: 300,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1186,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 299,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 301,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1191,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 302,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1178,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
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
      }
    },
    '364': {
      subclassOf: 'peIt',
      label: 'Geographical place type',
      dfh_identifier_in_namespace: 'histC9',
      dfh_pk_class: 364,
      uiContexts: {}
    },
    '365': {
      subclassOf: 'teEnt',
      label: 'Appellation for language',
      dfh_identifier_in_namespace: 'histC10',
      dfh_pk_class: 365,
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
              ord_num: 1,
              fk_property: 1112,
              property_is_outgoing: true,
              roleSetKey: '_1112_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 224,
              property_set: {
                pk_entity: 224,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
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
            }
          ]
        }
      },
      roleSets: {
        _1113_outgoing: {
          type: 'RoleSet',
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
                pk_entity: 271,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1113,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 277,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1113,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 278,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 272,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 273,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1112,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 279,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1112,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 280,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 275,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 274,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 282,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 276,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 281,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
      }
    },
    '441': {
      subclassOf: 'peIt',
      label: 'Built work',
      dfh_identifier_in_namespace: 'histC11',
      dfh_pk_class: 441,
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
              fk_property: 1187,
              property_is_outgoing: false,
              roleSetKey: '_1187_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 3,
              fk_property: 1185,
              property_is_outgoing: false,
              roleSetKey: '_1185_ingoing',
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
      },
      roleSets: {
        _1184_ingoing: {
          type: 'RoleSet',
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
                pk_entity: 293,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1184,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 294,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 292,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 296,
                fk_ui_context: 104,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
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
                pk_entity: 295,
                fk_ui_context: 103,
                fk_project: null,
                fk_property: 1185,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_property_set: null
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
      }
    },
    '442': {
      subclassOf: 'teEnt',
      label: 'Membership',
      dfh_identifier_in_namespace: 'histC12',
      dfh_pk_class: 442,
      uiContexts: {
        '103': {
          label: 'Editable',
          uiElements: []
        },
        '104': {
          label: 'Create',
          uiElements: []
        }
      },
      roleSets: {
        _1188_outgoing: {
          type: 'RoleSet',
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
            ui_context_config: []
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
          type: 'RoleSet',
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
            ui_context_config: []
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
      }
    },
    '443': {
      subclassOf: 'peIt',
      label: 'Built work type',
      dfh_identifier_in_namespace: 'histC13',
      dfh_pk_class: 443,
      uiContexts: {}
    }
  },
  roleSets: {
    _84_ingoing: {
      type: 'RoleSet',
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
            pk_entity: 262,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 4,
            fk_class_for_property_set: null
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
    _85_ingoing: {
      type: 'RoleSet',
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
            pk_entity: 263,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 5,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 265,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 88,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 266,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 270,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 269,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1188,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
            fk_class_for_property_set: null
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
    _86_ingoing: {
      type: 'RoleSet',
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
        dfh_range_instances_max_quantifier: -1,
        ui_context_config: [
          {
            pk_entity: 261,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
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
    _1196_ingoing: {
      type: 'RoleSet',
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
        ui_context_config: [
          {
            pk_entity: 264,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1196,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
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
      type: 'RoleSet',
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
            pk_entity: 267,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1180,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 6,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
        ui_context_config: [
          {
            pk_entity: 268,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1198,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 79,
      label: {
        sg: '[inv.sg: 1198: P143 undefined',
        pl: '[inv.pl: 1198: P143 undefined',
        'default': '[inv.pl: 1198: P143 undefined'
      }
    },
    _68_outgoing: {
      type: 'RoleSet',
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
    _73_outgoing: {
      type: 'RoleSet',
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
      type: 'RoleSet',
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
    _71_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
    _150_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 335,
      label: {
        sg: '[sg: 153: P82b_end_of_the_end undefined',
        pl: 'End of end',
        'default': 'End of end'
      }
    },
    _83_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 259,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 83,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 260,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 139,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
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
    },
    _84_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 249,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 254,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
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
    _85_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 252,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 256,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 3,
            fk_class_for_property_set: null
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
    _86_outgoing: {
      type: 'RoleSet',
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
        dfh_range_instances_max_quantifier: -1,
        ui_context_config: [
          {
            pk_entity: 250,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 255,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 21,
      label: {
        sg: 'Born child',
        pl: 'Born children',
        'default': 'Born children'
      }
    },
    _1186_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 251,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1186,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 257,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1186,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 4,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 253,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 258,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 5,
            fk_class_for_property_set: null
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
    },
    _88_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 297,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 88,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 298,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1191,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
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
    },
    _83_ingoing: {
      type: 'RoleSet',
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
            pk_entity: 285,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 83,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 286,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 87,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 288,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 132,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 5,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 289,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 134,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 6,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 284,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1189,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 4,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
      type: 'RoleSet',
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
        ui_context_config: [
          {
            pk_entity: 290,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 139,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 7,
            fk_class_for_property_set: null
          }
        ]
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
      type: 'RoleSet',
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
            pk_entity: 283,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 291,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 287,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1182,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
    },
    _132_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
      type: 'RoleSet',
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
    },
    _134_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
      type: 'RoleSet',
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
    },
    _148_outgoing: {
      type: 'RoleSet',
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
      type: 'RoleSet',
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
      type: 'RoleSet',
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
    },
    _1178_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 441,
      label: {
        sg: 'Built work located relative to place',
        pl: 'Built work located relative to places',
        'default': 'Built work located relative to place'
      }
    },
    _1181_ingoing: {
      type: 'RoleSet',
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
      type: 'RoleSet',
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
            pk_entity: 300,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1186,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 299,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 301,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1191,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 302,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1178,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
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
    },
    _1113_outgoing: {
      type: 'RoleSet',
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
            pk_entity: 271,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1113,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 277,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1113,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 278,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 272,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 273,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1112,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 279,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1112,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 280,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 275,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 274,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 282,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 276,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 281,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
    _1184_ingoing: {
      type: 'RoleSet',
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
            pk_entity: 293,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1184,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 294,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 292,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 296,
            fk_ui_context: 104,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
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
            pk_entity: 295,
            fk_ui_context: 103,
            fk_project: null,
            fk_property: 1185,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
            fk_class_for_property_set: null
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
    },
    _1188_outgoing: {
      type: 'RoleSet',
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
        ui_context_config: []
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
      type: 'RoleSet',
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
        ui_context_config: []
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
  }
}


