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
import { QueryPathSegment } from './queryPathSegment';


export interface ColDef { 
    ofRootTable?: boolean;
    preventGroupBy?: boolean;
    defaultType?: ColDef.DefaultTypeEnum;
    label?: string;
    id: string;
    queryPath?: Array<QueryPathSegment>;
}
export namespace ColDef {
    export type DefaultTypeEnum = 'entity_preview' | 'pk_entity' | 'entity_label' | 'class_label' | 'type_label' | 'fk_type' | 'temporal_distribution' | 'space_and_time_cont';
    export const DefaultTypeEnum = {
        EntityPreview: 'entity_preview' as DefaultTypeEnum,
        PkEntity: 'pk_entity' as DefaultTypeEnum,
        EntityLabel: 'entity_label' as DefaultTypeEnum,
        ClassLabel: 'class_label' as DefaultTypeEnum,
        TypeLabel: 'type_label' as DefaultTypeEnum,
        FkType: 'fk_type' as DefaultTypeEnum,
        TemporalDistribution: 'temporal_distribution' as DefaultTypeEnum,
        SpaceAndTimeCont: 'space_and_time_cont' as DefaultTypeEnum
    };
}

