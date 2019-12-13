'use strict';
const Promise = require('bluebird');

const OntoMe = require('../../dist/server/ontome/ontome').OntoMe;

module.exports = function(DfhProfile) {
  DfhProfile.updateFromOntoMe = function(fkProfile, requestedLanguage, cb) {
    return new OntoMe(cb, DfhProfile.dataSource.connector).updateProfileData(
      fkProfile,
      requestedLanguage
    );
  };

  DfhProfile.updateAndAddToProject = function(
    fkProject,
    fkProfile,
    requestedLanguage,
    cb
  ) {
    return new OntoMe(cb, DfhProfile.dataSource.connector).addToProject(
      fkProject,
      fkProfile,
      requestedLanguage
    );
  };
};
