import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { BaseModule } from 'projects/app-toolbox/src/app/modules/base/base.module';
import { CopyClipboardModule } from '../../directives/copy-clipboard/copy-clipboard.module';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { NumberDialogModule } from '../number-dialog/number-dialog.module';
import { ValuePreviewModule } from '../value-preview/value-preview.module';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { ColMappingComponent } from './components/table/col-mapping/col-mapping.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    TableComponent,
    ColFilterTextComponent,
    ColFilterNumericComponent,
    ColMappingComponent,
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    EntityPreviewModule,
    ValuePreviewModule,
    BaseModule,
    NumberDialogModule,
    CopyClipboardModule
  ]
})
export class DigitalTableModule { }
