/* tslint:disable */
import {
  Account,
  Project
} from '../index';

declare var Object: any;
export interface ProjectAccountAssociationInterface {
  "role": string;
  "id"?: number;
  "account_id"?: number;
  "fk_project"?: number;
  account?: Account;
  project?: Project;
}

export class ProjectAccountAssociation implements ProjectAccountAssociationInterface {
  "role": string;
  "id": number;
  "account_id": number;
  "fk_project": number;
  account?: Account;
  project?: Project;
  constructor(data?: ProjectAccountAssociationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProjectAccountAssociation`.
   */
  public static getModelName() {
    return "ProjectAccountAssociation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProjectAccountAssociation for dynamic purposes.
  **/
  public static factory(data: ProjectAccountAssociationInterface): ProjectAccountAssociation{
    return new ProjectAccountAssociation(data);
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
      name: 'ProjectAccountAssociation',
      plural: 'ProjectAccountAssociations',
      path: 'ProjectAccountAssociations',
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
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'account_id',
          keyTo: 'id'
        },
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'fk_project',
          keyTo: 'pk_project'
        },
      }
    }
  }
}
