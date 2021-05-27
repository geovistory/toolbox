import { Field, GvFieldTargets } from '@kleiolab/lib-queries';
import { GvFieldId, GvFieldPage, GvFieldPageScope, GvTargetType, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/gvFieldSourceEntity';
import { values } from 'd3';


/**
 * returns true if the subfield type is representing a value object type
 * @param subfieldType
 */
export function isValueObjectSubfield(subfieldType: GvTargetType): boolean {
  if (subfieldType.appellation) return true
  else if (subfieldType.language) return true
  else if (subfieldType.place) return true
  else if (subfieldType.timePrimitive) return true
  else if (subfieldType.langString) return true
  else if (subfieldType.dimension) return true

  return false
}


/**
 * returns true if the subfield type is a 'leaf item' meaning a
 * value object type or entity preview.
 * It returns false if the subfield type is temporalEntity, typeItem or timeSpan
 * @param subfieldType
 */
export function isLeafItemSubfield(subfieldType: GvTargetType): boolean {
  if (isValueObjectSubfield(subfieldType)) return true
  else if (subfieldType.entityPreview) return true
  return false
}


export function fieldToFieldPage(subfield: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope, limit: number, offset: number): GvFieldPage {
  return {
    source,
    property: subfield.property,
    limit,
    offset,
    isOutgoing: subfield.isOutgoing,
    scope
  }
}
export function fieldToFieldId(subfield: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope): GvFieldId {
  return {
    source,
    property: subfield.property,
    isOutgoing: subfield.isOutgoing,
    scope
  }
}

export function fieldToGvFieldTargets(field: Field): GvFieldTargets {
  const res: GvFieldTargets = {}
  values(field.targets).forEach(t => {
    res[t.targetClass] = t.listType
  })
  return res
}
export function fieldToWarFieldChangeId(pkProject: number, fkInfo: number, field: Field): WarFieldChangeId {
  return {
    fk_project: pkProject,
    fk_source_info: fkInfo,
    fk_property: field.property.fkProperty,
    fk_property_of_property: field.property.fkPropertyOfProperty,
    is_outgoing: field.isOutgoing
  };
}



export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;
