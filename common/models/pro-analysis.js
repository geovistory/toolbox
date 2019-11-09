'use strict';
const AnalysisRemotes = require('../../dist/analysis/analysis-remotes')
  .AnalysisRemotes;
module.exports = function(ProAnalysis) {
  /**
   * Run an analysis.
   */
  ProAnalysis.run = (...params) => {
    return new AnalysisRemotes(ProAnalysis.dataSource.connector).run(...params);
  };

  ProAnalysis.runAnalysisById = function(pkAnalysis) {};

  /**
   * Run a query devlivered as queryDefinition object by the caller.
   *
   */
  ProAnalysis.runQueryDefinition = function(queryFilter, fkAnalysisType) {};
};
