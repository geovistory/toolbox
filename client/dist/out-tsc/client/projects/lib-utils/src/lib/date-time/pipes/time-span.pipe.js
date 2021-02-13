import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { TimeSpanUtil } from '../classes/time-span-util';
let TimeSpanPipe = class TimeSpanPipe {
    constructor(timePrimitivePipe) {
        this.timePrimitivePipe = timePrimitivePipe;
    }
    transform(timeSpan) {
        if (!timeSpan)
            return null;
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
    getString(t) {
        const s = this.timePrimitivePipe.transform(t);
        return s ? s : '(?)';
    }
};
TimeSpanPipe = tslib_1.__decorate([
    Pipe({
        name: 'timeSpan'
    })
], TimeSpanPipe);
export { TimeSpanPipe };
//# sourceMappingURL=time-span.pipe.js.map