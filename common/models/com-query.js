'use strict';

class QueryBuilder {

    constructor() {
        this.params = [];
        this.sql = '';
        this.tableAliases = [];

    }

    buildQuery(query, fkProject) {

        const rootTableAlias = this.addTableAlias()

        this.sql = `
        SELECT DISTINCT
        ${this.createSelect(query, rootTableAlias)}

        FROM
        ${this.createFrom(query, rootTableAlias, fkProject)}

        WHERE
        ${this.createEntityWhere(query.filter, rootTableAlias, fkProject)}
        `

        console.log('sql', this.sql)
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

    createFrom(query, tableAlias, fkProject) {

        return `
        -- entities
        warehouse.entity_preview ${tableAlias}
        ${this.createInnerJoins(query.filter, tableAlias, fkProject)}
        ${this.createLeftJoins(query.columns)}
        `
    }

    createInnerJoins(data, parentTableAlias, fkProject) {
        return data.children.map(child => {

            // JOIN roles
            if (child.data.ingoingProperties || child.data.outgoingProperties) {
                const thisTableAlias = this.addTableAlias();

                const topLevelWheres = []
                topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `)
                const secondLevelWheres = []
                if (child.data.ingoingProperties.length) {
                    secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(child.data.ingoingProperties)}))
                    `)
                }
                if (child.data.outgoingProperties.length) {
                    secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(child.data.outgoingProperties)}))
                    `)
                }

                if(secondLevelWheres.length){
                    topLevelWheres.push(`(
                         ${this.joinWheres(secondLevelWheres, 'OR')} 
                    )`)
                }

                return `    
                 JOIN warehouse.v_roles_per_project_and_repo ${thisTableAlias} ON 
                 ${this.joinWheres(topLevelWheres, 'AND')}
                `
            }
            else if(child.data.classes || child.data.types ){

            }
            else if(child.data.subgroup) {
                this.createInnerJoins(child.data.subgroup.data, parentTableAlias, fkProject)
            }

        }).join(`
        
        `)
        return `
        -- inner joins
    
    
        -- roles
        JOIN warehouse.v_roles_per_project_and_repo t2 ON 
            (
                -- ingoing
                (${tableAlias}.pk_entity = t2.fk_entity AND t2.fk_property IN (86))
                OR
                -- outgoing
                (${tableAlias}.pk_entity = t2.fk_temporal_entity AND t2.fk_property IN (1186))
            )												   
            AND t2.fk_project = 12 
            
            -- entities
            JOIN warehouse.entity_preview t3 ON 
                (
                    t3.pk_entity = t2.fk_entity 
                    OR
                    t3.pk_entity = t2.fk_temporal_entity 
                )												   
                AND 
                t3.fk_project = 12 
                AND (
                    t3.fk_class IN (61, 363)
                    OR 
                    t3.fk_type IN (80412, 80622)
                )
        `
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
        return wheres.join(' ' + operation + ' ');
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
            cb(false, resultObjects)
        });

    };

};
