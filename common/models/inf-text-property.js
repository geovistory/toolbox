'use strict';

module.exports = function (InfTextProperty) {

    InfTextProperty.findOrCreateInfTextProperty = function (projectId, data, ctx) {

        const dataObject = {
            text_property_quill_doc: JSON.stringify(data.text_property_quill_doc),
            fk_class_field: data.fk_class_field,
            fk_concerned_entity: data.fk_concerned_entity,
            fk_language: data.fk_language
        };

        return InfTextProperty.findOrCreateByValue(InfTextProperty, projectId, dataObject).then(
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
