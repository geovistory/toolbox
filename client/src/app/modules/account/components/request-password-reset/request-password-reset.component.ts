import { Component } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { LoopBackConfig } from 'app/core';
import { AccountService } from 'app/core/sdk-lb4';
import { environment } from 'environments/environment';




@Component({
  selector: 'gv-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {

  model: any = {};
  loading = false;
  errorMessage: string;
  confirm = false; // if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  request() {
    this.startLoading();

    this.errorMessage = '';

    this.accountApi.accountControllerForgotPassword(this.model.email)
      .subscribe(
        data => {
          this.completeLoading();
          this.confirm = true;

        },
        error => {

          if (error && error.error && error.error.error && error.error.error.message) {
            this.errorMessage = error.error.error.message
          }
          else {
            this.errorMessage = 'Could not send email to reset password.';
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
