import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailTopBarComponent } from './detail-top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
