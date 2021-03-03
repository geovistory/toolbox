/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-primitive.pipe.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3BpcGVzL3RpbWUtcHJpbWl0aXZlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSzFELE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFFNUIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7Ozs7O0lBRTNDLFNBQVMsQ0FBQyxhQUFtQztRQUMzQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sSUFBSSxDQUFDOztjQUUxQixFQUFFLEdBQUcsSUFBSSxhQUFhLENBQUMsYUFBYSxDQUFDO1FBRTNDLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7O2NBRWYsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFFM0IsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVyQix5RUFBeUU7UUFDekUsK0JBQStCO1FBQy9CLElBQUksRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO1lBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7Y0FFbkIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFFekIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztJQUV4RSxDQUFDOzs7WUE1QkYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxlQUFlO2FBQ3RCOzs7O1lBUFEsUUFBUTs7Ozs7OztJQVVILHFDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmUgfSBmcm9tICcuLi9jbGFzc2VzL3RpbWUtcHJpbWl0aXZlJztcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZVByaW1pdGl2ZSdcbn0pXG5leHBvcnQgY2xhc3MgVGltZVByaW1pdGl2ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSkgeyB9XG5cbiAgdHJhbnNmb3JtKHRpbWVQcmltaXRpdmU6IFRpbWVQcmltaXRpdmVXaXRoQ2FsKTogc3RyaW5nIHtcbiAgICBpZiAoIXRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgdHAgPSBuZXcgVGltZVByaW1pdGl2ZSh0aW1lUHJpbWl0aXZlKVxuXG4gICAgaWYgKCF0cCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBkdCA9IHRwLmdldERhdGVUaW1lKCk7XG5cbiAgICBpZiAoIWR0KSByZXR1cm4gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMgYSBoYWNrIGZvciBkYXRhUGlwZSwgYmVjYXVzZSBkYXRlUGlwZSBzdWJ0cmFjdHMgMSB5ZWFyIGZyb20gQkNcbiAgICAvLyBQcm9iYWJseSB0byBhdm9pZCB0aGUgeWVhciAwXG4gICAgaWYgKGR0LnllYXIgPCAwKSBkdC55ZWFyID0gZHQueWVhciArIDE7XG5cbiAgICBpZiAoIWR0LmRheSkgZHQuZGF5ID0gMzE7XG5cbiAgICBjb25zdCBkYXRlID0gZHQuZ2V0RGF0ZSgpXG5cbiAgICByZXR1cm4gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdHAuZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKSk7XG5cbiAgfVxuXG59XG5cbiJdfQ==