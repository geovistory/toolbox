import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { TimePrimitive } from "@kleiolab/lib-utils";
export function propSetKeyFromFk(fkPropSet) {
    switch (fkPropSet) {
        case SysConfig.PK_CLASS_FIELD_WHEN:
            return '_field_48';
        default:
            return undefined;
    }
}
export function getCalendarFromStatement(statement) {
    if (!statement)
        return null;
    const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
        statement.entity_version_project_rels[0].calendar :
        statement.community_favorite_calendar ?
            statement.community_favorite_calendar : null;
    return cal;
}
export function infStatement2TimePrimitive(r) {
    // from InfTimePrimitve to TimePrimitive
    const infTp = r ? r.object_time_primitive : null;
    let timePrimitive = null;
    const obj = {};
    if (infTp && infTp.duration && infTp.julian_day &&
        getCalendarFromStatement(r)) {
        // add duration
        obj.duration = infTp.duration;
        // add calendar
        obj.calendar = getCalendarFromStatement(r);
        // add julian day
        obj.julianDay = infTp.julian_day;
        timePrimitive = new TimePrimitive(Object.assign({}, obj));
    }
    if (timePrimitive === null) {
        return new TimePrimitive({
            calendar: 'julian'
        });
    }
    else {
        return timePrimitive;
    }
}
//# sourceMappingURL=information.helpers.js.map