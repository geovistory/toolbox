/**
 * @fileoverview added by tsickle
 * Generated from: sockets.module.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNvY2tldHMvc3JjL2xpYi9zb2NrZXRzLyIsInNvdXJjZXMiOlsic29ja2V0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RTtJQXdCRSx1QkFBb0MsWUFBNEI7UUFDOUQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYixrRUFBa0UsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQzs7Ozs7SUFoQk0scUJBQU87Ozs7SUFBZCxVQUFlLE1BQXFCO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQzVDLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2dCQUNqQixlQUFlO2FBQ2hCO1NBQ0YsQ0FBQTtJQUNILENBQUM7O2dCQXZCRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO29CQUNaLGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGNBQWM7cUJBRWY7b0JBQ0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO29CQUNwRSxTQUFTLEVBQUUsRUFBQyxvQkFBb0IsQ0FBQztpQkFDbEM7Ozs7Z0JBY29ELGFBQWEsdUJBQW5ELFFBQVEsWUFBSSxRQUFROztJQU9uQyxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBcEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXRJb01vZHVsZSB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4vbW9kZWxzL1NvY2tldHNDb25maWcnO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld1NvY2tldCB9IGZyb20gJy4vc2VydmljZXMvZW50aXR5LXByZXZpZXctc29ja2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgSW1wb3J0VGFibGVTb2NrZXQgfSBmcm9tICcuL3NlcnZpY2VzL2ltcG9ydC10YWJsZS1zb2NrZXQtc29ja2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3lzU3RhdHVzU29ja2V0IH0gZnJvbSAnLi9zZXJ2aWNlcy9zeXMtc3RhdHVzLXNvY2tldC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gY29tcG9uZW50c1xuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgU29ja2V0SW9Nb2R1bGUsXG4gICAgLy8gLi4uXG4gIF0sXG4gIHByb3ZpZGVyczogW0VudGl0eVByZXZpZXdTb2NrZXQsIEltcG9ydFRhYmxlU29ja2V0LCBTeXNTdGF0dXNTb2NrZXRdLFxuICBib290c3RyYXA6IFsvKiogQXBwQ29tcG9uZW50ICoqL11cbn0pXG5leHBvcnQgY2xhc3MgU29ja2V0c01vZHVsZSB7XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTb2NrZXRzQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2NrZXRzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTb2NrZXRzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogU29ja2V0c0NvbmZpZywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICBFbnRpdHlQcmV2aWV3U29ja2V0LFxuICAgICAgICBJbXBvcnRUYWJsZVNvY2tldCxcbiAgICAgICAgU3lzU3RhdHVzU29ja2V0XG4gICAgICBdLFxuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU/OiBTb2NrZXRzTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnU29ja2V0c01vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=