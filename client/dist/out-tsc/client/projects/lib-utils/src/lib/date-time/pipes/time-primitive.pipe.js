import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { TimePrimitive } from '../classes/time-primitive';
let TimePrimitivePipe = class TimePrimitivePipe {
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    transform(timePrimitive) {
        if (!timePrimitive)
            return null;
        const tp = new TimePrimitive(timePrimitive);
        if (!tp)
            return null;
        const dt = tp.getDateTime();
        if (!dt)
            return null;
        // This is a hack for dataPipe, because datePipe subtracts 1 year from BC
        // Probably to avoid the year 0
        if (dt.year < 0)
            dt.year = dt.year + 1;
        if (!dt.day)
            dt.day = 31;
        const date = dt.getDate();
        return this.datePipe.transform(date, tp.getShortesDateFormatString());
    }
};
TimePrimitivePipe = tslib_1.__decorate([
    Pipe({
        name: 'timePrimitive'
    })
], TimePrimitivePipe);
export { TimePrimitivePipe };
//# sourceMappingURL=time-primitive.pipe.js.map