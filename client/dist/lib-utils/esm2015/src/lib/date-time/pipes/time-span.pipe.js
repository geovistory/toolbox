/**
 * @fileoverview added by tsickle
 * Generated from: pipes/time-span.pipe.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsicGlwZXMvdGltZS1zcGFuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLekQsTUFBTSxPQUFPLFlBQVk7Ozs7SUFFdkIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBSSxDQUFDOzs7OztJQUU3RCxTQUFTLENBQUMsUUFBc0I7UUFDOUIsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQzs7Y0FFckIsRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHVCQUF1QixFQUFFO1FBQy9ELFVBQVU7UUFDVixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRWxELGNBQWM7UUFDZCxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekUscUJBQXFCO1FBQ3JCLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2RyxzQkFBc0I7UUFDdEIsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhHLHdCQUF3QjtRQUN4QixJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUcsWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBQ0QsU0FBUyxDQUFDLENBQU07O2NBQ1IsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7WUFoQ0YsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxVQUFVO2FBQ2pCOzs7O1lBTFEsaUJBQWlCOzs7Ozs7O0lBUVoseUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZVBpcGUgfSBmcm9tICcuL3RpbWUtcHJpbWl0aXZlLnBpcGUnO1xuaW1wb3J0IHsgVGltZVNwYW5VdGlsIH0gZnJvbSAnLi4vY2xhc3Nlcy90aW1lLXNwYW4tdXRpbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RpbWVTcGFuJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lU3BhblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSkgeyB9XG5cbiAgdHJhbnNmb3JtKHRpbWVTcGFuOiBUaW1lU3BhblV0aWwpOiBzdHJpbmcge1xuICAgIGlmICghdGltZVNwYW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgdHMgPSBuZXcgVGltZVNwYW5VdGlsKHRpbWVTcGFuKS5nZXRQcmltaXRpdmVzRm9yUHJldmlldygpO1xuICAgIC8vIG5vdGhpbmdcbiAgICBpZiAoIXRzLnNpbmdsZSAmJiAhdHMuYmVnaW4gJiYgIXRzLmVuZCkgcmV0dXJuICcnO1xuXG4gICAgLy8gb25seSBzaW5sZ2VcbiAgICBpZiAodHMuc2luZ2xlICYmICEodHMuYmVnaW4gfHwgdHMuZW5kKSkgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLnNpbmdsZSk7XG5cbiAgICAvLyBvbmx5IGJlZ2luIGFuZCBlbmRcbiAgICBpZiAodHMuYmVnaW4gJiYgdHMuZW5kICYmICF0cy5zaW5nbGUpIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuZW5kKTtcblxuICAgIC8vIG9ubHkgc2lubGdlIGFuZCBlbmRcbiAgICBpZiAodHMuc2luZ2xlICYmIHRzLmVuZCAmJiAhdHMuYmVnaW4pIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5zaW5nbGUpICsgJyDigJMgJyArIHRoaXMuZ2V0U3RyaW5nKHRzLmVuZCk7XG5cbiAgICAvLyBvbmx5IGJlZ2luIGFuZCBzaW5sZ2VcbiAgICBpZiAodHMuYmVnaW4gJiYgdHMuc2luZ2xlICYmICF0cy5lbmQpIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuc2luZ2xlKTtcblxuICAgIC8vIGFsbCB0aHJlZVxuICAgIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuZW5kKTtcbiAgfVxuICBnZXRTdHJpbmcodDogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBzID0gdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odCk7XG4gICAgcmV0dXJuIHMgPyBzIDogJyg/KSc7XG4gIH1cblxufVxuXG4iXX0=