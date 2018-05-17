'use strict';

module.exports = function(InfTimePrimitive) {
  InfTimePrimitive.findOrCreateInfTimePrimitive = function(projectId, data) {

    const dataObject = {
      duration: data.duration,
      julian_day: data.julian_day,
      //pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    return InfTimePrimitive.findOrCreateObjectOrRole(InfTimePrimitive, projectId, dataObject);

  }
};
