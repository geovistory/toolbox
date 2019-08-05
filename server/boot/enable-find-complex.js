var findComplex = require('../custom/findComplex');
var { getAuthorizedAclMethods } = require('../../node_modules/loopback-setup-remote-methods-mixin/lib/utils')
var exclude = [];
var include = [
  "SysAppContext",
  "ProClassFieldConfig",
  "SysClassField",
  "ProProject",
  "ProQuery",
  "ProDfhClassProjRel",
  "DfhClass",
  "DfhLabel",
  "DfhClassProfileView",
  "DfhProperty",
  "DfhPropertyProfileView",
  "InfPersistentItem",
  "InfRole",
  "InfAppellation",
  "InfTemporalEntity",
  "InfLanguage",
  "InfEntityAssociation",
  "DatChunk",
  "DatDigital",
  "InfPlace",
  "DatNamespace",
  "WarEntityPreview",
];

module.exports = function (app) {
  models = app.models();
  models.forEach(function (model) {
    modelName = model.definition.name;
    dataSource = model.getDataSource();
    if (dataSource != null) {
      adapter = dataSource.adapter.name;
    }
    else {
      adapter = false;
    }
    if (exclude.indexOf(modelName) == -1 && adapter == 'postgresql' && (include.length == 0 || include.indexOf(modelName) != -1)) {
      model.findComplex = function (filter, cb) {
        complex = new findComplex(model);
        complex.init();
        complex.find(filter, cb);
        // return cb.promise;
      }

      // Q: Is the findComplex method of the current model authorized by ACL?
      const isAuthorized = getAuthorizedAclMethods(model).indexOf('findComplex') > -1;
      // A: If so, add remote method
      if (isAuthorized) {
        model.remoteMethod('findComplex', {
          http: { path: '/findComplex', verb: 'POST' },
          accepts: {
            arg: 'filter', type: 'object', "http": {
              "source": "body"
            }
          },
          returns: { arg: modelName, type: 'array', root: true }
        });

      }
    }
  });
}
