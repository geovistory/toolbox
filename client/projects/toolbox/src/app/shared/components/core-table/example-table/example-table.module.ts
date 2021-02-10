import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreTableFilterModule } from '../filter/filter.module';
import { CoreTableMenuModule } from '../menu/menu.module';
import { CoreTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { ExampleTableComponent } from './example-table.component';
import { MaterialModule } from 'projects/toolbox/src/app/core/material/material.module';

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
