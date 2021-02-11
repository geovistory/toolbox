export interface EmailInterface {
    "to": string;
    "from": string;
    "subject": string;
    "text"?: string;
    "html"?: string;
    "id"?: number;
}
export declare class Email implements EmailInterface {
    "to": string;
    "from": string;
    "subject": string;
    "text": string;
    "html": string;
    "id": number;
    constructor(data?: EmailInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `Email`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Email for dynamic purposes.
    **/
    static factory(data: EmailInterface): Email;
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
            "to": {
                name: string;
                type: string;
            };
            "from": {
                name: string;
                type: string;
            };
            "subject": {
                name: string;
                type: string;
            };
            "text": {
                name: string;
                type: string;
            };
            "html": {
                name: string;
                type: string;
            };
            "id": {
                name: string;
                type: string;
            };
        };
        relations: {};
    };
}
