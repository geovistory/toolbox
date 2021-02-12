/**
 * @fileoverview added by tsickle
 * Generated from: classes/julian-date-time.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVsaWFuLWRhdGUtdGltZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJjbGFzc2VzL2p1bGlhbi1kYXRlLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFlLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBU25FLE1BQU0sT0FBTyxjQUFlLFNBQVEsZUFBZTs7Ozs7O0lBT2pELFFBQVEsQ0FBQyxXQUF3QixJQUFJLENBQUMsY0FBYyxFQUFFOztjQUU5QyxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7O0lBR0QsYUFBYTs7Y0FDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUk7O1lBQ2YsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLOzs7Y0FHWixXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUVwRSx3RUFBd0U7UUFDeEUsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckQsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7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QUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUFFLE9BQU8sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzdELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsWUFBWTs7Y0FFckIsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O2NBR3pCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7OztjQUdqRCxTQUFTLEdBQUcsWUFBWSxHQUFHLFVBQVU7UUFFM0MsNEJBQTRCO1FBQzVCLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBOzs7Y0FHeEMsVUFBVSxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFekMsNEJBQTRCO1FBQzVCLG1CQUFBLElBQUksRUFBQSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUUxQywwQkFBMEI7UUFDMUIsbUJBQUEsSUFBSSxFQUFBLENBQUMsT0FBTyxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFakMsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkMsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVDb21tb25zLCBHcmFudWxhcml0eSB9IGZyb20gJy4vZGF0ZS10aW1lLWNvbW1vbnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuXG5cbi8qKlxuKiBDbGFzcyB0byByZXByZXNlbnQgYSBKdWxpYW4gRGF0ZSBhbmQgVGltZVxuKiBUT0RPOiBNb3ZlIHRoaXMgY2xhc3MgdG8gY29tbW9uIGZvbGRlciBhcyBpdCBpcyBuZWVkZWQgYnkgc2VydmVyIGFuZCBjbGllbnRcbiovXG5leHBvcnQgY2xhc3MgSnVsaWFuRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlVGltZUNvbW1vbnMgaW1wbGVtZW50cyBEYXRlVGltZSB7XG5cblxuICAvKipcbiAgKiBNZXRob2RzXG4gICovXG5cbiAgZ2V0RW5kT2YoZHVyYXRpb246IEdyYW51bGFyaXR5ID0gdGhpcy5nZXRHcmFudWxhcml0eSgpKTogSnVsaWFuRGF0ZVRpbWUge1xuXG4gICAgY29uc3QgZHQgPSBuZXcgSnVsaWFuRGF0ZVRpbWUodGhpcyk7XG4gICAgZHQudG9MYXN0U2Vjb25kT2YoZHVyYXRpb24pO1xuXG4gICAgcmV0dXJuIGR0O1xuICB9XG5cblxuICBsZW5ndGhPZk1vbnRoKCkge1xuICAgIGNvbnN0IHkgPSB0aGlzLnllYXI7XG4gICAgbGV0IG0gPSB0aGlzLm1vbnRoO1xuXG4gICAgLy8gQXNzdW1lIG5vdCBsZWFwIHllYXIgYnkgZGVmYXVsdCAobm90ZSB6ZXJvIGluZGV4IGZvciBKYW4pXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG5cbiAgICAvLyBJZiBldmVubHkgZGl2aXNpYmxlIGJ5IDQgYW5kIG5vdCBvbmUgb2YgdGhlIHllYXJzIDUgQkMsIDEgQkMgb3IgNCBBRCxcbiAgICAvLyB3aGVuIEF1Z3VzdHVzIGRyb3BwZWQgdGhlIGxlYXAgeWVhclxuICAgIGlmICghKHkgJSA0KSAmJiAhKHkgPT0gLTUpICYmICEoeSA9PSAtMSkgJiYgISh5ID09IDQpKSB7XG4gICAgICBkYXlzSW5Nb250aFsxXSA9IDI5O1xuICAgIH1cbiAgICByZXR1cm4gZGF5c0luTW9udGhbLS1tXVxuICB9XG5cblxuXG4gIC8qKlxuICAqIENvbnZlcnQgdGhlIHllYXIsIG1vbnRoLCBkYXkgb2YganVsaWFuIGNhbGVuZGFyIHRvIGp1bGlhbiBkYXlcbiAgKlxuICAqIEByZXR1cm4gIGRlc2NyaXB0aW9uXG4gICovXG4gIGdldEp1bGlhbkRheSgpIHtcblxuICAgIC8vIHJ1bm5pbmcgZGF5IChjb251dCBvZiBkYXlzIHRoYXQgeWVhcilcbiAgICBjb25zdCBydW5uaW5nRGF5ID0gdGhpcy5jYWxjUnVubmluZ0RheSh0aGlzLm1vbnRoLCB0aGlzLmRheSwgdGhpcy5pc0xlYXBZZWFyKCkpO1xuICAgIGxldCBydW5uaW5nWWVhcjtcbiAgICBpZiAodGhpcy55ZWFyIDwgMCkge1xuICAgICAgLy8gcnVubmluZyB5ZWFyXG4gICAgICBydW5uaW5nWWVhciA9IDQ3MTYgKyB0aGlzLnllYXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgICAgcnVubmluZ1llYXIgPSA0NzE1ICsgdGhpcy55ZWFyO1xuICAgIH1cblxuICAgIC8vIG51bWJlciBvZiBmdWxsIDQgeWVhciBjeWNsZXNcbiAgICBjb25zdCBuNCA9IE1hdGguZmxvb3IocnVubmluZ1llYXIgLyA0KVxuXG4gICAgLy8gcmVzdCBvZiBkaXZpc2lvbjogbnVtYmVyIG9mIGZ1bGwgeWVhcnMgb2YgdGhlIGxhc3QgdW5jb21wbGV0ZSA0IHllYXJzIGN5Y2xlXG4gICAgY29uc3QgbjEgPSBydW5uaW5nWWVhciAlIDQ7XG5cblxuICAgIHJldHVybiAxNDYxICogbjQgKyAzNjUgKiAobjEgLSAzKSArIHJ1bm5pbmdEYXk7XG4gIH1cblxuXG4gIGZyb21KdWxpYW5EYXkoanVsaWFuRGF5OiBudW1iZXIpIHtcblxuICAgIGlmICh0eXBlb2YganVsaWFuRGF5ID09PSAnc3RyaW5nJykge1xuICAgICAganVsaWFuRGF5ID0gcGFyc2VJbnQoanVsaWFuRGF5LCAxMClcbiAgICB9XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCA0IHllYXIgY3ljbGVzXG4gICAgY29uc3QgbjQgPSBNYXRoLmZsb29yKChqdWxpYW5EYXkgKyAoMyAqIDM2NSkpIC8gMTQ2MSk7XG5cbiAgICAvLyBudW1iZXIgb2YgZGF5cyBvZiB0aGUgbGFzdCB1bmNvbXBsZXRlIDQgeWVhcnMgY3ljbGVcbiAgICBjb25zdCByNCA9IChqdWxpYW5EYXkgKyAoMyAqIDM2NSkpICUgMTQ2MTtcblxuICAgIC8vIG51bWJlciBvZiBmdWxsIHllYXJzIG9mIHRoZSBsYXN0IHVuY29tcGxldGUgNCB5ZWFycyBjeWNsZVxuICAgIGxldCBuMSA9IE1hdGguZmxvb3IocjQgLyAzNjUpO1xuXG4gICAgLy8gbnVtYmVyIG9mIGRheXMgaW4gdGhlIGxhc3QgeWVhclxuICAgIGxldCBkYXlPZlllYXIgPSByNCAlIDM2NTtcblxuICAgIGlmIChuMSA9PT0gNCkge1xuICAgICAgbjEgPSAzO1xuICAgICAgZGF5T2ZZZWFyID0gMzY1O1xuICAgIH1cblxuICAgIC8vIHJ1bm5pbmcgeWVhclxuICAgIGNvbnN0IHJ1bm5pbmdZZWFyID0gNCAqIG40ICsgbjE7XG5cbiAgICAvLyBpZiBCQ1xuICAgIGlmIChydW5uaW5nWWVhciA8PSA0NzE1KSB7XG4gICAgICAvLyByZXN1bHRpbmcgeWVhclxuICAgICAgdGhpcy55ZWFyID0gcnVubmluZ1llYXIgLSA0NzE2O1xuXG4gICAgICAvLyBpZiBBRFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnllYXIgPSBydW5uaW5nWWVhciAtIDQ3MTU7XG5cbiAgICB9XG5cbiAgICBjb25zdCBtb250aERheSA9IHRoaXMuY2FsY0RhdGVCeVJ1bm5pbmdEYXkoZGF5T2ZZZWFyLCB0aGlzLmlzTGVhcFllYXIoKSlcblxuICAgIC8vIHJlc3VsdGluZyBtb250aFxuICAgIHRoaXMubW9udGggPSBtb250aERheS5tb250aDtcblxuICAgIC8vIHJlc3VsdGluZyBkYXlcbiAgICB0aGlzLmRheSA9IG1vbnRoRGF5LmRheTtcblxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICogUmV0dXJucyB0cnVlIGlmIGdpdmVuIHllYXIgaXMgYSBsZWFwIHllYXJcbiAgKi9cbiAgaXNMZWFwWWVhcigpOiBib29sZWFuIHtcblxuICAgIC8vIFJldHVybiB0cnVlIGlmIGV2ZW5seSBkaXZpc2libGUgYnkgNFxuICAgIHJldHVybiAhKHRoaXMueWVhciAlIDQpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cblxuICBnZXRKdWxpYW5TZWNvbmQoKSB7XG4gICAgbGV0IHNlY29uZHMgPSB0aGlzLmdldEp1bGlhbkRheSgpICogNjAgKiA2MCAqIDI0OyAvLyBmaXJzdCBzZWNvbmQgb2YgdGhlIGRheVxuICAgIGlmICh0aGlzLnNlY29uZHMgPiAwKSBzZWNvbmRzID0gc2Vjb25kcyArIHRoaXMuc2Vjb25kcztcbiAgICBpZiAodGhpcy5taW51dGVzID4gMCkgc2Vjb25kcyA9IHNlY29uZHMgKyB0aGlzLm1pbnV0ZXMgKiA2MDtcbiAgICBpZiAodGhpcy5ob3VycyA+IDApIHNlY29uZHMgPSBzZWNvbmRzICsgdGhpcy5ob3VycyAqIDYwICogNjA7XG4gICAgcmV0dXJuIHNlY29uZHM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoaXMgSnVsaWFuRGF0ZVRpbWUgZnJvbSBnaXZlbiBqdWxpYW4gc2Vjb25kXG4gICAqIEBwYXJhbSBqdWxpYW5TZWNvbmQganVsaWFuIHNlY29uZFxuICAgKi9cbiAgZnJvbUp1bGlhblNlY29uZChqdWxpYW5TZWNvbmQpIHtcblxuICAgIGNvbnN0IHNlY3NQZXJEYXkgPSA2MCAqIDYwICogMjQ7XG5cbiAgICAvLyBudW1iZXIgb2YgZnVsbCBkYXlzXG4gICAgY29uc3QganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5TZWNvbmQgLyBzZWNzUGVyRGF5KTtcblxuICAgIC8vIG51bWJlciBvZiBzZWNvbmRzIG9mIHRoZSBqdWxpYW4gZGF5XG4gICAgY29uc3Qgc2Vjc09mRGF5ID0ganVsaWFuU2Vjb25kICUgc2Vjc1BlckRheTtcblxuICAgIC8vIG51bWJlciBvZiBvdXJzIG9mIHRoZSBkYXlcbiAgICB0aGlzLmhvdXJzID0gTWF0aC5mbG9vcihzZWNzT2ZEYXkgLyAoNjAgKiA2MCkpXG5cbiAgICAvLyBudW1iZXIgb2Ygc2Vjb25kcyBvZiB0aGUgbGFzdCBob3VyXG4gICAgY29uc3Qgc2Vjc09mSG91ciA9IHRoaXMuaG91cnMgJSAoNjAgKiA2MCk7XG5cbiAgICAvLyBudW1iZXIgb2Ygb3VycyBvZiB0aGUgZGF5XG4gICAgdGhpcy5taW51dGVzID0gTWF0aC5mbG9vcihzZWNzT2ZIb3VyIC8gNjApXG5cbiAgICAvLyBzZWNzIG9mIHRoZSBsYXN0IG1pbnV0ZVxuICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMubWludXRlcyAlIDYwO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJvbUp1bGlhbkRheShqdWxpYW5EYXkpO1xuXG4gIH1cblxuXG59XG4iXX0=