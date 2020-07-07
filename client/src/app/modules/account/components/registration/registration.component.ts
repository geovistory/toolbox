import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { AccountControllerService, PubAccount, SignupRequest } from 'app/core/sdk-lb4';




@Component({
  selector: 'gv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  model: any = {};
  loading = false;
  errorMessages: Object;

  confirm = false; // if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountControllerService,
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
          this.confirm = true;
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.details.messages;
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
