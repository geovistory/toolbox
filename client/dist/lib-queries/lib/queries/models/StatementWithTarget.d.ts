import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { TemporalEntityRow } from './TemporalEntityRow';
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
            row: TemporalEntityRow;
            pkEntity: number;
            projRel: ProInfoProjRel;
        };
    };
}
export interface StatementProjRel {
    projRel: ProInfoProjRel;
    ordNum: number;
}
export declare type StatementWithTarget = StatementTarget & StatementProjRel;
