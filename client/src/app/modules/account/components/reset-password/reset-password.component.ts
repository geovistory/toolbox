import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { ErrorHandler, LoopBackConfig } from 'app/core';
import { AccountControllerService, ResetPasswordRequest } from 'app/core/sdk-lb4';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';




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
  errorMessage: string;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private accountApi: AccountControllerService,
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
    this.errorMessage = '';
    this.setPassword(this.model.password)
      .subscribe(
        data => {
          this.completeLoading();
          this.confirm = true;
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
    this.slimLoadingBarService.complete();
    this.loading = false;
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
    this.loading = false;
  }
}
