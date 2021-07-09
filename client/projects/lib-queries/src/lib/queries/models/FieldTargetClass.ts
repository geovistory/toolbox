import { GvFieldTargetViewType } from '@kleiolab/lib-sdk-lb4';

export interface FieldTargetClass {
  // determines what view-components are used to display the statement and its target.
  viewType: GvFieldTargetViewType;
  // determines what form-components are used to create the statement and its target.
  formControlType: GvFieldTargetViewType;
  // the target class of the sub-field (if is outgoing range else domain)
  targetClass: number;
  // label of the target class
  targetClassLabel: string;
  // true if the property is removed from all profiles activated by the project
  removedFromAllProfiles: boolean;
}
