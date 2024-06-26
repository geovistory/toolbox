import { GvFieldTargetViewType } from '@kleiolab/lib-sdk-lb4';

/**
 * returns true if the field type is representing a value object type
 * @param fieldType
 */


export function isValueObjectSubfield(fieldType: GvFieldTargetViewType): boolean {
    // temp here
    if (fieldType.appellation) return true;
    else if (fieldType.language) return true;
    else if (fieldType.place) return true;
    else if (fieldType.timePrimitive) return true;
    else if (fieldType.langString) return true;
    else if (fieldType.dimension) return true;

    return false;
}
