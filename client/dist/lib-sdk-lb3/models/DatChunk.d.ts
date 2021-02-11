import { DatDigital, InfStatement, DatNamespace } from '../index';
export interface DatChunkInterface {
    "quill_doc"?: any;
    "string"?: string;
    "fk_text": number;
    "fk_entity_version": number;
    "pk_entity"?: number;
    "fk_namespace"?: number;
    digital?: DatDigital;
    outgoing_statements?: InfStatement[];
    namespace?: DatNamespace;
}
export declare class DatChunk implements DatChunkInterface {
    "quill_doc": any;
    "string": string;
    "fk_text": number;
    "fk_entity_version": number;
    "pk_entity": number;
    "fk_namespace": number;
    digital?: DatDigital;
    outgoing_statements?: InfStatement[];
    namespace?: DatNamespace;
    constructor(data?: DatChunkInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatChunk for dynamic purposes.
    **/
    static factory(data: DatChunkInterface): DatChunk;
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
            "quill_doc": {
                name: string;
                type: string;
            };
            "string": {
                name: string;
                type: string;
            };
            "fk_text": {
                name: string;
                type: string;
            };
            "fk_entity_version": {
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
            digital: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            outgoing_statements: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
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
