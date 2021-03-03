import { Subfield } from '@kleiolab/lib-queries';
import { PaginateByParam } from '@kleiolab/lib-redux';
import { GvSubfieldId, GvSubfieldPage, GvSubfieldPageScope, GvSubfieldType } from '@kleiolab/lib-sdk-lb4';

/**
 * returns true if the subfield type is representing a value object type
 * @param subfieldType
 */
export function isValueObjectSubfield(subfieldType: GvSubfieldType): boolean {
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
export function isLeafItemSubfield(subfieldType: GvSubfieldType): boolean {
  if (isValueObjectSubfield(subfieldType)) return true
  else if (subfieldType.entityPreview) return true
  return false
}



export function createPaginateBy(subfield: Subfield, pkEntity: number, alternatives = false): PaginateByParam[] {
  return [
    { fk_property: subfield.property.pkProperty },
    { fk_target_class: subfield.targetClass },
    { [subfield.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: pkEntity },
    { [alternatives ? 'alternatives' : 'ofProject']: alternatives }
  ]
}

export function subfieldToSubfieldPage(subfield: Subfield, fkSourceEntity: number, scope: GvSubfieldPageScope, limit: number, offset: number): GvSubfieldPage {
  return {
    fkSourceEntity,
    fkProperty: subfield.property.pkProperty,
    targetClass: subfield.targetClass,
    limit,
    offset,
    isOutgoing: subfield.isOutgoing,
    scope
  }
}
export function subfieldToSubfieldId(subfield: Subfield, fkSourceEntity: number, scope: GvSubfieldPageScope): GvSubfieldId {
  return {
    fkSourceEntity,
    fkProperty: subfield.property.pkProperty,
    targetClass: subfield.targetClass,
    isOutgoing: subfield.isOutgoing,
    scope
  }
}


export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;
