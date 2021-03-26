import { InfTimePrimitiveWithCalendar } from '@kleiolab/lib-utils';

export interface CtrlTimeSpanDialogResult {
  // key is the dfh_pk_property, expressing what the time primitive means for the time span
  72?: InfTimePrimitiveWithCalendar; // p82 | At some time within | outer bounds | not before – not after
  152?: InfTimePrimitiveWithCalendar; // p82a | begin of the begin | left outer bound | not before
  153?: InfTimePrimitiveWithCalendar; // p82b | end of the end | right outer bound | not after
  71?: InfTimePrimitiveWithCalendar; // p81 | Ongoing throughout | inner bounds | surely from – surely to
  150?: InfTimePrimitiveWithCalendar; // p81a | end of the begin | left inner bound | surely from
  151?: InfTimePrimitiveWithCalendar; // p81b | begin of the end | right inner bound | surely to
}
