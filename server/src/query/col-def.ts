import { QueryPathSegment } from './query-path-segment';
export type ColDefDefaultType = 'entity_preview' | 'entity_label' | 'class_label' | 'type_label' | 'temporal_distribution';

export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // if true, the groupBy for this column is prevented
  preventGroupBy?: boolean;
  // If true, users cant edit this column
  defaultType?: ColDefDefaultType

  // the name of the database column
  colName?: string;

  // the label of the column in the GUI set by user
  label?: string;

  // identifier for the column
  id?: string;

  queryPath?: QueryPathSegment[];
  constructor(data: ColDef) {
    Object.assign(this, data);
  }
}

