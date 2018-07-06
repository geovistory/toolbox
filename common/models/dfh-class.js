'use strict';

module.exports = function (DfhClass) {

  DfhClass.selectedPeItClassesOfProfile = function (dfh_pk_profile, cb) {

    const blackList = [
      75, // Actor Appellation
      364 // Geographical Place Type
    ]

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
        "property_set_class_rel": {
          "$relation": {
            "name": "property_set_class_rel",
            "joinType": "left join",
            select: { include: [] }
          },
          property_set: {
            $relation: {
              name: "property_set",
              joinType: "left join",
              "orderBy": [{ "pk_entity": "asc" }]
            },
            ui_context_configs: {
              "$relation": {
                "name": "ui_context_configs",
                "joinType": "left join",
                "where": [
                  "fk_project", ...(pk_project ? ['=', pk_project] : ['IS NULL']), 'AND',
                  "fk_ui_context", '=', pk_ui_context
                ],
              }
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

};
