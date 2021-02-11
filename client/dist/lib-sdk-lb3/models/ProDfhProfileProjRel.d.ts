export interface ProDfhProfileProjRelInterface {
    "pk_entity"?: number;
    "fk_profile": number;
    "fk_project": number;
    "enabled"?: boolean;
}
export declare class ProDfhProfileProjRel implements ProDfhProfileProjRelInterface {
    "pk_entity": number;
    "fk_profile": number;
    "fk_project": number;
    "enabled": boolean;
    constructor(data?: ProDfhProfileProjRelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhProfileProjRel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhProfileProjRel for dynamic purposes.
    **/
    static factory(data: ProDfhProfileProjRelInterface): ProDfhProfileProjRel;
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
            "fk_profile": {
                name: string;
                type: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "enabled": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
