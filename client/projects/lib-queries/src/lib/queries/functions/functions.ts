import { DfhConfig } from '@kleiolab/lib-config';
import { InfTimePrimitive, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { TimeSpanUtil } from '@kleiolab/lib-utils';
import { TimeSpanItem } from '../models/TimeSpanItem';

export function timeSpanItemToTimeSpan(timeSpanItem: TimeSpanItem): TimeSpanUtil {
  const t = new TimeSpanUtil();

  timeSpanItem.properties.forEach(p => {
    const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty]
    if (p.items && p.items.length) t[key] = p.items[0].timePrimitive
  })
  return t;
}

export function infTimePrimToTimePrimWithCal(infTimePrim: InfTimePrimitive, cal: TimePrimitiveWithCal.CalendarEnum): TimePrimitiveWithCal {
  return {
    julianDay: infTimePrim.julian_day,
    duration: infTimePrim.duration as TimePrimitiveWithCal.DurationEnum,
    calendar: cal,
  }
}
