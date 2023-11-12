import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../core/material/material.module';
import { CoreTableFilterModule } from '../filter/filter.module';
import { CoreTableMenuModule } from '../menu/menu.module';
import { CoreTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { ExampleTableComponent } from './example-table.component';

const components = [ExampleTableComponent];

@NgModule({
  imports: [
    CommonModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    MaterialModule
  ],
  declarations: components,
  exports: components,
})
export class ExampleTableModule { }
