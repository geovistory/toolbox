import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailTopBarComponent } from './detail-top-bar.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [DetailTopBarComponent],
  exports: [DetailTopBarComponent]
})
export class DetailTopBarModule { }
