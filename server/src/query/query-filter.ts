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
