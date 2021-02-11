export interface PubAccountInterface {
    "id"?: number;
    "realm"?: string;
    "username"?: string;
    "email": string;
    "emailVerified"?: boolean;
    accessTokens?: any[];
    projects?: any[];
}
export declare class PubAccount implements PubAccountInterface {
    "id": number;
    "realm": string;
    "username": string;
    "email": string;
    "emailVerified": boolean;
    accessTokens?: any[];
    projects?: any[];
    constructor(data?: PubAccountInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccount for dynamic purposes.
    **/
    static factory(data: PubAccountInterface): PubAccount;
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
            "id": {
                name: string;
                type: string;
            };
            "realm": {
                name: string;
                type: string;
            };
            "username": {
                name: string;
                type: string;
            };
            "email": {
                name: string;
                type: string;
            };
            "emailVerified": {
                name: string;
                type: string;
            };
        };
        relations: {
            accessTokens: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            projects: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                modelThrough: string;
                keyThrough: string;
                keyFrom: string;
                keyTo: string;
            };
        };
    };
}
