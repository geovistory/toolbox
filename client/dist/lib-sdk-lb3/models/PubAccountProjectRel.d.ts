import { PubAccount, ProProject } from '../index';
export interface PubAccountProjectRelInterface {
    "role": string;
    "fk_project": number;
    "account_id"?: number;
    "id"?: number;
    account?: PubAccount;
    project?: ProProject;
}
export declare class PubAccountProjectRel implements PubAccountProjectRelInterface {
    "role": string;
    "fk_project": number;
    "account_id": number;
    "id": number;
    account?: PubAccount;
    project?: ProProject;
    constructor(data?: PubAccountProjectRelInterface);
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccountProjectRel`.
     */
    static getModelName(): string;
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccountProjectRel for dynamic purposes.
    **/
    static factory(data: PubAccountProjectRelInterface): PubAccountProjectRel;
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
            "role": {
                name: string;
                type: string;
                default: string;
            };
            "fk_project": {
                name: string;
                type: string;
            };
            "account_id": {
                name: string;
                type: string;
            };
            "id": {
                name: string;
                type: string;
            };
        };
        relations: {
            account: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
            project: {
                name: string;
                type: string;
                model: string;
                relationType: string;
                keyFrom: string;
                keyTo: string;
            };
        };
    };
}
