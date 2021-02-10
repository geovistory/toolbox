import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/toolbox/src/app/core/material/material.module';
import { DrawerContainerResizeComponent } from './drawer-container-resize.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    MaterialModule
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
