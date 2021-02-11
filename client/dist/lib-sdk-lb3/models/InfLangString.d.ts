import { ProInfoProjRel, InfStatement, InfLanguage } from '../index';
export interface InfLangStringInterface {
    "fk_class": number;
    "fk_language": number;
    "quill_doc"?: any;
    "string"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
    language?: InfLanguage;
}
export declare class InfLangString implements InfLangStringInterface {
    "fk_class": number;
    "fk_language": number;
    "quill_doc": any;
    "string": string;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
    language?: InfLanguage;
    constructor(data?: InfLangStringInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLangString for dynamic purposes.
    **/
    static factory(data: InfLangStringInterface): InfLangString;
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
            "fk_class": {
                name: string;
                type: string;
            };
            "fk_language": {
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
            language: {
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
