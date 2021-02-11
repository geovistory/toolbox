import { DatNamespace } from '../index';
export interface DatTextPropertyInterface {
    "string"?: string;
    "quill_doc"?: any;
    "fk_system_type"?: number;
    "fk_language"?: number;
    "fk_entity"?: number;
    "pk_entity"?: number;
    "fk_namespace"?: number;
    namespace?: DatNamespace;
}
export declare class DatTextProperty implements DatTextPropertyInterface {
    "string": string;
    "quill_doc": any;
    "fk_system_type": number;
    "fk_language": number;
    "fk_entity": number;
    "pk_entity": number;
    "fk_namespace": number;
    namespace?: DatNamespace;
    constructor(data?: DatTextPropertyInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatTextProperty`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatTextProperty for dynamic purposes.
    **/
    static factory(data: DatTextPropertyInterface): DatTextProperty;
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
            "quill_doc": {
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
            "fk_entity": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
            "fk_namespace": {
                name: string;
                type: string;
            };
        };
        relations: {
            namespace: {
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
