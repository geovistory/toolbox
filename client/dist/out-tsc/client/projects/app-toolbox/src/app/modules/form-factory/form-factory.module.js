import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFactoryService } from './services/form-factory.service';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
let FormFactoryModule = class FormFactoryModule {
};
FormFactoryModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, FormsModule, ReactiveFormsModule, PortalModule],
        exports: [PortalModule],
        providers: [FormFactoryService]
    })
], FormFactoryModule);
export { FormFactoryModule };
//# sourceMappingURL=form-factory.module.js.map