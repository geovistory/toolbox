/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL3N5cy1zdGF0dXMtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxNQUFNOzs7O0lBRXpDLFlBQ2MsTUFBc0I7UUFHbEMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUVoRCxDQUFDOzs7WUFURixVQUFVOzs7O1lBREYsYUFBYSx1QkFLakIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvU29ja2V0c0NvbmZpZyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzU3RhdHVzU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTb2NrZXRzQ29uZmlnXG4gICkge1xuXG4gICAgc3VwZXIoeyB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJy9TeXNTdGF0dXMnIH0pO1xuXG4gIH1cbn1cbiJdfQ==