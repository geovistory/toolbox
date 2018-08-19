'use strict';

module.exports = function(DfhProperty) {



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

};
