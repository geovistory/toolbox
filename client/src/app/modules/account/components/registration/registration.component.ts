import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AccountApi, Account, LoopBackConfig } from 'app/core';
import { environment } from 'environments/environment';



@Component({
  selector: 'gv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  model: any = {};
  loading = false;
  errorMessages: Object;
  account: Account;
  confirm:boolean = false; //if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountApi,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  register(){
    this.startLoading();

    this.errorMessages = {};
    this.account = new Account(this.model);
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
