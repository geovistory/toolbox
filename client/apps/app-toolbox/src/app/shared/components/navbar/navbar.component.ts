import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { PubAccount } from '@kleiolab/lib-sdk-lb4';
import { Subscription } from 'rxjs';
import { FeedbackDialogComponent } from '../../../components/layout/feedback-dialog/feedback-dialog.component';
import { ActiveAccountService } from '../../../services/active-account.service';


@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, RouterLink, MatMenuModule, MatIconModule, MatDividerModule, MatDialogModule]
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
