/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-span.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimePrimitivePipe } from './time-primitive.pipe';
import { TimeSpanUtil } from '../classes/time-span-util';
export class TimeSpanPipe {
    /**
     * @param {?} timePrimitivePipe
     */
    constructor(timePrimitivePipe) {
        this.timePrimitivePipe = timePrimitivePipe;
    }
    /**
     * @param {?} timeSpan
     * @return {?}
     */
    transform(timeSpan) {
        if (!timeSpan)
            return null;
        /** @type {?} */
        const ts = new TimeSpanUtil(timeSpan).getPrimitivesForPreview();
        // nothing
        if (!ts.single && !ts.begin && !ts.end)
            return '';
        // only sinlge
        if (ts.single && !(ts.begin || ts.end))
            return this.getString(ts.single);
        // only begin and end
        if (ts.begin && ts.end && !ts.single)
            return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
        // only sinlge and end
        if (ts.single && ts.end && !ts.begin)
            return this.getString(ts.single) + ' – ' + this.getString(ts.end);
        // only begin and sinlge
        if (ts.begin && ts.single && !ts.end)
            return this.getString(ts.begin) + ' – ' + this.getString(ts.single);
        // all three
        return this.getString(ts.begin) + ' – ' + this.getString(ts.end);
    }
    /**
     * @param {?} t
     * @return {?}
     */
    getString(t) {
        /** @type {?} */
        const s = this.timePrimitivePipe.transform(t);
        return s ? s : '(?)';
    }
}
TimeSpanPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeSpan'
            },] }
];
/** @nocollapse */
TimeSpanPipe.ctorParameters = () => [
    { type: TimePrimitivePipe }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeSpanPipe.prototype.timePrimitivePipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9waXBlcy90aW1lLXNwYW4ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUt6RCxNQUFNLE9BQU8sWUFBWTs7OztJQUV2QixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFJLENBQUM7Ozs7O0lBRTdELFNBQVMsQ0FBQyxRQUFzQjtRQUM5QixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDOztjQUVyQixFQUFFLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsdUJBQXVCLEVBQUU7UUFDL0QsVUFBVTtRQUNWLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFbEQsY0FBYztRQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6RSxxQkFBcUI7UUFDckIsSUFBSSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZHLHNCQUFzQjtRQUN0QixJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEcsd0JBQXdCO1FBQ3hCLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRyxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7SUFDRCxTQUFTLENBQUMsQ0FBTTs7Y0FDUixDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7OztZQWhDRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7YUFDakI7Ozs7WUFMUSxpQkFBaUI7Ozs7Ozs7SUFRWix5Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlUGlwZSB9IGZyb20gJy4vdGltZS1wcmltaXRpdmUucGlwZSc7XG5pbXBvcnQgeyBUaW1lU3BhblV0aWwgfSBmcm9tICcuLi9jbGFzc2VzL3RpbWUtc3Bhbi11dGlsJztcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZVNwYW4nXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTcGFuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZVByaW1pdGl2ZVBpcGU6IFRpbWVQcmltaXRpdmVQaXBlKSB7IH1cblxuICB0cmFuc2Zvcm0odGltZVNwYW46IFRpbWVTcGFuVXRpbCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aW1lU3BhbikgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCB0cyA9IG5ldyBUaW1lU3BhblV0aWwodGltZVNwYW4pLmdldFByaW1pdGl2ZXNGb3JQcmV2aWV3KCk7XG4gICAgLy8gbm90aGluZ1xuICAgIGlmICghdHMuc2luZ2xlICYmICF0cy5iZWdpbiAmJiAhdHMuZW5kKSByZXR1cm4gJyc7XG5cbiAgICAvLyBvbmx5IHNpbmxnZVxuICAgIGlmICh0cy5zaW5nbGUgJiYgISh0cy5iZWdpbiB8fCB0cy5lbmQpKSByZXR1cm4gdGhpcy5nZXRTdHJpbmcodHMuc2luZ2xlKTtcblxuICAgIC8vIG9ubHkgYmVnaW4gYW5kIGVuZFxuICAgIGlmICh0cy5iZWdpbiAmJiB0cy5lbmQgJiYgIXRzLnNpbmdsZSkgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLmJlZ2luKSArICcg4oCTICcgKyB0aGlzLmdldFN0cmluZyh0cy5lbmQpO1xuXG4gICAgLy8gb25seSBzaW5sZ2UgYW5kIGVuZFxuICAgIGlmICh0cy5zaW5nbGUgJiYgdHMuZW5kICYmICF0cy5iZWdpbikgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLnNpbmdsZSkgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuZW5kKTtcblxuICAgIC8vIG9ubHkgYmVnaW4gYW5kIHNpbmxnZVxuICAgIGlmICh0cy5iZWdpbiAmJiB0cy5zaW5nbGUgJiYgIXRzLmVuZCkgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLmJlZ2luKSArICcg4oCTICcgKyB0aGlzLmdldFN0cmluZyh0cy5zaW5nbGUpO1xuXG4gICAgLy8gYWxsIHRocmVlXG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLmJlZ2luKSArICcg4oCTICcgKyB0aGlzLmdldFN0cmluZyh0cy5lbmQpO1xuICB9XG4gIGdldFN0cmluZyh0OiBhbnkpOiBzdHJpbmcge1xuICAgIGNvbnN0IHMgPSB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0KTtcbiAgICByZXR1cm4gcyA/IHMgOiAnKD8pJztcbiAgfVxuXG59XG5cbiJdfQ==