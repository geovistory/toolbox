import { QueryList } from '@angular/core';
import { Field, FieldBase, GvFieldTargets } from '@kleiolab/lib-queries';
import { GvFieldId, GvFieldPage, GvFieldPageScope, GvFieldTargetViewType, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/gvFieldSourceEntity';
import { values } from 'd3';
import { first } from 'rxjs/internal/operators/first';


/**
 * returns true if the field type is representing a value object type
 * @param fieldType
 */
export function isValueObjectSubfield(fieldType: GvFieldTargetViewType): boolean {
  // temp here
  if (fieldType.appellation) return true
  else if (fieldType.language) return true
  else if (fieldType.place) return true
  else if (fieldType.timePrimitive) return true
  else if (fieldType.langString) return true
  else if (fieldType.dimension) return true

  return false
}


/**
 * returns true if the field type is a 'leaf item' meaning a
 * value object type or entity preview.
 * It returns false if the field type is temporalEntity, typeItem or timeSpan
 * @param fieldType
 */
export function isLeafItemSubfield(fieldType: GvFieldTargetViewType): boolean {
  if (isValueObjectSubfield(fieldType)) return true
  else if (fieldType.entityPreview) return true
  return false
}


export function fieldToFieldPage(field: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope, limit: number, offset: number): GvFieldPage {
  return {
    source,
    property: field.property,
    limit,
    offset,
    isOutgoing: field.isOutgoing,
    scope
  }
}
export function fieldToFieldId(field: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope): GvFieldId {
  return {
    source,
    property: field.property,
    isOutgoing: field.isOutgoing,
    scope
  }
}

export function fieldToGvFieldTargets(field: Field): GvFieldTargets {
  const res: GvFieldTargets = {}
  values(field.targets).forEach(t => {
    res[t.targetClass] = t.viewType
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

export function fieldToFieldBase(f: Field): FieldBase {
  const {
    display,
    fieldConfig,
    targetClasses,
    allSubfieldsRemovedFromAllProfiles,
    isSpecialField,
    targets,
    ...fieldBase
  } = f
  return fieldBase
}


export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;

export async function getFirstElementFormQueryList<M>(queryList: QueryList<M>): Promise<M> {
  return new Promise<M>((resolve, reject) => {
    if (queryList.length > 0) {
      resolve(queryList.first)
    }
    queryList.changes
      .pipe(first((x: QueryList<M>) => x.length > 0))
      .subscribe((items) => {
        resolve(items.first)
      })
  })
}
