import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LoopBackConfig, PubAccountApi } from 'app/core';
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
    private accountApi: PubAccountApi,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  request() {
    this.startLoading();

    this.errorMessage = '';
    this.accountApi.resetPassword(this.model)
      .subscribe(
        data => {
          this.completeLoading();
          this.confirm = true;

        },
        error => {
          // TODO: Alert
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
