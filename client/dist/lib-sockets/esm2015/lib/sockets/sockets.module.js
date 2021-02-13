/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/sockets.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketsConfig } from './models/SocketsConfig';
import { EntityPreviewSocket } from './services/entity-preview-socket.service';
import { ImportTableSocket } from './services/import-table-socket-socket.service';
import { SysStatusSocket } from './services/sys-status-socket.service';
export class SocketsModule {
    /**
     * @param {?=} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocketsModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: SocketsModule,
            providers: [
                { provide: SocketsConfig, useValue: config },
                EntityPreviewSocket,
                ImportTableSocket,
                SysStatusSocket
            ],
        };
    }
}
SocketsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                // components
                ],
                imports: [
                    SocketIoModule,
                ],
                providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket],
                bootstrap: [ /** AppComponent **/]
            },] }
];
/** @nocollapse */
SocketsModule.ctorParameters = () => [
    { type: SocketsModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvIiwic291cmNlcyI6WyJsaWIvc29ja2V0cy9zb2NrZXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBYXZFLE1BQU0sT0FBTyxhQUFhOzs7O0lBYXhCLFlBQW9DLFlBQTRCO1FBQzlELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0VBQWtFLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7Ozs7O0lBaEJELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDbEMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDNUMsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGVBQWU7YUFDaEI7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7O1lBdkJGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7Z0JBQ1osYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztpQkFFZjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLENBQUM7Z0JBQ3BFLFNBQVMsRUFBRSxFQUFDLG9CQUFvQixDQUFDO2FBQ2xDOzs7O1lBY29ELGFBQWEsdUJBQW5ELFFBQVEsWUFBSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0SW9Nb2R1bGUgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuL21vZGVscy9Tb2NrZXRzQ29uZmlnJztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdTb2NrZXQgfSBmcm9tICcuL3NlcnZpY2VzL2VudGl0eS1wcmV2aWV3LXNvY2tldC5zZXJ2aWNlJztcbmltcG9ydCB7IEltcG9ydFRhYmxlU29ja2V0IH0gZnJvbSAnLi9zZXJ2aWNlcy9pbXBvcnQtdGFibGUtc29ja2V0LXNvY2tldC5zZXJ2aWNlJztcbmltcG9ydCB7IFN5c1N0YXR1c1NvY2tldCB9IGZyb20gJy4vc2VydmljZXMvc3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC8vIGNvbXBvbmVudHNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIFNvY2tldElvTW9kdWxlLFxuICAgIC8vIC4uLlxuICBdLFxuICBwcm92aWRlcnM6IFtFbnRpdHlQcmV2aWV3U29ja2V0LCBJbXBvcnRUYWJsZVNvY2tldCwgU3lzU3RhdHVzU29ja2V0XSxcbiAgYm9vdHN0cmFwOiBbLyoqIEFwcENvbXBvbmVudCAqKi9dXG59KVxuZXhwb3J0IGNsYXNzIFNvY2tldHNNb2R1bGUge1xuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU29ja2V0c0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U29ja2V0c01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29ja2V0c01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFNvY2tldHNDb25maWcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAgRW50aXR5UHJldmlld1NvY2tldCxcbiAgICAgICAgSW1wb3J0VGFibGVTb2NrZXQsXG4gICAgICAgIFN5c1N0YXR1c1NvY2tldFxuICAgICAgXSxcbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlPzogU29ja2V0c01vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NvY2tldHNNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cblxufVxuIl19