'use strict';

const Promise = require('bluebird');

module.exports = function(InfChunk) {

  InfChunk.findOrCreateChunk = function(projectId, data, ctx) {

    const dataObject = {
      js_quill_data: JSON.stringify(data.js_quill_data),
      fk_digital_object: data.fk_digital_object      
    };

    let requestedChunk;

    if (ctx) {
      requestedChunk = ctx.req.body;
    } else {
      requestedChunk = data;
    }

    return InfChunk.findOrCreateByValue(InfChunk, projectId, dataObject)
    .then((resultingChunks) => {
      // pick first item of array
      const resultingChunk = resultingChunks[0];

      // if there are entity_associations
      if (requestedChunk.entity_associations) {

        // prepare parameters
        const InfEntityAssociation = InfChunk.app.models.InfEntityAssociation;

        //… filter entity_associations that are truthy (not null), iterate over them,
        // return the promise that the range entity will be
        // returned together with all nested items
        return Promise.map(requestedChunk.entity_associations.filter(ea => (ea)), (ea) => {
            // use the pk_entity from the created peIt to set the fk_entity of the ea
            ea.fk_domain_entity = resultingChunk.pk_entity;
            // find or create the teEnt and the ea pointing to the teEnt
            return InfEntityAssociation.findOrCreateInfEntityAssociation(projectId, ea);
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