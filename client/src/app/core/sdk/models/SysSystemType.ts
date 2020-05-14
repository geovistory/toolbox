/* tslint:disable */

declare var Object: any;
export interface SysSystemTypeInterface {
  "notes"?: string;
  "definition"?: string;
  "st_schema_name"?: string;
  "st_table_name"?: string;
  "st_column_name"?: string;
  "st_group"?: string;
  "pk_entity"?: number;
}

export class SysSystemType implements SysSystemTypeInterface {
  "notes": string;
  "definition": string;
  "st_schema_name": string;
  "st_table_name": string;
  "st_column_name": string;
  "st_group": string;
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
        "definition": {
          name: 'definition',
          type: 'string'
        },
        "st_schema_name": {
          name: 'st_schema_name',
          type: 'string'
        },
        "st_table_name": {
          name: 'st_table_name',
          type: 'string'
        },
        "st_column_name": {
          name: 'st_column_name',
          type: 'string'
        },
        "st_group": {
          name: 'st_group',
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
