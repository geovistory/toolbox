import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { BaseModule } from 'projects/app-toolbox/src/app/modules/base/base.module';
import { EntityPreviewModule } from '../entity-preview/entity-preview.module';
import { ValuePreviewModule } from '../value-preview/value-preview.module';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { ColMappingComponent } from './components/table/col-mapping/col-mapping.component';
import { EntityMatcherComponent } from './components/table/entity-matcher/entity-matcher.component';
import { TableComponent } from './components/table/table.component';
import { ValueMatcherComponent } from './components/table/value-matcher/value-matcher.component';


@NgModule({
  declarations: [
    TableComponent,
    ColFilterTextComponent,
    ColFilterNumericComponent,
    ColMappingComponent,
    EntityMatcherComponent,
    ValueMatcherComponent
  ],
  exports: [
    TableComponent
  ],
  entryComponents: [ColMappingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    EntityPreviewModule,
    ValuePreviewModule,
    BaseModule
  ]
})
export class DigitalTableModule { }