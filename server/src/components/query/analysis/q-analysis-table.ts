import {NumericIndex, SysConfigController} from '../../../controllers';
import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {AnalysisTableRow} from '../../../models/analysis/analysis-table-response.model';
import {ColDef, QueryDefinition} from '../../../models/pro-analysis.model';
import {WarEntityPreview} from '../../../models/war-entity-preview.model';
import {ColDefWithAliases, QAnalysisBase, QueryNode, QueryNodeWithAlias} from './q-analysis-base';



export class QAnalysisTable extends QAnalysisBase {

  valueObjectClasses: NumericIndex
  constructor(
    dataSource: Postgres1DataSource,
    private sysConfigController: SysConfigController
  ) {
    super(dataSource)
  }

  async query(query: QueryDefinition, fkProject: number) {
    this.valueObjectClasses = await this.sysConfigController.getValueObjectClasses()

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
    // this.createColumnGroupBys(columnsWithAliases, rootTableAlias);

    // create limit, offset
    this.createLimitAndOffset(query);

    this.sql = `
      WITH tw1 AS (
        -- apply the query filter
        SELECT DISTINCT
          ${this.createSelect('t_1', WarEntityPreview.definition)}
        FROM
          ${this.joinFroms(this.filterFroms)}
        WHERE
          ${this.joinWheres(this.filterWheres, 'AND')}
      )
      SELECT
        ${this.joinSelects(this.selects)}
      FROM
        ${this.joinFroms(this.froms)}
        ${this.groupByRootTable()}
        ${this.limit}
        ${this.offset}
        `;

    return this.execute<AnalysisTableRow[]>()
  }



  // override the inherited function from base class
  createColumnFroms(column: ColDef, leftTableAlias: string, fkProject: number): ColDefWithAliases {
    const colWithAliases: ColDefWithAliases = {
      ...column,
      queryPathWithAlias: undefined
    }
    if (column?.queryPath && !column.ofRootTable) {
      let thisTableAlias: string;
      const pathLength = column.queryPath.length;
      colWithAliases.queryPathWithAlias = column.queryPath.map((segment, i) => {
        // if this is the last segment and targets to a value object...
        if (i === pathLength - 1 && this.containsValueClass(segment)) {
          // .. we don't need to join another table and thus return segment
          // with left table alias
          const node: QueryNodeWithAlias = {
            ...segment,
            _tableAlias: leftTableAlias
          };
          return node
        }

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
        else if (this.isEntitesJoin(segment)) {

          // JOIN entities
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

  /**
  * Returns true, if given query path segment contains at least one value class
  * (e.g. place, dimension, etc.)
  * @param {*} segment
  */
  containsValueClass(segment: QueryNode): boolean {
    if (!segment?.data?.classes?.length) return false
    return segment.data.classes.some(pkClass => this.isValueClass(pkClass))
  }

  /**
   * returns true if pkClass is included in valueClasses
   * @param pkClass
   * @param valueClasses
   */
  isValueClass(pkClass: number): boolean {
    return this.valueObjectClasses[pkClass] ?? false
  }

  // select value object or entity select
  createSelectFromJoinedTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number) {
    const segment = this.getLastQPathSegment(column);
    if (!segment) return

    if (this.containsValueClass(segment)) {
      // TODO: Add a statement to the object value ({timePrimitive:..., statement:...})
      this.selects.push(`jsonb_build_object(
        'values', COALESCE(json_agg(distinct jsonb_build_object(
          'pkStatement' , ${segment._tableAlias}.pk_entity,
          'fkSubjectInfo', ${segment._tableAlias}.fk_subject_info,
          'fkObjectInfo', ${segment._tableAlias}.fk_object_info,
		      'value',  ${segment._tableAlias}.object_info_value
        ))
        FILTER (WHERE ${segment._tableAlias}.object_info_value IS NOT NULL), '[]')
      ) AS "${column.id}"`);
    }
    else if (!this.isStatementsJoin(segment) && this.isEntitesJoin(segment)) {
      this.selects.push(`jsonb_build_object(
        'entities', COALESCE(json_agg( distinct
          ${this.createBuildObject(segment._tableAlias, WarEntityPreview.definition)}
        ) FILTER (WHERE ${segment._tableAlias}.pk_entity IS NOT NULL), '[]')
      ) AS "${column.id}"`);
    }
  }

  createSelectFromRootTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number) {
    if (column.defaultType === 'entity_label') {
      this.selects.push(`
      jsonb_build_object(
        'entityLabel',${leftTableAlias}.entity_label
      ) AS "${column.id}"`);
    }
    else if (column.defaultType === 'pk_entity') {
      this.selects.push(`
      jsonb_build_object(
        'entityId',${leftTableAlias}.pk_entity
      ) AS "${column.id}"`);
    }
    else if (column.defaultType === 'class_label') {
      this.selects.push(`
      jsonb_build_object(
        'entityClassLabel',${leftTableAlias}.class_label
      ) AS "${column.id}"`);
    }
    else if (column.defaultType === 'type_label') {
      this.selects.push(`
      jsonb_build_object(
        'entityTypeLabel',${leftTableAlias}.type_label
      ) AS "${column.id}"`);
    }
    else if (column.defaultType === 'fk_type') {
      this.selects.push(`
      jsonb_build_object(
        'entityTypeId',${leftTableAlias}.fk_type
      ) AS "${column.id}"`);
    }
    else if (column.defaultType === 'entity_preview') {

      // column.colNames = [
      //   'pk_entity',
      //   'entity_type',
      //   'entity_label',
      //   'class_label',
      //   'type_label',
      //   'time_span',
      //   'fk_project'
      // ];
      this.selects.push(`
      jsonb_build_object(
        'entity', ${this.createBuildObject(leftTableAlias, WarEntityPreview.definition)}
      ) AS "${column.id}"`);

    }
  }
}
