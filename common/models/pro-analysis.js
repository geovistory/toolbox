'use strict';
const AnalysisRemotes = require('../../dist/server/analysis/analysis-remotes')
  .AnalysisRemotes;
module.exports = function(ProAnalysis) {
  /**
   * Run an analysis.
   */
  ProAnalysis.run = (...params) => {
    return new AnalysisRemotes(ProAnalysis.dataSource.connector).run(...params);
  };

  ProAnalysis.runAnalysisById = function(pkAnalysis) {};

  ProAnalysis.beforeRemote('create', function(ctx, unused, next) {
    if (!ctx.args.options.accessToken.userId)
      return Error('AccesToken.userId is missing.');

    const v = AnalysisRemotes.validateProAnalysis(ctx.req.body);
    if (v) return Error(v);

    next();
  });
};
