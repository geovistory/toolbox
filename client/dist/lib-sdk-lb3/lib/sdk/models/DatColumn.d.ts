import { DatNamespace } from '../index';
export interface DatColumnInterface {
    "fk_digital"?: number;
    "fk_data_type"?: number;
    "fk_column_content_type"?: number;
    "fk_column_relationship_type"?: number;
    "fk_original_column"?: number;
    "is_imported"?: number;
    "pk_entity"?: number;
    "fk_namespace"?: number;
    namespace?: DatNamespace;
}
export declare class DatColumn implements DatColumnInterface {
    "fk_digital": number;
    "fk_data_type": number;
    "fk_column_content_type": number;
    "fk_column_relationship_type": number;
    "fk_original_column": number;
    "is_imported": number;
    "pk_entity": number;
    "fk_namespace": number;
    namespace?: DatNamespace;
    constructor(data?: DatColumnInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    static factory(data: DatColumnInterface): DatColumn;
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
            "fk_digital": {
                name: string;
                type: string;
            };
            "fk_data_type": {
                name: string;
                type: string;
            };
            "fk_column_content_type": {
                name: string;
                type: string;
            };
            "fk_column_relationship_type": {
                name: string;
                type: string;
            };
            "fk_original_column": {
                name: string;
                type: string;
            };
            "is_imported": {
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
