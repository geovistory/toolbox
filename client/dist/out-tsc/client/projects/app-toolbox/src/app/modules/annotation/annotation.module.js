import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TileHeaderModule } from 'projects/app-toolbox/src/app/shared/components/tile-header/tile-header.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
import { DigitalPreviewModule } from '../../shared/components/digital-preview/digital-preview.module';
import { BaseModule } from '../base/base.module';
import { GraphPathComponent } from './components/graph-path/graph-path.component';
import { MentioningCreateCtrlComponent } from './components/mentioning-create-ctrl/mentioning-create-ctrl.component';
import { MentioningListComponent } from './components/mentioning-list/mentioning-list.component';
import { RamListEditDialogComponent } from './components/ram-list-edit-dialog/ram-list-edit-dialog.component';
import { RamListComponent } from './components/ram-list/ram-list.component';
import { RamListRemoveDialogComponent } from './components/ram-list-remove-dialog/ram-list-remove-dialog.component';
import { FactoidListComponent } from './components/factoid-list/factoid-list.component';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
let AnnotationModule = class AnnotationModule {
};
AnnotationModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            BaseModule,
            TileHeaderModule,
            DndModule,
            TableModule,
            DigitalPreviewModule,
            MaterialModule
        ],
        providers: [],
        declarations: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent, GraphPathComponent, RamListEditDialogComponent, RamListRemoveDialogComponent, FactoidListComponent],
        exports: [MentioningListComponent, MentioningCreateCtrlComponent, RamListComponent, FactoidListComponent],
        entryComponents: [RamListEditDialogComponent, RamListRemoveDialogComponent, FactoidListComponent]
    })
], AnnotationModule);
export { AnnotationModule };
//# sourceMappingURL=annotation.module.js.map