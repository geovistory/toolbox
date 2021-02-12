/**
 * @fileoverview added by tsickle
 * Generated from: services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zeXMtc3RhdHVzLXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTFDLE1BQU0sT0FBTyxlQUFnQixTQUFRLE1BQU07Ozs7SUFFekMsWUFDYyxNQUFzQjtRQUdsQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRWhELENBQUM7OztZQVRGLFVBQVU7Ozs7WUFERixhQUFhLHVCQUtqQixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4uL21vZGVscyc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3lzU3RhdHVzU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTb2NrZXRzQ29uZmlnXG4gICkge1xuXG4gICAgc3VwZXIoeyB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJy9TeXNTdGF0dXMnIH0pO1xuXG4gIH1cbn1cbiJdfQ==