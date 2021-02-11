import { SysClassFieldPropertyRel, ProClassFieldConfig } from '../index';
export interface SysClassFieldInterface {
    "pk_entity"?: number;
    "description"?: string;
    "label"?: string;
    "fk_system_type_ng_component"?: number;
    "used_table"?: string;
    class_field_property_rel?: SysClassFieldPropertyRel[];
    class_field_configs?: ProClassFieldConfig[];
}
export declare class SysClassField implements SysClassFieldInterface {
    "pk_entity": number;
    "description": string;
    "label": string;
    "fk_system_type_ng_component": number;
    "used_table": string;
    class_field_property_rel?: SysClassFieldPropertyRel[];
    class_field_configs?: ProClassFieldConfig[];
    constructor(data?: SysClassFieldInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassField for dynamic purposes.
    **/
    static factory(data: SysClassFieldInterface): SysClassField;
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
            "description": {
                name: string;
                type: string;
            };
            "label": {
                name: string;
                type: string;
            };
            "fk_system_type_ng_component": {
                name: string;
                type: string;
            };
            "used_table": {
                name: string;
                type: string;
            };
        };
        relations: {
            class_field_property_rel: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            class_field_configs: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            classes: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                modelThrough: string;
                keyThrough: string;
                keyFrom: string;
                keyTo: string;
            };
        };
    };
}
