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
import { ClassConfig } from './classConfig';
import { SysConfigSpecialFields } from './sysConfigSpecialFields';


/**
 * Classes indexed by primary key: Use class id as key (e.g. \"21\" for Person, https://ontome.dataforhistory.org/class/21) 
 */
export interface SysConfigValue { 
    classes: { [key: string]: ClassConfig; };
    specialFields: SysConfigSpecialFields;
}
