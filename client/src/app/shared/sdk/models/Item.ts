/* tslint:disable */

declare var Object: any;
export interface ItemInterface {
  "name"?: string;
  "number": number;
  "id"?: number;
}

export class Item implements ItemInterface {
  "name": string;
  "number": number;
  "id": number;
  constructor(data?: ItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Item`.
   */
  public static getModelName() {
    return "Item";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Item for dynamic purposes.
  **/
  public static factory(data: ItemInterface): Item{
    return new Item(data);
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
      name: 'Item',
      plural: 'Items',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "number": {
          name: 'number',
          type: 'number',
          default: 99
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
