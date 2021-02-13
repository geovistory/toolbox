/**
 * @fileoverview added by tsickle
 * Generated from: services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zeXMtc3RhdHVzLXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hEO0lBQ3FDLDJDQUFNO0lBRXpDLHlCQUNjLE1BQXNCO2VBR2xDLGtCQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFFL0MsQ0FBQzs7Z0JBVEYsVUFBVTs7OztnQkFERixhQUFhLHVCQUtqQixRQUFROztJQU1iLHNCQUFDO0NBQUEsQUFWRCxDQUNxQyxNQUFNLEdBUzFDO1NBVFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvU29ja2V0c0NvbmZpZyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzU3RhdHVzU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTb2NrZXRzQ29uZmlnXG4gICkge1xuXG4gICAgc3VwZXIoeyB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJy9TeXNTdGF0dXMnIH0pO1xuXG4gIH1cbn1cbiJdfQ==