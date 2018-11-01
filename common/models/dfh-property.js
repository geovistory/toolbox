'use strict';

const Config = require('../config/Config');

module.exports = function (DfhProperty) {



    DfhProperty.propertyByDomainClass = function (dfh_pk_property, cb) {



        const filter = {
            /** 
             * Select persistent items by pk_entity
             */
            // "where": ["dfh_pk_class", "NOT IN", blackList],
            // "orderBy": [{
            //     "pk_entity": "asc"
            // }],
            "include": {
                "labels": {
                    "$relation": {
                        "name": "labels",
                        "joinType": "left join",
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
                ,
                "domain_class": {
                    "$relation": {
                        "name": "domain_class",
                        "joinType": "left join"
                    }
                },
                // "range_class": {
                //     "$relation": {
                //         "name": "range_class",
                //         "joinType": "left join"
                //     }
                // }
            }
        }

        return DfhProperty.findComplex(filter, cb)

    }


    DfhProperty.propertyFieldInfo = function (isOutgoing, cb) {

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
                "dfh_range_instances_max_quantifier",
                "identity_defining"
            ]
        };


        const labels = {
            "$relation": {
                "name": "labels",
                "joinType": "left join",
                select: { include: ["dfh_label", "com_fk_system_type"] },
                "where": [
                    "com_fk_system_type", "IN", [
                        Config.PROPERTY_LABEL_SG,
                        Config.PROPERTY_LABEL_PL,
                        Config.PROPERTY_LABEL_INVERSED_SG,
                        Config.PROPERTY_LABEL_INVERSED_PL
                    ]
                ]
            }
        };

        const ui_context_config = {
            "$relation": {
                "name": "ui_context_config",
                "joinType": "inner join",
                select: false,
                "where": [
                    "property_is_outgoing", "=", JSON.stringify(isOutgoing)
                    // , "AND",
                    // "ord_num", "IS NOT NULL"
                ],
            }

        }

        const filter = {
            select: propertiesSelect,
            include: {
                labels,
                ui_context_config
            }
        }

        return DfhProperty.findComplex(filter, cb)

    }

};
