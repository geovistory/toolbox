import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/core/material/material.module';
import { TableModule } from 'primeng/table';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { TableComponent } from './components/table/table.component';




@NgModule({
  declarations: [
    TableComponent,
    ColFilterTextComponent,
    ColFilterNumericComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
  ]
})
export class DigitalTableModule { }