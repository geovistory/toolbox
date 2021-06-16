import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarActions } from '@kleiolab/lib-redux';
import { ErrorHandler, LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { AccountService, ResetPasswordRequest } from '@kleiolab/lib-sdk-lb4';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';




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
  errorMessages: {
    password?: string,
    password2?: string
  };
  undefinedError: boolean;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private loadingBarActions: LoadingBarActions,
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
      .pipe(first())
      .subscribe(
        data => {
          this.confirm = true;
          this.completeLoading()
        },
        errResponse => {
          const error = errResponse.error.error
          if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
            this.errorMessages = { password: error.details[0].message }
          } else {
            this.undefinedError = true;
          }
          this.stopLoading()
        },
      );
  }
  startLoading() {
    this.loadingBarActions.addJob()
    this.loading = true;
  }
  stopLoading() {
    this.loadingBarActions.removeJob()
  }
  completeLoading() {
    this.loading = false;
    this.loadingBarActions.removeJob()
  }
}
