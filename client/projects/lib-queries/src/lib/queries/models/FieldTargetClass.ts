import { GvSubfieldType } from '@kleiolab/lib-sdk-lb4';
export interface FieldTargetClass {
  // determines what components are used to create, edit or display
  // the statement and its target.
  listType: GvSubfieldType;
  // the target class of the sub-field (if is outgoing range else domain)
  targetClass: number;
  // label of the target class
  targetClassLabel: string;
  // true if the property is removed from all profiles activated by the project
  removedFromAllProfiles: boolean;
}
