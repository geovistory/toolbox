import { QueryFilter } from './query-filter';
import { ColDef, ColDefWithAliases } from './col-def';

export interface QueryDefinition {
  filter: QueryFilter,
  columns: ColDef[],
  limit?: number,
  offset?: number
}

export interface QueryDefinitionWithAliases extends QueryDefinition {
  columns: ColDefWithAliases[]
}

