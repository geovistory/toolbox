import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {ColDef, QueryDefinition, QueryFilter, QueryFilterData, QueryPathSegment} from '../../../models/pro-analysis.model';
import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';
import {WarEntityPreview} from '../../../models';



export interface QueryNode {
  data: QueryFilterData
}

interface NestedQueryNodeWithAlias extends QueryFilter {
  _tableAlias: string

  // this keeps record of the next parent table that is joining entities
  _parentEntityTableAlias: string;

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
  _tableAlias: string
}

export interface QueryDefinitionWithAliases extends QueryDefinition {
  columnsWithAlias: ColDefWithAliases[]
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
    if (column?.queryPath && !column.ofRootTable) {
      let thisTableAlias: string;
      colWithAliases.queryPathWithAlias = column.queryPath.map((segment) => {
        thisTableAlias = this.addTableAlias();
        const node: QueryNodeWithAlias = {
          ...segment,
          _tableAlias: thisTableAlias
        };

        // JOIN statements
        if (this.isStatementsJoin(segment)) {
          this.joinStatements(
            node,
            leftTableAlias,
            thisTableAlias,
            fkProject,
            this.froms
          );
        }
        // JOIN values

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
        this.createSelectFromRootTable(column, leftTableAlias, fkProject);
      } else if (column.queryPathWithAlias && column.queryPathWithAlias.length) {
        this.createSelectFromJoinedTable(column, leftTableAlias, fkProject);
      }
    });
  }

  abstract createSelectFromJoinedTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void
  // {
  //   // if (column.defaultType === 'space_and_time_cont') {

  //   //   this.selects.push(
  //   //     `commons.analysis__czml_and_temporal_distribution(
  //   //             ${leftTableAlias}.pk_entity,
  //   //             COALESCE( array_agg( ${column.id}.pk_entity ) FILTER ( WHERE ${column.id}.pk_entity IS NOT NULL ), ARRAY[]::integer[]  ),
  //   //             ${fkProject}
  //   //          ) as space_and_time_cont`
  //   //   );
  //   // }
  //   // else
  //   const lastSegment = column.queryPathWithAlias?.[column?.queryPathWithAlias.length - 1];
  //   if (lastSegment) {
  //     // create a select for the last segment in the queryPath
  //     this.createColumnSelect(lastSegment, column.id
  //     );
  //   }
  //   else {
  //     console.warn('To select from a column, it should have at least one item in the query path')
  //   }
  // }

  abstract createSelectFromRootTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void




  createFilterFroms(node: QueryFilter, leftTableAlias: string, parentEntityTableAlias: string, fkProject: number, level = 0): NestedQueryNodeWithAlias {
    let parEntTabAlias = parentEntityTableAlias;

    const nodeWithAlias = {
      ...node,
      _tableAlias: this.addTableAlias(),
      _parentEntityTableAlias: parEntTabAlias
    }

    if (level > 0) {
      // JOIN statements
      if (this.isStatementsJoin(nodeWithAlias)) {
        this.joinStatements(
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
      children: (node.children ?? []).map(childNode => {
        return this.createFilterFroms(childNode, leftTableAlias, parEntTabAlias, fkProject, level + 1);
      })
    }
    return nestedNodeWithAlias
  }

  getLastQPathSegment(colDef?: ColDefWithAliases) {
    const p = colDef?.queryPathWithAlias;
    const lastSegment = p?.[p?.length - 1];
    return lastSegment;
  }

  joinEntities(node: QueryNode, parentTableAlias: string, thisTableAlias: string, fkProject: number, fromsArray: string[]) {
    fromsArray.push(`
                    LEFT JOIN war.entity_preview ${thisTableAlias} ON
                    (${parentTableAlias}.fk_object_info = ${thisTableAlias}.pk_entity OR ${parentTableAlias}.fk_subject_info = ${thisTableAlias}.pk_entity)
                    AND
                     ${this.createEntityWhere(node, thisTableAlias, fkProject)}
                `);
  }



  joinStatements(node: QueryNode, parentTableAlias: string, thisTableAlias: string, fkProject: number, fromsArray: string[]) {
    const topLevelWheres = [];
    topLevelWheres.push(`
                ${thisTableAlias}.fk_project = ${this.addParam(fkProject)}
                `);
    const secondLevelWheres = [];
    if (node.data.ingoingProperties && node.data.ingoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_object_info AND ${thisTableAlias}.fk_property IN (${this.addParams(
        node.data.ingoingProperties
      )}))
                    `);
    }
    if (node.data.outgoingProperties && node.data.outgoingProperties.length) {
      secondLevelWheres.push(`
                    (${parentTableAlias}.pk_entity = ${thisTableAlias}.fk_subject_info AND ${thisTableAlias}.fk_property IN (${this.addParams(
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
                LEFT JOIN ${this.STATAMENT_TABLE} ${thisTableAlias} ON
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

      // create the where clause for the statement table
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

        where = `${childNode._tableAlias}.fk_object_info ${equals}`;
      }

      else if (childNode.data && childNode.data.operator === 'ENTITY_LABEL_CONTAINS') {

        // const n = node;
        // console.log(n)
        where = `${childNode._parentEntityTableAlias}.entity_label iLike ${this.addParam(`%${childNode.data.searchTerm ?? ''}%`)}`;
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
    .map(col=>`t_1.${col}`)
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
