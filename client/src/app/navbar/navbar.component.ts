import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoopBackAuth} from './../shared/sdk/services/core/auth.service';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import {AccountApi} from './../shared/sdk/services/custom/Account';
import {Account} from './../shared/sdk/models/Account';
import {environment} from './../../environments/environment';
import { ActiveAccountService } from '../shared/services/active-account.service';

@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed:boolean=true;
  account: Account;

  constructor(
    private activeAccountService: ActiveAccountService,
    private authService: LoopBackAuth,
    private router: Router,
    private accountApi: AccountApi,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit(){
    this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
    })
    this.activeAccountService.updateAccount();
  }

  logout(){
    this.accountApi.logout()
    .subscribe(
      data => {
        this.activeAccountService.updateAccount();
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
