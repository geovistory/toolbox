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
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { SchemaObjectApi } from './services/custom/SchemaObject';
import { SysClassFieldPropertyRelApi } from './services/custom/SysClassFieldPropertyRel';
import { SysClassFieldApi } from './services/custom/SysClassField';
import { SysClassHasTypePropertyApi } from './services/custom/SysClassHasTypeProperty';
import { SysSystemRelevantClassApi } from './services/custom/SysSystemRelevantClass';
import { PubAccountApi } from './services/custom/PubAccount';
import { EmailApi } from './services/custom/Email';
import { ProProjectApi } from './services/custom/ProProject';
import { PubAccountProjectRelApi } from './services/custom/PubAccountProjectRel';
import { ProTextPropertyApi } from './services/custom/ProTextProperty';
import { ProInfoProjRelApi } from './services/custom/ProInfoProjRel';
import { DfhProfileApi } from './services/custom/DfhProfile';
import { DfhLabelApi } from './services/custom/DfhLabel';
import { DatChunkApi } from './services/custom/DatChunk';
import { DatColumnApi } from './services/custom/DatColumn';
import { DatTextPropertyApi } from './services/custom/DatTextProperty';
import { DatDigitalApi } from './services/custom/DatDigital';
import { SysAppContextApi } from './services/custom/SysAppContext';
import { ProClassFieldConfigApi } from './services/custom/ProClassFieldConfig';
import { ProDfhClassProjRelApi } from './services/custom/ProDfhClassProjRel';
import { ProDfhProfileProjRelApi } from './services/custom/ProDfhProfileProjRel';
import { InfAppellationApi } from './services/custom/InfAppellation';
import { InfLangStringApi } from './services/custom/InfLangString';
import { InfDimensionApi } from './services/custom/InfDimension';
import { InfTemporalEntityApi } from './services/custom/InfTemporalEntity';
import { InfStatementApi } from './services/custom/InfStatement';
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
var SDKBrowserModule = /** @class */ (function () {
    function SDKBrowserModule() {
    }
    SDKBrowserModule_1 = SDKBrowserModule;
    SDKBrowserModule.forRoot = function (internalStorageProvider) {
        if (internalStorageProvider === void 0) { internalStorageProvider = {
            provide: InternalStorage,
            useClass: CookieBrowser
        }; }
        return {
            ngModule: SDKBrowserModule_1,
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
    var SDKBrowserModule_1;
    SDKBrowserModule = SDKBrowserModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, HttpClientModule],
            declarations: [],
            exports: [],
            providers: [
                ErrorHandler,
                SocketConnection
            ]
        })
    ], SDKBrowserModule);
    return SDKBrowserModule;
}());
export { SDKBrowserModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FOzs7Ozs7OztHQVFHO0FBVUg7SUFBQTtJQW1EQSxDQUFDO3lCQW5EWSxnQkFBZ0I7SUFDcEIsd0JBQU8sR0FBZCxVQUFlLHVCQUdkO1FBSGMsd0NBQUEsRUFBQTtZQUNiLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0MsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBZ0I7WUFDMUIsU0FBUyxFQUFFO2dCQUNULFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixTQUFTO2dCQUNULFFBQVE7Z0JBQ1IsZUFBZTtnQkFDZiwyQkFBMkI7Z0JBQzNCLGdCQUFnQjtnQkFDaEIsMEJBQTBCO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLGFBQWE7Z0JBQ2IsUUFBUTtnQkFDUixhQUFhO2dCQUNiLHVCQUF1QjtnQkFDdkIsa0JBQWtCO2dCQUNsQixpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFlBQVk7Z0JBQ1osa0JBQWtCO2dCQUNsQixhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0QixxQkFBcUI7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLGVBQWU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2Qsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLFdBQVc7Z0JBQ1gsZUFBZTtnQkFDZixrQkFBa0I7Z0JBQ2xCLGdCQUFnQjtnQkFDaEIsdUJBQXVCO2dCQUN2QixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRTtnQkFDakQsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDbkQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFsRFUsZ0JBQWdCO1FBVDVCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztZQUN6QyxZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRTtnQkFDVCxZQUFZO2dCQUNaLGdCQUFnQjthQUNqQjtTQUNGLENBQUM7T0FDVyxnQkFBZ0IsQ0FtRDVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSxnQkFBZ0I7QUFvRDdCOzs7R0FHRztBQUNILGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLHlCQUF5QixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4qIEBtb2R1bGUgU0RLTW9kdWxlXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdoOmpvbmF0aGFuLWNhc2FycnViaWFzPlxuKiBAbGljZW5zZSBNSVQgMjAxNiBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuKiBAdmVyc2lvbiAyLjEuMFxuKiBAZGVzY3JpcHRpb25cbiogVGhlIFNES01vZHVsZSBpcyBhIGdlbmVyYXRlZCBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXV0b21hdGljYWxseSBidWlsdCBieVxuKiB0aGUgTG9vcEJhY2sgU0RLIEJ1aWxkZXIgb3BlbiBzb3VyY2UgbW9kdWxlLlxuKlxuKiBUaGUgU0RLTW9kdWxlIHByb3ZpZGVzIEFuZ3VsYXIgMiA+PSBSQy41IHN1cHBvcnQsIHdoaWNoIG1lYW5zIHRoYXQgTmdNb2R1bGVzXG4qIGNhbiBpbXBvcnQgdGhpcyBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXMgZm9sbG93czpcbipcbipcbiogQVBQIFJvdXRlIE1vZHVsZSBDb250ZXh0XG4qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbiogaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbiogLy8gQXBwIFJvb3RcbiogaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuKiAvLyBGZWF0dXJlIE1vZHVsZXNcbiogaW1wb3J0IHsgU0RLW0Jyb3dzZXJ8Tm9kZXxOYXRpdmVdTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2RrL3Nkay5tb2R1bGUnO1xuKiAvLyBJbXBvcnQgUm91dGluZ1xuKiBpbXBvcnQgeyByb3V0aW5nIH0gICAgICAgIGZyb20gJy4vYXBwLnJvdXRpbmcnO1xuKiBATmdNb2R1bGUoe1xuKiAgaW1wb3J0czogW1xuKiAgICBCcm93c2VyTW9kdWxlLFxuKiAgICByb3V0aW5nLFxuKiAgICBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUuZm9yUm9vdCgpXG4qICBdLFxuKiAgZGVjbGFyYXRpb25zOiBbIEFwcENvbXBvbmVudCBdLFxuKiAgYm9vdHN0cmFwOiAgICBbIEFwcENvbXBvbmVudCBdXG4qIH0pXG4qIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4qXG4qKi9cbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vc2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL2xvZ2dlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1NES01vZGVscyc7XG5pbXBvcnQgeyBJbnRlcm5hbFN0b3JhZ2UsIFNES1N0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL2Nvb2tpZS5icm93c2VyJztcbmltcG9ydCB7IFN0b3JhZ2VCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuYnJvd3Nlcic7XG5pbXBvcnQgeyBTb2NrZXRCcm93c2VyIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5icm93c2VyJztcbmltcG9ydCB7IFNvY2tldERyaXZlciB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuZHJpdmVyJztcbmltcG9ydCB7IFNvY2tldENvbm5lY3Rpb24gfSBmcm9tICcuL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcbmltcG9ydCB7IFJlYWxUaW1lIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL3JlYWwudGltZSc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TY2hlbWFPYmplY3QnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsJztcbmltcG9ydCB7IFN5c0NsYXNzRmllbGRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNDbGFzc0ZpZWxkJztcbmltcG9ydCB7IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHknO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c1N5c3RlbVJlbGV2YW50Q2xhc3MnO1xuaW1wb3J0IHsgUHViQWNjb3VudEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1B1YkFjY291bnQnO1xuaW1wb3J0IHsgRW1haWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9FbWFpbCc7XG5pbXBvcnQgeyBQcm9Qcm9qZWN0QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvUHJvamVjdCc7XG5pbXBvcnQgeyBQdWJBY2NvdW50UHJvamVjdFJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1B1YkFjY291bnRQcm9qZWN0UmVsJztcbmltcG9ydCB7IFByb1RleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb1RleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0luZm9Qcm9qUmVsJztcbmltcG9ydCB7IERmaFByb2ZpbGVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EZmhQcm9maWxlJztcbmltcG9ydCB7IERmaExhYmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGZoTGFiZWwnO1xuaW1wb3J0IHsgRGF0Q2h1bmtBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRDaHVuayc7XG5pbXBvcnQgeyBEYXRDb2x1bW5BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRDb2x1bW4nO1xuaW1wb3J0IHsgRGF0VGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0VGV4dFByb3BlcnR5JztcbmltcG9ydCB7IERhdERpZ2l0YWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXREaWdpdGFsJztcbmltcG9ydCB7IFN5c0FwcENvbnRleHRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNBcHBDb250ZXh0JztcbmltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWdBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9DbGFzc0ZpZWxkQ29uZmlnJztcbmltcG9ydCB7IFByb0RmaENsYXNzUHJvalJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0RmaENsYXNzUHJvalJlbCc7XG5pbXBvcnQgeyBQcm9EZmhQcm9maWxlUHJvalJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0RmaFByb2ZpbGVQcm9qUmVsJztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mQXBwZWxsYXRpb24nO1xuaW1wb3J0IHsgSW5mTGFuZ1N0cmluZ0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZkxhbmdTdHJpbmcnO1xuaW1wb3J0IHsgSW5mRGltZW5zaW9uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mRGltZW5zaW9uJztcbmltcG9ydCB7IEluZlRlbXBvcmFsRW50aXR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGVtcG9yYWxFbnRpdHknO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IEluZkxhbmd1YWdlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mTGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSW5mUGVyc2lzdGVudEl0ZW1BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZQZXJzaXN0ZW50SXRlbSc7XG5pbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGltZVByaW1pdGl2ZSc7XG5pbXBvcnQgeyBJbmZQbGFjZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlBsYWNlJztcbmltcG9ydCB7IERhdE5hbWVzcGFjZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdE5hbWVzcGFjZSc7XG5pbXBvcnQgeyBJbmZUZXh0UHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZUZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgU3lzU3lzdGVtVHlwZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c1N5c3RlbVR5cGUnO1xuLyoqXG4qIEBtb2R1bGUgU0RLQnJvd3Nlck1vZHVsZVxuKiBAZGVzY3JpcHRpb25cbiogVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGltcG9ydGVkIHdoZW4gYnVpbGRpbmcgYSBXZWIgQXBwbGljYXRpb24gaW4gdGhlIGZvbGxvd2luZyBzY2VuYXJpb3M6XG4qXG4qICAxLi0gUmVndWxhciB3ZWIgYXBwbGljYXRpb25cbiogIDIuLSBBbmd1bGFyIHVuaXZlcnNhbCBhcHBsaWNhdGlvbiAoQnJvd3NlciBQb3J0aW9uKVxuKiAgMy4tIFByb2dyZXNzaXZlIGFwcGxpY2F0aW9ucyAoQW5ndWxhciBNb2JpbGUsIElvbmljLCBXZWJWaWV3cywgZXRjKVxuKiovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIEVycm9ySGFuZGxlcixcbiAgICBTb2NrZXRDb25uZWN0aW9uXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU0RLQnJvd3Nlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGludGVybmFsU3RvcmFnZVByb3ZpZGVyOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogSW50ZXJuYWxTdG9yYWdlLFxuICAgIHVzZUNsYXNzOiBDb29raWVCcm93c2VyXG4gIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNES0Jyb3dzZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTG9vcEJhY2tBdXRoLFxuICAgICAgICBMb2dnZXJTZXJ2aWNlLFxuICAgICAgICBTREtNb2RlbHMsXG4gICAgICAgIFJlYWxUaW1lLFxuICAgICAgICBTY2hlbWFPYmplY3RBcGksXG4gICAgICAgIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEFwaSxcbiAgICAgICAgU3lzQ2xhc3NGaWVsZEFwaSxcbiAgICAgICAgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlBcGksXG4gICAgICAgIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGksXG4gICAgICAgIFB1YkFjY291bnRBcGksXG4gICAgICAgIEVtYWlsQXBpLFxuICAgICAgICBQcm9Qcm9qZWN0QXBpLFxuICAgICAgICBQdWJBY2NvdW50UHJvamVjdFJlbEFwaSxcbiAgICAgICAgUHJvVGV4dFByb3BlcnR5QXBpLFxuICAgICAgICBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICAgICAgRGZoUHJvZmlsZUFwaSxcbiAgICAgICAgRGZoTGFiZWxBcGksXG4gICAgICAgIERhdENodW5rQXBpLFxuICAgICAgICBEYXRDb2x1bW5BcGksXG4gICAgICAgIERhdFRleHRQcm9wZXJ0eUFwaSxcbiAgICAgICAgRGF0RGlnaXRhbEFwaSxcbiAgICAgICAgU3lzQXBwQ29udGV4dEFwaSxcbiAgICAgICAgUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSxcbiAgICAgICAgUHJvRGZoQ2xhc3NQcm9qUmVsQXBpLFxuICAgICAgICBQcm9EZmhQcm9maWxlUHJvalJlbEFwaSxcbiAgICAgICAgSW5mQXBwZWxsYXRpb25BcGksXG4gICAgICAgIEluZkxhbmdTdHJpbmdBcGksXG4gICAgICAgIEluZkRpbWVuc2lvbkFwaSxcbiAgICAgICAgSW5mVGVtcG9yYWxFbnRpdHlBcGksXG4gICAgICAgIEluZlN0YXRlbWVudEFwaSxcbiAgICAgICAgSW5mTGFuZ3VhZ2VBcGksXG4gICAgICAgIEluZlBlcnNpc3RlbnRJdGVtQXBpLFxuICAgICAgICBJbmZUaW1lUHJpbWl0aXZlQXBpLFxuICAgICAgICBJbmZQbGFjZUFwaSxcbiAgICAgICAgRGF0TmFtZXNwYWNlQXBpLFxuICAgICAgICBJbmZUZXh0UHJvcGVydHlBcGksXG4gICAgICAgIFN5c1N5c3RlbVR5cGVBcGksXG4gICAgICAgIGludGVybmFsU3RvcmFnZVByb3ZpZGVyLFxuICAgICAgICB7IHByb3ZpZGU6IFNES1N0b3JhZ2UsIHVzZUNsYXNzOiBTdG9yYWdlQnJvd3NlciB9LFxuICAgICAgICB7IHByb3ZpZGU6IFNvY2tldERyaXZlciwgdXNlQ2xhc3M6IFNvY2tldEJyb3dzZXIgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbi8qKlxuKiBIYXZlIEZ1biEhIVxuKiAtIEpvblxuKiovXG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vbGIuY29uZmlnJztcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLnN3YXBzJztcbmV4cG9ydCB7IENvb2tpZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2UvY29va2llLmJyb3dzZXInO1xuZXhwb3J0IHsgU3RvcmFnZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5icm93c2VyJztcblxuIl19