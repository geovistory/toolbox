import { FieldBase, Subfield } from '@kleiolab/lib-queries';
import { GvLoadSubentitySubfieldPageReq, GvSubfieldType } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/DfhApiPropertyMock';
import { DfhApiClass, DfhApiProperty } from 'projects/__test__/data/auto-gen/local-model.helpers';

function subfieldToSubentitySubfieldReq(subfield: Subfield, isCircular: boolean): GvLoadSubentitySubfieldPageReq {
  return {
    subfieldType: subfield.listType,
    page: {
      fkProperty: subfield.property.pkProperty,
      targetClass: subfield.targetClass,
      isOutgoing: subfield.isOutgoing,
      isCircular,
      limit: 1,
      offset: 0,
    }
  }
}




export namespace SubfieldMock {



  export const presenceWasAtPlace: Subfield = createSubfield(
    DfhApiClassMock.EN_84_PRESENCE,
    DfhApiPropertyMock.EN_148_WAS_AT,
    DfhApiClassMock.EN_51_PLACE,
    true,
    { place: 'true' }
  )
  export const manifestationSingletonHasDefinition: Subfield = createSubfield(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1762_HAS_DEFINITION,
    DfhApiClassMock.EN_785_TEXT,
    true,
    { langString: 'true' }
  )

  export const manifestationSingletonHasShortTitle: Subfield = createSubfield(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE,
    DfhApiClassMock.EN_784_SHORT_TITLE,
    true,
    { langString: 'true' }
  )

  export const accountOfJourneyHasDuration: Subfield = createSubfield(
    DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY,
    DfhApiPropertyMock.EN_1613_HAS_DURATION,
    DfhApiClassMock.EN_689_DURATION,
    true,
    {
      dimension: {
        measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
      }
    }
  )
  export const appeHasAppeString: Subfield = createSubfield(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1113_REFERS_TO_NAME,
    DfhApiClassMock.EN_40_APPELLATION,
    true,
    { appellation: 'true' }
  )
  export const appeTeEnUsedInLanguage: Subfield = createSubfield(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE,
    DfhApiClassMock.EN_54_LANGUAGE,
    true,
    { language: 'true' }
  )
  export const appeTeEnIsAppeOfPerson: Subfield = createSubfield(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    DfhApiClassMock.EN_21_PERSON,
    true,
    { entityPreview: 'true' }
  )
  export const appeHasTimeSpan: Subfield = createSubfield(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_4_HAS_TIME_SPAN,
    DfhApiClassMock.EN_50_TIME_SPAN,
    true,
    { timeSpan: 'true' }
  )

  export const personHasAppeTeEn: Subfield = createSubfield(
    DfhApiClassMock.EN_21_PERSON,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    DfhApiClassMock.EN_365_NAMING,
    false,
    {
      temporalEntity: [
        subfieldToSubentitySubfieldReq(appeHasAppeString, false),
        subfieldToSubentitySubfieldReq(appeTeEnUsedInLanguage, false),
        subfieldToSubentitySubfieldReq(appeTeEnIsAppeOfPerson, true),
        subfieldToSubentitySubfieldReq(appeHasTimeSpan, false),
      ]
    }
  )
}

export function createFieldBase(
  source: DfhApiClass,
  property: DfhApiProperty,
  isOutgoing: boolean,
): FieldBase {

  let label: string
  let targetMinQuantity: number
  let targetMaxQuantity: number
  let sourceMinQuantity: number
  let sourceMaxQuantity: number
  let identityDefiningForSource: boolean
  let identityDefiningForTarget: boolean
  let isHasTypeField: boolean
  if (isOutgoing) {
    label = property.dfh_property_label
    sourceMinQuantity = property.dfh_domain_instances_min_quantifier
    sourceMaxQuantity = property.dfh_domain_instances_max_quantifier
    targetMinQuantity = property.dfh_range_instances_min_quantifier
    targetMaxQuantity = property.dfh_range_instances_max_quantifier
    identityDefiningForSource = property.dfh_identity_defining
    identityDefiningForTarget = false
    isHasTypeField = property.dfh_is_has_type_subproperty
  } else {
    label = 'reverseOf: ' + property.dfh_property_label
    sourceMinQuantity = property.dfh_range_instances_min_quantifier
    sourceMaxQuantity = property.dfh_range_instances_max_quantifier
    targetMinQuantity = property.dfh_domain_instances_min_quantifier
    targetMaxQuantity = property.dfh_domain_instances_max_quantifier
    identityDefiningForSource = false
    identityDefiningForTarget = property.dfh_identity_defining
    isHasTypeField = false
  }

  const base: FieldBase = {
    label,
    ontoInfoUrl: 'https://ontome.dataforhistory.org/property/' + property.dfh_pk_property,
    ontoInfoLabel: property.dfh_property_identifier_in_namespace,
    property: { pkProperty: property.dfh_pk_property },
    isHasTypeField,
    isOutgoing,
    sourceClass: source.dfh_pk_class,
    sourceClassLabel: source.dfh_class_label,
    targetMinQuantity,
    targetMaxQuantity,
    sourceMinQuantity,
    sourceMaxQuantity,
    identityDefiningForSource,
    identityDefiningForTarget,
  }
  return base
}
export function createSubfield(
  source: DfhApiClass,
  property: DfhApiProperty,
  target: DfhApiClass,
  isOutgoing: boolean,
  subfieldType: GvSubfieldType
): Subfield {

  const base = createFieldBase(source, property, isOutgoing)

  return {
    ...base,
    listType: subfieldType,
    targetClass: target.dfh_pk_class,
    targetClassLabel: target.dfh_class_label,
    removedFromAllProfiles: false,
  }
}

