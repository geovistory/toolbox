import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {WarEntityPreview} from '../../../models';
import {ColDef, QueryDefinition, QueryFilter, QueryFilterData, QueryPathSegment} from '../../../models/pro-analysis.model';
import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


export interface QueryNode {
  data: QueryFilterData
}

interface NestedQueryNodeWithAlias extends QueryFilter {
  _entityTable?: LeftTable
  _statementTables?: LeftTable[]
  children: NestedQueryNodeWithAlias[]
}

export interface QueryNodeWithAlias extends QueryNode {
  _tableAlias: string
}



// createdby query builder on the fly, not for storage
// use ColDef for storing query definition in db
export class ColDefWithAliases extends ColDef {

  // database column names assigned to that query column
  colNames?: string[]

  // database column name assigned to that query column
  colName?: string;

  queryPathWithAlias?: QueryPathSegmentWithAlias[];

}



export interface QueryPathSegmentWithAlias extends QueryPathSegment {
  _entityTable?: LeftTable
  _statementTables?: LeftTable[]
}

export interface QueryDefinitionWithAliases extends QueryDefinition {
  columnsWithAlias: ColDefWithAliases[]
}

export interface LeftTable {
  table: string;
  fk: string;
}

export abstract class QAnalysisBase extends SqlBuilderLb4Models {
  PK_HISTC8_GEOGRAPHICAL_PLACE = 363;
  PK_HISTC11_BUILT_WORK = 441;

  GEO_CLASSES = {
    [363]: true,
    [441]: true,
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

  readonly STATAMENT_TABLE = 'war.statement' // 'war.vm_statement'

  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
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
  }



  createColumnsFroms(columns: ColDef[], leftTableAlias: string, fkProject: number): ColDefWithAliases[] {
    return columns.map(column => this.createColumnFroms(column, leftTableAlias, fkProject));
  }

  createColumnFroms(column: ColDef, leftTableAlias: string, fkProject: number): ColDefWithAliases {
    const colWithAliases: ColDefWithAliases = {
      ...column,
      queryPathWithAlias: undefined
    }


    let leftEntityTable: LeftTable = {table: leftTableAlias, fk: 'pk_entity'}
    let leftStatementTables: LeftTable[] = []
    if (column?.queryPath && !column.ofRootTable) {
      // let thisTableAlias: string;
      colWithAliases.queryPathWithAlias = column.queryPath.map<QueryPathSegmentWithAlias>((segment) => {


        // JOIN statements
        if (this.isStatementsJoin(segment)) {
          leftStatementTables = this.joinStatements(
            segment,
            leftEntityTable,
            fkProject,
            this.froms
          );
          const res: QueryPathSegmentWithAlias = {
            ...segment,
            _statementTables: leftStatementTables
          };
          return res;
        }
        // JOIN values

        // JOIN entities
        else if (this.isEntitesJoin(segment)) {
          leftEntityTable = this.joinEntities(
            segment,
            leftStatementTables,
            fkProject,
            this.froms
          );
          const res: QueryPathSegmentWithAlias = {
            ...segment,
            _entityTable: leftEntityTable
          };
          return res
        }
        else {
          const res: QueryPathSegmentWithAlias = segment;
          return res;
        }
      });
    }
    return colWithAliases
  }

  createColumnsSelects(columns: ColDefWithAliases[], leftTableAlias: string, fkProject: number) {
    columns.forEach(column => {
      if (column.ofRootTable) {
        this.createSelectFromRootTable(column, leftTableAlias, fkProject);
      } else if (column.queryPathWithAlias?.length) {
        this.createSelectFromJoinedTable(column, leftTableAlias, fkProject);
      }
    });
  }

  abstract createSelectFromJoinedTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void

  abstract createSelectFromRootTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void




  createFilterFroms(node: QueryFilter, rootTable: string, fkProject: number): NestedQueryNodeWithAlias {

    const leftTable: LeftTable = {table: rootTable, fk: 'pk_entity'}

    const nestedNodeWithAlias: NestedQueryNodeWithAlias = {
      ...node,
      _entityTable: leftTable,
      children: (node.children ?? []).map(childNode => this.getFilterChildNode(childNode, fkProject, leftTable, []))
    }

    // console.log(JSON.stringify(nestedNodeWithAlias, null, 2))
    return nestedNodeWithAlias
  }


  createStatementFilterFrom(node: QueryFilter, fkProject: number, leftEntityTable: LeftTable): NestedQueryNodeWithAlias {
    const statementTables = this.joinStatements(
      node,
      leftEntityTable,
      fkProject,
      this.filterFroms
    );
    const nestedNodeWithAlias: NestedQueryNodeWithAlias = {
      ...node,
      _entityTable: undefined,
      _statementTables: statementTables,
      children: (node.children ?? []).map(childNode => this.getFilterChildNode(childNode, fkProject, leftEntityTable, statementTables))

    }
    return nestedNodeWithAlias
  }

  createEntityFilterFrom(node: QueryFilter, fkProject: number, leftStatementTables: LeftTable[]): NestedQueryNodeWithAlias {
    const entityTable = this.joinEntities(
      node,
      leftStatementTables,
      fkProject,
      this.filterFroms
    );
    const nestedNodeWithAlias: NestedQueryNodeWithAlias = {
      ...node,
      _entityTable: entityTable,
      _statementTables: undefined,
      children: (node.children ?? []).map(childNode => this.getFilterChildNode(childNode, fkProject, entityTable, leftStatementTables))

    }
    return nestedNodeWithAlias
  }


  createEntityConditionNode(node: QueryFilter, fkProject: number, leftEntityTable: LeftTable, leftStatementTables: LeftTable[]): NestedQueryNodeWithAlias {

    const nestedNodeWithAlias: NestedQueryNodeWithAlias = {
      ...node,
      _entityTable: leftEntityTable,
      _statementTables: leftStatementTables,
      children: (node.children ?? []).map(childNode => this.getFilterChildNode(childNode, fkProject, leftEntityTable, leftStatementTables))
    }
    return nestedNodeWithAlias
  }

  getFilterChildNode(node: QueryFilter, fkProject: number, leftEntityTable: LeftTable, leftStatementTables: LeftTable[]) {
    if (this.isStatementsJoin(node)) return this.createStatementFilterFrom(node, fkProject, leftEntityTable);
    else if (this.isEntitesJoin(node)) return this.createEntityFilterFrom(node, fkProject, leftStatementTables);
    else return this.createEntityConditionNode(node, fkProject, leftEntityTable, leftStatementTables)
  }

  getLastQPathSegment(colDef?: ColDefWithAliases) {
    const p = colDef?.queryPathWithAlias;
    const lastSegment = p?.[p?.length - 1];
    return lastSegment;
  }

  joinEntities(node: QueryNode, leftTables: LeftTable[], fkProject: number, fromsArray: string[]): LeftTable {
    const thisTableAlias = this.addTableAlias()
    const joinOn = 'pk_entity'
    const selects = leftTables.map(leftTable => `
      SELECT *
      FROM war.entity_preview t
      WHERE
      ${leftTable.table}.${leftTable.fk} = t.${joinOn}
      AND
      ${this.createEntityWhere(node, 't', fkProject)}
    `)
    fromsArray.push(`
                    LEFT JOIN LATERAL (
                     ${selects.join(`
                     UNION
                     `)}
                    ) AS ${thisTableAlias} ON TRUE
                `);
    return {table: thisTableAlias, fk: joinOn}
  }



  joinStatements(node: QueryNode, leftTable: LeftTable, fkProject: number, fromsArray: string[]): LeftTable[] {
    const tablesToJoin: LeftTable[] = []
    if (node.data.outgoingProperties?.length) {
      const t = this.joinDirectedStatements(true, fkProject, node.data.outgoingProperties, leftTable, fromsArray);
      tablesToJoin.push(t)
    }
    if (node.data.ingoingProperties?.length) {
      const t = this.joinDirectedStatements(false, fkProject, node.data.ingoingProperties, leftTable, fromsArray);
      tablesToJoin.push(t)
    }
    return tablesToJoin
  }

  private joinDirectedStatements(isOutgoing: boolean, fkProject: number, properties: number[], leftTable: LeftTable, fromsArray: string[]): LeftTable {
    const thisTableAlias = this.addTableAlias()
    // key to join parent table
    const joinOn = isOutgoing ? 'fk_subject_info' : 'fk_object_info'
    // key to join child tables
    const fk = isOutgoing ? 'fk_object_info' : 'fk_subject_info';
    const wheres = [];
    wheres.push(`${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
    `);
    wheres.push(`${leftTable.table}.${leftTable.fk} = ${thisTableAlias}.${joinOn}
    `);
    wheres.push(`${thisTableAlias}.fk_property IN (${this.addParams(properties)})
    `);
    fromsArray.push(`
                LEFT JOIN ${this.STATAMENT_TABLE} ${thisTableAlias} ON
                 ${this.joinWheres(wheres, 'AND')}
                `);

    return {table: thisTableAlias, fk}
  }


  createEntityWhere(filter: QueryNode, tableAlias: string, fkProject: number) {
    const whereProject = `${tableAlias}.project_id = ${this.addParam(
      fkProject
    )}`;

    const classOrTypeWheres = [];
    if (filter.data?.classes?.length) {
      classOrTypeWheres.push(
        `${tableAlias}.fk_class IN (${this.addParams(filter.data.classes)})`
      );
    }
    if (filter.data?.types?.length) {
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
      if (childNode._entityTable && (childNode.data.classes || childNode.data.types)) {
        where = `${childNode._entityTable.table}.pk_entity IS NOT NULL`;
      }

      // create the where clauses for the statement tables
      else if (
        (
          childNode.data.ingoingProperties?.length ||
          childNode.data.outgoingProperties?.length
        ) && childNode._statementTables?.length) {
        where = childNode._statementTables.map(t => {
          const equals =
            childNode.data.operator === 'IS'
              ? 'IS NOT NULL'
              : childNode.data.operator === 'IS NOT'
                ? 'IS NULL'
                : 'IS NOT NULL'; // DEFAULT

          return `${t.table}.${t.fk} ${equals}`;
        }).join(' AND ')
      }

      else if (childNode._entityTable && childNode.data && childNode.data.operator === 'ENTITY_LABEL_CONTAINS') {

        // const n = node;
        // console.log(n)
        where = `${childNode._entityTable.table}.entity_label iLike ${this.addParam(`%${childNode.data.searchTerm ?? ''}%`)}`;
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
   * Returns true, if given node is for joining statements
   * @param {*} node
   */
  isStatementsJoin(node: QueryNode) {
    if (!node || typeof node.data !== 'object') return false;
    return node.data.ingoingProperties ?? node.data.outgoingProperties;
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

  // createColumnGroupBys(columns: ColDefWithAliases[], parentTableAlias: string) {
  //   columns.forEach(column => {
  //     if (column.ofRootTable && !column.preventGroupBy) {

  //       if (column.defaultType === 'entity_label') {
  //         this.groupBys.push(`${parentTableAlias}.entity_label`);
  //       } else if (column.defaultType === 'class_label') {
  //         this.groupBys.push(`${parentTableAlias}.class_label`);
  //       } else if (column.defaultType === 'type_label') {
  //         this.groupBys.push(`${parentTableAlias}.type_label`);
  //       }
  //       else if (column.colNames) {
  //         column.colNames.forEach(name => {
  //           this.groupBys.push(`${parentTableAlias}.${name}`);
  //         });
  //       }
  //     }
  //   });
  // }

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

  groupByRootTable() {
    const groupBys = this.getColumns(WarEntityPreview.definition)
      .map(col => `t_1.${col}`)
    return this.joinGroupBys(groupBys);
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
