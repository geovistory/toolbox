import { Injectable } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { AccountService, LoginRequest, LoginResponse, PubAccount, PubRole } from '@kleiolab/lib-sdk-lb4';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GvAuthService, GvAuthToken } from '../auth/auth.service';


@Injectable()
export class ActiveAccountService {
  public userObs$ = new ReplaySubject<PubAccount>();

  account: PubAccount;
  redirectUrl: string;

  constructor(
    private authService: GvAuthService,
    private lb4AccountApi: AccountService,
    private state: StateFacade
  ) {

    this.updateAccount()
  }

  getAccount() {
    return this.userObs$;
  }

  updateAccount() {
    this.account = this.authService.getCurrentUserData();
    this.state.ui.account.loginSucceeded(this.account);
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

  loadAccountRoles(): Observable<PubRole[]> {
    this.state.ui.account.loadRoles(this.authService.getCurrentUserData().id);
    return this.state.ui.account.roles$;
  }


  login(credentials: LoginRequest): Observable<LoginResponse> {
    const s$ = new Subject<LoginResponse>();
    // send credentials to server

    // TODO: move this logic to lib-redux
    this.lb4AccountApi.accountControllerLogin(credentials)
      .subscribe(
        result => {


          const gvAuthToken: GvAuthToken = {
            lb4Token: result.lb4Token,
            lb4ExpiresInMs: result.lb4ExpiresInMs,
            rememberMe: true,
            user: result.user
          }

          this.authService.setToken(gvAuthToken);
          this.updateAccount()
          this.state.ui.account.loginSucceeded(result.user);
          s$.next(result)
          s$.complete()
        },
        error => {
          s$.error(error)
          s$.complete()
        }
      )

    return s$
  }

  logout() {
    this.authService.clear();
    this.updateAccount();
    this.state.ui.account.loginSucceeded(this.authService.getCurrentUserData());
  }
}
