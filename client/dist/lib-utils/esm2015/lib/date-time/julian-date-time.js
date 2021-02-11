/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/julian-date-time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateTimeCommons } from './date-time-commons';
/**
 * Class to represent a Julian Date and Time
 * TODO: Move this class to common folder as it is needed by server and client
 */
export class JulianDateTime extends DateTimeCommons {
    /**
     * Methods
     * @param {?=} duration
     * @return {?}
     */
    getEndOf(duration = this.getGranularity()) {
        /** @type {?} */
        const dt = new JulianDateTime(this);
        dt.toLastSecondOf(duration);
        return dt;
    }
    /**
     * @return {?}
     */
    lengthOfMonth() {
        /** @type {?} */
        const y = this.year;
        /** @type {?} */
        let m = this.month;
        // Assume not leap year by default (note zero index for Jan)
        /** @type {?} */
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // If evenly divisible by 4 and not one of the years 5 BC, 1 BC or 4 AD,
        // when Augustus dropped the leap year
        if (!(y % 4) && !(y == -5) && !(y == -1) && !(y == 4)) {
            daysInMonth[1] = 29;
        }
        return daysInMonth[--m];
    }
    /**
     * Convert the year, month, day of julian calendar to julian day
     *
     * @return {?} description
     */
    getJulianDay() {
        // running day (conut of days that year)
        /** @type {?} */
        const runningDay = this.calcRunningDay(this.month, this.day, this.isLeapYear());
        /** @type {?} */
        let runningYear;
        if (this.year < 0) {
            // running year
            runningYear = 4716 + this.year;
        }
        else {
            // running year
            runningYear = 4715 + this.year;
        }
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor(runningYear / 4)
        // rest of division: number of full years of the last uncomplete 4 years cycle
        ;
        // rest of division: number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        const n1 = runningYear % 4;
        return 1461 * n4 + 365 * (n1 - 3) + runningDay;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} julianDay
     * @return {THIS}
     */
    fromJulianDay(julianDay) {
        if (typeof julianDay === 'string') {
            julianDay = parseInt(julianDay, 10);
        }
        // number of full 4 year cycles
        /** @type {?} */
        const n4 = Math.floor((julianDay + (3 * 365)) / 1461);
        // number of days of the last uncomplete 4 years cycle
        /** @type {?} */
        const r4 = (julianDay + (3 * 365)) % 1461;
        // number of full years of the last uncomplete 4 years cycle
        /** @type {?} */
        let n1 = Math.floor(r4 / 365);
        // number of days in the last year
        /** @type {?} */
        let dayOfYear = r4 % 365;
        if (n1 === 4) {
            n1 = 3;
            dayOfYear = 365;
        }
        // running year
        /** @type {?} */
        const runningYear = 4 * n4 + n1;
        // if BC
        if (runningYear <= 4715) {
            // resulting year
            (/** @type {?} */ (this)).year = runningYear - 4716;
            // if AD
        }
        else {
            (/** @type {?} */ (this)).year = runningYear - 4715;
        }
        /** @type {?} */
        const monthDay = (/** @type {?} */ (this)).calcDateByRunningDay(dayOfYear, (/** @type {?} */ (this)).isLeapYear())
        // resulting month
        ;
        // resulting month
        (/** @type {?} */ (this)).month = monthDay.month;
        // resulting day
        (/** @type {?} */ (this)).day = monthDay.day;
        return (/** @type {?} */ (this));
    }
    /**
     * Returns true if given year is a leap year
     * @return {?}
     */
    isLeapYear() {
        // Return true if evenly divisible by 4
        return !(this.year % 4) ? true : false;
    }
    /**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVsaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2p1bGlhbi1kYXRlLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBU25FLE1BQU0sT0FBTyxjQUFlLFNBQVEsZUFBZTs7Ozs7O0lBT2pELFFBQVEsQ0FBQyxXQUF3QixJQUFJLENBQUMsY0FBYyxFQUFFOztjQUU5QyxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7O0lBR0QsYUFBYTs7Y0FDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUk7O1lBQ2YsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLOzs7Y0FHWixXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUVwRSx3RUFBd0U7UUFDeEUsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckQsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDekIsQ0FBQzs7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LE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUFFLE9BQU8sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzdELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsWUFBWTs7Y0FFckIsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O2NBR3pCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7OztjQUdqRCxTQUFTLEdBQUcsWUFBWSxHQUFHLFVBQVU7UUFFM0MsNEJBQTRCO1FBQzVCLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBOzs7Y0FHeEMsVUFBVSxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFekMsNEJBQTRCO1FBQzVCLG1CQUFBLElBQUksRUFBQSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUUxQywwQkFBMEI7UUFDMUIsbUJBQUEsSUFBSSxFQUFBLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFakMsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkMsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVDb21tb25zLCBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cblxuLyoqXG4qIENsYXNzIHRvIHJlcHJlc2VudCBhIEp1bGlhbiBEYXRlIGFuZCBUaW1lXG4qIFRPRE86IE1vdmUgdGhpcyBjbGFzcyB0byBjb21tb24gZm9sZGVyIGFzIGl0IGlzIG5lZWRlZCBieSBzZXJ2ZXIgYW5kIGNsaWVudFxuKi9cbmV4cG9ydCBjbGFzcyBKdWxpYW5EYXRlVGltZSBleHRlbmRzIERhdGVUaW1lQ29tbW9ucyBpbXBsZW1lbnRzIERhdGVUaW1lIHtcblxuXG4gIC8qKlxuICAqIE1ldGhvZHNcbiAgKi9cblxuICBnZXRFbmRPZihkdXJhdGlvbjogR3JhbnVsYXJpdHkgPSB0aGlzLmdldEdyYW51bGFyaXR5KCkpOiBKdWxpYW5EYXRlVGltZSB7XG5cbiAgICBjb25zdCBkdCA9IG5ldyBKdWxpYW5EYXRlVGltZSh0aGlzKTtcbiAgICBkdC50b0xhc3RTZWNvbmRPZihkdXJhdGlvbik7XG5cbiAgICByZXR1cm4gZHQ7XG4gIH1cblxuXG4gIGxlbmd0aE9mTW9udGgoKSB7XG4gICAgY29uc3QgeSA9IHRoaXMueWVhcjtcbiAgICBsZXQgbSA9IHRoaXMubW9udGg7XG5cbiAgICAvLyBBc3N1bWUgbm90IGxlYXAgeWVhciBieSBkZWZhdWx0IChub3RlIHplcm8gaW5kZXggZm9yIEphbilcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuICAgIC8vIElmIGV2ZW5seSBkaXZpc2libGUgYnkgNCBhbmQgbm90IG9uZSBvZiB0aGUgeWVhcnMgNSBCQywgMSBCQyBvciA0IEFELFxuICAgIC8vIHdoZW4gQXVndXN0dXMgZHJvcHBlZCB0aGUgbGVhcCB5ZWFyXG4gICAgaWYgKCEoeSAlIDQpICYmICEoeSA9PSAtNSkgJiYgISh5ID09IC0xKSAmJiAhKHkgPT0gNCkpIHtcbiAgICAgIGRheXNJbk1vbnRoWzFdID0gMjk7XG4gICAgfVxuICAgIHJldHVybiBkYXlzSW5Nb250aFstLW1dXG4gIH1cblxuXG5cbiAgLyoqXG4gICogQ29udmVydCB0aGUgeWVhciwgbW9udGgsIGRheSBvZiBqdWxpYW4gY2FsZW5kYXIgdG8ganVsaWFuIGRheVxuICAqXG4gICogQHJldHVybiAgZGVzY3JpcHRpb25cbiAgKi9cbiAgZ2V0SnVsaWFuRGF5KCkge1xuXG4gICAgLy8gcnVubmluZyBkYXkgKGNvbnV0IG9mIGRheXMgdGhhdCB5ZWFyKVxuICAgIGNvbnN0IHJ1bm5pbmdEYXkgPSB0aGlzLmNhbGNSdW5uaW5nRGF5KHRoaXMubW9udGgsIHRoaXMuZGF5LCB0aGlzLmlzTGVhcFllYXIoKSk7XG4gICAgbGV0IHJ1bm5pbmdZZWFyO1xuICAgIGlmICh0aGlzLnllYXIgPCAwKSB7XG4gICAgICAvLyBydW5uaW5nIHllYXJcbiAgICAgIHJ1bm5pbmdZZWFyID0gNDcxNiArIHRoaXMueWVhcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcnVubmluZyB5ZWFyXG4gICAgICBydW5uaW5nWWVhciA9IDQ3MTUgKyB0aGlzLnllYXI7XG4gICAgfVxuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgNCB5ZWFyIGN5Y2xlc1xuICAgIGNvbnN0IG40ID0gTWF0aC5mbG9vcihydW5uaW5nWWVhciAvIDQpXG5cbiAgICAvLyByZXN0IG9mIGRpdmlzaW9uOiBudW1iZXIgb2YgZnVsbCB5ZWFycyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICBjb25zdCBuMSA9IHJ1bm5pbmdZZWFyICUgNDtcblxuXG4gICAgcmV0dXJuIDE0NjEgKiBuNCArIDM2NSAqIChuMSAtIDMpICsgcnVubmluZ0RheTtcbiAgfVxuXG5cbiAgZnJvbUp1bGlhbkRheShqdWxpYW5EYXk6IG51bWJlcikge1xuXG4gICAgaWYgKHR5cGVvZiBqdWxpYW5EYXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBqdWxpYW5EYXkgPSBwYXJzZUludChqdWxpYW5EYXksIDEwKVxuICAgIH1cblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IoKGp1bGlhbkRheSArICgzICogMzY1KSkgLyAxNDYxKTtcblxuICAgIC8vIG51bWJlciBvZiBkYXlzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgIGNvbnN0IHI0ID0gKGp1bGlhbkRheSArICgzICogMzY1KSkgJSAxNDYxO1xuXG4gICAgLy8gbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgbGV0IG4xID0gTWF0aC5mbG9vcihyNCAvIDM2NSk7XG5cbiAgICAvLyBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbGFzdCB5ZWFyXG4gICAgbGV0IGRheU9mWWVhciA9IHI0ICUgMzY1O1xuXG4gICAgaWYgKG4xID09PSA0KSB7XG4gICAgICBuMSA9IDM7XG4gICAgICBkYXlPZlllYXIgPSAzNjU7XG4gICAgfVxuXG4gICAgLy8gcnVubmluZyB5ZWFyXG4gICAgY29uc3QgcnVubmluZ1llYXIgPSA0ICogbjQgKyBuMTtcblxuICAgIC8vIGlmIEJDXG4gICAgaWYgKHJ1bm5pbmdZZWFyIDw9IDQ3MTUpIHtcbiAgICAgIC8vIHJlc3VsdGluZyB5ZWFyXG4gICAgICB0aGlzLnllYXIgPSBydW5uaW5nWWVhciAtIDQ3MTY7XG5cbiAgICAgIC8vIGlmIEFEXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueWVhciA9IHJ1bm5pbmdZZWFyIC0gNDcxNTtcblxuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoRGF5ID0gdGhpcy5jYWxjRGF0ZUJ5UnVubmluZ0RheShkYXlPZlllYXIsIHRoaXMuaXNMZWFwWWVhcigpKVxuXG4gICAgLy8gcmVzdWx0aW5nIG1vbnRoXG4gICAgdGhpcy5tb250aCA9IG1vbnRoRGF5Lm1vbnRoO1xuXG4gICAgLy8gcmVzdWx0aW5nIGRheVxuICAgIHRoaXMuZGF5ID0gbW9udGhEYXkuZGF5O1xuXG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cblxuICAvKipcbiAgKiBSZXR1cm5zIHRydWUgaWYgZ2l2ZW4geWVhciBpcyBhIGxlYXAgeWVhclxuICAqL1xuICBpc0xlYXBZZWFyKCk6IGJvb2xlYW4ge1xuXG4gICAgLy8gUmV0dXJuIHRydWUgaWYgZXZlbmx5IGRpdmlzaWJsZSBieSA0XG4gICAgcmV0dXJuICEodGhpcy55ZWFyICUgNCkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuXG4gIGdldEp1bGlhblNlY29uZCgpIHtcbiAgICBsZXQgc2Vjb25kcyA9IHRoaXMuZ2V0SnVsaWFuRGF5KCkgKiA2MCAqIDYwICogMjQ7IC8vIGZpcnN0IHNlY29uZCBvZiB0aGUgZGF5XG4gICAgaWYgKHRoaXMuc2Vjb25kcyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5zZWNvbmRzO1xuICAgIGlmICh0aGlzLm1pbnV0ZXMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMubWludXRlcyAqIDYwO1xuICAgIGlmICh0aGlzLmhvdXJzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLmhvdXJzICogNjAgKiA2MDtcbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhpcyBKdWxpYW5EYXRlVGltZSBmcm9tIGdpdmVuIGp1bGlhbiBzZWNvbmRcbiAgICogQHBhcmFtIGp1bGlhblNlY29uZCBqdWxpYW4gc2Vjb25kXG4gICAqL1xuICBmcm9tSnVsaWFuU2Vjb25kKGp1bGlhblNlY29uZCkge1xuXG4gICAgY29uc3Qgc2Vjc1BlckRheSA9IDYwICogNjAgKiAyNDtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIGRheXNcbiAgICBjb25zdCBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhblNlY29uZCAvIHNlY3NQZXJEYXkpO1xuXG4gICAgLy8gbnVtYmVyIG9mIHNlY29uZHMgb2YgdGhlIGp1bGlhbiBkYXlcbiAgICBjb25zdCBzZWNzT2ZEYXkgPSBqdWxpYW5TZWNvbmQgJSBzZWNzUGVyRGF5O1xuXG4gICAgLy8gbnVtYmVyIG9mIG91cnMgb2YgdGhlIGRheVxuICAgIHRoaXMuaG91cnMgPSBNYXRoLmZsb29yKHNlY3NPZkRheSAvICg2MCAqIDYwKSlcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBsYXN0IGhvdXJcbiAgICBjb25zdCBzZWNzT2ZIb3VyID0gdGhpcy5ob3VycyAlICg2MCAqIDYwKTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLm1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY3NPZkhvdXIgLyA2MClcblxuICAgIC8vIHNlY3Mgb2YgdGhlIGxhc3QgbWludXRlXG4gICAgdGhpcy5zZWNvbmRzID0gdGhpcy5taW51dGVzICUgNjA7XG5cbiAgICByZXR1cm4gdGhpcy5mcm9tSnVsaWFuRGF5KGp1bGlhbkRheSk7XG5cbiAgfVxuXG5cbn1cbiJdfQ==