import { FieldBase } from './FieldBase';
import { FieldTargetClass } from './FieldTargetClass';
/**
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * A Subfield contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 */
export type Subfield = FieldBase & FieldTargetClass & {
  sourceSuperClasses: number[]
}
