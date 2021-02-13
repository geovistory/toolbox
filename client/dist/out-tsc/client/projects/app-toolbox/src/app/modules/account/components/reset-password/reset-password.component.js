import * as tslib_1 from "tslib";
import { Component, Inject, Optional } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { ErrorHandler } from '@kleiolab/lib-sdk-lb3';
import { environment } from 'projects/app-toolbox/src/environments/environment';
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(http, errorHandler, route, accountApi, slimLoadingBarService) {
        this.http = http;
        this.errorHandler = errorHandler;
        this.route = route;
        this.accountApi = accountApi;
        this.slimLoadingBarService = slimLoadingBarService;
        this.model = {};
        this.loading = false;
        this.confirm = false; // if true, form is hidden and confirmation shown.
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }
    ngOnInit() {
        this.access_token = this.route.snapshot.queryParams['access_token'] || '';
    }
    setPassword(newPassword) {
        const req = {
            password: newPassword,
            resetPasswordToken: this.access_token
        };
        return this.accountApi.accountControllerResetPassword(req);
    }
    resetPassword() {
        this.startLoading();
        this.errorMessages = {};
        this.undefinedError = false;
        this.setPassword(this.model.password)
            .subscribe(data => {
            this.completeLoading();
            this.confirm = true;
        }, errResponse => {
            const error = errResponse.error.error;
            if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
                this.errorMessages = { password: error.details[0].message };
            }
            else {
                this.undefinedError = true;
            }
            this.resetLoading();
        });
    }
    /**
    * Loading Bar Logic
    */
    startLoading() {
        this.slimLoadingBarService.progress = 20;
        this.slimLoadingBarService.start(() => {
        });
        this.loading = true;
    }
    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
        this.loading = false;
    }
    resetLoading() {
        this.slimLoadingBarService.reset();
        this.loading = false;
    }
};
ResetPasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-reset-password',
        templateUrl: './reset-password.component.html',
        styleUrls: ['./reset-password.component.scss'],
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(ErrorHandler))
], ResetPasswordComponent);
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map