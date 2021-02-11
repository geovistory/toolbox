import { ProProject, InfLanguage, SysSystemType } from '../index';
export interface ProTextPropertyInterface {
    "string": string;
    "fk_system_type": number;
    "fk_language": number;
    "fk_project": number;
    "fk_dfh_class"?: number;
    "fk_dfh_property"?: number;
    "fk_dfh_property_domain"?: number;
    "fk_dfh_property_range"?: number;
    "fk_pro_project"?: number;
    "pk_entity"?: number;
    "entity_version"?: number;
    "tmsp_creation"?: string;
    "tmsp_last_modification"?: string;
    project?: ProProject;
    language?: InfLanguage;
    systemType?: SysSystemType;
}
export declare class ProTextProperty implements ProTextPropertyInterface {
    "string": string;
    "fk_system_type": number;
    "fk_language": number;
    "fk_project": number;
    "fk_dfh_class": number;
    "fk_dfh_property": number;
    "fk_dfh_property_domain": number;
    "fk_dfh_property_range": number;
    "fk_pro_project": number;
    "pk_entity": number;
    "entity_version": number;
    "tmsp_creation": string;
    "tmsp_last_modification": string;
    project?: ProProject;
    language?: InfLanguage;
    systemType?: SysSystemType;
    constructor(data?: ProTextPropertyInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProTextProperty for dynamic purposes.
    **/
    static factory(data: ProTextPropertyInterface): ProTextProperty;
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition(): {
        name: string;
        plural: string;
        path: string;
        idName: string;
        properties: {
            "string": {
                name: string;
                type: string;
            };
            "fk_system_type": {
                name: string;
                type: string;
            };
            "fk_language": {
                name: string;
                type: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "fk_dfh_class": {
                name: string;
                type: string;
            };
            "fk_dfh_property": {
                name: string;
                type: string;
            };
            "fk_dfh_property_domain": {
                name: string;
                type: string;
            };
            "fk_dfh_property_range": {
                name: string;
                type: string;
            };
            "fk_pro_project": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
            "entity_version": {
                name: string;
                type: string;
            };
            "tmsp_creation": {
                name: string;
                type: string;
            };
            "tmsp_last_modification": {
                name: string;
                type: string;
            };
        };
        relations: {
            project: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            language: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            systemType: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
        };
    };
}
