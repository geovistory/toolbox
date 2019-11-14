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


export interface QueryPathSegmentQueryBuilder extends QueryPathSegment {
  _tableAlias: string
}
