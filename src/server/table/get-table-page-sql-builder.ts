import { SqlBuilderBase } from '../utils/sql-builder-base';
import { logSql } from '../utils';
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

export class GetTablePageSqlBuilder extends SqlBuilderBase {

  colAliasMap = new Map<number, string>()

  buildQuery(fkProject: number, pkEntity: number, options: GetTableOptions) {

    options.columns.forEach((pkCol, i) => {
      this.colAliasMap.set(pkCol, `tr${i}`)
    })

    const sql = `
    Select
    t1.pk_row,
    ${this.addColumnSelects(options.columns)}
    From  tables.row t1
    JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
    JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
    ${this.addColumnFroms(options.columns, pkEntity)}
    Where
    t1.fk_digital = ${this.addParam(pkEntity)}
    AND
    t3.fk_project = ${this.addParam(fkProject)}

    LIMIT ${this.addParam(options.limit)}
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
