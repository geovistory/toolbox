import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';

import { LoopBackConfig } from 'app/core/sdk/lb.config';
import { ActiveAccountService, PubAccountApi } from 'app/core';
import { environment } from 'environments/environment';
import { NgRedux } from '@angular-redux/store';
import { AccountActions } from '../../api/account.actions';
import { IAccount } from '../../account.model';
import { PubAccountService, UserControllerService } from 'app/core/sdk-lb4';
import { ModelMesh } from 'cesium';




@Component({
  selector: 'gv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: {
    email?: string,
    password?: string
  } = {};

  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private activeAccountService: ActiveAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private accountApi: PubAccountApi,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IAccount>,
    private actions: AccountActions,
    private userApi: UserControllerService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard';
  }

  login() {
    this.startLoading();
    this.errorMessage = '';

    const { email, password } = this.model
    if (email && password) {
      this.userApi.userControllerLogin({ email, password })
        .subscribe(
          result => {

          },
          error => {

          }
        )
    }

    this.accountApi.login(this.model)
      .subscribe(
        data => {
          this.completeLoading();
          this.activeAccountService.updateAccount();

          this.ngRedux.dispatch(this.actions.loginSucceeded(data.user));

          const redirect = this.activeAccountService.redirectUrl ? this.activeAccountService.redirectUrl : this.returnUrl;
          this.router.navigate([redirect]);
        },
        error => {
          // TODO: error handling for statusCode: 500; ENOTFOUND;
          // When (db) server not available; e.g. «Network error»

          this.errorMessage = error.message;
          this.resetLoading();
        });
  }


  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
    this.loading = true;
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.loading = false;
    this.slimLoadingBarService.reset();
  }
}
