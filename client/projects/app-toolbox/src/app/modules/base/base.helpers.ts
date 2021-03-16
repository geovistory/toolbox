import { Field, Subfield } from '@kleiolab/lib-queries';
import { PaginateByParam } from '@kleiolab/lib-redux';
import { GvFieldId, GvFieldPage, GvFieldPageScope, GvFieldTargets, GvTargetType } from '@kleiolab/lib-sdk-lb4';
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


// TODO delete if not needed
export function createPaginateBy(subfield: Subfield, pkEntity: number, alternatives = false): PaginateByParam[] {
  return [
    { fk_property: subfield.property.fkProperty },
    { fk_target_class: subfield.targetClass },
    { [subfield.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: pkEntity },
    { [alternatives ? 'alternatives' : 'ofProject']: alternatives }
  ]
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


export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;
