var CookiesModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GvInternalStorage, GVStorage } from './services/storage.swaps';
import { GvCookieBrowser } from './services/cookie.browser';
import { GvStorageBrowser } from './services/storage.browser';
/* tslint:disable */
/**
* @module CookiesModule
* @description
* This module should covers the use of localStorage or Cookies
* when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
let CookiesModule = CookiesModule_1 = class CookiesModule {
    static forRoot(internalStorageProvider = {
        provide: GvInternalStorage,
        useClass: GvCookieBrowser
    }) {
        return {
            ngModule: CookiesModule_1,
            providers: [
                internalStorageProvider,
                { provide: GVStorage, useClass: GvStorageBrowser },
            ]
        };
    }
};
CookiesModule = CookiesModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [],
        exports: [],
        providers: []
    })
], CookiesModule);
export { CookiesModule };
export * from './services/storage.swaps';
export { GvCookieBrowser as CookieBrowser } from './services/cookie.browser';
export { GvStorageBrowser as StorageBrowser } from './services/storage.browser';
//# sourceMappingURL=cookies.module.js.map