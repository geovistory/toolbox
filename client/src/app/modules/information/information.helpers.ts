import { InfStatement, InfTimePrimitive, SysConfig } from 'app/core';
import { CalendarType, TimePrimitive } from 'app/core/date-time/time-primitive';


export function propSetKeyFromFk(fkPropSet: number) {
  switch (fkPropSet) {
    case SysConfig.PK_CLASS_FIELD_WHEN:
      return '_field_48';

    default:
      return undefined
  }

}

export function getCalendarFromStatement(statement: InfStatement): CalendarType {
  if (!statement) return null;

  const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
    statement.entity_version_project_rels[0].calendar :
    statement.community_favorite_calendar ?
      statement.community_favorite_calendar : null;

  return cal as CalendarType;
}


export function infStatement2TimePrimitive(r: InfStatement): TimePrimitive {

  // from InfTimePrimitve to TimePrimitive
  const infTp: InfTimePrimitive = r ? r.object_time_primitive : null;
  let timePrimitive: TimePrimitive = null;
  const obj: any = {}

  if (
    infTp && infTp.duration && infTp.julian_day &&
    getCalendarFromStatement(r)
  ) {
    // add duration
    obj.duration = infTp.duration

    // add calendar
    obj.calendar = getCalendarFromStatement(r)

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
