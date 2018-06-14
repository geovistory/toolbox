'use strict';

module.exports = function(InfPlace) {

  InfPlace.findOrCreatePlace = function(projectId, data) {

    const dataObject = {
      long: data.long,
      lat: data.lat,
      fk_class: data.fk_class
    };

    return InfPlace.findOrCreateByValue(InfPlace, projectId, dataObject);

  }

};