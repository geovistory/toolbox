/**
 * @fileoverview added by tsickle
 * Generated from: services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbXBvcnQtdGFibGUtc29ja2V0LXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLE1BQU07Ozs7SUFHM0MsWUFDYyxNQUFzQjtRQUdsQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBTmxELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFRaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFeEIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7O1lBckJGLFVBQVU7Ozs7WUFERixhQUFhLHVCQU1qQixRQUFROzs7O0lBSFgsc0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4uL21vZGVscy9Tb2NrZXRzQ29uZmlnJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbXBvcnRUYWJsZVNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL0ltcG9ydFRhYmxlJyB9KTtcblxuICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgY2xlYW5Db25uZWN0KCkge1xuICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgY2xlYW5EaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==