import { ProInfoProjRel, InfStatement } from '../index';
export interface InfAppellationInterface {
    "quill_doc": any;
    "fk_class": number;
    "string"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
}
export declare class InfAppellation implements InfAppellationInterface {
    "quill_doc": any;
    "fk_class": number;
    "string": string;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
    constructor(data?: InfAppellationInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfAppellation`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfAppellation for dynamic purposes.
    **/
    static factory(data: InfAppellationInterface): InfAppellation;
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
            "fk_class": {
                name: string;
                type: string;
            };
            "string": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
        };
        relations: {
            entity_version_project_rels: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            incoming_statements: {
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
