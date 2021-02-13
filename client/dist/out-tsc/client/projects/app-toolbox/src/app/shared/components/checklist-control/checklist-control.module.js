import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { ChecklistControlService } from './services/checklist-control.service';
let ChecklistControlModule = class ChecklistControlModule {
};
ChecklistControlModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule
        ],
        providers: [ChecklistControlService]
    })
], ChecklistControlModule);
export { ChecklistControlModule };
//# sourceMappingURL=checklist-control.module.js.map