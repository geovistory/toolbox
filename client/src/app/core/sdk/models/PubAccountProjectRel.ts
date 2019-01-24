/* tslint:disable */
import {
  PubAccount,
  ComProject
} from '../index';

declare var Object: any;
export interface PubAccountProjectRelInterface {
  "role": string;
  "id"?: number;
  "account_id"?: number;
  "fk_project"?: number;
  account?: PubAccount;
  project?: ComProject;
}

export class PubAccountProjectRel implements PubAccountProjectRelInterface {
  "role": string;
  "id": number;
  "account_id": number;
  "fk_project": number;
  account?: PubAccount;
  project?: ComProject;
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
        "id": {
          name: 'id',
          type: 'number'
        },
        "account_id": {
          name: 'account_id',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
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
          type: 'ComProject',
          model: 'ComProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_project'
        },
      }
    }
  }
}
