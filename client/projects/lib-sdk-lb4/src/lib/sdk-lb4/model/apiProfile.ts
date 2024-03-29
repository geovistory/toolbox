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
import { ApiProfileSelectedByProjects } from './apiProfileSelectedByProjects';


export interface ApiProfile { 
  [key: string]: object | any;


    profileID: number;
    profileLabelLanguage: string;
    profileLabel: string;
    profileDefinitionLanguage: string;
    profileDefinition: string;
    ownedByProjectID: number;
    ownedByProjectLabelLanguage: string;
    ownedByProjectLabel: string;
    selectedByProjects: ApiProfileSelectedByProjects;
    isOngoingForcedPublication: boolean;
    isRootProfile: boolean;
    fkRootProfile?: number;
    dateProfilePublished?: string;
    dateProfileDeprecated?: string;
}

