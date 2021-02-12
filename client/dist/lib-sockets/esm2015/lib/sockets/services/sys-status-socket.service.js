/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL3N5cy1zdGF0dXMtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFMUMsTUFBTSxPQUFPLGVBQWdCLFNBQVEsTUFBTTs7OztJQUV6QyxZQUNjLE1BQXNCO1FBR2xDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRSxDQUFDLENBQUM7SUFFaEQsQ0FBQzs7O1lBVEYsVUFBVTs7OztZQURGLGFBQWEsdUJBS2pCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNTdGF0dXNTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL1N5c1N0YXR1cycgfSk7XG5cbiAgfVxufVxuIl19