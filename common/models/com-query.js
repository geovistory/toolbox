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

        // create froms and wheres according to filter definition  
        this.createFilterFroms(query.filter, rootTableAlias, fkProject)
        this.createFilterWheres(query.filter)

        // create froms and selects according to column definition
        this.createColumnFroms(query.columns, rootTableAlias, fkProject)
        this.createColumnSelects(query.columns, rootTableAlias)
        this.createColumnGroupBys(query.columns, rootTableAlias)

        // root table from
        this.froms.unshift(`warehouse.entity_preview ${rootTableAlias}`)

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

        console.log('sql', sqlFormatter.format(this.sql))
        console.log('params', this.params)

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

    createFullCount(){
        this.selects.push('count(*) OVER() AS full_count')
    }

    createColumnFroms(columns, parentTableAlias, fkProject) {
        columns.forEach(column => {
            this.createColumnFrom(column, parentTableAlias, fkProject)
        })
    }

    createColumnFrom(node, parentTableAlias, fkProject, level = 0) {
        if (!node.data.ofRootTable) {
            let thisTableAlias;
            console.log(level)

            if (this.isRolesJoin(node) || this.isEntitesJoin(node)) {
                thisTableAlias = this.addTableAlias();
                node.data._tableAlias = thisTableAlias;
            }

            node.children.forEach(childNode => {
                this.createColumnFrom(childNode, thisTableAlias, fkProject, (level + 1))
            })

            // JOIN roles
            if (this.isRolesJoin(node)) {
                this.joinRoles(node, parentTableAlias, thisTableAlias, fkProject);
            }
            // JOIN entities
            else if (this.isEntitesJoin(node)) {
                this.joinEntities(node, parentTableAlias, thisTableAlias, fkProject);
            }
        }
    }

    createColumnSelects(columns, parentTableAlias) {
        columns.forEach(column => {
            if (column.data.ofRootTable) {
                this.selects.push(`${parentTableAlias}.${column.data.colName} AS "${column.data.label}"`)
            } else {
                this.createColumnSelect(column, column.data.label)
            }
        })
    }

    createColumnSelect(node, columnLabel) {

        if (!node.children.length) {
            if (this.isRolesJoin(node)) {

            } else if (this.isEntitesJoin(node)) {
                this.selects.push(`jsonb_agg(distinct jsonb_build_object(
                    'pk_entity',  ${node.data._tableAlias}.pk_entity,
                    'entity_type',  ${node.data._tableAlias}.entity_type,
                    'entity_label',  ${node.data._tableAlias}.entity_label,
                    'class_label',  ${node.data._tableAlias}.class_label,
                    'type_label',  ${node.data._tableAlias}.type_label,
                    'time_span', ${node.data._tableAlias}.time_span
                )) AS "${columnLabel}"`)
            }
        } else {
            node.children.forEach(child => {
                this.createColumnSelect(child, columnLabel)
            })
        }

    }


    createFilterFroms(parentNode, parentTableAlias, fkProject, level = 0) {

        let thisTableAlias;
        console.log(level)
        if (this.isRolesJoin(parentNode) || this.isEntitesJoin(parentNode)) {
            parentNode.data._tableAlias = parentTableAlias;
        }

        parentNode.children.forEach(node => {
            if (this.isRolesJoin(node) || this.isEntitesJoin(node)) {
                thisTableAlias = this.addTableAlias();
                this.createFilterFroms(node, thisTableAlias, fkProject, (level + 1))
            } else {
                this.createFilterFroms(node, parentTableAlias, fkProject, (level + 1))
            }

            // JOIN roles
            if (this.isRolesJoin(node)) {
                this.joinRoles(node, parentTableAlias, thisTableAlias, fkProject);
            }
            // JOIN entities
            else if (this.isEntitesJoin(node)) {
                this.joinEntities(node, parentTableAlias, thisTableAlias, fkProject);
            }
        })
    }

    joinEntities(node, parentTableAlias, thisTableAlias, fkProject) {
        this.froms.unshift(`    
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
        this.froms.unshift(`    
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
                nodeWheres.push(`${childNode.data._tableAlias}.pk_entity IS NOT NULL`)
            }

            // create the where clause for the role table 
            if (childNode.data.ingoingProperties || childNode.data.outgoingProperties) {
                const equals = childNode.data.operator === 'IS' ? 'IS NOT NULL'
                    : childNode.data.operator === 'IS NOT' ? 'IS NULL'
                        : 'IS NOT NULL'; // DEFAULT 

                nodeWheres.push(`${childNode.data._tableAlias}.fk_entity ${equals}`)
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
            if (column.data.ofRootTable) {
                this.groupBys.push(`${parentTableAlias}.${column.data.colName}`)
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

};
