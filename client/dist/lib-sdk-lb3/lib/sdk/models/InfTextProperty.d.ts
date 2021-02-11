import { ProInfoProjRel, InfPersistentItem, InfTemporalEntity, InfLanguage, SysClassField } from '../index';
export interface InfTextPropertyInterface {
    "fk_class_field": number;
    "fk_concerned_entity": number;
    "fk_language": number;
    "quill_doc": any;
    "string"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    persistent_item?: InfPersistentItem;
    temporal_entity?: InfTemporalEntity;
    language?: InfLanguage;
    class_field?: SysClassField;
}
export declare class InfTextProperty implements InfTextPropertyInterface {
    "fk_class_field": number;
    "fk_concerned_entity": number;
    "fk_language": number;
    "quill_doc": any;
    "string": string;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    persistent_item?: InfPersistentItem;
    temporal_entity?: InfTemporalEntity;
    language?: InfLanguage;
    class_field?: SysClassField;
    constructor(data?: InfTextPropertyInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTextProperty for dynamic purposes.
    **/
    static factory(data: InfTextPropertyInterface): InfTextProperty;
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
            "fk_class_field": {
                name: string;
                type: string;
            };
            "fk_concerned_entity": {
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
            persistent_item: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            temporal_entity: {
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
            class_field: {
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
