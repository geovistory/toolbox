import sqlFormatter from 'sql-formatter';
import { QueryPathSegment, ColDef, QueryDefinition, QueryFilterData } from '../../common/interfaces/query-filter.interface';
import { SqlBuilderBase } from '../utils/sql-builder-base';

interface QueryNode {
  data: QueryFilterData
}


interface NestedQueryNode extends QueryNode {
  children: NestedQueryNode[]
}
interface NestedQueryNodeWithAlias extends NestedQueryNode {
  _tableAlias: string

  // this keeps record of the next parent table that is joining entities
  _parentEntityTableAlias: string;

  children: NestedQueryNodeWithAlias[]
}

interface QueryNodeWithAlias extends QueryNode {
  _tableAlias: string
}



// createdby query builder on the fly, not for storage
// use ColDef for storing query definition in db
export interface ColDefWithAliases extends ColDef {

  // database column names assigned to that query column
  colNames?: string[]

  // database column name assigned to that query column
  colName?: string;

  queryPath?: QueryPathSegmentWithAlias[];

}



export interface QueryPathSegmentWithAlias extends QueryPathSegment {
  _tableAlias: string
}

export interface QueryDefinitionWithAliases extends QueryDefinition {
  columns: ColDefWithAliases[]
}



export class SqlBuilder extends SqlBuilderBase {

  PK_HISTC8_GEOGRAPHICAL_PLACE = 363;
  PK_HISTC11_BUILT_WORK = 441;
  GEO_CLASSES = {
    [this.PK_HISTC8_GEOGRAPHICAL_PLACE]: true,
    [this.PK_HISTC11_BUILT_WORK]: true,
  };

  // Properties inherited from 'P166 was a presence of'
  // connecting E93 Presence and 'Built Work' or 'Geographical Place'
  P166_INHERITED_PKS = [1184, 1181];

  PK_E93_PRESENCE = 84;
  PK_P167_WAS_AT = 148;

  tableAliases: string[] = [];

  // variables for the query filter part (tw1)
  filterWheres: string[] = [];
  filterFroms: string[] = [];

  // variables for the query columns part
  selects: string[] = [];
  froms: string[] = [];
  groupBys: string[] = [];

  limit = '';
  offset = '';


  constructor() {
    super()
  }

  buildQuery(query: QueryDefinition, fkProject: number) {
    const rootTableAlias = this.addTableAlias();

    // root table where
    this.filterWheres.push(
      this.createEntityWhere(query.filter, rootTableAlias, fkProject)
    );

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
        ${sqlFormatter.format(forLog, { language: 'pl/sql' })}

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
  buildCountQuery(query: QueryDefinition, fkProject: number) {
    const rootTableAlias = this.addTableAlias();

    // root table where
    this.filterWheres.push(
      this.createEntityWhere(query.filter, rootTableAlias, fkProject)
    );

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
        ${sqlFormatter.format(forLog, { language: 'pl/sql' })}

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
  createLimitAndOffset(query: QueryDefinition) {
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

  createColumnsFroms(columns: ColDef[], leftTableAlias: string, fkProject: number): ColDefWithAliases[] {
    return columns.map(column => this.createColumnFroms(column, leftTableAlias, fkProject));
  }

  createColumnFroms(column: ColDef, leftTableAlias: string, fkProject: number): ColDefWithAliases {
    const colWithAliases: ColDefWithAliases = {
      ...column,
      queryPath: undefined
    }
    if (column && column.queryPath && !column.ofRootTable) {
      let thisTableAlias: string;
      colWithAliases.queryPath = column.queryPath.map((segment) => {
        thisTableAlias = this.addTableAlias();
        const node: QueryNodeWithAlias = {
          ...segment,
          _tableAlias: thisTableAlias
        };

        // JOIN roles
        if (this.isRolesJoin(segment)) {
          this.joinRoles(
            node,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        // JOIN entities
        else if (this.isEntitesJoin(segment)) {
          this.joinEntities(
            node,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        leftTableAlias = thisTableAlias;

        return node;
      });
    }
    return colWithAliases
  }

  createColumnsSelects(columns: ColDefWithAliases[], leftTableAlias: string, fkProject: number) {
    columns.forEach(column => {
      if (column.ofRootTable) {
        if (column.defaultType === 'entity_label') {
          this.selects.push(`${leftTableAlias}.entity_label AS "${column.id}"`);
        } else if (column.defaultType === 'class_label') {
          this.selects.push(`${leftTableAlias}.class_label AS "${column.id}"`);
        } else if (column.defaultType === 'type_label') {
          this.selects.push(`${leftTableAlias}.type_label AS "${column.id}"`);
        } else if (column.defaultType === 'entity_preview') {

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

        } else if (column.defaultType === 'temporal_distribution') {

          this.selects.push(
            `commons.analysis__create_temporal_distribution(array_agg( ${leftTableAlias}.pk_entity), ${fkProject}) as temporal_distribution`
          );

        }
      } else if (column.queryPath && column.queryPath.length) {
        if (column.defaultType === 'space_and_time_cont') {

          this.selects.push(
            `commons.analysis__czml_and_temporal_distribution(
                ${leftTableAlias}.pk_entity,
                COALESCE( array_agg( ${column.id}.pk_entity ) FILTER ( WHERE ${column.id}.pk_entity IS NOT NULL ), ARRAY[]::integer[]  ),
                ${fkProject}
             ) as space_and_time_cont`
          );
        } else {

          // create a select for the last segment in the queryPath
          this.createColumnSelect(
            column.queryPath[column.queryPath.length - 1],
            column.id
          );
        }
      }
    });
  }

  createColumnSelect(segment: QueryNodeWithAlias, columnLabel: string) {
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

  createFilterFroms(node: NestedQueryNode, leftTableAlias: string, parentEntityTableAlias: string, fkProject: number, level = 0): NestedQueryNodeWithAlias {
    let parEntTabAlias = parentEntityTableAlias;

    const nodeWithAlias = {
      ...node,
      _tableAlias: this.addTableAlias(),
      _parentEntityTableAlias: parEntTabAlias
    }

    if (level > 0) {
      // JOIN roles
      if (this.isRolesJoin(nodeWithAlias)) {
        this.joinRoles(
          nodeWithAlias,
          leftTableAlias,
          nodeWithAlias._tableAlias,
          fkProject,
          this.filterFroms
        );
        leftTableAlias = nodeWithAlias._tableAlias;
      }
      // JOIN entities
      else if (this.isEntitesJoin(nodeWithAlias)) {
        this.joinEntities(
          nodeWithAlias,
          leftTableAlias,
          nodeWithAlias._tableAlias,
          fkProject,
          this.filterFroms
        );
        parEntTabAlias = leftTableAlias = nodeWithAlias._tableAlias;

      }
    }

    const nestedNodeWithAlias = {
      ...nodeWithAlias,
      children: node.children.map(childNode => {
        return this.createFilterFroms(childNode, leftTableAlias, parEntTabAlias, fkProject, level + 1);
      })
    }
    return nestedNodeWithAlias
  }

  joinEntities(node: QueryNode, parentTableAlias: string, thisTableAlias: string, fkProject: number, fromsArray: string[]) {
    fromsArray.push(`
                    LEFT JOIN war.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_entity = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_temporal_entity = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `);
  }



  joinRoles(node: QueryNode, parentTableAlias: string, thisTableAlias: string, fkProject: number, fromsArray: string[]) {
    const topLevelWheres = [];
    topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `);
    const secondLevelWheres = [];
    if (node.data.ingoingProperties && node.data.ingoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(
        node.data.ingoingProperties
      )}))
                    `);
    }
    if (node.data.outgoingProperties && node.data.outgoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_temporal_entity AND ${thisTableAlias}.fk_property IN (${this.addParams(
        node.data.outgoingProperties
      )}))
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

  createEntityWhere(filter: QueryNode, tableAlias: string, fkProject: number) {
    const whereProject = `${tableAlias}.fk_project = ${this.addParam(
      fkProject
    )}`;

    const classOrTypeWheres = [];
    if (filter.data && filter.data.classes && filter.data.classes.length) {
      classOrTypeWheres.push(
        `${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`
      );
    }
    if (filter.data && filter.data.types && filter.data.types.length) {
      classOrTypeWheres.push(
        `${tableAlias}.fk_type IN (${this.addParams(filter.data.types)})`
      );
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

  createFilterWheres(node: NestedQueryNodeWithAlias, level = 0) {
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
      else if (
        (childNode.data.ingoingProperties && childNode.data.ingoingProperties.length) ||
        (childNode.data.outgoingProperties && childNode.data.outgoingProperties.length)
      ) {
        const equals =
          childNode.data.operator === 'IS'
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
          )`

        } else {
          // get the first childNodeWhere of childNodeWheres
          where = `
            (
              ${where}
              AND
              ${subWheres.join('')}
            )`;
        }
      }

      return where
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
  isRolesJoin(node: QueryNode) {
    if (!node || typeof node.data !== 'object') return false;
    return node.data.ingoingProperties || node.data.outgoingProperties;
  }
  /**
   * Returns true, if given node is for joining entities
   * @param {*} node
   */
  isEntitesJoin(node: QueryNode) {
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

  createColumnGroupBys(columns: ColDefWithAliases[], parentTableAlias: string) {
    columns.forEach(column => {
      if (column.ofRootTable && !column.preventGroupBy) {

        if (column.defaultType === 'entity_label') {
          this.groupBys.push(`${parentTableAlias}.entity_label`);
        } else if (column.defaultType === 'class_label') {
          this.groupBys.push(`${parentTableAlias}.class_label`);
        } else if (column.defaultType === 'type_label') {
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

  joinWheres(wheres: string[], operation: 'AND' | 'OR') {
    return wheres.join(`
            ${operation}
        `);
  }
  joinFroms(froms: string[]) {
    return froms.join(`
        `);
  }
  joinSelects(selects: string[]) {
    return selects.join(`,
        `);
  }

  joinGroupBys(groupBys: string[]) {
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
