'use strict';

module.exports = function (ComClassHasTypeProperty) {
    ComClassHasTypeProperty.readableList = function (cb) {
        const sql_stmt = `
        select 
        cpre1.dfh_pk_class as pk_typed_class,
        cpre1.class_label as typed_class_label,
        p.dfh_pk_property,
        concat_ws(': ',  p.dfh_identifier_in_namespace, p.dfh_standard_label) property_label,
        cpre2.dfh_pk_class as pk_type_class,
        cpre2.class_label as type_class_label
        from commons.class_has_type_property ctp
        JOIN data_for_history.property p ON p.dfh_pk_property = ctp.fk_property
        JOIN warehouse.class_preview cpre1 on cpre1.dfh_pk_class = ctp.fk_class
        JOIN warehouse.class_preview cpre2 on cpre2.dfh_pk_class = p.dfh_has_range
        `
        const connector = ComClassHasTypeProperty.dataSource.connector;

        connector.execute(sql_stmt, [], (err, resultObjects) => {
            if (err) return cb(err);

            cb(null, resultObjects)

        });

    }
};
