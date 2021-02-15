import { ModuleWithProviders } from '@angular/core';
/**
* @module SdkLb3Module
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
export declare class SdkLb3Module {
    static forRoot(internalStorageProvider?: any): ModuleWithProviders;
}
/**
* Have Fun!!!
* - Jon
**/
export * from './lb.config';
export * from './models/index';
export * from './services/index';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
export * from './storage/storage.swaps';
