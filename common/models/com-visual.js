'use strict';

module.exports = function (ComVisual) {
    ComVisual.beforeRemote('create', function (ctx, unused, next) {

        if (!ctx.args.options.accessToken.userId) return Error('AccesToken.userId is missing.');
        ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

        next()
    })

    ComVisual.beforeRemote('patchAttributes', function (ctx, unused, next) {

        if (!ctx.args.options.accessToken.userId) return Error('AccesToken.userId is missing.');
        ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

        next()
    })


    // ComVisual.findPerProject = function (fkProject, limit, offset, ctx, cb) {

    //     const sql = `
    //         SELECT
    //         latest.name,
    //         latest.description,
    //         latest.visual,
    //         latest.fk_project,
    //         latest.fk_last_modifier,
    //         latest.pk_entity,
    //         latest.entity_version,
    //         latest.notes,
    //         latest.tmsp_creation,
    //         latest.tmsp_last_modification,
    //         latest.sys_period,
    //         vt.versions
    //         FROM commons.visual latest
    //         LEFT JOIN ( 
    //             SELECT pk_entity, json_agg(entity_version ORDER BY entity_version DESC) versions
    //             FROM commons.visual_vt
    //             GROUP BY pk_entity
    //         ) AS vt ON vt.pk_entity = latest.pk_entity
    //         WHERE 
    //         latest.fk_project = $1
    //     `
    //     const params = [fkProject]
    //     ComVisual.dataSource.connector.execute(sql, params, (err, resultObjects) => {
    //         if (err) return cb(err, resultObjects);
    //         cb(false, resultObjects)
    //     });

    // };


    ComVisual.findPerIdAndVersionAndProject = function (fkProject, pkEntity, version, ctx, cb) {

        const params = []
        const addPram = (param) => {
            params.push(param)
            return '$' + params.length;
        }

        const sql = `
        WITH all_versions AS (
            SELECT *, true as is_latest from commons.visual latest
            UNION
            SELECT *, false as is_latest  from commons.visual_vt vt
        )
         SELECT
            all_versions.name,
            all_versions.description,
            all_versions.visual,
            all_versions.fk_project,
            all_versions.fk_last_modifier,
            all_versions.pk_entity,
            all_versions.entity_version,
            all_versions.notes,
            all_versions.tmsp_creation,
            all_versions.tmsp_last_modification,
            all_versions.sys_period,
            vt.versions
            FROM all_versions
            LEFT JOIN ( 
                SELECT pk_entity, json_agg(entity_version ORDER BY entity_version DESC) versions
                FROM all_versions
                GROUP BY pk_entity
            ) AS vt ON vt.pk_entity = all_versions.pk_entity
            WHERE all_versions.fk_project = ${addPram(fkProject)} 
            ${pkEntity ? `AND all_versions.pk_entity = ${addPram(pkEntity)}` : ''}
            ${version ?
                `AND entity_version = ${addPram(version)}` :
                `AND all_versions.is_latest = ${addPram(true)}`
            }
        `

        ComVisual.dataSource.connector.execute(sql, params, (err, resultObjects) => {
            if (err) return cb(err, resultObjects);
            cb(false, resultObjects)
        });

    };


};
