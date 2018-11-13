'use strict';

const Promise = require('bluebird');
const Config = require('../config/Config');

module.exports = function (InfTypeNamespaceRel) {

    InfTypeNamespaceRel.findOrCreateInfTypeNamespaceRel = function (projectId, data, ctx) {

        const dataObject = {
            fk_persistent_item: data.fk_persistent_item,
            fk_namespace: data.fk_namespace
        };

        const pk_namespace = data.fk_namespace;
        const errorMsg = 'You\'re not authorized to perform this action.';

        // let pass if namespace is "Geovistory Ongoing"
        if (pk_namespace == Config.PK_NAMESPACE__GEOVISTORY_ONGOING) {
            return InfTypeNamespaceRel.findOrCreateByValue(InfTypeNamespaceRel, projectId, dataObject)
        }

        return InfPersistentItem.app.models.InfNamespace.findById(pk_namespace)
            .then((nmsp) => {
                // let pass if namespace belongs to project
                if (nmsp && nmsp.fk_project == projectId) {
                    return InfTypeNamespaceRel.findOrCreateByValue(InfTypeNamespaceRel, projectId, dataObject)
                }
                else return Promise.reject(new Error(errorMsg));;
            })
            .catch(() => {
                return Promise.reject(new Error(errorMsg))
            })

    }

};
