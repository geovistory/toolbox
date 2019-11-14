import { TableRow } from '../query-result/table-query-res.interface';

export interface TableOutput {
  rows: TableRow[]
  full_count: number
};
