import { ProInfoProjRel } from '../index';
export interface InfLanguageInterface {
    "fk_class"?: number;
    "pk_language"?: string;
    "lang_type"?: string;
    "scope"?: string;
    "iso6392b"?: string;
    "iso6392t"?: string;
    "iso6391"?: string;
    "notes"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
}
export declare class InfLanguage implements InfLanguageInterface {
    "fk_class": number;
    "pk_language": string;
    "lang_type": string;
    "scope": string;
    "iso6392b": string;
    "iso6392t": string;
    "iso6391": string;
    "notes": string;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    constructor(data?: InfLanguageInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLanguage for dynamic purposes.
    **/
    static factory(data: InfLanguageInterface): InfLanguage;
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
            "pk_language": {
                name: string;
                type: string;
            };
            "lang_type": {
                name: string;
                type: string;
            };
            "scope": {
                name: string;
                type: string;
            };
            "iso6392b": {
                name: string;
                type: string;
            };
            "iso6392t": {
                name: string;
                type: string;
            };
            "iso6391": {
                name: string;
                type: string;
            };
            "notes": {
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
        };
    };
}
