import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let KeysPipe = class KeysPipe {
    transform(value, args) {
        const keys = [];
        for (const key in value) {
            if (value[key]) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    }
};
KeysPipe = tslib_1.__decorate([
    Pipe({ name: 'keys' })
], KeysPipe);
export { KeysPipe };
//# sourceMappingURL=keys.pipe.js.map