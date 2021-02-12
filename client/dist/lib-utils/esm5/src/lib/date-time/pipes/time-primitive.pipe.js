/**
 * @fileoverview added by tsickle
 * Generated from: pipes/time-primitive.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimePrimitive } from '../classes/time-primitive';
var TimePrimitivePipe = /** @class */ (function () {
    function TimePrimitivePipe(datePipe) {
        this.datePipe = datePipe;
    }
    /**
     * @param {?} timePrimitive
     * @return {?}
     */
    TimePrimitivePipe.prototype.transform = /**
     * @param {?} timePrimitive
     * @return {?}
     */
    function (timePrimitive) {
        if (!timePrimitive)
            return null;
        /** @type {?} */
        var tp = new TimePrimitive(timePrimitive);
        if (!tp)
            return null;
        /** @type {?} */
        var dt = tp.getDateTime();
        if (!dt)
            return null;
        // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
        // Probably to avoid the year 0
        if (dt.year < 0)
            dt.year = dt.year + 1;
        if (!dt.day)
            dt.day = 31;
        /** @type {?} */
        var date = dt.getDate();
        return this.datePipe.transform(date, tp.getShortesDateFormatString());
    };
    TimePrimitivePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timePrimitive'
                },] }
    ];
    /** @nocollapse */
    TimePrimitivePipe.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    return TimePrimitivePipe;
}());
export { TimePrimitivePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimePrimitivePipe.prototype.datePipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJwaXBlcy90aW1lLXByaW1pdGl2ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRDtJQUtFLDJCQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUksQ0FBQzs7Ozs7SUFFM0MscUNBQVM7Ozs7SUFBVCxVQUFVLGFBQTRCO1FBQ3BDLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTyxJQUFJLENBQUM7O1lBRTFCLEVBQUUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFFM0MsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFFZixFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRTtRQUUzQixJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXJCLHlFQUF5RTtRQUN6RSwrQkFBK0I7UUFDL0IsSUFBSSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUM7WUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRztZQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztZQUVuQixJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUV6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO0lBRXhFLENBQUM7O2dCQTVCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLGVBQWU7aUJBQ3RCOzs7O2dCQUxRLFFBQVE7O0lBaUNqQix3QkFBQztDQUFBLEFBOUJELElBOEJDO1NBM0JZLGlCQUFpQjs7Ozs7O0lBRWhCLHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmUgfSBmcm9tICcuLi9jbGFzc2VzL3RpbWUtcHJpbWl0aXZlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZVByaW1pdGl2ZSdcbn0pXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSkgeyB9XG5cbiAgdHJhbnNmb3JtKHRpbWVQcmltaXRpdmU6IFRpbWVQcmltaXRpdmUpOiBzdHJpbmcge1xuICAgIGlmICghdGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCB0cCA9IG5ldyBUaW1lUHJpbWl0aXZlKHRpbWVQcmltaXRpdmUpXG5cbiAgICBpZiAoIXRwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGR0ID0gdHAuZ2V0RGF0ZVRpbWUoKTtcblxuICAgIGlmICghZHQpIHJldHVybiBudWxsO1xuXG4gICAgLy8gVGhpcyBpcyBhIGhhY2sgZm9yIGRhdGFQaXBlLCBiZWNhdXNlIGRhdGVQaXBlIHN1YnRyYWN0cyAxIHllYXIgZnJvbSBCQ1xuICAgIC8vIFByb2JhYmx5IHRvIGF2b2lkIHRoZSB5ZWFyIDBcbiAgICBpZiAoZHQueWVhciA8IDApIGR0LnllYXIgPSBkdC55ZWFyICsgMTtcblxuICAgIGlmICghZHQuZGF5KSBkdC5kYXkgPSAzMTtcblxuICAgIGNvbnN0IGRhdGUgPSBkdC5nZXREYXRlKClcblxuICAgIHJldHVybiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCB0cC5nZXRTaG9ydGVzRGF0ZUZvcm1hdFN0cmluZygpKTtcblxuICB9XG5cbn1cblxuIl19