'use strict';

module.exports = function(InformationRole) {
  InformationRole.findOrCreateInformationRole = function (data, cb) {

    const dataObject = {
      pk_entity: data.pk_entity,
      fk_entity: data.fk_entity,
      fk_temporal_entity: data.fk_temporal_entity,
      fk_property: data.fk_property,
      notes: data.notes,
    };

    InformationRole.findOrCreateVersion(InformationRole, dataObject, cb);

  }
};
