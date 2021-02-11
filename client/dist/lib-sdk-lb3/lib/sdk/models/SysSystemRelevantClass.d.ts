export interface SysSystemRelevantClassInterface {
    "fk_class"?: number;
    "required_by_entities"?: boolean;
    "required_by_sources"?: boolean;
    "required_by_basics"?: boolean;
    "excluded_from_entities"?: boolean;
    "pk_entity"?: number;
}
export declare class SysSystemRelevantClass implements SysSystemRelevantClassInterface {
    "fk_class": number;
    "required_by_entities": boolean;
    "required_by_sources": boolean;
    "required_by_basics": boolean;
    "excluded_from_entities": boolean;
    "pk_entity": number;
    constructor(data?: SysSystemRelevantClassInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemRelevantClass`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemRelevantClass for dynamic purposes.
    **/
    static factory(data: SysSystemRelevantClassInterface): SysSystemRelevantClass;
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
            "required_by_entities": {
                name: string;
                type: string;
            };
            "required_by_sources": {
                name: string;
                type: string;
            };
            "required_by_basics": {
                name: string;
                type: string;
            };
            "excluded_from_entities": {
                name: string;
                type: string;
            };
            "pk_entity": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
