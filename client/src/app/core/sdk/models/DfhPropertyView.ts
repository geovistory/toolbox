/* tslint:disable */

declare var Object: any;
export interface DfhPropertyViewInterface {
  "is_inherited"?: boolean;
  "dfh_has_domain": number;
  "fk_property"?: number;
  "dfh_has_range": number;
  "pk_entity"?: number;
  "dfh_pk_property"?: number;
  "dfh_identifier_in_namespace"?: string;
  "dfh_standard_label"?: string;
  "dfh_fk_property_of_origin"?: number;
  "dfh_domain_instances_min_quantifier"?: number;
  "dfh_domain_instances_max_quantifier"?: number;
  "dfh_range_instances_min_quantifier"?: number;
  "dfh_range_instances_max_quantifier"?: number;
  "identity_defining"?: boolean;
}

export class DfhPropertyView implements DfhPropertyViewInterface {
  "is_inherited": boolean;
  "dfh_has_domain": number;
  "fk_property": number;
  "dfh_has_range": number;
  "pk_entity": number;
  "dfh_pk_property": number;
  "dfh_identifier_in_namespace": string;
  "dfh_standard_label": string;
  "dfh_fk_property_of_origin": number;
  "dfh_domain_instances_min_quantifier": number;
  "dfh_domain_instances_max_quantifier": number;
  "dfh_range_instances_min_quantifier": number;
  "dfh_range_instances_max_quantifier": number;
  "identity_defining": boolean;
  constructor(data?: DfhPropertyViewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhPropertyView`.
   */
  public static getModelName() {
    return "DfhPropertyView";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhPropertyView for dynamic purposes.
  **/
  public static factory(data: DfhPropertyViewInterface): DfhPropertyView{
    return new DfhPropertyView(data);
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
      name: 'DfhPropertyView',
      plural: 'DfhPropertyViews',
      path: 'DfhPropertyViews',
      idName: 'pk_entity',
      properties: {
        "is_inherited": {
          name: 'is_inherited',
          type: 'boolean'
        },
        "dfh_has_domain": {
          name: 'dfh_has_domain',
          type: 'number'
        },
        "fk_property": {
          name: 'fk_property',
          type: 'number'
        },
        "dfh_has_range": {
          name: 'dfh_has_range',
          type: 'number'
        },
        "pk_entity": {
          name: 'pk_entity',
          type: 'number'
        },
        "dfh_pk_property": {
          name: 'dfh_pk_property',
          type: 'number'
        },
        "dfh_identifier_in_namespace": {
          name: 'dfh_identifier_in_namespace',
          type: 'string'
        },
        "dfh_standard_label": {
          name: 'dfh_standard_label',
          type: 'string'
        },
        "dfh_fk_property_of_origin": {
          name: 'dfh_fk_property_of_origin',
          type: 'number'
        },
        "dfh_domain_instances_min_quantifier": {
          name: 'dfh_domain_instances_min_quantifier',
          type: 'number'
        },
        "dfh_domain_instances_max_quantifier": {
          name: 'dfh_domain_instances_max_quantifier',
          type: 'number'
        },
        "dfh_range_instances_min_quantifier": {
          name: 'dfh_range_instances_min_quantifier',
          type: 'number'
        },
        "dfh_range_instances_max_quantifier": {
          name: 'dfh_range_instances_max_quantifier',
          type: 'number'
        },
        "identity_defining": {
          name: 'identity_defining',
          type: 'boolean'
        },
      },
      relations: {
      }
    }
  }
}
