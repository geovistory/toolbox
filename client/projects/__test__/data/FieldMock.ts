import { SysConfig } from '@kleiolab/lib-config';
import { Field, FieldBase, FieldTargetClass, SpecialFieldType } from '@kleiolab/lib-queries';
import { GvFieldTargetViewType, GvSubentitFieldPageReq, GvSubentityFieldTargetViewType, SysConfigFormCtrlType } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { DfhApiClass, DfhApiProperty } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';

function fieldToSubentityFieldReq(field: Field, isCircular: boolean): GvSubentitFieldPageReq {
  const targets: { [key: number]: GvSubentityFieldTargetViewType } = {}
  for (const key in field.targets) {
    if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
      const element = field.targets[key];
      if (element.viewType.nestedResource) {
        targets[key] = { entityPreview: 'true' }
      } else {
        targets[key] = element.viewType
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




export namespace FieldMock {



  export const presenceWasAtPlace: Field = createField(
    DfhApiClassMock.EN_84_PRESENCE,
    DfhApiPropertyMock.EN_148_WAS_AT,
    [{ class: DfhApiClassMock.EN_51_PLACE, viewType: { place: 'true' }, formControlType: { place: 'true' } }],
    true,
  )
  export const manifestationSingletonHasDefinition: Field = createField(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1762_HAS_DEFINITION,
    [{ class: DfhApiClassMock.EN_785_TEXT, viewType: { langString: 'true' }, formControlType: { langString: 'true' }, }],
    true,
  )

  export const manifestationSingletonHasShortTitle: Field = createField(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE,
    [{ class: DfhApiClassMock.EN_784_SHORT_TITLE, viewType: { langString: 'true' }, formControlType: { langString: 'true' } }],
    true,
  )

  export const accountOfJourneyHasDuration: Field = createField(
    DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY,
    DfhApiPropertyMock.EN_1613_HAS_DURATION,
    [{
      class: DfhApiClassMock.EN_689_DURATION, viewType: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
        }
      },
      formControlType: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
        }
      },
    }],
    true,
  )
  export const componentHasVolume: Field = createField(
    DfhApiClassMock.EN_723_COMPONENT,
    DfhApiPropertyMock.EN_1646_HAS_VOLUME,
    [{
      class: DfhApiClassMock.EN_716_VOLUME, viewType: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_715_VOLUME_MEASUREMENT_UNIT.dfh_pk_class
        }
      },
      formControlType: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_715_VOLUME_MEASUREMENT_UNIT.dfh_pk_class
        }
      },
    }],
    true,
  )
  export const appeHasAppeString: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1113_REFERS_TO_NAME,
    [{ class: DfhApiClassMock.EN_40_APPELLATION, viewType: { appellation: 'true' }, formControlType: { appellation: 'true' } }],
    true,
  )
  export const appeTeEnUsedInLanguage: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE,
    [{ class: DfhApiClassMock.EN_54_LANGUAGE, viewType: { language: 'true' }, formControlType: { language: 'true' } }],
    true,
  )
  export const appeTeEnIsAppeOfPerson: Field = createField(
    DfhApiClassMock.EN_365_NAMING,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    [{ class: DfhApiClassMock.EN_21_PERSON, viewType: { entityPreview: 'true' }, formControlType: { entity: 'true' } }],
    true,
  )
  // export const appeHasTimeSpan: Field = createField(
  //   DfhApiClassMock.EN_365_NAMING,
  //   DfhApiPropertyMock.EN_4_HAS_TIME_SPAN,
  //   [{ class: DfhApiClassMock.EN_50_TIME_SPAN, viewType: { timeSpan: 'true' }, formControlType: { timeSpan: 'true' } }],
  //   true,
  // )

  export const personHasAppeTeEn: Field = createField(
    DfhApiClassMock.EN_21_PERSON,
    DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON,
    [{
      class: DfhApiClassMock.EN_365_NAMING,
      viewType: {
        nestedResource: [
          fieldToSubentityFieldReq(appeHasAppeString, false),
          fieldToSubentityFieldReq(appeTeEnUsedInLanguage, false),
          fieldToSubentityFieldReq(appeTeEnIsAppeOfPerson, true),
          // fieldToSubentityFieldReq(appeHasTimeSpan, false),
        ]
      },
      formControlType: { appellationTeEn: 'true' }
    },
    ],
    false,
  )

  export const unionHasPartner: Field = createField(
    DfhApiClassMock.EN_633_UNION,
    DfhApiPropertyMock.EN_1436_HAS_PARTNER,
    [{ class: DfhApiClassMock.EN_21_PERSON, viewType: { entityPreview: 'true' }, formControlType: { entity: 'true' } }],
    true,
  )
  export const birthStemsFrom: Field = createField(
    DfhApiClassMock.EN_61_BIRTH,
    DfhApiPropertyMock.EN_1435_STEMS_FROM,
    [{ class: DfhApiClassMock.EN_633_UNION, viewType: { nestedResource: [] }, formControlType: { entity: 'true' } }],
    true,
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
    isTimeSpanShortCutField: false
  }
  return base
}


function createField(
  source: DfhApiClass,
  property: DfhApiProperty,
  targets: {
    class: DfhApiClass,
    viewType: GvFieldTargetViewType,
    formControlType: SysConfigFormCtrlType
  }[],
  isOutgoing: boolean,
  isSpecialField: SpecialFieldType = false
): Field {

  const ts: { [fkClass: number]: FieldTargetClass } = {}
  for (const t of targets) {
    ts[t.class.dfh_pk_class] = {
      viewType: t.viewType,
      formControlType: t.formControlType,
      removedFromAllProfiles: false,
      targetClass: t.class.dfh_pk_class,
      targetClassLabel: t.class.dfh_class_label
    }
  }

  const base = createFieldBase(source, property, isOutgoing)
  const field: Field = {
    ...base,
    display: {
      formSections: { specific: { position: 1 } },
      viewSections: { specific: { position: 1 } },
    },
    targetClasses: targets.map(t => t.class.dfh_pk_class),
    allSubfieldsRemovedFromAllProfiles: false,
    isSpecialField,
    targets: ts
  }
  return field
}
