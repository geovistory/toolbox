"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_formatter_1 = __importDefault(require("sql-formatter"));
class SqlBuilder {
    constructor() {
        this.PK_HISTC8_GEOGRAPHICAL_PLACE = 363;
        this.PK_HISTC11_BUILT_WORK = 441;
        this.GEO_CLASSES = {
            [this.PK_HISTC8_GEOGRAPHICAL_PLACE]: true,
            [this.PK_HISTC11_BUILT_WORK]: true,
        };
        // Properties inherited from 'P166 was a presence of'
        // connecting E93 Presence and 'Built Work' or 'Geographical Place'
        this.P166_INHERITED_PKS = [1184, 1181];
        this.PK_E93_PRESENCE = 84;
        this.PK_P167_WAS_AT = 148;
        this.params = [];
        this.sql = '';
        this.tableAliases = [];
        // variables for the query filter part (tw1)
        this.filterWheres = [];
        this.filterFroms = [];
        // variables for the query columns part
        this.selects = [];
        this.froms = [];
        this.groupBys = [];
        this.limit = '';
        this.offset = '';
    }
    buildQuery(query, fkProject) {
        const rootTableAlias = this.addTableAlias();
        // root table where
        this.filterWheres.push(this.createEntityWhere(query.filter, rootTableAlias, fkProject));
        // root table from
        this.filterFroms.push(`war.entity_preview ${rootTableAlias}`);
        this.froms.push(`tw1 ${rootTableAlias}`);
        // create froms and wheres according to filter definition
        const filterWithAliases = this.createFilterFroms(query.filter, rootTableAlias, rootTableAlias, fkProject);
        this.createFilterWheres(filterWithAliases);
        // create froms and selects according to column definition
        const columnsWithAliases = this.createColumnsFroms(query.columns, rootTableAlias, fkProject);
        this.createColumnsSelects(columnsWithAliases, rootTableAlias, fkProject);
        this.createColumnGroupBys(columnsWithAliases, rootTableAlias);
        // create limit, offset
        this.createLimitAndOffset(query);
        this.sql = `
      WITH tw1 AS (
        -- apply the query filter
        SELECT DISTINCT
          t_1.pk_entity,
          t_1.entity_type,
          t_1.entity_label,
          t_1.class_label,
          t_1.type_label,
          t_1.time_span,
          t_1.fk_project
        FROM
          ${this.joinFroms(this.filterFroms)}
        WHERE
          ${this.joinWheres(this.filterWheres, 'AND')}
      )
      SELECT
        ${this.joinSelects(this.selects)}
      FROM
        ${this.joinFroms(this.froms)}
        ${this.joinGroupBys(this.groupBys)}
        ${this.limit}
        ${this.offset}
        `;
        console.log('params', this.params);
        let forLog = this.sql;
        this.params.forEach((param, i) => {
            const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
            forLog = forLog.replace(replaceStr, param);
        });
        console.log(`
        "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
        ${sql_formatter_1.default.format(forLog, { language: 'pl/sql' })}

        `);
        return {
            sql: this.sql,
            params: this.params,
        };
    }
    /**
     * Build Sql query for counting the number of resulting rows
     * when only the query filter is applied
     */
    buildCountQuery(query, fkProject) {
        const rootTableAlias = this.addTableAlias();
        // root table where
        this.filterWheres.push(this.createEntityWhere(query.filter, rootTableAlias, fkProject));
        // root table from
        this.filterFroms.push(`war.entity_preview ${rootTableAlias}`);
        this.froms.push(`tw1 ${rootTableAlias}`);
        // create froms and wheres according to filter definition
        const filterWithAliases = this.createFilterFroms(query.filter, rootTableAlias, rootTableAlias, fkProject);
        this.createFilterWheres(filterWithAliases);
        this.sql = `
      WITH tw1 AS (
        -- apply the query filter
        SELECT DISTINCT
          t_1.pk_entity
        FROM
          ${this.joinFroms(this.filterFroms)}
        WHERE
          ${this.joinWheres(this.filterWheres, 'AND')}
      )
      SELECT
       count(*)
      FROM
        ${this.joinFroms(this.froms)}
        `;
        console.log('params', this.params);
        let forLog = this.sql;
        this.params.forEach((param, i) => {
            const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
            forLog = forLog.replace(replaceStr, param);
        });
        console.log(`
        "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
        ${sql_formatter_1.default.format(forLog, { language: 'pl/sql' })}

        `);
        return {
            sql: this.sql,
            params: this.params,
        };
    }
    /**
     * if there is limit and offset provided, this function adds:
     * - a limit
     * - a offset
     * @param {*} query
     */
    createLimitAndOffset(query) {
        if (typeof query.limit === 'number' && query.limit >= 0) {
            this.limit = `LIMIT ${this.addParam(query.limit)}`;
        }
        if (typeof query.offset === 'number' && query.offset >= 0) {
            this.offset = `OFFSET ${this.addParam(query.offset)}`;
        }
        // this.createFullCount();
    }
    // createFullCount() {
    //   this.selects.push('(count(*) OVER())::Int AS full_count');
    // }
    createColumnsFroms(columns, leftTableAlias, fkProject) {
        return columns.map(column => this.createColumnFroms(column, leftTableAlias, fkProject));
    }
    createColumnFroms(column, leftTableAlias, fkProject) {
        const colWithAliases = Object.assign(Object.assign({}, column), { queryPath: undefined });
        if (column && column.queryPath && !column.ofRootTable) {
            let thisTableAlias;
            colWithAliases.queryPath = column.queryPath.map((segment) => {
                thisTableAlias = this.addTableAlias();
                const node = Object.assign(Object.assign({}, segment), { _tableAlias: thisTableAlias });
                // JOIN roles
                if (this.isRolesJoin(segment)) {
                    this.joinRoles(node, leftTableAlias, thisTableAlias, fkProject, this.froms);
                }
                // JOIN entities
                else if (this.isEntitesJoin(segment)) {
                    this.joinEntities(node, leftTableAlias, thisTableAlias, fkProject, this.froms);
                }
                leftTableAlias = thisTableAlias;
                return node;
            });
        }
        return colWithAliases;
    }
    createColumnsSelects(columns, leftTableAlias, fkProject) {
        columns.forEach(column => {
            if (column.ofRootTable) {
                if (column.defaultType === 'entity_label') {
                    this.selects.push(`${leftTableAlias}.entity_label AS "${column.id}"`);
                }
                else if (column.defaultType === 'class_label') {
                    this.selects.push(`${leftTableAlias}.class_label AS "${column.id}"`);
                }
                else if (column.defaultType === 'type_label') {
                    this.selects.push(`${leftTableAlias}.type_label AS "${column.id}"`);
                }
                else if (column.defaultType === 'entity_preview') {
                    column.colNames = [
                        'pk_entity',
                        'entity_type',
                        'entity_label',
                        'class_label',
                        'type_label',
                        'time_span',
                        'fk_project'
                    ];
                    this.selects.push(`jsonb_build_object(
                        'pk_entity', ${leftTableAlias}.pk_entity,
                        'entity_type', ${leftTableAlias}.entity_type,
                        'entity_label', ${leftTableAlias}.entity_label,
                        'class_label', ${leftTableAlias}.class_label,
                        'type_label', ${leftTableAlias}.type_label,
                        'time_span', ${leftTableAlias}.time_span,
                        'fk_project', ${leftTableAlias}.fk_project
                      ) AS "${column.id}"`);
                }
                else if (column.defaultType === 'temporal_distribution') {
                    this.selects.push(`commons.analysis__create_temporal_distribution(array_agg( ${leftTableAlias}.pk_entity), ${fkProject}) as temporal_distribution`);
                }
            }
            else if (column.queryPath && column.queryPath.length) {
                if (column.defaultType === 'space_and_time_cont') {
                    this.selects.push(`commons.analysis__czml_and_temporal_distribution(
                ${leftTableAlias}.pk_entity,
                COALESCE( array_agg( ${column.id}.pk_entity ) FILTER ( WHERE ${column.id}.pk_entity IS NOT NULL ), ARRAY[]::integer[]  ),
                ${fkProject}
             ) as space_and_time_cont`);
                }
                else {
                    // create a select for the last segment in the queryPath
                    this.createColumnSelect(column.queryPath[column.queryPath.length - 1], column.id);
                }
            }
        });
    }
    createColumnSelect(segment, columnLabel) {
        if (this.isRolesJoin(segment)) {
        }
        else if (this.isEntitesJoin(segment)) {
            this.selects.push(`COALESCE(json_agg( distinct jsonb_build_object(
            'pk_entity', ${segment._tableAlias}.pk_entity,
            'entity_type', ${segment._tableAlias}.entity_type,
            'entity_label', ${segment._tableAlias}.entity_label,
            'class_label', ${segment._tableAlias}.class_label,
            'type_label', ${segment._tableAlias}.type_label,
            'time_span', ${segment._tableAlias}.time_span,
            'fk_project', ${segment._tableAlias}.fk_project
          )
       ) FILTER (WHERE ${segment._tableAlias}.pk_entity IS NOT NULL), '[]') AS "${columnLabel}"`);
        }
    }
    createFilterFroms(node, leftTableAlias, parentEntityTableAlias, fkProject, level = 0) {
        let parEntTabAlias = parentEntityTableAlias;
        const nodeWithAlias = Object.assign(Object.assign({}, node), { _tableAlias: this.addTableAlias(), _parentEntityTableAlias: parEntTabAlias });
        if (level > 0) {
            // JOIN roles
            if (this.isRolesJoin(nodeWithAlias)) {
                this.joinRoles(nodeWithAlias, leftTableAlias, nodeWithAlias._tableAlias, fkProject, this.filterFroms);
                leftTableAlias = nodeWithAlias._tableAlias;
            }
            // JOIN entities
            else if (this.isEntitesJoin(nodeWithAlias)) {
                this.joinEntities(nodeWithAlias, leftTableAlias, nodeWithAlias._tableAlias, fkProject, this.filterFroms);
                parEntTabAlias = leftTableAlias = nodeWithAlias._tableAlias;
            }
        }
        const nestedNodeWithAlias = Object.assign(Object.assign({}, nodeWithAlias), { children: node.children.map(childNode => {
                return this.createFilterFroms(childNode, leftTableAlias, parEntTabAlias, fkProject, level + 1);
            }) });
        return nestedNodeWithAlias;
    }
    joinEntities(node, parentTableAlias, thisTableAlias, fkProject, fromsArray) {
        fromsArray.push(`
                    LEFT JOIN war.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_temporal_entity = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `);
    }
    joinRoles(node, parentTableAlias, thisTableAlias, fkProject, fromsArray) {
        const topLevelWheres = [];
        topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `);
        const secondLevelWheres = [];
        if (node.data.ingoingProperties && node.data.ingoingProperties.length) {
            secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.ingoingProperties)}))
                    `);
        }
        if (node.data.outgoingProperties && node.data.outgoingProperties.length) {
            secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(node.data.outgoingProperties)}))
                    `);
        }
        if (secondLevelWheres.length) {
            topLevelWheres.push(`(
                         ${this.joinWheres(secondLevelWheres, 'OR')}
                    )`);
        }
        fromsArray.push(`
                LEFT JOIN war.vm_statement ${thisTableAlias} ON
                 ${this.joinWheres(topLevelWheres, 'AND')}
                `);
    }
    createEntityWhere(filter, tableAlias, fkProject) {
        const whereProject = `${tableAlias}.fk_project = ${this.addParam(fkProject)}`;
        const classOrTypeWheres = [];
        if (filter.data && filter.data.classes && filter.data.classes.length) {
            classOrTypeWheres.push(`${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`);
        }
        if (filter.data && filter.data.types && filter.data.types.length) {
            classOrTypeWheres.push(`${tableAlias}.fk_type IN (${this.addParams(filter.data.types)})`);
        }
        const topLevelWheres = [];
        topLevelWheres.push(whereProject);
        topLevelWheres.push(`${tableAlias}.fk_class IS NOT NULL`);
        if (classOrTypeWheres.length) {
            topLevelWheres.push(` ( ${this.joinWheres(classOrTypeWheres, 'OR')} )`);
        }
        return `
        ${this.joinWheres(topLevelWheres, 'AND')}
        `;
    }
    createFilterWheres(node, level = 0) {
        // let nodeWheres: string[] = [];
        // console.log(level);
        const nodeWheres = node.children.map(childNode => {
            // Where clauses of the children if this childNode
            let subWheres;
            // climb into the tree up to the leaf
            if (childNode.children.length) {
                subWheres = this.createFilterWheres(childNode, level + 1);
            }
            // Where clause of this childNode
            let where = '';
            // create the where clause for the entity table
            if (childNode.data.classes || childNode.data.types) {
                where = `${childNode._tableAlias}.pk_entity IS NOT NULL`;
            }
            // create the where clause for the role table
            else if ((childNode.data.ingoingProperties && childNode.data.ingoingProperties.length) ||
                (childNode.data.outgoingProperties && childNode.data.outgoingProperties.length)) {
                const equals = childNode.data.operator === 'IS'
                    ? 'IS NOT NULL'
                    : childNode.data.operator === 'IS NOT'
                        ? 'IS NULL'
                        : 'IS NOT NULL'; // DEFAULT
                where = `${childNode._tableAlias}.fk_entity ${equals}`;
            }
            else if (childNode.data && childNode.data.operator === 'ENTITY_LABEL_CONTAINS') {
                // const n = node;
                // console.log(n)
                where = `${childNode._parentEntityTableAlias}.entity_label iLike ${this.addParam(`%${childNode.data.searchTerm || ''}%`)}`;
            }
            if (subWheres) {
                // let childrenSql;
                // if we are in a subgroup node
                if (childNode.data.subgroup) {
                    // join the wheres of this subgroup's children
                    where = `
          (  -- subgroup
              ${subWheres.join(`
                ${childNode.data.operator}
              `)}
          )`;
                }
                else {
                    // get the first childNodeWhere of childNodeWheres
                    where = `
            (
              ${where}
              AND
              ${subWheres.join('')}
            )`;
                }
            }
            return where;
        });
        if (level === 0 && nodeWheres.length > 0) {
            this.filterWheres.push(`
            -- filter wheres
            (
                ${nodeWheres.join(`
                    AND
                `)}
            )`);
        }
        return nodeWheres;
    }
    /**
     * Returns true, if given node is for joining roles
     * @param {*} node
     */
    isRolesJoin(node) {
        if (!node || typeof node.data !== 'object')
            return false;
        return node.data.ingoingProperties || node.data.outgoingProperties;
    }
    /**
     * Returns true, if given node is for joining entities
     * @param {*} node
     */
    isEntitesJoin(node) {
        if (!node || typeof node.data !== 'object' || !node.data.classes)
            return false;
        return node.data.classes || node.data.types;
    }
    // /**
    //  * Returns true, if given node is for joining GeoEntities (and no other classes)
    //  * @param {*} node
    //  */
    // isGeoEntityJoin(node: QueryNode) {
    //   if (this.isEntitesJoin(node)) {
    //     const classes = node.data.classes;
    //     // const types = node.data.types;
    //     const geoClasses = classes.filter(pk => !!this.GEO_CLASSES[pk]);
    //     // const noTypes = (!types || !types.length);
    //     // if all selected classes are GeoClasses and no types are selected
    //     if (
    //       geoClasses.length > 0 &&
    //       geoClasses.length === classes.length
    //       //  && noTypes
    //     ) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }
    createColumnGroupBys(columns, parentTableAlias) {
        columns.forEach(column => {
            if (column.ofRootTable && !column.preventGroupBy) {
                if (column.defaultType === 'entity_label') {
                    this.groupBys.push(`${parentTableAlias}.entity_label`);
                }
                else if (column.defaultType === 'class_label') {
                    this.groupBys.push(`${parentTableAlias}.class_label`);
                }
                else if (column.defaultType === 'type_label') {
                    this.groupBys.push(`${parentTableAlias}.type_label`);
                }
                else if (column.colNames) {
                    column.colNames.forEach(name => {
                        this.groupBys.push(`${parentTableAlias}.${name}`);
                    });
                }
            }
        });
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
        return !!groupBys && groupBys.length
            ? `GROUP BY
      ${groupBys.join(`,
        `)}
      `
            : '';
    }
    addTableAlias() {
        const alias = 't_' + (this.tableAliases.length + 1);
        this.tableAliases.push(alias);
        return alias;
    }
}
exports.SqlBuilder = SqlBuilder;
//# sourceMappingURL=sql-builder.js.map