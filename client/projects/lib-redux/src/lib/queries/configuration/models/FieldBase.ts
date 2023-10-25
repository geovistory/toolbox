import { GvFieldProperty } from '@kleiolab/lib-sdk-lb4';
export interface FieldBase {
  // the label of the field (taken from the corresponding property label)
  label: string;
  // url to property on ontome
  ontoInfoUrl: string;
  // short label (= ontome identifier in namespace)
  ontoInfoLabel: string;
  // reference to the dfh_property or dfh_property_of_property
  property: GvFieldProperty;
  // true if the property of that field has dfh_has_type_subproperty
  isHasTypeField: boolean;
  // true if the property has to be replaced by the 6 time-span properties
  isTimeSpanShortCutField: boolean;
  // direction of the property in this field (true if sourceClass = property domain)
  isOutgoing: boolean;
  // the source class of the field (if is outgoing domain else range)
  sourceClass: number;
  // label of the source class
  sourceClassLabel: string;
  // minimum number of statements having the property of this field and the same entity as source
  // (and thus different targets)
  targetMinQuantity: number;
  // maximum number of statements having the property of this field and the same entity as source
  // (and thus different targets). Value -1 stands for n (infinit)
  targetMaxQuantity: number;
  // minimum number of statements having the property of this field and the same entity as target
  // (and thus different sources)
  sourceMinQuantity: number;
  // maximum number of statements having the property of this field and the same entity as target
  // (and thus different sources). Value -1 stands for n (infinit)
  sourceMaxQuantity: number;
  // if true, the identity of the source entity is defined by the statement(s) of this field
  identityDefiningForSource: boolean;
  // if true, the identity of the target entity is defined by the statement(s) of this field
  identityDefiningForTarget: boolean;
}
