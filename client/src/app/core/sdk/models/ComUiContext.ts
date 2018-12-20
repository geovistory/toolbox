/* tslint:disable */
import {
  ComUiContextConfig
} from '../index';

declare var Object: any;
export interface ComUiContextInterface {
  "pk_entity"?: number;
  "description"?: string;
  "label"?: string;
  ui_context_config?: ComUiContextConfig[];
}

export class ComUiContext implements ComUiContextInterface {
  "pk_entity": number;
  "description": string;
  "label": string;
  ui_context_config?: ComUiContextConfig[];
  constructor(data?: ComUiContextInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ComUiContext`.
   */
  public static getModelName() {
    return "ComUiContext";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ComUiContext for dynamic purposes.
  **/
  public static factory(data: ComUiContextInterface): ComUiContext{
    return new ComUiContext(data);
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
      name: 'ComUiContext',
      plural: 'ComUiContexts',
      path: 'ComUiContexts',
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
        ui_context_config: {
          name: 'ui_context_config',
          type: 'ComUiContextConfig[]',
          model: 'ComUiContextConfig',
          relationType: 'hasMany',
                  keyFrom: 'pk_entity',
          keyTo: 'fk_ui_context'
        },
      }
    }
  }
}
