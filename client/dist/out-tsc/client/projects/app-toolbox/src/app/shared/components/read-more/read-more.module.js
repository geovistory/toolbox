import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from './read-more.component';
import { PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
let ReadMoreModule = class ReadMoreModule {
};
ReadMoreModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            PassiveLinkModule
        ],
        declarations: [
            ReadMoreComponent
        ],
        exports: [
            ReadMoreComponent
        ]
    })
], ReadMoreModule);
export { ReadMoreModule };
//# sourceMappingURL=read-more.module.js.map