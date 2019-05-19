/* tslint:disable */

declare var Object: any;
export interface SysSystemTypeInterface {
  "notes"?: string;
  "pk_entity"?: number;
}

export class SysSystemType implements SysSystemTypeInterface {
  "notes": string;
  "pk_entity": number;
  constructor(data?: SysSystemTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysSystemType`.
   */
  public static getModelName() {
    return "SysSystemType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysSystemType for dynamic purposes.
  **/
  public static factory(data: SysSystemTypeInterface): SysSystemType{
    return new SysSystemType(data);
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
      name: 'SysSystemType',
      plural: 'SysSystemTypes',
      path: 'SysSystemTypes',
      idName: 'pk_entity',
      properties: {
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
