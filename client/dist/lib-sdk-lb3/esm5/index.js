import * as tslib_1 from "tslib";
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
import { NgModule } from '@angular/core';
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
var SdkLb3Module = /** @class */ (function () {
    function SdkLb3Module() {
    }
    SdkLb3Module_1 = SdkLb3Module;
    SdkLb3Module.forRoot = function (internalStorageProvider) {
        if (internalStorageProvider === void 0) { internalStorageProvider = {
            provide: InternalStorage,
            useClass: CookieBrowser
        }; }
        return {
            ngModule: SdkLb3Module_1,
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
    };
    var SdkLb3Module_1;
    SdkLb3Module = SdkLb3Module_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, HttpClientModule],
            declarations: [],
            exports: [],
            providers: [
                ErrorHandler,
                SocketConnection
            ]
        })
    ], SdkLb3Module);
    return SdkLb3Module;
}());
export { SdkLb3Module };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1B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QUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0QixxQkFBcUI7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLGVBQWU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2Qsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLFdBQVc7Z0JBQ1gsZUFBZTtnQkFDZixrQkFBa0I7Z0JBQ2xCLGdCQUFnQjtnQkFDaEIsdUJBQXVCO2dCQUN2QixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtnQkFDakQsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDbkQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFsRFUsWUFBWTtRQVR4QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7WUFDekMsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUU7Z0JBQ1QsWUFBWTtnQkFDWixnQkFBZ0I7YUFDakI7U0FDRixDQUFDO09BQ1csWUFBWSxDQW1EeEI7SUFBRCxtQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLFlBQVk7QUFvRHpCOzs7R0FHRztBQUNILGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELGNBQWMseUJBQXlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4qIEBtb2R1bGUgU0RLTW9kdWxlXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdoOmpvbmF0aGFuLWNhc2FycnViaWFzPlxuKiBAbGljZW5zZSBNSVQgMjAxNiBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuKiBAdmVyc2lvbiAyLjEuMFxuKiBAZGVzY3JpcHRpb25cbiogVGhlIFNES01vZHVsZSBpcyBhIGdlbmVyYXRlZCBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXV0b21hdGljYWxseSBidWlsdCBieVxuKiB0aGUgTG9vcEJhY2sgU0RLIEJ1aWxkZXIgb3BlbiBzb3VyY2UgbW9kdWxlLlxuKlxuKiBUaGUgU0RLTW9kdWxlIHByb3ZpZGVzIEFuZ3VsYXIgMiA+PSBSQy41IHN1cHBvcnQsIHdoaWNoIG1lYW5zIHRoYXQgTmdNb2R1bGVzXG4qIGNhbiBpbXBvcnQgdGhpcyBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXMgZm9sbG93czpcbipcbipcbiogQVBQIFJvdXRlIE1vZHVsZSBDb250ZXh0XG4qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbiogaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbiogLy8gQXBwIFJvb3RcbiogaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuKiAvLyBGZWF0dXJlIE1vZHVsZXNcbiogaW1wb3J0IHsgU0RLW0Jyb3dzZXJ8Tm9kZXxOYXRpdmVdTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2RrL3Nkay5tb2R1bGUnO1xuKiAvLyBJbXBvcnQgUm91dGluZ1xuKiBpbXBvcnQgeyByb3V0aW5nIH0gICAgICAgIGZyb20gJy4vYXBwLnJvdXRpbmcnO1xuKiBATmdNb2R1bGUoe1xuKiAgaW1wb3J0czogW1xuKiAgICBCcm93c2VyTW9kdWxlLFxuKiAgICByb3V0aW5nLFxuKiAgICBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUuZm9yUm9vdCgpXG4qICBdLFxuKiAgZGVjbGFyYXRpb25zOiBbIEFwcENvbXBvbmVudCBdLFxuKiAgYm9vdHN0cmFwOiAgICBbIEFwcENvbXBvbmVudCBdXG4qIH0pXG4qIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4qXG4qKi9cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhbFRpbWUgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvcmVhbC50aW1lJztcbmltcG9ydCB7IERhdENodW5rQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0Q2h1bmsnO1xuaW1wb3J0IHsgRGF0Q29sdW1uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0Q29sdW1uJztcbmltcG9ydCB7IERhdERpZ2l0YWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXREaWdpdGFsJztcbmltcG9ydCB7IERhdE5hbWVzcGFjZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdE5hbWVzcGFjZSc7XG5pbXBvcnQgeyBEYXRUZXh0UHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRUZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgRGZoTGFiZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EZmhMYWJlbCc7XG5pbXBvcnQgeyBEZmhQcm9maWxlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGZoUHJvZmlsZSc7XG5pbXBvcnQgeyBFbWFpbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0VtYWlsJztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mQXBwZWxsYXRpb24nO1xuaW1wb3J0IHsgSW5mRGltZW5zaW9uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mRGltZW5zaW9uJztcbmltcG9ydCB7IEluZkxhbmdTdHJpbmdBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZMYW5nU3RyaW5nJztcbmltcG9ydCB7IEluZkxhbmd1YWdlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mTGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW1BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZQZXJzaXN0ZW50SXRlbSc7XG5pbXBvcnQgeyBJbmZQbGFjZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlBsYWNlJztcbmltcG9ydCB7IEluZlN0YXRlbWVudEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlN0YXRlbWVudCc7XG5pbXBvcnQgeyBJbmZUZW1wb3JhbEVudGl0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlRlbXBvcmFsRW50aXR5JztcbmltcG9ydCB7IEluZlRleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGltZVByaW1pdGl2ZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0NsYXNzRmllbGRDb25maWcnO1xuaW1wb3J0IHsgUHJvRGZoQ2xhc3NQcm9qUmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvRGZoQ2xhc3NQcm9qUmVsJztcbmltcG9ydCB7IFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvRGZoUHJvZmlsZVByb2pSZWwnO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9JbmZvUHJvalJlbCc7XG5pbXBvcnQgeyBQcm9Qcm9qZWN0QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvUHJvamVjdCc7XG5pbXBvcnQgeyBQcm9UZXh0UHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9UZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgUHViQWNjb3VudEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1B1YkFjY291bnQnO1xuaW1wb3J0IHsgUHViQWNjb3VudFByb2plY3RSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9QdWJBY2NvdW50UHJvamVjdFJlbCc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TY2hlbWFPYmplY3QnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU0RLTW9kZWxzJztcbmltcG9ydCB7IFN5c0FwcENvbnRleHRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNBcHBDb250ZXh0JztcbmltcG9ydCB7IFN5c0NsYXNzRmllbGRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNDbGFzc0ZpZWxkJztcbmltcG9ydCB7IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCc7XG5pbXBvcnQgeyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzSGFzVHlwZVByb3BlcnR5JztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNTeXN0ZW1SZWxldmFudENsYXNzJztcbmltcG9ydCB7IFN5c1N5c3RlbVR5cGVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNTeXN0ZW1UeXBlJztcbmltcG9ydCB7IFNvY2tldEJyb3dzZXIgfSBmcm9tICcuL3NvY2tldHMvc29ja2V0LmJyb3dzZXInO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuaW1wb3J0IHsgU29ja2V0RHJpdmVyIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5kcml2ZXInO1xuaW1wb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5pbXBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuaW1wb3J0IHsgSW50ZXJuYWxTdG9yYWdlLCBTREtTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuLyoqXG4qIEBtb2R1bGUgU2RrTGIzTW9kdWxlXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBzaG91bGQgYmUgaW1wb3J0ZWQgd2hlbiBidWlsZGluZyBhIFdlYiBBcHBsaWNhdGlvbiBpbiB0aGUgZm9sbG93aW5nIHNjZW5hcmlvczpcbipcbiogIDEuLSBSZWd1bGFyIHdlYiBhcHBsaWNhdGlvblxuKiAgMi4tIEFuZ3VsYXIgdW5pdmVyc2FsIGFwcGxpY2F0aW9uIChCcm93c2VyIFBvcnRpb24pXG4qICAzLi0gUHJvZ3Jlc3NpdmUgYXBwbGljYXRpb25zIChBbmd1bGFyIE1vYmlsZSwgSW9uaWMsIFdlYlZpZXdzLCBldGMpXG4qKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JIYW5kbGVyLFxuICAgIFNvY2tldENvbm5lY3Rpb25cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZGtMYjNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChpbnRlcm5hbFN0b3JhZ2VQcm92aWRlcjogYW55ID0ge1xuICAgIHByb3ZpZGU6IEludGVybmFsU3RvcmFnZSxcbiAgICB1c2VDbGFzczogQ29va2llQnJvd3NlclxuICB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTZGtMYjNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTG9vcEJhY2tBdXRoLFxuICAgICAgICBMb2dnZXJTZXJ2aWNlLFxuICAgICAgICBTREtNb2RlbHMsXG4gICAgICAgIFJlYWxUaW1lLFxuICAgICAgICBTY2hlbWFPYmplY3RBcGksXG4gICAgICAgIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEFwaSxcbiAgICAgICAgU3lzQ2xhc3NGaWVsZEFwaSxcbiAgICAgICAgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlBcGksXG4gICAgICAgIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGksXG4gICAgICAgIFB1YkFjY291bnRBcGksXG4gICAgICAgIEVtYWlsQXBpLFxuICAgICAgICBQcm9Qcm9qZWN0QXBpLFxuICAgICAgICBQdWJBY2NvdW50UHJvamVjdFJlbEFwaSxcbiAgICAgICAgUHJvVGV4dFByb3BlcnR5QXBpLFxuICAgICAgICBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICAgICAgRGZoUHJvZmlsZUFwaSxcbiAgICAgICAgRGZoTGFiZWxBcGksXG4gICAgICAgIERhdENodW5rQXBpLFxuICAgICAgICBEYXRDb2x1bW5BcGksXG4gICAgICAgIERhdFRleHRQcm9wZXJ0eUFwaSxcbiAgICAgICAgRGF0RGlnaXRhbEFwaSxcbiAgICAgICAgU3lzQXBwQ29udGV4dEFwaSxcbiAgICAgICAgUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSxcbiAgICAgICAgUHJvRGZoQ2xhc3NQcm9qUmVsQXBpLFxuICAgICAgICBQcm9EZmhQcm9maWxlUHJvalJlbEFwaSxcbiAgICAgICAgSW5mQXBwZWxsYXRpb25BcGksXG4gICAgICAgIEluZkxhbmdTdHJpbmdBcGksXG4gICAgICAgIEluZkRpbWVuc2lvbkFwaSxcbiAgICAgICAgSW5mVGVtcG9yYWxFbnRpdHlBcGksXG4gICAgICAgIEluZlN0YXRlbWVudEFwaSxcbiAgICAgICAgSW5mTGFuZ3VhZ2VBcGksXG4gICAgICAgIEluZlBlcnNpc3RlbnRJdGVtQXBpLFxuICAgICAgICBJbmZUaW1lUHJpbWl0aXZlQXBpLFxuICAgICAgICBJbmZQbGFjZUFwaSxcbiAgICAgICAgRGF0TmFtZXNwYWNlQXBpLFxuICAgICAgICBJbmZUZXh0UHJvcGVydHlBcGksXG4gICAgICAgIFN5c1N5c3RlbVR5cGVBcGksXG4gICAgICAgIGludGVybmFsU3RvcmFnZVByb3ZpZGVyLFxuICAgICAgICB7IHByb3ZpZGU6IFNES1N0b3JhZ2UsIHVzZUNsYXNzOiBTdG9yYWdlQnJvd3NlciB9LFxuICAgICAgICB7IHByb3ZpZGU6IFNvY2tldERyaXZlciwgdXNlQ2xhc3M6IFNvY2tldEJyb3dzZXIgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbi8qKlxuKiBIYXZlIEZ1biEhIVxuKiAtIEpvblxuKiovXG5leHBvcnQgKiBmcm9tICcuL2xiLmNvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcbmV4cG9ydCB7IENvb2tpZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2UvY29va2llLmJyb3dzZXInO1xuZXhwb3J0IHsgU3RvcmFnZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5icm93c2VyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLnN3YXBzJztcblxuIl19