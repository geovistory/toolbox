export interface SysSystemTypeInterface {
    "notes"?: string;
    "definition"?: string;
    "st_schema_name"?: string;
    "st_table_name"?: string;
    "st_column_name"?: string;
    "st_group"?: string;
    "pk_entity"?: number;
}
export declare class SysSystemType implements SysSystemTypeInterface {
    "notes": string;
    "definition": string;
    "st_schema_name": string;
    "st_table_name": string;
    "st_column_name": string;
    "st_group": string;
    "pk_entity": number;
    constructor(data?: SysSystemTypeInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemType`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemType for dynamic purposes.
    **/
    static factory(data: SysSystemTypeInterface): SysSystemType;
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
            "notes": {
                name: string;
                type: string;
            };
            "definition": {
                name: string;
                type: string;
            };
            "st_schema_name": {
                name: string;
                type: string;
            };
            "st_table_name": {
                name: string;
                type: string;
            };
            "st_column_name": {
                name: string;
                type: string;
            };
            "st_group": {
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
