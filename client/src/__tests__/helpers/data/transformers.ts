import { DfhApiClass, DfhApiProperty } from './auto-gen/local-model.helpers';
import { DfhClass, DfhProperty, DfhLabel } from 'app/core/sdk-lb4';

/**
 * converts a DfhApiClass (database format)
 * to a DfhClass (redux store format)
 */
export function transformDfhApiClassToDfhClass(dfhApiClass: DfhApiClass): DfhClass {
  return {
    pk_class: dfhApiClass.dfh_pk_class,
    identifier_in_namespace: dfhApiClass.dfh_class_identifier_in_namespace,
    basic_type: dfhApiClass.dfh_basic_type,
    profiles: [{
      fk_profile: dfhApiClass.dfh_fk_profile,
      removed_from_api: false
    }],
  }
}

/**
 * converts a DfhApiProperty (database format)
 * to a DfhProperty (redux store format)
 */
export function transformDfhApiPropertyToDfhProperty(dfhApiProperty: DfhApiProperty): DfhProperty {
  return {
    pk_property: dfhApiProperty.dfh_pk_property,
    is_inherited: dfhApiProperty.dfh_is_inherited,
    has_domain: dfhApiProperty.dfh_property_domain,
    domain_instances_min_quantifier: dfhApiProperty.dfh_domain_instances_min_quantifier,
    domain_instances_max_quantifier: dfhApiProperty.dfh_domain_instances_max_quantifier,
    has_range: dfhApiProperty.dfh_property_range,
    range_instances_min_quantifier: dfhApiProperty.dfh_range_instances_min_quantifier,
    range_instances_max_quantifier: dfhApiProperty.dfh_range_instances_max_quantifier,
    identity_defining: dfhApiProperty.dfh_identity_defining,
    is_has_type_subproperty: dfhApiProperty.dfh_is_has_type_subproperty,
    identifier_in_namespace: dfhApiProperty.dfh_property_identifier_in_namespace,
    profiles: [{
      fk_profile: dfhApiProperty.dfh_fk_profile,
      removed_from_api: false
    }],
  }
}

/**
* converts a DfhApiClass (database format)
* to a DfhLabel (redux store format)
*/
export function transformDfhApiClassToDfhLabel(dfhApiClass: DfhApiClass): DfhLabel {
  return {
    fk_class: dfhApiClass.dfh_pk_class,
    label: dfhApiClass.dfh_class_label,
    language: dfhApiClass.dfh_class_label_language,
    type: 'label'
  }
}

/**
* converts a DfhApiProperty (database format)
* to a DfhLabel (redux store format)
*/
export function transformDfhApiPropertyToDfhLabel(dfhApiProperty: DfhApiProperty): DfhLabel {
  return {
    fk_property: dfhApiProperty.dfh_pk_property,
    label: dfhApiProperty.dfh_property_label,
    language: dfhApiProperty.dfh_property_label_language,
    type: 'label'
  }
}
