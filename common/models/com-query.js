'use strict';
var sqlFormatter = require("sql-formatter");

class QueryBuilder {

    constructor() {
        this.params = [];
        this.sql = '';
        this.tableAliases = [];

        this.selects = [];
        this.froms = [];
        this.wheres = [];
        this.groupBys = [];

        this.limit = ''
        this.offset = ''
    }

    buildQuery(query, fkProject) {

        const rootTableAlias = this.addTableAlias()


        // root table where 
        this.wheres.push(this.createEntityWhere(query.filter, rootTableAlias, fkProject))

        // root table from
        this.froms.push(`warehouse.entity_preview ${rootTableAlias}`)

        // create froms and wheres according to filter definition  
        this.createFilterFroms(query.filter, rootTableAlias, fkProject)
        this.createFilterWheres(query.filter)

        // create froms and selects according to column definition
        this.createColumnsFroms(query.columns, rootTableAlias, fkProject)
        this.createColumnsSelects(query.columns, rootTableAlias)
        this.createColumnGroupBys(query.columns, rootTableAlias)


        // create limit, offset
        this.createLimitAndOffset(query)
        // create select of full_count
        this.createFullCount()

        this.sql = `
        SELECT 
            ${this.joinSelects(this.selects)}

        FROM
            ${this.joinFroms(this.froms)}

        WHERE
            ${this.joinWheres(this.wheres, 'AND')}

        GROUP BY
            ${this.joinGroupBys(this.groupBys)}      
        ${this.limit}
        ${this.offset}
        `

        console.log('params', this.params)
        let forLog = this.sql;
        this.params.forEach((param, i) => {
            forLog = forLog.replace(('$' + (i + 1)), param)
        })
        console.log(`
        "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
        ${sqlFormatter.format(forLog, { language: 'pl/sql' })}

        `)

        return {
            sql: this.sql,
            params: this.params
        }
    }
    /**
     * if there is limit and offset provided, this function adds:
     * - a limit
     * - a offset
     * @param {*} query 
     */
    createLimitAndOffset(query) {
        if (
            typeof query.limit !== 'number' ||
            typeof query.offset !== 'number' ||
            query.limit < 1 || query.offset < 0
        ) return ''



        this.limit = `LIMIT ${this.addParam(query.limit)}`
        this.offset = `OFFSET ${this.addParam(query.offset)}`
    }

    createFullCount() {
        this.selects.push('count(*) OVER() AS full_count')
    }

    createColumnsFroms(columns, leftTableAlias, fkProject) {
        columns.forEach(column => {
            this.createColumnFroms(column, leftTableAlias, fkProject)
        })
    }

    createColumnFroms(column, leftTableAlias, fkProject, level = 0) {

        if (!column.ofRootTable) {
            let thisTableAlias;
            column.queryPath.forEach((segment, index) => {
                console.log(level)

                if (this.isRolesJoin(segment) || this.isEntitesJoin(segment)) {
                    thisTableAlias = this.addTableAlias();
                    segment._tableAlias = thisTableAlias;
                }

                // JOIN roles
                if (this.isRolesJoin(segment)) {
                    this.joinRoles(segment, leftTableAlias, thisTableAlias, fkProject);
                }
                // JOIN entities
                else if (this.isEntitesJoin(segment)) {
                    this.joinEntities(segment, leftTableAlias, thisTableAlias, fkProject);
                }
                leftTableAlias = thisTableAlias;
            })
        }
    }

    createColumnsSelects(columns, leftTableAlias) {
        columns.forEach(column => {

            if (column.ofRootTable) {
                if (column.colName) {
                    this.selects.push(`${leftTableAlias}.${column.colName} AS "${column.label}"`)
                } else if (column.defaultType === 'entity_preview') {
                    column.colNames = ['pk_entity',
                        'entity_type',
                        'entity_label',
                        'class_label',
                        'type_label',
                        'time_span']
                    this.selects.push(`jsonb_build_object(
                        'pk_entity', ${leftTableAlias}.pk_entity,
                        'entity_type', ${leftTableAlias}.entity_type,
                        'entity_label', ${leftTableAlias}.entity_label,
                        'class_label', ${leftTableAlias}.class_label,
                        'type_label', ${leftTableAlias}.type_label,
                        'time_span', ${leftTableAlias}.time_span
                      ) AS "${column.label}"`)
                }
            } else if (column.queryPath && column.queryPath.length) {
                // create a select for the last segment in the queryPath
                this.createColumnSelect(column.queryPath[column.queryPath.length - 1], column.label)
            }
        })
    }

    createColumnSelect(segment, columnLabel) {

        if (this.isRolesJoin(segment)) {

        } else if (this.isEntitesJoin(segment)) {


            this.selects.push(`COALESCE(json_agg( distinct jsonb_build_object(
            'pk_entity', ${segment._tableAlias}.pk_entity,
            'entity_type', ${segment._tableAlias}.entity_type,
            'entity_label', ${segment._tableAlias}.entity_label,
            'class_label', ${segment._tableAlias}.class_label,
            'type_label', ${segment._tableAlias}.type_label,
            'time_span', ${segment._tableAlias}.time_span
          )
       ) FILTER (WHERE ${segment._tableAlias}.pk_entity IS NOT NULL), '[]') AS "${columnLabel}"`)

        }

    }


    createFilterFroms(node, leftTableAlias, fkProject, level = 0) {
        if (level > 0) {
            // JOIN roles
            if (this.isRolesJoin(node)) {
                this.joinRoles(node, leftTableAlias, node._tableAlias, fkProject);
                leftTableAlias = node._tableAlias;
            }
            // JOIN entities
            else if (this.isEntitesJoin(node)) {
                this.joinEntities(node, leftTableAlias, node._tableAlias, fkProject);
                leftTableAlias = node._tableAlias;
            }

        }

        console.log(level)

        node.children.forEach(childNode => {
            if (this.isRolesJoin(childNode) || this.isEntitesJoin(childNode)) {
                childNode._tableAlias = this.addTableAlias();
                this.createFilterFroms(childNode, leftTableAlias, fkProject, (level + 1))
            } else {
                childNode._tableAlias = this.addTableAlias();
                this.createFilterFroms(childNode, leftTableAlias, fkProject, (level + 1))
            }

        })
    }

    joinEntities(node, parentTableAlias, thisTableAlias, fkProject) {
        this.froms.push(`    
                    LEFT JOIN warehouse.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_temporal_entity = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `);
    }

    joinRoles(node, parentTableAlias, thisTableAlias, fkProject) {
        const topLevelWheres = [];
        topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `);
        const secondLevelWheres = [];
        if (node.data.ingoingProperties.length) {
            secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.ingoingProperties)}))
                    `);
        }
        if (node.data.outgoingProperties.length) {
            secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.outgoingProperties)}))
                    `);
        }
        if (secondLevelWheres.length) {
            topLevelWheres.push(`(
                         ${this.joinWheres(secondLevelWheres, 'OR')} 
                    )`);
        }
        this.froms.push(`    
                LEFT JOIN warehouse.v_roles_per_project_and_repo ${thisTableAlias} ON 
                 ${this.joinWheres(topLevelWheres, 'AND')}
                `);
    }

    createEntityWhere(filter, tableAlias, fkProject) {

        const whereProject = `${tableAlias}.fk_project = ${this.addParam(fkProject)}`

        const classOrTypeWheres = [];
        if (filter.data && filter.data.classes && filter.data.classes.length) {
            classOrTypeWheres.push(`${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`)
        }
        if (filter.data && filter.data.types && filter.data.types.length) {
            classOrTypeWheres.push(`${tableAlias}.fk_type IN (${this.addParams(filter.data.types)})`)
        }

        const topLevelWheres = [];
        topLevelWheres.push(whereProject);
        if (classOrTypeWheres.length) {
            topLevelWheres.push(` ( ${this.joinWheres(classOrTypeWheres, 'OR')} )`)
        }

        return `
        ${this.joinWheres(topLevelWheres, 'AND')}
        `
    }


    createFilterWheres(node, level = 0) {
        let nodeWheres = [];
        console.log(level)

        node.children.forEach(childNode => {
            let childNodeWheres;
            // climb into the tree up to the leaf
            if (childNode.children.length) {
                childNodeWheres = this.createFilterWheres(childNode, (level + 1));
            }

            // create the where clause for the entity table 
            if (childNode.data.classes || childNode.data.types) {
                nodeWheres.push(`${childNode._tableAlias}.pk_entity IS NOT NULL`)
            }

            // create the where clause for the role table 
            if (childNode.data.ingoingProperties || childNode.data.outgoingProperties) {
                const equals = childNode.data.operator === 'IS' ? 'IS NOT NULL'
                    : childNode.data.operator === 'IS NOT' ? 'IS NULL'
                        : 'IS NOT NULL'; // DEFAULT 

                nodeWheres.push(`${childNode._tableAlias}.fk_entity ${equals}`)
            }

            if (childNodeWheres) {
                let childrenSql;
                // if we are in a subgroup node 
                if (childNode.data.subgroup) {
                    // join the wheres of this subgroup's children
                    childrenSql = childNodeWheres.join(`
                        ${childNode.data.operator}
                    `)

                } else {
                    // get the first childNodeWhere of childNodeWheres
                    childrenSql = childNodeWheres.join('')
                }

                nodeWheres.push(`
                    (  -- subgroup
                        ${childrenSql}
                    )
                `)

            }

        })

        if (level === 0 && nodeWheres.length > 0) {
            this.wheres.push(`
            -- filter wheres
            (
                ${nodeWheres.join(`
                    AND
                `)}
            )`)
        }

        return nodeWheres;

    }

    /**
     * Returns true, if given node is for joining roles
     * @param {*} node 
     */
    isRolesJoin(node) {
        if (!node || typeof node.data !== 'object') return false;
        return (node.data.ingoingProperties || node.data.outgoingProperties)
    }
    /**
     * Returns true, if given node is for joining entities
     * @param {*} node 
     */
    isEntitesJoin(node) {
        if (!node || typeof node.data !== 'object') return false;
        return (node.data.classes || node.data.types)
    }



    createColumnGroupBys(columns, parentTableAlias) {
        columns.forEach(column => {
            if (column.ofRootTable) {
                if (column.colNames) {
                    column.colNames.forEach(name => {
                        this.groupBys.push(`${parentTableAlias}.${name}`)
                    })
                } else {
                    this.groupBys.push(`${parentTableAlias}.${column.colName}`)
                }
            }
        })
    }


    // generic

    addParam(val) {
        this.params.push(val);
        return '$' + this.params.length;
    }

    addParams(vals) {
        return vals.map(val => this.addParam(val)).join(',');
    }


    joinWheres(wheres, operation) {
        return wheres.join(`
            ${operation}
        `);
    }
    joinFroms(froms) {
        return froms.join(`
        `);
    }
    joinSelects(selects) {
        return selects.join(`,
        `);
    }

    joinGroupBys(groupBys) {
        return groupBys.join(`,
        `);
    }

    addTableAlias(prefix) {
        const alias = (prefix || 't') + '_' + (this.tableAliases.length + 1);
        this.tableAliases.push(alias);
        return alias;
    }

}

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



};
