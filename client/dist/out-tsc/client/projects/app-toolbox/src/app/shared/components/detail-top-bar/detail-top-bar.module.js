import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { DetailTopBarComponent } from './detail-top-bar.component';
let DetailTopBarModule = class DetailTopBarModule {
};
DetailTopBarModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FlexLayoutModule,
            MaterialModule
        ],
        declarations: [DetailTopBarComponent],
        exports: [DetailTopBarComponent]
    })
], DetailTopBarModule);
export { DetailTopBarModule };
//# sourceMappingURL=detail-top-bar.module.js.map