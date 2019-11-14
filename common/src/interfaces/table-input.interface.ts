import { QueryDefinition } from '../../../server/src/query/query';

/**
 * Input type definition for analysis of type:
 * table
 */
export interface TableInput {
  queryDefinition: QueryDefinition;
}
