import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoopBackAuth, ActiveAccountService, Account, AccountApi, LoopBackConfig} from 'app/core';

import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

import { environment } from 'environments/environment';
import { AccountActions } from 'app/modules/account/api/actions';
import { IAccount } from 'app/modules/account/account.model';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']  
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed:boolean=true;
  account: Account;

  subscription:Subscription;

  constructor(
    private activeAccountService: ActiveAccountService,
    private authService: LoopBackAuth,
    private router: Router,
    private accountApi: AccountApi,
    private actions: AccountActions,
    private ngRedux: NgRedux<IAccount>
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit(){
    this.subscription = this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
      this.ngRedux.dispatch(this.actions.accountUpdated(this.account));
    })
    this.activeAccountService.updateAccount();    
  }


  logout(){
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
}
