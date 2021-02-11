import { ProInfoProjRel } from '../index';
export interface InfPlaceInterface {
    "long": number;
    "lat": number;
    "fk_class": number;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
}
export declare class InfPlace implements InfPlaceInterface {
    "long": number;
    "lat": number;
    "fk_class": number;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    constructor(data?: InfPlaceInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPlace for dynamic purposes.
    **/
    static factory(data: InfPlaceInterface): InfPlace;
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
            "long": {
                name: string;
                type: string;
            };
            "lat": {
                name: string;
                type: string;
            };
            "fk_class": {
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
