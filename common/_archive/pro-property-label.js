'use strict';

const Config = require('../../common/config/Config')
const Promise = require('bluebird');

module.exports = function (ProPropertyLabel) {

  /**
   * Gets all labels of the default project
   *
   * @param fkProject the pk of the project that is requesting the default labels
   * TODO: filter the labels according to the needs of the requesting project
   * (e.g. only the labels of properties of the ontome profiles activated by the project)
   */
  ProPropertyLabel.getDefaultLabels = function (fkProject, ctx, cb) {


    ProPropertyLabel.findComplex({
      where: ['fk_project', '=', Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT],
      include: {
        language: {
          "$relation": {
            "name": "language",
            "joinType": "left join",
            "orderBy": [{ "pk_entity": "asc" }]
          }
        },
      }
    }, cb)

  };

  ProPropertyLabel.bulkUpsert = function (fkProject, items, ctx) {
    return new Promise((resolve, reject) => {

      items.forEach(item => {
        if (item.fk_project != fkProject) return reject('Array contained a item with an fk_project different from given pkProject')
      })
      const promises = items.map(item => ProPropertyLabel.replaceOrCreate(item))

      Promise.map(promises, (promise) => promise)
        .catch(err => reject(err))
        .then(res => resolve(res))
    })

  };

  ProPropertyLabel.bulkDelete = function (fkProject, items, ctx) {
    return new Promise((resolve, reject) => {

      items.forEach(item => {
        if (item.fk_project != fkProject) return reject('Array contained a item with an fk_project different from given pkProject')
        if (!item.pk_entity) return reject('Array contained a item without pk_entity')
      })
      const promises = items.map(item => ProPropertyLabel.destroyAll({
        pk_entity: item.pk_entity,
        fk_project: item.fk_project
      }, item))

      Promise.map(promises, (promise) => promise)
        .catch(err => reject(err))
        .then(res => resolve(res))
    })

  };

};
