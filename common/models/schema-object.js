'use strict';
const SqlRamList = require('../../dist/server/sql-builders/sql-ram-list')
  .SqlRamList;

module.exports = function(SchemaObject) {
  SchemaObject.getRamList = function(pkProject, pkEntity, ctx, cb) {
    const q = new SqlRamList(SchemaObject.app.models).create(
      pkProject,
      pkEntity
    );
    SchemaObject.query(q, cb);
  };

  /**
   * internal function to execute query
   */
  SchemaObject.query = function(query, cb) {
    const connector = SchemaObject.dataSource.connector;
    connector.execute(query.sql, query.params, (err, result) => {
      if (err) return cb(err);
      const item = result[0];
      const data = !item ? {} : item.data;
      return cb(false, data);
    });
  };
};
