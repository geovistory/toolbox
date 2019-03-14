import { NgModule } from '@angular/core';
import { ExampleTableComponent } from './example-table.component';
import { CoreTableFilterModule } from '../filter/filter.module';
import { CoreTableMenuModule } from '../menu/menu.module';
import { CoreTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { MatProgressBarModule, MatTableModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';

const components = [ExampleTableComponent];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    MatProgressBarModule,
  ],
  declarations: components,
  exports: components,
})
export class ExampleTableModule { }
