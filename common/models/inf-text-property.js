'use strict';

module.exports = function (InfTextProperty) {

    InfTextProperty.findOrCreateInfTextProperty = function (pkProject, data, ctx) {

        const dataObject = {
            text_property_quill_doc: data.text_property_quill_doc,
            fk_class_field: data.fk_class_field,
            fk_concerned_entity: data.fk_concerned_entity,
            fk_language: data.fk_language
        };

        const requestedObj = ctx ? ctx.req.body : undefined;

        return InfTextProperty.findOrCreateByValue(InfTextProperty, pkProject, dataObject, requestedObj).then(
            textProperties => {
                const txtProp = textProperties[0].toJSON();
                return InfTextProperty.app.models.InfLanguage.findById(txtProp.fk_language).then(
                    language => {
                        txtProp.language = language;
                        return [txtProp]
                    }
                )
            }
        )

    }
};
