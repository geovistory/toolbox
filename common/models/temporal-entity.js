'use strict';

module.exports = function(TemporalEntity) {
  TemporalEntity.findOrCreateTemporalEntity = function (projectId, data, cb) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    TemporalEntity.findOrCreateVersion(TemporalEntity, projectId, dataObject, cb);

  }

};
