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
import { PkEntityVersion } from './pkEntityVersion';
import { PkEntity } from './pkEntity';


export interface DatNegativeObject { 
    digital?: Array<PkEntityVersion>;
    chunk?: Array<PkEntity>;
    column?: Array<PkEntity>;
    class_column_mapping?: Array<PkEntity>;
    text_property?: Array<PkEntity>;
    namespace?: Array<PkEntity>;
}
