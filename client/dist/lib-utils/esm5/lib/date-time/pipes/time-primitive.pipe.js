/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-primitive.pipe.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3BpcGVzL3RpbWUtcHJpbWl0aXZlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTFEO0lBS0UsMkJBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBSSxDQUFDOzs7OztJQUUzQyxxQ0FBUzs7OztJQUFULFVBQVUsYUFBNEI7UUFDcEMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFFMUIsRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDOztZQUVmLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBRTNCLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFckIseUVBQXlFO1FBQ3pFLCtCQUErQjtRQUMvQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O1lBRW5CLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBRXpCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7SUFFeEUsQ0FBQzs7Z0JBNUJGLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsZUFBZTtpQkFDdEI7Ozs7Z0JBTFEsUUFBUTs7SUFpQ2pCLHdCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0EzQlksaUJBQWlCOzs7Ozs7SUFFaEIscUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZSB9IGZyb20gJy4uL2NsYXNzZXMvdGltZS1wcmltaXRpdmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0aW1lUHJpbWl0aXZlJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lUHJpbWl0aXZlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlKSB7IH1cblxuICB0cmFuc2Zvcm0odGltZVByaW1pdGl2ZTogVGltZVByaW1pdGl2ZSk6IHN0cmluZyB7XG4gICAgaWYgKCF0aW1lUHJpbWl0aXZlKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHRwID0gbmV3IFRpbWVQcmltaXRpdmUodGltZVByaW1pdGl2ZSlcblxuICAgIGlmICghdHApIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZHQgPSB0cC5nZXREYXRlVGltZSgpO1xuXG4gICAgaWYgKCFkdCkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBUaGlzIGlzIGEgaGFjayBmb3IgZGF0YVBpcGUsIGJlY2F1c2UgZGF0ZVBpcGUgc3VidHJhY3RzIDEgeWVhciBmcm9tIEJDXG4gICAgLy8gUHJvYmFibHkgdG8gYXZvaWQgdGhlIHllYXIgMFxuICAgIGlmIChkdC55ZWFyIDwgMCkgZHQueWVhciA9IGR0LnllYXIgKyAxO1xuXG4gICAgaWYgKCFkdC5kYXkpIGR0LmRheSA9IDMxO1xuXG4gICAgY29uc3QgZGF0ZSA9IGR0LmdldERhdGUoKVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIHRwLmdldFNob3J0ZXNEYXRlRm9ybWF0U3RyaW5nKCkpO1xuXG4gIH1cblxufVxuXG4iXX0=