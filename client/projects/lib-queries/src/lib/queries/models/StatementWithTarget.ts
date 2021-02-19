import { GvSubfieldPage, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
export interface EntitySubfield {
  subfield: Omit<GvSubfieldPage, 'offset' | 'limit'>;
  count: number;
  stmtsWithTarget: Array<StatementWithTarget>
}
export interface StatementTarget {
  statement: InfStatement;
  isOutgoing: boolean;
  targetLabel: string;
  targetClass: number;
  target: {
    entityPreview?: WarEntityPreview;
    appellation?: InfAppellation;
    dimension?: InfDimension;
    langString?: InfLangString;
    language?: InfLanguage;
    timePrimitive?: InfTimePrimitive;
    place?: InfPlace;
    entity?: {
      subfields: EntitySubfield[],
      pkEntity: number;
      projRel: ProInfoProjRel;
    };
  };
}
export interface StatementProjRel {
  projRel?: ProInfoProjRel;
  ordNum: number;
}

export type StatementWithTarget = StatementTarget & StatementProjRel;
