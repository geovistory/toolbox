import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoopBackConfig }        from '../shared/sdk';
import { Account } from './../shared/sdk/models/Account';
import { AccountApi } from './../shared/sdk/services/custom/Account';
import { environment } from './../../environments/environment';

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
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  register(){
      this.loading = true;
      this.errorMessages = {};
      this.account = new Account(this.model);
      this.accountApi.create(this.account)
      .subscribe(
        data => {
          this.loading = false;
          this.confirm = true;
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.details.messages;
          this.loading = false;
        });
      }


}
