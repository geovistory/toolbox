/* tslint:disable */
import {
  ProInfoProjRel,
  InfStatement,
  InfLanguage
} from '../index';

declare var Object: any;
export interface InfLangStringInterface {
  "fk_class": number;
  "fk_language": number;
  "quill_doc"?: any;
  "string"?: string;
  "pk_entity"?: number;
  entity_version_project_rels?: ProInfoProjRel[];
  incoming_statements?: InfStatement[];
  language?: InfLanguage;
}

export class InfLangString implements InfLangStringInterface {
  "fk_class": number;
  "fk_language": number;
  "quill_doc": any;
  "string": string;
  "pk_entity": number;
  entity_version_project_rels?: ProInfoProjRel[];
  incoming_statements?: InfStatement[];
  language?: InfLanguage;
  constructor(data?: InfLangStringInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `InfLangString`.
   */
  public static getModelName() {
    return "InfLangString";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of InfLangString for dynamic purposes.
  **/
  public static factory(data: InfLangStringInterface): InfLangString {
    return new InfLangString(data);
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
      name: 'InfLangString',
      plural: 'InfLangStrings',
      path: 'InfLangStrings',
      idName: 'pk_entity',
      properties: {
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'number'
        },
        "quill_doc": {
          name: 'quill_doc',
          type: 'any'
        },
        "string": {
          name: 'string',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
      },
      relations: {
        entity_version_project_rels: {
          name: 'entity_version_project_rels',
          type: 'ProInfoProjRel[]',
          model: 'ProInfoProjRel',
          relationType: 'hasMany',
          keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        is_object_of_roles: {
          name: 'is_object_of_roles',
          type: 'InfRole[]',
          model: 'InfRole',
          relationType: 'hasMany',
          keyFrom: 'pk_entity',
          keyTo: 'fk_entity'
        },
        language: {
          name: 'language',
          type: 'InfLanguage',
          model: 'InfLanguage',
          relationType: 'belongsTo',
          keyFrom: 'fk_language',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
