import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFeedbackComponent } from './upload-feedback.component';
import { PassiveLinkModule } from 'app/shared';

@NgModule({
  imports: [
    CommonModule,
    PassiveLinkModule
  ],
  declarations: [
    UploadFeedbackComponent
  ],
  exports: [
    UploadFeedbackComponent
  ]
})
export class ReadMoreModule { }
