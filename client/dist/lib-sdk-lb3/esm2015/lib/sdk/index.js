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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3pGLE9BQU8s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YixnQkFBZ0I7Z0JBQ2hCLHNCQUFzQjtnQkFDdEIscUJBQXFCO2dCQUNyQix1QkFBdUI7Z0JBQ3ZCLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQixlQUFlO2dCQUNmLG9CQUFvQjtnQkFDcEIsZUFBZTtnQkFDZixjQUFjO2dCQUNkLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQixXQUFXO2dCQUNYLGVBQWU7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixnQkFBZ0I7Z0JBQ2hCLHVCQUF1QjtnQkFDdkIsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7Z0JBQ2pELEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFO2FBQ25EO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBbkRZLGdCQUFnQjtJQVQ1QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7UUFDekMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUU7WUFDVCxZQUFZO1lBQ1osZ0JBQWdCO1NBQ2pCO0tBQ0YsQ0FBQztHQUNXLGdCQUFnQixDQW1ENUI7U0FuRFksZ0JBQWdCO0FBb0Q3Qjs7O0dBR0c7QUFDSCxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyx5QkFBeUIsQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuKiBAbW9kdWxlIFNES01vZHVsZVxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OkBqb2huY2FzYXJydWJpYXM+IDxnaDpqb25hdGhhbi1jYXNhcnJ1Ymlhcz5cbiogQGxpY2Vuc2UgTUlUIDIwMTYgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiogQHZlcnNpb24gMi4xLjBcbiogQGRlc2NyaXB0aW9uXG4qIFRoZSBTREtNb2R1bGUgaXMgYSBnZW5lcmF0ZWQgU29mdHdhcmUgRGV2ZWxvcG1lbnQgS2l0IGF1dG9tYXRpY2FsbHkgYnVpbHQgYnlcbiogdGhlIExvb3BCYWNrIFNESyBCdWlsZGVyIG9wZW4gc291cmNlIG1vZHVsZS5cbipcbiogVGhlIFNES01vZHVsZSBwcm92aWRlcyBBbmd1bGFyIDIgPj0gUkMuNSBzdXBwb3J0LCB3aGljaCBtZWFucyB0aGF0IE5nTW9kdWxlc1xuKiBjYW4gaW1wb3J0IHRoaXMgU29mdHdhcmUgRGV2ZWxvcG1lbnQgS2l0IGFzIGZvbGxvd3M6XG4qXG4qXG4qIEFQUCBSb3V0ZSBNb2R1bGUgQ29udGV4dFxuKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qIGltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4qIGltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSAgZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4qIC8vIEFwcCBSb290XG4qIGltcG9ydCB7IEFwcENvbXBvbmVudCB9ICAgZnJvbSAnLi9hcHAuY29tcG9uZW50JztcbiogLy8gRmVhdHVyZSBNb2R1bGVzXG4qIGltcG9ydCB7IFNES1tCcm93c2VyfE5vZGV8TmF0aXZlXU1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3Nkay9zZGsubW9kdWxlJztcbiogLy8gSW1wb3J0IFJvdXRpbmdcbiogaW1wb3J0IHsgcm91dGluZyB9ICAgICAgICBmcm9tICcuL2FwcC5yb3V0aW5nJztcbiogQE5nTW9kdWxlKHtcbiogIGltcG9ydHM6IFtcbiogICAgQnJvd3Nlck1vZHVsZSxcbiogICAgcm91dGluZyxcbiogICAgU0RLW0Jyb3dzZXJ8Tm9kZXxOYXRpdmVdTW9kdWxlLmZvclJvb3QoKVxuKiAgXSxcbiogIGRlY2xhcmF0aW9uczogWyBBcHBDb21wb25lbnQgXSxcbiogIGJvb3RzdHJhcDogICAgWyBBcHBDb21wb25lbnQgXVxuKiB9KVxuKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuKlxuKiovXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TREtNb2RlbHMnO1xuaW1wb3J0IHsgSW50ZXJuYWxTdG9yYWdlLCBTREtTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5pbXBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuaW1wb3J0IHsgU29ja2V0QnJvd3NlciB9IGZyb20gJy4vc29ja2V0cy9zb2NrZXQuYnJvd3Nlcic7XG5pbXBvcnQgeyBTb2NrZXREcml2ZXIgfSBmcm9tICcuL3NvY2tldHMvc29ja2V0LmRyaXZlcic7XG5pbXBvcnQgeyBTb2NrZXRDb25uZWN0aW9uIH0gZnJvbSAnLi9zb2NrZXRzL3NvY2tldC5jb25uZWN0aW9ucyc7XG5pbXBvcnQgeyBSZWFsVGltZSB9IGZyb20gJy4vc2VydmljZXMvY29yZS9yZWFsLnRpbWUnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU2NoZW1hT2JqZWN0JztcbmltcG9ydCB7IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCc7XG5pbXBvcnQgeyBTeXNDbGFzc0ZpZWxkQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQ2xhc3NGaWVsZCc7XG5pbXBvcnQgeyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1N5c0NsYXNzSGFzVHlwZVByb3BlcnR5JztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNTeXN0ZW1SZWxldmFudENsYXNzJztcbmltcG9ydCB7IFB1YkFjY291bnRBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9QdWJBY2NvdW50JztcbmltcG9ydCB7IEVtYWlsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRW1haWwnO1xuaW1wb3J0IHsgUHJvUHJvamVjdEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1Byb1Byb2plY3QnO1xuaW1wb3J0IHsgUHViQWNjb3VudFByb2plY3RSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9QdWJBY2NvdW50UHJvamVjdFJlbCc7XG5pbXBvcnQgeyBQcm9UZXh0UHJvcGVydHlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9UZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9JbmZvUHJvalJlbCc7XG5pbXBvcnQgeyBEZmhQcm9maWxlQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGZoUHJvZmlsZSc7XG5pbXBvcnQgeyBEZmhMYWJlbEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RmaExhYmVsJztcbmltcG9ydCB7IERhdENodW5rQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0Q2h1bmsnO1xuaW1wb3J0IHsgRGF0Q29sdW1uQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0Q29sdW1uJztcbmltcG9ydCB7IERhdFRleHRQcm9wZXJ0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0RhdFRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBEYXREaWdpdGFsQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vRGF0RGlnaXRhbCc7XG5pbXBvcnQgeyBTeXNBcHBDb250ZXh0QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vU3lzQXBwQ29udGV4dCc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vUHJvQ2xhc3NGaWVsZENvbmZpZyc7XG5pbXBvcnQgeyBQcm9EZmhDbGFzc1Byb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9EZmhDbGFzc1Byb2pSZWwnO1xuaW1wb3J0IHsgUHJvRGZoUHJvZmlsZVByb2pSZWxBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Qcm9EZmhQcm9maWxlUHJvalJlbCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbkFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZkFwcGVsbGF0aW9uJztcbmltcG9ydCB7IEluZkxhbmdTdHJpbmdBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZMYW5nU3RyaW5nJztcbmltcG9ydCB7IEluZkRpbWVuc2lvbkFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZkRpbWVuc2lvbic7XG5pbXBvcnQgeyBJbmZUZW1wb3JhbEVudGl0eUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlRlbXBvcmFsRW50aXR5JztcbmltcG9ydCB7IEluZlN0YXRlbWVudEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlN0YXRlbWVudCc7XG5pbXBvcnQgeyBJbmZMYW5ndWFnZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZkxhbmd1YWdlJztcbmltcG9ydCB7IEluZlBlcnNpc3RlbnRJdGVtQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mUGVyc2lzdGVudEl0ZW0nO1xuaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0luZlRpbWVQcmltaXRpdmUnO1xuaW1wb3J0IHsgSW5mUGxhY2VBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbmZQbGFjZSc7XG5pbXBvcnQgeyBEYXROYW1lc3BhY2VBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9EYXROYW1lc3BhY2UnO1xuaW1wb3J0IHsgSW5mVGV4dFByb3BlcnR5QXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW5mVGV4dFByb3BlcnR5JztcbmltcG9ydCB7IFN5c1N5c3RlbVR5cGVBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TeXNTeXN0ZW1UeXBlJztcbi8qKlxuKiBAbW9kdWxlIFNES0Jyb3dzZXJNb2R1bGVcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBpbXBvcnRlZCB3aGVuIGJ1aWxkaW5nIGEgV2ViIEFwcGxpY2F0aW9uIGluIHRoZSBmb2xsb3dpbmcgc2NlbmFyaW9zOlxuKlxuKiAgMS4tIFJlZ3VsYXIgd2ViIGFwcGxpY2F0aW9uXG4qICAyLi0gQW5ndWxhciB1bml2ZXJzYWwgYXBwbGljYXRpb24gKEJyb3dzZXIgUG9ydGlvbilcbiogIDMuLSBQcm9ncmVzc2l2ZSBhcHBsaWNhdGlvbnMgKEFuZ3VsYXIgTW9iaWxlLCBJb25pYywgV2ViVmlld3MsIGV0YylcbioqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBFcnJvckhhbmRsZXIsXG4gICAgU29ja2V0Q29ubmVjdGlvblxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNES0Jyb3dzZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChpbnRlcm5hbFN0b3JhZ2VQcm92aWRlcjogYW55ID0ge1xuICAgIHByb3ZpZGU6IEludGVybmFsU3RvcmFnZSxcbiAgICB1c2VDbGFzczogQ29va2llQnJvd3NlclxuICB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTREtCcm93c2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIExvb3BCYWNrQXV0aCxcbiAgICAgICAgTG9nZ2VyU2VydmljZSxcbiAgICAgICAgU0RLTW9kZWxzLFxuICAgICAgICBSZWFsVGltZSxcbiAgICAgICAgU2NoZW1hT2JqZWN0QXBpLFxuICAgICAgICBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxBcGksXG4gICAgICAgIFN5c0NsYXNzRmllbGRBcGksXG4gICAgICAgIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5QXBpLFxuICAgICAgICBTeXNTeXN0ZW1SZWxldmFudENsYXNzQXBpLFxuICAgICAgICBQdWJBY2NvdW50QXBpLFxuICAgICAgICBFbWFpbEFwaSxcbiAgICAgICAgUHJvUHJvamVjdEFwaSxcbiAgICAgICAgUHViQWNjb3VudFByb2plY3RSZWxBcGksXG4gICAgICAgIFByb1RleHRQcm9wZXJ0eUFwaSxcbiAgICAgICAgUHJvSW5mb1Byb2pSZWxBcGksXG4gICAgICAgIERmaFByb2ZpbGVBcGksXG4gICAgICAgIERmaExhYmVsQXBpLFxuICAgICAgICBEYXRDaHVua0FwaSxcbiAgICAgICAgRGF0Q29sdW1uQXBpLFxuICAgICAgICBEYXRUZXh0UHJvcGVydHlBcGksXG4gICAgICAgIERhdERpZ2l0YWxBcGksXG4gICAgICAgIFN5c0FwcENvbnRleHRBcGksXG4gICAgICAgIFByb0NsYXNzRmllbGRDb25maWdBcGksXG4gICAgICAgIFByb0RmaENsYXNzUHJvalJlbEFwaSxcbiAgICAgICAgUHJvRGZoUHJvZmlsZVByb2pSZWxBcGksXG4gICAgICAgIEluZkFwcGVsbGF0aW9uQXBpLFxuICAgICAgICBJbmZMYW5nU3RyaW5nQXBpLFxuICAgICAgICBJbmZEaW1lbnNpb25BcGksXG4gICAgICAgIEluZlRlbXBvcmFsRW50aXR5QXBpLFxuICAgICAgICBJbmZTdGF0ZW1lbnRBcGksXG4gICAgICAgIEluZkxhbmd1YWdlQXBpLFxuICAgICAgICBJbmZQZXJzaXN0ZW50SXRlbUFwaSxcbiAgICAgICAgSW5mVGltZVByaW1pdGl2ZUFwaSxcbiAgICAgICAgSW5mUGxhY2VBcGksXG4gICAgICAgIERhdE5hbWVzcGFjZUFwaSxcbiAgICAgICAgSW5mVGV4dFByb3BlcnR5QXBpLFxuICAgICAgICBTeXNTeXN0ZW1UeXBlQXBpLFxuICAgICAgICBpbnRlcm5hbFN0b3JhZ2VQcm92aWRlcixcbiAgICAgICAgeyBwcm92aWRlOiBTREtTdG9yYWdlLCB1c2VDbGFzczogU3RvcmFnZUJyb3dzZXIgfSxcbiAgICAgICAgeyBwcm92aWRlOiBTb2NrZXREcml2ZXIsIHVzZUNsYXNzOiBTb2NrZXRCcm93c2VyIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4vKipcbiogSGF2ZSBGdW4hISFcbiogLSBKb25cbioqL1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2xiLmNvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XG5leHBvcnQgeyBDb29raWVCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL2Nvb2tpZS5icm93c2VyJztcbmV4cG9ydCB7IFN0b3JhZ2VCcm93c2VyIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UuYnJvd3Nlcic7XG5cbiJdfQ==