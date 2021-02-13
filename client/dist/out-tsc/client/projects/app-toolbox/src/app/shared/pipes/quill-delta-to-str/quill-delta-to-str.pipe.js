import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let QuillOpsToStrPipe = class QuillOpsToStrPipe {
    transform(ops) {
        if (!ops || !ops.length)
            return '';
        return ops.map(op => op.insert).join('');
    }
};
QuillOpsToStrPipe = tslib_1.__decorate([
    Pipe({
        name: 'quillOpsToStr'
    })
], QuillOpsToStrPipe);
export { QuillOpsToStrPipe };
//# sourceMappingURL=quill-delta-to-str.pipe.js.map