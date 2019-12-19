/* tslint:disable */

declare var Object: any;
export interface DfhPropertyInterface {
  "pk_property": number;
  "is_inherited"?: boolean;
  "has_domain": number;
  "domain_instances_min_quantifier"?: number;
  "domain_instances_max_quantifier"?: number;
  "has_range": number;
  "range_instances_min_quantifier"?: number;
  "range_instances_max_quantifier"?: number;
  "identity_defining"?: boolean;
  "is_has_type_subproperty"?: boolean;
  "identifier_in_namespace"?: string;
  "profiles"?: Array<any>;
}

export class DfhProperty implements DfhPropertyInterface {
  "pk_property": number;
  "is_inherited": boolean;
  "has_domain": number;
  "domain_instances_min_quantifier": number;
  "domain_instances_max_quantifier": number;
  "has_range": number;
  "range_instances_min_quantifier": number;
  "range_instances_max_quantifier": number;
  "identity_defining": boolean;
  "is_has_type_subproperty": boolean;
  "identifier_in_namespace": string;
  "profiles": Array<any>;
  constructor(data?: DfhPropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DfhProperty`.
   */
  public static getModelName() {
    return "DfhProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DfhProperty for dynamic purposes.
  **/
  public static factory(data: DfhPropertyInterface): DfhProperty{
    return new DfhProperty(data);
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
      name: 'DfhProperty',
      plural: 'DfhProperties',
      path: 'DfhProperties',
      idName: 'pk_property',
      properties: {
        "pk_property": {
          name: 'pk_property',
          type: 'number'
        },
        "is_inherited": {
          name: 'is_inherited',
          type: 'boolean'
        },
        "has_domain": {
          name: 'has_domain',
          type: 'number'
        },
        "domain_instances_min_quantifier": {
          name: 'domain_instances_min_quantifier',
          type: 'number'
        },
        "domain_instances_max_quantifier": {
          name: 'domain_instances_max_quantifier',
          type: 'number'
        },
        "has_range": {
          name: 'has_range',
          type: 'number'
        },
        "range_instances_min_quantifier": {
          name: 'range_instances_min_quantifier',
          type: 'number'
        },
        "range_instances_max_quantifier": {
          name: 'range_instances_max_quantifier',
          type: 'number'
        },
        "identity_defining": {
          name: 'identity_defining',
          type: 'boolean'
        },
        "is_has_type_subproperty": {
          name: 'is_has_type_subproperty',
          type: 'boolean'
        },
        "identifier_in_namespace": {
          name: 'identifier_in_namespace',
          type: 'string'
        },
        "profiles": {
          name: 'profiles',
          type: 'Array&lt;any&gt;'
        },
      },
      relations: {
      }
    }
  }
}
