'use strict';

module.exports = function (ProDfhClassProjRel) {
  ProDfhClassProjRel.getEnabledByProject = function (pkProject, ctx, cb) {

    ProDfhClassProjRel.findComplex({
      where: [
        'fk_project', '=', pkProject,
        'AND', 'enabled_in_entities', '=', 'true'
      ]
    }, cb)


  };
};
