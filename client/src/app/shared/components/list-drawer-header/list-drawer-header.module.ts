import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDrawerHeaderComponent } from './list-drawer-header.component';
import { MatDividerModule } from '../../../../../node_modules/@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule
  ],
  declarations: [ListDrawerHeaderComponent],
  exports: [ListDrawerHeaderComponent]
})
export class ListDrawerHeaderModule { }
