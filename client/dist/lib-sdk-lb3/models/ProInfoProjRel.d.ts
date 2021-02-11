export interface ProInfoProjRelInterface {
    "fk_project": number;
    "fk_entity"?: number;
    "fk_entity_version"?: string;
    "fk_entity_version_concat"?: string;
    "is_in_project"?: boolean;
    "is_standard_in_project"?: boolean;
    "calendar"?: string;
    "ord_num_of_domain"?: number;
    "ord_num_of_range"?: number;
    "ord_num_of_text_property"?: number;
    "tmsp_last_modification"?: string;
    "fk_creator"?: number;
    "fk_last_modifier": number;
    "pk_entity"?: number;
    "entity_version"?: number;
    "tmsp_creation"?: string;
}
export declare class ProInfoProjRel implements ProInfoProjRelInterface {
    "fk_project": number;
    "fk_entity"?: number;
    "fk_entity_version"?: string;
    "fk_entity_version_concat"?: string;
    "is_in_project"?: boolean;
    "is_standard_in_project"?: boolean;
    "calendar"?: string;
    "ord_num_of_domain"?: number;
    "ord_num_of_range"?: number;
    "ord_num_of_text_property"?: number;
    "tmsp_last_modification"?: string;
    "fk_creator"?: number;
    "fk_last_modifier": number;
    "pk_entity"?: number;
    "entity_version"?: number;
    "tmsp_creation"?: string;
    constructor(data?: ProInfoProjRelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProInfoProjRel for dynamic purposes.
    **/
    static factory(data: ProInfoProjRelInterface): ProInfoProjRel;
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
            "fk_project": {
                name: string;
                type: string;
            };
            "fk_entity": {
                name: string;
                type: string;
            };
            "fk_entity_version": {
                name: string;
                type: string;
            };
            "fk_entity_version_concat": {
                name: string;
                type: string;
            };
            "is_in_project": {
                name: string;
                type: string;
            };
            "is_standard_in_project": {
                name: string;
                type: string;
            };
            "calendar": {
                name: string;
                type: string;
            };
            "ord_num_of_domain": {
                name: string;
                type: string;
            };
            "ord_num_of_range": {
                name: string;
                type: string;
            };
            "ord_num_of_text_property": {
                name: string;
                type: string;
            };
            "tmsp_last_modification": {
                name: string;
                type: string;
            };
            "fk_creator": {
                name: string;
                type: string;
            };
            "fk_last_modifier": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
            "entity_version": {
                name: string;
                type: string;
            };
            "tmsp_creation": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
