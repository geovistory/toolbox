import { DateTimeCommons, Granularity } from './date-time-commons';
import { DateTime } from './interfaces';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export declare class GregorianDateTime extends DateTimeCommons implements DateTime {
    lengthOfMonth(): number;
    getEndOf(duration?: Granularity): GregorianDateTime;
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return  description
     */
    getJulianDay(): number;
    fromJulianDay(julianDay: number): this;
    /**
     * Returns true if given year is a leap year
     */
    isLeapYear(): boolean;
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     */
    getJulianSecond(): number;
    /**
     * Set this JulianDateTime from given julian second
     * @param julianSecond julian second
     */
    fromJulianSecond(julianSecond: any): this;
}
