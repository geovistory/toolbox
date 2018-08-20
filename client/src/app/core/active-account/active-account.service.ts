import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs';
import { Account } from '../sdk/models/Account';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { AccountApi } from '../sdk/services/custom/Account';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { AccountActions } from '../../modules/account/api/actions';


@Injectable()
export class ActiveAccountService {
  private userObs$ = new Subject<Account>();

  user: Account;
  redirectUrl:string;

  constructor(
    private authService: LoopBackAuth,
    private userApi: AccountApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  getAccount() {
    return this.userObs$;
  }

  updateAccount() {
    this.user = this.authService.getCurrentUserData();
    this.userObs$.next(this.user);
  }

  isLoggedIn(){
    return this.authService.getCurrentUserData() ? true : false;
  }

}