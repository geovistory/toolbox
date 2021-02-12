/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
export class ImportTableSocket extends Socket {
    /**
     * @param {?=} config
     */
    constructor(config) {
        super({ url: config.baseUrl + '/ImportTable' });
        this.connected = false;
        this.connected = true;
    }
    /**
     * @return {?}
     */
    cleanConnect() {
        if (!this.connected)
            this.connect();
    }
    /**
     * @return {?}
     */
    cleanDisconnect() {
        this.disconnect();
        this.connected = false;
    }
}
ImportTableSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImportTableSocket.ctorParameters = () => [
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    ImportTableSocket.prototype.connected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL2ltcG9ydC10YWJsZS1zb2NrZXQtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFMUMsTUFBTSxPQUFPLGlCQUFrQixTQUFRLE1BQU07Ozs7SUFHM0MsWUFDYyxNQUFzQjtRQUdsQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBTmxELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFRaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFeEIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7O1lBckJGLFVBQVU7Ozs7WUFERixhQUFhLHVCQU1qQixRQUFROzs7O0lBSFgsc0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4uL21vZGVscyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW1wb3J0VGFibGVTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuICBjb25uZWN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTb2NrZXRzQ29uZmlnXG4gICkge1xuXG4gICAgc3VwZXIoeyB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJy9JbXBvcnRUYWJsZScgfSk7XG5cbiAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG5cbiAgfVxuXG4gIGNsZWFuQ29ubmVjdCgpIHtcbiAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB0aGlzLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGNsZWFuRGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB9XG59XG4iXX0=