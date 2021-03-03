import { InfTimePrimitive, TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { TimeSpanUtil } from '@kleiolab/lib-utils';
import { TimeSpanItem } from '../models/TimeSpanItem';
export declare function timeSpanItemToTimeSpan(timeSpanItem: TimeSpanItem): TimeSpanUtil;
export declare function infTimePrimToTimePrimWithCal(infTimePrim: InfTimePrimitive, cal: TimePrimitiveWithCal.CalendarEnum): TimePrimitiveWithCal;
