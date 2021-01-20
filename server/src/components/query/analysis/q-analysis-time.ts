import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {ChartLine} from '../../../models/analysis/analysis-time-chart-response.model';
import {QueryDefinition} from '../../../models/pro-analysis.model';
import {ColDefWithAliases, QAnalysisBase} from './q-analysis-base';
import {WarEntityPreview} from '../../../models/war-entity-preview.model';



export class QAnalysisTime extends QAnalysisBase {



  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
  }

  async query(query: QueryDefinition, fkProject: number) {

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
        ${this.limit}
        ${this.offset}
        `;

    return this.execute<ChartLine[]>()
  }

  createSelectFromRootTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number) {
    this.selects.push(
      `commons.analysis__create_temporal_distribution(array_agg( ${leftTableAlias}.pk_entity), ${fkProject}) as "linePoints"`
    );
  }

  createSelectFromJoinedTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void {
    throw new Error('Method not implemented.');
  }

}
