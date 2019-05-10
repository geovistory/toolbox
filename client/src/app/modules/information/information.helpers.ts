import { SysConfig, FieldList, InfRole, InfTimePrimitive, RoleDetailList, U, UiContext } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';
import { roleDetailKey, sortRoleDetailsByOrdNum } from 'app/core/state/services/state-creator';
import { indexBy } from 'ramda';


export function propSetKeyFromFk(fkPropSet: number) {
    switch (fkPropSet) {
        case SysConfig.PK_CLASS_FIELD_WHEN:
            return '_field_48';

        default:
            return undefined
    }

}

export function getCalendarFromRole(role: InfRole): CalendarType {
    if (!role) return null;

    const cal = (role.entity_version_project_rels && role.entity_version_project_rels[0].calendar) ?
        role.entity_version_project_rels[0].calendar :
        role.community_favorite_calendar ?
            role.community_favorite_calendar : null;

    return cal as CalendarType;
}


export function infRole2TimePrimitive(r: InfRole): TimePrimitive {

    // from InfTimePrimitve to TimePrimitive
    const infTp: InfTimePrimitive = r ? r.time_primitive : null;
    let timePrimitive: TimePrimitive = null;
    const obj: any = {}

    if (
        infTp && infTp.duration && infTp.julian_day &&
        getCalendarFromRole(r)
    ) {
        // add duration
        obj.duration = infTp.duration

        // add calendar
        obj.calendar = getCalendarFromRole(r)

        // add julian day
        obj.julianDay = infTp.julian_day;

        timePrimitive = new TimePrimitive({ ...obj })
    }

    if (timePrimitive === null) {
        return new TimePrimitive({
            calendar: 'julian'
        })
    }    else {
        return timePrimitive;
    }
}

/**
 * Returns a copy of the given _fields object, where the items are sorted and filtered
 * according to the given uiContext.
 *
 * The order is defined in uiContext.uiElements.
 * If the key of an item in _fields is not present in the given uiContext,
 * it will be omitted inthe returned FieldList
 *
 * @param _fields a FieldList
 * @param uiContext a uiContext definition object.
 */
export function sortChildrenByUiContext(_fields: FieldList, uiContext: UiContext): FieldList {
    if (!_fields || !uiContext) return {};

    const res: FieldList = {}

    // create an array with the data unit child keys in the right order
    uiContext.uiElements.forEach(el => {
        const key = el.propertyFieldKey ? el.propertyFieldKey : el.propSetKey ? el.propSetKey : null;
        if (key && _fields[key]) {
            res[key] = _fields[key];
        }
    })

    return res;
}





/**
 * returns a copy of the given RoleDetailList, where the items are sorted
 * according to the ord_num in the epr.
 *
 * @param roleDetailArray a RoleDetailList
 * @returns a sorted copy of RoleDetailList
 */
export function sortRoleDetailListByOrdNum(roleDetailArray: RoleDetailList): RoleDetailList {

    return indexBy(roleDetailKey, sortRoleDetailsByOrdNum(U.obj2Arr(roleDetailArray)))

}
