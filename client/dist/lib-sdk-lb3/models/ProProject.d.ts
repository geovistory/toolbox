import { PubAccount, ProTextProperty, ProInfoProjRel, InfLanguage, InfPersistentItem, DatNamespace } from '../index';
export interface ProProjectInterface {
    "pk_entity"?: number;
    "fk_language"?: number;
    accounts?: PubAccount[];
    text_properties?: ProTextProperty[];
    entity_version_project_rels?: ProInfoProjRel[];
    default_language?: InfLanguage;
    persistent_items?: InfPersistentItem[];
    namespaces?: DatNamespace[];
}
export declare class ProProject implements ProProjectInterface {
    "pk_entity": number;
    "fk_language": number;
    accounts?: PubAccount[];
    text_properties?: ProTextProperty[];
    entity_version_project_rels?: ProInfoProjRel[];
    default_language?: InfLanguage;
    persistent_items?: InfPersistentItem[];
    namespaces?: DatNamespace[];
    constructor(data?: ProProjectInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProProject for dynamic purposes.
    **/
    static factory(data: ProProjectInterface): ProProject;
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
            "fk_language": {
                name: string;
                type: string;
            };
        };
        relations: {
            accounts: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                modelThrough: string;
                keyThrough: string;
                keyFrom: string;
                keyTo: string;
            };
            text_properties: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            entity_version_project_rels: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            default_language: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            persistent_items: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                modelThrough: string;
                keyThrough: string;
                keyFrom: string;
                keyTo: string;
            };
            namespaces: {
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
