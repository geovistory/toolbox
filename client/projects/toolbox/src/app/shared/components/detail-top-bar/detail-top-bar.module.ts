import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'projects/toolbox/src/app/core/material/material.module';
import { DetailTopBarComponent } from './detail-top-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [DetailTopBarComponent],
  exports: [DetailTopBarComponent]
})
export class DetailTopBarModule { }
