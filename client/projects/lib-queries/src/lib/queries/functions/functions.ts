import { InfTimePrimitive, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';


export function infTimePrimToTimePrimWithCal(infTimePrim: InfTimePrimitive, cal: TimePrimitiveWithCal.CalendarEnum): TimePrimitiveWithCal {
  return {
    julianDay: infTimePrim.julian_day,
    duration: infTimePrim.duration as TimePrimitiveWithCal.DurationEnum,
    calendar: cal,
  }
}
