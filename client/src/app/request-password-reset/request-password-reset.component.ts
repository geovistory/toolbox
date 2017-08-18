import { Component, OnInit } from '@angular/core';

import {LoopBackConfig} from './../shared/sdk/lb.config';
import { environment } from './../../environments/environment';
import {UserApi} from './../shared/sdk/services/custom/User';

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
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  request(){
    this.loading = true;
    this.errorMessage = "";
    this.userApi.resetPassword(this.model)
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
