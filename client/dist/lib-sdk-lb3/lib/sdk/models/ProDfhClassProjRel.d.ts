export interface ProDfhClassProjRelInterface {
    "pk_entity"?: number;
    "fk_class": number;
    "fk_project": number;
    "enabled_in_entities"?: boolean;
}
export declare class ProDfhClassProjRel implements ProDfhClassProjRelInterface {
    "pk_entity": number;
    "fk_class": number;
    "fk_project": number;
    "enabled_in_entities": boolean;
    constructor(data?: ProDfhClassProjRelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhClassProjRel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhClassProjRel for dynamic purposes.
    **/
    static factory(data: ProDfhClassProjRelInterface): ProDfhClassProjRel;
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
            "fk_class": {
                name: string;
                type: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "enabled_in_entities": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
