import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';
let HighlightModule = class HighlightModule {
};
HighlightModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            HighlightPipe
        ],
        exports: [
            HighlightPipe
        ]
    })
], HighlightModule);
export { HighlightModule };
//# sourceMappingURL=highlight.module.js.map