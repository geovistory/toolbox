import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PubAccount } from '@kleiolab/lib-sdk-lb4';
import { Subscription } from 'rxjs';
import { ActiveAccountService } from '../../../core/active-account';
import { FeedbackDialogComponent } from '../../../modules/user-feedback/components/feedback-dialog/feedback-dialog.component';


@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isNavbarCollapsed = true;
  account: PubAccount;

  subscription: Subscription;
  toolboxVersion = window['toolboxVersion'];

  constructor(
    private activeAccountService: ActiveAccountService,
    public router: Router,
    private dialog: MatDialog,
  ) {

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
    this.activeAccountService.logout();
    this.router.navigate(['/']);
  }

  openFeedbackDialog(): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '470px',
      data: {}
    });
  }

}
