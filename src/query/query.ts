import { QueryFilter } from './query-filter';
import { ColDef } from './col-def';

export interface GvQuery {
  filter: QueryFilter,
  columns: ColDef[],
  limit?: number,
  offset?: number
}


export interface TestMe {
  limit?: number,
  offset?: number
}
