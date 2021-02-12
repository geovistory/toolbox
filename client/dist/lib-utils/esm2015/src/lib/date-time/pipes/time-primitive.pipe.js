/**
 * @fileoverview added by tsickle
 * Generated from: pipes/time-primitive.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1wcmltaXRpdmUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItdXRpbHMvc3JjL2xpYi9kYXRlLXRpbWUvIiwic291cmNlcyI6WyJwaXBlcy90aW1lLXByaW1pdGl2ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUsxRCxNQUFNLE9BQU8saUJBQWlCOzs7O0lBRTVCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBSSxDQUFDOzs7OztJQUUzQyxTQUFTLENBQUMsYUFBNEI7UUFDcEMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLElBQUksQ0FBQzs7Y0FFMUIsRUFBRSxHQUFHLElBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUUzQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDOztjQUVmLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO1FBRTNCLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFckIseUVBQXlFO1FBQ3pFLCtCQUErQjtRQUMvQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O2NBRW5CLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFO1FBRXpCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7SUFFeEUsQ0FBQzs7O1lBNUJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsZUFBZTthQUN0Qjs7OztZQUxRLFFBQVE7Ozs7Ozs7SUFRSCxxQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlIH0gZnJvbSAnLi4vY2xhc3Nlcy90aW1lLXByaW1pdGl2ZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RpbWVQcmltaXRpdmUnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQcmltaXRpdmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHsgfVxuXG4gIHRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlOiBUaW1lUHJpbWl0aXZlKTogc3RyaW5nIHtcbiAgICBpZiAoIXRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgdHAgPSBuZXcgVGltZVByaW1pdGl2ZSh0aW1lUHJpbWl0aXZlKVxuXG4gICAgaWYgKCF0cCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBkdCA9IHRwLmdldERhdGVUaW1lKCk7XG5cbiAgICBpZiAoIWR0KSByZXR1cm4gbnVsbDtcblxuICAgIC8vIFRoaXMgaXMgYSBoYWNrIGZvciBkYXRhUGlwZSwgYmVjYXVzZSBkYXRlUGlwZSBzdWJ0cmFjdHMgMSB5ZWFyIGZyb20gQkNcbiAgICAvLyBQcm9iYWJseSB0byBhdm9pZCB0aGUgeWVhciAwXG4gICAgaWYgKGR0LnllYXIgPCAwKSBkdC55ZWFyID0gZHQueWVhciArIDE7XG5cbiAgICBpZiAoIWR0LmRheSkgZHQuZGF5ID0gMzE7XG5cbiAgICBjb25zdCBkYXRlID0gZHQuZ2V0RGF0ZSgpXG5cbiAgICByZXR1cm4gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgdHAuZ2V0U2hvcnRlc0RhdGVGb3JtYXRTdHJpbmcoKSk7XG5cbiAgfVxuXG59XG5cbiJdfQ==