/* tslint:disable */

declare var Object: any;
export interface PubAccountInterface {
  "id"?: number;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  accessTokens?: any[];
  projects?: any[];
}

export class PubAccount implements PubAccountInterface {
  "id": number;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  accessTokens?: any[];
  projects?: any[];
  constructor(data?: PubAccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PubAccount`.
   */
  public static getModelName() {
    return "PubAccount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PubAccount for dynamic purposes.
  **/
  public static factory(data: PubAccountInterface): PubAccount{
    return new PubAccount(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'PubAccount',
      plural: 'PubAccounts',
      path: 'PubAccounts',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        projects: {
          name: 'projects',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
          modelThrough: 'PubAccountProjectRel',
          keyThrough: 'fk_project',
          keyFrom: 'id',
          keyTo: 'account_id'
        },
      }
    }
  }
}
