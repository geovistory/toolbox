export interface DatNamespaceInterface {
    "pk_entity"?: number;
    "fk_root_namespace"?: number;
    "fk_project": number;
    "standard_label": string;
}
export declare class DatNamespace implements DatNamespaceInterface {
    "pk_entity": number;
    "fk_root_namespace": number;
    "fk_project": number;
    "standard_label": string;
    constructor(data?: DatNamespaceInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatNamespace`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatNamespace for dynamic purposes.
    **/
    static factory(data: DatNamespaceInterface): DatNamespace;
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
            "fk_root_namespace": {
                name: string;
                type: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "standard_label": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
