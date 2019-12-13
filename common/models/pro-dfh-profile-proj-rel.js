'use strict';
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(ProDfhProfileProjRel) {
  ProDfhProfileProjRel.getEnabledByProject = function(pkProject, ctx, cb) {
    ProDfhProfileProjRel.findComplex(
      {
        where: ['fk_project', '=', pkProject, 'AND', 'enabled', '=', 'true'],
      },
      cb
    );
  };

  /**
   * Adds or removes a ontome profile from a geovistory project
   */
  ProDfhProfileProjRel.bulkUpsert = function(pkProject, items, ctx, cb) {
    const userId = ctx.req.accessToken.userId;

    const params = [];
    function addParam(val) {
      params.push(val);
      return '$' + params.length;
    }
    const selectCols = new FlatObjectQueryBuilder(
      ProDfhProfileProjRel.app.models
    ).getColumns('ProDfhProfileProjRel');

    const sql = `INSERT INTO projects.dfh_profile_proj_rel (
      fk_project,
     fk_entity,
     enabled,
     fk_last_modifier
     )
    VALUES
    ${items
      .map(
        item => `(
      ${addParam(pkProject)},
      ${addParam(item.fk_profile)},
      ${addParam(item.enabled)},
      ${addParam(userId)}
    )`
      )
      .join(', ')}
    ON CONFLICT (fk_project, fk_profile)
    DO UPDATE SET
      fk_project = EXCLUDED.fk_project,
      fk_profile = EXCLUDED.fk_profile,
      enabled = EXCLUDED.enabled,
      fk_last_modifier = EXCLUDED.fk_last_modifier
    RETURNING   ${selectCols.join(', ')}
    ;`;

    ProDfhProfileProjRel.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
