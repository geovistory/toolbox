import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig, PubAccount, PubAccountApi } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';




@Component({
  selector: 'gv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  model: any = {};
  loading = false;
  errorMessages: Object;
  account: PubAccount;
  confirm = false; // if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: PubAccountApi,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  register() {
    this.startLoading();

    this.errorMessages = {};
    this.account = new PubAccount(this.model);
    this.accountApi.create(this.account)
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
