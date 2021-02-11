import { DatNamespace } from '../index';
export interface DatDigitalInterface {
    "entity_version"?: number;
    "pk_text"?: number;
    "quill_doc"?: any;
    "string"?: string;
    "fk_system_type"?: number;
    "pk_entity"?: number;
    "fk_namespace"?: number;
    namespace?: DatNamespace;
}
export declare class DatDigital implements DatDigitalInterface {
    "entity_version": number;
    "pk_text": number;
    "quill_doc": any;
    "string": string;
    "fk_system_type": number;
    "pk_entity": number;
    "fk_namespace": number;
    namespace?: DatNamespace;
    constructor(data?: DatDigitalInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatDigital`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatDigital for dynamic purposes.
    **/
    static factory(data: DatDigitalInterface): DatDigital;
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
            "entity_version": {
                name: string;
                type: string;
            };
            "pk_text": {
                name: string;
                type: string;
            };
            "quill_doc": {
                name: string;
                type: string;
            };
            "string": {
                name: string;
                type: string;
            };
            "fk_system_type": {
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
