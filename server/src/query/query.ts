import { QueryFilter } from './query-filter';
import { ColDef } from './col-def';

export interface QueryDefinition {
  filter: QueryFilter,
  columns: ColDef[],
  limit?: number,
  offset?: number
}

