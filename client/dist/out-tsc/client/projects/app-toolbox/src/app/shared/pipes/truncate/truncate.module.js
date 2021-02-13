import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
let TruncateModule = class TruncateModule {
};
TruncateModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [TruncatePipe],
        declarations: [TruncatePipe],
        exports: [TruncatePipe]
    })
], TruncateModule);
export { TruncateModule };
//# sourceMappingURL=truncate.module.js.map