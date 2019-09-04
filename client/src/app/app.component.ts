import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { MatDialog } from '../../node_modules/@angular/material';
import { LoopBackConfig } from './core';
import { FeedbackDialogComponent } from './modules/user-feedback/components/feedback-dialog/feedback-dialog.component';

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
