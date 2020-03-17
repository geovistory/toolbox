import { without } from 'ramda';
import { logSql } from '../../utils';
import { SqlBuilderBase } from '../../utils/sql-builder-base';

interface Filters {
  [colName: string]: string
}
export interface GetTablePageOptions {
  limit: number,
  offset: number,
  columns: string[],
  orderBy: any,
  sortBy: string,
  sortDirection: 'ASC' | 'DESC',
  filters: Filters
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
  fk_data_type?: number;
}

/**
 * Class to create select queries on data tables
 */
export class GetTablePageSqlBuilder extends SqlBuilderBase {

  // key is the column name / pkColumn, value is the alias of the table
  colTableAliasMap = new Map<string, string>()

  colBatchWiths: { name: string, columns: string[] }[] = [];
  colBatchWithI = 0;

  constructor() {
    super()
  }

  buildQuery(fkProject: number, pkEntity: number, options: GetTablePageOptions, masterColumns: string[], colMeta: DatColumn[]) {
    options.columns.forEach((pkCol, i) => {
      this.colTableAliasMap.set(pkCol, `tr${i}`)
    })

    const colsForBatches = without(masterColumns, options.columns);

    const sql = `
    -- master columns
    WITH tw1 AS (
      Select
      t1.pk_row${masterColumns.length ? ',' : ''}
      ${this.addColumnSelects(masterColumns)}
      From  tables.row t1
      JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
      JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
      ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
      t1.fk_digital = ${this.addParam(pkEntity)}
      AND
      t3.fk_project = ${this.addParam(fkProject)}

      ${this.addFilters(options.filters, colMeta)}

      ${this.addOrderBy(options, colMeta)}

      LIMIT ${this.addParam(options.limit || 20)}
      OFFSET ${this.addParam(options.offset || 0)}
    )

    -- col withs (baches of 10 columns for performance)
    ${colsForBatches.length ? ',' : ''}
    ${this.addColBatchWiths(colsForBatches, pkEntity)},

    -- rows
    tw2 AS (
      ${this.joinColBatchWiths(masterColumns)}
    ),

    -- length (total count)
    tw3 AS (
      Select
        count(t1.pk_row) as length
      From  tables.row t1
        JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
        JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
        ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
        t1.fk_digital = ${this.addParam(pkEntity)}
      AND
        t3.fk_project = ${this.addParam(fkProject)}
        ${this.addFilters(options.filters, colMeta)}
    ),
    tw4 AS (
      SELECT json_agg(t1) as rows FROM tw2 t1
    )

    SELECT
    json_build_object (
        'rows', tw4.rows,
        'length', tw3.length
    ) as data
    FROM tw4
    LEFT JOIN tw3 ON true;
    `
    logSql(sql, this.params);
    return { sql, params: this.params }

  }



  private addColumnSelects(columns: string[]) {
    return columns.map(pk => {
      const tableAlias = this.colTableAliasMap.get(pk);
      if (tableAlias) return this.addColumnSelect(pk, tableAlias)

      else {
        console.error('col table alias not found:', pk)
        return ''
      }
    }).join(',\n')
  }


  private addColumnSelect(colName: string, tableAlias: string) {
    return `json_build_object(
              'string_value', ${tableAlias}.string_value,
              'numeric_value', ${tableAlias}.numeric_value,
              'pk_cell', ${tableAlias}.pk_cell
            ) As "${colName}"`
  }


  private addColumnFroms(columns: string[], pkEntity: number) {
    return columns.map(pk => {
      const tableAlias = this.colTableAliasMap.get(pk);
      if (tableAlias) return this.addColumnFrom(pk, tableAlias, pkEntity)
      else return ''
    }).join('\n')
  }


  private addColumnFrom(pkCol: string, tableAlias: string, pkEntity: number) {
    return `
          Left Join tables.cell_${pkEntity}  ${tableAlias}
          On t1.pk_row =  ${tableAlias}.fk_row
          And  ${tableAlias}.fk_column = ${this.addParam(parseInt(pkCol, 10))}`
  }

  private addColBatchWiths(columns: string[], pkEntity: number): string {
    return this.recurseColBatchWiths(columns, pkEntity).join(',\n')
  }

  private recurseColBatchWiths(columns: string[], pkEntity: number): string[] {

    let sqls: string[] = []

    const colBatch = columns.splice(0, 10);

    if (colBatch.length > 0) {
      sqls.push(this.addColBatchWith(`col_tw_${this.colBatchWithI}`, colBatch, pkEntity))

      this.colBatchWithI++;
      sqls = [...sqls, ... this.recurseColBatchWiths(columns, pkEntity) || []]
    }

    return sqls
  }

  private addColBatchWith(colBatchWith: string, columns: string[], pkEntity: number): string {
    this.colBatchWiths.push({ name: colBatchWith, columns })
    const sql = `
    ${colBatchWith} As (
        Select
           t1.pk_row ${columns.length ? ',' : ''}
           ${this.addColumnSelects(columns)}
        From
            tw1 t1
        ${this.addColumnFroms(columns, pkEntity)}
    )
    `
    return sql
  }

  private joinColBatchWiths(masterColumns: string[]) {
    return `
        Select
      ${
      [
        ...['pk_row', ...masterColumns].map(colName => `tw1."${colName}"`),
        ...this.colBatchWiths.map(w => w.columns.map(c => `${w.name}."${c}"`).join(',\n'))
      ].join(',\n')
      }
        From
          ${['tw1', ...this.colBatchWiths.map(w => w.name)].join(',\n')}
          ${
      this.colBatchWiths.length < 1 ? '' :
        `Where
            ${this.colBatchWiths
          .map((w) => `tw1.pk_row = ${w.name}.pk_row`)
          .join(' AND \n')}
        `
      }

    `
  }

  addFilters(filters: Filters, colMeta: DatColumn[]) {
    let sql = ''
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const filter = filters[key];
        if (key == 'pk_row') {
          sql = `
          ${sql}
          AND t1.pk_row::text iLIKE '%${filter}%'
          `
        }
        else {
          const pkCol = key
          const datCol = colMeta.find((col) => col.pk_entity == parseInt(pkCol, 10))
          const cellCol = datCol ?.fk_data_type == 3292 ? 'string_value' : 'numeric_value';
          sql = `
          ${sql}
          AND ${this.colTableAliasMap.get(pkCol)}.${cellCol}::text iLIKE '%${filter}%'
          `
        }
      }
    }

    return sql
  }

  private addOrderBy(options: GetTablePageOptions, colMeta: DatColumn[]): string {
    if (options.sortBy) {
      if (options.sortBy == 'pk_row') {
        return `ORDER BY t1.pk_row ${options.sortDirection}`
      }
      else {
        const pkCol = options.sortBy
        const datCol = colMeta.find((col) => col.pk_entity == parseInt(pkCol, 10))
        const cellCol = datCol ?.fk_data_type == 3292 ? 'string_value' : 'numeric_value';
        return `ORDER BY ${this.colTableAliasMap.get(pkCol)}.${cellCol} ${options.sortDirection}`
      }
    }
    return ''
  }
}
