import { InfTimePrimitive, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';


export function infTimePrimToTimePrimWithCal(infTimePrim: InfTimePrimitive): TimePrimitiveWithCal {
  return {
    julianDay: infTimePrim.julian_day,
    duration: infTimePrim.duration,
    calendar: infTimePrim.calendar,
  }
}
