import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { environment } from 'projects/app-toolbox/src/environments/environment';
let RequestPasswordResetComponent = class RequestPasswordResetComponent {
    constructor(accountApi, slimLoadingBarService) {
        this.accountApi = accountApi;
        this.slimLoadingBarService = slimLoadingBarService;
        this.model = {};
        this.loading = false;
        this.confirm = false; // if true, form is hidden and confirmation shown.
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }
    request() {
        this.startLoading();
        this.errorMessage = '';
        this.accountApi.accountControllerForgotPassword(this.model.email)
            .subscribe(data => {
            this.completeLoading();
            this.confirm = true;
        }, error => {
            if (error && error.error && error.error.error && error.error.error.message) {
                this.errorMessage = error.error.error.message;
            }
            else {
                this.errorMessage = 'Could not send email to reset password.';
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
RequestPasswordResetComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-request-password-reset',
        templateUrl: './request-password-reset.component.html',
        styleUrls: ['./request-password-reset.component.scss']
    })
], RequestPasswordResetComponent);
export { RequestPasswordResetComponent };
//# sourceMappingURL=request-password-reset.component.js.map