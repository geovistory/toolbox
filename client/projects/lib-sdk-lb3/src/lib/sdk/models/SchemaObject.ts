/* tslint:disable */

declare var Object: any;
export interface SchemaObjectInterface {
  "inf"?: any;
  "pro"?: any;
  "dat"?: any;
  "sys"?: any;
  "dfh"?: any;
}

export class SchemaObject implements SchemaObjectInterface {
  "inf": any;
  "pro": any;
  "dat": any;
  "sys": any;
  "dfh": any;
  constructor(data?: SchemaObjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SchemaObject`.
   */
  public static getModelName() {
    return "SchemaObject";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SchemaObject for dynamic purposes.
  **/
  public static factory(data: SchemaObjectInterface): SchemaObject{
    return new SchemaObject(data);
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
      name: 'SchemaObject',
      plural: 'SchemaObjects',
      path: 'SchemaObjects',
      idName: 'inf',
      properties: {
        "inf": {
          name: 'inf',
          type: 'any'
        },
        "pro": {
          name: 'pro',
          type: 'any'
        },
        "dat": {
          name: 'dat',
          type: 'any'
        },
        "sys": {
          name: 'sys',
          type: 'any'
        },
        "dfh": {
          name: 'dfh',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
