/**
 * geovistory
 * Geovistory – Platform for Digital History
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GvSubentitFieldPageReq } from './gvSubentitFieldPageReq';
import { DimensionValueObjectType } from './dimensionValueObjectType';
import { GvSubentityFieldPage } from './gvSubentityFieldPage';


/**
 * If present, defines a specific list type for the class.
 */
export interface GvFieldTargetViewType { 
    appellation?: GvFieldTargetViewType.AppellationEnum;
    language?: GvFieldTargetViewType.LanguageEnum;
    place?: GvFieldTargetViewType.PlaceEnum;
    timePrimitive?: GvFieldTargetViewType.TimePrimitiveEnum;
    langString?: GvFieldTargetViewType.LangStringEnum;
    dimension?: DimensionValueObjectType;
    cell?: GvFieldTargetViewType.CellEnum;
    entityPreview?: GvFieldTargetViewType.EntityPreviewEnum;
    nestedResource?: Array<GvSubentitFieldPageReq>;
    subReqsRecursiveTargets?: Array<GvSubentityFieldPage>;
}
export namespace GvFieldTargetViewType {
    export type AppellationEnum = 'true';
    export const AppellationEnum = {
        True: 'true' as AppellationEnum
    };
    export type LanguageEnum = 'true';
    export const LanguageEnum = {
        True: 'true' as LanguageEnum
    };
    export type PlaceEnum = 'true';
    export const PlaceEnum = {
        True: 'true' as PlaceEnum
    };
    export type TimePrimitiveEnum = 'true';
    export const TimePrimitiveEnum = {
        True: 'true' as TimePrimitiveEnum
    };
    export type LangStringEnum = 'true';
    export const LangStringEnum = {
        True: 'true' as LangStringEnum
    };
    export type CellEnum = 'true';
    export const CellEnum = {
        True: 'true' as CellEnum
    };
    export type EntityPreviewEnum = 'true';
    export const EntityPreviewEnum = {
        True: 'true' as EntityPreviewEnum
    };
}

