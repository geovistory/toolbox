import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntoPropertyInfoComponent } from './onto-property-info/onto-property-info.component';
import { OntoClassInfoComponent } from './onto-class-info/onto-class-info.component';
const comonents = [OntoClassInfoComponent, OntoPropertyInfoComponent];
let OntoInfoModule = class OntoInfoModule {
};
OntoInfoModule = tslib_1.__decorate([
    NgModule({
        declarations: comonents,
        exports: comonents,
        imports: [
            CommonModule
        ]
    })
], OntoInfoModule);
export { OntoInfoModule };
//# sourceMappingURL=onto-info.module.js.map