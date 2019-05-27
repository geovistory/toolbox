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
