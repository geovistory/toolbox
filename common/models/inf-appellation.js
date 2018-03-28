'use strict';

module.exports = function(InfAppellation) {

  InfAppellation.findOrCreateAppellation = function(projectId, data) {

    const dataObject = {
      appellation_label: JSON.stringify(data.appellation_label),
      // pk_entity: data.pk_entity, //<-- remove this to find existing entity instead of existent version
      notes: data.notes,
      fk_class: data.fk_class
    };

    return InfAppellation.findOrCreateEntity(InfAppellation, projectId, dataObject);

  }

};