'use strict';


var SqlEntityRemoveFromProject = require('../../../dist/lb3/server/sql-builders/sql-entity-remove-from-project')
  .SqlEntityRemoveFromProject;
var SqlEntityAddToProject = require('../../../dist/lb3/server/sql-builders/sql-entity-add-to-project')
  .SqlEntityAddToProject;

var _ = require('lodash');

module.exports = function (SchemaObject) {

  /**
   * Remove entity, outgoing statements, text properties
   * and namings from project
   */
  SchemaObject.removeEntityFromProject = function (
    pkProject,
    pkEntity,
    ctx,
    cb
  ) {
    if (!ctx.req.accessToken.userId)
      return reject(Error('AccessToken missing'));

    const accountId = ctx.req.accessToken.userId;

    const q = new SqlEntityRemoveFromProject(SchemaObject.app.models).create(
      pkProject,
      pkEntity,
      accountId
    );
    SchemaObject.query(pkProject, q, cb);
  };

  /**
   * Add entity, outgoing statements, text properties
   * and namings to project
   */
  SchemaObject.addEntityToProject = function (pkProject, pkEntity, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return reject(Error('AccessToken missing'));

    const accountId = ctx.req.accessToken.userId;

    const q = new SqlEntityAddToProject(SchemaObject.app.models).create(
      pkProject,
      pkEntity,
      accountId
    );
    SchemaObject.query(pkProject, q, cb);
  };


  /**
   * internal function to execute query
   */
  SchemaObject.query = function (pkProject, query, cb) {
    const connector = SchemaObject.dataSource.connector;
    connector.execute(query.sql, query.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;

      // // add entity_previews to chache of project
      // if (data.war && data.war.entity_preview) {
      //   const caches = SchemaObject.app.models.WarEntityPreview.cachesByProject;
      //   let previousCache = caches[pkProject] || {};
      //   const streamedPks = {};
      //   data.war.entity_preview.forEach(ep => {
      //     streamedPks[ep.pk_entity] = true;
      //   });

      //   previousCache = {
      //     ...previousCache,
      //     streamedPks: {
      //       ...(previousCache.streamedPks || {}),
      //       ...streamedPks,
      //     },
      //   };
      // }

      return cb(false, data);
    });
  };
};
