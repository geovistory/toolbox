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
var SocketsModule = /** @class */ (function () {
    function SocketsModule(parentModule) {
        if (parentModule) {
            throw new Error('SocketsModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    SocketsModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: SocketsModule,
            providers: [
                { provide: SocketsConfig, useValue: config },
                EntityPreviewSocket,
                ImportTableSocket,
                SysStatusSocket
            ],
        };
    };
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
    SocketsModule.ctorParameters = function () { return [
        { type: SocketsModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return SocketsModule;
}());
export { SocketsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvIiwic291cmNlcyI6WyJsaWIvc29ja2V0cy9zb2NrZXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXZFO0lBd0JFLHVCQUFvQyxZQUE0QjtRQUM5RCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLGtFQUFrRSxDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDOzs7OztJQWhCTSxxQkFBTzs7OztJQUFkLFVBQWUsTUFBcUI7UUFDbEMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDNUMsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGVBQWU7YUFDaEI7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7Z0JBdkJGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7b0JBQ1osYUFBYTtxQkFDZDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYztxQkFFZjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLENBQUM7b0JBQ3BFLFNBQVMsRUFBRSxFQUFDLG9CQUFvQixDQUFDO2lCQUNsQzs7OztnQkFjb0QsYUFBYSx1QkFBbkQsUUFBUSxZQUFJLFFBQVE7O0lBT25DLG9CQUFDO0NBQUEsQUEvQkQsSUErQkM7U0FwQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldElvTW9kdWxlIH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi9tb2RlbHMvU29ja2V0c0NvbmZpZyc7XG5pbXBvcnQgeyBFbnRpdHlQcmV2aWV3U29ja2V0IH0gZnJvbSAnLi9zZXJ2aWNlcy9lbnRpdHktcHJldmlldy1zb2NrZXQuc2VydmljZSc7XG5pbXBvcnQgeyBJbXBvcnRUYWJsZVNvY2tldCB9IGZyb20gJy4vc2VydmljZXMvaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZSc7XG5pbXBvcnQgeyBTeXNTdGF0dXNTb2NrZXQgfSBmcm9tICcuL3NlcnZpY2VzL3N5cy1zdGF0dXMtc29ja2V0LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLyBjb21wb25lbnRzXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBTb2NrZXRJb01vZHVsZSxcbiAgICAvLyAuLi5cbiAgXSxcbiAgcHJvdmlkZXJzOiBbRW50aXR5UHJldmlld1NvY2tldCwgSW1wb3J0VGFibGVTb2NrZXQsIFN5c1N0YXR1c1NvY2tldF0sXG4gIGJvb3RzdHJhcDogWy8qKiBBcHBDb21wb25lbnQgKiovXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NrZXRzTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFNvY2tldHNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvY2tldHNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvY2tldHNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBTb2NrZXRzQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIEVudGl0eVByZXZpZXdTb2NrZXQsXG4gICAgICAgIEltcG9ydFRhYmxlU29ja2V0LFxuICAgICAgICBTeXNTdGF0dXNTb2NrZXRcbiAgICAgIF0sXG4gICAgfVxuICB9XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZT86IFNvY2tldHNNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdTb2NrZXRzTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==