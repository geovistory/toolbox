import { SysClassField, ProProject } from '../index';
export interface ProClassFieldConfigInterface {
    "pk_entity"?: number;
    "fk_project"?: number;
    "fk_property"?: number;
    "fk_class_field"?: number;
    "fk_domain_class"?: number;
    "fk_range_class"?: number;
    "ord_num"?: number;
    "fk_class_for_class_field"?: number;
    class_field?: SysClassField;
    project?: ProProject;
}
export declare class ProClassFieldConfig implements ProClassFieldConfigInterface {
    "pk_entity": number;
    "fk_project": number;
    "fk_property": number;
    "fk_class_field": number;
    "fk_domain_class": number;
    "fk_range_class": number;
    "ord_num": number;
    "fk_class_for_class_field": number;
    class_field?: SysClassField;
    project?: ProProject;
    constructor(data?: ProClassFieldConfigInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProClassFieldConfig for dynamic purposes.
    **/
    static factory(data: ProClassFieldConfigInterface): ProClassFieldConfig;
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
            "pk_entity": {
                name: string;
                type: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "fk_property": {
                name: string;
                type: string;
            };
            "fk_class_field": {
                name: string;
                type: string;
            };
            "fk_domain_class": {
                name: string;
                type: string;
            };
            "fk_range_class": {
                name: string;
                type: string;
            };
            "ord_num": {
                name: string;
                type: string;
            };
            "fk_class_for_class_field": {
                name: string;
                type: string;
            };
        };
        relations: {
            property: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            class_field: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            project: {
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
