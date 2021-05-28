import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';

export interface CtrlTimeSpanDialogResult {
  // key is the dfh_pk_property, expressing what the time primitive means for the time span
  72?: TimePrimitiveWithCal; // p82 | At some time within | outer bounds | not before – not after
  152?: TimePrimitiveWithCal; // p82a | begin of the begin | left outer bound | not before
  153?: TimePrimitiveWithCal; // p82b | end of the end | right outer bound | not after
  71?: TimePrimitiveWithCal; // p81 | Ongoing throughout | inner bounds | surely from – surely to
  150?: TimePrimitiveWithCal; // p81a | end of the begin | left inner bound | surely from
  151?: TimePrimitiveWithCal; // p81b | begin of the end | right inner bound | surely to
}
