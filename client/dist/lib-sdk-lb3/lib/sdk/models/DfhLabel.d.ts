export interface DfhLabelInterface {
    "type"?: string;
    "label"?: string;
    "language"?: string;
    "fk_profile"?: number;
    "fk_project"?: number;
    "fk_property"?: number;
    "fk_class"?: number;
}
export declare class DfhLabel implements DfhLabelInterface {
    "type": string;
    "label": string;
    "language": string;
    "fk_profile": number;
    "fk_project": number;
    "fk_property": number;
    "fk_class": number;
    constructor(data?: DfhLabelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhLabel for dynamic purposes.
    **/
    static factory(data: DfhLabelInterface): DfhLabel;
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
            "type": {
                name: string;
                type: string;
            };
            "label": {
                name: string;
                type: string;
            };
            "language": {
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
            "fk_property": {
                name: string;
                type: string;
            };
            "fk_class": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
