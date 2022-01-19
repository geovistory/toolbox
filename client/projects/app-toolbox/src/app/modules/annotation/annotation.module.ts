import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { TileHeaderModule } from 'projects/app-toolbox/src/app/shared/components/tile-header/tile-header.module';
import { EntityPreviewModule } from '../../shared/components/entity-preview/entity-preview.module';
import { ValuePreviewModule } from '../../shared/components/value-preview/value-preview.module';
import { BaseModule } from '../base/base.module';
import { FactoidListComponent } from './components/factoid-list/factoid-list.component';
import { GraphPathComponent } from './components/graph-path/graph-path.component';
import { RamListEditDialogComponent } from './components/ram-list-edit-dialog/ram-list-edit-dialog.component';
import { RamListRemoveDialogComponent } from './components/ram-list-remove-dialog/ram-list-remove-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    TileHeaderModule,
    DndModule,
    TableModule,
    MaterialModule,
    EntityPreviewModule,
    ValuePreviewModule,
  ],
  providers: [],
  declarations: [GraphPathComponent,
    RamListEditDialogComponent, RamListRemoveDialogComponent, FactoidListComponent],
  exports: [FactoidListComponent],
})
export class AnnotationModule { }
