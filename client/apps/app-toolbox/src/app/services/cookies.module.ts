import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GvCookieBrowser } from './cookie.browser';
import { GvStorageBrowser } from './storage.browser';
import { GVStorage, GvInternalStorage } from './storage.swaps';

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
export { GvCookieBrowser as CookieBrowser } from './cookie.browser';
export { GvStorageBrowser as StorageBrowser } from './storage.browser';
export * from './storage.swaps';

