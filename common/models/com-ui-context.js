'use strict';

module.exports = function (ComUiContext) {

    ComUiContext.uiConfig = function (pk_ui_context, pk_project, cb) {


        let filter = {
            include: {
                ui_context_config: {
                    $relation: {
                        name: "ui_context_config",
                        joinType: "left join"
                    },
                    property: {
                        $relation: {
                            name: "property",
                            joinType: "left join",
                            orderBy: [{ pk_entity: "asc" }],
                        }
                    },
                    property_set: {
                        $relation: {
                            name: "property_set",
                            joinType: "left join",
                            orderBy: [{ pk_entity: "asc" }]
                        },
                        property_set_class_rels: {
                            $relation: {
                                name: 'property_set_class_rels',
                                joinType: "left join",
                                orderBy: [{ pk_entity: "asc" }]
                            }
                        }
                    }
                }
            }
        }

        if (pk_ui_context)
            filter.where = ["pk_entity", "=", pk_ui_context];

        return ComUiContext.findComplex(filter, cb)
            // .then(())

    }
}