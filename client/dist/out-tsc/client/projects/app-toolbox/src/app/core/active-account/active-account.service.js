import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
let ActiveAccountService = class ActiveAccountService {
    constructor(authService, accountActions, ngRedux, lb4AccountApi, lb3AccountApi) {
        this.authService = authService;
        this.accountActions = accountActions;
        this.ngRedux = ngRedux;
        this.lb4AccountApi = lb4AccountApi;
        this.lb3AccountApi = lb3AccountApi;
        this.userObs$ = new ReplaySubject();
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
        this.updateAccount();
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
    isSystemAdmin() {
        return this.loadAccountRoles().pipe(filter(roles => {
            return !!roles;
        }), map(roles => {
            return roles.find(role => role.name === 'system_admin') ? true : false;
        }));
    }
    loadAccountRoles() {
        this.ngRedux.dispatch(this.accountActions.loadRoles(this.authService.getCurrentUserData().id));
        return this.ngRedux.select(['account', 'roles']);
    }
    login(credentials) {
        const s$ = new Subject();
        // send credentials to server
        this.lb4AccountApi.accountControllerLogin(credentials)
            .subscribe(result => {
            const lb3 = {
                id: result.lb3Token,
                created: result.lb3Created,
                rememberMe: true,
                scopes: [],
                ttl: result.lb3Ttl,
                user: result.user,
                userId: result.user.id
            };
            const gvAuthToken = {
                lb3,
                lb4Token: result.lb4Token,
                lb4ExpiresInMs: result.lb4ExpiresInMs,
                rememberMe: true,
                user: result.user
            };
            this.authService.setToken(gvAuthToken);
            this.updateAccount();
            this.ngRedux.dispatch(this.accountActions.loginSucceeded(result.user));
            s$.next(result);
            s$.complete();
        }, error => {
            s$.error(error);
            s$.complete();
        });
        return s$;
    }
    logout() {
        const s$ = new Subject();
        this.lb3AccountApi.logout()
            .subscribe(data => {
            this.authService.clear();
            this.updateAccount();
            this.ngRedux.dispatch(this.accountActions.accountUpdated(this.authService.getCurrentUserData()));
            s$.next();
        }, error => {
            // TODO: Error handling Alert
            console.log(error);
            s$.error(error);
        });
        return s$;
    }
};
ActiveAccountService = tslib_1.__decorate([
    Injectable()
], ActiveAccountService);
export { ActiveAccountService };
//# sourceMappingURL=active-account.service.js.map