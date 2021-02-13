import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePrimitivePipe } from './pipes/time-primitive.pipe';
import { TimeSpanPipe } from './pipes/time-span.pipe';
let DateTimeModule = class DateTimeModule {
};
DateTimeModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
        ],
        providers: [
            TimePrimitivePipe,
            TimeSpanPipe
        ],
        declarations: [
            TimeSpanPipe,
            TimePrimitivePipe,
        ],
        exports: [
            TimeSpanPipe,
            TimePrimitivePipe,
        ]
    })
], DateTimeModule);
export { DateTimeModule };
//# sourceMappingURL=date-time.module.js.map