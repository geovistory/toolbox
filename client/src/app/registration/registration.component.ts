import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoopBackConfig }        from '../shared/sdk';
import { User }         from '../shared/sdk/models';
import { UserApi }   from '../shared/sdk/services';
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
  user: User;
  confirm:boolean = false; //if true, form is hidden and confirmation shown.

  constructor(
    private userApi: UserApi,
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  register(){
      this.loading = true;
      this.errorMessages = {};
      this.user = new User(this.model);
      this.userApi.create(this.user)
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
