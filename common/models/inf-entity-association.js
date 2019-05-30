'use strict';

const Promise = require('bluebird');
const Config = require('../config/Config');
const _ = require('lodash')

const toData = (prop) => {
  return typeof prop === 'function' ? prop() : prop;
}

const toDataObject = (ea) => ({
  fk_property: ea.fk_property,
  fk_info_domain: ea.fk_info_domain,
  fk_info_range: ea.fk_info_range,
  fk_data_domain: ea.fk_data_domain,
  fk_data_range: ea.fk_data_range,
  entity_version_project_rels: ea.entity_version_project_rels
})


module.exports = function (InfEntityAssociation) {


  InfEntityAssociation.findOrCreateInfEntityAssociations = function (pk_project, eas, ctx) {
    return new Promise((resolve, reject) => {
      // ctx = { ...ctx, req: _.omit(ctx.req, ['body']) }
      const promiseArray = eas.map((ea, i) => {

        ctx.req.body = ctx.req.body[i];

        return InfEntityAssociation.findOrCreateInfEntityAssociation(pk_project, ea, ctx)
      })
      Promise.map(promiseArray, (promise) => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res))
        })
    })
  };

  InfEntityAssociation.findOrCreateInfEntityAssociation = function (pk_project, ea, ctx) {
    return new Promise((resolve, reject) => {

      const dataObject = toDataObject(ea)

      let requestedEa = (ctx && ctx.req && ctx.req.body) ? ctx.req.body : ea;

      const ctxWithoutBody = _.omit(ctx, [ 'req.body']);


      // if the ea has a persistent item as the domain
      if (requestedEa.domain_pe_it && Object.keys(requestedEa.domain_pe_it).length > 0) {

        // prepare parameters
        const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

        // find or create the peIt and the ea pointing to it
        InfPersistentItem.findOrCreatePeIt(pk_project, requestedEa.domain_pe_it, ctxWithoutBody)
          .then((resultingPeIts) => {

            const resultingPeIt = resultingPeIts[0];

            // … prepare the Ea to create
            dataObject.fk_info_domain = resultingPeIt.pk_entity;

            InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
              .then((resultingEas) => {

                let res = resultingEas[0].toJSON();
                res.domain_pe_it = resultingPeIt;

                resolve([res]);

              })
              .catch(err => reject(err))

          })
          .catch(err => reject(err))


      }

      // if the ea has a persistent item as the range
      if (requestedEa.range_pe_it && Object.keys(requestedEa.range_pe_it).length > 0) {

        // prepare parameters
        const InfPersistentItem = InfEntityAssociation.app.models.InfPersistentItem;

        // find or create the peIt and the ea pointing to it
        InfPersistentItem.findOrCreatePeIt(pk_project, requestedEa.range_pe_it, ctxWithoutBody)
          .then((resultingPeIts) => {

            const resultingPeIt = resultingPeIts[0];

            // … prepare the Ea to create
            dataObject.fk_info_range = resultingPeIt.pk_entity;

            InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
              .then((resultingEas) => {

                let res = resultingEas[0].toJSON();
                res.range_pe_it = resultingPeIt;

                resolve([res]);

              })
              .catch(err => reject(err))

          })
          .catch(err => reject(err))


      }

      // if the ea has a chunk as the range
      if (requestedEa.range_chunk && Object.keys(requestedEa.range_chunk).length > 0) {

        // prepare parameters
        const DatChunk = InfEntityAssociation.app.models.DatChunk;

        // find or create the peIt and the ea pointing to it
        DatChunk.findOrCreateChunk(pk_project, requestedEa.range_chunk, ctxWithoutBody)
          .then((resultingObjects) => {

            const resultingObject = resultingObjects[0];

            // … prepare the Ea to create
            dataObject.fk_info_range = resultingObject.pk_entity;

            InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
              .then((resultingEas) => {

                let res = resultingEas[0].toJSON();
                res.range_chunk = resultingObject;

                resolve([res]);

              })
              .catch(err => reject(err))

          })
          .catch(err => reject(err))

      }

      // if the ea has a chunk as the domain
      if (requestedEa.domain_chunk && Object.keys(requestedEa.domain_chunk).length > 0) {

        // prepare parameters
        const DatChunk = InfEntityAssociation.app.models.DatChunk;

        // find or create the chunk and the ea pointing to it
        DatChunk.create(requestedEa.domain_chunk)
          .then((resultingObject) => {


            // … prepare the Ea to create
            dataObject.fk_data_domain = resultingObject.pk_entity;

            InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
              .then((resultingEas) => {

                let res = resultingEas[0].toJSON();
                res.domain_chunk = resultingObject;

                resolve([res]);

              })
              .catch(err => reject(err))

          })
          .catch(err => reject(err))

      }


      else {

        InfEntityAssociation._findOrCreateByValue(InfEntityAssociation, pk_project, dataObject, requestedEa, ctxWithoutBody)
          .catch(err => {
            reject(err)
          })
          .then(result => {
            resolve(result)
          })

      }
    })
  }



  /**
   * nestedObjectOfProject - get a rich object of the entityAssociation with its
   * domain and range entity
  *
  * @param  {number} pkProject primary key of project
  * @param  {number} pkEntity  pk_entity of the entityAssociation
  */
  InfEntityAssociation.nestedObject = function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty, cb) {

    if (!pkEntity && !pkInfoRange && !pkInfoDomain) {
      return cb('please provide at least a pkEntity, pkInfoRange or pkInfoDomain');
    }

    const joinThisProject = InfEntityAssociation.app.models.ProInfoProjRel.getJoinObject(ofProject, pkProject)

    const w = { pk_entity: pkEntity, fk_info_range: pkInfoRange, fk_info_domain: pkInfoDomain, fk_property: pkProperty }
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
        "domain_digital": {
          "$relation": {
            "name": "domain_digital",
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
  InfEntityAssociation.queryByParams = function (ofProject, pkProject, pkEntity, pkInfoRange, pkInfoDomain, pkProperty, cb) {

    if (!pkEntity && !pkInfoRange && !pkInfoDomain) {
      return cb('please provide at least a pkEntity, pkInfoRange or pkInfoDomain');
    }



    const w = { pk_entity: pkEntity, fk_info_range: pkInfoRange, fk_info_domain: pkInfoDomain, fk_property: pkProperty }
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
      INNER JOIN projects.info_proj_rel as epr on ea.pk_entity = epr.fk_entity
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
        mentioned_in.fk_info_domain,
        mentioned_in.fk_property,
        mentioned_in.fk_info_range
      FROM mentioned_in_associations as mentioned_in
      inner join entity_associations_of_project as repro_of on mentioned_in.fk_info_range = repro_of.fk_info_domain
      inner join information.chunk as chunk on repro_of.fk_info_range = chunk.fk_digital_object
      AND repro_of.fk_property = 1216
      AND repro_of.fk_info_range = $3 -- F2 Expression
    ),
    mentionings_of_expression AS (
      SELECT pk_entity, fk_info_domain, fk_property, fk_info_range
      FROM mentioned_in_associations
      WHERE fk_info_range = $3 -- F2 Expression
    ),
    source_of_expression AS (
      SELECT fk_info_range as fk_source_entity  -- F3 Manifestation Product Type
      FROM entity_associations_of_project
      WHERE fk_property = 979  -- F2 Carriers provided by
      AND fk_info_domain = $3 -- F2 Expression
      UNION
      SELECT fk_info_domain as pk_source_entity  -- F4 Manifestation Singleton
      FROM entity_associations_of_project
      WHERE fk_property = 1016  -- R42 is representative manifestation singleton for
      AND fk_info_range = $3 -- F2 Expression
    )
    SELECT
      pk_entity,
      fk_info_domain,
      fk_property,
      fk_info_range,
      fk_info_range as fk_expression_entity,
      (SELECT fk_source_entity from source_of_expression),
      null as fk_chunk,
      null as js_quill_data
      FROM mentionings_of_expression
    UNION
    SELECT
      pk_entity,
      fk_info_domain,
      fk_property,
      fk_info_range,
      fk_info_range as fk_expression_entity,
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
  * @param  {number} pkInfoRange  the source/expression/chunk/spot that mentiones the entity
  */
  InfEntityAssociation.mentionings = function (ofProject, pkProject, pkInfoRange, pkInfoDomain, pkSource, pkExpression, pkChunk, cb) {

    const params = [
      ofProject,
      pkProject
    ]

    const w = { fk_info_range: pkInfoRange, fk_info_domain: pkInfoDomain, fk_source_entity: pkSource, fk_expression_entity: pkExpression, fk_chunk: pkChunk }
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
      INNER JOIN projects.info_proj_rel as epr on ea.pk_entity = epr.fk_entity
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
      fk_info_range as fk_source_entity, -- F3 Manifestation Product Type
      fk_info_domain as fk_expression_entity
      FROM entity_associations_of_project
      WHERE fk_property = 979  -- F2 Carriers provided by
      UNION
      SELECT
      fk_info_domain as fk_source_entity,  -- F4 Manifestation Singleton
      fk_info_range as fk_expression_entity
      FROM entity_associations_of_project
      WHERE fk_property = 1016  -- R42 is representative manifestation singleton for
    ),
    source_and_expression_of_digital_object AS (
      SELECT
        repro_of.fk_info_domain as fk_digital_object,
      repro_of.fk_info_range as fk_expression_entity,
      source_of_expression.fk_source_entity
      FROM entity_associations_of_project as repro_of
      inner join source_of_expression on source_of_expression.fk_expression_entity = repro_of.fk_info_range
      WHERE repro_of.fk_property = 1216
    ),
    joins as (
      SELECT
        ea.pk_entity,
        ea.fk_info_domain,
        ea.fk_property,
        ea.fk_info_range,

      -- get the fk source entity
      COALESCE(
        source_and_expression_of_digital_object.fk_source_entity, -- if range is a chunk
        source_of_expression.fk_source_entity, -- if given range is a expression, get corresponding associated fk source entity
        ea.fk_info_range -- else, the given range is a source (F3/4/5)
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
      LEFT JOIN source_of_expression on ea.fk_info_range = source_of_expression.fk_expression_entity
      LEFT JOIN information.chunk as chunk on chunk.pk_entity = ea.fk_info_range
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


  /**
  * Get an array of entity associations that build the tree of the content of an F2 Expression.
  */
  InfEntityAssociation.contentTree = function (pkProject, pkExpressionEntity, cb) {

    const params = [
      pkProject,
      pkExpressionEntity
    ]

    const sql_stmt = `
    WITH RECURSIVE pops (fk_info_domain, fk_data_domain, fk_property, fk_info_range, fk_data_range, level, pk_entity, path) AS (
        SELECT  fk_info_domain, fk_data_domain, fk_property, fk_info_range, fk_data_range, 0, pk_entity, ARRAY[pk_entity]
        FROM    warehouse.v_entity_association_per_project_and_repo
        WHERE   fk_info_range = $2
        AND 	  project = $1
        AND		  fk_property IN (1317, 1328, 1329, 1216)

        UNION ALL

        SELECT  p.fk_info_domain, p.fk_data_domain, p.fk_property, p.fk_info_range, p.fk_data_range, t0.level + 1, p.pk_entity, ARRAY_APPEND(t0.path, p.pk_entity)
        FROM    warehouse.v_entity_association_per_project_and_repo p
                INNER JOIN pops t0 ON t0.fk_info_domain = p.fk_info_range
                WHERE 	p.project = $1
                AND		p.fk_property IN (1317, 1328, 1329, 1216)

    )

    SELECT  pk_entity, fk_info_domain, fk_data_domain, fk_property, fk_info_range, fk_data_range
    FROM    pops
  `


    const connector = InfEntityAssociation.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err);
      if (resultObjects.length === 0) {
        cb(err, resultObjects);
      }
      else {

        // Load all the nested objects of the related persistent items (Expression Portions)
        new Promise.all(
          resultObjects.map(ea => {
            return new Promise((resolve, reject) => {
              if (ea.fk_info_domain) {
                // Load the Expression Portion
                InfEntityAssociation.app.models.InfPersistentItem.nestedObjectOfProject(pkProject, ea.fk_info_domain, (err, res) => {
                  if (err) reject(err);
                  else resolve(res);
                })
              }
              else if (ea.fk_data_domain) {
                // Load the Digital
                InfEntityAssociation.app.models.DatDigital.findById(ea.fk_data_domain, (err, res) => {
                  if (err) reject(err);
                  else resolve([res]);
                })
              }
              else {
                console.log('er')
              }
            })
          })
        )
          .catch(err => cb(err))
          .then(domain => {
            // map the fetched nested peIts to the entity_associations
            const result = resultObjects.map((ea, i) => {

              const nested = (domain && domain[i] && domain[i].length) ? domain[i][0] : undefined;

              if (!nested) return ea;

              if (ea.fk_info_domain === nested.pk_entity) {
                return {
                  ...ea,
                  domain_pe_it: nested
                }
              } else if (ea.fk_data_domain === nested.pk_entity) {
                return {
                  ...ea,
                  domain_digital: nested
                }
              }

            })
            cb(err, result);
          })

      }
    });

  };

}
