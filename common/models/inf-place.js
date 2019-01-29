'use strict';
const _ = require('lodash')

module.exports = function(InfPlace) {

  InfPlace.findOrCreatePlace = function(projectId, data, ctx) {

    const dataObject = {
      long: data.long,
      lat: data.lat,
      fk_class: data.fk_class
    };

    let requestedObject;

    if (ctx && ctx.req && ctx.req.body) {
      requestedObject = ctx.req.body;
    } else {
      requestedObject = data;
    }

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    return InfPlace._findOrCreateByValue(InfPlace, projectId, dataObject, requestedObject, ctxWithoutBody);

  }

};