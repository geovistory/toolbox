import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoopBackConfig } from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import { UserApi } from './../shared/sdk/services/custom/User';
import { ActiveAccountService } from '../shared/services/active-account.service';

@Component({
  selector: 'gv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private activeAccountService:ActiveAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard';
  }

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.userApi.login(this.model)
    .subscribe(
      data => {
        this.loading = false;
        this.activeAccountService.updateUser();
        let redirect = this.activeAccountService.redirectUrl ? this.activeAccountService.redirectUrl : this.returnUrl;
        this.router.navigate([redirect]);
      },
      error => {
        // TODO: error handling for statusCode: 500; ENOTFOUND;
        // When (db) server not available; e.g. «Network error»

        this.errorMessage = error.message;
        this.loading = false;
      });
    }

  }
