var SDKBrowserModule_1;
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
let SDKBrowserModule = SDKBrowserModule_1 = class SDKBrowserModule {
    static forRoot(internalStorageProvider = {
        provide: InternalStorage,
        useClass: CookieBrowser
    }) {
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
    }
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN6RixPQUFPLEVBQUUsZ0JB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O2dCQUNoQixzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsdUJBQXVCO2dCQUN2QixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLGVBQWU7Z0JBQ2YsY0FBYztnQkFDZCxvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsV0FBVztnQkFDWCxlQUFlO2dCQUNmLGtCQUFrQjtnQkFDbEIsZ0JBQWdCO2dCQUNoQix1QkFBdUI7Z0JBQ3ZCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO2dCQUNqRCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTthQUNuRDtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQW5EWSxnQkFBZ0I7SUFUNUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO1FBQ3pDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFFO1lBQ1QsWUFBWTtZQUNaLGdCQUFnQjtTQUNqQjtLQUNGLENBQUM7R0FDVyxnQkFBZ0IsQ0FtRDVCO1NBbkRZLGdCQUFnQjtBQW9EN0I7OztHQUdHO0FBQ0gsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMseUJBQXlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiogQG1vZHVsZSBTREtNb2R1bGVcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDpAam9obmNhc2FycnViaWFzPiA8Z2g6am9uYXRoYW4tY2FzYXJydWJpYXM+XG4qIEBsaWNlbnNlIE1JVCAyMDE2IEpvbmF0aGFuIENhc2FycnViaWFzXG4qIEB2ZXJzaW9uIDIuMS4wXG4qIEBkZXNjcmlwdGlvblxuKiBUaGUgU0RLTW9kdWxlIGlzIGEgZ2VuZXJhdGVkIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhdXRvbWF0aWNhbGx5IGJ1aWx0IGJ5XG4qIHRoZSBMb29wQmFjayBTREsgQnVpbGRlciBvcGVuIHNvdXJjZSBtb2R1bGUuXG4qXG4qIFRoZSBTREtNb2R1bGUgcHJvdmlkZXMgQW5ndWxhciAyID49IFJDLjUgc3VwcG9ydCwgd2hpY2ggbWVhbnMgdGhhdCBOZ01vZHVsZXNcbiogY2FuIGltcG9ydCB0aGlzIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhcyBmb2xsb3dzOlxuKlxuKlxuKiBBUFAgUm91dGUgTW9kdWxlIENvbnRleHRcbiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuKiBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gIGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuKiAvLyBBcHAgUm9vdFxuKiBpbXBvcnQgeyBBcHBDb21wb25lbnQgfSAgIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG4qIC8vIEZlYXR1cmUgTW9kdWxlc1xuKiBpbXBvcnQgeyBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zZGsvc2RrLm1vZHVsZSc7XG4qIC8vIEltcG9ydCBSb3V0aW5nXG4qIGltcG9ydCB7IHJvdXRpbmcgfSAgICAgICAgZnJvbSAnLi9hcHAucm91dGluZyc7XG4qIEBOZ01vZHVsZSh7XG4qICBpbXBvcnRzOiBbXG4qICAgIEJyb3dzZXJNb2R1bGUsXG4qICAgIHJvdXRpbmcsXG4qICAgIFNES1tCcm93c2VyfE5vZGV8TmF0aXZlXU1vZHVsZS5mb3JSb290KClcbiogIF0sXG4qICBkZWNsYXJhdGlvbnM6IFsgQXBwQ29tcG9uZW50IF0sXG4qICBib290c3RyYXA6ICAgIFsgQXBwQ29tcG9uZW50IF1cbiogfSlcbiogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbipcbioqL1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vbG9nZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU0RLTW9kZWxzJztcbmltcG9ydCB7IEludGVybmFsU3RvcmFnZSwgU0RLU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLnN3YXBzJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvb2tpZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2UvY29va2llLmJyb3dzZXInO1xuaW1wb3J0IHsgU3RvcmFnZUJyb3dzZXIgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5icm93c2VyJztcbmltcG9ydCB7IFNvY2tldEJyb3dzZXIgfSBmcm9tICcuL3NvY2tldHMvc29ja2V0LmJyb3dzZXInO1xuaW1wb3J0IHsgU29ja2V0RHJpdmVyIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5kcml2ZXInO1xuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuY29ubmVjdGlvbnMnO1xuaW1wb3J0IHsgUmVhbFRpbWUgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvcmVhbC50aW1lJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1NjaGVtYU9iamVjdCc7XG5pbXBvcnQgeyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzRmllbGQnO1xuaW1wb3J0IHsgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyc7XG5pbXBvcnQgeyBQdWJBY2NvdW50QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHViQWNjb3VudCc7XG5pbXBvcnQgeyBFbWFpbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0VtYWlsJztcbmltcG9ydCB7IFByb1Byb2plY3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9Qcm9qZWN0JztcbmltcG9ydCB7IFB1YkFjY291bnRQcm9qZWN0UmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHViQWNjb3VudFByb2plY3RSZWwnO1xuaW1wb3J0IHsgUHJvVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvVGV4dFByb3BlcnR5JztcbmltcG9ydCB7IFByb0luZm9Qcm9qUmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvSW5mb1Byb2pSZWwnO1xuaW1wb3J0IHsgRGZoUHJvZmlsZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RmaFByb2ZpbGUnO1xuaW1wb3J0IHsgRGZoTGFiZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EZmhMYWJlbCc7XG5pbXBvcnQgeyBEYXRDaHVua0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdENodW5rJztcbmltcG9ydCB7IERhdENvbHVtbkFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdENvbHVtbic7XG5pbXBvcnQgeyBEYXRUZXh0UHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRUZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgRGF0RGlnaXRhbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdERpZ2l0YWwnO1xuaW1wb3J0IHsgU3lzQXBwQ29udGV4dEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0FwcENvbnRleHQnO1xuaW1wb3J0IHsgUHJvQ2xhc3NGaWVsZENvbmZpZ0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0NsYXNzRmllbGRDb25maWcnO1xuaW1wb3J0IHsgUHJvRGZoQ2xhc3NQcm9qUmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvRGZoQ2xhc3NQcm9qUmVsJztcbmltcG9ydCB7IFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvRGZoUHJvZmlsZVByb2pSZWwnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb25BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZBcHBlbGxhdGlvbic7XG5pbXBvcnQgeyBJbmZMYW5nU3RyaW5nQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mTGFuZ1N0cmluZyc7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb25BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZEaW1lbnNpb24nO1xuaW1wb3J0IHsgSW5mVGVtcG9yYWxFbnRpdHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZUZW1wb3JhbEVudGl0eSc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZTdGF0ZW1lbnQnO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2VBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZMYW5ndWFnZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlBlcnNpc3RlbnRJdGVtJztcbmltcG9ydCB7IEluZlRpbWVQcmltaXRpdmVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZUaW1lUHJpbWl0aXZlJztcbmltcG9ydCB7IEluZlBsYWNlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mUGxhY2UnO1xuaW1wb3J0IHsgRGF0TmFtZXNwYWNlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0TmFtZXNwYWNlJztcbmltcG9ydCB7IEluZlRleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1UeXBlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzU3lzdGVtVHlwZSc7XG4vKipcbiogQG1vZHVsZSBTREtCcm93c2VyTW9kdWxlXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBzaG91bGQgYmUgaW1wb3J0ZWQgd2hlbiBidWlsZGluZyBhIFdlYiBBcHBsaWNhdGlvbiBpbiB0aGUgZm9sbG93aW5nIHNjZW5hcmlvczpcbipcbiogIDEuLSBSZWd1bGFyIHdlYiBhcHBsaWNhdGlvblxuKiAgMi4tIEFuZ3VsYXIgdW5pdmVyc2FsIGFwcGxpY2F0aW9uIChCcm93c2VyIFBvcnRpb24pXG4qICAzLi0gUHJvZ3Jlc3NpdmUgYXBwbGljYXRpb25zIChBbmd1bGFyIE1vYmlsZSwgSW9uaWMsIFdlYlZpZXdzLCBldGMpXG4qKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRXJyb3JIYW5kbGVyLFxuICAgIFNvY2tldENvbm5lY3Rpb25cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTREtCcm93c2VyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoaW50ZXJuYWxTdG9yYWdlUHJvdmlkZXI6IGFueSA9IHtcbiAgICBwcm92aWRlOiBJbnRlcm5hbFN0b3JhZ2UsXG4gICAgdXNlQ2xhc3M6IENvb2tpZUJyb3dzZXJcbiAgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU0RLQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBMb29wQmFja0F1dGgsXG4gICAgICAgIExvZ2dlclNlcnZpY2UsXG4gICAgICAgIFNES01vZGVscyxcbiAgICAgICAgUmVhbFRpbWUsXG4gICAgICAgIFNjaGVtYU9iamVjdEFwaSxcbiAgICAgICAgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsQXBpLFxuICAgICAgICBTeXNDbGFzc0ZpZWxkQXBpLFxuICAgICAgICBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUFwaSxcbiAgICAgICAgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSxcbiAgICAgICAgUHViQWNjb3VudEFwaSxcbiAgICAgICAgRW1haWxBcGksXG4gICAgICAgIFByb1Byb2plY3RBcGksXG4gICAgICAgIFB1YkFjY291bnRQcm9qZWN0UmVsQXBpLFxuICAgICAgICBQcm9UZXh0UHJvcGVydHlBcGksXG4gICAgICAgIFByb0luZm9Qcm9qUmVsQXBpLFxuICAgICAgICBEZmhQcm9maWxlQXBpLFxuICAgICAgICBEZmhMYWJlbEFwaSxcbiAgICAgICAgRGF0Q2h1bmtBcGksXG4gICAgICAgIERhdENvbHVtbkFwaSxcbiAgICAgICAgRGF0VGV4dFByb3BlcnR5QXBpLFxuICAgICAgICBEYXREaWdpdGFsQXBpLFxuICAgICAgICBTeXNBcHBDb250ZXh0QXBpLFxuICAgICAgICBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLFxuICAgICAgICBQcm9EZmhDbGFzc1Byb2pSZWxBcGksXG4gICAgICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLFxuICAgICAgICBJbmZBcHBlbGxhdGlvbkFwaSxcbiAgICAgICAgSW5mTGFuZ1N0cmluZ0FwaSxcbiAgICAgICAgSW5mRGltZW5zaW9uQXBpLFxuICAgICAgICBJbmZUZW1wb3JhbEVudGl0eUFwaSxcbiAgICAgICAgSW5mU3RhdGVtZW50QXBpLFxuICAgICAgICBJbmZMYW5ndWFnZUFwaSxcbiAgICAgICAgSW5mUGVyc2lzdGVudEl0ZW1BcGksXG4gICAgICAgIEluZlRpbWVQcmltaXRpdmVBcGksXG4gICAgICAgIEluZlBsYWNlQXBpLFxuICAgICAgICBEYXROYW1lc3BhY2VBcGksXG4gICAgICAgIEluZlRleHRQcm9wZXJ0eUFwaSxcbiAgICAgICAgU3lzU3lzdGVtVHlwZUFwaSxcbiAgICAgICAgaW50ZXJuYWxTdG9yYWdlUHJvdmlkZXIsXG4gICAgICAgIHsgcHJvdmlkZTogU0RLU3RvcmFnZSwgdXNlQ2xhc3M6IFN0b3JhZ2VCcm93c2VyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogU29ja2V0RHJpdmVyLCB1c2VDbGFzczogU29ja2V0QnJvd3NlciB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuLyoqXG4qIEhhdmUgRnVuISEhXG4qIC0gSm9uXG4qKi9cbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9sYi5jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuZXhwb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5leHBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuXG4iXX0=