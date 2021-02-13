import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfTimePrimitivePipe } from './inf-time-primitive.pipe';
import { TimePrimitivePipe } from '@kleiolab/lib-utils';
let InfTimePrimitivePipeModule = class InfTimePrimitivePipeModule {
};
InfTimePrimitivePipeModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [TimePrimitivePipe],
        declarations: [
            InfTimePrimitivePipe,
        ],
        exports: [
            InfTimePrimitivePipe
        ]
    })
], InfTimePrimitivePipeModule);
export { InfTimePrimitivePipeModule };
//# sourceMappingURL=inf-time-primitive.module.js.map