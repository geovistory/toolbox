'use strict';
const Promise = require('bluebird');

module.exports = function (DatDigital) {
  DatDigital.bulkDelete = function (pks, ctx, cb) {
    const promiseArray = pks.map(pk => DatDigital.deleteById(pk))
    return Promise.map(promiseArray, (promise) => promise)
  };

  DatDigital.bulkUpsert = function (pkNamespace, items) {
    return new Promise((resolve, reject) => {

      const promiseArray = items.map(item => {
        item.fk_namespace = pkNamespace;
        return DatDigital.upsert(item);
      })

      Promise.map(promiseArray, (promise) => promise)
        .catch(err => reject(err))
        .then(res => {
          if (!res || !res.length) return reject('No item upserted');
          DatDigital.findComplex({
            'where': ['pk_entity', 'IN', res.map(item => item.pk_entity)]
          }, (err, result) => {
            if (err) reject(err);
            else resolve(result)
          })
        })
    })
  }


  /**
   * Returns all version with given pkEntity
   * @param {*} pkEntity
   * @param {*} cb
   */
  DatDigital.getVersion = function (pkEntity, entityVersion, context, cb) {
    const accountId = context.req.accessToken.userId;

    const params = [pkEntity, accountId];
    if (entityVersion) params.push(entityVersion);

    const sql = `
    WITH namespaces AS (
      SELECT pk_entity pk_namespace
      FROM data.namespace n
      JOIN public.account_project_rel apr ON apr.fk_project = n.fk_project
      WHERE apr.account_id = $2
    ),
     versions AS(
      SELECT
      pk_entity,
      entity_version,
      fk_namespace,
      metadata,
      pk_text,
      quill_doc,
      string,
      fk_system_type
      from data.digital
       JOIN namespaces n ON n.pk_namespace = digital.fk_namespace
      UNION
      SELECT
      pk_entity,
      entity_version,
      fk_namespace,
      metadata,
      pk_text,
      quill_doc,
      string,
      fk_system_type
      from data.digital_vt
      JOIN namespaces n ON n.pk_namespace = digital_vt.fk_namespace
    )
    SELECT * FROM versions
    WHERE pk_entity = $1 ${entityVersion ? 'AND entity_version = $3' : ''}
    ORDER BY entity_version desc
    LIMIT 1
    `

    const connector = DatDigital.dataSource.connector;
    connector.execute(sql, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);
      cb(null, resultObjects);
    });
  }


  /**
   * Returns all version with given pkEntity
   * @param {*} pkEntity
   * @param {*} cb
   */
  DatDigital.getVersions = function (pkEntity, cb) {

    const filter = {
      select: {
        include: ["entity_version", "pk_entity_version_concat", "pk_entity"]
      },
      where: ["pk_entity", "=", pkEntity],
      order: [{ "entity_version": "desc" }]
    }

    return DatDigital.findComplex(filter, cb);

  }

  /**
  * Returns latest version with given pkEntity
  * @param {*} pkEntity
  * @param {*} cb
  */
  DatDigital.getLatestVersion = function (pkEntity, cb) {

    const filter = {
      where: ["pk_entity", "=", pkEntity],
      order: [{ "entity_version": "desc" }],
      limit: 1
    }

    return DatDigital.findComplex(filter, cb);

  }


};
