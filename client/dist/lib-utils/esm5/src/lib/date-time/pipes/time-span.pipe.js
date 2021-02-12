/**
 * @fileoverview added by tsickle
 * Generated from: pipes/time-span.pipe.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGFuLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXV0aWxzL3NyYy9saWIvZGF0ZS10aW1lLyIsInNvdXJjZXMiOlsicGlwZXMvdGltZS1zcGFuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFLRSxzQkFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBSSxDQUFDOzs7OztJQUU3RCxnQ0FBUzs7OztJQUFULFVBQVUsUUFBc0I7UUFDOUIsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFFckIsRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHVCQUF1QixFQUFFO1FBQy9ELFVBQVU7UUFDVixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRWxELGNBQWM7UUFDZCxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekUscUJBQXFCO1FBQ3JCLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2RyxzQkFBc0I7UUFDdEIsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhHLHdCQUF3QjtRQUN4QixJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUcsWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBQ0QsZ0NBQVM7Ozs7SUFBVCxVQUFVLENBQU07O1lBQ1IsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDOztnQkFoQ0YsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO2lCQUNqQjs7OztnQkFMUSxpQkFBaUI7O0lBcUMxQixtQkFBQztDQUFBLEFBbENELElBa0NDO1NBL0JZLFlBQVk7Ozs7OztJQUVYLHlDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVQaXBlIH0gZnJvbSAnLi90aW1lLXByaW1pdGl2ZS5waXBlJztcbmltcG9ydCB7IFRpbWVTcGFuVXRpbCB9IGZyb20gJy4uL2NsYXNzZXMvdGltZS1zcGFuLXV0aWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0aW1lU3Bhbidcbn0pXG5leHBvcnQgY2xhc3MgVGltZVNwYW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUpIHsgfVxuXG4gIHRyYW5zZm9ybSh0aW1lU3BhbjogVGltZVNwYW5VdGlsKTogc3RyaW5nIHtcbiAgICBpZiAoIXRpbWVTcGFuKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHRzID0gbmV3IFRpbWVTcGFuVXRpbCh0aW1lU3BhbikuZ2V0UHJpbWl0aXZlc0ZvclByZXZpZXcoKTtcbiAgICAvLyBub3RoaW5nXG4gICAgaWYgKCF0cy5zaW5nbGUgJiYgIXRzLmJlZ2luICYmICF0cy5lbmQpIHJldHVybiAnJztcblxuICAgIC8vIG9ubHkgc2lubGdlXG4gICAgaWYgKHRzLnNpbmdsZSAmJiAhKHRzLmJlZ2luIHx8IHRzLmVuZCkpIHJldHVybiB0aGlzLmdldFN0cmluZyh0cy5zaW5nbGUpO1xuXG4gICAgLy8gb25seSBiZWdpbiBhbmQgZW5kXG4gICAgaWYgKHRzLmJlZ2luICYmIHRzLmVuZCAmJiAhdHMuc2luZ2xlKSByZXR1cm4gdGhpcy5nZXRTdHJpbmcodHMuYmVnaW4pICsgJyDigJMgJyArIHRoaXMuZ2V0U3RyaW5nKHRzLmVuZCk7XG5cbiAgICAvLyBvbmx5IHNpbmxnZSBhbmQgZW5kXG4gICAgaWYgKHRzLnNpbmdsZSAmJiB0cy5lbmQgJiYgIXRzLmJlZ2luKSByZXR1cm4gdGhpcy5nZXRTdHJpbmcodHMuc2luZ2xlKSArICcg4oCTICcgKyB0aGlzLmdldFN0cmluZyh0cy5lbmQpO1xuXG4gICAgLy8gb25seSBiZWdpbiBhbmQgc2lubGdlXG4gICAgaWYgKHRzLmJlZ2luICYmIHRzLnNpbmdsZSAmJiAhdHMuZW5kKSByZXR1cm4gdGhpcy5nZXRTdHJpbmcodHMuYmVnaW4pICsgJyDigJMgJyArIHRoaXMuZ2V0U3RyaW5nKHRzLnNpbmdsZSk7XG5cbiAgICAvLyBhbGwgdGhyZWVcbiAgICByZXR1cm4gdGhpcy5nZXRTdHJpbmcodHMuYmVnaW4pICsgJyDigJMgJyArIHRoaXMuZ2V0U3RyaW5nKHRzLmVuZCk7XG4gIH1cbiAgZ2V0U3RyaW5nKHQ6IGFueSk6IHN0cmluZyB7XG4gICAgY29uc3QgcyA9IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHQpO1xuICAgIHJldHVybiBzID8gcyA6ICcoPyknO1xuICB9XG5cbn1cblxuIl19