import { SubfieldType, Subfield } from './components/properties-tree/properties-tree.models';
import { PaginateByParam } from 'app/core/redux-store/actions';

/**
 * returns true if the subfield type is representing a value object type
 * @param subfieldType
 */
export function isValueObjectSubfield(subfieldType: SubfieldType): boolean {
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
export function isLeafItemSubfield(subfieldType: SubfieldType): boolean {
  if (isValueObjectSubfield(subfieldType)) return true
  else if (subfieldType.entityPreview) return true
  return false
}



export function createPaginateBy(listDefinition: Subfield, pkEntity: number, alternatives = false): PaginateByParam[] {
  if (listDefinition.listType.temporalEntity || listDefinition.listType.entityPreview) {
    return [
      { fk_property: listDefinition.property.pkProperty },
      { fk_target_class: listDefinition.targetClass },
      { [listDefinition.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: pkEntity },
      { [alternatives ? 'alternatives' : 'ofProject']: alternatives }
    ]
  }
}


export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;
