import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { ErrorHandler } from '@kleiolab/lib-sdk-lb3';
import { AccountService, ResetPasswordRequest } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'gv-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  confirm = false; // if true, form is hidden and confirmation shown.
  returnUrl: string;
  access_token: string;
  errorMessages: {};
  undefinedError: boolean;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }


  ngOnInit() {
    this.access_token = this.route.snapshot.queryParams['access_token'] || '';
  }

  setPassword(newPassword: string): Observable<any> {
    const req: ResetPasswordRequest = {
      password: newPassword,
      resetPasswordToken: this.access_token
    }
    return this.accountApi.accountControllerResetPassword(req)
  }


  resetPassword() {
    this.startLoading();
    this.errorMessages = {};
    this.undefinedError = false;
    this.setPassword(this.model.password)
      .subscribe(
        data => {
          this.completeLoading();
          this.confirm = true;
        },
        errResponse => {
          const error = errResponse.error.error
          if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
            this.errorMessages = { password: error.details[0].message }
          } else {
            this.undefinedError = true;
          }
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
    this.slimLoadingBarService.complete();
    this.loading = false;
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
    this.loading = false;
  }
}
