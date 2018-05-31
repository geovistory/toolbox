'use strict';

module.exports = function(InfDigitalObject) {

  InfDigitalObject.findOrCreateDigitObj = function(projectId, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      js_quill_data: data.js_quill_data,
      notes: data.notes,
      fk_class: data.fk_class
    };

    return InfDigitalObject.findOrCreatePeItOrTeEnt(InfDigitalObject, projectId, dataObject)

  }

};