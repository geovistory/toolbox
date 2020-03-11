import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { LoopBackConfig } from './core';
import { FeedbackDialogComponent } from './modules/user-feedback/components/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'gv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  openFeedbackDialog(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '470px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
