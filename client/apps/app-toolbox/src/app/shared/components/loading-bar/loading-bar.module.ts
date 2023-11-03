import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';



@NgModule({
  declarations: [LoadingBarComponent],
  exports: [LoadingBarComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class LoadingBarModule { }
