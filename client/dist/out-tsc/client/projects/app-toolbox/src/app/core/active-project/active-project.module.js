import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectActions } from './active-project.action';
import { ActiveProjectEpics } from './active-project.epics';
import { ActiveProjectService } from './active-project.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ShouldPauseService } from '../services/should-pause.service';
let ActiveProjectModule = class ActiveProjectModule {
};
ActiveProjectModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatDialogModule
        ],
        providers: [
            ShouldPauseService,
            ActiveProjectActions,
            ActiveProjectEpics,
            ActiveProjectService
        ]
    })
], ActiveProjectModule);
export { ActiveProjectModule };
//# sourceMappingURL=active-project.module.js.map