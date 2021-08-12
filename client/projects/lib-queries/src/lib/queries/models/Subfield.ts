import { FieldBase } from './FieldBase';
import { FieldTargetClass } from './FieldTargetClass';
/**
 * A Subfield contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * Since the display of the statement and its target value depends on the target class, the Subfield
 * has a SubfieldType. This SubfieldType determines what components are used to create, edit or display
 * the statement and its target.
 */
export type Subfield = FieldBase & FieldTargetClass
