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
import { SysClassFieldPropertyRelApi } from './services/custom/SysClassFieldPropertyRel';
import { SysClassFieldApi } from './services/custom/SysClassField';
import { SysClassHasTypePropertyApi } from './services/custom/SysClassHasTypeProperty';
import { SysSystemRelevantClassApi } from './services/custom/SysSystemRelevantClass';
import { SysAnalysisTypeApi } from './services/custom/SysAnalysisType';
import { ProAnalysisApi } from './services/custom/ProAnalysis';
import { PubAccountApi } from './services/custom/PubAccount';
import { EmailApi } from './services/custom/Email';
import { ProProjectApi } from './services/custom/ProProject';
import { PubAccountProjectRelApi } from './services/custom/PubAccountProjectRel';
import { ProTextPropertyApi } from './services/custom/ProTextProperty';
import { ProInfoProjRelApi } from './services/custom/ProInfoProjRel';
import { DfhProfileApi } from './services/custom/DfhProfile';
import { DfhClassApi } from './services/custom/DfhClass';
import { DfhPropertyApi } from './services/custom/DfhProperty';
import { DfhLabelApi } from './services/custom/DfhLabel';
import { DatChunkApi } from './services/custom/DatChunk';
import { DatDigitalApi } from './services/custom/DatDigital';
import { WarEntityPreviewApi } from './services/custom/WarEntityPreview';
import { SysAppContextApi } from './services/custom/SysAppContext';
import { ProClassFieldConfigApi } from './services/custom/ProClassFieldConfig';
import { ProDfhClassProjRelApi } from './services/custom/ProDfhClassProjRel';
import { ProDfhProfileProjRelApi } from './services/custom/ProDfhProfileProjRel';
import { InfAppellationApi } from './services/custom/InfAppellation';
import { InfTemporalEntityApi } from './services/custom/InfTemporalEntity';
import { InfRoleApi } from './services/custom/InfRole';
import { InfLanguageApi } from './services/custom/InfLanguage';
import { InfPersistentItemApi } from './services/custom/InfPersistentItem';
import { InfTimePrimitiveApi } from './services/custom/InfTimePrimitive';
import { InfPlaceApi } from './services/custom/InfPlace';
import { DatNamespaceApi } from './services/custom/DatNamespace';
import { InfTextPropertyApi } from './services/custom/InfTextProperty';
import { SysSystemTypeApi } from './services/custom/SysSystemType';
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
        SysClassFieldPropertyRelApi,
        SysClassFieldApi,
        SysClassHasTypePropertyApi,
        SysSystemRelevantClassApi,
        SysAnalysisTypeApi,
        ProAnalysisApi,
        PubAccountApi,
        EmailApi,
        ProProjectApi,
        PubAccountProjectRelApi,
        ProTextPropertyApi,
        ProInfoProjRelApi,
        DfhProfileApi,
        DfhClassApi,
        DfhPropertyApi,
        DfhLabelApi,
        DatChunkApi,
        DatDigitalApi,
        WarEntityPreviewApi,
        SysAppContextApi,
        ProClassFieldConfigApi,
        ProDfhClassProjRelApi,
        ProDfhProfileProjRelApi,
        InfAppellationApi,
        InfTemporalEntityApi,
        InfRoleApi,
        InfLanguageApi,
        InfPersistentItemApi,
        InfTimePrimitiveApi,
        InfPlaceApi,
        DatNamespaceApi,
        InfTextPropertyApi,
        SysSystemTypeApi,
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

