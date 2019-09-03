export type SubGroupType = 'property' | 'classAndType'

export interface FilterTreeData {
  subgroup?: SubGroupType;
  operator?: string;

  // inherited from ClassesAndTypes:
  classes?: number[]
  types?: number[]

  // inherited from PropertySelectModel:
  outgoingProperties?: number[]
  ingoingProperties?: number[]
}
export class FilterTree {
  constructor(public data: FilterTreeData = {}, public children: FilterTree[] = []) {
  }
}
