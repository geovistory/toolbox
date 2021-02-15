var SdkLb3Module_1;
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
let SdkLb3Module = SdkLb3Module_1 = class SdkLb3Module {
    static forRoot(internalStorageProvider = {
        provide: InternalStorage,
        useClass: CookieBrowser
    }) {
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
    }
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxN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QixzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsdUJBQXVCO2dCQUN2QixpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLGVBQWU7Z0JBQ2YsY0FBYztnQkFDZCxvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsV0FBVztnQkFDWCxlQUFlO2dCQUNmLGtCQUFrQjtnQkFDbEIsZ0JBQWdCO2dCQUNoQix1QkFBdUI7Z0JBQ3ZCLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO2dCQUNqRCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTthQUNuRDtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQW5EWSxZQUFZO0lBVHhCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztRQUN6QyxZQUFZLEVBQUUsRUFBRTtRQUNoQixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRTtZQUNULFlBQVk7WUFDWixnQkFBZ0I7U0FDakI7S0FDRixDQUFDO0dBQ1csWUFBWSxDQW1EeEI7U0FuRFksWUFBWTtBQW9EekI7OztHQUdHO0FBQ0gsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsY0FBYyx5QkFBeUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiogQG1vZHVsZSBTREtNb2R1bGVcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDpAam9obmNhc2FycnViaWFzPiA8Z2g6am9uYXRoYW4tY2FzYXJydWJpYXM+XG4qIEBsaWNlbnNlIE1JVCAyMDE2IEpvbmF0aGFuIENhc2FycnViaWFzXG4qIEB2ZXJzaW9uIDIuMS4wXG4qIEBkZXNjcmlwdGlvblxuKiBUaGUgU0RLTW9kdWxlIGlzIGEgZ2VuZXJhdGVkIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhdXRvbWF0aWNhbGx5IGJ1aWx0IGJ5XG4qIHRoZSBMb29wQmFjayBTREsgQnVpbGRlciBvcGVuIHNvdXJjZSBtb2R1bGUuXG4qXG4qIFRoZSBTREtNb2R1bGUgcHJvdmlkZXMgQW5ndWxhciAyID49IFJDLjUgc3VwcG9ydCwgd2hpY2ggbWVhbnMgdGhhdCBOZ01vZHVsZXNcbiogY2FuIGltcG9ydCB0aGlzIFNvZnR3YXJlIERldmVsb3BtZW50IEtpdCBhcyBmb2xsb3dzOlxuKlxuKlxuKiBBUFAgUm91dGUgTW9kdWxlIENvbnRleHRcbiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuKiBpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gIGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuKiAvLyBBcHAgUm9vdFxuKiBpbXBvcnQgeyBBcHBDb21wb25lbnQgfSAgIGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG4qIC8vIEZlYXR1cmUgTW9kdWxlc1xuKiBpbXBvcnQgeyBTREtbQnJvd3NlcnxOb2RlfE5hdGl2ZV1Nb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zZGsvc2RrLm1vZHVsZSc7XG4qIC8vIEltcG9ydCBSb3V0aW5nXG4qIGltcG9ydCB7IHJvdXRpbmcgfSAgICAgICAgZnJvbSAnLi9hcHAucm91dGluZyc7XG4qIEBOZ01vZHVsZSh7XG4qICBpbXBvcnRzOiBbXG4qICAgIEJyb3dzZXJNb2R1bGUsXG4qICAgIHJvdXRpbmcsXG4qICAgIFNES1tCcm93c2VyfE5vZGV8TmF0aXZlXU1vZHVsZS5mb3JSb290KClcbiogIF0sXG4qICBkZWNsYXJhdGlvbnM6IFsgQXBwQ29tcG9uZW50IF0sXG4qICBib290c3RyYXA6ICAgIFsgQXBwQ29tcG9uZW50IF1cbiogfSlcbiogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbipcbioqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBSZWFsVGltZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9yZWFsLnRpbWUnO1xuaW1wb3J0IHsgRGF0Q2h1bmtBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRDaHVuayc7XG5pbXBvcnQgeyBEYXRDb2x1bW5BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXRDb2x1bW4nO1xuaW1wb3J0IHsgRGF0RGlnaXRhbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdERpZ2l0YWwnO1xuaW1wb3J0IHsgRGF0TmFtZXNwYWNlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0TmFtZXNwYWNlJztcbmltcG9ydCB7IERhdFRleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdFRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBEZmhMYWJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RmaExhYmVsJztcbmltcG9ydCB7IERmaFByb2ZpbGVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EZmhQcm9maWxlJztcbmltcG9ydCB7IEVtYWlsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRW1haWwnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb25BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZBcHBlbGxhdGlvbic7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb25BcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZEaW1lbnNpb24nO1xuaW1wb3J0IHsgSW5mTGFuZ1N0cmluZ0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZkxhbmdTdHJpbmcnO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2VBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZMYW5ndWFnZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlBlcnNpc3RlbnRJdGVtJztcbmltcG9ydCB7IEluZlBsYWNlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mUGxhY2UnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IEluZlRlbXBvcmFsRW50aXR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGVtcG9yYWxFbnRpdHknO1xuaW1wb3J0IHsgSW5mVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGV4dFByb3BlcnR5JztcbmltcG9ydCB7IEluZlRpbWVQcmltaXRpdmVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZUaW1lUHJpbWl0aXZlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvQ2xhc3NGaWVsZENvbmZpZyc7XG5pbXBvcnQgeyBQcm9EZmhDbGFzc1Byb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9EZmhDbGFzc1Byb2pSZWwnO1xuaW1wb3J0IHsgUHJvRGZoUHJvZmlsZVByb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9EZmhQcm9maWxlUHJvalJlbCc7XG5pbXBvcnQgeyBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb0luZm9Qcm9qUmVsJztcbmltcG9ydCB7IFByb1Byb2plY3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9Qcm9qZWN0JztcbmltcG9ydCB7IFByb1RleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb1RleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBQdWJBY2NvdW50QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHViQWNjb3VudCc7XG5pbXBvcnQgeyBQdWJBY2NvdW50UHJvamVjdFJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1B1YkFjY291bnRQcm9qZWN0UmVsJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1NjaGVtYU9iamVjdCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TREtNb2RlbHMnO1xuaW1wb3J0IHsgU3lzQXBwQ29udGV4dEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0FwcENvbnRleHQnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzRmllbGQnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsJztcbmltcG9ydCB7IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHknO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c1N5c3RlbVJlbGV2YW50Q2xhc3MnO1xuaW1wb3J0IHsgU3lzU3lzdGVtVHlwZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c1N5c3RlbVR5cGUnO1xuaW1wb3J0IHsgU29ja2V0QnJvd3NlciB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuYnJvd3Nlcic7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBTb2NrZXREcml2ZXIgfSBmcm9tICcuL3NvY2tldHMvc29ja2V0LmRyaXZlcic7XG5pbXBvcnQgeyBDb29raWVCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL2Nvb2tpZS5icm93c2VyJztcbmltcG9ydCB7IFN0b3JhZ2VCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuYnJvd3Nlcic7XG5pbXBvcnQgeyBJbnRlcm5hbFN0b3JhZ2UsIFNES1N0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XG4vKipcbiogQG1vZHVsZSBTZGtMYjNNb2R1bGVcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBpbXBvcnRlZCB3aGVuIGJ1aWxkaW5nIGEgV2ViIEFwcGxpY2F0aW9uIGluIHRoZSBmb2xsb3dpbmcgc2NlbmFyaW9zOlxuKlxuKiAgMS4tIFJlZ3VsYXIgd2ViIGFwcGxpY2F0aW9uXG4qICAyLi0gQW5ndWxhciB1bml2ZXJzYWwgYXBwbGljYXRpb24gKEJyb3dzZXIgUG9ydGlvbilcbiogIDMuLSBQcm9ncmVzc2l2ZSBhcHBsaWNhdGlvbnMgKEFuZ3VsYXIgTW9iaWxlLCBJb25pYywgV2ViVmlld3MsIGV0YylcbioqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvckhhbmRsZXIsXG4gICAgU29ja2V0Q29ubmVjdGlvblxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNka0xiM01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGludGVybmFsU3RvcmFnZVByb3ZpZGVyOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogSW50ZXJuYWxTdG9yYWdlLFxuICAgIHVzZUNsYXNzOiBDb29raWVCcm93c2VyXG4gIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNka0xiM01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBMb29wQmFja0F1dGgsXG4gICAgICAgIExvZ2dlclNlcnZpY2UsXG4gICAgICAgIFNES01vZGVscyxcbiAgICAgICAgUmVhbFRpbWUsXG4gICAgICAgIFNjaGVtYU9iamVjdEFwaSxcbiAgICAgICAgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsQXBpLFxuICAgICAgICBTeXNDbGFzc0ZpZWxkQXBpLFxuICAgICAgICBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUFwaSxcbiAgICAgICAgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0FwaSxcbiAgICAgICAgUHViQWNjb3VudEFwaSxcbiAgICAgICAgRW1haWxBcGksXG4gICAgICAgIFByb1Byb2plY3RBcGksXG4gICAgICAgIFB1YkFjY291bnRQcm9qZWN0UmVsQXBpLFxuICAgICAgICBQcm9UZXh0UHJvcGVydHlBcGksXG4gICAgICAgIFByb0luZm9Qcm9qUmVsQXBpLFxuICAgICAgICBEZmhQcm9maWxlQXBpLFxuICAgICAgICBEZmhMYWJlbEFwaSxcbiAgICAgICAgRGF0Q2h1bmtBcGksXG4gICAgICAgIERhdENvbHVtbkFwaSxcbiAgICAgICAgRGF0VGV4dFByb3BlcnR5QXBpLFxuICAgICAgICBEYXREaWdpdGFsQXBpLFxuICAgICAgICBTeXNBcHBDb250ZXh0QXBpLFxuICAgICAgICBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpLFxuICAgICAgICBQcm9EZmhDbGFzc1Byb2pSZWxBcGksXG4gICAgICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsQXBpLFxuICAgICAgICBJbmZBcHBlbGxhdGlvbkFwaSxcbiAgICAgICAgSW5mTGFuZ1N0cmluZ0FwaSxcbiAgICAgICAgSW5mRGltZW5zaW9uQXBpLFxuICAgICAgICBJbmZUZW1wb3JhbEVudGl0eUFwaSxcbiAgICAgICAgSW5mU3RhdGVtZW50QXBpLFxuICAgICAgICBJbmZMYW5ndWFnZUFwaSxcbiAgICAgICAgSW5mUGVyc2lzdGVudEl0ZW1BcGksXG4gICAgICAgIEluZlRpbWVQcmltaXRpdmVBcGksXG4gICAgICAgIEluZlBsYWNlQXBpLFxuICAgICAgICBEYXROYW1lc3BhY2VBcGksXG4gICAgICAgIEluZlRleHRQcm9wZXJ0eUFwaSxcbiAgICAgICAgU3lzU3lzdGVtVHlwZUFwaSxcbiAgICAgICAgaW50ZXJuYWxTdG9yYWdlUHJvdmlkZXIsXG4gICAgICAgIHsgcHJvdmlkZTogU0RLU3RvcmFnZSwgdXNlQ2xhc3M6IFN0b3JhZ2VCcm93c2VyIH0sXG4gICAgICAgIHsgcHJvdmlkZTogU29ja2V0RHJpdmVyLCB1c2VDbGFzczogU29ja2V0QnJvd3NlciB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuLyoqXG4qIEhhdmUgRnVuISEhXG4qIC0gSm9uXG4qKi9cbmV4cG9ydCAqIGZyb20gJy4vbGIuY29uZmlnJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuZXhwb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5leHBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuXG4iXX0=