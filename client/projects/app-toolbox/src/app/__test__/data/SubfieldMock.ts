import { Subfield, SubfieldType } from '@kleiolab/lib-queries';
import { DfhApiClassMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/DfhApiPropertyMock';
import { DfhApiClass, DfhApiProperty } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/local-model.helpers';





export const subfieldAppeHasAppeString: Subfield = createSubfield(
  DfhApiClassMock.EN_365_NAMING,
  DfhApiPropertyMock.EN_1113_REFERS_TO_NAME,
  DfhApiClassMock.EN_40_APPELLATION,
  true,
  { appellation: 'true' }
)


export const subfieldPresenceWasAtPlace: Subfield = createSubfield(
  DfhApiClassMock.EN_84_PRESENCE,
  DfhApiPropertyMock.EN_148_WAS_AT,
  DfhApiClassMock.EN_51_PLACE,
  true,
  { place: 'true' }
)

function createSubfield(
  domain: DfhApiClass,
  property: DfhApiProperty,
  range: DfhApiClass,
  isOutgoing: boolean,
  subfieldType: SubfieldType
): Subfield {

  let source: DfhApiClass
  let target: DfhApiClass
  let label: string
  let targetMinQuantity: number
  let targetMaxQuantity: number
  let sourceMinQuantity: number
  let sourceMaxQuantity: number
  let identityDefiningForSource: boolean
  let identityDefiningForTarget: boolean
  let isHasTypeField: boolean
  if (isOutgoing) {
    source = domain
    target = range
    label = property.dfh_property_label
    sourceMinQuantity = property.dfh_domain_instances_min_quantifier
    sourceMaxQuantity = property.dfh_domain_instances_max_quantifier
    targetMinQuantity = property.dfh_range_instances_min_quantifier
    targetMaxQuantity = property.dfh_range_instances_max_quantifier
    identityDefiningForSource = property.dfh_identity_defining
    identityDefiningForTarget = false
    isHasTypeField = property.dfh_is_has_type_subproperty
  } else {
    source = range
    target = domain
    label = 'reverseOf: ' + property.dfh_property_label
    sourceMinQuantity = property.dfh_range_instances_min_quantifier
    sourceMaxQuantity = property.dfh_range_instances_max_quantifier
    targetMinQuantity = property.dfh_domain_instances_min_quantifier
    targetMaxQuantity = property.dfh_domain_instances_max_quantifier
    identityDefiningForSource = false
    identityDefiningForTarget = property.dfh_identity_defining
    isHasTypeField = false
  }

  return {
    listType: subfieldType,
    targetClass: target.dfh_pk_class,
    targetClassLabel: target.dfh_class_label,
    removedFromAllProfiles: false,
    label,
    ontoInfoUrl: 'string',
    ontoInfoLabel: property.dfh_property_identifier_in_namespace,
    property: { pkProperty: property.dfh_pk_property },
    isHasTypeField,
    isOutgoing: true,
    sourceClass: source.dfh_pk_class,
    sourceClassLabel: source.dfh_class_label,
    targetMinQuantity,
    targetMaxQuantity,
    sourceMinQuantity,
    sourceMaxQuantity,
    identityDefiningForSource,
    identityDefiningForTarget,
  }

}
