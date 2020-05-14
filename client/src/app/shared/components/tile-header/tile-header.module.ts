
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileHeaderComponent } from './tile-header.component';
import { MatTooltipModule } from '../../../../../node_modules/@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  declarations: [TileHeaderComponent],
  exports: [TileHeaderComponent]
})
export class TileHeaderModule { }
