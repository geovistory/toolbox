'use strict';

module.exports = function (DatNamespace) {

  DatNamespace.byProject = function (pkProject, cb) {
    DatNamespace.findComplex({
      where: ['fk_project', '=', pkProject]
    }, cb)
  }

};
