'use strict';

module.exports = function (InfEntityAssociation) {

  InfEntityAssociation.findOrCreateInfEntityAssociation = function (projectId, ea, ctx) {

    const dataObject = {
      // pk_entity: ea.pk_entity,
      fk_property: ea.fk_property,
      fk_domain_entity: ea.fk_domain_entity,
      fk_range_entity: ea.fk_range_entity,
      notes: ea.notes
    };

    let requestedEa = ctx ? ctx.req.body : ea;


   

    // if the ea points to a persistent item
    if (requestedEa.persistent_item && Object.keys(requestedEa.persistent_item).length > 0) {

      // prepare parameters
      const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

      // find or create the peIt and the ea pointing to it
      return InfPersistentItem.findOrCreatePeIt(projectId, requestedEa.persistent_item)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Ea to create
          dataObject.fk_range_entity = resultingPeIt.pk_entity;

          return InfEntityAssociation.findOrCreateByValue(InfEntityAssociation, projectId, dataObject, requestedEa)
            .then((resultingEas) => {

              let res = resultingEa[0].toJSON();
              res.persistent_item = resultingPeIt.toJSON();

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

    }




    // if (requestedEa.temporal_entity && Object.keys(requestedEa.temporal_entity).length > 0) {

    //   //create the temporal_entity first
    //   const InfTemporalEntity = InfEntityAssociation.app.models.InfTemporalEntity;
    //   return InfTemporalEntity.findOrCreateInfTemporalEntity(projectId, requestedEa.temporal_entity)
    //     .then((resultingTeEnts) => {

    //       const resultingTeEnt = resultingTeEnts[0];

    //       // … prepare the Ea to create
    //       dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

    //       // call the api to find or create the ea that points to the teEnt
    //       return InfEntityAssociation.findOrCreateObjectOrEa(InfEntityAssociation, projectId, dataObject, requestedEa)
    //         .then((eas) => {

    //           let res = eas[0].toJSON()
    //           res.temporal_entity = resultingTeEnt;

    //           return [res];

    //         })
    //         .catch((err) => {
    //           return err;
    //         })

    //     })
    //     .catch((err) => {
    //       return err;
    //     })

    // }

    else {

      return InfEntityAssociation.findOrCreateByValue(InfEntityAssociation, projectId, dataObject, requestedEa)

    }

  }



   /**
    * nestedObjectOfProject - get a rich object of the entityAssociation with its
    * domain and range entity
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the entityAssociation
   */
  InfEntityAssociation.nestedObjectOfProject = function(projectId, pkEntity, cb) {

    const innerJoinThisProject = {
      "$relation": {
        "name": "eprs",
        "joinType": "inner join",
        "where": [
          "fk_project", "=", projectId,
          "and", "is_in_project", "=", "true"
        ]
      }
    };

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": {
        "eprs": innerJoinThisProject,
        "chunk": {
          "$relation": {
            "name": "chunk",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
        }
      }
    }

    return InfEntityAssociation.findComplex(filter, cb);
  }



};