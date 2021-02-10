import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { ActiveAccountService } from "projects/toolbox/src/app/core/active-account";
import { LoopBackConfig } from 'projects/toolbox/src/app/core/sdk/lb.config';
import { environment } from 'projects/toolbox/src/environments/environment';






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
    private slimLoadingBarService: SlimLoadingBarService,
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
      this.activeAccountService.login({ email, password })
        .subscribe(
          result => {
            this.completeLoading();
            const redirect = this.activeAccountService.redirectUrl ? this.activeAccountService.redirectUrl : this.returnUrl;
            this.router.navigate([redirect]);
          },
          error => {
            // TODO: error handling for statusCode: 500; ENOTFOUND;
            // When (db) server not available; e.g. «Network error»
            if (error && error.error && error.error.error && error.error.error.message) {
              this.errorMessage = error.error.error.message
            }
            else {
              this.errorMessage = 'Login not possible.';
            }

            this.resetLoading();
          }
        )
    }

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
