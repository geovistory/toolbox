import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ActiveAccountService } from "projects/app-toolbox/src/app/core/active-account";
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { PubAccount } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { IAccount } from 'projects/app-toolbox/src/app/modules/account/account.model';
import { AccountActions } from 'projects/app-toolbox/src/app/modules/account/api/account.actions';
import { FeedbackDialogComponent } from 'projects/app-toolbox/src/app/modules/user-feedback/components/feedback-dialog/feedback-dialog.component';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';


@AutoUnsubscribe()
@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isNavbarCollapsed = true;
  account: PubAccount;

  subscription: Subscription;

  constructor(
    private activeAccountService: ActiveAccountService,
    public router: Router,
    public dialog: MatDialog
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  ngOnInit() {
    this.subscription = this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  logout() {
    this.activeAccountService.logout()
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.router.navigate(['/']);
        }
      );
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
