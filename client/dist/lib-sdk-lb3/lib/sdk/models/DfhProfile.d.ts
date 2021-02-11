export interface DfhProfileInterface {
    "pk_profile"?: number;
    "owned_by_project"?: number;
    "is_ongoing_forced_publication"?: boolean;
    "date_profile_published"?: string;
    "date_profile_deprecated"?: string;
    "tmsp_last_dfh_update"?: string;
}
export declare class DfhProfile implements DfhProfileInterface {
    "pk_profile": number;
    "owned_by_project": number;
    "is_ongoing_forced_publication": boolean;
    "date_profile_published": string;
    "date_profile_deprecated": string;
    "tmsp_last_dfh_update": string;
    constructor(data?: DfhProfileInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhProfile for dynamic purposes.
    **/
    static factory(data: DfhProfileInterface): DfhProfile;
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
            "pk_profile": {
                name: string;
                type: string;
            };
            "owned_by_project": {
                name: string;
                type: string;
            };
            "is_ongoing_forced_publication": {
                name: string;
                type: string;
            };
            "date_profile_published": {
                name: string;
                type: string;
            };
            "date_profile_deprecated": {
                name: string;
                type: string;
            };
            "tmsp_last_dfh_update": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
