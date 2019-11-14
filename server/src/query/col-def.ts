import { QueryPathSegment, QueryPathSegmentQueryBuilder as QueryPathSegmentWithAliases } from './query-path-segment';
export type ColDefDefaultType = 'entity_preview' | 'entity_label' | 'class_label' | 'type_label' | 'temporal_distribution';

export interface ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // if true, the groupBy for this column is prevented
  preventGroupBy?: boolean;
  // If true, users cant edit this column
  defaultType?: ColDefDefaultType

  // the label of the column in the GUI set by user
  label?: string;

  // identifier for the column
  id: string;

  queryPath?: QueryPathSegment[];

}

// createdby query builder on the fly, not for storage
// use ColDef for storing query definition in db
export interface ColDefWithAliases extends ColDef {

  // database column names assigned to that query column
  colNames?: string[]

  // database column name assigned to that query column
  colName?: string;

  queryPath?: QueryPathSegmentWithAliases[];

}
