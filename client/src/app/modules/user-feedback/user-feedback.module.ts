import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
import { MatDialogModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [FeedbackDialogComponent],
  entryComponents: [FeedbackDialogComponent]
})
export class UserFeedbackModule { }
