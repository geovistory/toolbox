import { NgModule, ModuleWithProviders } from '@angular/core';
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
@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: []
})
export class CookiesModule {
  static forRoot(internalStorageProvider: any = {
    provide: GvInternalStorage,
    useClass: GvCookieBrowser
  }): ModuleWithProviders<CookiesModule> {
    return {
      ngModule: CookiesModule,
      providers: [
        internalStorageProvider,
        { provide: GVStorage, useClass: GvStorageBrowser },
      ]
    };
  }
}
export * from './services/storage.swaps';
export { GvCookieBrowser as CookieBrowser } from './services/cookie.browser';
export { GvStorageBrowser as StorageBrowser } from './services/storage.browser';

