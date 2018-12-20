/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { AccountApi } from './services/custom/Account';
import { EmailApi } from './services/custom/Email';
import { ProjectApi } from './services/custom/Project';
import { ProjectAccountAssociationApi } from './services/custom/ProjectAccountAssociation';
import { LanguageApi } from './services/custom/Language';
import { ComLabelApi } from './services/custom/ComLabel';
import { ComTextPropertyApi } from './services/custom/ComTextProperty';
import { InfAppellationApi } from './services/custom/InfAppellation';
import { InfTemporalEntityApi } from './services/custom/InfTemporalEntity';
import { InfRoleApi } from './services/custom/InfRole';
import { InfLanguageApi } from './services/custom/InfLanguage';
import { InfPersistentItemApi } from './services/custom/InfPersistentItem';
import { InfEntityProjectRelApi } from './services/custom/InfEntityProjectRel';
import { DfhClassApi } from './services/custom/DfhClass';
import { DfhPropertyApi } from './services/custom/DfhProperty';
import { DfhLabelApi } from './services/custom/DfhLabel';
import { DfhTextPropertyApi } from './services/custom/DfhTextProperty';
import { InfTimePrimitiveApi } from './services/custom/InfTimePrimitive';
import { InfChunkApi } from './services/custom/InfChunk';
import { InfEntityAssociationApi } from './services/custom/InfEntityAssociation';
import { InfDigitalObjectApi } from './services/custom/InfDigitalObject';
import { InfPlaceApi } from './services/custom/InfPlace';
import { InfDataUnitPreviewApi } from './services/custom/InfDataUnitPreview';
import { DfhClassProfileViewApi } from './services/custom/DfhClassProfileView';
import { DfhPropertyProfileViewApi } from './services/custom/DfhPropertyProfileView';
import { ComUiContextApi } from './services/custom/ComUiContext';
import { ComUiContextConfigApi } from './services/custom/ComUiContextConfig';
import { ComClassFieldApi } from './services/custom/ComClassField';
import { DfhProjRelApi } from './services/custom/DfhProjRel';
import { InfNamespaceApi } from './services/custom/InfNamespace';
import { InfTypeNamespaceRelApi } from './services/custom/InfTypeNamespaceRel';
import { InfTextPropertyApi } from './services/custom/InfTextProperty';
import { ComSystemTypeApi } from './services/custom/ComSystemType';
import { ComClassFieldPropertyRelApi } from './services/custom/ComClassFieldPropertyRel';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        AccountApi,
        EmailApi,
        ProjectApi,
        ProjectAccountAssociationApi,
        LanguageApi,
        ComLabelApi,
        ComTextPropertyApi,
        InfAppellationApi,
        InfTemporalEntityApi,
        InfRoleApi,
        InfLanguageApi,
        InfPersistentItemApi,
        InfEntityProjectRelApi,
        DfhClassApi,
        DfhPropertyApi,
        DfhLabelApi,
        DfhTextPropertyApi,
        InfTimePrimitiveApi,
        InfChunkApi,
        InfEntityAssociationApi,
        InfDigitalObjectApi,
        InfPlaceApi,
        InfDataUnitPreviewApi,
        DfhClassProfileViewApi,
        DfhPropertyProfileViewApi,
        ComUiContextApi,
        ComUiContextConfigApi,
        ComClassFieldApi,
        DfhProjRelApi,
        InfNamespaceApi,
        InfTypeNamespaceRelApi,
        InfTextPropertyApi,
        ComSystemTypeApi,
        ComClassFieldPropertyRelApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

