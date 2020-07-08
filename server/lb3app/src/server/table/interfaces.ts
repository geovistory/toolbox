// Table column filter interface
export type TColFilterOpNumeric = '=' | '<' | '>'
export type TColFilterOpText = '%iLike%'
export interface TColFilter {
  numeric?: {
    operator: TColFilterOpNumeric;
    value: number;
  }
  text?: {
    operator: TColFilterOpText;
    value: string;
  }

}
export interface TColFilters {
  [colName: string]: TColFilter
}
export interface GetTablePageOptions {
  limit: number,
  offset: number,
  columns: string[],
  orderBy: any,
  sortBy: string,
  sortDirection: 'ASC' | 'DESC',
  filters: TColFilters
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