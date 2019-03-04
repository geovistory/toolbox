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

    }

    buildQuery(query, fkProject) {

        const rootTableAlias = this.addTableAlias()


        // root table where 
        this.wheres.push(this.createEntityWhere(query.filter, rootTableAlias, fkProject))

        // create froms and wheres according to filter definition  
        this.createFilterFroms(query.filter, rootTableAlias, fkProject)
        this.createFilterWheres(query.filter)

        // create froms and selects according to column definition

        // root table from
        this.froms.unshift(`warehouse.entity_preview ${rootTableAlias}`)

        this.sql = `
        SELECT DISTINCT
        ${this.createSelect(query, rootTableAlias)}

        FROM

            ${this.joinFroms(this.froms)}

        WHERE

            ${this.joinWheres(this.wheres, 'AND')}
        `

        console.log('sql', sqlFormatter.format(this.sql))
        console.log('params', this.params)

        return {
            sql: this.sql,
            params: this.params
        }
    }

    createSelect(query, tableAlias) {
        return `
        ${tableAlias}.entity_label,
        ${tableAlias}.class_label,
        ${tableAlias}.type_label
        `
    }


    createFilterFroms(parentNode, parentTableAlias, fkProject, level = 0) {

        let childResult;
        let thisTableAlias;
        console.log(level)
        if (
            parentNode.data.ingoingProperties || parentNode.data.outgoingProperties ||
            parentNode.data.classes || parentNode.data.types
        ) {
            parentNode.data._tableAlias = parentTableAlias;
        }


        parentNode.children.forEach(node => {
            if (
                node.data.ingoingProperties || node.data.outgoingProperties ||
                node.data.classes || node.data.types
            ) {
                thisTableAlias = this.addTableAlias();
                childResult = this.createFilterFroms(node, thisTableAlias, fkProject, (level + 1))
            } else {
                childResult = this.createFilterFroms(node, parentTableAlias, fkProject, (level + 1))
            }

            // JOIN roles
            if (node.data.ingoingProperties || node.data.outgoingProperties) {
                const topLevelWheres = []
                topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `)
                const secondLevelWheres = []
                if (node.data.ingoingProperties.length) {
                    secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.ingoingProperties)}))
                    `)
                }
                if (node.data.outgoingProperties.length) {
                    secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.outgoingProperties)}))
                    `)
                }

                if (secondLevelWheres.length) {
                    topLevelWheres.push(`(
                         ${this.joinWheres(secondLevelWheres, 'OR')} 
                    )`)
                }

                this.froms.unshift(`    
                LEFT JOIN warehouse.v_roles_per_project_and_repo ${thisTableAlias} ON 
                 ${this.joinWheres(topLevelWheres, 'AND')}
                `)


            }
            else if (node.data.classes || node.data.types) {

                this.froms.unshift(`    
                    LEFT JOIN warehouse.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_temporal_entity = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `)


            }
            else if (node.data.subgroup) {


            }

        })



        // return `
        // -- inner joins


        // -- roles
        // JOIN warehouse.v_roles_per_project_and_repo t2 ON 
        //     (
        //         -- ingoing
        //         (${tableAlias}.pk_entity = t2.fk_entity AND t2.fk_property IN (86))
        //         OR
        //         -- outgoing
        //         (${tableAlias}.pk_entity = t2.fk_temporal_entity AND t2.fk_property IN (1186))
        //     )												   
        //     AND t2.fk_project = 12 

        //     -- entities
        //     JOIN warehouse.entity_preview t3 ON 
        //         (
        //             t3.pk_entity = t2.fk_entity 
        //             OR
        //             t3.pk_entity = t2.fk_temporal_entity 
        //         )												   
        //         AND 
        //         t3.fk_project = 12 
        //         AND (
        //             t3.fk_class IN (61, 363)
        //             OR 
        //             t3.fk_type IN (80412, 80622)
        //         )
        // `
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

    innerJoinRoles() {

    }

    createLeftJoins(columns) {


        return `
        -- left joins
    
        `
    }



    createEntityWhere(filter, tableAlias, fkProject) {

        const whereProject = `${tableAlias}.fk_project = ${this.addParam(fkProject)}`

        const classOrTypeWheres = [];
        if (filter.data.classes.length) {
            classOrTypeWheres.push(`${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`)
        }
        if (filter.data.types.length) {
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

    createRoleWhere() {
        return ''
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
