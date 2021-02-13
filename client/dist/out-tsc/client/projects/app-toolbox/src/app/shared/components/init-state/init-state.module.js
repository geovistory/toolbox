import * as tslib_1 from "tslib";
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitStateComponent } from './init-state.component';
import { ActiveProjectModule } from 'projects/app-toolbox/src/app/core/active-project';
let InitStateModule = class InitStateModule {
};
InitStateModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            NgReduxModule,
            RouterModule,
            ActiveProjectModule
        ],
        declarations: [
            InitStateComponent
        ],
        exports: [
            InitStateComponent,
        ]
    })
], InitStateModule);
export { InitStateModule };
//# sourceMappingURL=init-state.module.js.map