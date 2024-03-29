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
import { SysConfigAddPropertyForClass } from './sysConfigAddPropertyForClass';


export interface SysConfigAddProperty { 
    comment?: string;
    wherePkProperty: number;
    whereFkDomain?: number;
    whereFkRange?: number;
    toSourceClass?: SysConfigAddPropertyForClass;
    isOutgoing: boolean;
    replaceTargetClassWithSourceClass?: boolean;
}

