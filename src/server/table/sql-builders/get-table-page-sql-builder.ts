import { logSql } from '../../utils';
import { SqlBuilderBase } from '../../utils/sql-builder-base';
import { clone } from 'ramda';

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

  colBatchWiths: { name: string, columns: number[] }[] = [];
  colBatchWithI = 0;

  columns: number[] = [];

  constructor() {
    super()
  }

  buildQuery(fkProject: number, pkEntity: number, options: GetTableOptions) {
    this.columns = clone(options.columns);

    this.columns.forEach((pkCol, i) => {
      this.colAliasMap.set(pkCol, `tr${i}`)
    })

    // filter and orderby columns
    const masterColumns = this.columns.splice(0, 1);

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

      LIMIT ${this.addParam(options.limit || 20)}
      OFFSET ${this.addParam(options.offset || 0)}
    ),

    -- col withs (baches of 10 columns for performance)
    ${this.addColBatchWiths(this.columns, pkEntity)},


    -- rows
    tw2 AS (
      ${this.joinColBatchWiths()}
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

  private addColBatchWiths(columns: number[], pkEntity: number): string {
    return this.recurseColBatchWiths(columns, pkEntity).join(',\n')
  }

  private recurseColBatchWiths(columns: number[], pkEntity: number): string[] {

    let sqls: string[] = []

    const colBatch = columns.splice(0, 10);

    if (colBatch.length > 0) {
      sqls.push(this.addColBatchWith(`col_tw_${this.colBatchWithI}`, colBatch, pkEntity))

      this.colBatchWithI++;
      sqls = [...sqls, ... this.recurseColBatchWiths(columns, pkEntity) || []]
    }

    return sqls
  }

  private addColBatchWith(colBatchWith: string, columns: number[], pkEntity: number): string {
    this.colBatchWiths.push({ name: colBatchWith, columns })
    const sql = `
    ${colBatchWith} As (
        Select
           t1.pk_row,
           ${this.addColumnSelects(columns)}
        From
            tw1 t1
        ${this.addColumnFroms(columns, pkEntity)}
    )
    `
    return sql
  }

  private joinColBatchWiths() {
    return `
        Select
          tw1.pk_row,
          ${this.colBatchWiths.map(w => w.columns.map(c => `${w.name}."${c}"`).join(',\n')).join(',\n')}
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
}
