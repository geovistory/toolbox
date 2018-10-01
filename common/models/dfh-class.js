'use strict';

module.exports = function (DfhClass) {

  /**
   * Black list of classes that should never be directly used by users 
   * to produce instances
   */
  const blackList = [
    75, // Actor Appellation
    364, // Geographical Place Type
    443 // Built work Type
  ]

  /**
   * the pk of the technical profile
   * used to exclude classes of that profile
   */
  const technicalProfilePk = 5;

  DfhClass.selectedPeItClassesOfProfile = function (dfh_pk_profile, cb) {

    const filter = {
      /** 
       * Select persistent items by pk_entity
       */
      "where": ["dfh_pk_class", "NOT IN", blackList],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "class_profile_view": {
          "$relation": {
            select: "false",
            "name": "class_profile_view",
            "joinType": "inner join",
            "where": [
              "dfh_profile_association_type", "=", "selected", "and",
              "dfh_type_label", "=", "Persistent Item"
            ],
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "text_properties": {
          "$relation": {
            "name": "text_properties",
            "joinType": "left join"
          }
        }
      }
    }

    return DfhClass.findComplex(filter, cb)

  }


  /** 
   * Query classes 
   * where:
   * - they are are selected (and thus not inferred)
   * 
   * include:
   * - text_properties
   */
  DfhClass.selectedClassesOfProfile = function (dfh_pk_profile, cb) {

    const filter = {
      // "where": ["dfh_pk_class", "NOT IN", blackList],
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "class_profile_view": {
          "$relation": {
            // select: "false",
            "name": "class_profile_view",
            "joinType": "inner join",
            "where": [
              "dfh_profile_association_type", "=", "selected",
              ...(dfh_pk_profile ? ["and", "dfh_fk_profile", "=", dfh_pk_profile] : [])
            ],
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "text_properties": {
          "$relation": {
            "name": "text_properties",
            "joinType": "left join"
          }
        }
      }
    }

    return DfhClass.findComplex(filter, cb)

  }



  /**
   * Gets:
   *    - Ingoing and Outgoing DfhProperties of Class, including
   *        - Boolean that indicates
   *    - Ui elements of the class
   *    
   */
  DfhClass.propertiesAndUiElements = function (pk_class, pk_ui_context, pk_project, cb) {

    const propertiesSelect = {
      include: [
        "dfh_pk_property",
        "dfh_identifier_in_namespace",
        "dfh_has_domain",
        "dfh_has_range",
        "dfh_fk_property_of_origin",
        "dfh_domain_instances_min_quantifier",
        "dfh_domain_instances_max_quantifier",
        "dfh_range_instances_min_quantifier",
        "dfh_range_instances_max_quantifier"
      ]
    };

    const property_profile_view = {
      "$relation": {
        "name": "property_profile_view",
        "joinType": "inner join",
        "where": [
          "removed_from_api", "=", "false"
        ],
        select: false
      }
    };


    const labels = {
      "$relation": {
        "name": "labels",
        "joinType": "left join",
        select: { include: ["dfh_label", "notes"] },
        "where": [
          "notes", "IN", ['label.sg', 'label.pl', 'label_inversed.sg', 'label_inversed.pl']
        ],
      }
    };

    const ui_context_config = (isOutgoing) => {
      return {
        "$relation": {
          "name": "ui_context_config",
          "joinType": "left join",
          "where": [
            "property_is_outgoing", "=", JSON.stringify(isOutgoing), 'AND',
            "fk_project", ...(pk_project ? ['=', pk_project] : ['IS NULL']), 'AND',
            "fk_ui_context", '=', pk_ui_context
          ],
        }
      }
    }

    const filter = {
      select: {
        include: ["dfh_pk_class", "dfh_identifier_in_namespace", "dfh_standard_label"]
      },
      "include": {
        "class_profile_view": {
          "$relation": {
            "name": "class_profile_view",
            "joinType": "inner join",
            "where": [
              "dfh_profile_association_type", "=", "selected"
            ],
            select: { include: ['dfh_fk_system_type', 'dfh_type_label'] }
          }
        },
        "ingoing_properties": {
          "$relation": {
            "name": "ingoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          ui_context_config: ui_context_config(false),
          labels,
        },
        "outgoing_properties": {
          "$relation": {
            "name": "outgoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          ui_context_config: ui_context_config(true),
          labels
        },
        "ui_context_configs": {
          "$relation": {
            "name": "ui_context_configs",
            "joinType": "left join",
            where: ["fk_ui_context", '=', pk_ui_context]
          },
          property_set: {
            $relation: {
              name: "property_set",
              joinType: "left join",
              "orderBy": [{ "pk_entity": "asc" }]
            }
          }
        },
      }
    }

    if (pk_class) {
      filter.where = [
        'dfh_pk_class', '=', pk_class
      ]
    }

    return DfhClass.findComplex(filter, cb);

  }

  /**
   * Get a list of classes for the poject-settings > data-settings page.
   * 
   * This list includes
   * - All classes that a user (project admin) can disable / enable
   *
   * This list excludes
   * - Inferred classes
   * - Classes in the technical profile
   * 
   * Those relations are eager loaded for each class
   * - Text properties: used for displaying some class description
   * - Class profile view: used to distinguish teEnt from PeIt and to show profile names
   * - Proj rel: used to see if enabled or disabled for project
   * 
   * @param pk_project the pk of the project
   * 
   */
  DfhClass.projectSettingsClassList = function (pk_project, cb) {


    const filter = {
      /** 
       * Select persistent items by pk_entity
       */
      select: {
        include: [
          "pk_entity",
          "dfh_pk_class",
          "dfh_standard_label"
        ]
      },
      "orderBy": [{
        "pk_entity": "asc"
      }],
      "include": {
        "class_profile_view": {
          "$relation": {
            select: {
              include: [
                "dfh_fk_system_type",
                "dfh_fk_profile",
                "dfh_profile_label"
              ]
            },
            "name": "class_profile_view",
            "joinType": "inner join",
            "where": [
              "dfh_profile_association_type", "=", "selected", "and",
              "dfh_fk_profile", "!=", technicalProfilePk
            ],
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "text_properties": {
          "$relation": {
            select: {
              include: [
                "dfh_language_iso_code",
                "dfh_text_property"
              ]
            },
            "name": "text_properties",
            "joinType": "left join"
          }
        },
        "proj_rels": {
          "$relation": {
            "name": "proj_rels",
            "where": [
              "fk_project", "=", pk_project,
            ],
            "joinType": "left join"
          }
        }
      }
    }

    return DfhClass.findComplex(filter, cb)

  }


};
