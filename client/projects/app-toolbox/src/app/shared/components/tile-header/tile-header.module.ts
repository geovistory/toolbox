
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileHeaderComponent } from './tile-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  declarations: [TileHeaderComponent],
  exports: [TileHeaderComponent]
})
export class TileHeaderModule { }
