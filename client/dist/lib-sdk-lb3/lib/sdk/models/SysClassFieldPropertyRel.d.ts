import { SysClassField } from '../index';
export interface SysClassFieldPropertyRelInterface {
    "pk_entity"?: number;
    "fk_class_field"?: number;
    "fk_property"?: number;
    "property_is_outgoing"?: boolean;
    "ord_num"?: number;
    class_field?: SysClassField;
}
export declare class SysClassFieldPropertyRel implements SysClassFieldPropertyRelInterface {
    "pk_entity": number;
    "fk_class_field": number;
    "fk_property": number;
    "property_is_outgoing": boolean;
    "ord_num": number;
    class_field?: SysClassField;
    constructor(data?: SysClassFieldPropertyRelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassFieldPropertyRel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
    **/
    static factory(data: SysClassFieldPropertyRelInterface): SysClassFieldPropertyRel;
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
            "fk_class_field": {
                name: string;
                type: string;
            };
            "fk_property": {
                name: string;
                type: string;
            };
            "property_is_outgoing": {
                name: string;
                type: string;
            };
            "ord_num": {
                name: string;
                type: string;
            };
        };
        relations: {
            class_field: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            property: {
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
