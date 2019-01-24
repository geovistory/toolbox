/* tslint:disable */
import {
  ComLanguage,
  ComProject
} from '../index';

declare var Object: any;
export interface ComLabelInterface {
  "label": string;
  "fk_system_type": number;
  "fk_language": string;
  "pk_entity"?: number;
  "entity_version"?: number;
  "notes"?: string;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  "sys_period"?: string;
  "fk_entity"?: number;
  language?: ComLanguage;
  project?: ComProject;
}

export class ComLabel implements ComLabelInterface {
  "label": string;
  "fk_system_type": number;
  "fk_language": string;
  "pk_entity": number;
  "entity_version": number;
  "notes": string;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  "sys_period": string;
  "fk_entity": number;
  language?: ComLanguage;
  project?: ComProject;
  constructor(data?: ComLabelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComLabel`.
   */
  public static getModelName() {
    return "ComLabel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComLabel for dynamic purposes.
  **/
  public static factory(data: ComLabelInterface): ComLabel{
    return new ComLabel(data);
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
      name: 'ComLabel',
      plural: 'ComLabels',
      path: 'ComLabels',
      idName: 'pk_entity',
      properties: {
        "label": {
          name: 'label',
          type: 'string'
        },
        "fk_system_type": {
          name: 'fk_system_type',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "tmsp_creation": {
          name: 'tmsp_creation',
          type: 'string'
        },
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
        "sys_period": {
          name: 'sys_period',
          type: 'string'
        },
        "fk_entity": {
          name: 'fk_entity',
          type: 'number'
        },
      },
      relations: {
        language: {
          name: 'language',
          type: 'ComLanguage',
          model: 'ComLanguage',
          relationType: 'belongsTo',
                  keyFrom: 'fk_language',
          keyTo: 'pk_language'
        },
        project: {
          name: 'project',
          type: 'ComProject',
          model: 'ComProject',
          relationType: 'belongsTo',
                  keyFrom: 'fk_entity',
          keyTo: 'pk_entity'
        },
      }
    }
  }
}
