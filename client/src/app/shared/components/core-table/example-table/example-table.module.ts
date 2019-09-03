import { NgModule } from '@angular/core';
import { ExampleTableComponent } from './example-table.component';
import { CoreTableFilterModule } from '../filter/filter.module';
import { CoreTableMenuModule } from '../menu/menu.module';
import { CoreTableVirtualScrollModule } from '../virtual-scroll/virtual-scroll.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
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
