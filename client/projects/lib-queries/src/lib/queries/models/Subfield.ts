import { GvTargetType } from '@kleiolab/lib-sdk-lb4';
import { FieldBase } from './FieldBase';
/**
 * A Subfiel contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * Since the display of the statement and its target value depends on the target class, the Subfield
 * has a SubfieldType. This SubfieldType determines what components are used to create, edit or display
 * the statement and its target.
 */
export interface Subfield extends FieldBase {
  // determines what components are used to create, edit or display
  // the statement and its target.
  listType: GvTargetType;
  // the target class of the sub-field (if is outgoing range else domain)
  targetClass: number;
  // label of the target class
  targetClassLabel: string;
  // true if the property is removed from all profiles activated by the project
  removedFromAllProfiles: boolean;
}