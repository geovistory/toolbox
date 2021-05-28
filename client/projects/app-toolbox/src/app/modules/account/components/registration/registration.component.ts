import { Component } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { AccountService, SignupRequest, SignupValidationError } from '@kleiolab/lib-sdk-lb4';
import { environment } from 'projects/app-toolbox/src/environments/environment';




@Component({
  selector: 'gv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  model: any = {};
  loading = false;
  errorMessages: {
    password?: string[],
    password2?: string[]
  };
  validationError: SignupValidationError

  confirm = false; // if true, form is hidden and confirmation shown.
  confirmEmail = ''; // email to inform user

  constructor(
    private accountApi: AccountService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  register() {
    this.startLoading();

    this.errorMessages = {};
    const req: SignupRequest = {
      email: this.model.email,
      password: this.model.password,
      username: this.model.username
    }
    this.accountApi.accountControllerSignUp(req)
      .subscribe(
        data => {
          this.completeLoading();
          this.validationError = data.validationError;
          if (!this.validationError) { this.confirm = true; this.confirmEmail = data.success.email; };
        },
        errResponse => {

          const error = errResponse.error.error
          if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
            for (let i = 0; i < error.details.length; i++) {
              const detail = error.details[i];
              if (detail.path === '/password') {
                this.errorMessages['password'] = [...(this.errorMessages['password'] || []), detail.message]
              }
            }
          }

          this.resetLoading();
        });
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
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
