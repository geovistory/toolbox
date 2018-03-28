import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoopBackAuth, ActiveAccountService, Account, AccountApi, LoopBackConfig} from 'app/core';

import { environment } from 'environments/environment';

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
