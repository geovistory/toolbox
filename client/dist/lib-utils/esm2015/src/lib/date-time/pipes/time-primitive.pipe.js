/**
 * @fileoverview added by tsickle
 * Generated from: pipes/time-primitive.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { TimePrimitive } from '../classes/time-primitive';
export class TimePrimitivePipe {
    /**
     * @param {?} datePipe
     */
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    /**
     * @param {?} timePrimitive
     * @return {?}
     */
    transform(timePrimitive) {
        if (!timePrimitive)
            return null;
        /** @type {?} */
        const tp = new TimePrimitive(timePrimitive);
        if (!tp)
            return null;
        /** @type {?} */
        const dt = tp.getDateTime();
        if (!dt)
            return null;
        // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
        // Probably to avoid the year 0
        if (dt.year < 0)
            dt.year = dt.year + 1;
        if (!dt.day)
            dt.day = 31;
        /** @type {?} */
        const date = dt.getDate();
        return this.datePipe.transform(date, tp.getShortesDateFormatString());
    }
}
TimePrimitivePipe.decorators = [
    { type: Pipe, args: [{
                name: 'timePrimitive'
            },] }
];
/** @nocollapse */
TimePrimitivePipe.ctorParameters = () => [
    { type: DatePipe }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimePrimitivePipe.prototype.datePipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJwaXBlcy90aW1lLXByaW1pdGl2ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUsxRCxNQUFNLE9BQU8saUJBQWlCOzs7O0lBRTVCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBSSxDQUFDOzs7OztJQUUzQyxTQUFTLENBQUMsYUFBbUM7UUFDM0MsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLElBQUksQ0FBQzs7Y0FFMUIsRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDOztjQUVmLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBRTNCLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFckIseUVBQXlFO1FBQ3pFLCtCQUErQjtRQUMvQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O2NBRW5CLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBRXpCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7SUFFeEUsQ0FBQzs7O1lBNUJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsZUFBZTthQUN0Qjs7OztZQVBRLFFBQVE7Ozs7Ozs7SUFVSCxxQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlIH0gZnJvbSAnLi4vY2xhc3Nlcy90aW1lLXByaW1pdGl2ZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RpbWVQcmltaXRpdmUnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQcmltaXRpdmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHsgfVxuXG4gIHRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlOiBUaW1lUHJpbWl0aXZlV2l0aENhbCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aW1lUHJpbWl0aXZlKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHRwID0gbmV3IFRpbWVQcmltaXRpdmUodGltZVByaW1pdGl2ZSlcblxuICAgIGlmICghdHApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZHQgPSB0cC5nZXREYXRlVGltZSgpO1xuXG4gICAgaWYgKCFkdCkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBUaGlzIGlzIGEgaGFjayBmb3IgZGF0YVBpcGUsIGJlY2F1c2UgZGF0ZVBpcGUgc3VidHJhY3RzIDEgeWVhciBmcm9tIEJDXG4gICAgLy8gUHJvYmFibHkgdG8gYXZvaWQgdGhlIHllYXIgMFxuICAgIGlmIChkdC55ZWFyIDwgMCkgZHQueWVhciA9IGR0LnllYXIgKyAxO1xuXG4gICAgaWYgKCFkdC5kYXkpIGR0LmRheSA9IDMxO1xuXG4gICAgY29uc3QgZGF0ZSA9IGR0LmdldERhdGUoKVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRwLmdldFNob3J0ZXNEYXRlRm9ybWF0U3RyaW5nKCkpO1xuXG4gIH1cblxufVxuXG4iXX0=