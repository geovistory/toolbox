import { GvFieldTargetViewType } from '@kleiolab/lib-sdk-lb4';
import { isValueObjectSubfield } from './isValueObjectSubfield';

/**
 * returns true if the field type is a 'leaf item' meaning a
 * value object type or entity preview.
 * It returns false if the field type is temporalEntity, typeItem or timeSpan
 * @param fieldType
 */


export function isLeafItemSubfield(fieldType: GvFieldTargetViewType): boolean {
    if (isValueObjectSubfield(fieldType)) return true;
    else if (fieldType.entityPreview) return true;
    return false;
}
