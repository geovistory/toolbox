'use strict';

var QueryBuilder = require("../classes/QueryBuilder");

const Json2csvParser = require('json2csv').Parser;

module.exports = function (ComQuery) {

    ComQuery.run = function (fkProject, query, ctx, cb) {

        const q = new QueryBuilder().buildQuery(query, fkProject);

        ComQuery.dataSource.connector.execute(q.sql, q.params, (err, resultObjects) => {
            if (err) cb(err, resultObjects);
            else cb(false, resultObjects)
        });

    };

    ComQuery.runVersion = function (pkProject, pkEntity, version, ctx, cb) {

        const sql = `
            SELECT * FROM (
                select * from commons.query
                Union
                select * from commons.query_vt
            ) as queries
            WHERE queries.fk_project = $1
            AND queries.pk_entity = $2
            AND queries.entity_version = $3`;

        const params = [pkProject, pkEntity, version]

        // get the query version
        ComQuery.dataSource.connector.execute(sql, params, (err, resultObjects) => {
            if (err) cb(err, resultObjects);
            else {
                // Q: is query version found?
                if(resultObjects && resultObjects.length){
                    const queryDef = resultObjects[0].query;
                    const q = new QueryBuilder().buildQuery(queryDef, pkProject);
                    ComQuery.dataSource.connector.execute(q.sql, q.params, (err, resultObjects) => {
                        if (err) cb(err, resultObjects);
                        else cb(false, resultObjects)
                    });
                }
                else {
                    cb('Query not found.')
                }
            }
        });


    };

    ComQuery.beforeRemote('create', function (ctx, unused, next) {

        if (!ctx.args.options.accessToken.userId) return Error('AccesToken.userId is missing.');
        ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

        next()
    })

    ComQuery.beforeRemote('patchAttributes', function (ctx, unused, next) {

        if (!ctx.args.options.accessToken.userId) return Error('AccesToken.userId is missing.');
        ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

        next()
    })


    ComQuery.findPerProject = function (fkProject, limit, offset, ctx, cb) {

        const sql = `
            SELECT
            latest.name,
            latest.description,
            latest.query,
            latest.fk_project,
            latest.fk_last_modifier,
            latest.pk_entity,
            latest.entity_version,
            latest.notes,
            latest.tmsp_creation,
            latest.tmsp_last_modification,
            latest.sys_period,
            vt.versions
            FROM commons.query latest
            LEFT JOIN ( 
                SELECT pk_entity, json_agg(entity_version ORDER BY entity_version DESC) versions
                FROM commons.query_vt
                GROUP BY pk_entity
            ) AS vt ON vt.pk_entity = latest.pk_entity
            WHERE 
            latest.fk_project = $1
        `
        const params = [fkProject]
        ComQuery.dataSource.connector.execute(sql, params, (err, resultObjects) => {
            if (err) return cb(err, resultObjects);
            cb(false, resultObjects)
        });

    };

    ComQuery.findByIdAndProject = function (fkProject, pkEntity, ctx, cb) {

        const filter = {
            where: [
                'fk_project', '=', fkProject,
                'AND', 'pk_entity', '=', pkEntity
            ]
        }

        ComQuery.findComplex(filter, (err, resultObjects) => {
            const resultObject = (resultObjects && resultObjects.length) ? resultObjects[0] : {};
            cb(err, resultObject);
        })

    };

    ComQuery.findByIdAndVersionAndProject = function (fkProject, pkEntity, version, ctx, cb) {


        const sql = `
            SELECT
            name,
            description,
            query,
            fk_project,
            fk_last_modifier,
            pk_entity,
            entity_version,
            notes,
            tmsp_creation,
            tmsp_last_modification,
            sys_period
            FROM (
                SELECT * from commons.query latest
                UNION
                SELECT * from commons.query_vt vt
            ) as all_versions
            WHERE  fk_project = $1 AND pk_entity = $2 AND entity_version = $3 
        `

        const params = [fkProject, pkEntity, version]
        ComQuery.dataSource.connector.execute(sql, params, (err, resultObjects) => {
            if (err) return cb(err, resultObjects);
            cb(false, resultObjects)
        });
    };



    ComQuery.runAndExport = function (fkProject, query, filetype, ctx, cb) {
        const allowedFileTypes = ['json', 'csv', 'xls']
        if (allowedFileTypes.indexOf(filetype) === -1) {
            return cb(new Error('This filetype is not supported.'))
        }
        delete query.limit;
        delete query.offset;
        const q = new QueryBuilder().buildQuery(query, fkProject);

        const flattenResults = (resultObjects) => {
            const fieldObj = {}
            const flatResults = resultObjects.map(obj => {
                const flat = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const element = obj[key];

                        if (typeof element === 'object') {
                            if (Array.isArray(element)) {
                                flat[key] = element.length;
                                fieldObj[key] = true;
                            }
                            // ignore {} objects
                        } else {
                            flat[key] = element;
                            fieldObj[key] = true;
                        }
                    }
                }
                return flat;
            })
            return {
                fields: Object.keys(fieldObj),
                data: flatResults
            }
        }

        ComQuery.dataSource.connector.execute(q.sql, q.params, (err, resultObjects) => {
            if (err) return cb(err, resultObjects);
            else if (filetype === 'json') {
                cb(false, JSON.stringify(resultObjects, null, 2))
            }
            else if (filetype === 'csv') {
                const { fields, data } = flattenResults(resultObjects);
                try {
                    const parser = new Json2csvParser({ fields });
                    const csv = parser.parse(data);
                    cb(false, csv)
                } catch (err) {
                    cb(err);
                }
            }
            else if (filetype === 'xls') {
                const { fields, data } = flattenResults(resultObjects);
                try {
                    const parser = new Json2csvParser({ fields, excelStrings: true });
                    const xls = parser.parse(data);
                    cb(false, xls)
                } catch (err) {
                    cb(err);
                }
            }



        });

    };



};
