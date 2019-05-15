'use strict';
const _ = require('lodash')

module.exports = function (InfTextProperty) {

    InfTextProperty.findOrCreateInfTextProperty = function (pkProject, data, ctx) {
        return new Promise((resolve, reject) => {

            const dataObject = {
                quill_doc: data.quill_doc,
                fk_class_field: data.fk_class_field,
                fk_concerned_entity: data.fk_concerned_entity,
                fk_language: data.fk_language
            };

            const requestedObj = (ctx && ctx.req && ctx.req.body) ? ctx.req.body : undefined;
            const ctxWithoutBody = _.omit(ctx, ['req.body']);

            InfTextProperty._findOrCreateByValue(InfTextProperty, pkProject, dataObject, requestedObj, ctxWithoutBody)
                .then(textProperties => {
                    const txtProp = textProperties[0].toJSON();
                    InfTextProperty.app.models.InfLanguage.findById(txtProp.fk_language)
                        .then(language => {
                            txtProp.language = language;
                            resolve([txtProp]);
                        })
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        });
    }
};
