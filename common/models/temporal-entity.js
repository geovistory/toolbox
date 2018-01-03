'use strict';

module.exports = function(TemporalEntity) {
  TemporalEntity.findOrCreateTemporalEntity = function (data, cb) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    TemporalEntity.findOrCreateVersion(TemporalEntity, dataObject, cb);

  }

};
