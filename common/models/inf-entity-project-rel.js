'use strict';

module.exports = function (InfEntityProjectRel) {

    /**
     * Updates the epr with provided eprAttributes, where the epr has
     * fk_project = projectId AND 
     * fk_entity = pkEntity
     * 
     * 
     * Remark:
     * You can change all epr attributes except fk_project and fk_entity
     *  
     * @param {*} projectId 
     * @param {*} pkEntity 
     * @param {*} eprAttributes 
     */
    InfEntityProjectRel.updateEprAttributes = function (projectId, pkEntity, eprAttributes) {

        if (eprAttributes['fk_entity']) {
            delete eprAttributes['fk_entity'];
        }

        if (eprAttributes['fk_project']) {
            delete eprAttributes['fk_project'];
        }

        // check if there is an existing epr
        return InfEntityProjectRel.findOne({
            where: {
                fk_entity: pkEntity,
                fk_project: projectId
            }
        }).catch((err) => { return err; })
            .then(existingEpr => {

                if (existingEpr) {
                    // update existing epr
                    return existingEpr.updateAttributes(eprAttributes);

                }
                else {

                    const error = new Error("No InfEntityProjectRel found for given project and entity");
                    error.status = 404;
                    return error;
                    
                }

            })

    }
};
