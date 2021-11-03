import { QueryList } from '@angular/core';
import { Field, FieldBase, GvFieldTargets, Subfield } from '@kleiolab/lib-queries';
import { GvFieldId, GvFieldPage, GvFieldPageScope, GvFieldTargetViewType, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/gvFieldSourceEntity';
import { values } from 'd3';
import { first } from 'rxjs/internal/operators/first';


/**
 * returns true if the subfield type is representing a value object type
 * @param subfieldType
 */
export function isValueObjectSubfield(subfieldType: GvFieldTargetViewType): boolean {
  // temp here
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
export function isLeafItemSubfield(subfieldType: GvFieldTargetViewType): boolean {
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
export function fieldToSubfield(f: Field, targetClass: number): Subfield {
  const fieldBase = fieldToFieldBase(f)
  const fieldTargetClass = f.targets[targetClass]
  if (!fieldTargetClass) throw Error('this targetClass is not part of that field');
  return { ...fieldBase, ...fieldTargetClass }
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
