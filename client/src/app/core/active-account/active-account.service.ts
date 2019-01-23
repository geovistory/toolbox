import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { Account } from '../sdk/models/Account';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { AccountApi } from '../sdk/services/custom/Account';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { AccountRole } from 'app/modules/account/account.model';
import { AccountActions } from 'app/modules/account/api/account.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/model';
import { map, filter } from 'rxjs/operators';


@Injectable()
export class ActiveAccountService {
  private userObs$ = new Subject<Account>();

  account: Account;
  redirectUrl: string;

  constructor(
    private authService: LoopBackAuth,
    private accountActions: AccountActions,
    private ngRedux: NgRedux<IAppState>
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  getAccount() {
    return this.userObs$;
  }

  updateAccount() {
    this.account = this.authService.getCurrentUserData();
    this.userObs$.next(this.account);
  }

  isLoggedIn() {
    return this.authService.getCurrentUserData() ? true : false;
  }

  isSystemAdmin(): Observable<boolean> {
    return this.loadAccountRoles().pipe(
      filter(roles => {
        return !!roles
      }),
      map(roles => {
        return roles.find(role => role.name === 'system_admin') ? true : false;
      })
    )
  }

  loadAccountRoles(): Observable<AccountRole[]> {
    this.ngRedux.dispatch(this.accountActions.loadRoles(this.authService.getCurrentUserData().id))
    return this.ngRedux.select<AccountRole[]>(['account', 'roles'])
  }

}
