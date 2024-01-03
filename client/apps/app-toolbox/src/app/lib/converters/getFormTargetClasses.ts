import type { Field, FieldTargetClass } from '@kleiolab/lib-redux';
import { values } from 'ramda';

export function getFormTargetClasses(field?: Field): FieldTargetClass[] {
  if (!field) return [];
  return values(field?.targets ?? [])
    .filter(target => !target.removedFromAllProfiles);

}
