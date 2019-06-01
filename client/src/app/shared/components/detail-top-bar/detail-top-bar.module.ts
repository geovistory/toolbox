import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailTopBarComponent } from './detail-top-bar.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [DetailTopBarComponent],
  exports: [DetailTopBarComponent]
})
export class DetailTopBarModule { }
