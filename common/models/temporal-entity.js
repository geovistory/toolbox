'use strict';

const Promise = require('bluebird');

module.exports = function(TemporalEntity) {


  TemporalEntity.findOrCreateTemporalEntity = function(projectId, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      notes: data.notes,
      fk_class: data.fk_class
    };

    let requestedTeEnt;

    if (ctx) {
      requestedTeEnt = ctx.req.body;
    } else {
      requestedTeEnt = data;
    }

    return TemporalEntity.findOrCreateVersion(TemporalEntity, projectId, dataObject)
      .then((resultingTeEnts) => {

        //TODO pick first item of array
        const resultingTeEnt = resultingTeEnts[0];

        // if there are roles going from the teEnt to a peIt …
        if (requestedTeEnt.te_roles) {

          // prepare parameters
          const InformationRole = TemporalEntity.app.models.InformationRole;

          //… filter roles that are truthy (not null), iterate over them,
          // return the promise that the teEnt will be
          // returned together with all nested items
          return Promise.map(requestedTeEnt.te_roles.filter(role => (role)), (role) => {
              // use the pk_entity from the created teEnt to set the fk_temporal_entity of the role
              role.fk_temporal_entity = resultingTeEnt.pk_entity;

              // find or create the Entity and the role pointing to the Entity
              return InformationRole.findOrCreateInformationRole(projectId, role);
            })
            .then((roles) => {

              //attach the roles to resultingTeEnt
              let res = resultingTeEnt.toJSON();
              res.te_roles = [];
              for (var i = 0; i < roles.length; i++) {
                const role = roles[i];
                if (role && role[0]) {
                  res.te_roles.push(role[0]);
                }
              }

              console.log(res)

              return res;

            })
            .catch((err) => {
              return err;
            })
        }
      });

  }


};