/* tslint:disable */
import {
  PubAccount,
  ProTextProperty,
  InfLanguage,
  InfPersistentItem,
  ProInfoProjRel,
  DatNamespace
} from '../index';

declare var Object: any;
export interface ProProjectInterface {
  "pk_entity"?: number;
  "fk_language"?: number;
  accounts?: PubAccount[];
  text_properties?: ProTextProperty[];
  default_language?: InfLanguage;
  persistent_items?: InfPersistentItem[];
  entity_version_project_rels?: ProInfoProjRel[];
  namespaces?: DatNamespace[];
}

export class ProProject implements ProProjectInterface {
  "pk_entity": number;
  "fk_language": number;
  accounts?: PubAccount[];
  text_properties?: ProTextProperty[];
  default_language?: InfLanguage;
  persistent_items?: InfPersistentItem[];
  entity_version_project_rels?: ProInfoProjRel[];
  namespaces?: DatNamespace[];
  constructor(data?: ProProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProProject`.
   */
  public static getModelName() {
    return "ProProject";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProProject for dynamic purposes.
  **/
  public static factory(data: ProProjectInterface): ProProject{
    return new ProProject(data);
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
      name: 'ProProject',
      plural: 'ProProjects',
      path: 'ProProjects',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'number'
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
          keyFrom: 'pk_entity',
          keyTo: 'fk_project'
        },
        text_properties: {
          name: 'text_properties',
          type: 'ProTextProperty[]',
          model: 'ProTextProperty',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        default_language: {
          name: 'default_language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_entity'
        },
        persistent_items: {
          name: 'persistent_items',
          type: 'InfPersistentItem[]',
          model: 'InfPersistentItem',
          relationType: 'hasMany',
          modelThrough: 'ProInfoProjRel',
          keyThrough: 'fk_entity',
          keyFrom: 'pk_entity',
          keyTo: 'fk_project'
        },
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_project'
        },
        namespaces: {
          name: 'namespaces',
          type: 'DatNamespace[]',
          model: 'DatNamespace',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_project'
        },
      }
    }
  }
}
