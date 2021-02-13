import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(activeAccountService, router) {
        this.activeAccountService = activeAccountService;
        this.router = router;
    }
    canActivate(route, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    checkLogin(url) {
        if (this.activeAccountService.isLoggedIn()) {
            return true;
        }
        ;
        // Store the attempted URL for redirecting
        this.activeAccountService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth-guard.service.js.map