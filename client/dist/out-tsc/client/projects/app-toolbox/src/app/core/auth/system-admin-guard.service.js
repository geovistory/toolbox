import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
let SystemAdminGuard = class SystemAdminGuard {
    constructor(activeAccountService, ngRedux, router) {
        this.activeAccountService = activeAccountService;
        this.ngRedux = ngRedux;
        this.router = router;
    }
    canActivate(route, state) {
        const url = state.url;
        // if system_admin role in store, emit true
        const s = this.ngRedux.getState();
        if (s.account &&
            s.account.roles &&
            s.account.roles.find(role => role.name === 'system_admin'))
            of(true);
        // else start loading the roles etc...
        return this.activeAccountService.isSystemAdmin().pipe(tap(bool => {
            if (bool === false)
                this.router.navigate(['/access-denied']);
        }));
    }
};
SystemAdminGuard = tslib_1.__decorate([
    Injectable()
], SystemAdminGuard);
export { SystemAdminGuard };
//# sourceMappingURL=system-admin-guard.service.js.map