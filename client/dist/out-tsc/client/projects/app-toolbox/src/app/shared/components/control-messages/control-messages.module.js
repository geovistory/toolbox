import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages.component';
import { MatFormFieldModule } from '@angular/material';
let ControlMessagesModule = class ControlMessagesModule {
};
ControlMessagesModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatFormFieldModule
        ],
        declarations: [
            ControlMessagesComponent
        ],
        exports: [
            ControlMessagesComponent
        ]
    })
], ControlMessagesModule);
export { ControlMessagesModule };
//# sourceMappingURL=control-messages.module.js.map