import { DateTimeCommons, Granularity } from './date-time-commons';
import { DateTime } from './interfaces';
/**
* Class to represent a Julian Date and Time
* TODO: Move this class to common folder as it is needed by server and client
*/
export declare class JulianDateTime extends DateTimeCommons implements DateTime {
    /**
    * Methods
    */
    getEndOf(duration?: Granularity): JulianDateTime;
    lengthOfMonth(): number;
    /**
    * Convert the year, month, day of julian calendar to julian day
    *
    * @return  description
    */
    getJulianDay(): number;
    fromJulianDay(julianDay: number): this;
    /**
    * Returns true if given year is a leap year
    */
    isLeapYear(): boolean;
    getJulianSecond(): number;
    /**
     * Set this JulianDateTime from given julian second
     * @param julianSecond julian second
     */
    fromJulianSecond(julianSecond: any): this;
}
