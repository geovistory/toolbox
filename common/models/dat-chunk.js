'use strict';
const _ = require('lodash')

const Promise = require('bluebird');

module.exports = function(DatChunk) {

  DatChunk.findOrCreateChunk = function(projectId, data, ctx) {

    const dataObject = {
      quill_doc: JSON.stringify(data.quill_doc),
      fk_text: data.fk_text      
    };

    let requestedChunk;

    if (ctx && ctx.req && ctx.req.body) {
      requestedChunk = ctx.req.body;
    } else {
      requestedChunk = data;
    }

    const ctxWithoutBody = _.omit(ctx, ['req.body']);

    return DatChunk._findOrCreateByValue(DatChunk, projectId, dataObject, requestedChunk, ctxWithoutBody)
    .then((resultingChunks) => {
      // pick first item of array
      const resultingChunk = resultingChunks[0];

      // if there are entity_associations
      if (requestedChunk.entity_associations) {

        // prepare parameters
        const InfEntityAssociation = DatChunk.app.models.InfEntityAssociation;

        //… filter entity_associations that are truthy (not null), iterate over them,
        // return the promise that the range entity will be
        // returned together with all nested items
        return Promise.map(requestedChunk.entity_associations.filter(ea => (ea)), (ea) => {
            // use the pk_entity from the created peIt to set the fk_entity of the ea
            ea.fk_domain_entity = resultingChunk.pk_entity;
            // find or create the teEnt and the ea pointing to the teEnt
            return InfEntityAssociation.findOrCreateInfEntityAssociation(projectId, ea, ctxWithoutBody);
          })
          .then((entity_associations) => {

            //attach the entity_associations to resultingChunk.entity_associations
            const res = resultingChunk.toJSON();
            res.entity_associations = [];
            for (var i = 0; i < entity_associations.length; i++) {
              const ea = entity_associations[i];
              if (ea && ea[0]) {
                res.entity_associations.push(ea[0]);
              }
            }

            return [res];

          })
          .catch((err) => {
            return err;
          })

      } else {
        return resultingChunks;
      }
    })
    .catch((err) => {

    });;

  }

};