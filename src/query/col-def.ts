import { QueryPathSegment } from './query-path-segment';

export class ColDef {
  // has to be true on columns of the root table (the first entity_preview table)
  ofRootTable?: boolean;
  // if true, the groupBy for this column is prevented
  preventGroupBy?: boolean;
  // If true, users cant edit this column
  defaultType?: 'entity_preview' | 'entity_label' | 'class_label' | 'type_label' | 'temporal_distribution';

  colName?: string;
  label?: string;
  queryPath?: QueryPathSegment[];
  constructor(data: ColDef) {
    Object.assign(this, data);
  }
}
