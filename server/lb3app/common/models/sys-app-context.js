'use strict';

module.exports = function (SysAppContext) {

    SysAppContext.appContext = function (pk_app_context, pk_project, cb) {


        let filter = {
            include: {
                class_field_config: {
                    $relation: {
                        name: "class_field_config",
                        joinType: "left join"
                    },
                    property: {
                        $relation: {
                            name: "property",
                            joinType: "left join",
                            orderBy: [{ pk_entity: "asc" }],
                        }
                    },
                    class_field: {
                        $relation: {
                            name: "class_field",
                            joinType: "left join",
                            orderBy: [{ pk_entity: "asc" }]
                        }
                    }
                }
            }
        }

        if (pk_app_context)
            filter.where = ["pk_entity", "=", pk_app_context];

        return SysAppContext.findComplex(filter, cb)
            // .then(())

    }
}