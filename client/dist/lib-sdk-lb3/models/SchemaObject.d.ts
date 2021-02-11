export interface SchemaObjectInterface {
    "inf"?: any;
    "pro"?: any;
    "dat"?: any;
    "sys"?: any;
    "dfh"?: any;
}
export declare class SchemaObject implements SchemaObjectInterface {
    "inf": any;
    "pro": any;
    "dat": any;
    "sys": any;
    "dfh": any;
    constructor(data?: SchemaObjectInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SchemaObject for dynamic purposes.
    **/
    static factory(data: SchemaObjectInterface): SchemaObject;
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
            "inf": {
                name: string;
                type: string;
            };
            "pro": {
                name: string;
                type: string;
            };
            "dat": {
                name: string;
                type: string;
            };
            "sys": {
                name: string;
                type: string;
            };
            "dfh": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
