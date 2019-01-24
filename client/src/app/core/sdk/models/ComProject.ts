/* tslint:disable */
import {
  PubAccount,
  ComLanguage,
  ComLabel,
  ComTextProperty,
  InfPersistentItem,
  InfEntityProjectRel,
  InfNamespace
} from '../index';

declare var Object: any;
export interface ComProjectInterface {
  "notes"?: string;
  "pk_project"?: number;
  "pk_entity"?: number;
  "fk_language"?: string;
  accounts?: PubAccount[];
  default_language?: ComLanguage;
  labels?: ComLabel[];
  text_properties?: ComTextProperty[];
  persistent_item_versions?: InfPersistentItem[];
  entity_version_project_rels?: InfEntityProjectRel[];
  namespaces?: InfNamespace[];
}

export class ComProject implements ComProjectInterface {
  "notes": string;
  "pk_project": number;
  "pk_entity": number;
  "fk_language": string;
  accounts?: PubAccount[];
  default_language?: ComLanguage;
  labels?: ComLabel[];
  text_properties?: ComTextProperty[];
  persistent_item_versions?: InfPersistentItem[];
  entity_version_project_rels?: InfEntityProjectRel[];
  namespaces?: InfNamespace[];
  constructor(data?: ComProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComProject`.
   */
  public static getModelName() {
    return "ComProject";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComProject for dynamic purposes.
  **/
  public static factory(data: ComProjectInterface): ComProject{
    return new ComProject(data);
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
      name: 'ComProject',
      plural: 'ComProjects',
      path: 'ComProjects',
      idName: 'pk_project',
      properties: {
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "pk_project": {
          name: 'pk_project',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'string'
        },
      },
      relations: {
        accounts: {
          name: 'accounts',
          type: 'PubAccount[]',
          model: 'PubAccount',
          relationType: 'hasMany',
          modelThrough: 'PubAccountProjectRel',
          keyThrough: 'account_id',
          keyFrom: 'pk_project',
          keyTo: 'fk_project'
        },
        default_language: {
          name: 'default_language',
          type: 'ComLanguage',
          model: 'ComLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_language'
        },
        labels: {
          name: 'labels',
          type: 'ComLabel[]',
          model: 'ComLabel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        text_properties: {
          name: 'text_properties',
          type: 'ComTextProperty[]',
          model: 'ComTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        persistent_item_versions: {
          name: 'persistent_item_versions',
          type: 'InfPersistentItem[]',
          model: 'InfPersistentItem',
          relationType: 'hasMany',
          modelThrough: 'InfEntityProjectRel',
          keyThrough: 'fk_entity_version_concat',
          keyFrom: 'pk_project',
          keyTo: 'fk_project'
        },
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'InfEntityProjectRel[]',
          model: 'InfEntityProjectRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_project',
          keyTo: 'fk_project'
        },
        namespaces: {
          name: 'namespaces',
          type: 'InfNamespace[]',
          model: 'InfNamespace',
          relationType: 'hasMany',
                  keyFrom: 'pk_project',
          keyTo: 'fk_project'
        },
      }
    }
  }
}
