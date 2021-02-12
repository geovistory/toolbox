import { InfStatement, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';

import { TimePrimitive, TimeSpanUtil, CalendarType } from '..';

import { TimeSpanItem } from 'projects/app-toolbox/src/app/modules/base/components/properties-tree/properties-tree.models';

import { DfhConfig } from '@kleiolab/lib-config';

/**
 * Converts InfStatement to TimePrimitive
 * @param r the InfStatement to convert
 */
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

export function timeSpanItemToTimeSpan(timeSpanItem: TimeSpanItem): TimeSpanUtil {
  const t = new TimeSpanUtil();

  timeSpanItem.properties.forEach(p => {
    const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty]
    if (p.items && p.items.length) t[key] = p.items[0].timePrimitive
  })
  return t;
}

/**
  *  Extracts the calendar from  InfTimePrimitve to TimePrimitive
 */
export function getCalendarFromStatement(statement: InfStatement): CalendarType {
  if (!statement) return null;

  const cal = (statement.entity_version_project_rels && statement.entity_version_project_rels[0].calendar) ?
    statement.entity_version_project_rels[0].calendar :
    statement.community_favorite_calendar ?
      statement.community_favorite_calendar : null;

  return cal as CalendarType;
}
