'use strict';

module.exports = function(Appellation) {

  Appellation.findOrCreateAppellation = function(projectId, data) {

    const dataObject = {
      appellation_label: JSON.stringify(data.appellation_label),
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    return Appellation.findOrCreateVersion(Appellation, projectId, dataObject);

  }

};