import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GvAuthService } from './auth.service';
import { Configuration } from "@kleiolab/lib-sdk-lb4";
import { environment } from 'projects/app-toolbox/src/environments/environment';
export const lb4SdkConfigurationProvider = {
    provide: Configuration,
    useFactory: (authService) => {
        const config = new Configuration({
            apiKeys: {},
            basePath: environment.baseUrl,
            accessToken: authService.getToken().lb4Token,
            credentials: { accesstoken: authService.getToken().lb4Token }
        });
        return authService.setLb4SdkConfig(config);
    },
    deps: [GvAuthService],
    multi: false
};
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule
        ],
        providers: [
            GvAuthService,
            lb4SdkConfigurationProvider
        ]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map