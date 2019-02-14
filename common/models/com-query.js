'use strict';

module.exports = function (ComQuery) {

    ComQuery.run = function (pkProject, cb) {
        const WarEntityPreview = ComQuery.app.models.WarEntityPreview;

        const filter = {
            select: {
                include: [
                    'pk_entity', 'entity_label', 'class_label', 'entity_type'
                ]
            },
            where: [
                'fk_project', '=', pkProject,
                'AND',
                [
                    'fk_class', 'IN', [363],
                    'OR',
                    'fk_type', 'IN', [80412]
                ]
            ],
            include: {
                // Filter rows (inner join)
                _filter_pi_roles: {
                    "$relation": {
                        select: false,
                        "name": "pi_roles",
                        "joinType": "inner join",
                        where: [
                            'fk_property', 'IN', [1181]
                        ]
                    },
                },

                // Select columns (left join)
                _select_geburten: {
         
                    "$relation": {
                        "name": "pi_roles",
                        "joinType": "left join",
                        where: [
                            'fk_property', 'IN', [1181]
                        ]
                    },
                    temporal_entity_preview: {
                        "$relation": {
                            "name": "temporal_entity_preview",
                            "joinType": "left join",
                            where: [
                                'fk_project', '=', pkProject
                            ]
                        },
                       // ...WarEntityPreview.getTeEnIncludeObject(true, pkProject)
                    }
                }
            }
        };

        WarEntityPreview.findComplex(filter, (err, results) => {
            if (err) return cb(err);

            const flattened = results.map(row => {
                
                // for each row get the selected columns and flatten them to one value
                row.geburten = [];
                row._select_geburten.forEach(ro => {
                    row.geburten.push(ro.temporal_entity_preview)
                })
                delete row._select_geburten;
                return row;
            })
            
            cb(false, flattened);
        })

    };

};
