import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4/public-api';
import { Granularity } from './date-time-commons';
import { GregorianDateTime } from './gregorian-date-time';
import { JulianDateTime } from './julian-date-time';
export declare type CalendarType = TimePrimitiveWithCal.CalendarEnum;
export declare class TimePrimitive {
    readonly LAST_DAY_BC = 1721422;
    julianDay: number;
    duration: TimePrimitiveWithCal.DurationEnum;
    calendar: TimePrimitiveWithCal.CalendarEnum;
    constructor(data?: TimePrimitiveWithCal);
    getGregorianDateTime(): GregorianDateTime;
    getJulianDateTime(): JulianDateTime;
    /**
     * Get a DateTime object according to the given calendar.
     *
     */
    getDateTime(calendar?: CalendarType): GregorianDateTime | JulianDateTime | null;
    /**
     * Get a Date object according to the given calendar.
     *
     */
    getDate(calendar?: CalendarType): Date | null;
    /**
     * Get a string that defines the format usable with the DatePipe,
     * a according to the given granularity
     */
    getDateFormatString(granularity: Granularity): string;
    /**
     * Get a display label of the current TimePrimitive.
     */
    getShortesDateFormatString(): string;
    /**
     * Get the julian day in seconds
     * TODO: integrate time
    */
    getJulianSecond(): number;
    /**
     * Get the last second of this TimePrimitive. This depends on the calendar,
     * since the month february and leap years differ from one calendar to the other
     *
     */
    getLastSecond(calendar?: CalendarType): number | null;
}
