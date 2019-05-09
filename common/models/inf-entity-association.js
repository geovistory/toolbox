'use strict';

const Config = require('../config/Config');
const _ = require('lodash')

module.exports = function (InfEntityAssociation) {

  InfEntityAssociation.findOrCreateInfEntityAssociation = function (pk_project, ea, ctx) {

    const dataObject = {
      // pk_entity: ea.pk_entity,
      fk_property: ea.fk_property,
      fk_domain_entity: ea.fk_domain_entity,
      fk_range_entity: ea.fk_range_entity,
      notes: ea.notes
    };


    let requestedEa = (ctx && ctx.req && ctx.req.body) ? ctx.req.body : ea;

    const ctxWithoutBody = _.omit(ctx, [ 'req.body']);

    
    // if the ea has a persistent item as the domain 
    if (requestedEa.domain_pe_it && Object.keys(requestedEa.domain_pe_it).length > 0) {

      // prepare parameters
      const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

      // find or create the peIt and the ea pointing to it
      return InfPersistentItem.findOrCreatePeIt(pk_project, requestedEa.domain_pe_it, ctxWithoutBody)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Ea to create
          dataObject.fk_domain_entity = resultingPeIt.pk_entity;

          return InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
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
      return InfPersistentItem.findOrCreatePeIt(pk_project, requestedEa.range_pe_it, ctxWithoutBody)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Ea to create
          dataObject.fk_range_entity = resultingPeIt.pk_entity;

          return InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
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

    // if the ea has a chunk as the range 
    if (requestedEa.range_chunk && Object.keys(requestedEa.range_chunk).length > 0) {

      // prepare parameters
      const DatChunk = InfEntityAssociation.app.models.DatChunk;

      // find or create the peIt and the ea pointing to it
      return DatChunk.findOrCreateChunk(pk_project, requestedEa.range_chunk, ctxWithoutBody)
        .then((resultingObjects) => {

          const resultingObject = resultingObjects[0];

          // … prepare the Ea to create
          dataObject.fk_range_entity = resultingObject.pk_entity;

          return InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
            .then((resultingEas) => {

              let res = resultingEas[0].toJSON();
              res.range_chunk = resultingObject;

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

      return InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)

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

    const joinThisProject = InfEntityAssociation.app.models.ProInfoProjRel.getJoinObject(ofProject, pkProject)

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
        "range_chunk": {
          "$relation": {
            "name": "range_chunk",
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
      const joinThisProject = InfEntityAssociation.app.models.ProInfoProjRel.getJoinObject(ofProject, pkProject)
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




  /**
  * Find mentionings of oa project and filter by domain or range of 'geovP2 – is mentioned in'.
  * 
  * Returns also context information: 
  * - if the range is a F2 Expression (section), the pk_entity of the parent source (F3/F4) is delivered (fk_source_entity)
  * - if the range is a geovC2 Chunk or geovC3 Spot.
  * 
  * @param  {number} pkProject primary key of project
  * @param  {number} pkRangeEntity  the source/expression/chunk/spot that mentiones the entity
  */
  InfEntityAssociation.mentionings = function (ofProject, pkProject, pkRangeEntity, pkDomainEntity, pkSource, pkExpression, pkChunk, cb) {

    const params = [
      ofProject,
      pkProject
    ]

    const w = { fk_range_entity: pkRangeEntity, fk_domain_entity: pkDomainEntity, fk_source_entity: pkSource, fk_expression_entity: pkExpression, fk_chunk: pkChunk }
    let where = '';
    Object.keys(w).filter((key) => (!!w[key])).map((key, index, ar) => {
      params.push(w[key])
      if (index === 0) where = 'WHERE ' + key + ' = $' + params.length;
      else where = where + 'AND ' + key + ' = $' + params.length;
    })

    const sql_stmt = `
    WITH 
    entity_associations_of_project AS (
      SELECT ea.* 
      FROM  information.entity_association as ea
      INNER JOIN information.entity_version_project_rel as epr on ea.pk_entity = epr.fk_entity
      WHERE epr.fk_project = $2 AND is_in_project = $1
      ),
    is_mentioned_in_association AS (
      SELECT ea.* 
      from entity_associations_of_project as ea
      INNER JOIN data_for_history.property as p on ea.fk_property = p.dfh_pk_property
      WHERE p.dfh_fk_property_of_origin = 1218
    ),
    source_of_expression AS (
      SELECT 
      fk_range_entity as fk_source_entity, -- F3 Manifestation Product Type
      fk_domain_entity as fk_expression_entity  
      FROM entity_associations_of_project
      WHERE fk_property = 979  -- F2 Carriers provided by
      UNION
      SELECT 
      fk_domain_entity as fk_source_entity,  -- F4 Manifestation Singleton
      fk_range_entity as fk_expression_entity  
      FROM entity_associations_of_project
      WHERE fk_property = 1016  -- R42 is representative manifestation singleton for
    ),
    source_and_expression_of_digital_object AS (
      SELECT 
        repro_of.fk_domain_entity as fk_digital_object,
      repro_of.fk_range_entity as fk_expression_entity,
      source_of_expression.fk_source_entity
      FROM entity_associations_of_project as repro_of
      inner join source_of_expression on source_of_expression.fk_expression_entity = repro_of.fk_range_entity
      WHERE repro_of.fk_property = 1216 
    ),
    joins as (
      SELECT
        ea.pk_entity,
        ea.fk_domain_entity,
        ea.fk_property,
        ea.fk_range_entity,
        
      -- get the fk source entity 
      COALESCE(
        source_and_expression_of_digital_object.fk_source_entity, -- if range is a chunk 
        source_of_expression.fk_source_entity, -- if given range is a expression, get corresponding associated fk source entity 
        ea.fk_range_entity -- else, the given range is a source (F3/4/5)
      ) as fk_source_entity,
      
      -- get the fk section entity
      COALESCE(
        source_and_expression_of_digital_object.fk_expression_entity, -- if range is a chunk 
        source_of_expression.fk_expression_entity 
      )as fk_expression_entity,
      
      -- get the chunk data
        chunk.pk_entity as fk_chunk,
        chunk.js_quill_data,
      chunk.fk_digital_object
        
      FROM is_mentioned_in_association as ea
      LEFT JOIN source_of_expression on ea.fk_range_entity = source_of_expression.fk_expression_entity
      LEFT JOIN information.chunk as chunk on chunk.pk_entity = ea.fk_range_entity
      LEFT JOIN source_and_expression_of_digital_object on chunk.fk_digital_object = source_and_expression_of_digital_object.fk_digital_object
      )


      SELECT * FROM joins
      ${where}
      `


    const connector = InfEntityAssociation.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });

  };
}