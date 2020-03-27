var logFn = require('../../server/scripts/log-deserialized-sql');

class FlatObjectQueryBuilder {
  constructor(models) {
    this.params = [];
    this.models = models;
  }

  /**
   * Helpers
   */

  getColumns(modelName) {
    const propDefs = this.models[modelName].definition.properties;
    const columns = [];
    for (const colName in propDefs) {
      if (propDefs.hasOwnProperty(colName)) {
        if (!propDefs[colName].hidden) columns.push(colName);
      }
    }
    return columns;
  }
  createSelect(alias, model) {
    const columns = this.getColumns(model);
    return columns.map(c => alias + '.' + c).join(`,
    `);
  }
  createBuildObject(alias, model) {
    const columns = this.getColumns(model);
    return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `;
  }
  addParam(val) {
    this.params.push(val);
    return '$' + this.params.length;
  }

  addParams(vals) {
    return vals.map(val => this.addParam(val)).join(',');
  }
}
module.exports = FlatObjectQueryBuilder;
