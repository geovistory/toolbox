/* tslint:disable */
import {
  Account,
  Language,
  ComLabel,
  ComTextProperty,
  InfPersistentItem,
  InfEntityProjectRel,
  InfNamespace
} from '../index';

declare var Object: any;
export interface ProjectInterface {
  "notes"?: string;
  "pk_project"?: number;
  "pk_entity"?: number;
  "fk_language"?: string;
  accounts?: Account[];
  default_language?: Language;
  labels?: ComLabel[];
  text_properties?: ComTextProperty[];
  persistent_item_versions?: InfPersistentItem[];
  entity_version_project_rels?: InfEntityProjectRel[];
  namespaces?: InfNamespace[];
}

export class Project implements ProjectInterface {
  "notes": string;
  "pk_project": number;
  "pk_entity": number;
  "fk_language": string;
  accounts?: Account[];
  default_language?: Language;
  labels?: ComLabel[];
  text_properties?: ComTextProperty[];
  persistent_item_versions?: InfPersistentItem[];
  entity_version_project_rels?: InfEntityProjectRel[];
  namespaces?: InfNamespace[];
  constructor(data?: ProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Project`.
   */
  public static getModelName() {
    return "Project";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Project for dynamic purposes.
  **/
  public static factory(data: ProjectInterface): Project{
    return new Project(data);
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
      name: 'Project',
      plural: 'Projects',
      path: 'Projects',
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
          type: 'Account[]',
          model: 'Account',
          relationType: 'hasMany',
          modelThrough: 'ProjectAccountAssociation',
          keyThrough: 'account_id',
          keyFrom: 'pk_project',
          keyTo: 'fk_project'
        },
        default_language: {
          name: 'default_language',
          type: 'Language',
          model: 'Language',
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
