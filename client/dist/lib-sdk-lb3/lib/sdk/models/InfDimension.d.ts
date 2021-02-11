import { ProInfoProjRel, InfStatement, InfPersistentItem } from '../index';
export interface InfDimensionInterface {
    "fk_class": number;
    "fk_measurement_unit": number;
    "numeric_value"?: number;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
    measurement_unit?: InfPersistentItem;
}
export declare class InfDimension implements InfDimensionInterface {
    "fk_class": number;
    "fk_measurement_unit": number;
    "numeric_value": number;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    incoming_statements?: InfStatement[];
    measurement_unit?: InfPersistentItem;
    constructor(data?: InfDimensionInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfDimension`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfDimension for dynamic purposes.
    **/
    static factory(data: InfDimensionInterface): InfDimension;
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
            "fk_measurement_unit": {
                name: string;
                type: string;
            };
            "numeric_value": {
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
            measurement_unit: {
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
