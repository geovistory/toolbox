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




    // if the ea has a persistent item as the domain 
    if (requestedEa.domain_pe_it && Object.keys(requestedEa.domain_pe_it).length > 0) {

      // prepare parameters
      const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

      // find or create the peIt and the ea pointing to it
      return InfPersistentItem.findOrCreatePeIt(projectId, requestedEa.domain_pe_it)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Ea to create
          dataObject.fk_domain_entity = resultingPeIt.pk_entity;

          return InfEntityAssociation.findOrCreateByValue(InfEntityAssociation, projectId, dataObject, requestedEa)
            .then((resultingEas) => {

              let res = resultingEas[0].toJSON();
              res.domain_pe_it = resultingPeIt;

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
  InfEntityAssociation.nestedObject = function (ofProject, pkProject, pkEntity, pkRangeEntity, pkDomainEntity, pkProperty, cb) {

    if (!pkEntity && !pkRangeEntity && !pkDomainEntity) {
      return cb('please provide at least a pkEntity, pkRangeEntity or pkDomainEntity');
    }

    const joinThisProject = InfEntityAssociation.app.models.InfEntityProjectRel.getJoinObject(ofProject, pkProject)

    const w = { pk_entity: pkEntity, fk_range_entity: pkRangeEntity, fk_domain_entity: pkDomainEntity, fk_property: pkProperty }
    let where = [];
    Object.keys(w).filter((key) => (!!w[key])).map((key, index, ar) => {
      let part = [key, '=', w[key]];
      if (index !== 0) part = ['AND', ...part];
      return part;
    }).forEach(part => {
      where = [...where, ...part]
    });

    const filter = {
      "where": where,
      "include": {
        "entity_version_project_rels": joinThisProject,
        "chunk": {
          "$relation": {
            "name": "chunk",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
        },
        "digital_object": {
          "$relation": {
            "name": "digital_object",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          "entity_version_project_rels": joinThisProject
        },
        "domain_pe_it": {
          "$relation": {
            "name": "domain_pe_it",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          ...InfEntityAssociation.app.models.InfPersistentItem.getIncludeObject(ofProject, pkProject)
        }
      }
    }

    return InfEntityAssociation.findComplex(filter, cb);
  }



};