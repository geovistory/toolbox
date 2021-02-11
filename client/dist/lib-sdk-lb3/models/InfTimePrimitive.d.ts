import { ProInfoProjRel } from '../index';
export interface InfTimePrimitiveInterface {
    "fk_class": number;
    "julian_day": number;
    "duration": string;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
}
export declare class InfTimePrimitive implements InfTimePrimitiveInterface {
    "fk_class": number;
    "julian_day": number;
    "duration": string;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    constructor(data?: InfTimePrimitiveInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTimePrimitive`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTimePrimitive for dynamic purposes.
    **/
    static factory(data: InfTimePrimitiveInterface): InfTimePrimitive;
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
            "julian_day": {
                name: string;
                type: string;
            };
            "duration": {
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
