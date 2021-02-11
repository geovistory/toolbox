import { Granularity } from "@kleiolab/lib-utils";
import { CalendarType } from "@kleiolab/lib-utils";

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

