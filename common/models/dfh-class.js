'use strict';
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

const Config = require('../config/Config');

module.exports = function(DfhClass) {
  /**
   * Query classes
   *
   * Of a specific project
   *
   */
  DfhClass.ofProject = function(pkProject, cb) {
    const q = new FlatObjectQueryBuilder(DfhClass.app.models);

    const params = [pkProject]; // [4, 5, 8]

    const sql = `
      SELECT
        ${q.createSelect('t3', 'DfhClass')}
      FROM
        projects.dfh_profile_proj_rel t1,
        data_for_history.api_class t2,
        data_for_history.v_class t3
      WHERE fk_project = $1
      AND t1.fk_profile = t2.dfh_fk_profile
      AND t3.pk_class = t2.dfh_pk_class
      `;

    DfhClass.dataSource.connector.execute(sql, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);
      cb(false, resultObjects);
    });
  };
};
