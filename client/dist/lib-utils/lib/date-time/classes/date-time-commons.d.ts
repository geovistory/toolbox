import { EventEmitter } from '@angular/core';
import { TimePrimitiveWithCal } from '@kleiolab/lib-sdk-lb4';
import { YearMonthDay } from '../interfaces';
export declare type Granularity = TimePrimitiveWithCal.DurationEnum;
export declare abstract class DateTimeCommons {
    /**
     * Properties
     */
    onDateChange: EventEmitter<YearMonthDay>;
    private _year?;
    year: number;
    private _month?;
    month: number;
    private _day?;
    day: number;
    private _hours?;
    hours: number;
    private _minutes?;
    minutes: number;
    private _seconds?;
    seconds: number;
    constructor(data?: any);
    abstract lengthOfMonth(): number;
    /**
    * Returns the running day for given month and day with consideration of the
    * isLeap boolean that indicates leap years. Inspired by:
    * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
    *
    * @param month 1=january .. 12=december
    * @param day 1, 2 .. 31
    * @param isLeap if true, this is a leap year
    */
    calcRunningDay(month: number, day: number, isLeap: boolean): number;
    /**
    * Returns the month and day for given running day with consideration of the
    * isLeap boolean that indicates leap years. Inspired by:
    * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
    *
    * @param runningDay 1, 2 .. 365
    * @param isLeap if true, this is a leap year
    *
    */
    calcDateByRunningDay(runningDay: number, isLeap: boolean): {
        day: number;
        month: number;
    };
    emitDateChange(): void;
    getGranularity(): Granularity;
    getTimeStamp(): string;
    getDate(): Date | null;
    pad(number: number, width: number, z?: string): string;
    addYear(): void;
    addMonth(): void;
    addDay(): void;
    addHour(): void;
    addMinute(): void;
    addSecond(): void;
    removeYear(): void;
    removeMonth(): void;
    removeDay(): void;
    removeHour(): void;
    removeMinute(): void;
    removeSecond(): void;
    addDays(quantity: number): void;
    addMonths(quantity: number): void;
    addYears(quantity: number): void;
    add(duration: Granularity): void;
    toLastSecondOf(duration: Granularity): void;
}
