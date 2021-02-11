/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/gregorian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateTimeCommons } from './date-time-commons';
import { JulianDateTime } from './julian-date-time';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export class GregorianDateTime extends DateTimeCommons {
    /**
     * @return {?}
     */
    lengthOfMonth() {
        /** @type {?} */
        let y = this.year;
        /** @type {?} */
        let m = this.month;
        if (!(m > 0) && !(m <= 12)) {
            return undefined;
        }
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if (this.isLeapYear()) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    }
    /**
     * @param {?=} duration
     * @return {?}
     */
    getEndOf(duration = this.getGranularity()) {
        /** @type {?} */
        const dt = new GregorianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    }
    /**
     * getJulianDay - Implemented according to this page [2018-03-12]:
     * https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_gregorianischem_Kalender
     *
     * @return {?} description
     */
    getJulianDay() {
        // running day (conut of days that year)
        /** @type {?} */
        const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        // running year
        /** @type {?} */
        const runningYear = this.year - 1;
        // julian day of year 1 AD
        /** @type {?} */
        const julianDay0 = 1721426;
        // number of full 400 year cycles
        /** @type {?} */
        const n400 = Math.floor(runningYear / 400);
        // rest of division: number of years of the last uncomplete 400 years cycle
        /** @type {?} */
        const r400 = runningYear % 400;
        // number of full 100 year cycles
        /** @type {?} */
        const n100 = Math.floor(r400 / 100)
        // rest of division: number of years of the last uncomplete 100 years cycle
        ;
        // rest of division: number of years of the last uncomplete 100 years cycle
        /** @type {?} */
        const r100 = r400 % 100;
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor(r100 / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        const n1 = r100 % 4;
        return julianDay0 + n400 * 146097 + n100 * 36524 + n4 * 1461 + n1 * 365 + runningDay;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    fromJulianDay(julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay);
        }
        // julian day of year 1 AD
        /** @type {?} */
        const julianDay0 = 1721426;
        /** @type {?} */
        const firstDayOfGregorianCal = 2299161;
        // conversion of julian day earlier than the introduction of
        // the gregorian calendar October 15th of 1582 are calculated
        // with the julian calendar algoritms
        if (julianDay < firstDayOfGregorianCal) {
            /** @type {?} */
            const jdt = new JulianDateTime().fromJulianDay(julianDay);
            (/** @type {?} */ (this)).year = jdt.year;
            (/** @type {?} */ (this)).month = jdt.month;
            (/** @type {?} */ (this)).day = jdt.day;
        }
        else {
            // number of full 400 year cycles
            /** @type {?} */
            const n400 = Math.floor((julianDay - julianDay0) / 146097);
            // number of days of the last uncomplete 400 years cycle
            /** @type {?} */
            const r400 = (julianDay - julianDay0) % 146097;
            // number of full 100 year cycles
            /** @type {?} */
            let n100 = Math.floor(r400 / 36524);
            // number of days of the last uncomplete 100 years cycle
            /** @type {?} */
            let r100 = r400 % 36524;
            if (n100 === 4) {
                n100 = 3;
                r100 = 36524;
            }
            // number of full 4 year cycles
            /** @type {?} */
            const n4 = Math.floor(r100 / 1461);
            // number of days of the last uncomplete 4 years cycle
            /** @type {?} */
            const r4 = r100 % 1461;
            // number of full years of the last uncomplete 4 years cycle
            /** @type {?} */
            let n1 = Math.floor(r4 / 365);
            // number of days in the last year
            /** @type {?} */
            let runningDay = r4 % 365;
            if (n1 === 4) {
                n1 = 3;
                runningDay = 365;
            }
            // running year
            /** @type {?} */
            const runningYear = 400 * n400 + 100 * n100 + 4 * n4 + n1;
            // resulting year
            (/** @type {?} */ (this)).year = runningYear + 1;
            /** @type {?} */
            const monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(runningDay, (/** @type {?} */ (this)).isLeapYear())
            // resulting month
            ;
            // resulting month
            (/** @type {?} */ (this)).month = monthDay.month;
            // resulting day
            (/** @type {?} */ (this)).day = monthDay.day;
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    isLeapYear() {
        /** @type {?} */
        const year = this.year;
        // Return true if evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        return ((!(year % 4) && year % 100) || !(year % 400)) ? true : false;
    }
    /**
     * returns julian day in seconds
     *
     * TODO: return julian day plus time in seconds
     * @return {?}
     */
    getJulianSecond() {
        /** @type {?} */
        let seconds = this.getJulianDay() * 60 * 60 * 24;
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
     * @template THIS
     * @this {THIS}
     * @param {?} julianSecond julian second
     * @return {THIS}
     */
    fromJulianSecond(julianSecond) {
        /** @type {?} */
        const secsPerDay = 60 * 60 * 24;
        // number of full days
        /** @type {?} */
        const julianDay = Math.floor(julianSecond / secsPerDay);
        // number of seconds of the julian day
        /** @type {?} */
        const secsOfDay = julianSecond % secsPerDay;
        // number of ours of the day
        (/** @type {?} */ (this)).hours = Math.floor(secsOfDay / (60 * 60));
        // number of seconds of the last hour
        /** @type {?} */
        const secsOfHour = (/** @type {?} */ (this)).hours % (60 * 60);
        // number of ours of the day
        (/** @type {?} */ (this)).minutes = Math.floor(secsOfHour / 60);
        // secs of the last minute
        (/** @type {?} */ (this)).seconds = (/** @type {?} */ (this)).minutes % 60;
        return (/** @type {?} */ (this)).fromJulianDay(julianDay);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZ29yaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2dyZWdvcmlhbi1kYXRlLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQU9wRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsZUFBZTs7OztJQUlwRCxhQUFhOztZQUNQLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSTs7WUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFFakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxTQUFTLENBQUM7U0FDbEI7OztjQUdLLFdBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXBFLDREQUE0RDtRQUM1RCxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckIsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsV0FBd0IsSUFBSSxDQUFDLGNBQWMsRUFBRTs7Y0FFOUMsRUFBRSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENB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R0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDN0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxZQUFZOztjQUVyQixVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOzs7Y0FHekIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQzs7O2NBR2pELFNBQVMsR0FBRyxZQUFZLEdBQUcsVUFBVTtRQUUzQyw0QkFBNEI7UUFDNUIsbUJBQUEsSUFBSSxFQUFBLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7OztjQUd4QyxVQUFVLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUV6Qyw0QkFBNEI7UUFDNUIsbUJBQUEsSUFBSSxFQUFBLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBRTFDLDBCQUEwQjtRQUMxQixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxPQUFPLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2QyxDQUFDO0NBR0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZUNvbW1vbnMsIEdyYW51bGFyaXR5IH0gZnJvbSAnLi9kYXRlLXRpbWUtY29tbW9ucyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBKdWxpYW5EYXRlVGltZSB9IGZyb20gJy4vanVsaWFuLWRhdGUtdGltZSc7XG5cblxuLyoqXG4gKiBDbGFzcyB0byByZXByZXNlbnQgYSBKdWxpYW4gRGF0ZSBhbmQgVGltZVxuICogVE9ETzogTW92ZSB0aGlzIGNsYXNzIHRvIGNvbW1vbiBmb2xkZXIgYXMgaXQgaXMgbmVlZGVkIGJ5IHNlcnZlciBhbmQgY2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBHcmVnb3JpYW5EYXRlVGltZSBleHRlbmRzIERhdGVUaW1lQ29tbW9ucyBpbXBsZW1lbnRzIERhdGVUaW1lIHtcblxuXG5cbiAgbGVuZ3RoT2ZNb250aCgpIHtcbiAgICBsZXQgeSA9IHRoaXMueWVhciwgbSA9IHRoaXMubW9udGg7XG5cbiAgICBpZiAoIShtID4gMCkgJiYgIShtIDw9IDEyKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBBc3N1bWUgbm90IGxlYXAgeWVhciBieSBkZWZhdWx0IChub3RlIHplcm8gaW5kZXggZm9yIEphbilcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuICAgIC8vIElmIGV2ZW5seSBkaXZpc2libGUgYnkgNCBhbmQgbm90IGV2ZW5seSBkaXZpc2libGUgYnkgMTAwLFxuICAgIC8vIG9yIGlzIGV2ZW5seSBkaXZpc2libGUgYnkgNDAwLCB0aGVuIGEgbGVhcCB5ZWFyXG4gICAgaWYgKHRoaXMuaXNMZWFwWWVhcigpKSB7XG4gICAgICBkYXlzSW5Nb250aFsxXSA9IDI5O1xuICAgIH1cbiAgICByZXR1cm4gZGF5c0luTW9udGhbLS1tXTtcbiAgfVxuXG4gIGdldEVuZE9mKGR1cmF0aW9uOiBHcmFudWxhcml0eSA9IHRoaXMuZ2V0R3JhbnVsYXJpdHkoKSk6IEdyZWdvcmlhbkRhdGVUaW1lIHtcblxuICAgIGNvbnN0IGR0ID0gbmV3IEdyZWdvcmlhbkRhdGVUaW1lKHRoaXMpO1xuICAgIGR0LnRvTGFzdFNlY29uZE9mKGR1cmF0aW9uKTtcblxuICAgIHJldHVybiBkdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldEp1bGlhbkRheSAtIEltcGxlbWVudGVkIGFjY29yZGluZyB0byB0aGlzIHBhZ2UgWzIwMTgtMDMtMTJdOlxuICAgKiBodHRwczovL2RlLndpa2lwZWRpYS5vcmcvd2lraS9VbXJlY2hudW5nX3p3aXNjaGVuX2p1bGlhbmlzY2hlbV9EYXR1bV91bmRfZ3JlZ29yaWFuaXNjaGVtX0thbGVuZGVyXG4gICAqXG4gICAqIEByZXR1cm4gIGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRKdWxpYW5EYXkoKSB7XG4gICAgLy8gcnVubmluZyBkYXkgKGNvbnV0IG9mIGRheXMgdGhhdCB5ZWFyKVxuICAgIGNvbnN0IHJ1bm5pbmdEYXkgPSB0aGlzLmNhbGNSdW5uaW5nRGF5KHRoaXMubW9udGgsIHRoaXMuZGF5LCB0aGlzLmlzTGVhcFllYXIoKSk7XG5cbiAgICAvLyBydW5uaW5nIHllYXJcbiAgICBjb25zdCBydW5uaW5nWWVhciA9IHRoaXMueWVhciAtIDE7XG5cbiAgICAvLyBqdWxpYW4gZGF5IG9mIHllYXIgMSBBRFxuICAgIGNvbnN0IGp1bGlhbkRheTAgPSAxNzIxNDI2O1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgNDAwIHllYXIgY3ljbGVzXG4gICAgY29uc3QgbjQwMCA9IE1hdGguZmxvb3IocnVubmluZ1llYXIgLyA0MDApO1xuXG4gICAgLy8gcmVzdCBvZiBkaXZpc2lvbjogbnVtYmVyIG9mIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNDAwIHllYXJzIGN5Y2xlXG4gICAgY29uc3QgcjQwMCA9IHJ1bm5pbmdZZWFyICUgNDAwO1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgMTAwIHllYXIgY3ljbGVzXG4gICAgY29uc3QgbjEwMCA9IE1hdGguZmxvb3IocjQwMCAvIDEwMClcblxuICAgIC8vIHJlc3Qgb2YgZGl2aXNpb246IG51bWJlciBvZiB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDEwMCB5ZWFycyBjeWNsZVxuICAgIGNvbnN0IHIxMDAgPSByNDAwICUgMTAwO1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgNCB5ZWFyIGN5Y2xlc1xuICAgIGNvbnN0IG40ID0gTWF0aC5mbG9vcihyMTAwIC8gNClcblxuICAgIC8vIHJlc3Qgb2YgZGl2aXNpb246IG51bWJlciBvZiBmdWxsIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgIGNvbnN0IG4xID0gcjEwMCAlIDQ7XG5cbiAgICByZXR1cm4ganVsaWFuRGF5MCArIG40MDAgKiAxNDYwOTcgKyBuMTAwICogMzY1MjQgKyBuNCAqIDE0NjEgKyBuMSAqIDM2NSArIHJ1bm5pbmdEYXk7XG4gIH1cblxuXG4gIGZyb21KdWxpYW5EYXkoanVsaWFuRGF5OiBudW1iZXIpIHtcblxuICAgIGlmICh0eXBlb2YganVsaWFuRGF5ID09PSAnc3RyaW5nJykge1xuICAgICAganVsaWFuRGF5ID0gcGFyc2VJbnQoanVsaWFuRGF5KVxuICAgIH1cblxuICAgIC8vIGp1bGlhbiBkYXkgb2YgeWVhciAxIEFEXG4gICAgY29uc3QganVsaWFuRGF5MCA9IDE3MjE0MjY7XG5cbiAgICBjb25zdCBmaXJzdERheU9mR3JlZ29yaWFuQ2FsID0gMjI5OTE2MTtcblxuICAgIC8vIGNvbnZlcnNpb24gb2YganVsaWFuIGRheSBlYXJsaWVyIHRoYW4gdGhlIGludHJvZHVjdGlvbiBvZlxuICAgIC8vIHRoZSBncmVnb3JpYW4gY2FsZW5kYXIgT2N0b2JlciAxNXRoIG9mIDE1ODIgYXJlIGNhbGN1bGF0ZWRcbiAgICAvLyB3aXRoIHRoZSBqdWxpYW4gY2FsZW5kYXIgYWxnb3JpdG1zXG4gICAgaWYgKGp1bGlhbkRheSA8IGZpcnN0RGF5T2ZHcmVnb3JpYW5DYWwpIHtcblxuICAgICAgY29uc3QgamR0ID0gbmV3IEp1bGlhbkRhdGVUaW1lKCkuZnJvbUp1bGlhbkRheShqdWxpYW5EYXkpO1xuICAgICAgdGhpcy55ZWFyID0gamR0LnllYXI7XG4gICAgICB0aGlzLm1vbnRoID0gamR0Lm1vbnRoO1xuICAgICAgdGhpcy5kYXkgPSBqZHQuZGF5O1xuXG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICAvLyBudW1iZXIgb2YgZnVsbCA0MDAgeWVhciBjeWNsZXNcbiAgICAgIGNvbnN0IG40MDAgPSBNYXRoLmZsb29yKChqdWxpYW5EYXkgLSBqdWxpYW5EYXkwKSAvIDE0NjA5Nyk7XG5cbiAgICAgIC8vIG51bWJlciBvZiBkYXlzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNDAwIHllYXJzIGN5Y2xlXG4gICAgICBjb25zdCByNDAwID0gKGp1bGlhbkRheSAtIGp1bGlhbkRheTApICUgMTQ2MDk3O1xuXG4gICAgICAvLyBudW1iZXIgb2YgZnVsbCAxMDAgeWVhciBjeWNsZXNcbiAgICAgIGxldCBuMTAwID0gTWF0aC5mbG9vcihyNDAwIC8gMzY1MjQpO1xuXG4gICAgICAvLyBudW1iZXIgb2YgZGF5cyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDEwMCB5ZWFycyBjeWNsZVxuICAgICAgbGV0IHIxMDAgPSByNDAwICUgMzY1MjQ7XG5cblxuICAgICAgaWYgKG4xMDAgPT09IDQpIHtcbiAgICAgICAgbjEwMCA9IDM7XG4gICAgICAgIHIxMDAgPSAzNjUyNDtcbiAgICAgIH1cblxuICAgICAgLy8gbnVtYmVyIG9mIGZ1bGwgNCB5ZWFyIGN5Y2xlc1xuICAgICAgY29uc3QgbjQgPSBNYXRoLmZsb29yKHIxMDAgLyAxNDYxKTtcblxuICAgICAgLy8gbnVtYmVyIG9mIGRheXMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgICBjb25zdCByNCA9IHIxMDAgJSAxNDYxO1xuXG4gICAgICAvLyBudW1iZXIgb2YgZnVsbCB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICAgIGxldCBuMSA9IE1hdGguZmxvb3IocjQgLyAzNjUpO1xuXG4gICAgICAvLyBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbGFzdCB5ZWFyXG4gICAgICBsZXQgcnVubmluZ0RheSA9IHI0ICUgMzY1O1xuXG4gICAgICBpZiAobjEgPT09IDQpIHtcbiAgICAgICAgbjEgPSAzO1xuICAgICAgICBydW5uaW5nRGF5ID0gMzY1O1xuICAgICAgfVxuXG4gICAgICAvLyBydW5uaW5nIHllYXJcbiAgICAgIGNvbnN0IHJ1bm5pbmdZZWFyID0gNDAwICogbjQwMCArIDEwMCAqIG4xMDAgKyA0ICogbjQgKyBuMTtcblxuICAgICAgLy8gcmVzdWx0aW5nIHllYXJcbiAgICAgIHRoaXMueWVhciA9IHJ1bm5pbmdZZWFyICsgMTtcblxuICAgICAgY29uc3QgbW9udGhEYXkgPSB0aGlzLmNhbGNEYXRlQnlSdW5uaW5nRGF5KHJ1bm5pbmdEYXksIHRoaXMuaXNMZWFwWWVhcigpKVxuXG4gICAgICAvLyByZXN1bHRpbmcgbW9udGhcbiAgICAgIHRoaXMubW9udGggPSBtb250aERheS5tb250aDtcblxuICAgICAgLy8gcmVzdWx0aW5nIGRheVxuICAgICAgdGhpcy5kYXkgPSBtb250aERheS5kYXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBnaXZlbiB5ZWFyIGlzIGEgbGVhcCB5ZWFyXG4gICAqL1xuICBpc0xlYXBZZWFyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHllYXIgPSB0aGlzLnllYXI7XG4gICAgLy8gUmV0dXJuIHRydWUgaWYgZXZlbmx5IGRpdmlzaWJsZSBieSA0IGFuZCBub3QgZXZlbmx5IGRpdmlzaWJsZSBieSAxMDAsXG4gICAgLy8gb3IgaXMgZXZlbmx5IGRpdmlzaWJsZSBieSA0MDAsIHRoZW4gYSBsZWFwIHllYXJcbiAgICByZXR1cm4gKCghKHllYXIgJSA0KSAmJiB5ZWFyICUgMTAwKSB8fCAhKHllYXIgJSA0MDApKSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGp1bGlhbiBkYXkgaW4gc2Vjb25kc1xuICAgKlxuICAgKiBUT0RPOiByZXR1cm4ganVsaWFuIGRheSBwbHVzIHRpbWUgaW4gc2Vjb25kc1xuICAgKi9cbiAgZ2V0SnVsaWFuU2Vjb25kKCkge1xuICAgIGxldCBzZWNvbmRzID0gdGhpcy5nZXRKdWxpYW5EYXkoKSAqIDYwICogNjAgKiAyNDsgLy8gZmlyc3Qgc2Vjb25kIG9mIHRoZSBkYXlcbiAgICBpZiAodGhpcy5zZWNvbmRzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLnNlY29uZHM7XG4gICAgaWYgKHRoaXMubWludXRlcyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5taW51dGVzICogNjA7XG4gICAgaWYgKHRoaXMuaG91cnMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMuaG91cnMgKiA2MCAqIDYwO1xuICAgIHJldHVybiBzZWNvbmRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIEp1bGlhbkRhdGVUaW1lIGZyb20gZ2l2ZW4ganVsaWFuIHNlY29uZFxuICAgKiBAcGFyYW0ganVsaWFuU2Vjb25kIGp1bGlhbiBzZWNvbmRcbiAgICovXG4gIGZyb21KdWxpYW5TZWNvbmQoanVsaWFuU2Vjb25kKSB7XG5cbiAgICBjb25zdCBzZWNzUGVyRGF5ID0gNjAgKiA2MCAqIDI0O1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgZGF5c1xuICAgIGNvbnN0IGp1bGlhbkRheSA9IE1hdGguZmxvb3IoanVsaWFuU2Vjb25kIC8gc2Vjc1BlckRheSk7XG5cbiAgICAvLyBudW1iZXIgb2Ygc2Vjb25kcyBvZiB0aGUganVsaWFuIGRheVxuICAgIGNvbnN0IHNlY3NPZkRheSA9IGp1bGlhblNlY29uZCAlIHNlY3NQZXJEYXk7XG5cbiAgICAvLyBudW1iZXIgb2Ygb3VycyBvZiB0aGUgZGF5XG4gICAgdGhpcy5ob3VycyA9IE1hdGguZmxvb3Ioc2Vjc09mRGF5IC8gKDYwICogNjApKVxuXG4gICAgLy8gbnVtYmVyIG9mIHNlY29uZHMgb2YgdGhlIGxhc3QgaG91clxuICAgIGNvbnN0IHNlY3NPZkhvdXIgPSB0aGlzLmhvdXJzICUgKDYwICogNjApO1xuXG4gICAgLy8gbnVtYmVyIG9mIG91cnMgb2YgdGhlIGRheVxuICAgIHRoaXMubWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjc09mSG91ciAvIDYwKVxuXG4gICAgLy8gc2VjcyBvZiB0aGUgbGFzdCBtaW51dGVcbiAgICB0aGlzLnNlY29uZHMgPSB0aGlzLm1pbnV0ZXMgJSA2MDtcblxuICAgIHJldHVybiB0aGlzLmZyb21KdWxpYW5EYXkoanVsaWFuRGF5KTtcblxuICB9XG5cblxufVxuIl19