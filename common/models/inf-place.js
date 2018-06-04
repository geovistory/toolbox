'use strict';

module.exports = function(InfPlace) {

  InfPlace.findOrCreatePlace = function(projectId, data) {

    const dataObject = {
      geo_point: data.geo_point,
      notes: data.notes,
      fk_class: data.fk_class
    };

    return InfPlace.findOrCreateByValue(InfPlace, projectId, dataObject);

  }

};