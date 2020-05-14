/* tslint:disable */

declare var Object: any;
export interface SysAnalysisTypeInterface {
  "standard_label"?: string;
  "rows_limit": number;
  "pk_entity"?: number;
  "entity_version"?: number;
  "tmsp_creation"?: string;
  "tmsp_last_modification"?: string;
}

export class SysAnalysisType implements SysAnalysisTypeInterface {
  "standard_label": string;
  "rows_limit": number;
  "pk_entity": number;
  "entity_version": number;
  "tmsp_creation": string;
  "tmsp_last_modification": string;
  constructor(data?: SysAnalysisTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SysAnalysisType`.
   */
  public static getModelName() {
    return "SysAnalysisType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SysAnalysisType for dynamic purposes.
  **/
  public static factory(data: SysAnalysisTypeInterface): SysAnalysisType{
    return new SysAnalysisType(data);
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
      name: 'SysAnalysisType',
      plural: 'SysAnalysisTypes',
      path: 'SysAnalysisTypes',
      idName: 'pk_entity',
      properties: {
        "standard_label": {
          name: 'standard_label',
          type: 'string'
        },
        "rows_limit": {
          name: 'rows_limit',
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
      }
    }
  }
}
