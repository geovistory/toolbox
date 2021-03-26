
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalysisIconPipe } from './analysis-icon.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnalysisIconPipe,
  ],
  exports: [
    AnalysisIconPipe
  ]
})
export class AnalysisIconModule { }
