export type SubGroupType = 'property' | 'classAndType'

export interface QueryFilterData {
  subgroup?: SubGroupType;
  operator?: string;

  // inherited from ClassesAndTypes:
  classes?: number[]
  types?: number[]

  // inherited from PropertySelectModel:
  outgoingProperties?: number[]
  ingoingProperties?: number[]
}
export class QueryFilter {
  constructor(public data: QueryFilterData = {}, public children: QueryFilter[] = []) {
  }
}

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


export type QueryPathSegmentType = 'properties' | 'classes';

export interface QueryPathSegment {
  type?: QueryPathSegmentType;
  data: {
    // for entities table
    classes?: number[];
    types?: number[];
    // for role table
    outgoingProperties?: number[];
    ingoingProperties?: number[];
  };
}


export interface QueryDefinition {
  filter: QueryFilter,
  columns: ColDef[],
  limit?: number,
  offset?: number
}
