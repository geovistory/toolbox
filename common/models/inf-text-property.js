'use strict';

module.exports = function (InfTextProperty) {

    InfTextProperty.findOrCreateInfTextProperty = function (projectId, data, ctx) {

        const dataObject = {
            text_property_quill_doc: JSON.stringify(data.text_property_quill_doc),
            fk_system_type: data.fk_system_type,
            fk_concerned_entity: data.fk_concerned_entity,
            fk_language: data.fk_language
        };

        return InfTextProperty.findOrCreateByValue(InfTextProperty, projectId, dataObject)

    }
};
