import {Postgres1DataSource} from '../../../datasources/postgres1.datasource';
import {QueryDefinition} from '../../../models/pro-analysis.model';
import {logSql} from '../../../utils/helpers';
import {ColDefWithAliases, QAnalysisBase} from './q-analysis-base';




export class QAnalysisCount extends QAnalysisBase {
  createSelectFromJoinedTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void {
    throw new Error('Method not implemented.');
  }
  createSelectFromRootTable(column: ColDefWithAliases, leftTableAlias: string, fkProject: number): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
  }


  /**
   * Build Sql query for counting the number of resulting rows
   * when only the query filter is applied
   */
  async countResultingRows(query: QueryDefinition, fkProject: number) {
    const rootTableAlias = this.addTableAlias();

    // root table where
    this.filterWheres.push(
      this.createEntityWhere(query.filter, rootTableAlias, fkProject)
    );

    // root table from
    this.filterFroms.push(`war.entity_preview ${rootTableAlias}`);
    this.froms.push(`tw1 ${rootTableAlias}`);

    // create froms and wheres according to filter definition
    const filterWithAliases = this.createFilterFroms(query.filter, rootTableAlias, fkProject);
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
       count(*)::int
      FROM
        ${this.joinFroms(this.froms)}
        `;
    logSql(this.sql, this.params)

    const res = await this.execute<{count: number}[]>()
    return res?.[0]?.count ?? 0;
  }


}
