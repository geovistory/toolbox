import { Injectable } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { AccountService, LoginRequest, LoginResponse, PubAccount, PubRole } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { GvAuthService, GvAuthToken } from './auth.service';


@Injectable()
export class ActiveAccountService {
  public userObs$: Observable<PubAccount>;

  account: PubAccount;
  redirectUrl: string;

  constructor(
    private authService: GvAuthService,
    private lb4AccountApi: AccountService,
    private state: StateFacade
  ) {

    this.updateAccount()
    this.userObs$ = this.state.ui.account.account$
  }

  getAccount() {
    return this.userObs$;
  }

  updateAccount() {
    this.account = this.authService.getCurrentUserData();
    this.state.ui.account.loginSucceeded(this.account);
  }

  isLoggedIn() {
    return this.authService.getCurrentUserData() ? true : false;
  }

  async isSystemAdmin(): Promise<boolean> {
    const roles = await this.loadAccountRoles()
    return roles.find(role => role.name === 'system_admin') ? true : false;
  }

  async loadAccountRoles(): Promise<PubRole[]> {
    await new Promise<void>((res) => {
      this.state.ui.account.loadRoles(this.authService.getCurrentUserData().id, () => res());
    })
    return firstValueFrom(this.state.ui.account.roles$);
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
