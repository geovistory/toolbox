/* tslint:disable */
import {
  InfLanguage
} from '../index';

declare var Object: any;
export interface ProPropertyLabelInterface {
  "label": string;
  "fk_project": number;
  "fk_language": number;
  "fk_system_type": number;
  "fk_property": number;
  "fk_domain_class"?: number;
  "fk_range_class"?: number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
  language?: InfLanguage;
}

export class ProPropertyLabel implements ProPropertyLabelInterface {
  "label": string;
  "fk_project": number;
  "fk_language": number;
  "fk_system_type": number;
  "fk_property": number;
  "fk_domain_class": number;
  "fk_range_class": number;
  "pk_entity": number;
  "entity_version": number;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  language?: InfLanguage;
  constructor(data?: ProPropertyLabelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProPropertyLabel`.
   */
  public static getModelName() {
    return "ProPropertyLabel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProPropertyLabel for dynamic purposes.
  **/
  public static factory(data: ProPropertyLabelInterface): ProPropertyLabel{
    return new ProPropertyLabel(data);
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
      name: 'ProPropertyLabel',
      plural: 'ProPropertyLabels',
      path: 'ProPropertyLabels',
      idName: 'pk_entity',
      properties: {
        "label": {
          name: 'label',
          type: 'string'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_language": {
          name: 'fk_language',
          type: 'number'
        },
        "fk_system_type": {
          name: 'fk_system_type',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "fk_domain_class": {
          name: 'fk_domain_class',
          type: 'number'
        },
        "fk_range_class": {
          name: 'fk_range_class',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "entity_version": {
          name: 'entity_version',
          type: 'number'
        },
        "tmsp_creation": {
          name: 'tmsp_creation',
          type: 'string'
        },
        "tmsp_last_modification": {
          name: 'tmsp_last_modification',
          type: 'string'
        },
      },
      relations: {
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
