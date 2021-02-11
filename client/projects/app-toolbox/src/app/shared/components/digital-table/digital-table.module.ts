import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { BaseModule } from 'projects/app-toolbox/src/app/modules/base/base.module';
import { CtrlEntityComponent } from 'projects/app-toolbox/src/app/modules/base/components/ctrl-entity/ctrl-entity.component';
import { TableModule } from 'primeng/table';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { TableComponent } from './components/table/table.component';
import { EntityMatcherComponent } from './components/table/entity-matcher/entity-matcher.component';


@NgModule({
  declarations: [
    TableComponent,
    ColFilterTextComponent,
    ColFilterNumericComponent,
    EntityMatcherComponent
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
