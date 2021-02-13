import { DateTimeCommons } from './date-time-commons';
import { JulianDateTime } from './julian-date-time';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export class GregorianDateTime extends DateTimeCommons {
    lengthOfMonth() {
        let y = this.year, m = this.month;
        if (!(m > 0) && !(m <= 12)) {
            return undefined;
        }
        // Assume not leap year by default (note zero index for Jan)
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if (this.isLeapYear()) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    }
    getEndOf(duration = this.getGranularity()) {
        const dt = new GregorianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    }
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return  description
     */
    getJulianDay() {
        // running day (conut of days that year)
        const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        // running year
        const runningYear = this.year - 1;
        // julian day of year 1 AD
        const julianDay0 = 1721426;
        // number of full 400 year cycles
        const n400 = Math.floor(runningYear / 400);
        // rest of division: number of years of the last uncomplete 400 years cycle
        const r400 = runningYear % 400;
        // number of full 100 year cycles
        const n100 = Math.floor(r400 / 100);
        // rest of division: number of years of the last uncomplete 100 years cycle
        const r100 = r400 % 100;
        // number of full 4 year cycles
        const n4 = Math.floor(r100 / 4);
        // rest of division: number of full years of the last uncomplete 4 years cycle
        const n1 = r100 % 4;
        return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
    }
    fromJulianDay(julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay);
        }
        // julian day of year 1 AD
        const julianDay0 = 1721426;
        const firstDayOfGregorianCal = 2299161;
        // conversion of julian day earlier than the introduction of
        // the gregorian calendar October 15th of 1582 are calculated
        // with the julian calendar algoritms
        if (julianDay < firstDayOfGregorianCal) {
            const jdt = new JulianDateTime().fromJulianDay(julianDay);
            this.year = jdt.year;
            this.month = jdt.month;
            this.day = jdt.day;
        }
        else {
            // number of full 400 year cycles
            const n400 = Math.floor((julianDay - julianDay0) / 146097);
            // number of days of the last uncomplete 400 years cycle
            const r400 = (julianDay - julianDay0) % 146097;
            // number of full 100 year cycles
            let n100 = Math.floor(r400 / 36524);
            // number of days of the last uncomplete 100 years cycle
            let r100 = r400 % 36524;
            if (n100 === 4) {
                n100 = 3;
                r100 = 36524;
            }
            // number of full 4 year cycles
            const n4 = Math.floor(r100 / 1461);
            // number of days of the last uncomplete 4 years cycle
            const r4 = r100 % 1461;
            // number of full years of the last uncomplete 4 years cycle
            let n1 = Math.floor(r4 / 365);
            // number of days in the last year
            let runningDay = r4 % 365;
            if (n1 === 4) {
                n1 = 3;
                runningDay = 365;
            }
            // running year
            const runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;
            // resulting year
            this.year = runningYear + 1;
            const monthDay = this.calcDateByRunningDay(runningDay, this.isLeapYear());
            // resulting month
            this.month = monthDay.month;
            // resulting day
            this.day = monthDay.day;
        }
        return this;
    }
    /**
     * Returns true if given year is a leap year
     */
    isLeapYear() {
        const year = this.year;
        // Return true if evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
    }
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     */
    getJulianSecond() {
        let seconds = this.getJulianDay() * 60 * 60 * 24; // first second of the day
        if (this.seconds > 0)
            seconds = seconds + this.seconds;
        if (this.minutes > 0)
            seconds = seconds + this.minutes * 60;
        if (this.hours > 0)
            seconds = seconds + this.hours * 60 * 60;
        return seconds;
    }
    /**
     * Set this JulianDateTime from given julian second
     * @param julianSecond julian second
     */
    fromJulianSecond(julianSecond) {
        const secsPerDay = 60 * 60 * 24;
        // number of full days
        const julianDay = Math.floor(julianSecond / secsPerDay);
        // number of seconds of the julian day
        const secsOfDay = julianSecond % secsPerDay;
        // number of ours of the day
        this.hours = Math.floor(secsOfDay / (60 * 60));
        // number of seconds of the last hour
        const secsOfHour = this.hours % (60 * 60);
        // number of ours of the day
        this.minutes = Math.floor(secsOfHour / 60);
        // secs of the last minute
        this.seconds = this.minutes % 60;
        return this.fromJulianDay(julianDay);
    }
}
//# sourceMappingURL=gregorian-date-time.js.map