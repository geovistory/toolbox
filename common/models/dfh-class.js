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
};
