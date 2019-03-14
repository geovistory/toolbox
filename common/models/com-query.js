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

        // ensure limit is max. 100
        limit = (limit > 100 || !limit) ? 100 : limit;

        const filter = {
            where: ['fk_project', '=', fkProject],
            limit,
            offset
        }

        ComQuery.findComplex(filter, cb)

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
