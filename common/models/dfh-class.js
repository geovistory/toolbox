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
  DfhClass.propertiesAndUiElements = function (pk_class, cb) {


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
            select: false
          }
        },
        "ingoing_properties": {
          "$relation": {
            "name": "ingoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          labels
        },
        "outgoing_properties": {
          "$relation": {
            "name": "outgoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          labels
        },
        "ui_class_config": {
          "$relation": {
            "name": "ui_class_config",
            "joinType": "left join",
          },
          "ui_context": {
            "$relation": {
              "name": "ui_context",
              "joinType": "left join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            }
          },
          "target_ui_context": {
            "$relation": {
              "name": "target_ui_context",
              "joinType": "left join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
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
