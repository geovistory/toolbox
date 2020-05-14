import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccountRole } from 'app/modules/account/account.model';
import { AccountActions } from 'app/modules/account/api/account.actions';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { PubAccount } from '../sdk/models/PubAccount';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { IAppState } from '../store/model';



@Injectable()
export class ActiveAccountService {
  private userObs$ = new Subject<PubAccount>();

  account: PubAccount;
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
