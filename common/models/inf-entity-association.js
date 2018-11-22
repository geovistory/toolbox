'use strict';

const Config = require('../config/Config');

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

    // if the ea has a persistent item as the range 
    if (requestedEa.range_pe_it && Object.keys(requestedEa.range_pe_it).length > 0) {

      // prepare parameters
      const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

      // find or create the peIt and the ea pointing to it
      return InfPersistentItem.findOrCreatePeIt(projectId, requestedEa.range_pe_it)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Ea to create
          dataObject.fk_range_entity = resultingPeIt.pk_entity;

          return InfEntityAssociation.findOrCreateByValue(InfEntityAssociation, projectId, dataObject, requestedEa)
            .then((resultingEas) => {

              let res = resultingEas[0].toJSON();
              res.range_pe_it = resultingPeIt;

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


  /**
  * Find entityAssociation by one of the params
  * 
  * @param  {number} pkProject primary key of project
  * @param  {number} pkEntity  pk_entity of the entityAssociation
  */
  InfEntityAssociation.queryByParams = function (ofProject, pkProject, pkEntity, pkRangeEntity, pkDomainEntity, pkProperty, cb) {

    if (!pkEntity && !pkRangeEntity && !pkDomainEntity) {
      return cb('please provide at least a pkEntity, pkRangeEntity or pkDomainEntity');
    }



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
      "where": where
    }

    if (pkProject) {
      const joinThisProject = InfEntityAssociation.app.models.InfEntityProjectRel.getJoinObject(ofProject, pkProject)
      joinThisProject.$relation['select'] = false;
      filter['include'] = {
        "entity_version_project_rels": joinThisProject
      }
    }

    return InfEntityAssociation.findComplex(filter, cb);
  }

  /**
  * Find mentionings of a section (F2 Expression)
  * 
  * @param  {number} pkProject primary key of project
  * @param  {number} pkEntity  pk_entity of the entityAssociation
  */
  InfEntityAssociation.mentioningsOfSection = function (ofProject, pkProject, pkEntity, cb) {

    const params = [
      ofProject, 
      pkProject, 
      pkEntity
    ]
    const sql_stmt = `
    WITH 
    entity_associations_of_project AS (
      SELECT ea.* 
      FROM  information.entity_association as ea
      INNER JOIN information.entity_version_project_rel as epr on ea.pk_entity = epr.fk_entity
      WHERE epr.fk_project = $2 AND is_in_project = $1
    ),
    mentioned_in_associations AS (
      SELECT ea.* 
      from entity_associations_of_project as ea
      INNER JOIN data_for_history.property as p on ea.fk_property = p.dfh_pk_property
      WHERE p.dfh_fk_property_of_origin = 1218
    ),
    mentionings_of_chunks_of_expression AS (
      SELECT 
        chunk.pk_entity as fk_chunk,
        chunk.js_quill_data,
        mentioned_in.pk_entity, 
        mentioned_in.fk_domain_entity, 
        mentioned_in.fk_property, 
        mentioned_in.fk_range_entity
      FROM mentioned_in_associations as mentioned_in
      inner join entity_associations_of_project as repro_of on mentioned_in.fk_range_entity = repro_of.fk_domain_entity
      inner join information.chunk as chunk on repro_of.fk_range_entity = chunk.fk_digital_object
      AND repro_of.fk_property = 1216 
      AND repro_of.fk_range_entity = $3 -- F2 Expression
    ),
    mentionings_of_expression AS (
      SELECT pk_entity, fk_domain_entity, fk_property, fk_range_entity 
      FROM mentioned_in_associations
      WHERE fk_range_entity = $3 -- F2 Expression
    ),
    source_of_expression AS (
      SELECT fk_range_entity as fk_source_entity  -- F3 Manifestation Product Type
      FROM entity_associations_of_project
      WHERE fk_property = 979  -- F2 Carriers provided by
      AND fk_domain_entity = $3 -- F2 Expression
      UNION
      SELECT fk_domain_entity as pk_source_entity  -- F4 Manifestation Singleton
      FROM entity_associations_of_project
      WHERE fk_property = 1016  -- R42 is representative manifestation singleton for
      AND fk_range_entity = $3 -- F2 Expression
    )
    SELECT
      pk_entity,
      fk_domain_entity,
      fk_property,
      fk_range_entity,
      fk_range_entity as fk_expression_entity,
      (SELECT fk_source_entity from source_of_expression),
      null as fk_chunk,
      null as js_quill_data
      FROM mentionings_of_expression
    UNION
    SELECT 
      pk_entity,
      fk_domain_entity,
      fk_property,
      fk_range_entity,
      fk_range_entity as fk_expression_entity,
      (SELECT fk_source_entity from source_of_expression),
      fk_chunk,
      js_quill_data
	  FROM mentionings_of_chunks_of_expression;
  `


    const connector = InfEntityAssociation.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });

  };
}