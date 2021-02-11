export interface LoopBackFilter {
    fields?: any;
    include?: any;
    limit?: any;
    order?: any;
    skip?: any;
    offset?: any;
    where?: any;
}
export interface AccessTokenInterface {
    "id"?: string;
    "ttl"?: number;
    "scopes"?: ["string"];
    "created"?: Date;
    "userId"?: string;
    "user"?: any;
}
export declare class AccessToken implements AccessTokenInterface {
    "id": string;
    "ttl": number;
    "scopes": ["string"];
    "created": Date;
    "userId": string;
    "user": any;
    constructor(data?: AccessTokenInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    static factory(data: AccessTokenInterface): AccessToken;
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
        properties: {
            "id": {
                name: string;
                type: string;
            };
            "ttl": {
                name: string;
                type: string;
                default: number;
            };
            "scopes": {
                name: string;
                type: string;
            };
            "created": {
                name: string;
                type: string;
            };
            "userId": {
                name: string;
                type: string;
            };
        };
        relations: {
            user: {
                name: string;
                type: string;
                model: string;
            };
        };
    };
}
export declare class SDKToken implements AccessTokenInterface {
    id: any;
    ttl: number;
    scopes: any;
    created: any;
    userId: any;
    user: any;
    rememberMe: boolean;
    constructor(data?: AccessTokenInterface);
}
/**
* This GeoPoint represents both, LoopBack and MongoDB GeoPoint
**/
export interface GeoPoint {
    lat?: number;
    lng?: number;
    type?: string;
    coordinates?: number[];
}
export interface StatFilter {
    range: string;
    custom?: {
        start: string;
        end: string;
    };
    where?: {};
    groupBy?: string;
}
