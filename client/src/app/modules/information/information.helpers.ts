import { InfRole, InfTimePrimitive, UiContext, U, ComConfig, DataUnitChild, RoleSet, RoleDetail, DataUnitChildList, RoleDetailList, RoleSetI } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';
import { indexBy, sort } from 'ramda'

export function dataUnitChildKey(child: DataUnitChild) {

    switch (child.type) {
        case 'RoleSet':
            return U.roleSetKey(child as RoleSet);

        case 'ExistenceTimeDetail':
            return '_existenceTime';

        default:
            break;
    }
}


export function propSetKeyFromFk(fkPropSet: number) {
    switch (fkPropSet) {
        case ComConfig.PK_PROPERTY_SET_EXISTENCE_TIME:
            return '_existenceTime';

        default:
            return undefined
    }

}


export function roleDetailKey(roleDetail: RoleDetail) { return '_' + roleDetail.role.pk_entity };


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
 * Returns a copy of the given _children object, where the items are sorted and filtered
 * according to the given uiContext.
 *
 * The order is defined in uiContext.uiElements.
 * If the key of an item in _children is not present in the given uiContext,
 * it will be omitted inthe returned DataUnitChildList
 *
 * @param _children a DataUnitChildList
 * @param uiContext a uiContext definition object.
 */
export function sortChildrenByUiContext(_children: DataUnitChildList, uiContext: UiContext): DataUnitChildList {
    if (!_children || !uiContext) return {};

    const res: DataUnitChildList = {}

    // create an array with the data unit child keys in the right order
    uiContext.uiElements.forEach(el => {
        const key = el.roleSetKey ? el.roleSetKey : el.propSetKey ? el.propSetKey : null;
        if (key && _children[key]) {
            res[key] = _children[key];
        }
    })

    return res;
}



/**
 * returns a copy of the given RoleDetail[], where the items are sorted
 * according to the ord_num in the epr.
 *
 * @param roleDetailArray a RoleDetail[]
 * @returns a sorted copy of RoleDetail[]
 */
export function sortRoleDetailsByOrdNum(roleDetailArray: RoleDetail[]): RoleDetail[] {

    const diff = (rdA: RoleDetail, rdB: RoleDetail) => {

        const a = rdA.role.entity_version_project_rels ? rdA.role.entity_version_project_rels[0].ord_num : undefined;
        const b = rdB.role.entity_version_project_rels ? rdB.role.entity_version_project_rels[0].ord_num : undefined;

        if (a === undefined || b === undefined) return 0;

        return a - b;
    }

    return sort(diff, roleDetailArray);
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


/**
 * Checks if RoleSet a is of the same property or property-of-origin as RoleSet b.
 * This is useful to check if a RoleSet is circular in a tree of RoleSets and DataUnits
 *
 * @param a RoleSet you want to test if it is circular
 * @param b RoleSet to compare with (typically the parent RoleSet in the tree)
 */
export function similarRoleSet(a: RoleSetI, b: RoleSetI): boolean {
    if (!a || !b) return false;

    if (
        (
            a.property.dfh_pk_property === b.property.dfh_pk_property ||
            (
                a.property.dfh_fk_property_of_origin &&
                a.property.dfh_fk_property_of_origin === b.property.dfh_fk_property_of_origin
            )
        )
        && a.isOutgoing != b.isOutgoing
    ) return true;

    else return false;
}
