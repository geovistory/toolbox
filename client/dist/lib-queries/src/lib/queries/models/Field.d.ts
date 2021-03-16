import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { FieldBase } from './FieldBase';
import { FieldPlaceOfDisplay } from './FieldPosition';
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
    placeOfDisplay: FieldPlaceOfDisplay;
    fieldConfig?: ProClassFieldConfig;
    targetClasses: number[];
    allSubfieldsRemovedFromAllProfiles: boolean;
    isSpecialField: SpecialFieldType;
    targets: {
        [fkClass: number]: FieldTargetClass;
    };
}
