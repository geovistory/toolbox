'use strict';
// const Promise = require('bluebird');
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(ProDfhClassProjRel) {
  ProDfhClassProjRel.getEnabledByProject = function(pkProject, ctx, cb) {
    ProDfhClassProjRel.findComplex(
      {
        where: [
          'fk_project',
          '=',
          pkProject,
          'AND',
          'enabled_in_entities',
          '=',
          'true',
        ],
      },
      cb
    );
  };

  // ProDfhClassProjRel.beforeRemote('bulkUpsert', function(ctx, unused, next) {
  //   if (!ctx.args.options.accessToken.userId)
  //     return Error('AccesToken.userId is missing.');
  //   ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

  //   next();
  // });

  ProDfhClassProjRel.bulkUpsert = function(pkProject, items, ctx, cb) {
    const userId = ctx.req.accessToken.userId;

    const params = [];
    function addParam(val) {
      params.push(val);
      return '$' + params.length;
    }
    const selectCols = new FlatObjectQueryBuilder(
      ProDfhClassProjRel.app.models
    ).getColumns('ProDfhClassProjRel');

    const sql = `INSERT INTO projects.dfh_class_proj_rel (
      fk_project,
     fk_entity,
     enabled_in_entities,
     fk_last_modifier
     )
    VALUES
    ${items
      .map(
        item => `(
      ${addParam(pkProject)},
      ${addParam(item.fk_entity)},
      ${addParam(item.enabled_in_entities)},
      ${addParam(userId)}
    )`
      )
      .join(', ')}
    ON CONFLICT (fk_project, fk_entity)
    DO UPDATE SET
      fk_project = EXCLUDED.fk_project,
      fk_entity = EXCLUDED.fk_entity,
      enabled_in_entities = EXCLUDED.enabled_in_entities,
      fk_last_modifier = EXCLUDED.fk_last_modifier
    RETURNING   ${selectCols.join(', ')}
    ;`;

    ProDfhClassProjRel.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
