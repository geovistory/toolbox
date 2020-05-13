/* tslint:disable */

declare var Object: any;
export interface PaginationObjectInterface {
  "count"?: number;
  "schemas"?: any;
  "paginatedStatements"?: Array<any>;
}

export class PaginationObject implements PaginationObjectInterface {
  "count": number;
  "schemas": any;
  "paginatedStatements": Array<any>;
  constructor(data?: PaginationObjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PaginationObject`.
   */
  public static getModelName() {
    return "PaginationObject";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PaginationObject for dynamic purposes.
  **/
  public static factory(data: PaginationObjectInterface): PaginationObject{
    return new PaginationObject(data);
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
      name: 'PaginationObject',
      plural: 'PaginationObjects',
      path: 'PaginationObjects',
      idName: 'count',
      properties: {
        "count": {
          name: 'count',
          type: 'number'
        },
        "schemas": {
          name: 'schemas',
          type: 'any'
        },
        "paginatedStatements": {
          name: 'paginatedStatements',
          type: 'Array&lt;any&gt;'
        },
      },
      relations: {
      }
    }
  }
}
