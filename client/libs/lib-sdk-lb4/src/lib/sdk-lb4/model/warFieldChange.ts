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


export interface WarFieldChange { 
    fk_project: number;
    fk_source_info: number;
    fk_source_tables_cell: number;
    fk_property: number;
    fk_property_of_property: number;
    is_outgoing: boolean;
    tmsp_last_modification: string;
}
