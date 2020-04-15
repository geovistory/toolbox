import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from 'app/core/material/material.module';
import { TableModule } from 'primeng/table';
import { ColFilterTextComponent } from './components/table/col-filter-text/col-filter-text.component';
import { ColFilterNumericComponent } from './components/table/col-filter-numeric/col-filter-numeric.component';



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
    TableModule
  ]
})
export class DigitalTableModule { }
