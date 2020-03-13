import { logSql } from '../../utils';
import { SqlBuilderBase } from '../../utils/sql-builder-base';

export interface GetTableOptions {
  limit: number,
  offset: number,
  columns: number[],
  orderBy: any
}
export interface TabCell {
  pk_cell: number;
  string_value?: string;
  numeric_value?: number;
}
export interface TabRow {
  pk_row: number,
  [key: number]: TabCell
}
export interface DatColumn {
  pk_entity: number;
  fk_content_type?: number;
}

/**
 * Class to create select queries on data tables
 */
export class GetTablePageSqlBuilder extends SqlBuilderBase {

  colAliasMap = new Map<number, string>()

  constructor() {
    super()
  }

  buildQuery(fkProject: number, pkEntity: number, options: GetTableOptions) {

    options.columns.forEach((pkCol, i) => {
      this.colAliasMap.set(pkCol, `tr${i}`)
    })

    // filter and orderby columns
    const masterColumns = options.columns.slice(0, 1);


    const sql = `
    -- master columns
    WITH tw1 AS (
      Select
      t1.pk_row,
      ${this.addColumnSelects(masterColumns)}
      From  tables.row t1
      JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
      JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
      ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
      t1.fk_digital = ${this.addParam(pkEntity)}
      AND
      t3.fk_project = ${this.addParam(fkProject)}

      LIMIT ${this.addParam(options.limit)}
      OFFSET ${this.addParam(options.offset)}
    ),

    -- rows
    tw2 AS (
      SELECT json_agg(t1) as rows FROM tw1 T1
    ),

    -- length (total count)
    tw3 AS (
      Select
        count(t1.pk_row) as length
      From  tables.row t1
        JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
        JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
      Where
        t1.fk_digital = ${this.addParam(pkEntity)}
      AND
        t3.fk_project = ${this.addParam(fkProject)}
    )

    SELECT
    json_build_object (
          'rows', tw2.rows,
        'length', tw3.length
    ) as data
    FROM tw2
    LEFT JOIN tw3 ON true;
    `
    logSql(sql, this.params);
    return { sql, params: this.params }

  }

  private addColumnSelects(pks: number[]) {
    return pks.map(pk => {
      const tableAlias = this.colAliasMap.get(pk);
      if (tableAlias) return this.addColumnSelect(pk, tableAlias)
      else return ''
    }).join(',\n')
  }


  private addColumnSelect(pkCol: number, tableAlias: string) {
    return `json_build_object(
              'string_value', ${tableAlias}.string_value,
              'numeric_value', ${tableAlias}.numeric_value,
              'pk_cell', ${tableAlias}.pk_cell
            ) As "${pkCol}"`
  }


  private addColumnFroms(pks: number[], pkEntity: number) {
    return pks.map(pk => {
      const tableAlias = this.colAliasMap.get(pk);
      if (tableAlias) return this.addColumnFrom(pk, tableAlias, pkEntity)
      else return ''
    }).join('\n')
  }


  private addColumnFrom(pkCol: number, tableAlias: string, pkEntity: number) {
    return `
          Left Join tables.cell_${pkEntity}  ${tableAlias}
          On t1.pk_row =  ${tableAlias}.fk_row
          And  ${tableAlias}.fk_column = ${this.addParam(pkCol)}`
  }

}
