'use strict';

module.exports = function (ProInfoProjRel) {

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
    ProInfoProjRel.updateEprAttributes = function (pkProject, pkEntity, eprAttributes, ctx) {

        if (!ctx.req.accessToken.userId) return Error('AccessToken missing');
        const accountId = ctx.req.accessToken.userId;

        if (eprAttributes['fk_entity']) {
            delete eprAttributes['fk_entity'];
        }

        if (eprAttributes['fk_project']) {
            delete eprAttributes['fk_project'];
        }

        eprAttributes.fk_last_modifier = accountId;

        // check if there is an existing epr
        return ProInfoProjRel.findOne({
            where: {
                fk_entity: pkEntity,
                fk_project: pkProject
            }
        }).catch((err) => { return err; })
            .then(existingEpr => {

                if (existingEpr) {
                    // update existing epr
                    return existingEpr.updateAttributes(eprAttributes);
                }
                else {

                    const error = new Error("No ProInfoProjRel found for given project and entity");
                    error.status = 404;
                    return error;

                }

            })

    }


    /**
     * Internal function to create the $relation property of
     * a filter object for findComplex() to join the entity_version_project_rels.
     * 
     * Usage: add the returned object to the entity_version_project_rels property of
     * any information.entity derivate, e.g.
     * {
     *  ...
     *  entity_version_project_rels: ProInfoProjRel.getJoinObject(true, 12)
     * } 
     */
    ProInfoProjRel.getJoinObject = function (ofProject, pkProject) {
        return {
            "$relation": {
                "name": "entity_version_project_rels",
                "joinType": (ofProject ? "inner join" : "left join"),
                "where": [
                    "fk_project", "=", pkProject,
                    "and", "is_in_project", "=", "true"
                ]
            }
        };
    }

    ProInfoProjRel.beforeRemote('patchOrCreate', function (ctx, unused, next) {

        if (!ctx.args.options.accessToken.userId) return Error('AccesToken.userId is missing.');
        ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

        next()
    })


}