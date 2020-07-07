import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { AccountRole } from 'app/modules/account/account.model';
import { AccountActions } from 'app/modules/account/api/account.actions';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GvAuthService, GvAuthToken } from '../auth/auth.service';
import { PubAccountApi, SDKToken } from '../sdk';
import { LoginRequest, LoginResponse, PubAccount, AccountControllerService } from '../sdk-lb4';
import { LoopBackConfig } from '../sdk/lb.config';
import { IAppState } from '../store/model';



@Injectable()
export class ActiveAccountService {
  public userObs$ = new ReplaySubject<PubAccount>();

  account: PubAccount;
  redirectUrl: string;

  constructor(
    private authService: GvAuthService,
    private accountActions: AccountActions,
    private ngRedux: NgRedux<IAppState>,
    private lb4AccountApi: AccountControllerService,
    private lb3AccountApi: PubAccountApi,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.updateAccount()
  }

  getAccount() {
    return this.userObs$;
  }

  updateAccount() {
    this.account = this.authService.getCurrentUserData();
    this.ngRedux.dispatch(this.accountActions.accountUpdated(this.account));
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


  login(credentials: LoginRequest): Observable<LoginResponse> {
    const s$ = new Subject<LoginResponse>();
    // send credentials to server

    this.lb4AccountApi.accountControllerLogin(credentials)
      .subscribe(
        result => {

          const lb3: SDKToken = {
            id: result.lb3Token,
            created: result.lb3Created,
            rememberMe: true,
            scopes: [],
            ttl: result.lb3Ttl,
            user: result.user,
            userId: result.user.id
          }

          const gvAuthToken: GvAuthToken = {
            lb3,
            lb4Token: result.lb4Token,
            lb4ExpiresInMs: result.lb4ExpiresInMs,
            rememberMe: true,
            user: result.user
          }

          this.authService.setToken(gvAuthToken);
          this.updateAccount()
          this.ngRedux.dispatch(this.accountActions.loginSucceeded(result.user));
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

  logout(): Observable<void> {
    const s$ = new Subject<void>()
    this.lb3AccountApi.logout()
      .subscribe(
        data => {
          this.authService.clear();
          this.updateAccount();
          this.ngRedux.dispatch(this.accountActions.accountUpdated(this.authService.getCurrentUserData()));
          s$.next()
        },
        error => {
          // TODO: Error handling Alert
          console.log(error);
          s$.error(error)
        }
      );

    return s$;
  }



}
