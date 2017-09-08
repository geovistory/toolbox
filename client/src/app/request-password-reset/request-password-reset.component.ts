import { Component, OnInit } from '@angular/core';

import {LoopBackConfig} from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import {AccountApi} from './../shared/sdk/services/custom/Account';

@Component({
  selector: 'gv-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent {

  model: any = {};
  loading:boolean = false;
  errorMessage: string;
  confirm:boolean = false; //if true, form is hidden and confirmation shown.

  constructor(
    private accountApi: AccountApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  request(){
    this.loading = true;
    this.errorMessage = "";
    this.accountApi.resetPassword(this.model)
    .subscribe(
      data => {

        this.loading = false;
        this.confirm = true;

      },
      error => {
        // TODO: Alert
        this.errorMessage = error.message;
        this.loading = false;
      });
    }
  }
