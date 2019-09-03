import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawerContainerResizeComponent } from './drawer-container-resize.component';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    DragDropModule
  ],
  providers: [

  ],
  declarations: [
    DrawerContainerResizeComponent
  ],
  exports: [
    DrawerContainerResizeComponent
  ]
})
export class DrawerContainerResizeModule { }
