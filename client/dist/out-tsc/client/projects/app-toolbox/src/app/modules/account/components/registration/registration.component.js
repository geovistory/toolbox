import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { environment } from 'projects/app-toolbox/src/environments/environment';
let RegistrationComponent = class RegistrationComponent {
    constructor(accountApi, slimLoadingBarService) {
        this.accountApi = accountApi;
        this.slimLoadingBarService = slimLoadingBarService;
        this.model = {};
        this.loading = false;
        this.confirm = false; // if true, form is hidden and confirmation shown.
        this.confirmEmail = ''; //email to inform user
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }
    register() {
        this.startLoading();
        this.errorMessages = {};
        const req = {
            email: this.model.email,
            password: this.model.password,
            username: this.model.username
        };
        this.accountApi.accountControllerSignUp(req)
            .subscribe(data => {
            this.completeLoading();
            this.validationError = data.validationError;
            if (!this.validationError) {
                this.confirm = true;
                this.confirmEmail = data.success.email;
            }
            ;
        }, errResponse => {
            const error = errResponse.error.error;
            if (error.code === 'VALIDATION_FAILED' && error.details && error.details.length) {
                for (let i = 0; i < error.details.length; i++) {
                    const detail = error.details[i];
                    if (detail.path === '/password') {
                        this.errorMessages['password'] = [...(this.errorMessages['password'] || []), detail.message];
                    }
                }
            }
            this.resetLoading();
        });
    }
    /**
    * Loading Bar Logic
    */
    startLoading() {
        this.loading = true;
        this.slimLoadingBarService.progress = 20;
        this.slimLoadingBarService.start(() => {
        });
    }
    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.loading = false;
        this.slimLoadingBarService.complete();
    }
    resetLoading() {
        this.loading = false;
        this.slimLoadingBarService.reset();
    }
};
RegistrationComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.scss']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map