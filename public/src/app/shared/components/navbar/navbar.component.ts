import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveAccountService, LoopBackAuth, LoopBackConfig, PubAccount, PubAccountApi } from 'app/core';
import { IAccount } from 'app/modules/account/account.model';
import { AccountActions } from 'app/modules/account/api/account.actions';
import { environment } from 'environments/environment';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent } from 'app/modules/user-feedback/components/feedback-dialog/feedback-dialog.component';


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
    private authService: LoopBackAuth,
    public router: Router,
    private accountApi: PubAccountApi,
    private actions: AccountActions,
    private ngRedux: NgRedux<IAccount>,
    public dialog: MatDialog
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  ngOnInit() {
    this.subscription = this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
      this.ngRedux.dispatch(this.actions.accountUpdated(this.account));
    })
    this.activeAccountService.updateAccount();
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.accountApi.logout()
      .subscribe(
        data => {
          this.activeAccountService.updateAccount();
          this.ngRedux.dispatch(this.actions.accountUpdated(this.authService.getCurrentUserData()));

          this.router.navigate(['/']);
        },
        error => {
          // TODO: Error handling Alert
          console.log(error);

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
