import { RoleSet, RoleDetail } from "./information.models";
import { InfRole, InfTimePrimitive } from "app/core";
import { CalendarType, TimePrimitive } from "app/core/date-time/time-primitive";

export function roleSetKey(roleSet: RoleSet) {
    return '_' + roleSet.property.dfh_pk_property + '_' + (roleSet.isOutgoing ? 'outgoing' : 'ingoing')
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
    let obj: any = {}

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
    }
    else {
       return timePrimitive;
    }
}

