/* tslint:disable */

declare var Object: any;
export interface WarEntityPreviewInterface {
  "pk_entity"?: number;
  "fk_project"?: number;
  "fk_class"?: number;
  "class_label"?: string;
  "entity_label"?: string;
  "entity_type"?: string;
  "type_label"?: string;
  "fk_type"?: number;
  "time_span"?: any;
}

export class WarEntityPreview implements WarEntityPreviewInterface {
  "pk_entity": number;
  "fk_project": number;
  "fk_class": number;
  "class_label": string;
  "entity_label": string;
  "entity_type": string;
  "type_label": string;
  "fk_type": number;
  "time_span": any;
  constructor(data?: WarEntityPreviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WarEntityPreview`.
   */
  public static getModelName() {
    return "WarEntityPreview";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WarEntityPreview for dynamic purposes.
  **/
  public static factory(data: WarEntityPreviewInterface): WarEntityPreview{
    return new WarEntityPreview(data);
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
      name: 'WarEntityPreview',
      plural: 'WarEntityPreviews',
      path: 'WarEntityPreviews',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
        "class_label": {
          name: 'class_label',
          type: 'string'
        },
        "entity_label": {
          name: 'entity_label',
          type: 'string'
        },
        "entity_type": {
          name: 'entity_type',
          type: 'string'
        },
        "type_label": {
          name: 'type_label',
          type: 'string'
        },
        "fk_type": {
          name: 'fk_type',
          type: 'number'
        },
        "time_span": {
          name: 'time_span',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
