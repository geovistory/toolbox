import { SysConfig } from '@kleiolab/lib-config/public-api';
import { Field, FieldBase, FieldTargetClass, SpecialFieldType } from '@kleiolab/lib-queries';
import { GvSubentitFieldPageReq, GvSubentityTargetType, GvTargetType } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { DfhApiClass, DfhApiProperty } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';

function fieldToSubentityFieldReq(field: Field, isCircular: boolean): GvSubentitFieldPageReq {
  const targets: { [key: number]: GvSubentityTargetType } = {}
  for (const key in field.targets) {
    if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
      const element = field.targets[key];
      if (element.listType.temporalEntity) {
        targets[key] = { entityPreview: 'true' }
      } else {
        targets[key] = element.listType
      }
    }
  }
  return {
    targets,
    page: {
      property: field.property,
      isOutgoing: field.isOutgoing,
      isCircular,
      limit: 1,
      offset: 0,
    }
  }
}




export namespace SubfieldMock {



  export const presenceWasAtPlace: Field = createField(
    DfhApiClassMock.EN_84_PRESENCE,
    DfhApiPropertyMock.EN_148_WAS_AT,
    [{ class: DfhApiClassMock.EN_51_PLACE, subfieldType: { place: 'true' } }],
    true,
  )
  export const manifestationSingletonHasDefinition: Field = createField(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1762_HAS_DEFINITION,
    [{ class: DfhApiClassMock.EN_785_TEXT, subfieldType: { langString: 'true' } }],
    true,
  )

  export const manifestationSingletonHasShortTitle: Field = createField(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE,
    [{ class: DfhApiClassMock.EN_784_SHORT_TITLE, subfieldType: { langString: 'true' } }],
    true,
  )

  export const accountOfJourneyHasDuration: Field = createField(
    DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY,
    DfhApiPropertyMock.EN_1613_HAS_DURATION,
    [{
      class: DfhApiClassMock.EN_689_DURATION, subfieldType: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
        }
      }
    }],
    true,
  )
  export const appeHasAppeString: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1113_REFERS_TO_NAME,
    [{ class: DfhApiClassMock.EN_40_APPELLATION, subfieldType: { appellation: 'true' } }],
    true,
  )
  export const appeTeEnUsedInLanguage: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE,
    [{ class: DfhApiClassMock.EN_54_LANGUAGE, subfieldType: { language: 'true' } }],
    true,
  )
  export const appeTeEnIsAppeOfPerson: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    [{ class: DfhApiClassMock.EN_21_PERSON, subfieldType: { entityPreview: 'true' } }],
    true,
  )
  export const appeHasTimeSpan: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_4_HAS_TIME_SPAN,
    [{ class: DfhApiClassMock.EN_50_TIME_SPAN, subfieldType: { timeSpan: 'true' } }],
    true,
  )

  export const personHasAppeTeEn: Field = createField(
    DfhApiClassMock.EN_21_PERSON,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    [{
      class: DfhApiClassMock.EN_365_NAMING,
      subfieldType: {
        temporalEntity: [
          fieldToSubentityFieldReq(appeHasAppeString, false),
          fieldToSubentityFieldReq(appeTeEnUsedInLanguage, false),
          fieldToSubentityFieldReq(appeTeEnIsAppeOfPerson, true),
          fieldToSubentityFieldReq(appeHasTimeSpan, false),
        ]
      }
    }],
    false,

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
    ontoInfoUrl: SysConfig.ONTOME_URL + '/property/' + property.dfh_pk_property,
    ontoInfoLabel: property.dfh_property_identifier_in_namespace,
    property: { fkProperty: property.dfh_pk_property },
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
// export function createField(
//   source: DfhApiClass,
//   property: DfhApiProperty,
//   target: DfhApiClass,
//   isOutgoing: boolean,
//   subfieldType: GvTargetType
// ): Field {

//   const base = createFieldBase(source, property, isOutgoing)

//   return {
//     ...base,
//     listType: subfieldType,
//     targetClass: target.dfh_pk_class,
//     targetClassLabel: target.dfh_class_label,
//     removedFromAllProfiles: false,
//   }
// }


function createField(
  source: DfhApiClass,
  property: DfhApiProperty,
  targets: {
    class: DfhApiClass,
    subfieldType: GvTargetType
  }[],
  isOutgoing: boolean,
  isSpecialField: SpecialFieldType = false
): Field {

  const ts: { [fkClass: number]: FieldTargetClass } = {}
  for (const t of targets) {
    ts[t.class.dfh_pk_class] = {
      listType: t.subfieldType,
      removedFromAllProfiles: false,
      targetClass: t.class.dfh_pk_class,
      targetClassLabel: t.class.dfh_class_label
    }
  }

  const base = createFieldBase(source, property, isOutgoing)
  const field: Field = {
    ...base,
    placeOfDisplay: {
      specificFields: {
        position: 1
      }
    },
    targetClasses: targets.map(t => t.class.dfh_pk_class),
    allSubfieldsRemovedFromAllProfiles: false,
    isSpecialField,
    targets: ts
  }
  return field
}
