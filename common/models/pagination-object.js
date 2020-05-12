'use strict';
var SqlListAlternativeLeafItems = require('../../dist/server/sql-builders/sql-list-alternative-leaf-items')
  .SqlListAlternativeLeafItems;

var _ = require('lodash');

module.exports = function(PaginationObject) {
  /**
   * Returns a PaginationObject with everything needed to create a list of
   * leaf items (to add), related to the given source entity through statements
   * that are not in the current project
   */
  PaginationObject.listAlternativeLeafItems = function(
    pkProject,
    pkExpressionEntity,
    limit,
    offset,
    cb
  ) {
    const q = new SqlListAlternativeLeafItems(
      PaginationObject.app.models
    ).create(pkProject, pkExpressionEntity, limit, offset);
    PaginationObject.query(pkProject, q, false, cb);
  };

  /**
   * internal function to execute query
   */
  PaginationObject.query = function(
    pkProject,
    query,
    extendEntityPreviewStream,
    cb
  ) {
    const connector = PaginationObject.dataSource.connector;
    connector.execute(query.sql, query.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;

      // add entity_previews to chache of project
      if (
        extendEntityPreviewStream &&
        data.schemas &&
        data.schemas.war &&
        data.schemas.war.entity_preview
      ) {
        const caches =
          PaginationObject.app.models.WarEntityPreview.cachesByProject;
        let previousCache = caches[pkProject] || {};
        const streamedPks = {};
        data.schemas.war.entity_preview.forEach(ep => {
          streamedPks[ep.pk_entity] = true;
        });

        previousCache = {
          ...previousCache,
          streamedPks: {
            ...(previousCache.streamedPks || {}),
            ...streamedPks,
          },
        };
      }

      return cb(false, data);
    });
  };
};
