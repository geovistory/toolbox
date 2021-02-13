import * as tslib_1 from "tslib";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { DrawerContainerResizeComponent } from './drawer-container-resize.component';
let DrawerContainerResizeModule = class DrawerContainerResizeModule {
};
DrawerContainerResizeModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            DragDropModule,
            MaterialModule
        ],
        providers: [],
        declarations: [
            DrawerContainerResizeComponent
        ],
        exports: [
            DrawerContainerResizeComponent
        ]
    })
], DrawerContainerResizeModule);
export { DrawerContainerResizeModule };
//# sourceMappingURL=drawer-container-resize.module.js.map