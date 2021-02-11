import { ProInfoProjRel, InfTemporalEntity, DatDigital, DatChunk, InfAppellation, InfLangString, InfDimension, InfLanguage, InfPersistentItem, InfTimePrimitive, InfPlace } from '../index';
export interface InfStatementInterface {
    "fk_subject_info"?: number;
    "fk_subject_data"?: number;
    "fk_subject_tables_cell"?: number;
    "fk_subject_tables_row"?: number;
    "fk_property"?: number;
    "fk_property_of_property"?: number;
    "fk_object_info"?: number;
    "fk_object_data"?: number;
    "fk_object_tables_cell"?: number;
    "fk_object_tables_row"?: number;
    "is_in_project_count"?: number;
    "is_standard_in_project_count"?: number;
    "community_favorite_calendar"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    subject_temporal_entity?: InfTemporalEntity;
    subject_digital?: DatDigital;
    subject_chunk?: DatChunk;
    subject_statement?: InfStatement;
    object_temporal_entity?: InfTemporalEntity;
    object_appellation?: InfAppellation;
    object_lang_string?: InfLangString;
    object_chunk?: DatChunk;
    object_dimension?: InfDimension;
    object_language?: InfLanguage;
    subject_persistent_item?: InfPersistentItem;
    object_persistent_item?: InfPersistentItem;
    object_time_primitive?: InfTimePrimitive;
    object_place?: InfPlace;
}
export declare class InfStatement implements InfStatementInterface {
    "fk_subject_info"?: number;
    "fk_subject_data"?: number;
    "fk_subject_tables_cell"?: number;
    "fk_subject_tables_row"?: number;
    "fk_property"?: number;
    "fk_property_of_property"?: number;
    "fk_object_info"?: number;
    "fk_object_data"?: number;
    "fk_object_tables_cell"?: number;
    "fk_object_tables_row"?: number;
    "is_in_project_count"?: number;
    "is_standard_in_project_count"?: number;
    "community_favorite_calendar"?: string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    subject_temporal_entity?: InfTemporalEntity;
    subject_digital?: DatDigital;
    subject_chunk?: DatChunk;
    subject_statement?: InfStatement;
    object_temporal_entity?: InfTemporalEntity;
    object_appellation?: InfAppellation;
    object_lang_string?: InfLangString;
    object_chunk?: DatChunk;
    object_dimension?: InfDimension;
    object_language?: InfLanguage;
    subject_persistent_item?: InfPersistentItem;
    object_persistent_item?: InfPersistentItem;
    object_time_primitive?: InfTimePrimitive;
    object_place?: InfPlace;
    constructor(data?: InfStatementInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfStatement for dynamic purposes.
    **/
    static factory(data: InfStatementInterface): InfStatement;
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
            "fk_subject_info": {
                name: string;
                type: string;
                default: number;
            };
            "fk_subject_data": {
                name: string;
                type: string;
                default: number;
            };
            "fk_subject_tables_cell": {
                name: string;
                type: string;
                default: number;
            };
            "fk_subject_tables_row": {
                name: string;
                type: string;
                default: number;
            };
            "fk_property": {
                name: string;
                type: string;
                default: number;
            };
            "fk_property_of_property": {
                name: string;
                type: string;
                default: number;
            };
            "fk_object_info": {
                name: string;
                type: string;
                default: number;
            };
            "fk_object_data": {
                name: string;
                type: string;
                default: number;
            };
            "fk_object_tables_cell": {
                name: string;
                type: string;
                default: number;
            };
            "fk_object_tables_row": {
                name: string;
                type: string;
                default: number;
            };
            "is_in_project_count": {
                name: string;
                type: string;
            };
            "is_standard_in_project_count": {
                name: string;
                type: string;
            };
            "community_favorite_calendar": {
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
            subject_temporal_entity: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            subject_digital: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            subject_chunk: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            subject_statement: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_temporal_entity: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_appellation: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_lang_string: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_chunk: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_dimension: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_language: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            subject_persistent_item: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_persistent_item: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_time_primitive: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            object_place: {
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
