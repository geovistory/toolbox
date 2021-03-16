import { GvFieldId, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, ProInfoProjRel, TimePrimitiveWithCal, WarEntityPreview, WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
export interface SubentitySubfieldPage {
    subfield: GvFieldId;
    count: number;
    statements: Array<StatementWithTarget>;
}
export interface StatementTargetTimeSpan {
    subfields: SubentitySubfieldPage[];
    preview: WarEntityPreviewTimeSpan;
}
export interface StatementTargetEntity {
    pkEntity: number;
    fkClass: number;
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
        timeSpan?: StatementTargetTimeSpan;
        entity?: StatementTargetEntity;
    };
}
export interface StatementProjRel {
    projRel?: ProInfoProjRel;
    ordNum: number;
}
export declare type StatementWithTarget = StatementTarget & StatementProjRel;
export interface SubfieldPage {
    statements: StatementWithTarget[];
    count: number;
}
