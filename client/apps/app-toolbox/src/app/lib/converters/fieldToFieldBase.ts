import { Field, FieldBase } from '@kleiolab/lib-redux';



export function fieldToFieldBase(f: Field): FieldBase {
    const {
        display, fieldConfig, targetClasses, allSubfieldsRemovedFromAllProfiles, isSpecialField, targets, ...fieldBase
    } = f;
    return fieldBase;
}
