import { DfhConfig } from '@kleiolab/lib-config';
import { DfhClass, DfhLabel, DfhProperty, GvPositiveSchemaObject, SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { concat, mergeDeepWith } from 'ramda';
import { Profiles } from '../queries/configuration/models/Profiles';
import { NewDfhApiClass, NewDfhApiProperty, OntomeProfileMock } from './data/auto-gen/gvDB/local-model.helpers';
import { DfhApiPropertyMock } from './data/auto-gen/gvDB/DfhApiPropertyMock';


/**
 * converts a DfhApiClass (database format)
 * to a DfhClass (redux store format)
 */
export function transformDfhApiClassToDfhClass(dfhApiClass: NewDfhApiClass): DfhClass {
  return {
    pk_class: dfhApiClass.dfh_pk_class,
    identifier_in_namespace: dfhApiClass.dfh_class_identifier_in_namespace,
    basic_type: dfhApiClass.dfh_basic_type,
    profiles: [{
      fk_profile: dfhApiClass.dfh_fk_profile,
      removed_from_api: false
    }],
    parent_classes: dfhApiClass.dfh_parent_classes,
    ancestor_classes: dfhApiClass.dfh_ancestor_classes,
  }
}

/**
 * converts a DfhApiProperty (database format)
 * to a DfhProperty (redux store format)
 */
export function transformDfhApiPropertyToDfhProperty(dfhApiProperty: NewDfhApiProperty): DfhProperty {
  return {
    pk_property: dfhApiProperty.dfh_pk_property,
    has_domain: dfhApiProperty.dfh_property_domain,
    domain_instances_min_quantifier: dfhApiProperty.dfh_domain_instances_min_quantifier,
    domain_instances_max_quantifier: dfhApiProperty.dfh_domain_instances_max_quantifier,
    has_range: dfhApiProperty.dfh_property_range,
    range_instances_min_quantifier: dfhApiProperty.dfh_range_instances_min_quantifier,
    range_instances_max_quantifier: dfhApiProperty.dfh_range_instances_max_quantifier,
    identifier_in_namespace: dfhApiProperty.dfh_property_identifier_in_namespace,
    profiles: [{
      fk_profile: dfhApiProperty.dfh_fk_profile,
      removed_from_api: false
    }],
    parent_properties: dfhApiProperty.dfh_parent_properties,
    ancestor_properties: dfhApiProperty.dfh_ancestor_properties
  }
}


/**
* converts a DfhApiClass (database format)
* to a DfhLabel (redux store format)
*/
export function transformDfhApiClassToDfhLabel(dfhApiClass: NewDfhApiClass): DfhLabel {
  return {
    fk_class: dfhApiClass.dfh_pk_class,
    label: dfhApiClass.dfh_class_label,
    language: dfhApiClass.dfh_class_label_language,
    type: 'label'
  }
}

/**
* converts a dfhApiProperty (database format)
* to a DfhLabel (redux store format)
*/
export function transformDfhApiPropertyToDfhLabel(dfhApiProperty: NewDfhApiProperty): DfhLabel {
  return {
    fk_property: dfhApiProperty.dfh_pk_property,
    label: dfhApiProperty.dfh_property_label,
    language: dfhApiProperty.dfh_property_label_language,
    type: 'label'
  }
}
export function transformDfhApiPropertyToDfhInverseLabel(dfhApiProperty: NewDfhApiProperty): DfhLabel {
  return {
    fk_property: dfhApiProperty.dfh_pk_property,
    label: dfhApiProperty.dfh_property_inverse_label,
    language: dfhApiProperty.dfh_property_label_language,
    type: 'inverse_label'
  }
}


export function transformDfhApiPropertyToDfhLabels(dfhApiProperty: NewDfhApiProperty): DfhLabel[] {
  return [
    transformDfhApiPropertyToDfhLabel(dfhApiProperty),
    transformDfhApiPropertyToDfhInverseLabel(dfhApiProperty),
  ]
}

export function createDefinitionProperty(domainClass: number): DfhProperty {
  return {
    ...transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_1762_HAS_DEFINITION),
    has_domain: domainClass
  }
}

export function createHasTimeSpanProperty(domainClass: number) {
  return {
    ...transformDfhApiPropertyToDfhProperty(DfhApiPropertyMock.EN_4_HAS_TIME_SPAN),
    has_domain: domainClass
  }
}


export function createAppellationProperty(rangeClass: number) {
  const profiles: Profiles = [
    {
      removed_from_api: false,
      fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
    }
  ]
  const hasAppeProp: DfhProperty = {
    has_domain: DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE,
    pk_property: DfhConfig.PROPERTY_PK_IS_APPELLATION_OF,
    has_range: rangeClass,
    domain_instances_max_quantifier: -1,
    domain_instances_min_quantifier: 0,
    range_instances_max_quantifier: 1,
    range_instances_min_quantifier: 1,
    identifier_in_namespace: 'histP9',
    parent_properties: [2],
    ancestor_properties: [2],
    profiles
  }
  return hasAppeProp
}

let id = 54321;
export function ontomeProfileMockToGvPositiveSchema(o: OntomeProfileMock, addToProject?: number): GvPositiveSchemaObject {

  const klass = o.classes.map(x => transformDfhApiClassToDfhClass(x))
  const property = o.properties.map(x => transformDfhApiPropertyToDfhProperty(x))
  const label = [...o.classes.map(x => transformDfhApiClassToDfhLabel(x))]
  o.properties.forEach(x => {
    label.push(...transformDfhApiPropertyToDfhLabels(x))
  })
  if (addToProject) {
    const dfh_profile_proj_rel = [{
      pk_entity: id++,
      fk_project: addToProject,
      fk_profile: o.profile.dfh_pk_profile,
      enabled: true
    }]
    return {
      dfh: { klass, property, label },
      pro: { dfh_profile_proj_rel }
    }

  }
  return { dfh: { klass, property, label } }
}

/**
 * creates a positive schema object with all classes and properties from the
 * provided ontoMock
 * + plus it adds the addProperties defined in sysConfig
 * + it relates the profiles given by ontoMock to the given project
 * @param d
 * @returns
 */
export function createCrmAsGvPositiveSchema(d: {
  ontoMocks: OntomeProfileMock[],
  sysConf: SysConfigValue,
  p?: number
}): GvPositiveSchemaObject {
  let o: GvPositiveSchemaObject = {}
  d.ontoMocks.forEach(ontoMock => {
    const o2 = ontomeProfileMockToGvPositiveSchema(ontoMock, d.p)
    o = mergeDeepWith(concat, o, o2)
  })

  const property = addProperties(d.sysConf, o) as DfhProperty[]
  const autoPropsObj: GvPositiveSchemaObject = { dfh: { property }, sys: { config: [d.sysConf] } }
  return mergeDeepWith(concat, o, autoPropsObj)
}

function addProperties(sysConf: SysConfigValue, schemaObj: GvPositiveSchemaObject) {
  const autoProps: Partial<DfhProperty>[] = []
  const toAdd = sysConf.addProperty ?? []
  toAdd.forEach(i => {

    // find property
    const prop = schemaObj?.dfh?.property?.find(p => {
      if (i.wherePkProperty && p.pk_property !== i.wherePkProperty) return false;
      if (i.whereFkRange && p.has_range !== i.whereFkRange) return false;
      if (i.whereFkDomain && p.has_domain !== i.whereFkDomain) return false;
      return true
    })

    // extend property
    if (prop && schemaObj?.dfh?.klass) {
      schemaObj.dfh.klass.forEach(k => {
        if (k.basic_type && i.toSourceClass?.whereBasicTypeNotIn?.includes(k.basic_type)) return;
        if (k.pk_class && i.toSourceClass?.wherePkClassNotIn?.includes(k.pk_class)) return;

        const superclasses = [...k?.parent_classes ?? [], ...k?.ancestor_classes ?? []]
        if (superclasses.length && i.toSourceClass?.whereNotSubclassOf?.some(superC => superclasses.includes(superC))) return;

        const isValueObjectType = getClassIsVot(sysConf, k.pk_class, k.basic_type)
        if (i.toSourceClass?.whereNotValueObjectType && isValueObjectType) return;

        if (i.toSourceClass?.all ||
          (k.pk_class && i.toSourceClass?.wherePkClassIn?.includes(k.pk_class)) ||
          (k.basic_type && i.toSourceClass?.whereBasicTypeIn?.includes(k.basic_type)) ||
          (superclasses.length && i.toSourceClass?.whereSubclassOf?.some(superC => superclasses.includes(superC))) ||
          (i.toSourceClass?.whereValueObjectType && isValueObjectType)
        ) {
          let newProp: Partial<DfhProperty>;
          if (i.replaceTargetClassWithSourceClass) {
            newProp = {
              ...prop,
              has_domain: k.pk_class,
              has_range: k.pk_class
            }
          } else {
            newProp = {
              ...prop,
              [i.isOutgoing ? 'has_domain' : 'has_range']: k.pk_class
            }
          }

          // prevent duplication
          if (
            !(prop.has_domain === newProp.has_domain &&
              prop.pk_property === newProp.pk_property &&
              prop.has_range === newProp.has_range)
          ) {
            autoProps.push(newProp)
          }


        }
      })
    }
  })
  return autoProps
}



/**
 * Retrieve if class is value object type
 * @param sysConfig
 * @param pkClass
 * @param basicTypeId
 * @returns true, if class is value object type, else false
 */
function getClassIsVot(sysConfig: SysConfigValue, pkClass = -1, basicTypeId = -1): boolean {
  const vot = sysConfig?.classes?.[pkClass]?.valueObjectType ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.valueObjectType ??
    sysConfig?.classesDefault?.valueObjectType

  return !!vot
}
