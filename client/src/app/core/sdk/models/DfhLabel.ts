/* tslint:disable */

declare var Object: any;
export interface DfhLabelInterface {
  "type"?: string;
  "label"?: string;
  "language"?: string;
  "fk_profile"?: number;
  "fk_project"?: number;
  "fk_property"?: number;
  "fk_class"?: number;
}

export class DfhLabel implements DfhLabelInterface {
  "type": string;
  "label": string;
  "language": string;
  "fk_profile": number;
  "fk_project": number;
  "fk_property": number;
  "fk_class": number;
  constructor(data?: DfhLabelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhLabel`.
   */
  public static getModelName() {
    return "DfhLabel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhLabel for dynamic purposes.
  **/
  public static factory(data: DfhLabelInterface): DfhLabel{
    return new DfhLabel(data);
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
      name: 'DfhLabel',
      plural: 'DfhLabels',
      path: 'DfhLabels',
      idName: 'type',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
        "language": {
          name: 'language',
          type: 'string'
        },
        "fk_profile": {
          name: 'fk_profile',
          type: 'number'
        },
        "fk_project": {
          name: 'fk_project',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "fk_class": {
          name: 'fk_class',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
