export interface SysClassHasTypePropertyInterface {
    "pk_typed_class"?: number;
    "typed_class_label"?: string;
    "dfh_pk_property"?: number;
    "property_label"?: string;
    "pk_type_class"?: number;
    "type_class_label"?: string;
    "pk_entity"?: number;
}
export declare class SysClassHasTypeProperty implements SysClassHasTypePropertyInterface {
    "pk_typed_class": number;
    "typed_class_label": string;
    "dfh_pk_property": number;
    "property_label": string;
    "pk_type_class": number;
    "type_class_label": string;
    "pk_entity": number;
    constructor(data?: SysClassHasTypePropertyInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassHasTypeProperty`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
    **/
    static factory(data: SysClassHasTypePropertyInterface): SysClassHasTypeProperty;
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
            "pk_typed_class": {
                name: string;
                type: string;
            };
            "typed_class_label": {
                name: string;
                type: string;
            };
            "dfh_pk_property": {
                name: string;
                type: string;
            };
            "property_label": {
                name: string;
                type: string;
            };
            "pk_type_class": {
                name: string;
                type: string;
            };
            "type_class_label": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
