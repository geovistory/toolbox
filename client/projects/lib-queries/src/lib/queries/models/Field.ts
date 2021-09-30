import { ProClassFieldConfig, SysConfigFieldDisplay } from '@kleiolab/lib-sdk-lb4';
import { FieldBase } from './FieldBase';
import { FieldTargetClass } from './FieldTargetClass';
import { SpecialFieldType } from './SpecialFieldType';
/**
 * A Field contains all information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * The Fields of an entity depend on the properties of its class. Each Field contains or represents
 * the properties that have the given class as as domain or range and share the same pk_property.
 *
 * Explanation:
 * The identity (uniqueness) of a property is defined by its domain, pk_propery and its range,
 * It is possible that one class has two outgoing properties with the same pk_property but different
 * ranges. The Field then contains both of them.
 *
 * The Subfields (listDefinitions) are then representing only one property with a uniqur domain, pk_propery and range
 * All Subfields of a Field share all properties defined in FieldBase.
 *
 * In practice the Field a wrapper for SubFileds containing all information that is equal amongst all Subfields.
 */
export interface Field extends FieldBase {
  // defines where the field is being displayed
  display: SysConfigFieldDisplay
  // configuration of the field (containing position in list), given by the project or the default-configuration-project
  fieldConfig?: ProClassFieldConfig;
  // the target classes of the field (if is outgoing range else domain)
  targetClasses: number[];
  // // subfields (they share the source class and property but have different target class and thus list type)
  // listDefinitions: Subfield[];
  // true if all subfields are removed from all profiles activated by the project
  allSubfieldsRemovedFromAllProfiles: boolean;
  // special fields are not using the default subfield approach to show/edit data
  isSpecialField: SpecialFieldType;
  // index of metadata about the target classes of that field
  targets: { [fkClass: number]: FieldTargetClass }
}
