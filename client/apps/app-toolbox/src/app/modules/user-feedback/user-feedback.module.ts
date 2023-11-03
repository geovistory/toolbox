import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [FeedbackDialogComponent]
})
export class UserFeedbackModule { }
