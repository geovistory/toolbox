export type QueryPathSegmentType = 'properties' | 'classes';

export class QueryPathSegment {
  type: QueryPathSegmentType;
  data: {
    // for entities table
    classes?: number[];
    types?: number[];
    // for role table
    outgoingProperties?: number[];
    ingoingProperties?: number[];
  };
  constructor(data: QueryPathSegment) {
    Object.assign(this, data);
  }
}
