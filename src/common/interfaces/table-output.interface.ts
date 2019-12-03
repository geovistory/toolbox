import { TableRow } from './table-query-res.interface';

export interface TableOutput {
  rows: TableRow[]
  full_count: number
};



export type TableExportFileType = 'json' | 'csv'
