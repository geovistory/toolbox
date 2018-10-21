import { ProjectCrm } from './active-project.models';
import { ComConfig } from 'app/core/config/com-config';

export const crm: ProjectCrm = {
  classes: {
    '21': {
      subclassOf: 'peIt',
      label: 'Person',
      dfh_identifier_in_namespace: 'E21',
      dfh_pk_class: 21,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
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
              fk_property: 1180,
              property_is_outgoing: false,
              roleSetKey: '_1180_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 4,
              fk_property: 1188,
              property_is_outgoing: false,
              roleSetKey: '_1188_ingoing',
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
            },
            {
              ord_num: 7,
              fk_property: 1196,
              property_is_outgoing: false,
              roleSetKey: '_1196_ingoing',
              fk_property_set: null
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1192,
              property_is_outgoing: false,
              roleSetKey: '_1192_ingoing',
              fk_property_set: null
            }
          ]
        },
        '47': {
          label: 'Add',
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
              fk_property: 88,
              property_is_outgoing: false,
              roleSetKey: '_88_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: 86,
              property_is_outgoing: false,
              roleSetKey: '_86_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 3,
              fk_property: 85,
              property_is_outgoing: false,
              roleSetKey: '_85_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 4,
              fk_property: 84,
              property_is_outgoing: false,
              roleSetKey: '_84_ingoing',
              fk_property_set: null
            }
          ]
        },
        '229': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1192,
              property_is_outgoing: false,
              roleSetKey: '_1192_ingoing',
              fk_property_set: null
            }
          ]
        },
        '230': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1188,
              property_is_outgoing: false,
              roleSetKey: '_1188_ingoing',
              fk_property_set: null
            }
          ]
        }
      },
      roleSets: {
        _1192_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 79,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 80,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 215,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 233,
                fk_ui_context: 229,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 85,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1188,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 234,
                fk_ui_context: 230,
                fk_project: null,
                fk_property: 1188,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
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
        _1196_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 191,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1196,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 7,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 78,
          label: {
            sg: 'Joining',
            pl: 'Joinings',
            'default': 'Joinings'
          }
        },
        _1180_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 86,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1180,
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
            sg: 'Localisation',
            pl: 'Localisations',
            'default': 'Localisations'
          }
        },
        _1198_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
        },
        _84_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 84,
            dfh_identifier_in_namespace: 'P96',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 83,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 218,
                fk_ui_context: 47,
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
        _88_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 88,
            dfh_identifier_in_namespace: 'P100',
            dfh_has_domain: 63,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 82,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 88,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 217,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 88,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
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
        _85_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 85,
            dfh_identifier_in_namespace: 'P97',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 84,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 219,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
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
        _140_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 140,
            dfh_identifier_in_namespace: 'P152',
            dfh_has_domain: 21,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 140: P152 undefined',
            pl: '[inv.pl: 140: P152 undefined',
            'default': '[inv.pl: 140: P152 undefined'
          }
        },
        _86_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 86,
            dfh_identifier_in_namespace: 'P98',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            ui_context_config: [
              {
                pk_entity: 81,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 216,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
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
        _140_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 140,
            dfh_identifier_in_namespace: 'P152',
            dfh_has_domain: 21,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 21,
          label: {
            sg: '[sg: 140: P152 undefined',
            pl: '[pl: 140: P152 undefined',
            'default': '[pl: 140: P152 undefined'
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
        _4_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 4,
            dfh_identifier_in_namespace: 'P4',
            dfh_has_domain: 2,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 2,
          label: {
            sg: '[inv.sg: 4: P4 undefined',
            pl: '[inv.pl: 4: P4 undefined',
            'default': '[inv.sg: 4: P4 undefined'
          }
        },
        _75_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 75,
            dfh_identifier_in_namespace: 'P86',
            dfh_has_domain: 50,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 50,
          label: {
            sg: '[inv.sg: 75: P86 undefined',
            pl: '[inv.pl: 75: P86 undefined',
            'default': '[inv.pl: 75: P86 undefined'
          }
        },
        _143_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 143,
            dfh_identifier_in_namespace: 'P160',
            dfh_has_domain: 83,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 83,
          label: {
            sg: '[inv.sg: 143: P160 undefined',
            pl: '[inv.pl: 143: P160 undefined',
            'default': '[inv.pl: 143: P160 undefined'
          }
        },
        _145_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 145,
            dfh_identifier_in_namespace: 'P164',
            dfh_has_domain: 84,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 84,
          label: {
            sg: '[inv.sg: 145: P164 undefined',
            pl: '[inv.pl: 145: P164 undefined',
            'default': '[inv.pl: 145: P164 undefined'
          }
        },
        _1008_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1008,
            dfh_identifier_in_namespace: 'R34',
            dfh_has_domain: 250,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 250,
          label: {
            sg: '[inv.sg: 1008: R34 undefined',
            pl: '[inv.pl: 1008: R34 undefined',
            'default': '[inv.pl: 1008: R34 undefined'
          }
        },
        _1059_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1059,
            dfh_identifier_in_namespace: 'Q13',
            dfh_has_domain: 352,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 352,
          label: {
            sg: '[inv.sg: 1059: Q13 undefined',
            pl: '[inv.pl: 1059: Q13 undefined',
            'default': '[inv.pl: 1059: Q13 undefined'
          }
        },
        _68_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 68,
            dfh_identifier_in_namespace: 'P78',
            dfh_has_domain: 50,
            dfh_has_range: 47,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 47,
          label: {
            sg: '[sg: 68: P78 undefined',
            pl: '[pl: 68: P78 undefined',
            'default': '[pl: 68: P78 undefined'
          }
        },
        _69_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 69,
            dfh_identifier_in_namespace: 'P79',
            dfh_has_domain: 50,
            dfh_has_range: 339,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 339,
          label: {
            sg: '[sg: 69: P79 undefined',
            pl: '[pl: 69: P79 undefined',
            'default': '[pl: 69: P79 undefined'
          }
        },
        _70_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 70,
            dfh_identifier_in_namespace: 'P80',
            dfh_has_domain: 50,
            dfh_has_range: 339,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 339,
          label: {
            sg: '[sg: 70: P80 undefined',
            pl: '[pl: 70: P80 undefined',
            'default': '[pl: 70: P80 undefined'
          }
        },
        _71_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 71,
            dfh_identifier_in_namespace: 'P81',
            dfh_has_domain: 50,
            dfh_has_range: 335,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 335,
          label: {
            sg: '[sg: 71: P81 undefined',
            pl: 'Ongoing throughout',
            'default': 'Ongoing throughout'
          }
        },
        _72_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 72,
            dfh_identifier_in_namespace: 'P82',
            dfh_has_domain: 50,
            dfh_has_range: 335,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 335,
          label: {
            sg: '[sg: 72: P82 undefined',
            pl: 'At some time within',
            'default': 'At some time within'
          }
        },
        _73_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 73,
            dfh_identifier_in_namespace: 'P83',
            dfh_has_domain: 50,
            dfh_has_range: 52,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 52,
          label: {
            sg: '[sg: 73: P83 undefined',
            pl: '[pl: 73: P83 undefined',
            'default': '[pl: 73: P83 undefined'
          }
        },
        _74_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 74,
            dfh_identifier_in_namespace: 'P84',
            dfh_has_domain: 50,
            dfh_has_range: 52,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 52,
          label: {
            sg: '[sg: 74: P84 undefined',
            pl: '[pl: 74: P84 undefined',
            'default': '[pl: 74: P84 undefined'
          }
        },
        _75_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 75,
            dfh_identifier_in_namespace: 'P86',
            dfh_has_domain: 50,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 50,
          label: {
            sg: '[sg: 75: P86 undefined',
            pl: '[pl: 75: P86 undefined',
            'default': '[pl: 75: P86 undefined'
          }
        },
        _150_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
        },
        _152_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 152,
            dfh_identifier_in_namespace: 'P82a',
            dfh_has_domain: 50,
            dfh_has_range: 335,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 335,
          label: {
            sg: '[sg: 152: P82a undefined',
            pl: 'Begin of begin',
            'default': 'Begin of begin'
          }
        },
        _153_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 153,
            dfh_identifier_in_namespace: 'P82b',
            dfh_has_domain: 50,
            dfh_has_range: 335,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 335,
          label: {
            sg: '[sg: 153: P82b undefined',
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
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
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
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: []
        }
      },
      roleSets: {
        _83_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 83,
            dfh_identifier_in_namespace: 'P95',
            dfh_has_domain: 60,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 87,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 83,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 89,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 83,
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
            sg: 'Formed Group (Organization)',
            pl: 'Formed Groups (Organizations)',
            'default': 'Formed Group (Organization)'
          }
        },
        _139_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 139,
            dfh_identifier_in_namespace: 'P151',
            dfh_has_domain: 60,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 88,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 139,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 90,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 139,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
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
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
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
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
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
        },
        '47': {
          label: 'Add',
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
              fk_property: 1187,
              property_is_outgoing: true,
              roleSetKey: '_1187_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: 1186,
              property_is_outgoing: true,
              roleSetKey: '_1186_outgoing',
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
              fk_property: 84,
              property_is_outgoing: true,
              roleSetKey: '_84_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 5,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        }
      },
      roleSets: {
        _1043_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1043,
            dfh_identifier_in_namespace: 'histP5',
            dfh_has_domain: 340,
            dfh_has_range: 61,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 340,
          label: {
            sg: '[inv.sg: 1043: histP5 undefined',
            pl: '[inv.pl: 1043: histP5 undefined',
            'default': '[inv.pl: 1043: histP5 undefined'
          }
        },
        _1186_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 76,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1186,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 221,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1186,
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
            sg: 'Place of birth',
            pl: 'Places of birth',
            'default': 'Place of birth'
          }
        },
        _1187_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 77,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 5,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 224,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
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
        _84_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 84,
            dfh_identifier_in_namespace: 'P96',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 73,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 222,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 84,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 4,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 85,
            dfh_identifier_in_namespace: 'P97',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 75,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 85,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 223,
                fk_ui_context: 47,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 86,
            dfh_identifier_in_namespace: 'P98',
            dfh_has_domain: 61,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            ui_context_config: [
              {
                pk_entity: 74,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 78,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 220,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 86,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
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
        }
      }
    },
    '63': {
      subclassOf: 'teEnt',
      label: 'Death',
      dfh_identifier_in_namespace: 'E69',
      dfh_pk_class: 63,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
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
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1191,
              property_is_outgoing: true,
              roleSetKey: '_1191_outgoing',
              fk_property_set: null
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
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        }
      },
      roleSets: {
        _1044_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1044,
            dfh_identifier_in_namespace: 'histP6',
            dfh_has_domain: 340,
            dfh_has_range: 63,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 226,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1044,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 340,
          label: {
            sg: '[inv.sg: 1044: histP6 undefined',
            pl: '[inv.pl: 1044: histP6 undefined',
            'default': '[inv.pl: 1044: histP6 undefined'
          }
        },
        _1191_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 92,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1191,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 225,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1191,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 363,
          label: {
            sg: 'Place of death',
            pl: 'Places of death',
            'default': 'Place of death'
          }
        },
        _88_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 88,
            dfh_identifier_in_namespace: 'P100',
            dfh_has_domain: 63,
            dfh_has_range: 21,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 91,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 88,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 227,
                fk_ui_context: 47,
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
        }
      }
    },
    '68': {
      subclassOf: 'peIt',
      label: 'Group',
      dfh_identifier_in_namespace: 'E74',
      dfh_pk_class: 68,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
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
        '46': {
          label: 'DataUnits Create',
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
        _1189_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 98,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 101,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1197,
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
            sg: '[inv.sg: 1197: P143 undefined',
            pl: '[inv.pl: 1197: P143 undefined',
            'default': '[inv.pl: 1197: P143 undefined'
          }
        },
        _1193_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 93,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 100,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 102,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 103,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1199,
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
            sg: '[inv.sg: 1199: P143 undefined',
            pl: '[inv.pl: 1199: P143 undefined',
            'default': '[inv.pl: 1199: P143 undefined'
          }
        },
        _83_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 83,
            dfh_identifier_in_namespace: 'P95',
            dfh_has_domain: 60,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 94,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 87,
            dfh_identifier_in_namespace: 'P99',
            dfh_has_domain: 62,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 96,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 132,
            dfh_identifier_in_namespace: 'P144',
            dfh_has_domain: 78,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 97,
                fk_ui_context: 45,
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
            pl: 'Joinings',
            'default': 'Joinings'
          }
        },
        _134_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 134,
            dfh_identifier_in_namespace: 'P146',
            dfh_has_domain: 79,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 99,
                fk_ui_context: 45,
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
        _139_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 139,
            dfh_identifier_in_namespace: 'P151',
            dfh_has_domain: 60,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 95,
                fk_ui_context: 45,
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
        _1013_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1013,
            dfh_identifier_in_namespace: 'R39',
            dfh_has_domain: 251,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 251,
          label: {
            sg: '[inv.sg: 1013: R39 undefined',
            pl: '[inv.pl: 1013: R39 undefined',
            'default': '[inv.pl: 1013: R39 undefined'
          }
        },
        _1035_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1035,
            dfh_identifier_in_namespace: 'R62',
            dfh_has_domain: 262,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 262,
          label: {
            sg: '[inv.sg: 1035: R62 undefined',
            pl: '[inv.pl: 1035: R62 undefined',
            'default': '[inv.pl: 1035: R62 undefined'
          }
        },
        _95_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 95,
            dfh_identifier_in_namespace: 'P107',
            dfh_has_domain: 68,
            dfh_has_range: 38,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 38,
          label: {
            sg: '[sg: 95: P107 undefined',
            pl: '[pl: 95: P107 undefined',
            'default': '[pl: 95: P107 undefined'
          }
        }
      }
    },
    '75': {
      subclassOf: 'peIt',
      label: 'Actor Appellation',
      dfh_identifier_in_namespace: 'E82',
      dfh_pk_class: 75,
      uiContexts: {},
      roleSets: {
        _119_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 119,
            dfh_identifier_in_namespace: 'P131',
            dfh_has_domain: 38,
            dfh_has_range: 75,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 38,
          label: {
            sg: '[inv.sg: 119: P131 undefined',
            pl: '[inv.pl: 119: P131 undefined',
            'default': '[inv.pl: 119: P131 undefined'
          }
        }
      }
    },
    '78': {
      subclassOf: 'teEnt',
      label: 'Joining',
      dfh_identifier_in_namespace: 'E85',
      dfh_pk_class: 78,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 132,
              property_is_outgoing: true,
              roleSetKey: '_132_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: 1196,
              property_is_outgoing: true,
              roleSetKey: '_1196_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 132,
              property_is_outgoing: true,
              roleSetKey: '_132_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: 1196,
              property_is_outgoing: true,
              roleSetKey: '_1196_outgoing',
              fk_property_set: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: []
        }
      },
      roleSets: {
        _1196_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 188,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1196,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 190,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1196,
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
            sg: 'Person',
            pl: 'Persons',
            'default': 'Person'
          }
        },
        _1197_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
        _131_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 131,
            dfh_identifier_in_namespace: 'P143',
            dfh_has_domain: 78,
            dfh_has_range: 38,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 38,
          label: {
            sg: '[sg: 131: P143 undefined',
            pl: '[pl: 131: P143 undefined',
            'default': '[sg: 131: P143 undefined'
          }
        },
        _132_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 132,
            dfh_identifier_in_namespace: 'P144',
            dfh_has_domain: 78,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 187,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 132,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 189,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 132,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 68,
          label: {
            sg: 'Joined Group',
            pl: 'Joined Groups',
            'default': 'Joined Group'
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
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            },
            {
              ord_num: 1,
              fk_property: 134,
              property_is_outgoing: true,
              roleSetKey: '_134_outgoing',
              fk_property_set: null
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            },
            {
              ord_num: 1,
              fk_property: 134,
              property_is_outgoing: true,
              roleSetKey: '_134_outgoing',
              fk_property_set: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: []
        }
      },
      roleSets: {
        _1198_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
        _133_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 133,
            dfh_identifier_in_namespace: 'P145',
            dfh_has_domain: 79,
            dfh_has_range: 38,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 38,
          label: {
            sg: '[sg: 133: P145 undefined',
            pl: '[pl: 133: P145 undefined',
            'default': '[sg: 133: P145 undefined'
          }
        },
        _134_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 134,
            dfh_identifier_in_namespace: 'P146',
            dfh_has_domain: 79,
            dfh_has_range: 68,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 104,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 134,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 105,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 134,
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
            sg: 'Was left',
            pl: 'Was left',
            'default': 'Was left'
          }
        }
      }
    },
    '84': {
      label: 'Presence',
      dfh_identifier_in_namespace: 'E93',
      dfh_pk_class: 84,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 148,
              property_is_outgoing: true,
              roleSetKey: '_148_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 148,
              property_is_outgoing: true,
              roleSetKey: '_148_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        }
      },
      roleSets: {
        _1181_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 108,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1181,
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
            sg: 'Place',
            pl: 'Places',
            'default': 'Place'
          }
        },
        _1184_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 107,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1184,
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
            sg: 'Place',
            pl: 'Places',
            'default': 'Place'
          }
        },
        _145_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 145,
            dfh_identifier_in_namespace: 'P164',
            dfh_has_domain: 84,
            dfh_has_range: 50,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 50,
          label: {
            sg: '[sg: 145: P164 undefined',
            pl: '[pl: 145: P164 undefined',
            'default': '[pl: 145: P164 undefined'
          }
        },
        _148_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 148,
            dfh_identifier_in_namespace: 'P167',
            dfh_has_domain: 84,
            dfh_has_range: 51,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 1,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 106,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 148,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 109,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 148,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 51,
          label: {
            sg: 'Geocoordinates',
            pl: 'Geocoordinates',
            'default': 'Geocoordinates'
          }
        }
      }
    },
    '212': {
      subclassOf: 'teEnt',
      label: 'Localisation',
      dfh_identifier_in_namespace: 'histC2',
      dfh_pk_class: 212,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
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
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1178,
              property_is_outgoing: true,
              roleSetKey: '_1178_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
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
        '47': {
          label: 'Add',
          uiElements: []
        }
      },
      roleSets: {
        _1178_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 119,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1178,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 114,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1178,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 363,
          label: {
            sg: 'Place ',
            pl: 'Place',
            'default': 'Place '
          }
        },
        _1180_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 115,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1180,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 120,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1180,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: 'Person',
            pl: 'Persons',
            'default': 'Person'
          }
        },
        _1182_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 118,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1182,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 121,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1182,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 117,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1183,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
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
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 116,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1185,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 122,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1185,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_property_set: null
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
        },
        _1066_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1066,
            dfh_identifier_in_namespace: 'histP7',
            dfh_has_domain: 212,
            dfh_has_range: 53,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 53,
          label: {
            sg: '[sg: 1066: histP7 undefined',
            pl: '[pl: 1066: histP7 undefined',
            'default': '[sg: 1066: histP7 undefined'
          }
        }
      }
    },
    '219': {
      subclassOf: 'peIt',
      label: 'Serially Produced Object',
      dfh_identifier_in_namespace: 'F3',
      dfh_pk_class: 219,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1202,
              property_is_outgoing: false,
              roleSetKey: '_1202_ingoing',
              fk_property_set: null
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1202,
              property_is_outgoing: false,
              roleSetKey: '_1202_ingoing',
              fk_property_set: null
            }
          ]
        }
      },
      roleSets: {
        _982_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 982,
            dfh_identifier_in_namespace: 'R7',
            dfh_has_domain: 221,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 159,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 982,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 221,
          label: {
            sg: '[inv.sg: 982: R7 undefined',
            pl: '[inv.pl: 982: R7 undefined',
            'default': '[inv.pl: 982: R7 undefined'
          }
        },
        _971_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 971,
            dfh_identifier_in_namespace: 'CLP46_should_be_composed_of',
            dfh_has_domain: 219,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 160,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 971,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: '[inv.sg: 971: CLP46_should_be_composed_of undefined',
            pl: '[inv.pl: 971: CLP46_should_be_composed_of undefined',
            'default': '[inv.pl: 971: CLP46_should_be_composed_of undefined'
          }
        },
        _979_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 979,
            dfh_identifier_in_namespace: 'R4',
            dfh_has_domain: 218,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 161,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 979,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 218,
          label: {
            sg: '[inv.sg: 979: R4 undefined',
            pl: '[inv.pl: 979: R4 undefined',
            'default': '[inv.pl: 979: R4 undefined'
          }
        },
        _1000_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1000,
            dfh_identifier_in_namespace: 'R26',
            dfh_has_domain: 248,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 162,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1000,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 248,
          label: {
            sg: '[inv.sg: 1000: R26 undefined',
            pl: '[inv.pl: 1000: R26 undefined',
            'default': '[inv.pl: 1000: R26 undefined'
          }
        },
        _1015_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1015,
            dfh_identifier_in_namespace: 'R41',
            dfh_has_domain: 218,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 163,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1015,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 218,
          label: {
            sg: '[inv.sg: 1015: R41 undefined',
            pl: '[inv.pl: 1015: R41 undefined',
            'default': '[inv.pl: 1015: R41 undefined'
          }
        },
        _1022_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1022,
            dfh_identifier_in_namespace: 'R49',
            dfh_has_domain: 256,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 164,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1022,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 256,
          label: {
            sg: '[inv.sg: 1022: R49 undefined',
            pl: '[inv.pl: 1022: R49 undefined',
            'default': '[inv.pl: 1022: R49 undefined'
          }
        },
        _1202_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 156,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1202,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 157,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1202,
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
            sg: 'Bibliographic Reference',
            pl: 'Bibliographic References',
            'default': 'Bibliographic References'
          }
        },
        _970_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 970,
            dfh_identifier_in_namespace: 'CLP45_should_consist_of',
            dfh_has_domain: 219,
            dfh_has_range: 55,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 166,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 970,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 55,
          label: {
            sg: '[sg: 970: CLP45_should_consist_of undefined',
            pl: '[pl: 970: CLP45_should_consist_of undefined',
            'default': '[pl: 970: CLP45_should_consist_of undefined'
          }
        },
        _971_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 971,
            dfh_identifier_in_namespace: 'CLP46_should_be_composed_of',
            dfh_has_domain: 219,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 168,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 971,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: '[sg: 971: CLP46_should_be_composed_of undefined',
            pl: '[pl: 971: CLP46_should_be_composed_of undefined',
            'default': '[pl: 971: CLP46_should_be_composed_of undefined'
          }
        },
        _972_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 972,
            dfh_identifier_in_namespace: 'CLP57_should_have_number_of_parts',
            dfh_has_domain: 219,
            dfh_has_range: null,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 169,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 972,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: null,
          label: {
            sg: '[sg: 972: CLP57_should_have_number_of_parts undefined',
            pl: '[pl: 972: CLP57_should_have_number_of_parts undefined',
            'default': '[pl: 972: CLP57_should_have_number_of_parts undefined'
          }
        },
        _975_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 975,
            dfh_identifier_in_namespace: 'CLR6_should_carry',
            dfh_has_domain: 219,
            dfh_has_range: 240,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 172,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 975,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 240,
          label: {
            sg: '[sg: 975: CLR6_should_carry undefined',
            pl: '[pl: 975: CLR6_should_carry undefined',
            'default': '[pl: 975: CLR6_should_carry undefined'
          }
        },
        _969_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 969,
            dfh_identifier_in_namespace: 'CLP43_should_have_dimension',
            dfh_has_domain: 219,
            dfh_has_range: 52,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 167,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 969,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 52,
          label: {
            sg: '[sg: 969: CLP43_should_have_dimension undefined',
            pl: '[pl: 969: CLP43_should_have_dimension undefined',
            'default': '[pl: 969: CLP43_should_have_dimension undefined'
          }
        },
        _974_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 974,
            dfh_identifier_in_namespace: 'CLP105_right_held_by',
            dfh_has_domain: 219,
            dfh_has_range: 38,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 171,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 974,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 38,
          label: {
            sg: '[sg: 974: CLP105_right_held_by undefined',
            pl: '[pl: 974: CLP105_right_held_by undefined',
            'default': '[pl: 974: CLP105_right_held_by undefined'
          }
        },
        _973_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 973,
            dfh_identifier_in_namespace: 'CLP104_subject_to',
            dfh_has_domain: 219,
            dfh_has_range: 29,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 170,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 973,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 29,
          label: {
            sg: '[sg: 973: CLP104_subject_to undefined',
            pl: '[pl: 973: CLP104_subject_to undefined',
            'default': '[pl: 973: CLP104_subject_to undefined'
          }
        },
        _968_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 968,
            dfh_identifier_in_namespace: 'CLP2_should_have_type',
            dfh_has_domain: 219,
            dfh_has_range: 53,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 165,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 968,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 53,
          label: {
            sg: '[sg: 968: CLP2_should_have_type undefined',
            pl: '[pl: 968: CLP2_should_have_type undefined',
            'default': '[pl: 968: CLP2_should_have_type undefined'
          }
        }
      }
    },
    '221': {
      subclassOf: 'peIt',
      label: 'Item',
      dfh_identifier_in_namespace: 'F5',
      dfh_pk_class: 221,
      uiContexts: {},
      roleSets: {
        _982_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 982,
            dfh_identifier_in_namespace: 'R7',
            dfh_has_domain: 221,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: '[sg: 982: R7 undefined',
            pl: '[pl: 982: R7 undefined',
            'default': '[pl: 982: R7 undefined'
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
        '45': {
          label: 'DataUnits View and Edit',
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
              fk_property: 1181,
              property_is_outgoing: false,
              roleSetKey: '_1181_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: 1178,
              property_is_outgoing: false,
              roleSetKey: '_1178_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 3,
              fk_property: 1191,
              property_is_outgoing: false,
              roleSetKey: '_1191_ingoing',
              fk_property_set: null
            },
            {
              ord_num: 4,
              fk_property: 1186,
              property_is_outgoing: false,
              roleSetKey: '_1186_ingoing',
              fk_property_set: null
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
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
              fk_property: 1110,
              property_is_outgoing: true,
              roleSetKey: '_1110_outgoing',
              fk_property_set: null
            }
          ]
        },
        '47': {
          label: 'Add',
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
              fk_property: 1110,
              property_is_outgoing: true,
              roleSetKey: '_1110_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: 1181,
              property_is_outgoing: false,
              roleSetKey: '_1181_ingoing',
              fk_property_set: null
            }
          ]
        }
      },
      roleSets: {
        _1181_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 152,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1181,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 211,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1181,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 84,
          label: {
            sg: 'Geolocalization (time related)',
            pl: 'Geolocalizations (time related)',
            'default': 'Geolocalizations (time related)'
          }
        },
        _1186_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 125,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1186,
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
            sg: 'Birth that happened here',
            pl: 'Births that happened here',
            'default': 'Births that happened here'
          }
        },
        _1194_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 123,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 124,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 210,
                fk_ui_context: 47,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 126,
                fk_ui_context: 45,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 127,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1178,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Entities located here',
            pl: 'Entities located here',
            'default': 'Entities located here'
          }
        },
        _1110_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1110,
            dfh_identifier_in_namespace: 'histP8',
            dfh_has_domain: 363,
            dfh_has_range: 364,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 214,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1110,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 228,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1110,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 364,
          label: {
            sg: 'has Type',
            pl: 'has Types',
            'default': 'has Type'
          }
        }
      }
    },
    '364': {
      subclassOf: 'peIt',
      label: 'Geographical place type',
      dfh_identifier_in_namespace: 'histC9',
      dfh_pk_class: 364,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              roleSetKey: '_1200_ingoing',
              fk_property_set: null
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              roleSetKey: '_1200_ingoing',
              fk_property_set: null
            }
          ]
        }
      },
      roleSets: {
        _1200_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 185,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1200,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 186,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1200,
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
            sg: 'Term/Label',
            pl: 'Terms/Labels',
            'default': 'Terms/Labels'
          }
        },
        _1110_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1110,
            dfh_identifier_in_namespace: 'histP8',
            dfh_has_domain: 363,
            dfh_has_range: 364,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: 'is Type of',
            pl: 'is Type of',
            'default': 'is Type of'
          }
        }
      }
    },
    '365': {
      subclassOf: 'teEnt',
      label: 'Naming',
      dfh_identifier_in_namespace: 'histC10',
      dfh_pk_class: 365,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
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
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
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
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1112,
              property_is_outgoing: true,
              roleSetKey: '_1112_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: 1113,
              property_is_outgoing: true,
              roleSetKey: '_1113_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 2,
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        }
      },
      roleSets: {
        _1111_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1111,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 1,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 1,
          label: {
            sg: '[sg: 1111: histP9 undefined',
            pl: '[pl: 1111: histP9 undefined',
            'default': '[pl: 1111: histP9 undefined'
          }
        },
        _1192_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 130,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1192,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 135,
                fk_ui_context: 45,
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
            sg: 'Person with this Name',
            pl: 'Persons with this Name',
            'default': 'Person with this Name'
          }
        },
        _1193_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 133,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1193,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 136,
                fk_ui_context: 45,
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
            sg: 'Group with this Name',
            pl: 'Groups with this Name',
            'default': 'Group with this Name'
          }
        },
        _1194_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 131,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1194,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 137,
                fk_ui_context: 45,
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
            sg: 'Geo-Place with this Name',
            pl: 'Geo-Places with this Name',
            'default': 'Geo-Place with this Name'
          }
        },
        _1195_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 132,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 139,
                fk_ui_context: 45,
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
            sg: 'Built Work with this Name',
            pl: 'Built Works with this Name',
            'default': 'Built Work with this Name'
          }
        },
        _1113_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: true,
            ui_context_config: [
              {
                pk_entity: 128,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1113,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 134,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1113,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 212,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1113,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 40,
          label: {
            sg: 'Spelling',
            pl: 'Spellings',
            'default': 'Spelling'
          }
        },
        _1200_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 364,
          label: {
            sg: '[sg: 1200: histP9 undefined',
            pl: '[pl: 1200: histP9 undefined',
            'default': '[sg: 1200: histP9 undefined'
          }
        },
        _1201_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
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
        },
        _1112_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: true,
            ui_context_config: [
              {
                pk_entity: 138,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1112,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 129,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1112,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 213,
                fk_ui_context: 47,
                fk_project: null,
                fk_property: 1112,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
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
        }
      }
    },
    '441': {
      subclassOf: 'peIt',
      label: 'Built work',
      dfh_identifier_in_namespace: 'histC11',
      dfh_pk_class: 441,
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
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
        '46': {
          label: 'DataUnits Create',
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 142,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1184,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 146,
                fk_ui_context: 45,
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
            sg: 'Geolocalization (time related)',
            pl: 'Geolocalizations (time related)',
            'default': 'Geolocalizations (time related)'
          }
        },
        _1187_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 147,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 141,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1187,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
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
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 140,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1195,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 144,
                fk_ui_context: 45,
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
            sg: 'Name/Address',
            pl: 'Names/Addresses',
            'default': 'Names/Addresses'
          }
        },
        _1185_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 145,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1185,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 143,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1185,
                fk_property_set: null,
                property_is_outgoing: false,
                ord_num: null,
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
        _1190_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1190,
            dfh_identifier_in_namespace: 'histP17',
            dfh_has_domain: 441,
            dfh_has_range: 443,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 443,
          label: {
            sg: '[sg: 1190: histP17 undefined',
            pl: '[pl: 1190: histP17 undefined',
            'default': '[sg: 1190: histP17 undefined'
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
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1189,
              property_is_outgoing: true,
              roleSetKey: '_1189_outgoing',
              fk_property_set: null
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
              fk_property: null,
              property_is_outgoing: null,
              fk_property_set: 48,
              property_set: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When'
              },
              propSetKey: '_existenceTime'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1189,
              property_is_outgoing: true,
              roleSetKey: '_1189_outgoing',
              fk_property_set: null
            },
            {
              ord_num: 1,
              fk_property: 1188,
              property_is_outgoing: true,
              roleSetKey: '_1188_outgoing',
              fk_property_set: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: []
        }
      },
      roleSets: {
        _1188_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 148,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1188,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 151,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1188,
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
            sg: 'Member (Person)',
            pl: 'Members (Persons)',
            'default': 'Member (Person)'
          }
        },
        _1189_outgoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
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
            identity_defining: false,
            ui_context_config: [
              {
                pk_entity: 149,
                fk_ui_context: 46,
                fk_project: null,
                fk_property: 1189,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
              },
              {
                pk_entity: 150,
                fk_ui_context: 45,
                fk_project: null,
                fk_property: 1189,
                fk_property_set: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_property_set: null
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
      }
    },
    '443': {
      subclassOf: 'peIt',
      label: 'Built work type',
      dfh_identifier_in_namespace: 'histC13',
      dfh_pk_class: 443,
      uiContexts: {},
      roleSets: {
        _1190_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1190,
            dfh_identifier_in_namespace: 'histP17',
            dfh_has_domain: 441,
            dfh_has_range: 443,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1190: histP17 undefined',
            pl: '[inv.pl: 1190: histP17 undefined',
            'default': '[inv.pl: 1190: histP17 undefined'
          }
        },
        _1201_ingoing: {
          type: 'RoleSet',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            identity_defining: false,
            ui_context_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: 'Term/Label',
            pl: 'Terms/Labels',
            'default': 'Terms/Labels'
          }
        }
      }
    }
  },
  roleSets: {
    _1192_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 79,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 80,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 215,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 233,
            fk_ui_context: 229,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 85,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1188,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 4,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 234,
            fk_ui_context: 230,
            fk_project: null,
            fk_property: 1188,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
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
    _1196_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 191,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1196,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 7,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 78,
      label: {
        sg: 'Joining',
        pl: 'Joinings',
        'default': 'Joinings'
      }
    },
    _1180_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 86,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1180,
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
        sg: 'Localisation',
        pl: 'Localisations',
        'default': 'Localisations'
      }
    },
    _1198_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
    },
    _84_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 84,
        dfh_identifier_in_namespace: 'P96',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 83,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 5,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 218,
            fk_ui_context: 47,
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
    _88_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 88,
        dfh_identifier_in_namespace: 'P100',
        dfh_has_domain: 63,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 82,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 88,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 217,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 88,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
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
    _85_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 85,
        dfh_identifier_in_namespace: 'P97',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 84,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 6,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 219,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
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
    _140_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 140,
        dfh_identifier_in_namespace: 'P152',
        dfh_has_domain: 21,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 140: P152 undefined',
        pl: '[inv.pl: 140: P152 undefined',
        'default': '[inv.pl: 140: P152 undefined'
      }
    },
    _86_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 86,
        dfh_identifier_in_namespace: 'P98',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true,
        ui_context_config: [
          {
            pk_entity: 81,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 216,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
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
    _140_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 140,
        dfh_identifier_in_namespace: 'P152',
        dfh_has_domain: 21,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 21,
      label: {
        sg: '[sg: 140: P152 undefined',
        pl: '[pl: 140: P152 undefined',
        'default': '[pl: 140: P152 undefined'
      }
    },
    _4_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 4,
        dfh_identifier_in_namespace: 'P4',
        dfh_has_domain: 2,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 2,
      label: {
        sg: '[inv.sg: 4: P4 undefined',
        pl: '[inv.pl: 4: P4 undefined',
        'default': '[inv.sg: 4: P4 undefined'
      }
    },
    _75_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 75,
        dfh_identifier_in_namespace: 'P86',
        dfh_has_domain: 50,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 75: P86 undefined',
        pl: '[inv.pl: 75: P86 undefined',
        'default': '[inv.pl: 75: P86 undefined'
      }
    },
    _143_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 143,
        dfh_identifier_in_namespace: 'P160',
        dfh_has_domain: 83,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 83,
      label: {
        sg: '[inv.sg: 143: P160 undefined',
        pl: '[inv.pl: 143: P160 undefined',
        'default': '[inv.pl: 143: P160 undefined'
      }
    },
    _145_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 145,
        dfh_identifier_in_namespace: 'P164',
        dfh_has_domain: 84,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 84,
      label: {
        sg: '[inv.sg: 145: P164 undefined',
        pl: '[inv.pl: 145: P164 undefined',
        'default': '[inv.pl: 145: P164 undefined'
      }
    },
    _1008_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1008,
        dfh_identifier_in_namespace: 'R34',
        dfh_has_domain: 250,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 250,
      label: {
        sg: '[inv.sg: 1008: R34 undefined',
        pl: '[inv.pl: 1008: R34 undefined',
        'default': '[inv.pl: 1008: R34 undefined'
      }
    },
    _1059_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1059,
        dfh_identifier_in_namespace: 'Q13',
        dfh_has_domain: 352,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 352,
      label: {
        sg: '[inv.sg: 1059: Q13 undefined',
        pl: '[inv.pl: 1059: Q13 undefined',
        'default': '[inv.pl: 1059: Q13 undefined'
      }
    },
    _68_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 68,
        dfh_identifier_in_namespace: 'P78',
        dfh_has_domain: 50,
        dfh_has_range: 47,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 47,
      label: {
        sg: '[sg: 68: P78 undefined',
        pl: '[pl: 68: P78 undefined',
        'default': '[pl: 68: P78 undefined'
      }
    },
    _69_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 69,
        dfh_identifier_in_namespace: 'P79',
        dfh_has_domain: 50,
        dfh_has_range: 339,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 339,
      label: {
        sg: '[sg: 69: P79 undefined',
        pl: '[pl: 69: P79 undefined',
        'default': '[pl: 69: P79 undefined'
      }
    },
    _70_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 70,
        dfh_identifier_in_namespace: 'P80',
        dfh_has_domain: 50,
        dfh_has_range: 339,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 339,
      label: {
        sg: '[sg: 70: P80 undefined',
        pl: '[pl: 70: P80 undefined',
        'default': '[pl: 70: P80 undefined'
      }
    },
    _71_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 71,
        dfh_identifier_in_namespace: 'P81',
        dfh_has_domain: 50,
        dfh_has_range: 335,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 335,
      label: {
        sg: '[sg: 71: P81 undefined',
        pl: 'Ongoing throughout',
        'default': 'Ongoing throughout'
      }
    },
    _72_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 72,
        dfh_identifier_in_namespace: 'P82',
        dfh_has_domain: 50,
        dfh_has_range: 335,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 335,
      label: {
        sg: '[sg: 72: P82 undefined',
        pl: 'At some time within',
        'default': 'At some time within'
      }
    },
    _73_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 73,
        dfh_identifier_in_namespace: 'P83',
        dfh_has_domain: 50,
        dfh_has_range: 52,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 52,
      label: {
        sg: '[sg: 73: P83 undefined',
        pl: '[pl: 73: P83 undefined',
        'default': '[pl: 73: P83 undefined'
      }
    },
    _74_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 74,
        dfh_identifier_in_namespace: 'P84',
        dfh_has_domain: 50,
        dfh_has_range: 52,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 52,
      label: {
        sg: '[sg: 74: P84 undefined',
        pl: '[pl: 74: P84 undefined',
        'default': '[pl: 74: P84 undefined'
      }
    },
    _75_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 75,
        dfh_identifier_in_namespace: 'P86',
        dfh_has_domain: 50,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[sg: 75: P86 undefined',
        pl: '[pl: 75: P86 undefined',
        'default': '[pl: 75: P86 undefined'
      }
    },
    _150_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
    },
    _152_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 152,
        dfh_identifier_in_namespace: 'P82a',
        dfh_has_domain: 50,
        dfh_has_range: 335,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 335,
      label: {
        sg: '[sg: 152: P82a undefined',
        pl: 'Begin of begin',
        'default': 'Begin of begin'
      }
    },
    _153_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 153,
        dfh_identifier_in_namespace: 'P82b',
        dfh_has_domain: 50,
        dfh_has_range: 335,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 335,
      label: {
        sg: '[sg: 153: P82b undefined',
        pl: 'End of end',
        'default': 'End of end'
      }
    },
    _83_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 83,
        dfh_identifier_in_namespace: 'P95',
        dfh_has_domain: 60,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 87,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 83,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 89,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 83,
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
        sg: 'Formed Group (Organization)',
        pl: 'Formed Groups (Organizations)',
        'default': 'Formed Group (Organization)'
      }
    },
    _139_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 139,
        dfh_identifier_in_namespace: 'P151',
        dfh_has_domain: 60,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 88,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 139,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 90,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 139,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
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
    _1043_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1043,
        dfh_identifier_in_namespace: 'histP5',
        dfh_has_domain: 340,
        dfh_has_range: 61,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 340,
      label: {
        sg: '[inv.sg: 1043: histP5 undefined',
        pl: '[inv.pl: 1043: histP5 undefined',
        'default': '[inv.pl: 1043: histP5 undefined'
      }
    },
    _1186_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 76,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1186,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 4,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 221,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1186,
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
        sg: 'Place of birth',
        pl: 'Places of birth',
        'default': 'Place of birth'
      }
    },
    _1187_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 77,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 5,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 224,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
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
    _84_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 84,
        dfh_identifier_in_namespace: 'P96',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 73,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 222,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 84,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 4,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 85,
        dfh_identifier_in_namespace: 'P97',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 75,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 85,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 3,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 223,
            fk_ui_context: 47,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 86,
        dfh_identifier_in_namespace: 'P98',
        dfh_has_domain: 61,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true,
        ui_context_config: [
          {
            pk_entity: 74,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 78,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 220,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 86,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
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
    _1044_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1044,
        dfh_identifier_in_namespace: 'histP6',
        dfh_has_domain: 340,
        dfh_has_range: 63,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 226,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1044,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 340,
      label: {
        sg: '[inv.sg: 1044: histP6 undefined',
        pl: '[inv.pl: 1044: histP6 undefined',
        'default': '[inv.pl: 1044: histP6 undefined'
      }
    },
    _1191_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 92,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1191,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 225,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1191,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 363,
      label: {
        sg: 'Place of death',
        pl: 'Places of death',
        'default': 'Place of death'
      }
    },
    _88_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 88,
        dfh_identifier_in_namespace: 'P100',
        dfh_has_domain: 63,
        dfh_has_range: 21,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 91,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 88,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 227,
            fk_ui_context: 47,
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
    _1189_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 98,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 101,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1197,
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
        sg: '[inv.sg: 1197: P143 undefined',
        pl: '[inv.pl: 1197: P143 undefined',
        'default': '[inv.pl: 1197: P143 undefined'
      }
    },
    _1193_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 93,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 100,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 102,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 103,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1199,
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
        sg: '[inv.sg: 1199: P143 undefined',
        pl: '[inv.pl: 1199: P143 undefined',
        'default': '[inv.pl: 1199: P143 undefined'
      }
    },
    _83_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 83,
        dfh_identifier_in_namespace: 'P95',
        dfh_has_domain: 60,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 94,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 87,
        dfh_identifier_in_namespace: 'P99',
        dfh_has_domain: 62,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 96,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 132,
        dfh_identifier_in_namespace: 'P144',
        dfh_has_domain: 78,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 97,
            fk_ui_context: 45,
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
        pl: 'Joinings',
        'default': 'Joinings'
      }
    },
    _134_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 134,
        dfh_identifier_in_namespace: 'P146',
        dfh_has_domain: 79,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 99,
            fk_ui_context: 45,
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
    _139_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 139,
        dfh_identifier_in_namespace: 'P151',
        dfh_has_domain: 60,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 95,
            fk_ui_context: 45,
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
    _1013_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1013,
        dfh_identifier_in_namespace: 'R39',
        dfh_has_domain: 251,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 251,
      label: {
        sg: '[inv.sg: 1013: R39 undefined',
        pl: '[inv.pl: 1013: R39 undefined',
        'default': '[inv.pl: 1013: R39 undefined'
      }
    },
    _1035_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1035,
        dfh_identifier_in_namespace: 'R62',
        dfh_has_domain: 262,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 262,
      label: {
        sg: '[inv.sg: 1035: R62 undefined',
        pl: '[inv.pl: 1035: R62 undefined',
        'default': '[inv.pl: 1035: R62 undefined'
      }
    },
    _95_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 95,
        dfh_identifier_in_namespace: 'P107',
        dfh_has_domain: 68,
        dfh_has_range: 38,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 38,
      label: {
        sg: '[sg: 95: P107 undefined',
        pl: '[pl: 95: P107 undefined',
        'default': '[pl: 95: P107 undefined'
      }
    },
    _119_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 119,
        dfh_identifier_in_namespace: 'P131',
        dfh_has_domain: 38,
        dfh_has_range: 75,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 38,
      label: {
        sg: '[inv.sg: 119: P131 undefined',
        pl: '[inv.pl: 119: P131 undefined',
        'default': '[inv.pl: 119: P131 undefined'
      }
    },
    _1196_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 188,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1196,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 190,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1196,
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
        sg: 'Person',
        pl: 'Persons',
        'default': 'Person'
      }
    },
    _1197_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
    _131_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 131,
        dfh_identifier_in_namespace: 'P143',
        dfh_has_domain: 78,
        dfh_has_range: 38,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 38,
      label: {
        sg: '[sg: 131: P143 undefined',
        pl: '[pl: 131: P143 undefined',
        'default': '[sg: 131: P143 undefined'
      }
    },
    _132_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 132,
        dfh_identifier_in_namespace: 'P144',
        dfh_has_domain: 78,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 187,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 132,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 189,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 132,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 68,
      label: {
        sg: 'Joined Group',
        pl: 'Joined Groups',
        'default': 'Joined Group'
      }
    },
    _1198_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
    _133_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 133,
        dfh_identifier_in_namespace: 'P145',
        dfh_has_domain: 79,
        dfh_has_range: 38,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 38,
      label: {
        sg: '[sg: 133: P145 undefined',
        pl: '[pl: 133: P145 undefined',
        'default': '[sg: 133: P145 undefined'
      }
    },
    _134_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 134,
        dfh_identifier_in_namespace: 'P146',
        dfh_has_domain: 79,
        dfh_has_range: 68,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 104,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 134,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 105,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 134,
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
        sg: 'Was left',
        pl: 'Was left',
        'default': 'Was left'
      }
    },
    _1181_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 108,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1181,
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
        sg: 'Place',
        pl: 'Places',
        'default': 'Place'
      }
    },
    _1184_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 107,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1184,
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
        sg: 'Place',
        pl: 'Places',
        'default': 'Place'
      }
    },
    _145_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 145,
        dfh_identifier_in_namespace: 'P164',
        dfh_has_domain: 84,
        dfh_has_range: 50,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[sg: 145: P164 undefined',
        pl: '[pl: 145: P164 undefined',
        'default': '[pl: 145: P164 undefined'
      }
    },
    _148_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 148,
        dfh_identifier_in_namespace: 'P167',
        dfh_has_domain: 84,
        dfh_has_range: 51,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 1,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 106,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 148,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 109,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 148,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          }
        ]
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
    _1178_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 119,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1178,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 114,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1178,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 363,
      label: {
        sg: 'Place ',
        pl: 'Place',
        'default': 'Place '
      }
    },
    _1180_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 115,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1180,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 120,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1180,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 2,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: 'Person',
        pl: 'Persons',
        'default': 'Person'
      }
    },
    _1182_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 118,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1182,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 4,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 121,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1182,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 4,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 117,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1183,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
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
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 116,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1185,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 3,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 122,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1185,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 3,
            fk_class_for_property_set: null
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
    },
    _1066_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1066,
        dfh_identifier_in_namespace: 'histP7',
        dfh_has_domain: 212,
        dfh_has_range: 53,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 53,
      label: {
        sg: '[sg: 1066: histP7 undefined',
        pl: '[pl: 1066: histP7 undefined',
        'default': '[sg: 1066: histP7 undefined'
      }
    },
    _982_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 982,
        dfh_identifier_in_namespace: 'R7',
        dfh_has_domain: 221,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 159,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 982,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 221,
      label: {
        sg: '[inv.sg: 982: R7 undefined',
        pl: '[inv.pl: 982: R7 undefined',
        'default': '[inv.pl: 982: R7 undefined'
      }
    },
    _971_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 971,
        dfh_identifier_in_namespace: 'CLP46_should_be_composed_of',
        dfh_has_domain: 219,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 160,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 971,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 971: CLP46_should_be_composed_of undefined',
        pl: '[inv.pl: 971: CLP46_should_be_composed_of undefined',
        'default': '[inv.pl: 971: CLP46_should_be_composed_of undefined'
      }
    },
    _979_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 979,
        dfh_identifier_in_namespace: 'R4',
        dfh_has_domain: 218,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 161,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 979,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 218,
      label: {
        sg: '[inv.sg: 979: R4 undefined',
        pl: '[inv.pl: 979: R4 undefined',
        'default': '[inv.pl: 979: R4 undefined'
      }
    },
    _1000_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1000,
        dfh_identifier_in_namespace: 'R26',
        dfh_has_domain: 248,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 162,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1000,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 248,
      label: {
        sg: '[inv.sg: 1000: R26 undefined',
        pl: '[inv.pl: 1000: R26 undefined',
        'default': '[inv.pl: 1000: R26 undefined'
      }
    },
    _1015_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1015,
        dfh_identifier_in_namespace: 'R41',
        dfh_has_domain: 218,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 163,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1015,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 218,
      label: {
        sg: '[inv.sg: 1015: R41 undefined',
        pl: '[inv.pl: 1015: R41 undefined',
        'default': '[inv.pl: 1015: R41 undefined'
      }
    },
    _1022_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1022,
        dfh_identifier_in_namespace: 'R49',
        dfh_has_domain: 256,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 164,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1022,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 256,
      label: {
        sg: '[inv.sg: 1022: R49 undefined',
        pl: '[inv.pl: 1022: R49 undefined',
        'default': '[inv.pl: 1022: R49 undefined'
      }
    },
    _1202_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 156,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1202,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 157,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1202,
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
        sg: 'Bibliographic Reference',
        pl: 'Bibliographic References',
        'default': 'Bibliographic References'
      }
    },
    _970_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 970,
        dfh_identifier_in_namespace: 'CLP45_should_consist_of',
        dfh_has_domain: 219,
        dfh_has_range: 55,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 166,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 970,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 55,
      label: {
        sg: '[sg: 970: CLP45_should_consist_of undefined',
        pl: '[pl: 970: CLP45_should_consist_of undefined',
        'default': '[pl: 970: CLP45_should_consist_of undefined'
      }
    },
    _971_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 971,
        dfh_identifier_in_namespace: 'CLP46_should_be_composed_of',
        dfh_has_domain: 219,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 168,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 971,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[sg: 971: CLP46_should_be_composed_of undefined',
        pl: '[pl: 971: CLP46_should_be_composed_of undefined',
        'default': '[pl: 971: CLP46_should_be_composed_of undefined'
      }
    },
    _972_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 972,
        dfh_identifier_in_namespace: 'CLP57_should_have_number_of_parts',
        dfh_has_domain: 219,
        dfh_has_range: null,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 169,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 972,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: null,
      label: {
        sg: '[sg: 972: CLP57_should_have_number_of_parts undefined',
        pl: '[pl: 972: CLP57_should_have_number_of_parts undefined',
        'default': '[pl: 972: CLP57_should_have_number_of_parts undefined'
      }
    },
    _975_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 975,
        dfh_identifier_in_namespace: 'CLR6_should_carry',
        dfh_has_domain: 219,
        dfh_has_range: 240,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 172,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 975,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 240,
      label: {
        sg: '[sg: 975: CLR6_should_carry undefined',
        pl: '[pl: 975: CLR6_should_carry undefined',
        'default': '[pl: 975: CLR6_should_carry undefined'
      }
    },
    _969_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 969,
        dfh_identifier_in_namespace: 'CLP43_should_have_dimension',
        dfh_has_domain: 219,
        dfh_has_range: 52,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 167,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 969,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 52,
      label: {
        sg: '[sg: 969: CLP43_should_have_dimension undefined',
        pl: '[pl: 969: CLP43_should_have_dimension undefined',
        'default': '[pl: 969: CLP43_should_have_dimension undefined'
      }
    },
    _974_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 974,
        dfh_identifier_in_namespace: 'CLP105_right_held_by',
        dfh_has_domain: 219,
        dfh_has_range: 38,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 171,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 974,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 38,
      label: {
        sg: '[sg: 974: CLP105_right_held_by undefined',
        pl: '[pl: 974: CLP105_right_held_by undefined',
        'default': '[pl: 974: CLP105_right_held_by undefined'
      }
    },
    _973_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 973,
        dfh_identifier_in_namespace: 'CLP104_subject_to',
        dfh_has_domain: 219,
        dfh_has_range: 29,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 170,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 973,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 29,
      label: {
        sg: '[sg: 973: CLP104_subject_to undefined',
        pl: '[pl: 973: CLP104_subject_to undefined',
        'default': '[pl: 973: CLP104_subject_to undefined'
      }
    },
    _968_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 968,
        dfh_identifier_in_namespace: 'CLP2_should_have_type',
        dfh_has_domain: 219,
        dfh_has_range: 53,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 165,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 968,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 53,
      label: {
        sg: '[sg: 968: CLP2_should_have_type undefined',
        pl: '[pl: 968: CLP2_should_have_type undefined',
        'default': '[pl: 968: CLP2_should_have_type undefined'
      }
    },
    _982_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 982,
        dfh_identifier_in_namespace: 'R7',
        dfh_has_domain: 221,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[sg: 982: R7 undefined',
        pl: '[pl: 982: R7 undefined',
        'default': '[pl: 982: R7 undefined'
      }
    },
    _1181_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 152,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1181,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 211,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1181,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 84,
      label: {
        sg: 'Geolocalization (time related)',
        pl: 'Geolocalizations (time related)',
        'default': 'Geolocalizations (time related)'
      }
    },
    _1186_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 125,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1186,
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
        sg: 'Birth that happened here',
        pl: 'Births that happened here',
        'default': 'Births that happened here'
      }
    },
    _1194_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 123,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 124,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 210,
            fk_ui_context: 47,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 126,
            fk_ui_context: 45,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 127,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1178,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Entities located here',
        pl: 'Entities located here',
        'default': 'Entities located here'
      }
    },
    _1110_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1110,
        dfh_identifier_in_namespace: 'histP8',
        dfh_has_domain: 363,
        dfh_has_range: 364,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 214,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1110,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 228,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1110,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 364,
      label: {
        sg: 'has Type',
        pl: 'has Types',
        'default': 'has Type'
      }
    },
    _1200_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 185,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1200,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 186,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1200,
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
        sg: 'Term/Label',
        pl: 'Terms/Labels',
        'default': 'Terms/Labels'
      }
    },
    _1110_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1110,
        dfh_identifier_in_namespace: 'histP8',
        dfh_has_domain: 363,
        dfh_has_range: 364,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: 'is Type of',
        pl: 'is Type of',
        'default': 'is Type of'
      }
    },
    _1111_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1111,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 1,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 1,
      label: {
        sg: '[sg: 1111: histP9 undefined',
        pl: '[pl: 1111: histP9 undefined',
        'default': '[pl: 1111: histP9 undefined'
      }
    },
    _1192_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 130,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1192,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 135,
            fk_ui_context: 45,
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
        sg: 'Person with this Name',
        pl: 'Persons with this Name',
        'default': 'Person with this Name'
      }
    },
    _1193_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 133,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1193,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 136,
            fk_ui_context: 45,
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
        sg: 'Group with this Name',
        pl: 'Groups with this Name',
        'default': 'Group with this Name'
      }
    },
    _1194_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 131,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1194,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 137,
            fk_ui_context: 45,
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
        sg: 'Geo-Place with this Name',
        pl: 'Geo-Places with this Name',
        'default': 'Geo-Place with this Name'
      }
    },
    _1195_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 132,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 139,
            fk_ui_context: 45,
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
        sg: 'Built Work with this Name',
        pl: 'Built Works with this Name',
        'default': 'Built Work with this Name'
      }
    },
    _1113_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: true,
        ui_context_config: [
          {
            pk_entity: 128,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1113,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 134,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1113,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 212,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1113,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          }
        ]
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 40,
      label: {
        sg: 'Spelling',
        pl: 'Spellings',
        'default': 'Spelling'
      }
    },
    _1200_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 364,
      label: {
        sg: '[sg: 1200: histP9 undefined',
        pl: '[pl: 1200: histP9 undefined',
        'default': '[sg: 1200: histP9 undefined'
      }
    },
    _1201_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
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
    },
    _1112_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: true,
        ui_context_config: [
          {
            pk_entity: 138,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1112,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 129,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1112,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 213,
            fk_ui_context: 47,
            fk_project: null,
            fk_property: 1112,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
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
    _1184_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 142,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1184,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 146,
            fk_ui_context: 45,
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
        sg: 'Geolocalization (time related)',
        pl: 'Geolocalizations (time related)',
        'default': 'Geolocalizations (time related)'
      }
    },
    _1187_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 147,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 3,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 141,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1187,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
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
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 140,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1195,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 144,
            fk_ui_context: 45,
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
        sg: 'Name/Address',
        pl: 'Names/Addresses',
        'default': 'Names/Addresses'
      }
    },
    _1185_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 145,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1185,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: 2,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 143,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1185,
            fk_property_set: null,
            property_is_outgoing: false,
            ord_num: null,
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
    _1190_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1190,
        dfh_identifier_in_namespace: 'histP17',
        dfh_has_domain: 441,
        dfh_has_range: 443,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 443,
      label: {
        sg: '[sg: 1190: histP17 undefined',
        pl: '[pl: 1190: histP17 undefined',
        'default': '[sg: 1190: histP17 undefined'
      }
    },
    _1188_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 148,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1188,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 1,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 151,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1188,
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
        sg: 'Member (Person)',
        pl: 'Members (Persons)',
        'default': 'Member (Person)'
      }
    },
    _1189_outgoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
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
        identity_defining: false,
        ui_context_config: [
          {
            pk_entity: 149,
            fk_ui_context: 46,
            fk_project: null,
            fk_property: 1189,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
          },
          {
            pk_entity: 150,
            fk_ui_context: 45,
            fk_project: null,
            fk_property: 1189,
            fk_property_set: null,
            property_is_outgoing: true,
            ord_num: 0,
            fk_class_for_property_set: null
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
    },
    _1190_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1190,
        dfh_identifier_in_namespace: 'histP17',
        dfh_has_domain: 441,
        dfh_has_range: 443,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1190: histP17 undefined',
        pl: '[inv.pl: 1190: histP17 undefined',
        'default': '[inv.pl: 1190: histP17 undefined'
      }
    },
    _1201_ingoing: {
      type: 'RoleSet',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false,
        ui_context_config: []
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: 'Term/Label',
        pl: 'Terms/Labels',
        'default': 'Terms/Labels'
      }
    }
  }
}
