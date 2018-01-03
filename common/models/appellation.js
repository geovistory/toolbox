'use strict';

module.exports = function(Appellation) {

  Appellation.findOrCreateAppellation = function (projectId, data, cb) {

    const dataObject = {
      appellation_label: JSON.stringify(data.appellation_label),
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    Appellation.findOrCreateVersion(Appellation, projectId, dataObject, cb);

  }
};
