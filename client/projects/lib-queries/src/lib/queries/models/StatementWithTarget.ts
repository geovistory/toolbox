import { GvSubfieldId, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, ProInfoProjRel, TimePrimitiveWithCal, WarEntityPreview, WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
export interface SubentitySubfieldPage {
  subfield: GvSubfieldId;
  count: number;
  statements: Array<StatementWithTarget>
}
export interface StatementTargetTimeSpan {
  subfields: SubentitySubfieldPage[],
  preview: WarEntityPreviewTimeSpan
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
    timePrimitive?: TimePrimitiveWithCal;
    place?: InfPlace;
    timeSpan?: StatementTargetTimeSpan
    entity?: {
      subfields: SubentitySubfieldPage[],
      pkEntity: number;
      // projRel: ProInfoProjRel;
    };
  };
}
export interface StatementProjRel {
  projRel?: ProInfoProjRel;
  ordNum: number;
}

export type StatementWithTarget = StatementTarget & StatementProjRel;

export interface SubfieldPage {
  statements: StatementWithTarget[]
  count: number
}
