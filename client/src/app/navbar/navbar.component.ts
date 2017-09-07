import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoopBackAuth} from './../shared/sdk/services/core/auth.service';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import {UserApi} from './../shared/sdk/services/custom/User';
import {User} from './../shared/sdk/models/User';
import {environment} from './../../environments/environment';
import { ActiveAccountService } from '../shared/services/active-account.service';

@Component({
  selector: 'gv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed:boolean=true;
  user: User;

  constructor(
    private activeAccountService: ActiveAccountService,
    private authService: LoopBackAuth,
    private router: Router,
    private userApi: UserApi,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit(){
    this.activeAccountService.getUser().subscribe(user => {
      this.user = user;
    })
    this.activeAccountService.updateUser();
  }

  logout(){
    this.userApi.logout()
    .subscribe(
      data => {
        this.activeAccountService.updateUser();
        this.router.navigate(['/logout-confirmation']);
      },
      error => {
        // TODO: Error handling Alert
        console.log(error);

        this.router.navigate(['/']);

      }
    );
  }
}
