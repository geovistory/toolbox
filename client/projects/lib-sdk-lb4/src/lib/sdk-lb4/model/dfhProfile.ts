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


export interface DfhProfile { 
    pk_profile: number;
    owned_by_project?: number;
    is_ongoing_forced_publication?: boolean;
    date_profile_published?: string;
    date_profile_deprecated?: string;
    tmsp_last_dfh_update?: string;
}
