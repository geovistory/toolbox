import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { U } from 'projects/app-toolbox/src/app/core/util/util';
let InfTimePrimitivePipe = class InfTimePrimitivePipe {
    constructor(timePrimitivePipe) {
        this.timePrimitivePipe = timePrimitivePipe;
    }
    transform(statement) {
        if (!statement)
            return '';
        if (!statement.object_time_primitive || !Object.keys(statement.object_time_primitive).length)
            return '';
        return this.timePrimitivePipe.transform(U.infStatement2TimePrimitive(statement));
    }
};
InfTimePrimitivePipe = tslib_1.__decorate([
    Pipe({
        name: 'infTimePrimitiveStatement'
    })
], InfTimePrimitivePipe);
export { InfTimePrimitivePipe };
//# sourceMappingURL=inf-time-primitive.pipe.js.map