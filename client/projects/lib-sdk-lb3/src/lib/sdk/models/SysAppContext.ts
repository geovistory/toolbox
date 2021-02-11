/* tslint:disable */

declare var Object: any;
export interface SysAppContextInterface {
  "pk_entity"?: number;
  "description"?: string;
  "label"?: string;
}

export class SysAppContext implements SysAppContextInterface {
  "pk_entity": number;
  "description": string;
  "label": string;
  constructor(data?: SysAppContextInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysAppContext`.
   */
  public static getModelName() {
    return "SysAppContext";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysAppContext for dynamic purposes.
  **/
  public static factory(data: SysAppContextInterface): SysAppContext{
    return new SysAppContext(data);
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
      name: 'SysAppContext',
      plural: 'SysAppContexts',
      path: 'SysAppContexts',
      idName: 'pk_entity',
      properties: {
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
