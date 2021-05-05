'use strict';
var SqlBuilderLbModels = require('../../../dist/lb3/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;

const OntoMe = require('../../../dist/lb3/server/ontome/ontome').OntoMe;

module.exports = function(DfhProfile) {
  // DfhProfile.updateFromOntoMe = function(fkProfile, requestedLanguage, cb) {
  //   return new OntoMe(cb, DfhProfile.dataSource.connector).updateProfileData(
  //     fkProfile,
  //     requestedLanguage
  //   );
  // };

  // DfhProfile.updateAndAddToProject = function(
  //   fkProject,
  //   fkProfile,
  //   requestedLanguage,
  //   cb
  // ) {
  //   return new OntoMe(cb, DfhProfile.dataSource.connector).addProfileToProject(
  //     fkProject,
  //     fkProfile,
  //     requestedLanguage
  //   );
  // };

  // DfhProfile.deactivateProfileForProject = function(fkProject, fkProfile, cb) {
  //   return new OntoMe(
  //     cb,
  //     DfhProfile.dataSource.connector
  //   ).deactivateProfileForProject(fkProject, fkProfile);
  // };

  // DfhProfile.getActivationReport = function(
  //   geovistoryProjectId,
  //   ontomeProfileId,
  //   requestedLanguage,
  //   cb
  // ) {
  //   return new OntoMe(cb, DfhProfile.dataSource.connector).getActivationReport(
  //     geovistoryProjectId,
  //     ontomeProfileId,
  //     requestedLanguage
  //   );
  // };

  // DfhProfile.getDeactivationReport = function(
  //   geovistoryProjectId,
  //   ontomeProfileId,
  //   cb
  // ) {
  //   return new OntoMe(
  //     cb,
  //     DfhProfile.dataSource.connector
  //   ).getDeactivationReport(geovistoryProjectId, ontomeProfileId);
  // };

  /**
   * Query classes
   *
   * Of a specific project
   *
   */
  DfhProfile.ofProject = function(pkProject, cb) {
    const q = new SqlBuilderLbModels(DfhProfile.app.models);

    const params = [pkProject];

    const sql = `
      SELECT
        ${q.createSelect('t2', 'DfhProfile')}
      FROM
        projects.dfh_profile_proj_rel t1,
        data_for_history.v_profile t2
      WHERE t1.fk_project = $1
      AND t2.pk_profile = t1.fk_profile
      UNION ALL
      SELECT
        ${q.createSelect('t1', 'DfhProfile')}
      FROM
        data_for_history.v_profile t1
      WHERE t1.pk_profile = 5; -- GEOVISTORY BASICS PROFILE
      `;

    DfhProfile.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
