var findComplex = require('../../custom/findComplex.js');
var exclude = [];
var include = [
  "InfPersistentItem",
  "InfRole",
  "InfAppellation",
  "InfTemporalEntity",
  "InfLanguage",
  "Project",
  "InfEntityAssociation",
  "InfChunk",
  "InfDigitalObject",
  "InfPlace",
  "DfhClass",
  "DfhClassProfileView",
  "DfhProperty",
  "DfhPropertyProfileView",
  "ComUiContext",
  "ComUiContextConfig",
  "ComUiClassConfig",
  "ComPropertySet",
  "ComPropertySetClassRel"
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
        // cb();
      }
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
  });
}
