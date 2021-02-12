/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
var SysStatusSocket = /** @class */ (function (_super) {
    tslib_1.__extends(SysStatusSocket, _super);
    function SysStatusSocket(config) {
        return _super.call(this, { url: config.baseUrl + '/SysStatus' }) || this;
    }
    SysStatusSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SysStatusSocket.ctorParameters = function () { return [
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return SysStatusSocket;
}(Socket));
export { SysStatusSocket };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL3N5cy1zdGF0dXMtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDO0lBQ3FDLDJDQUFNO0lBRXpDLHlCQUNjLE1BQXNCO2VBR2xDLGtCQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFFL0MsQ0FBQzs7Z0JBVEYsVUFBVTs7OztnQkFERixhQUFhLHVCQUtqQixRQUFROztJQU1iLHNCQUFDO0NBQUEsQUFWRCxDQUNxQyxNQUFNLEdBUzFDO1NBVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN5c1N0YXR1c1NvY2tldCBleHRlbmRzIFNvY2tldCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvU3lzU3RhdHVzJyB9KTtcblxuICB9XG59XG4iXX0=