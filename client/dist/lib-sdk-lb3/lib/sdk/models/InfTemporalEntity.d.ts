import { ProInfoProjRel, InfStatement, InfTextProperty } from '../index';
export interface InfTemporalEntityInterface {
    "fk_class": number;
    "pk_entity"?: number;
    entity_version_project_rels?: ProInfoProjRel[];
    outgoing_statements?: InfStatement[];
    incoming_statements?: InfStatement[];
    text_properties?: InfTextProperty[];
}
export declare class InfTemporalEntity implements InfTemporalEntityInterface {
    "fk_class": number;
    "pk_entity": number;
    entity_version_project_rels?: ProInfoProjRel[];
    outgoing_statements?: InfStatement[];
    incoming_statements?: InfStatement[];
    text_properties?: InfTextProperty[];
    constructor(data?: InfTemporalEntityInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTemporalEntity for dynamic purposes.
    **/
    static factory(data: InfTemporalEntityInterface): InfTemporalEntity;
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
            outgoing_statements: {
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
            text_properties: {
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
