export interface SysAppContextInterface {
    "pk_entity"?: number;
    "description"?: string;
    "label"?: string;
}
export declare class SysAppContext implements SysAppContextInterface {
    "pk_entity": number;
    "description": string;
    "label": string;
    constructor(data?: SysAppContextInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysAppContext`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysAppContext for dynamic purposes.
    **/
    static factory(data: SysAppContextInterface): SysAppContext;
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
            "description": {
                name: string;
                type: string;
            };
            "label": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
