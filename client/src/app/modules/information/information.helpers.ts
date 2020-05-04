import { InfRole, InfTimePrimitive, SysConfig } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';


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
  } else {
    return timePrimitive;
  }
}
