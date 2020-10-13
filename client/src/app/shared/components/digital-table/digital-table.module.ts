import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/core/material/material.module';
import { BaseModule } from 'app/modules/base/base.module';
import { CtrlEntityComponent } from 'app/modules/base/components/ctrl-entity/ctrl-entity.component';
import { TableModule } from 'primeng/table';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    TableComponent,
    ColFilterTextComponent,
    ColFilterNumericComponent,
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    EntityPreviewModule,
    BaseModule
  ]
})
export class DigitalTableModule { }
