import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let TruncatePipe = class TruncatePipe {
    transform(value, args) {
        if (!value)
            return '';
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
};
TruncatePipe = tslib_1.__decorate([
    Pipe({
        name: 'truncate'
    })
], TruncatePipe);
export { TruncatePipe };
//# sourceMappingURL=truncate.pipe.js.map