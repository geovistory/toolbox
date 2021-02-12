/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/pipes/time-span.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimePrimitivePipe } from './time-primitive.pipe';
import { TimeSpanUtil } from '../classes/time-span-util';
var TimeSpanPipe = /** @class */ (function () {
    function TimeSpanPipe(timePrimitivePipe) {
        this.timePrimitivePipe = timePrimitivePipe;
    }
    /**
     * @param {?} timeSpan
     * @return {?}
     */
    TimeSpanPipe.prototype.transform = /**
     * @param {?} timeSpan
     * @return {?}
     */
    function (timeSpan) {
        if (!timeSpan)
            return null;
        /** @type {?} */
        var ts = new TimeSpanUtil(timeSpan).getPrimitivesForPreview();
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
    };
    /**
     * @param {?} t
     * @return {?}
     */
    TimeSpanPipe.prototype.getString = /**
     * @param {?} t
     * @return {?}
     */
    function (t) {
        /** @type {?} */
        var s = this.timePrimitivePipe.transform(t);
        return s ? s : '(?)';
    };
    TimeSpanPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeSpan'
                },] }
    ];
    /** @nocollapse */
    TimeSpanPipe.ctorParameters = function () { return [
        { type: TimePrimitivePipe }
    ]; };
    return TimeSpanPipe;
}());
export { TimeSpanPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimeSpanPipe.prototype.timePrimitivePipe;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9waXBlcy90aW1lLXNwYW4ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RDtJQUtFLHNCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFJLENBQUM7Ozs7O0lBRTdELGdDQUFTOzs7O0lBQVQsVUFBVSxRQUFzQjtRQUM5QixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDOztZQUVyQixFQUFFLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsdUJBQXVCLEVBQUU7UUFDL0QsVUFBVTtRQUNWLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFbEQsY0FBYztRQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6RSxxQkFBcUI7UUFDckIsSUFBSSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZHLHNCQUFzQjtRQUN0QixJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEcsd0JBQXdCO1FBQ3hCLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRyxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7SUFDRCxnQ0FBUzs7OztJQUFULFVBQVUsQ0FBTTs7WUFDUixDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7O2dCQWhDRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCOzs7O2dCQUxRLGlCQUFpQjs7SUFxQzFCLG1CQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0EvQlksWUFBWTs7Ozs7O0lBRVgseUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZVBpcGUgfSBmcm9tICcuL3RpbWUtcHJpbWl0aXZlLnBpcGUnO1xuaW1wb3J0IHsgVGltZVNwYW5VdGlsIH0gZnJvbSAnLi4vY2xhc3Nlcy90aW1lLXNwYW4tdXRpbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RpbWVTcGFuJ1xufSlcbmV4cG9ydCBjbGFzcyBUaW1lU3BhblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSkgeyB9XG5cbiAgdHJhbnNmb3JtKHRpbWVTcGFuOiBUaW1lU3BhblV0aWwpOiBzdHJpbmcge1xuICAgIGlmICghdGltZVNwYW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgdHMgPSBuZXcgVGltZVNwYW5VdGlsKHRpbWVTcGFuKS5nZXRQcmltaXRpdmVzRm9yUHJldmlldygpO1xuICAgIC8vIG5vdGhpbmdcbiAgICBpZiAoIXRzLnNpbmdsZSAmJiAhdHMuYmVnaW4gJiYgIXRzLmVuZCkgcmV0dXJuICcnO1xuXG4gICAgLy8gb25seSBzaW5sZ2VcbiAgICBpZiAodHMuc2luZ2xlICYmICEodHMuYmVnaW4gfHwgdHMuZW5kKSkgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKHRzLnNpbmdsZSk7XG5cbiAgICAvLyBvbmx5IGJlZ2luIGFuZCBlbmRcbiAgICBpZiAodHMuYmVnaW4gJiYgdHMuZW5kICYmICF0cy5zaW5nbGUpIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuZW5kKTtcblxuICAgIC8vIG9ubHkgc2lubGdlIGFuZCBlbmRcbiAgICBpZiAodHMuc2luZ2xlICYmIHRzLmVuZCAmJiAhdHMuYmVnaW4pIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5zaW5nbGUpICsgJyDigJMgJyArIHRoaXMuZ2V0U3RyaW5nKHRzLmVuZCk7XG5cbiAgICAvLyBvbmx5IGJlZ2luIGFuZCBzaW5sZ2VcbiAgICBpZiAodHMuYmVnaW4gJiYgdHMuc2luZ2xlICYmICF0cy5lbmQpIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuc2luZ2xlKTtcblxuICAgIC8vIGFsbCB0aHJlZVxuICAgIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5iZWdpbikgKyAnIOKAkyAnICsgdGhpcy5nZXRTdHJpbmcodHMuZW5kKTtcbiAgfVxuICBnZXRTdHJpbmcodDogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBzID0gdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odCk7XG4gICAgcmV0dXJuIHMgPyBzIDogJyg/KSc7XG4gIH1cblxufVxuXG4iXX0=