import { Granularity } from 'app/core/date-time/date-time-commons';
import { CalendarType } from 'app/core/date-time/time-primitive';

interface TimePrimitiveWithCal {
  duration: Granularity,
  julian_day: number,
  calendar: CalendarType
}
export interface TimeSpan {
  71?: TimePrimitiveWithCal,
  72?: TimePrimitiveWithCal,
  150?: TimePrimitiveWithCal,
  151?: TimePrimitiveWithCal,
  152?: TimePrimitiveWithCal,
  153?: TimePrimitiveWithCal,
}

