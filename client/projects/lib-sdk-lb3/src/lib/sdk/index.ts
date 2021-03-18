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
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoopBackAuth } from './services/core/auth.service';
import { ErrorHandler } from './services/core/error.service';
import { RealTime } from './services/core/real.time';
import { DatChunkApi } from './services/custom/DatChunk';
import { DatColumnApi } from './services/custom/DatColumn';
import { DatDigitalApi } from './services/custom/DatDigital';
import { DatNamespaceApi } from './services/custom/DatNamespace';
import { DatTextPropertyApi } from './services/custom/DatTextProperty';
import { DfhLabelApi } from './services/custom/DfhLabel';
import { DfhProfileApi } from './services/custom/DfhProfile';
import { EmailApi } from './services/custom/Email';
import { InfAppellationApi } from './services/custom/InfAppellation';
import { InfDimensionApi } from './services/custom/InfDimension';
import { InfLangStringApi } from './services/custom/InfLangString';
import { InfLanguageApi } from './services/custom/InfLanguage';
import { InfPersistentItemApi } from './services/custom/InfPersistentItem';
import { InfPlaceApi } from './services/custom/InfPlace';
import { InfStatementApi } from './services/custom/InfStatement';
import { InfTemporalEntityApi } from './services/custom/InfTemporalEntity';
import { InfTextPropertyApi } from './services/custom/InfTextProperty';
import { InfTimePrimitiveApi } from './services/custom/InfTimePrimitive';
import { LoggerService } from './services/custom/logger.service';
import { ProClassFieldConfigApi } from './services/custom/ProClassFieldConfig';
import { ProDfhClassProjRelApi } from './services/custom/ProDfhClassProjRel';
import { ProDfhProfileProjRelApi } from './services/custom/ProDfhProfileProjRel';
import { ProInfoProjRelApi } from './services/custom/ProInfoProjRel';
import { ProProjectApi } from './services/custom/ProProject';
import { ProTextPropertyApi } from './services/custom/ProTextProperty';
import { PubAccountApi } from './services/custom/PubAccount';
import { PubAccountProjectRelApi } from './services/custom/PubAccountProjectRel';
import { SchemaObjectApi } from './services/custom/SchemaObject';
import { SDKModels } from './services/custom/SDKModels';
import { SysAppContextApi } from './services/custom/SysAppContext';
import { SysClassFieldApi } from './services/custom/SysClassField';
import { SysClassFieldPropertyRelApi } from './services/custom/SysClassFieldPropertyRel';
import { SysClassHasTypePropertyApi } from './services/custom/SysClassHasTypeProperty';
import { SysSystemRelevantClassApi } from './services/custom/SysSystemRelevantClass';
import { SysSystemTypeApi } from './services/custom/SysSystemType';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketConnection } from './sockets/socket.connections';
import { SocketDriver } from './sockets/socket.driver';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
/**
* @module SdkLb3Module
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  exports: [],
  providers: [
    ErrorHandler,
    SocketConnection
  ]
})
export class SdkLb3Module {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule: SdkLb3Module,
      providers: [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        SchemaObjectApi,
        SysClassFieldPropertyRelApi,
        SysClassFieldApi,
        SysClassHasTypePropertyApi,
        SysSystemRelevantClassApi,
        PubAccountApi,
        EmailApi,
        ProProjectApi,
        PubAccountProjectRelApi,
        ProTextPropertyApi,
        ProInfoProjRelApi,
        DfhProfileApi,
        DfhLabelApi,
        DatChunkApi,
        DatColumnApi,
        DatTextPropertyApi,
        DatDigitalApi,
        SysAppContextApi,
        ProClassFieldConfigApi,
        ProDfhClassProjRelApi,
        ProDfhProfileProjRelApi,
        InfAppellationApi,
        InfLangStringApi,
        InfDimensionApi,
        InfTemporalEntityApi,
        InfStatementApi,
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
export * from './lb.config';
export * from './models/index';
export * from './services/index';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
export * from './storage/storage.swaps';

