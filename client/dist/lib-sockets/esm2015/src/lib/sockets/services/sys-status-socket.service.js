/**
 * @fileoverview added by tsickle
 * Generated from: services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
export class SysStatusSocket extends Socket {
    /**
     * @param {?=} config
     */
    constructor(config) {
        super({ url: config.baseUrl + '/SysStatus' });
    }
}
SysStatusSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SysStatusSocket.ctorParameters = () => [
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zeXMtc3RhdHVzLXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFeEQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsTUFBTTs7OztJQUV6QyxZQUNjLE1BQXNCO1FBR2xDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRSxDQUFDLENBQUM7SUFFaEQsQ0FBQzs7O1lBVEYsVUFBVTs7OztZQURGLGFBQWEsdUJBS2pCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL1NvY2tldHNDb25maWcnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5c1N0YXR1c1NvY2tldCBleHRlbmRzIFNvY2tldCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvU3lzU3RhdHVzJyB9KTtcblxuICB9XG59XG4iXX0=