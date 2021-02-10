/* tslint:disable */
import {
  PubAccount,
  ProProject
} from '../index';

declare var Object: any;
export interface PubAccountProjectRelInterface {
  "role": string;
  "fk_project": number;
  "account_id"?: number;
  "id"?: number;
  account?: PubAccount;
  project?: ProProject;
}

export class PubAccountProjectRel implements PubAccountProjectRelInterface {
  "role": string;
  "fk_project": number;
  "account_id": number;
  "id": number;
  account?: PubAccount;
  project?: ProProject;
  constructor(data?: PubAccountProjectRelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PubAccountProjectRel`.
   */
  public static getModelName() {
    return "PubAccountProjectRel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PubAccountProjectRel for dynamic purposes.
  **/
  public static factory(data: PubAccountProjectRelInterface): PubAccountProjectRel{
    return new PubAccountProjectRel(data);
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
      name: 'PubAccountProjectRel',
      plural: 'PubAccountProjectRels',
      path: 'PubAccountProjectRels',
      idName: 'id',
      properties: {
        "role": {
          name: 'role',
          type: 'string',
          default: 'admin'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "account_id": {
          name: 'account_id',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        account: {
          name: 'account',
          type: 'PubAccount',
          model: 'PubAccount',
          relationType: 'belongsTo',
                  keyFrom: 'account_id',
          keyTo: 'id'
        },
        project: {
          name: 'project',
          type: 'ProProject',
          model: 'ProProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
