'use strict';
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(DfhProperty) {
  /**
   * Query classes
   *
   * Of a specific project
   *
   */
  DfhProperty.ofProject = function(pkProject, cb) {
    const q = new FlatObjectQueryBuilder(DfhProperty.app.models);

    const params = [pkProject]; // [4, 5, 8]

    const sql = `
      WITH tw1 AS (
        SELECT fk_profile
        FROM projects.dfh_profile_proj_rel
        WHERE fk_project = $1
        UNION
        SELECT 5 as fk_profile -- GEOVISTORY BASICS
      )
      SELECT
        ${q.createSelect('t3', 'DfhProperty')}
      FROM
        tw1 t1,
        data_for_history.api_property t2,
        data_for_history.v_property t3
      WHERE t1.fk_profile = t2.dfh_fk_profile
      AND t3.pk_property = t2.dfh_pk_property
      `;

    DfhProperty.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
