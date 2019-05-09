import { ProjectCrm } from './active-project.models';

export const crm: ProjectCrm = {
  classes: {
    '21': {
      pkEntity: 84,
      dfh_pk_class: 21,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile, geoVistory Technical Profile',
      profilePks: [
        4,
        5
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3148,
        fk_entity: 84,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Person',
      dfh_standard_label: 'Person',
      changingProjRel: false,
      scopeNote: 'This class comprises real persons who live or are assumed to have lived. Legendary figures that may have existed, such as Ulysses and\n            King Arthur, fall into this class if the documentation refers to them as historical figures. In cases where doubt exists as to whether\n            several persons are in fact identical, multiple instances can be created and linked to indicate their relationship. The CRM does not\n            propose a specific form to support reasoning about possible identity. ',
      dfh_identifier_in_namespace: 'E21',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1192,
              property_is_outgoing: false,
              propertyFieldKey: '_1192_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 86,
              property_is_outgoing: false,
              propertyFieldKey: '_86_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 88,
              property_is_outgoing: false,
              propertyFieldKey: '_88_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1180,
              property_is_outgoing: false,
              propertyFieldKey: '_1180_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1188,
              property_is_outgoing: false,
              propertyFieldKey: '_1188_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 84,
              property_is_outgoing: false,
              propertyFieldKey: '_84_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 6,
              fk_property: 85,
              property_is_outgoing: false,
              propertyFieldKey: '_85_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 7,
              fk_property: 1196,
              property_is_outgoing: false,
              propertyFieldKey: '_1196_ingoing',
              fk_class_field: null
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
              propertyFieldKey: '_1192_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1192,
              property_is_outgoing: false,
              propertyFieldKey: '_1192_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1188,
              property_is_outgoing: false,
              propertyFieldKey: '_1188_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1196,
              property_is_outgoing: false,
              propertyFieldKey: '_1196_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1180,
              property_is_outgoing: false,
              propertyFieldKey: '_1180_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 84,
              property_is_outgoing: false,
              propertyFieldKey: '_84_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 6,
              fk_property: 85,
              property_is_outgoing: false,
              propertyFieldKey: '_85_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 7,
              fk_property: 86,
              property_is_outgoing: false,
              propertyFieldKey: '_86_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 8,
              fk_property: 88,
              property_is_outgoing: false,
              propertyFieldKey: '_88_ingoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1188_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 85,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1188,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 222,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1188,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 191,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1196,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 7,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 224,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1196,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 78,
          label: {
            sg: 'Joined a group',
            pl: 'Joined a group',
            'default': 'Joined a group'
          }
        },
        _1180_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 86,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1180,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 225,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1180,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Localization relative to Place',
            pl: 'Localizations relative to Place',
            'default': 'Localizations relative to Place'
          }
        },
        _1198_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 226,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1198,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 79,
          label: {
            sg: 'Left Group',
            pl: 'Left Groups',
            'default': 'Left Groups'
          }
        },
        _1192_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 79,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 80,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 223,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
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
        _84_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 83,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 84,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 227,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 84,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_class_field: null
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
        _140_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 231,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 140,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
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
        _88_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 82,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 88,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 230,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 88,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 8,
                fk_class_for_class_field: null
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
        _86_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 81,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 86,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 229,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 86,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 7,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 84,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 85,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 228,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 85,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_class_field: null
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
        _140_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 232,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 140,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
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
        _1223_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1223,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 457,
          label: {
            sg: '[sg: 1223: geovP2 undefined',
            pl: '[pl: 1223: geovP2 undefined',
            'default': '[pl: 1223: geovP2 undefined'
          }
        },
        _1230_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1230,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 456,
          label: {
            sg: '[sg: 1230: geovP2 undefined',
            pl: '[pl: 1230: geovP2 undefined',
            'default': '[pl: 1230: geovP2 undefined'
          }
        },
        _1231_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1231,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 219,
          label: {
            sg: '[sg: 1231: geovP2 undefined',
            pl: '[pl: 1231: geovP2 undefined',
            'default': '[pl: 1231: geovP2 undefined'
          }
        },
        _1238_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1238,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1238: geovP2 undefined',
            pl: '[pl: 1238: geovP2 undefined',
            'default': '[pl: 1238: geovP2 undefined'
          }
        },
        _1239_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1239,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 220,
          label: {
            sg: '[sg: 1239: geovP2 undefined',
            pl: '[pl: 1239: geovP2 undefined',
            'default': '[pl: 1239: geovP2 undefined'
          }
        }
      }
    },
    '40': {
      pkEntity: 87,
      dfh_pk_class: 40,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      label: 'Appellation',
      dfh_standard_label: 'Appellation',
      changingProjRel: false,
      scopeNote: 'This class comprises signs, either meaningful or not, or arrangements of signs following a specific syntax, that are used or can be\n            used to refer to and identify a specific instance of some class or category within a certain context. Instances of E41 Appellation do not\n            identify things by their meaning, even if they happen to have one, but instead by convention, tradition, or agreement. Instances of E41\n            Appellation are cultural constructs; as such, they have a context, a history, and a use in time and space by some group of users. A given\n            instance of E41 Appellation can have alternative forms, i.e., other instances of E41 Appellation that are always regarded as equivalent\n            independent from the thing it denotes. Specific subclasses of E41 Appellation should be used when instances of E41 Appellation of a\n            characteristic form are used for particular objects. Instances of E49 Time Appellation, for example, which take the form of instances of\n            E50 Date, can be easily recognised. E41 Appellation should not be confused with the act of naming something. Cf. E15 Identifier Assignment ',
      dfh_identifier_in_namespace: 'E41',
      uiContexts: {},
      propertyFields: {
        _1037_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1037,
            dfh_identifier_in_namespace: 'R64',
            dfh_has_domain: 262,
            dfh_has_range: 40,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 262,
          label: {
            sg: '[inv.sg: 1037: R64 undefined',
            pl: '[inv.pl: 1037: R64 undefined',
            'default': '[inv.pl: 1037: R64 undefined'
          }
        },
        _1113_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: 'Names with this details',
            pl: 'Name with this details',
            'default': 'Names with this details'
          }
        }
      }
    },
    '50': {
      pkEntity: 217,
      dfh_pk_class: 50,
      profileLabels: 'geoVistory Technical Profile',
      profilePks: [
        5
      ],
      isInProject: false,
      projRel: {
        pk_entity: 3172,
        fk_entity: 217,
        fk_project: 9,
        is_in_project: false
      },
      label: 'Time-Span',
      dfh_standard_label: 'Time-Span',
      changingProjRel: false,
      scopeNote: 'This class comprises abstract temporal extents, in the sense of Galilean physics, having a beginning, an end and a duration. Time\n            Span has no other semantic connotations. Time-Spans are used to define the temporal extent of instances of E4 Period, E5 Event and any\n            other phenomena valid for a certain time. An E52 Time-Span may be identified by one or more instances of E49 Time Appellation. Since our\n            knowledge of history is imperfect, instances of E52 Time-Span can best be considered as approximations of the actual Time-Spans of\n            temporal entities. The properties of E52 Time-Span are intended to allow these approximations to be expressed precisely. An extreme case\n            of approximation, might, for example, define an E52 Time-Span having unknown beginning, end and duration. Used as a common E52 Time-Span\n            for two events, it would nevertheless define them as being simultaneous, even if nothing else was known. Automatic processing and querying\n            of instances of E52 Time-Span is facilitated if data can be parsed into an E61 Time Primitive. ',
      dfh_identifier_in_namespace: 'E52',
      uiContexts: {},
      propertyFields: {
        _4_ingoing: {
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
    '51': {
      pkEntity: 596,
      dfh_pk_class: 51,
      profileLabels: 'geoVistory Technical Profile',
      profilePks: [
        5
      ],
      isInProject: false,
      label: 'Place',
      dfh_standard_label: 'Place',
      changingProjRel: false,
      scopeNote: 'This class comprises extents in space, in particular on the surface of the earth, in the pure sense of physics: independent from\r\n            temporal phenomena and matter. The instances of E53 Place are usually determined by reference to the position of “immobile” objects such\r\n            as buildings, cities, mountains, rivers, or dedicated geodetic marks. A Place can be determined by combining a frame of reference and a\r\n            location with respect to this frame. It may be identified by one or more instances of E44 Place Appellation. It is sometimes argued that\r\n            instances of E53 Place are best identified by global coordinates or absolute reference systems. However, relative references are often\r\n            more relevant in the context of cultural documentation and tend to be more precise. In particular, we are often interested in position in\r\n            relation to large, mobile objects, such as ships. For example, the Place at which Nelson died is known with reference to a large mobile\r\n            object – H.M.S Victory. A resolution of this Place in terms of absolute coordinates would require knowledge of the movements of the vessel\r\n            and the precise time of death, either of which may be revised, and the result would lack historical and cultural relevance. Any object can\r\n            serve as a frame of reference for E53 Place determination. The model foresees the notion of a "section" of an E19 Physical Object as a\r\n            valid E53 Place determination.',
      dfh_identifier_in_namespace: 'E53',
      uiContexts: {},
      propertyFields: {
        _148_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 84,
          label: {
            sg: 'Are coordinates of precence',
            pl: 'Are coordinates of precences',
            'default': 'Are coordinates of precence'
          }
        }
      }
    },
    '54': {
      pkEntity: 89,
      dfh_pk_class: 54,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      label: 'Language',
      dfh_standard_label: 'Language',
      changingProjRel: false,
      scopeNote: 'This class is a specialization of E55 Type and comprises the natural languages in the sense of concepts. This type is used\n            categorically in the model without reference to instances of it, i.e. the Model does not foresee the description of instances of instances\n            of E56 Language, e.g.: “instances of Mandarin Chinese”. It is recommended that internationally or nationally agreed codes and terminology\n            are used to denote instances of E56 Language, such as those defined in ISO 639:1988. ',
      dfh_identifier_in_namespace: 'E56',
      uiContexts: {},
      propertyFields: {
        _63_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 63,
            dfh_identifier_in_namespace: 'P72',
            dfh_has_domain: 32,
            dfh_has_range: 54,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 32,
          label: {
            sg: '[inv.sg: 63: P72 undefined',
            pl: '[inv.pl: 63: P72 undefined',
            'default': '[inv.pl: 63: P72 undefined'
          }
        },
        _1027_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1027,
            dfh_identifier_in_namespace: 'R54',
            dfh_has_domain: 251,
            dfh_has_range: 54,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 251,
          label: {
            sg: '[inv.sg: 1027: R54 undefined',
            pl: '[inv.pl: 1027: R54 undefined',
            'default': '[inv.pl: 1027: R54 undefined'
          }
        },
        _1033_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1033,
            dfh_identifier_in_namespace: 'R60',
            dfh_has_domain: 261,
            dfh_has_range: 54,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 261,
          label: {
            sg: '[inv.sg: 1033: R60 undefined',
            pl: '[inv.pl: 1033: R60 undefined',
            'default': '[inv.pl: 1033: R60 undefined'
          }
        },
        _1112_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
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
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: 'Name with this language',
            pl: 'Names with this language',
            'default': 'Names with this language'
          }
        }
      }
    },
    '60': {
      pkEntity: 219,
      dfh_pk_class: 60,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      label: 'Formation',
      dfh_standard_label: 'Formation',
      changingProjRel: false,
      scopeNote: 'This class comprises events that result in the formation of a formal or informal E74 Group of people, such as a club, society,\n            association, corporation or nation. E66 Formation does not include the arbitrary aggregation of people who do not act as a collective. The\n            formation of an instance of E74 Group does not require that the group is populated with members at the time of formation. In order to\n            express the joining of members at the time of formation, the respective activity should be simultaneously an instance of both E66\n            Formation and E85 Joining. ',
      dfh_identifier_in_namespace: 'E66',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 83,
              property_is_outgoing: true,
              propertyFieldKey: '_83_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 139,
              property_is_outgoing: true,
              propertyFieldKey: '_139_outgoing',
              fk_class_field: null
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
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 83,
              property_is_outgoing: true,
              propertyFieldKey: '_83_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 139,
              property_is_outgoing: true,
              propertyFieldKey: '_139_outgoing',
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
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            }
          ]
        }
      },
      propertyFields: {
        _83_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 87,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 83,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 89,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 83,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 233,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 83,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 88,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 139,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 90,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 139,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 234,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 139,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
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
      pkEntity: 90,
      dfh_pk_class: 61,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3159,
        fk_entity: 90,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Birth',
      dfh_standard_label: 'Birth',
      changingProjRel: false,
      scopeNote: 'This class comprises the births of human beings. E67 Birth is a biological event focussing on the context of people coming into life.\n            (E63 Beginning of Existence comprises the coming into life of any living beings). Twins, triplets etc. are brought into life by the same\n            E67 Birth event. The introduction of the E67 Birth event as a documentation element allows the description of a range of family\n            relationships in a simple model. Suitable extensions may describe more details and the complexity of motherhood with the intervention of\n            modern medicine. In this model, the biological father is not seen as a necessary participant in the E67 Birth event. ',
      dfh_identifier_in_namespace: 'E67',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 86,
              property_is_outgoing: true,
              propertyFieldKey: '_86_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 2,
              fk_property: 84,
              property_is_outgoing: true,
              propertyFieldKey: '_84_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 85,
              property_is_outgoing: true,
              propertyFieldKey: '_85_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1186,
              property_is_outgoing: true,
              propertyFieldKey: '_1186_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 1187,
              property_is_outgoing: true,
              propertyFieldKey: '_1187_outgoing',
              fk_class_field: null
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
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 86,
              property_is_outgoing: true,
              propertyFieldKey: '_86_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1186,
              property_is_outgoing: true,
              propertyFieldKey: '_1186_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1187,
              property_is_outgoing: true,
              propertyFieldKey: '_1187_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 84,
              property_is_outgoing: true,
              propertyFieldKey: '_84_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 85,
              property_is_outgoing: true,
              propertyFieldKey: '_85_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 86,
              property_is_outgoing: true,
              propertyFieldKey: '_86_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1043_ingoing: {
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 76,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1186,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 235,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1186,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 77,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1187,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 5,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 236,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1187,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 73,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 84,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 237,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 84,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 78,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 86,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 74,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 86,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 239,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 86,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 5,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 75,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 85,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 238,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 85,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
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
        }
      }
    },
    '62': {
      pkEntity: 220,
      dfh_pk_class: 62,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      label: 'Dissolution',
      dfh_standard_label: 'Dissolution',
      changingProjRel: false,
      scopeNote: 'This class comprises the events that result in the formal or informal termination of an E74 Group of people. If the dissolution was\n            deliberate, the Dissolution event should also be instantiated as an E7 Activity. ',
      dfh_identifier_in_namespace: 'E68',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 87,
              property_is_outgoing: true,
              propertyFieldKey: '_87_outgoing',
              fk_class_field: null
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
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 87,
              property_is_outgoing: true,
              propertyFieldKey: '_87_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 87,
              property_is_outgoing: true,
              propertyFieldKey: '_87_outgoing',
              fk_class_field: null
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: []
        }
      },
      propertyFields: {
        _87_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
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
            class_field_config: [
              {
                pk_entity: 240,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 403,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 404,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 406,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: 'Dissolved Group (Organization)',
            pl: 'Dissolved Groups (Organizations)',
            'default': 'Dissolved Group (Organization)'
          }
        }
      }
    },
    '63': {
      pkEntity: 91,
      dfh_pk_class: 63,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3149,
        fk_entity: 91,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Death',
      dfh_standard_label: 'Death',
      changingProjRel: false,
      scopeNote: 'This class comprises the deaths of human beings. If a person is killed, their death should be instantiated as E69 Death and as E7\n            Activity. The death or perishing of other living beings should be documented using E64 End of Existence. ',
      dfh_identifier_in_namespace: 'E69',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 88,
              property_is_outgoing: true,
              propertyFieldKey: '_88_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 2,
              fk_property: 1191,
              property_is_outgoing: true,
              propertyFieldKey: '_1191_outgoing',
              fk_class_field: null
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
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 88,
              property_is_outgoing: true,
              propertyFieldKey: '_88_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1191,
              property_is_outgoing: true,
              propertyFieldKey: '_1191_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 88,
              property_is_outgoing: true,
              propertyFieldKey: '_88_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1044_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 214,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1044,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 92,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1191,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 216,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1191,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 241,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1191,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 91,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 88,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 215,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 88,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 242,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 88,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
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
      pkEntity: 92,
      dfh_pk_class: 68,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3130,
        fk_entity: 92,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Group',
      dfh_standard_label: 'Group',
      changingProjRel: false,
      scopeNote: 'This class comprises any gatherings or organizations of E39 Actors that act collectively or in a similar way due to any form of\n            unifying relationship. In the wider sense this class also comprises official positions which used to be regarded in certain contexts as\n            one actor, independent of the current holder of the office, such as the president of a country. In such cases, it may happen that the\n            Group never had more than one member. A joint pseudonym (i.e., a name that seems indicative of an individual but that is actually used as\n            a persona by two or more people) is a particular case of E74 Group. A gathering of people becomes an E74 Group when it exhibits\n            organizational characteristics usually typified by a set of ideas or beliefs held in common, or actions performed together. These might be\n            communication, creating some common artifact, a common purpose such as study, worship, business, sports, etc. Nationality can be modeled\n            as membership in an E74 Group (cf. HumanML markup). Married couples and other concepts of family are regarded as particular examples of\n            E74 Group. ',
      dfh_identifier_in_namespace: 'E74',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1193,
              property_is_outgoing: false,
              propertyFieldKey: '_1193_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 83,
              property_is_outgoing: false,
              propertyFieldKey: '_83_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 87,
              property_is_outgoing: false,
              propertyFieldKey: '_87_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1182,
              property_is_outgoing: false,
              propertyFieldKey: '_1182_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1189,
              property_is_outgoing: false,
              propertyFieldKey: '_1189_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 132,
              property_is_outgoing: false,
              propertyFieldKey: '_132_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 6,
              fk_property: 134,
              property_is_outgoing: false,
              propertyFieldKey: '_134_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 7,
              fk_property: 139,
              property_is_outgoing: false,
              propertyFieldKey: '_139_ingoing',
              fk_class_field: null
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
              propertyFieldKey: '_1193_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1193,
              property_is_outgoing: false,
              propertyFieldKey: '_1193_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1182,
              property_is_outgoing: false,
              propertyFieldKey: '_1182_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 83,
              property_is_outgoing: false,
              propertyFieldKey: '_83_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 87,
              property_is_outgoing: false,
              propertyFieldKey: '_87_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 139,
              property_is_outgoing: false,
              propertyFieldKey: '_139_ingoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1189_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 98,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1189,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 101,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1197,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 78,
          label: {
            sg: 'Joined a group',
            pl: 'Joined a group',
            'default': 'Joined a group'
          }
        },
        _1182_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 102,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1182,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 408,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1182,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Localization relative to Place',
            pl: 'Localizations relative to Place',
            'default': 'Localizations relative to Place'
          }
        },
        _1199_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 103,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1199,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 79,
          label: {
            sg: 'Left Group',
            pl: 'Left Groups',
            'default': 'Left Groups'
          }
        },
        _1193_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 93,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 100,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 407,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        _83_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 94,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 83,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 409,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 83,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 96,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 410,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 87,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 97,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 132,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 5,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 99,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 134,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 6,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 95,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 139,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 7,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 411,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 139,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: []
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
        _1204_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1204,
            dfh_identifier_in_namespace: 'histP19',
            dfh_has_domain: 68,
            dfh_has_range: 451,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 451,
          label: {
            sg: 'Type',
            pl: 'Types',
            'default': 'Types'
          }
        },
        _1224_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1224,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 457,
          label: {
            sg: '[sg: 1224: geovP2 undefined',
            pl: '[pl: 1224: geovP2 undefined',
            'default': '[pl: 1224: geovP2 undefined'
          }
        },
        _1229_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1229,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 456,
          label: {
            sg: '[sg: 1229: geovP2 undefined',
            pl: '[pl: 1229: geovP2 undefined',
            'default': '[pl: 1229: geovP2 undefined'
          }
        },
        _1232_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1232,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 219,
          label: {
            sg: '[sg: 1232: geovP2 undefined',
            pl: '[pl: 1232: geovP2 undefined',
            'default': '[pl: 1232: geovP2 undefined'
          }
        },
        _1237_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1237,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1237: geovP2 undefined',
            pl: '[pl: 1237: geovP2 undefined',
            'default': '[pl: 1237: geovP2 undefined'
          }
        },
        _1240_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1240,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 220,
          label: {
            sg: '[sg: 1240: geovP2 undefined',
            pl: '[pl: 1240: geovP2 undefined',
            'default': '[pl: 1240: geovP2 undefined'
          }
        }
      }
    },
    '78': {
      pkEntity: 221,
      dfh_pk_class: 78,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3167,
        fk_entity: 221,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Joining',
      dfh_standard_label: 'Joining',
      changingProjRel: false,
      scopeNote: 'This class comprises the activities that result in an instance of E39 Actor becoming a member of an instance of E74 Group. This class\n            does not imply initiative by either party. It may be the initiative of a third party. Typical scenarios include becoming a member of a\n            social organisation, becoming employee of a company, marriage, the adoption of a child by a family and the inauguration of somebody into\n            an official position. ',
      dfh_identifier_in_namespace: 'E85',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 132,
              property_is_outgoing: true,
              propertyFieldKey: '_132_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1196,
              property_is_outgoing: true,
              propertyFieldKey: '_1196_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1197,
              property_is_outgoing: true,
              propertyFieldKey: '_1197_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
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
              propertyFieldKey: '_132_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1196,
              property_is_outgoing: true,
              propertyFieldKey: '_1196_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1197,
              property_is_outgoing: true,
              propertyFieldKey: '_1197_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1196,
              property_is_outgoing: true,
              propertyFieldKey: '_1196_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1197,
              property_is_outgoing: true,
              propertyFieldKey: '_1197_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 132,
              property_is_outgoing: true,
              propertyFieldKey: '_132_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1196_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 188,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1196,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 190,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1196,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 412,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1196,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 21,
          label: {
            sg: 'Person that becomes member',
            pl: 'Persons that become member',
            'default': 'Person that becomes member'
          }
        },
        _1197_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 414,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1197,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 416,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1197,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 417,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1197,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 68,
          label: {
            sg: 'Group that becomes member',
            pl: 'Groups that become member',
            'default': 'Group that becomes member'
          }
        },
        _131_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 415,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 131,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 187,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 132,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 189,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 132,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 413,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 132,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
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
      pkEntity: 222,
      dfh_pk_class: 79,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3168,
        fk_entity: 222,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Leaving',
      dfh_standard_label: 'Leaving',
      changingProjRel: false,
      scopeNote: 'This class comprises the activities that result in an instance of E39 Actor to be disassociated from an instance of E74 Group. This\n            class does not imply initiative by either party. It may be the initiative of a third party. Typical scenarios include the termination of\n            membership in a social organisation, ending the employment at a company, divorce, and the end of tenure of somebody in an official\n            position.',
      dfh_identifier_in_namespace: 'E86',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 134,
              property_is_outgoing: true,
              propertyFieldKey: '_134_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1198,
              property_is_outgoing: true,
              propertyFieldKey: '_1198_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1199,
              property_is_outgoing: true,
              propertyFieldKey: '_1199_outgoing',
              fk_class_field: null
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
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 134,
              property_is_outgoing: true,
              propertyFieldKey: '_134_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1199,
              property_is_outgoing: true,
              propertyFieldKey: '_1199_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1198,
              property_is_outgoing: true,
              propertyFieldKey: '_1198_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 134,
              property_is_outgoing: true,
              propertyFieldKey: '_134_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1198,
              property_is_outgoing: true,
              propertyFieldKey: '_1198_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1199,
              property_is_outgoing: true,
              propertyFieldKey: '_1199_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1198_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 419,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1198,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 421,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1198,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 424,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1198,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 21,
          label: {
            sg: 'Person that left the Group',
            pl: 'Persons that left the Group',
            'default': 'Person that left the Group'
          }
        },
        _1199_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 420,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1199,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 422,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1199,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 423,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1199,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 68,
          label: {
            sg: 'Group that left the Group',
            pl: 'Groups that left the Group',
            'default': 'Group that left the Group'
          }
        },
        _133_outgoing: {
          type: 'PropertyField',
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
            class_field_config: []
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 104,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 134,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 105,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 134,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 418,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 134,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 68,
          label: {
            sg: 'Left Group',
            pl: 'Left Groups',
            'default': 'Left Group'
          }
        }
      }
    },
    '84': {
      pkEntity: 224,
      dfh_pk_class: 84,
      profileLabels: 'geoVistory Technical Profile',
      profilePks: [
        5
      ],
      isInProject: false,
      label: 'Georeference',
      dfh_standard_label: 'Presence',
      changingProjRel: false,
      scopeNote: 'This class comprises instances of E92 Spacetime Volume that result from intersection of instances of E92 Spacetime Volume with an\n            instance of E52 Time-Span. The identity of an instance of this class is determined by the identities of the constituing spacetime volume\n            and the time-span. This class can be used to define temporal snapshots at a particular time-span, such as the extent of the Roman Empire\n            at 33 B.C., or the extent occupied by a museum object at rest in an exhibit. In particular, it can be used to define the spatial\n            projection of a spacetime volume during a particular time-span, such as the maximal spatial extent of a flood at some particular hour, or\n            all areas covered by the Poland within the 20th century AD. ',
      dfh_identifier_in_namespace: 'E93',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 148,
              property_is_outgoing: true,
              propertyFieldKey: '_148_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
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
              propertyFieldKey: '_148_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 148,
              property_is_outgoing: true,
              propertyFieldKey: '_148_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1181_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 108,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1181,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 425,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1181,
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
            sg: 'Georeference of Geographical Place',
            pl: 'Georeferences of Geographical Place',
            'default': 'Georeference of Geographical Place'
          }
        },
        _1184_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 107,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1184,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 426,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1184,
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
            sg: 'Georeference of Built work',
            pl: 'Georeferencees of Built work',
            'default': 'Georeference of Built work'
          }
        },
        _145_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 427,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 145,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 106,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 148,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 109,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 148,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 428,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 148,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 51,
          label: {
            sg: 'Geo-Coordinates',
            pl: 'Geo-Coordinates',
            'default': 'Geo-Coordinates'
          }
        }
      }
    },
    '212': {
      pkEntity: 597,
      dfh_pk_class: 212,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3164,
        fk_entity: 597,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Localization',
      dfh_standard_label: 'Geographical localisation',
      changingProjRel: false,
      scopeNote: '<ul>\r\n<li>Galileo Galilei beeing in Rome in February 1616</li>\r\n</ul>',
      dfh_identifier_in_namespace: 'histC2',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1178,
              property_is_outgoing: true,
              propertyFieldKey: '_1178_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 2,
              fk_property: 1180,
              property_is_outgoing: true,
              propertyFieldKey: '_1180_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1185,
              property_is_outgoing: true,
              propertyFieldKey: '_1185_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1182,
              property_is_outgoing: true,
              propertyFieldKey: '_1182_outgoing',
              fk_class_field: null
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
              propertyFieldKey: '_1178_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 2,
              fk_property: 1180,
              property_is_outgoing: true,
              propertyFieldKey: '_1180_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1185,
              property_is_outgoing: true,
              propertyFieldKey: '_1185_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1182,
              property_is_outgoing: true,
              propertyFieldKey: '_1182_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1180,
              property_is_outgoing: true,
              propertyFieldKey: '_1180_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1182,
              property_is_outgoing: true,
              propertyFieldKey: '_1182_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1185,
              property_is_outgoing: true,
              propertyFieldKey: '_1185_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1178,
              property_is_outgoing: true,
              propertyFieldKey: '_1178_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1066_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1066,
            dfh_identifier_in_namespace: 'histP7',
            dfh_has_domain: 212,
            dfh_has_range: 449,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 449,
          label: {
            sg: 'Type',
            pl: 'Types',
            'default': 'Types'
          }
        },
        _1178_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 114,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1178,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 119,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1178,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 430,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1178,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 363,
          label: {
            sg: 'Is localized at',
            pl: 'Is localized at',
            'default': 'Is localized at'
          }
        },
        _1180_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 115,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1180,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 120,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1180,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 431,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1180,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: 'Localized Person',
            pl: 'Localized Persons',
            'default': 'Localized Person'
          }
        },
        _1182_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 118,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1182,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 121,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1182,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 432,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1182,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: 'Localized Group',
            pl: 'Localized Groups',
            'default': 'Localized Group'
          }
        },
        _1183_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 117,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1183,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 116,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1185,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 122,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1185,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 433,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1185,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 441,
          label: {
            sg: 'Localized Built work',
            pl: 'Localized Built work',
            'default': 'Localized Built work'
          }
        }
      }
    },
    '218': {
      pkEntity: 2715,
      dfh_pk_class: 218,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Technical Profile, geoVistory Basic Profile',
      profilePks: [
        5,
        4
      ],
      isInProject: false,
      projRel: {
        pk_entity: 3162,
        fk_entity: 2715,
        fk_project: 9,
        is_in_project: false
      },
      label: 'Content/Section',
      dfh_standard_label: 'Expression',
      changingProjRel: false,
      scopeNote: '<ul>\r\n<li>The Italian text of Dante&rsquo;s &lsquo;Divina Commedia&rsquo; as found in the authoritative critical edition &lsquo;La Commedia secondo l&rsquo;antica vulgata a cura di Giorgio Petrocchi&rsquo;, Milano: Mondadori, 1966-67 (= Le Opere di Dante Alighieri, Edizione Nazionale a cura della Societ&agrave; Dantesca Italiana, VII, 1-4) (F22 and E33)</li>\r\n<li>The Italian text of Dante&rsquo;s &lsquo;Inferno&rsquo; as found in the same edition (F22 and E33)</li>\r\n<li>&lsquo;Nel mezzo del cammin di nostra vita<br />mi ritrovai per una selva oscura<br />ch&eacute; la diritta via era smarrita&rsquo; [the Italian text of the first stanza of Dante&rsquo;s &lsquo;Inferno&rsquo; and &lsquo;Divina Commedia&rsquo;] (F23 and E33)</li>\r\n<li>The signs which make up Christian Morgenstern&rsquo;s &lsquo;Fisches Nachtgesang&rsquo; [a poem consisting simply of &lsquo;&mdash;&rsquo; and &lsquo; ̆&rsquo; signs, arranged in a determined combination] (F22)</li>\r\n</ul>',
      dfh_identifier_in_namespace: 'F2',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 218,
              class_field: {
                pk_entity: 218,
                description: 'Exact reference for a F2 Expression (e.g Page "2").)',
                label: 'Exact Reference',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_218'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: []
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 218,
              class_field: {
                pk_entity: 218,
                description: 'Exact reference for a F2 Expression (e.g Page "2").)',
                label: 'Exact Reference',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_218'
            },
            {
              ord_num: 1,
              fk_property: 1207,
              property_is_outgoing: false,
              propertyFieldKey: '_1207_ingoing',
              fk_class_field: null
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 218,
              class_field: {
                pk_entity: 218,
                description: 'Exact reference for a F2 Expression (e.g Page "2").)',
                label: 'Exact Reference',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_218'
            },
            {
              ord_num: 1,
              fk_property: 1207,
              property_is_outgoing: false,
              propertyFieldKey: '_1207_ingoing',
              fk_class_field: null
            }
          ]
        },
        '211': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 218,
              class_field: {
                pk_entity: 218,
                description: 'Exact reference for a F2 Expression (e.g Page "2").)',
                label: 'Exact Reference',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_218'
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: []
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 218,
              class_field: {
                pk_entity: 218,
                description: 'Exact reference for a F2 Expression (e.g Page "2").)',
                label: 'Exact Reference',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_218'
            }
          ]
        }
      },
      propertyFields: {
        _1016_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1016,
            dfh_identifier_in_namespace: 'R42',
            dfh_has_domain: 220,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 623,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 438,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 447,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 456,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 542,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 545,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 550,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 220,
          label: {
            sg: '[inv.sg: 1016: R42 undefined',
            pl: '[inv.pl: 1016: R42 undefined',
            'default': '[inv.pl: 1016: R42 undefined'
          }
        },
        _1207_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1207,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 436,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 446,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 444,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 448,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 453,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 625,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 549,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: 'Title / Name',
            pl: 'Titles / Names',
            'default': 'Titles / Names'
          }
        },
        _1216_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1216,
            dfh_identifier_in_namespace: 'geovP1',
            dfh_has_domain: 455,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 606,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1216,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 626,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1216,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 455,
          label: {
            sg: '[inv.sg: 1216: geovP1 undefined',
            pl: '[inv.pl: 1216: geovP1 undefined',
            'default': '[inv.pl: 1216: geovP1 undefined'
          }
        },
        _1235_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1235,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 624,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1235,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 603,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1235,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1235: geovP2 undefined',
            pl: '[inv.pl: 1235: geovP2 undefined',
            'default': '[inv.pl: 1235: geovP2 undefined'
          }
        },
        _1236_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1236,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 627,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1236,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 604,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1236,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1236: geovP2 undefined',
            pl: '[inv.pl: 1236: geovP2 undefined',
            'default': '[inv.pl: 1236: geovP2 undefined'
          }
        },
        _1237_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1237,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 602,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1237,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 628,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1237,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: '[inv.sg: 1237: geovP2 undefined',
            pl: '[inv.pl: 1237: geovP2 undefined',
            'default': '[inv.pl: 1237: geovP2 undefined'
          }
        },
        _1238_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1238,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 605,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1238,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 629,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1238,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 1238: geovP2 undefined',
            pl: '[inv.pl: 1238: geovP2 undefined',
            'default': '[inv.pl: 1238: geovP2 undefined'
          }
        },
        _1214_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1214,
            dfh_identifier_in_namespace: 'histP22',
            dfh_has_domain: 218,
            dfh_has_range: 454,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 439,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 449,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 454,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 541,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 547,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 551,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 631,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 454,
          label: {
            sg: 'Type',
            pl: 'Types',
            'default': 'Types'
          }
        },
        _979_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
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
            class_field_config: [
              {
                pk_entity: 440,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 455,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 543,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 546,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 552,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 451,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 630,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: 'is contained by',
            pl: 'is contained by',
            'default': 'is contained by'
          }
        },
        _1015_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
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
            class_field_config: [
              {
                pk_entity: 441,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 450,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 457,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 544,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 548,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 553,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 632,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: '[sg: 1015: R41 undefined',
            pl: '[pl: 1015: R41 undefined',
            'default': '[pl: 1015: R41 undefined'
          }
        }
      }
    },
    '219': {
      pkEntity: 2661,
      dfh_pk_class: 219,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      projRel: {
        pk_entity: 3150,
        fk_entity: 2661,
        fk_project: 9,
        is_in_project: false
      },
      label: 'Serially Produced Object',
      dfh_standard_label: 'Manifestation Product Type',
      changingProjRel: false,
      scopeNote: '<p>This class comprises the definitions of publication products.</p>\r\n<p>An instance of F3 Manifestation Product Type is the &ldquo;species&rdquo;, and all copies of a given object are &ldquo;specimens&rdquo; of it. An instance of F3 Manifestation Product Type defines all of the features or traits that instances of F5 Item normally display in order that they may be recognised as copies of a particular publication. However, due to production problems or subsequent events, one or more instances of F5 Item may not exhibit all these features or traits; yet such instances still retain their relationship to the same instance of F3 Manifestation Product Type.</p>\r\n<p>The features that characterise a given instance of F3 Manifestation Product Type include: one instance of F24 Publication Expression, containing one or more than one instance of F2 Expression, reflecting the authors&rsquo; content of the manifestation and all additional input by the publisher; and the appropriate types of physical features for that form of the object. For example, hardcover and paperback are two distinct publications (i.e. two distinct instances of F3 Manifestation Product Type) even though authorial and editorial content are otherwise identical in both publications. The activity of cataloguing aims at the most accurate listing of features or traits of an instance of F3 Manifestation Product Type that are sufficient to distinguish it from another instance of F3 Manifestation Product Type.</p>',
      dfh_identifier_in_namespace: 'F3',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
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
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
            }
          ]
        },
        '211': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1202,
              property_is_outgoing: false,
              propertyFieldKey: '_1202_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: []
        }
      },
      propertyFields: {
        _982_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 159,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 982,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 257,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 982,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 384,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 982,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 526,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 982,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 160,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 254,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 381,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 525,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 161,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 256,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 382,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 527,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 979,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 162,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1000,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 255,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1000,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 383,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1000,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 528,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1000,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 163,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 258,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 385,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 529,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1015,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 164,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1022,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 259,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1022,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 386,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1022,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 530,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1022,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 157,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 156,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 250,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 388,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 251,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 400,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 531,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
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
        _1231_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1231,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 1231: geovP2 undefined',
            pl: '[inv.pl: 1231: geovP2 undefined',
            'default': '[inv.pl: 1231: geovP2 undefined'
          }
        },
        _1232_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1232,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: '[inv.sg: 1232: geovP2 undefined',
            pl: '[inv.pl: 1232: geovP2 undefined',
            'default': '[inv.pl: 1232: geovP2 undefined'
          }
        },
        _1233_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1233,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1233: geovP2 undefined',
            pl: '[inv.pl: 1233: geovP2 undefined',
            'default': '[inv.pl: 1233: geovP2 undefined'
          }
        },
        _1234_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1234,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1234: geovP2 undefined',
            pl: '[inv.pl: 1234: geovP2 undefined',
            'default': '[inv.pl: 1234: geovP2 undefined'
          }
        },
        _1206_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1206,
            dfh_identifier_in_namespace: 'histP21',
            dfh_has_domain: 219,
            dfh_has_range: 452,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 260,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 389,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 532,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 452,
          label: {
            sg: 'Type',
            pl: 'Types',
            'default': 'Types'
          }
        },
        _968_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 165,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 968,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 261,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 968,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 387,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 968,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 533,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 968,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        _969_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 167,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 969,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 262,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 969,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 390,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 969,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 534,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 969,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        _970_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 166,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 970,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 263,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 970,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 391,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 970,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 535,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 970,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 168,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 264,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 392,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 536,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 971,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 169,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 972,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 265,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 972,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 393,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 972,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 537,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 972,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        _973_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 170,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 973,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 267,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 973,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 394,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 973,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 538,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 973,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        _974_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 171,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 974,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 266,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 974,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 395,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 974,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 540,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 974,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        _975_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 172,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 975,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 268,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 975,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 396,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 975,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 539,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 975,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
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
        }
      }
    },
    '220': {
      pkEntity: 2823,
      dfh_pk_class: 220,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      projRel: {
        pk_entity: 3170,
        fk_entity: 2823,
        fk_project: 9,
        is_in_project: false
      },
      label: 'Unique Object',
      dfh_standard_label: 'Manifestation Singleton',
      changingProjRel: false,
      scopeNote: '<ul>\r\n<li>The manuscript known as \'The Book of Kells\'</li>\r\n<li>The manuscript score of Charles Racquet&rsquo;s &lsquo;Organ fantasy&rsquo;, included in Marin Mersenne&rsquo;s personal copy of his own &lsquo;Harmonie universelle&rsquo; [Marin Mersenne planned a second edition of his &lsquo;Harmonie universelle&rsquo; after it had been first published in 1636, and he asked the composer Charles Racquet to compose his organ fantasy especially for that planned second edition; but Mersenne died before he could finish and publish the second edition and Racquet&rsquo;s score remained until the 20th century as a manuscript addition to Mersenne&rsquo;s copy, held in Paris by the Library of the Conservatoire national des arts et m&eacute;tiers]</li>\r\n<li>Marin Mersenne&rsquo;s personal copy, held in Paris by the Library of the Conservatoire national des arts et m&eacute;tiers, of his own &lsquo;Harmonie universelle&rsquo;, containing all of his manuscript additions for a planned second edition that never took place before his death, but that served as a basis for the modern reprint published in 1986</li>\r\n</ul>',
      dfh_identifier_in_namespace: 'F4',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1208,
              property_is_outgoing: false,
              propertyFieldKey: '_1208_ingoing',
              fk_class_field: null
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
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1208,
              property_is_outgoing: false,
              propertyFieldKey: '_1208_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1208,
              property_is_outgoing: false,
              propertyFieldKey: '_1208_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1208,
              property_is_outgoing: false,
              propertyFieldKey: '_1208_ingoing',
              fk_class_field: null
            }
          ]
        },
        '211': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1208,
              property_is_outgoing: false,
              propertyFieldKey: '_1208_ingoing',
              fk_class_field: null
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: []
        }
      },
      propertyFields: {
        _1208_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1208,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 558,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 566,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 567,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 569,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 571,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 573,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: 'Archive Reference',
            pl: 'Archive Reference',
            'default': 'Archive Reference'
          }
        },
        _1239_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1239,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 1239: geovP2 undefined',
            pl: '[inv.pl: 1239: geovP2 undefined',
            'default': '[inv.pl: 1239: geovP2 undefined'
          }
        },
        _1240_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1240,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: '[inv.sg: 1240: geovP2 undefined',
            pl: '[inv.pl: 1240: geovP2 undefined',
            'default': '[inv.pl: 1240: geovP2 undefined'
          }
        },
        _1241_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1241,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1241: geovP2 undefined',
            pl: '[inv.pl: 1241: geovP2 undefined',
            'default': '[inv.pl: 1241: geovP2 undefined'
          }
        },
        _1242_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1242,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1242: geovP2 undefined',
            pl: '[inv.pl: 1242: geovP2 undefined',
            'default': '[inv.pl: 1242: geovP2 undefined'
          }
        },
        _1205_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1205,
            dfh_identifier_in_namespace: 'histP20',
            dfh_has_domain: 220,
            dfh_has_range: 450,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 559,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1205,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 450,
          label: {
            sg: 'Type',
            pl: 'Type',
            'default': 'Type'
          }
        },
        _1016_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1016,
            dfh_identifier_in_namespace: 'R42',
            dfh_has_domain: 220,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 560,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1016,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1016: R42 undefined',
            pl: '[pl: 1016: R42 undefined',
            'default': '[pl: 1016: R42 undefined'
          }
        }
      }
    },
    '221': {
      pkEntity: 2662,
      dfh_pk_class: 221,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3166,
        fk_entity: 2662,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Item',
      dfh_standard_label: 'Item',
      changingProjRel: false,
      scopeNote: 'This class comprises physical objects (printed books, scores, CDs, DVDs, CD-ROMS, etc.) that carry a F24 Publication Expression and\n\t\t\twere produced by an industrial process involving an F3 Manifestation Product Type. ',
      dfh_identifier_in_namespace: 'F5',
      uiContexts: {},
      propertyFields: {
        _1209_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1209,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 221,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: '[inv.sg: 1209: histP9 undefined',
            pl: '[inv.pl: 1209: histP9 undefined',
            'default': '[inv.pl: 1209: histP9 undefined'
          }
        },
        _982_outgoing: {
          type: 'PropertyField',
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
            class_field_config: []
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
      pkEntity: 97,
      dfh_pk_class: 363,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile, geoVistory Technical Profile',
      profilePks: [
        4,
        5
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3155,
        fk_entity: 97,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Geographical Place',
      dfh_standard_label: 'Geographical Place',
      changingProjRel: false,
      scopeNote: 'This class refers to portions of the surface of the Earth intended as constellations of matter which can be represented by photographs, paintings and maps. The relevant portion of the surface of the Earth can be covered by water (river, sea, ...). The more specific identity of instances of this class is provided by a controlled vocabulary of geographical place types.',
      dfh_identifier_in_namespace: 'histC8',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1194,
              property_is_outgoing: false,
              propertyFieldKey: '_1194_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1181,
              property_is_outgoing: false,
              propertyFieldKey: '_1181_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1178,
              property_is_outgoing: false,
              propertyFieldKey: '_1178_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1186,
              property_is_outgoing: false,
              propertyFieldKey: '_1186_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1191,
              property_is_outgoing: false,
              propertyFieldKey: '_1191_ingoing',
              fk_class_field: null
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
              propertyFieldKey: '_1194_ingoing',
              fk_class_field: null
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
              propertyFieldKey: '_1194_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1181,
              property_is_outgoing: false,
              propertyFieldKey: '_1181_ingoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1181_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 152,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1181,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 460,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1181,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 84,
          label: {
            sg: 'Georeference',
            pl: 'Georeferences',
            'default': 'Georeferences'
          }
        },
        _1186_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 125,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1186,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
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
        _1191_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 126,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1191,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 4,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 127,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1178,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Entities localized here',
            pl: 'Entities localized here',
            'default': 'Entities localized here'
          }
        },
        _1194_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 123,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 124,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 459,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        _1110_outgoing: {
          type: 'PropertyField',
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
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 364,
          label: {
            sg: '[sg: 1110: histP8 undefined',
            pl: '[pl: 1110: histP8 undefined',
            'default': '[pl: 1110: histP8 undefined'
          }
        },
        _1225_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1225,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 457,
          label: {
            sg: '[sg: 1225: geovP2 undefined',
            pl: '[pl: 1225: geovP2 undefined',
            'default': '[pl: 1225: geovP2 undefined'
          }
        },
        _1228_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1228,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 456,
          label: {
            sg: '[sg: 1228: geovP2 undefined',
            pl: '[pl: 1228: geovP2 undefined',
            'default': '[pl: 1228: geovP2 undefined'
          }
        },
        _1233_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1233,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 219,
          label: {
            sg: '[sg: 1233: geovP2 undefined',
            pl: '[pl: 1233: geovP2 undefined',
            'default': '[pl: 1233: geovP2 undefined'
          }
        },
        _1236_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1236,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1236: geovP2 undefined',
            pl: '[pl: 1236: geovP2 undefined',
            'default': '[pl: 1236: geovP2 undefined'
          }
        },
        _1241_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1241,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 220,
          label: {
            sg: '[sg: 1241: geovP2 undefined',
            pl: '[pl: 1241: geovP2 undefined',
            'default': '[pl: 1241: geovP2 undefined'
          }
        }
      }
    },
    '364': {
      pkEntity: 98,
      dfh_pk_class: 364,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3156,
        fk_entity: 98,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Geographical place type',
      dfh_standard_label: 'Geographical place type',
      changingProjRel: false,
      scopeNote: 'This class comprises instances of a vocabulary of geographical place types which provides identity definition for the instances of the geographical place class',
      dfh_identifier_in_namespace: 'histC9',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              propertyFieldKey: '_1200_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
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
              propertyFieldKey: '_1200_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              propertyFieldKey: '_1200_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              propertyFieldKey: '_1200_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1200,
              property_is_outgoing: false,
              propertyFieldKey: '_1200_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        }
      },
      propertyFields: {
        _1110_ingoing: {
          type: 'PropertyField',
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
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 579,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1110,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1110: histP8 undefined',
            pl: '[inv.pl: 1110: histP8 undefined',
            'default': '[inv.pl: 1110: histP8 undefined'
          }
        },
        _1200_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 185,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 186,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 461,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 466,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 467,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        }
      }
    },
    '365': {
      pkEntity: 569,
      dfh_pk_class: 365,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile, geoVistory Technical Profile',
      profilePks: [
        4,
        5
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3158,
        fk_entity: 569,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Naming',
      dfh_standard_label: 'Appellation for language',
      changingProjRel: false,
      scopeNote: 'A pope is called with his function name only after his election. Furthermore, he has a latin official name and translations in the different languages.',
      dfh_identifier_in_namespace: 'histC10',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
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
              fk_property: 1194,
              property_is_outgoing: true,
              propertyFieldKey: '_1194_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1195,
              property_is_outgoing: true,
              propertyFieldKey: '_1195_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1193,
              property_is_outgoing: true,
              propertyFieldKey: '_1193_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 4,
              fk_property: 1192,
              property_is_outgoing: true,
              propertyFieldKey: '_1192_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 5,
              fk_property: 1208,
              property_is_outgoing: true,
              propertyFieldKey: '_1208_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 6,
              fk_property: 1210,
              property_is_outgoing: true,
              propertyFieldKey: '_1210_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 7,
              fk_property: 1211,
              property_is_outgoing: true,
              propertyFieldKey: '_1211_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 8,
              fk_property: 1200,
              property_is_outgoing: true,
              propertyFieldKey: '_1200_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 9,
              fk_property: 1201,
              property_is_outgoing: true,
              propertyFieldKey: '_1201_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 10,
              fk_property: 1112,
              property_is_outgoing: true,
              propertyFieldKey: '_1112_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 11,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
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
              propertyFieldKey: '_1113_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1112,
              property_is_outgoing: true,
              propertyFieldKey: '_1112_outgoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 48,
              class_field: {
                pk_entity: 48,
                description: 'Existence Time or Time Span of a Temporal Entity',
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            },
            {
              ord_num: 1,
              fk_property: 1113,
              property_is_outgoing: true,
              propertyFieldKey: '_1113_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1112,
              property_is_outgoing: true,
              propertyFieldKey: '_1112_outgoing',
              fk_class_field: null
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
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
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            }
          ]
        },
        '211': {
          label: 'Sources Create',
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
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
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
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
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
            }
          ]
        }
      },
      propertyFields: {
        _1111_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 278,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 302,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 318,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 339,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 355,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 369,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1111,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
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
        _1194_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 137,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 131,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 286,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 306,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 324,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 342,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1194,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 372,
                fk_app_context: 213,
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
            sg: 'Geo-Place with this Name',
            pl: 'Geo-Places with this Name',
            'default': 'Geo-Place with this Name'
          }
        },
        _1195_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 132,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 139,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 287,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 307,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 312,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 343,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 373,
                fk_app_context: 213,
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
            sg: 'Built Work with this Name',
            pl: 'Built Works with this Name',
            'default': 'Built Work with this Name'
          }
        },
        _1193_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 133,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 136,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 285,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 305,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 325,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 340,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1193,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 370,
                fk_app_context: 213,
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
            sg: 'Group with this Name',
            pl: 'Groups with this Name',
            'default': 'Group with this Name'
          }
        },
        _1192_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 130,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 135,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 4,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 284,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 304,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 323,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 341,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1192,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 371,
                fk_app_context: 213,
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
            sg: 'Person with this Name',
            pl: 'Persons with this Name',
            'default': 'Person with this Name'
          }
        },
        _1208_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1208,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 594,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 5,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 276,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 297,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 317,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 335,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 348,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 361,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1208,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 220,
          label: {
            sg: 'Unique Object  with this Name',
            pl: 'Unique Object  with this Name',
            'default': 'Unique Object  with this Name'
          }
        },
        _1209_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1209,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 221,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 277,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 298,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 315,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 332,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 350,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 365,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1209,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 221,
          label: {
            sg: '[sg: 1209: histP9 undefined',
            pl: '[pl: 1209: histP9 undefined',
            'default': '[sg: 1209: histP9 undefined'
          }
        },
        _1210_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1210,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 450,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 279,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 299,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 316,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 336,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 351,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 362,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 595,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 6,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 450,
          label: {
            sg: 'Term/Label of Manifestation singleton type',
            pl: 'Term/Label of Manifestation singleton type',
            'default': 'Term/Label of Manifestation singleton type'
          }
        },
        _1211_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1211,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 452,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 280,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 300,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 320,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 334,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 352,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 364,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 596,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 7,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 452,
          label: {
            sg: 'Term/Label of Type of manifestation product type',
            pl: 'Term/Label of Type of manifestation product type',
            'default': 'Term/Label of Type of manifestation product type'
          }
        },
        _1212_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1212,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 449,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 281,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 293,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 322,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 333,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 347,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 366,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1212,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 449,
          label: {
            sg: '[sg: 1212: histP9 undefined',
            pl: '[pl: 1212: histP9 undefined',
            'default': '[sg: 1212: histP9 undefined'
          }
        },
        _1213_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1213,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 451,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 282,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 301,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 319,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 338,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 353,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 367,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 451,
          label: {
            sg: '[sg: 1213: histP9 undefined',
            pl: '[pl: 1213: histP9 undefined',
            'default': '[sg: 1213: histP9 undefined'
          }
        },
        _1215_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1215,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 454,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 283,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 303,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 321,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 337,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 354,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 368,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 454,
          label: {
            sg: '[sg: 1215: histP9 undefined',
            pl: '[pl: 1215: histP9 undefined',
            'default': '[sg: 1215: histP9 undefined'
          }
        },
        _1201_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 290,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 310,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 329,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 345,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 358,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 375,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 597,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 9,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 443,
          label: {
            sg: 'Term/Label of Built work type',
            pl: 'Term/Label of Built work types',
            'default': 'Term/Label of Built work type'
          }
        },
        _1200_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 289,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 308,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 327,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 344,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 356,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 374,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 598,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1200,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 8,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 364,
          label: {
            sg: 'Term/Label of Geographical place type',
            pl: 'Term/Label of Geographical place types',
            'default': 'Term/Label of Geographical place type'
          }
        },
        _1202_outgoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 291,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 311,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 328,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 346,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 357,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 363,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1202,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 219,
          label: {
            sg: 'Serially Produced Object',
            pl: 'Serially Produced Objects',
            'default': 'Serially Produced Object'
          }
        },
        _1113_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 128,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 134,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 273,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 292,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 295,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 313,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1113,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 376,
                fk_app_context: 213,
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
            sg: 'Spelling',
            pl: 'Spellings',
            'default': 'Spelling'
          }
        },
        _1207_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1207,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 275,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 296,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 314,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 331,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 349,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 360,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1207,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 218,
          label: {
            sg: 'Is Title / Name of Expression',
            pl: 'Is Title / Name of Expression',
            'default': 'Is Title / Name of Expression'
          }
        },
        _1112_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 129,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 274,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 288,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 309,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 326,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 359,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 138,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1112,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 10,
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
        _1222_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1222,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 457,
          label: {
            sg: '[sg: 1222: histP9 undefined',
            pl: '[pl: 1222: histP9 undefined',
            'default': '[sg: 1222: histP9 undefined'
          }
        },
        _1221_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1221,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 456,
          label: {
            sg: '[sg: 1221: histP9 undefined',
            pl: '[pl: 1221: histP9 undefined',
            'default': '[sg: 1221: histP9 undefined'
          }
        },
        _1220_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1220,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 455,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 1,
          targetClassPk: 455,
          label: {
            sg: '[sg: 1220: histP9 undefined',
            pl: '[pl: 1220: histP9 undefined',
            'default': '[sg: 1220: histP9 undefined'
          }
        }
      }
    },
    '441': {
      pkEntity: 637,
      dfh_pk_class: 441,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Technical Profile, geoVistory Basic Profile',
      profilePks: [
        5,
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3160,
        fk_entity: 637,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Built work',
      dfh_standard_label: 'Built work',
      changingProjRel: false,
      scopeNote: 'This class comprises instances of man-made things such as freestanding buildings, components of buildings, and complexes of buildings, but also all man-made parts of infrastructure (roads, lamp post, dams, etc.)',
      dfh_identifier_in_namespace: 'histC11',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1195,
              property_is_outgoing: false,
              propertyFieldKey: '_1195_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1184,
              property_is_outgoing: false,
              propertyFieldKey: '_1184_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 2,
              fk_property: 1185,
              property_is_outgoing: false,
              propertyFieldKey: '_1185_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 3,
              fk_property: 1187,
              property_is_outgoing: false,
              propertyFieldKey: '_1187_ingoing',
              fk_class_field: null
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
              propertyFieldKey: '_1195_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1195,
              property_is_outgoing: false,
              propertyFieldKey: '_1195_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1184,
              property_is_outgoing: false,
              propertyFieldKey: '_1184_ingoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1184_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 142,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1184,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 146,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1184,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 470,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1184,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 84,
          label: {
            sg: 'Georeference',
            pl: 'Georeferences',
            'default': 'Georeferences'
          }
        },
        _1187_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 147,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1187,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 3,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 141,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1187,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
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
        _1185_ingoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 145,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1185,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 2,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 143,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1185,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Localization relative to Place',
            pl: 'Localizations relative to Place',
            'default': 'Localizations relative to Place'
          }
        },
        _1195_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 140,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 144,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 469,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1195,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        _1190_outgoing: {
          type: 'PropertyField',
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
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 471,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1190,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 443,
          label: {
            sg: 'Type',
            pl: 'Types',
            'default': 'Types'
          }
        },
        _1226_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1226,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 457,
          label: {
            sg: '[sg: 1226: geovP2 undefined',
            pl: '[pl: 1226: geovP2 undefined',
            'default': '[pl: 1226: geovP2 undefined'
          }
        },
        _1227_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1227,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 456,
          label: {
            sg: '[sg: 1227: geovP2 undefined',
            pl: '[pl: 1227: geovP2 undefined',
            'default': '[pl: 1227: geovP2 undefined'
          }
        },
        _1234_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1234,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 219,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 219,
          label: {
            sg: '[sg: 1234: geovP2 undefined',
            pl: '[pl: 1234: geovP2 undefined',
            'default': '[pl: 1234: geovP2 undefined'
          }
        },
        _1235_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1235,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1235: geovP2 undefined',
            pl: '[pl: 1235: geovP2 undefined',
            'default': '[pl: 1235: geovP2 undefined'
          }
        },
        _1242_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1242,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 220,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 1,
          targetClassPk: 220,
          label: {
            sg: '[sg: 1242: geovP2 undefined',
            pl: '[pl: 1242: geovP2 undefined',
            'default': '[pl: 1242: geovP2 undefined'
          }
        }
      }
    },
    '442': {
      pkEntity: 638,
      dfh_pk_class: 442,
      subclassOf: 'teEnt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3169,
        fk_entity: 638,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Membership',
      dfh_standard_label: 'Membership',
      changingProjRel: false,
      scopeNote: '',
      dfh_identifier_in_namespace: 'histC12',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1189,
              property_is_outgoing: true,
              propertyFieldKey: '_1189_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1188,
              property_is_outgoing: true,
              propertyFieldKey: '_1188_outgoing',
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
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
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
              propertyFieldKey: '_1189_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1188,
              property_is_outgoing: true,
              propertyFieldKey: '_1188_outgoing',
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
                label: 'When',
                fk_system_type_ng_component: 556,
                used_table: null
              },
              propSetKey: '_field_48'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1188,
              property_is_outgoing: true,
              propertyFieldKey: '_1188_outgoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: 1189,
              property_is_outgoing: true,
              propertyFieldKey: '_1189_outgoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1188_outgoing: {
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 148,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1188,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 151,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1188,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 473,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1188,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
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
          type: 'PropertyField',
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
            class_field_config: [
              {
                pk_entity: 149,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1189,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 150,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1189,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 472,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1189,
                fk_class_field: null,
                property_is_outgoing: true,
                ord_num: 1,
                fk_class_for_class_field: null
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
      pkEntity: 639,
      dfh_pk_class: 443,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3161,
        fk_entity: 639,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Built work type',
      dfh_standard_label: 'Built work type',
      changingProjRel: false,
      scopeNote: 'This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the \'hictC11 Built work class\'.',
      dfh_identifier_in_namespace: 'histC13',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1201,
              property_is_outgoing: false,
              propertyFieldKey: '_1201_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1201,
              property_is_outgoing: false,
              propertyFieldKey: '_1201_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1201,
              property_is_outgoing: false,
              propertyFieldKey: '_1201_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1201,
              property_is_outgoing: false,
              propertyFieldKey: '_1201_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1201,
              property_is_outgoing: false,
              propertyFieldKey: '_1201_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        }
      },
      propertyFields: {
        _1190_ingoing: {
          type: 'PropertyField',
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
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 481,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1190,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        },
        _1201_ingoing: {
          type: 'PropertyField',
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
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 474,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 476,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 479,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 480,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 483,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1201,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        }
      }
    },
    '449': {
      pkEntity: 2824,
      dfh_pk_class: 449,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      label: 'Geographical localisation type',
      dfh_standard_label: 'Geographical localisation type',
      changingProjRel: false,
      scopeNote: '<p>This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the \'histC2 Geographical localisation\'.</p>',
      dfh_identifier_in_namespace: 'histC16',
      uiContexts: {},
      propertyFields: {
        _1066_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1066,
            dfh_identifier_in_namespace: 'histP7',
            dfh_has_domain: 212,
            dfh_has_range: 449,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: 1,
            dfh_range_instances_min_quantifier: 0,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: 1,
          targetMinQuantity: 0,
          targetClassPk: 212,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        },
        _1212_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1212,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 449,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
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
    },
    '450': {
      pkEntity: 2843,
      dfh_pk_class: 450,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3171,
        fk_entity: 2843,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Manifestation singleton type',
      dfh_standard_label: 'Manifestation singleton type',
      changingProjRel: false,
      scopeNote: '<p><span style="caret-color: #172b4d; color: #172b4d; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; font-size: 14.000000953674316px; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: #ebecf0; text-decoration: none; display: inline !important; float: none;">This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of \'F4 Manifestation Singleton\'.</span></p>',
      dfh_identifier_in_namespace: 'histC17',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
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
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            }
          ]
        },
        '211': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 217,
              class_field: {
                pk_entity: 217,
                description: 'Short Title for a class instance (without time information.)',
                label: 'Short Title',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_217'
            },
            {
              ord_num: 1,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1210,
              property_is_outgoing: false,
              propertyFieldKey: '_1210_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        }
      },
      propertyFields: {
        _1205_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1205,
            dfh_identifier_in_namespace: 'histP20',
            dfh_has_domain: 220,
            dfh_has_range: 450,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 489,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1205,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 495,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1205,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 220,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        },
        _1210_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1210,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 450,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 488,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 485,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 491,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 492,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 496,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 561,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 563,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1210,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        }
      }
    },
    '451': {
      pkEntity: 2835,
      dfh_pk_class: 451,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3165,
        fk_entity: 2835,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Group type',
      dfh_standard_label: 'Group type',
      changingProjRel: false,
      scopeNote: '<p>This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the \'crm:E74 Group\'.</p>',
      dfh_identifier_in_namespace: 'histC18',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1213,
              property_is_outgoing: false,
              propertyFieldKey: '_1213_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1213,
              property_is_outgoing: false,
              propertyFieldKey: '_1213_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1213,
              property_is_outgoing: false,
              propertyFieldKey: '_1213_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1213,
              property_is_outgoing: false,
              propertyFieldKey: '_1213_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            },
            {
              ord_num: 1,
              fk_property: 1213,
              property_is_outgoing: false,
              propertyFieldKey: '_1213_ingoing',
              fk_class_field: null
            }
          ]
        }
      },
      propertyFields: {
        _1213_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1213,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 451,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 497,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 500,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 501,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 504,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 506,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1213,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 1,
                fk_class_for_class_field: null
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
        _1204_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1204,
            dfh_identifier_in_namespace: 'histP19',
            dfh_has_domain: 68,
            dfh_has_range: 451,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 502,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1204,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 507,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1204,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 68,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        }
      }
    },
    '452': {
      pkEntity: 2844,
      dfh_pk_class: 452,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: true,
      projRel: {
        pk_entity: 3129,
        fk_entity: 2844,
        fk_project: 9,
        is_in_project: true
      },
      label: 'Type of Serially Produced Object',
      dfh_standard_label: 'Type of manifestation product type',
      changingProjRel: false,
      scopeNote: '<p>This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the <a href="../219">Manifestation Product Type &ndash; F3</a> class.</p>',
      dfh_identifier_in_namespace: 'histC19',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1211,
              property_is_outgoing: false,
              propertyFieldKey: '_1211_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1211,
              property_is_outgoing: false,
              propertyFieldKey: '_1211_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1211,
              property_is_outgoing: false,
              propertyFieldKey: '_1211_ingoing',
              fk_class_field: null
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1211,
              property_is_outgoing: false,
              propertyFieldKey: '_1211_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1211,
              property_is_outgoing: false,
              propertyFieldKey: '_1211_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        }
      },
      propertyFields: {
        _1206_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1206,
            dfh_identifier_in_namespace: 'histP21',
            dfh_has_domain: 219,
            dfh_has_range: 452,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 377,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 379,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 575,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1206,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 219,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        },
        _1211_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1211,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 452,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 269,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 271,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 401,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 577,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 578,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1211,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        }
      }
    },
    '454': {
      pkEntity: 2877,
      dfh_pk_class: 454,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile',
      profilePks: [
        4
      ],
      isInProject: false,
      projRel: {
        pk_entity: 3163,
        fk_entity: 2877,
        fk_project: 9,
        is_in_project: false
      },
      label: 'Section Type',
      dfh_standard_label: 'Expression type',
      changingProjRel: false,
      scopeNote: '<p>This class comprises concepts denoted by terms from thesauri and controlled vocabularies used to characterize and classify instances of the <a href="http://ontome.dataforhistory.org/class/218">Expression &ndash; F2</a> class.</p>',
      dfh_identifier_in_namespace: 'histC21',
      uiContexts: {
        '45': {
          label: 'DataUnits View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '46': {
          label: 'DataUnits Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '47': {
          label: 'Add',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '210': {
          label: 'Sources View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '211': {
          label: 'Sources Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '212': {
          label: 'Data Settings > Types View and Edit',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        },
        '213': {
          label: 'Data Settings > Types Create',
          uiElements: [
            {
              ord_num: 0,
              fk_property: 1215,
              property_is_outgoing: false,
              propertyFieldKey: '_1215_ingoing',
              fk_class_field: null
            },
            {
              ord_num: 1,
              fk_property: null,
              property_is_outgoing: null,
              fk_class_field: 219,
              class_field: {
                pk_entity: 219,
                description: 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.',
                label: 'Entity Definition',
                fk_system_type_ng_component: 555,
                used_table: 'information.text_property'
              },
              propSetKey: '_field_219'
            }
          ]
        }
      },
      propertyFields: {
        _1214_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1214,
            dfh_identifier_in_namespace: 'histP22',
            dfh_has_domain: 218,
            dfh_has_range: 454,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: [
              {
                pk_entity: 521,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 522,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1214,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              }
            ]
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 218,
          label: {
            sg: 'Is Type of',
            pl: 'Is Type of',
            'default': 'Is Type of'
          }
        },
        _1215_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1215,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 454,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: [
              {
                pk_entity: 509,
                fk_app_context: 47,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 511,
                fk_app_context: 45,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 513,
                fk_app_context: 46,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 520,
                fk_app_context: 212,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 515,
                fk_app_context: 210,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: null,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 517,
                fk_app_context: 211,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
              },
              {
                pk_entity: 523,
                fk_app_context: 213,
                fk_project: null,
                fk_property: 1215,
                fk_class_field: null,
                property_is_outgoing: false,
                ord_num: 0,
                fk_class_for_class_field: null
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
        }
      }
    },
    '455': {
      pkEntity: 2983,
      dfh_pk_class: 455,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Technical Profile',
      profilePks: [
        5
      ],
      isInProject: false,
      label: 'Digital object',
      dfh_standard_label: 'Digital object',
      changingProjRel: false,
      scopeNote: '<p>Any kind of digital object</p>',
      dfh_identifier_in_namespace: 'geovC1',
      uiContexts: {},
      propertyFields: {
        _1220_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1220,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 455,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: '[inv.sg: 1220: histP9 undefined',
            pl: '[inv.pl: 1220: histP9 undefined',
            'default': '[inv.pl: 1220: histP9 undefined'
          }
        },
        _1216_outgoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: true,
          property: {
            dfh_pk_property: 1216,
            dfh_identifier_in_namespace: 'geovP1',
            dfh_has_domain: 455,
            dfh_has_range: 218,
            dfh_fk_property_of_origin: null,
            dfh_domain_instances_min_quantifier: null,
            dfh_domain_instances_max_quantifier: null,
            dfh_range_instances_min_quantifier: null,
            dfh_range_instances_max_quantifier: null,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: null,
          targetMinQuantity: null,
          targetClassPk: 218,
          label: {
            sg: '[sg: 1216: geovP1 undefined',
            pl: '[pl: 1216: geovP1 undefined',
            'default': '[pl: 1216: geovP1 undefined'
          }
        }
      }
    },
    '456': {
      pkEntity: 2995,
      dfh_pk_class: 456,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Basic Profile, geoVistory Technical Profile',
      profilePks: [
        4,
        5
      ],
      isInProject: false,
      label: 'Chunk',
      dfh_standard_label: 'Chunk',
      changingProjRel: false,
      scopeNote: '<p>Chunks are intended here in the sense of NLP, i.e. as the result of shallow parsing or chunking: a sentence is analyzed with the aim of identifying constituent parts of sentences (nouns, verbs, adjectives, etc.) and then of linking them to higher order units that have discrete grammatical meanings (noun groups or phrases, verb groups, etc.). Chunks are therefore groups of tokens, generally below the sentence level. They can be used to identify noun phrases, especially in the process of named entities recognition</p>',
      dfh_identifier_in_namespace: 'geovC2',
      uiContexts: {},
      propertyFields: {
        _1227_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1227,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1227: geovP2 undefined',
            pl: '[inv.pl: 1227: geovP2 undefined',
            'default': '[inv.pl: 1227: geovP2 undefined'
          }
        },
        _1228_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1228,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1228: geovP2 undefined',
            pl: '[inv.pl: 1228: geovP2 undefined',
            'default': '[inv.pl: 1228: geovP2 undefined'
          }
        },
        _1229_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1229,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: '[inv.sg: 1229: geovP2 undefined',
            pl: '[inv.pl: 1229: geovP2 undefined',
            'default': '[inv.pl: 1229: geovP2 undefined'
          }
        },
        _1230_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1230,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 1230: geovP2 undefined',
            pl: '[inv.pl: 1230: geovP2 undefined',
            'default': '[inv.pl: 1230: geovP2 undefined'
          }
        },
        _1221_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1221,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 456,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: '[inv.sg: 1221: histP9 undefined',
            pl: '[inv.pl: 1221: histP9 undefined',
            'default': '[inv.pl: 1221: histP9 undefined'
          }
        }
      }
    },
    '457': {
      pkEntity: 2996,
      dfh_pk_class: 457,
      subclassOf: 'peIt',
      profileLabels: 'geoVistory Technical Profile, geoVistory Basic Profile',
      profilePks: [
        5,
        4
      ],
      isInProject: false,
      label: 'Spot',
      dfh_standard_label: 'Spot',
      changingProjRel: false,
      scopeNote: '<p>This class identifies portions of audiovisual digital objects like pictures, video, etc.</p>',
      dfh_identifier_in_namespace: 'geovC3',
      uiContexts: {},
      propertyFields: {
        _1223_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1223,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 21,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 21,
          label: {
            sg: '[inv.sg: 1223: geovP2 undefined',
            pl: '[inv.pl: 1223: geovP2 undefined',
            'default': '[inv.pl: 1223: geovP2 undefined'
          }
        },
        _1224_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1224,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 68,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 68,
          label: {
            sg: '[inv.sg: 1224: geovP2 undefined',
            pl: '[inv.pl: 1224: geovP2 undefined',
            'default': '[inv.pl: 1224: geovP2 undefined'
          }
        },
        _1225_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1225,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 363,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 363,
          label: {
            sg: '[inv.sg: 1225: geovP2 undefined',
            pl: '[inv.pl: 1225: geovP2 undefined',
            'default': '[inv.pl: 1225: geovP2 undefined'
          }
        },
        _1226_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1226,
            dfh_identifier_in_namespace: 'geovP2',
            dfh_has_domain: 441,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1218,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: -1,
            identity_defining: false,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 441,
          label: {
            sg: '[inv.sg: 1226: geovP2 undefined',
            pl: '[inv.pl: 1226: geovP2 undefined',
            'default': '[inv.pl: 1226: geovP2 undefined'
          }
        },
        _1222_ingoing: {
          type: 'PropertyField',
          hasAlternatives: false,
          isViewMode: false,
          toggle: 'expanded',
          isOutgoing: false,
          property: {
            dfh_pk_property: 1222,
            dfh_identifier_in_namespace: 'histP9',
            dfh_has_domain: 365,
            dfh_has_range: 457,
            dfh_fk_property_of_origin: 1111,
            dfh_domain_instances_min_quantifier: 0,
            dfh_domain_instances_max_quantifier: -1,
            dfh_range_instances_min_quantifier: 1,
            dfh_range_instances_max_quantifier: 1,
            identity_defining: true,
            class_field_config: []
          },
          targetMaxQuantity: -1,
          targetMinQuantity: 0,
          targetClassPk: 365,
          label: {
            sg: '[inv.sg: 1222: histP9 undefined',
            pl: '[inv.pl: 1222: histP9 undefined',
            'default': '[inv.pl: 1222: histP9 undefined'
          }
        }
      }
    }
  },
  fieldList: {
    _4_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _63_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 63,
        dfh_identifier_in_namespace: 'P72',
        dfh_has_domain: 32,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 32,
      label: {
        sg: '[inv.sg: 63: P72 undefined',
        pl: '[inv.pl: 63: P72 undefined',
        'default': '[inv.pl: 63: P72 undefined'
      }
    },
    _68_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 68: P78 undefined',
        pl: '[inv.pl: 68: P78 undefined',
        'default': '[inv.pl: 68: P78 undefined'
      }
    },
    _69_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 69: P79 undefined',
        pl: '[inv.pl: 69: P79 undefined',
        'default': '[inv.pl: 69: P79 undefined'
      }
    },
    _70_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 70: P80 undefined',
        pl: '[inv.pl: 70: P80 undefined',
        'default': '[inv.pl: 70: P80 undefined'
      }
    },
    _71_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'Ongoing throughout',
        pl: '[inv.pl: 71: P81 undefined',
        'default': '[inv.pl: 71: P81 undefined'
      }
    },
    _72_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'At some time within',
        pl: '[inv.pl: 72: P82 undefined',
        'default': '[inv.pl: 72: P82 undefined'
      }
    },
    _73_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 73: P83 undefined',
        pl: '[inv.pl: 73: P83 undefined',
        'default': '[inv.pl: 73: P83 undefined'
      }
    },
    _74_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[inv.sg: 74: P84 undefined',
        pl: '[inv.pl: 74: P84 undefined',
        'default': '[inv.pl: 74: P84 undefined'
      }
    },
    _75_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _83_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _84_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _86_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _87_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _88_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _95_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 95: P107 undefined',
        pl: '[inv.pl: 95: P107 undefined',
        'default': '[inv.pl: 95: P107 undefined'
      }
    },
    _119_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _131_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 78,
      label: {
        sg: '[inv.sg: 131: P143 undefined',
        pl: '[inv.pl: 131: P143 undefined',
        'default': '[inv.pl: 131: P143 undefined'
      }
    },
    _132_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _133_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 79,
      label: {
        sg: '[inv.sg: 133: P145 undefined',
        pl: '[inv.pl: 133: P145 undefined',
        'default': '[inv.pl: 133: P145 undefined'
      }
    },
    _134_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _140_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _143_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _148_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 84,
      label: {
        sg: 'Are coordinates of precence',
        pl: 'Are coordinates of precences',
        'default': 'Are coordinates of precence'
      }
    },
    _150_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'End of begin',
        pl: '[inv.pl: 150: P81a undefined',
        'default': '[inv.pl: 150: P81a undefined'
      }
    },
    _151_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'Begin of end',
        pl: '[inv.pl: 151: P81b undefined',
        'default': '[inv.pl: 151: P81b undefined'
      }
    },
    _152_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'Begin of begin',
        pl: '[inv.pl: 152: P82a undefined',
        'default': '[inv.pl: 152: P82a undefined'
      }
    },
    _153_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: 'End of end',
        pl: '[inv.pl: 153: P82b undefined',
        'default': '[inv.pl: 153: P82b undefined'
      }
    },
    _968_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 968: CLP2_should_have_type undefined',
        pl: '[inv.pl: 968: CLP2_should_have_type undefined',
        'default': '[inv.pl: 968: CLP2_should_have_type undefined'
      }
    },
    _969_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 969: CLP43_should_have_dimension undefined',
        pl: '[inv.pl: 969: CLP43_should_have_dimension undefined',
        'default': '[inv.pl: 969: CLP43_should_have_dimension undefined'
      }
    },
    _970_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 970: CLP45_should_consist_of undefined',
        pl: '[inv.pl: 970: CLP45_should_consist_of undefined',
        'default': '[inv.pl: 970: CLP45_should_consist_of undefined'
      }
    },
    _971_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _972_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 972: CLP57_should_have_number_of_parts undefined',
        pl: '[inv.pl: 972: CLP57_should_have_number_of_parts undefined',
        'default': '[inv.pl: 972: CLP57_should_have_number_of_parts undefined'
      }
    },
    _973_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 973: CLP104_subject_to undefined',
        pl: '[inv.pl: 973: CLP104_subject_to undefined',
        'default': '[inv.pl: 973: CLP104_subject_to undefined'
      }
    },
    _974_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 974: CLP105_right_held_by undefined',
        pl: '[inv.pl: 974: CLP105_right_held_by undefined',
        'default': '[inv.pl: 974: CLP105_right_held_by undefined'
      }
    },
    _975_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[inv.sg: 975: CLR6_should_carry undefined',
        pl: '[inv.pl: 975: CLR6_should_carry undefined',
        'default': '[inv.pl: 975: CLR6_should_carry undefined'
      }
    },
    _979_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _982_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1000_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1006_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1006,
        dfh_identifier_in_namespace: 'R32',
        dfh_has_domain: 251,
        dfh_has_range: 262,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 251,
      label: {
        sg: '[inv.sg: 1006: R32 undefined',
        pl: '[inv.pl: 1006: R32 undefined',
        'default': '[inv.pl: 1006: R32 undefined'
      }
    },
    _1008_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1013_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1015_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1016_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1016,
        dfh_identifier_in_namespace: 'R42',
        dfh_has_domain: 220,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 220,
      label: {
        sg: '[inv.sg: 1016: R42 undefined',
        pl: '[inv.pl: 1016: R42 undefined',
        'default': '[inv.pl: 1016: R42 undefined'
      }
    },
    _1022_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1027_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1027,
        dfh_identifier_in_namespace: 'R54',
        dfh_has_domain: 251,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 251,
      label: {
        sg: '[inv.sg: 1027: R54 undefined',
        pl: '[inv.pl: 1027: R54 undefined',
        'default': '[inv.pl: 1027: R54 undefined'
      }
    },
    _1033_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1033,
        dfh_identifier_in_namespace: 'R60',
        dfh_has_domain: 261,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 261,
      label: {
        sg: '[inv.sg: 1033: R60 undefined',
        pl: '[inv.pl: 1033: R60 undefined',
        'default': '[inv.pl: 1033: R60 undefined'
      }
    },
    _1034_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1034,
        dfh_identifier_in_namespace: 'R61',
        dfh_has_domain: 262,
        dfh_has_range: 53,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 262,
      label: {
        sg: '[inv.sg: 1034: R61 undefined',
        pl: '[inv.pl: 1034: R61 undefined',
        'default': '[inv.pl: 1034: R61 undefined'
      }
    },
    _1035_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1036_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1036,
        dfh_identifier_in_namespace: 'R63',
        dfh_has_domain: 262,
        dfh_has_range: 1,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 262,
      label: {
        sg: '[inv.sg: 1036: R63 undefined',
        pl: '[inv.pl: 1036: R63 undefined',
        'default': '[inv.pl: 1036: R63 undefined'
      }
    },
    _1037_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1037,
        dfh_identifier_in_namespace: 'R64',
        dfh_has_domain: 262,
        dfh_has_range: 40,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 262,
      label: {
        sg: '[inv.sg: 1037: R64 undefined',
        pl: '[inv.pl: 1037: R64 undefined',
        'default': '[inv.pl: 1037: R64 undefined'
      }
    },
    _1043_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1044_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1059_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1066_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1066,
        dfh_identifier_in_namespace: 'histP7',
        dfh_has_domain: 212,
        dfh_has_range: 449,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1110_ingoing: {
      type: 'PropertyField',
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
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1110: histP8 undefined',
        pl: '[inv.pl: 1110: histP8 undefined',
        'default': '[inv.pl: 1110: histP8 undefined'
      }
    },
    _1111_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 365,
      label: {
        sg: '[inv.sg: 1111: histP9 undefined',
        pl: '[inv.pl: 1111: histP9 undefined',
        'default': '[inv.pl: 1111: histP9 undefined'
      }
    },
    _1112_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: 'Name with this language',
        pl: 'Names with this language',
        'default': 'Names with this language'
      }
    },
    _1113_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: 'Names with this details',
        pl: 'Name with this details',
        'default': 'Names with this details'
      }
    },
    _1178_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Entities localized here',
        pl: 'Entities localized here',
        'default': 'Entities localized here'
      }
    },
    _1180_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Localization relative to Place',
        pl: 'Localizations relative to Place',
        'default': 'Localizations relative to Place'
      }
    },
    _1181_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 84,
      label: {
        sg: 'Georeference',
        pl: 'Georeferences',
        'default': 'Georeferences'
      }
    },
    _1182_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Localization relative to Place',
        pl: 'Localizations relative to Place',
        'default': 'Localizations relative to Place'
      }
    },
    _1183_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: '[inv.sg: 1183: histP14 undefined',
        pl: '[inv.pl: 1183: histP14 undefined',
        'default': '[inv.pl: 1183: histP14 undefined'
      }
    },
    _1184_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 84,
      label: {
        sg: 'Georeference',
        pl: 'Georeferences',
        'default': 'Georeferences'
      }
    },
    _1185_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 212,
      label: {
        sg: 'Localization relative to Place',
        pl: 'Localizations relative to Place',
        'default': 'Localizations relative to Place'
      }
    },
    _1186_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1187_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1188_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1189_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1190_ingoing: {
      type: 'PropertyField',
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
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1191_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1192_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1193_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1194_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1195_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1196_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 78,
      label: {
        sg: 'Joined a group',
        pl: 'Joined a group',
        'default': 'Joined a group'
      }
    },
    _1197_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 78,
      label: {
        sg: 'Joined a group',
        pl: 'Joined a group',
        'default': 'Joined a group'
      }
    },
    _1198_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 79,
      label: {
        sg: 'Left Group',
        pl: 'Left Groups',
        'default': 'Left Groups'
      }
    },
    _1199_ingoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 79,
      label: {
        sg: 'Left Group',
        pl: 'Left Groups',
        'default': 'Left Groups'
      }
    },
    _1200_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1201_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1202_ingoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1204_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1204,
        dfh_identifier_in_namespace: 'histP19',
        dfh_has_domain: 68,
        dfh_has_range: 451,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 68,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1205_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1205,
        dfh_identifier_in_namespace: 'histP20',
        dfh_has_domain: 220,
        dfh_has_range: 450,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 220,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1206_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1206,
        dfh_identifier_in_namespace: 'histP21',
        dfh_has_domain: 219,
        dfh_has_range: 452,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1207_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1207,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: 'Title / Name',
        pl: 'Titles / Names',
        'default': 'Titles / Names'
      }
    },
    _1208_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1208,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: 'Archive Reference',
        pl: 'Archive Reference',
        'default': 'Archive Reference'
      }
    },
    _1209_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1209,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 221,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: '[inv.sg: 1209: histP9 undefined',
        pl: '[inv.pl: 1209: histP9 undefined',
        'default': '[inv.pl: 1209: histP9 undefined'
      }
    },
    _1210_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1210,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 450,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
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
    _1211_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1211,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 452,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
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
    _1212_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1212,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 449,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
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
    _1213_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1213,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 451,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
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
    _1214_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1214,
        dfh_identifier_in_namespace: 'histP22',
        dfh_has_domain: 218,
        dfh_has_range: 454,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 218,
      label: {
        sg: 'Is Type of',
        pl: 'Is Type of',
        'default': 'Is Type of'
      }
    },
    _1215_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1215,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 454,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
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
    _1216_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1216,
        dfh_identifier_in_namespace: 'geovP1',
        dfh_has_domain: 455,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 455,
      label: {
        sg: '[inv.sg: 1216: geovP1 undefined',
        pl: '[inv.pl: 1216: geovP1 undefined',
        'default': '[inv.pl: 1216: geovP1 undefined'
      }
    },
    _1220_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1220,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 455,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: '[inv.sg: 1220: histP9 undefined',
        pl: '[inv.pl: 1220: histP9 undefined',
        'default': '[inv.pl: 1220: histP9 undefined'
      }
    },
    _1221_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1221,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: '[inv.sg: 1221: histP9 undefined',
        pl: '[inv.pl: 1221: histP9 undefined',
        'default': '[inv.pl: 1221: histP9 undefined'
      }
    },
    _1222_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1222,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 365,
      label: {
        sg: '[inv.sg: 1222: histP9 undefined',
        pl: '[inv.pl: 1222: histP9 undefined',
        'default': '[inv.pl: 1222: histP9 undefined'
      }
    },
    _1223_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1223,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 1223: geovP2 undefined',
        pl: '[inv.pl: 1223: geovP2 undefined',
        'default': '[inv.pl: 1223: geovP2 undefined'
      }
    },
    _1224_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1224,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 1224: geovP2 undefined',
        pl: '[inv.pl: 1224: geovP2 undefined',
        'default': '[inv.pl: 1224: geovP2 undefined'
      }
    },
    _1225_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1225,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1225: geovP2 undefined',
        pl: '[inv.pl: 1225: geovP2 undefined',
        'default': '[inv.pl: 1225: geovP2 undefined'
      }
    },
    _1226_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1226,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1226: geovP2 undefined',
        pl: '[inv.pl: 1226: geovP2 undefined',
        'default': '[inv.pl: 1226: geovP2 undefined'
      }
    },
    _1227_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1227,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1227: geovP2 undefined',
        pl: '[inv.pl: 1227: geovP2 undefined',
        'default': '[inv.pl: 1227: geovP2 undefined'
      }
    },
    _1228_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1228,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1228: geovP2 undefined',
        pl: '[inv.pl: 1228: geovP2 undefined',
        'default': '[inv.pl: 1228: geovP2 undefined'
      }
    },
    _1229_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1229,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 1229: geovP2 undefined',
        pl: '[inv.pl: 1229: geovP2 undefined',
        'default': '[inv.pl: 1229: geovP2 undefined'
      }
    },
    _1230_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1230,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 1230: geovP2 undefined',
        pl: '[inv.pl: 1230: geovP2 undefined',
        'default': '[inv.pl: 1230: geovP2 undefined'
      }
    },
    _1231_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1231,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 1231: geovP2 undefined',
        pl: '[inv.pl: 1231: geovP2 undefined',
        'default': '[inv.pl: 1231: geovP2 undefined'
      }
    },
    _1232_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1232,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 1232: geovP2 undefined',
        pl: '[inv.pl: 1232: geovP2 undefined',
        'default': '[inv.pl: 1232: geovP2 undefined'
      }
    },
    _1233_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1233,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1233: geovP2 undefined',
        pl: '[inv.pl: 1233: geovP2 undefined',
        'default': '[inv.pl: 1233: geovP2 undefined'
      }
    },
    _1234_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1234,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1234: geovP2 undefined',
        pl: '[inv.pl: 1234: geovP2 undefined',
        'default': '[inv.pl: 1234: geovP2 undefined'
      }
    },
    _1235_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1235,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1235: geovP2 undefined',
        pl: '[inv.pl: 1235: geovP2 undefined',
        'default': '[inv.pl: 1235: geovP2 undefined'
      }
    },
    _1236_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1236,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1236: geovP2 undefined',
        pl: '[inv.pl: 1236: geovP2 undefined',
        'default': '[inv.pl: 1236: geovP2 undefined'
      }
    },
    _1237_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1237,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 1237: geovP2 undefined',
        pl: '[inv.pl: 1237: geovP2 undefined',
        'default': '[inv.pl: 1237: geovP2 undefined'
      }
    },
    _1238_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1238,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 1238: geovP2 undefined',
        pl: '[inv.pl: 1238: geovP2 undefined',
        'default': '[inv.pl: 1238: geovP2 undefined'
      }
    },
    _1239_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1239,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: '[inv.sg: 1239: geovP2 undefined',
        pl: '[inv.pl: 1239: geovP2 undefined',
        'default': '[inv.pl: 1239: geovP2 undefined'
      }
    },
    _1240_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1240,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: '[inv.sg: 1240: geovP2 undefined',
        pl: '[inv.pl: 1240: geovP2 undefined',
        'default': '[inv.pl: 1240: geovP2 undefined'
      }
    },
    _1241_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1241,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 363,
      label: {
        sg: '[inv.sg: 1241: geovP2 undefined',
        pl: '[inv.pl: 1241: geovP2 undefined',
        'default': '[inv.pl: 1241: geovP2 undefined'
      }
    },
    _1242_ingoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: false,
      property: {
        dfh_pk_property: 1242,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 441,
      label: {
        sg: '[inv.sg: 1242: geovP2 undefined',
        pl: '[inv.pl: 1242: geovP2 undefined',
        'default': '[inv.pl: 1242: geovP2 undefined'
      }
    },
    _4_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 50,
      label: {
        sg: '[sg: 4: P4 undefined',
        pl: '[pl: 4: P4 undefined',
        'default': '[pl: 4: P4 undefined'
      }
    },
    _63_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 63,
        dfh_identifier_in_namespace: 'P72',
        dfh_has_domain: 32,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 54,
      label: {
        sg: '[sg: 63: P72 undefined',
        pl: '[pl: 63: P72 undefined',
        'default': '[pl: 63: P72 undefined'
      }
    },
    _68_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _83_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _84_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: true
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
    _87_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: 'Dissolved Group (Organization)',
        pl: 'Dissolved Groups (Organizations)',
        'default': 'Dissolved Group (Organization)'
      }
    },
    _88_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _95_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _119_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 75,
      label: {
        sg: '[sg: 119: P131 undefined',
        pl: '[pl: 119: P131 undefined',
        'default': '[pl: 119: P131 undefined'
      }
    },
    _131_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _133_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 68,
      label: {
        sg: 'Left Group',
        pl: 'Left Groups',
        'default': 'Left Group'
      }
    },
    _139_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _140_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _143_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[sg: 143: P160 undefined',
        pl: '[pl: 143: P160 undefined',
        'default': '[pl: 143: P160 undefined'
      }
    },
    _145_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 51,
      label: {
        sg: 'Geo-Coordinates',
        pl: 'Geo-Coordinates',
        'default': 'Geo-Coordinates'
      }
    },
    _150_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _968_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _969_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _970_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _973_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _974_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _975_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _979_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: 'is contained by',
        pl: 'is contained by',
        'default': 'is contained by'
      }
    },
    _982_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1000_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1000: R26 undefined',
        pl: '[pl: 1000: R26 undefined',
        'default': '[pl: 1000: R26 undefined'
      }
    },
    _1006_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1006,
        dfh_identifier_in_namespace: 'R32',
        dfh_has_domain: 251,
        dfh_has_range: 262,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 262,
      label: {
        sg: '[sg: 1006: R32 undefined',
        pl: '[pl: 1006: R32 undefined',
        'default': '[pl: 1006: R32 undefined'
      }
    },
    _1008_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[sg: 1008: R34 undefined',
        pl: '[pl: 1008: R34 undefined',
        'default': '[pl: 1008: R34 undefined'
      }
    },
    _1013_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 68,
      label: {
        sg: '[sg: 1013: R39 undefined',
        pl: '[pl: 1013: R39 undefined',
        'default': '[pl: 1013: R39 undefined'
      }
    },
    _1015_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1015: R41 undefined',
        pl: '[pl: 1015: R41 undefined',
        'default': '[pl: 1015: R41 undefined'
      }
    },
    _1016_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1016,
        dfh_identifier_in_namespace: 'R42',
        dfh_has_domain: 220,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1016: R42 undefined',
        pl: '[pl: 1016: R42 undefined',
        'default': '[pl: 1016: R42 undefined'
      }
    },
    _1022_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1022: R49 undefined',
        pl: '[pl: 1022: R49 undefined',
        'default': '[pl: 1022: R49 undefined'
      }
    },
    _1027_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1027,
        dfh_identifier_in_namespace: 'R54',
        dfh_has_domain: 251,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 54,
      label: {
        sg: '[sg: 1027: R54 undefined',
        pl: '[pl: 1027: R54 undefined',
        'default': '[pl: 1027: R54 undefined'
      }
    },
    _1033_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1033,
        dfh_identifier_in_namespace: 'R60',
        dfh_has_domain: 261,
        dfh_has_range: 54,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 54,
      label: {
        sg: '[sg: 1033: R60 undefined',
        pl: '[pl: 1033: R60 undefined',
        'default': '[pl: 1033: R60 undefined'
      }
    },
    _1034_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1034,
        dfh_identifier_in_namespace: 'R61',
        dfh_has_domain: 262,
        dfh_has_range: 53,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 53,
      label: {
        sg: '[sg: 1034: R61 undefined',
        pl: '[pl: 1034: R61 undefined',
        'default': '[pl: 1034: R61 undefined'
      }
    },
    _1035_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 68,
      label: {
        sg: '[sg: 1035: R62 undefined',
        pl: '[pl: 1035: R62 undefined',
        'default': '[pl: 1035: R62 undefined'
      }
    },
    _1036_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1036,
        dfh_identifier_in_namespace: 'R63',
        dfh_has_domain: 262,
        dfh_has_range: 1,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 1,
      label: {
        sg: '[sg: 1036: R63 undefined',
        pl: '[pl: 1036: R63 undefined',
        'default': '[pl: 1036: R63 undefined'
      }
    },
    _1037_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1037,
        dfh_identifier_in_namespace: 'R64',
        dfh_has_domain: 262,
        dfh_has_range: 40,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 40,
      label: {
        sg: '[sg: 1037: R64 undefined',
        pl: '[pl: 1037: R64 undefined',
        'default': '[pl: 1037: R64 undefined'
      }
    },
    _1043_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 61,
      label: {
        sg: '[sg: 1043: histP5 undefined',
        pl: '[pl: 1043: histP5 undefined',
        'default': '[pl: 1043: histP5 undefined'
      }
    },
    _1044_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 63,
      label: {
        sg: '[sg: 1044: histP6 undefined',
        pl: '[pl: 1044: histP6 undefined',
        'default': '[pl: 1044: histP6 undefined'
      }
    },
    _1059_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
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
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 50,
      label: {
        sg: '[sg: 1059: Q13 undefined',
        pl: '[pl: 1059: Q13 undefined',
        'default': '[pl: 1059: Q13 undefined'
      }
    },
    _1066_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1066,
        dfh_identifier_in_namespace: 'histP7',
        dfh_has_domain: 212,
        dfh_has_range: 449,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: 1,
        dfh_range_instances_min_quantifier: 0,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 449,
      label: {
        sg: 'Type',
        pl: 'Types',
        'default': 'Types'
      }
    },
    _1110_outgoing: {
      type: 'PropertyField',
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
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 364,
      label: {
        sg: '[sg: 1110: histP8 undefined',
        pl: '[pl: 1110: histP8 undefined',
        'default': '[pl: 1110: histP8 undefined'
      }
    },
    _1111_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1112_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1113_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
    _1178_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 363,
      label: {
        sg: 'Is localized at',
        pl: 'Is localized at',
        'default': 'Is localized at'
      }
    },
    _1180_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 21,
      label: {
        sg: 'Localized Person',
        pl: 'Localized Persons',
        'default': 'Localized Person'
      }
    },
    _1181_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 363,
      label: {
        sg: 'Georeference of Geographical Place',
        pl: 'Georeferences of Geographical Place',
        'default': 'Georeference of Geographical Place'
      }
    },
    _1182_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 0,
      targetClassPk: 68,
      label: {
        sg: 'Localized Group',
        pl: 'Localized Groups',
        'default': 'Localized Group'
      }
    },
    _1183_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1184_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 441,
      label: {
        sg: 'Georeference of Built work',
        pl: 'Georeferencees of Built work',
        'default': 'Georeference of Built work'
      }
    },
    _1185_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 441,
      label: {
        sg: 'Localized Built work',
        pl: 'Localized Built work',
        'default': 'Localized Built work'
      }
    },
    _1186_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _1188_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
      type: 'PropertyField',
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
        identity_defining: false
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
    _1190_outgoing: {
      type: 'PropertyField',
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
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 0,
      targetClassPk: 443,
      label: {
        sg: 'Type',
        pl: 'Types',
        'default': 'Types'
      }
    },
    _1191_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
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
    _1192_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
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
      type: 'PropertyField',
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
        identity_defining: true
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
      type: 'PropertyField',
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
        identity_defining: true
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
      type: 'PropertyField',
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
        identity_defining: true
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
    _1196_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 21,
      label: {
        sg: 'Person that becomes member',
        pl: 'Persons that become member',
        'default': 'Person that becomes member'
      }
    },
    _1197_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 68,
      label: {
        sg: 'Group that becomes member',
        pl: 'Groups that become member',
        'default': 'Group that becomes member'
      }
    },
    _1198_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 21,
      label: {
        sg: 'Person that left the Group',
        pl: 'Persons that left the Group',
        'default': 'Person that left the Group'
      }
    },
    _1199_outgoing: {
      type: 'PropertyField',
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
        identity_defining: false
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 68,
      label: {
        sg: 'Group that left the Group',
        pl: 'Groups that left the Group',
        'default': 'Group that left the Group'
      }
    },
    _1200_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 364,
      label: {
        sg: 'Term/Label of Geographical place type',
        pl: 'Term/Label of Geographical place types',
        'default': 'Term/Label of Geographical place type'
      }
    },
    _1201_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 443,
      label: {
        sg: 'Term/Label of Built work type',
        pl: 'Term/Label of Built work types',
        'default': 'Term/Label of Built work type'
      }
    },
    _1202_outgoing: {
      type: 'PropertyField',
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
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 219,
      label: {
        sg: 'Serially Produced Object',
        pl: 'Serially Produced Objects',
        'default': 'Serially Produced Object'
      }
    },
    _1204_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1204,
        dfh_identifier_in_namespace: 'histP19',
        dfh_has_domain: 68,
        dfh_has_range: 451,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 451,
      label: {
        sg: 'Type',
        pl: 'Types',
        'default': 'Types'
      }
    },
    _1205_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1205,
        dfh_identifier_in_namespace: 'histP20',
        dfh_has_domain: 220,
        dfh_has_range: 450,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 450,
      label: {
        sg: 'Type',
        pl: 'Type',
        'default': 'Type'
      }
    },
    _1206_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1206,
        dfh_identifier_in_namespace: 'histP21',
        dfh_has_domain: 219,
        dfh_has_range: 452,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 452,
      label: {
        sg: 'Type',
        pl: 'Types',
        'default': 'Types'
      }
    },
    _1207_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1207,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 218,
      label: {
        sg: 'Is Title / Name of Expression',
        pl: 'Is Title / Name of Expression',
        'default': 'Is Title / Name of Expression'
      }
    },
    _1208_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1208,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 220,
      label: {
        sg: 'Unique Object  with this Name',
        pl: 'Unique Object  with this Name',
        'default': 'Unique Object  with this Name'
      }
    },
    _1209_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1209,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 221,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 221,
      label: {
        sg: '[sg: 1209: histP9 undefined',
        pl: '[pl: 1209: histP9 undefined',
        'default': '[sg: 1209: histP9 undefined'
      }
    },
    _1210_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1210,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 450,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 450,
      label: {
        sg: 'Term/Label of Manifestation singleton type',
        pl: 'Term/Label of Manifestation singleton type',
        'default': 'Term/Label of Manifestation singleton type'
      }
    },
    _1211_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1211,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 452,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 452,
      label: {
        sg: 'Term/Label of Type of manifestation product type',
        pl: 'Term/Label of Type of manifestation product type',
        'default': 'Term/Label of Type of manifestation product type'
      }
    },
    _1212_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1212,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 449,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 449,
      label: {
        sg: '[sg: 1212: histP9 undefined',
        pl: '[pl: 1212: histP9 undefined',
        'default': '[sg: 1212: histP9 undefined'
      }
    },
    _1213_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1213,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 451,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 451,
      label: {
        sg: '[sg: 1213: histP9 undefined',
        pl: '[pl: 1213: histP9 undefined',
        'default': '[sg: 1213: histP9 undefined'
      }
    },
    _1214_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1214,
        dfh_identifier_in_namespace: 'histP22',
        dfh_has_domain: 218,
        dfh_has_range: 454,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 454,
      label: {
        sg: 'Type',
        pl: 'Types',
        'default': 'Types'
      }
    },
    _1215_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1215,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 454,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 454,
      label: {
        sg: '[sg: 1215: histP9 undefined',
        pl: '[pl: 1215: histP9 undefined',
        'default': '[sg: 1215: histP9 undefined'
      }
    },
    _1216_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1216,
        dfh_identifier_in_namespace: 'geovP1',
        dfh_has_domain: 455,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: null,
        dfh_domain_instances_min_quantifier: null,
        dfh_domain_instances_max_quantifier: null,
        dfh_range_instances_min_quantifier: null,
        dfh_range_instances_max_quantifier: null,
        identity_defining: false
      },
      targetMaxQuantity: null,
      targetMinQuantity: null,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1216: geovP1 undefined',
        pl: '[pl: 1216: geovP1 undefined',
        'default': '[pl: 1216: geovP1 undefined'
      }
    },
    _1220_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1220,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 455,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 455,
      label: {
        sg: '[sg: 1220: histP9 undefined',
        pl: '[pl: 1220: histP9 undefined',
        'default': '[sg: 1220: histP9 undefined'
      }
    },
    _1221_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1221,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 456,
      label: {
        sg: '[sg: 1221: histP9 undefined',
        pl: '[pl: 1221: histP9 undefined',
        'default': '[sg: 1221: histP9 undefined'
      }
    },
    _1222_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1222,
        dfh_identifier_in_namespace: 'histP9',
        dfh_has_domain: 365,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1111,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: 1,
        identity_defining: true
      },
      targetMaxQuantity: 1,
      targetMinQuantity: 1,
      targetClassPk: 457,
      label: {
        sg: '[sg: 1222: histP9 undefined',
        pl: '[pl: 1222: histP9 undefined',
        'default': '[sg: 1222: histP9 undefined'
      }
    },
    _1223_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1223,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 457,
      label: {
        sg: '[sg: 1223: geovP2 undefined',
        pl: '[pl: 1223: geovP2 undefined',
        'default': '[pl: 1223: geovP2 undefined'
      }
    },
    _1224_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1224,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 457,
      label: {
        sg: '[sg: 1224: geovP2 undefined',
        pl: '[pl: 1224: geovP2 undefined',
        'default': '[pl: 1224: geovP2 undefined'
      }
    },
    _1225_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1225,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 457,
      label: {
        sg: '[sg: 1225: geovP2 undefined',
        pl: '[pl: 1225: geovP2 undefined',
        'default': '[pl: 1225: geovP2 undefined'
      }
    },
    _1226_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1226,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 457,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 457,
      label: {
        sg: '[sg: 1226: geovP2 undefined',
        pl: '[pl: 1226: geovP2 undefined',
        'default': '[pl: 1226: geovP2 undefined'
      }
    },
    _1227_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1227,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 456,
      label: {
        sg: '[sg: 1227: geovP2 undefined',
        pl: '[pl: 1227: geovP2 undefined',
        'default': '[pl: 1227: geovP2 undefined'
      }
    },
    _1228_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1228,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 456,
      label: {
        sg: '[sg: 1228: geovP2 undefined',
        pl: '[pl: 1228: geovP2 undefined',
        'default': '[pl: 1228: geovP2 undefined'
      }
    },
    _1229_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1229,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 456,
      label: {
        sg: '[sg: 1229: geovP2 undefined',
        pl: '[pl: 1229: geovP2 undefined',
        'default': '[pl: 1229: geovP2 undefined'
      }
    },
    _1230_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1230,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 456,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 456,
      label: {
        sg: '[sg: 1230: geovP2 undefined',
        pl: '[pl: 1230: geovP2 undefined',
        'default': '[pl: 1230: geovP2 undefined'
      }
    },
    _1231_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1231,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1231: geovP2 undefined',
        pl: '[pl: 1231: geovP2 undefined',
        'default': '[pl: 1231: geovP2 undefined'
      }
    },
    _1232_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1232,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1232: geovP2 undefined',
        pl: '[pl: 1232: geovP2 undefined',
        'default': '[pl: 1232: geovP2 undefined'
      }
    },
    _1233_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1233,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1233: geovP2 undefined',
        pl: '[pl: 1233: geovP2 undefined',
        'default': '[pl: 1233: geovP2 undefined'
      }
    },
    _1234_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1234,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 219,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 219,
      label: {
        sg: '[sg: 1234: geovP2 undefined',
        pl: '[pl: 1234: geovP2 undefined',
        'default': '[pl: 1234: geovP2 undefined'
      }
    },
    _1235_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1235,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1235: geovP2 undefined',
        pl: '[pl: 1235: geovP2 undefined',
        'default': '[pl: 1235: geovP2 undefined'
      }
    },
    _1236_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1236,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1236: geovP2 undefined',
        pl: '[pl: 1236: geovP2 undefined',
        'default': '[pl: 1236: geovP2 undefined'
      }
    },
    _1237_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1237,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1237: geovP2 undefined',
        pl: '[pl: 1237: geovP2 undefined',
        'default': '[pl: 1237: geovP2 undefined'
      }
    },
    _1238_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1238,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 218,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 218,
      label: {
        sg: '[sg: 1238: geovP2 undefined',
        pl: '[pl: 1238: geovP2 undefined',
        'default': '[pl: 1238: geovP2 undefined'
      }
    },
    _1239_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1239,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 21,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 220,
      label: {
        sg: '[sg: 1239: geovP2 undefined',
        pl: '[pl: 1239: geovP2 undefined',
        'default': '[pl: 1239: geovP2 undefined'
      }
    },
    _1240_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1240,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 68,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 220,
      label: {
        sg: '[sg: 1240: geovP2 undefined',
        pl: '[pl: 1240: geovP2 undefined',
        'default': '[pl: 1240: geovP2 undefined'
      }
    },
    _1241_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1241,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 363,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 220,
      label: {
        sg: '[sg: 1241: geovP2 undefined',
        pl: '[pl: 1241: geovP2 undefined',
        'default': '[pl: 1241: geovP2 undefined'
      }
    },
    _1242_outgoing: {
      type: 'PropertyField',
      hasAlternatives: false,
      isViewMode: false,
      toggle: 'expanded',
      isOutgoing: true,
      property: {
        dfh_pk_property: 1242,
        dfh_identifier_in_namespace: 'geovP2',
        dfh_has_domain: 441,
        dfh_has_range: 220,
        dfh_fk_property_of_origin: 1218,
        dfh_domain_instances_min_quantifier: 0,
        dfh_domain_instances_max_quantifier: -1,
        dfh_range_instances_min_quantifier: 1,
        dfh_range_instances_max_quantifier: -1,
        identity_defining: false
      },
      targetMaxQuantity: -1,
      targetMinQuantity: 1,
      targetClassPk: 220,
      label: {
        sg: '[sg: 1242: geovP2 undefined',
        pl: '[pl: 1242: geovP2 undefined',
        'default': '[pl: 1242: geovP2 undefined'
      }
    },
    _field_48: {
      type: 'ExistenceTimeDetail',
      roles: [],
      toggle: 'expanded',
      fkClassField: 48,
      label: {
        'default': 'When',
        sg: 'When',
        pl: 'When'
      }
    },
    _field_217: {
      type: 'TextPropertyField',
      toggle: 'expanded',
      fkClassField: 217,
      label: {
        'default': 'Short Title',
        sg: 'Short Title',
        pl: 'Short Title'
      }
    },
    _field_218: {
      type: 'TextPropertyField',
      toggle: 'expanded',
      fkClassField: 218,
      label: {
        'default': 'Exact Reference',
        sg: 'Exact Reference',
        pl: 'Exact Reference'
      }
    },
    _field_219: {
      type: 'TextPropertyField',
      toggle: 'expanded',
      fkClassField: 219,
      label: {
        'default': 'Entity Definition',
        sg: 'Entity Definition',
        pl: 'Entity Definition'
      }
    }
  }
}
