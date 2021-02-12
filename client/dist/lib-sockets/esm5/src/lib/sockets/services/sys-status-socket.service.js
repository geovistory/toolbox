/**
 * @fileoverview added by tsickle
 * Generated from: services/sys-status-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9zeXMtc3RhdHVzLXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQztJQUNxQywyQ0FBTTtJQUV6Qyx5QkFDYyxNQUFzQjtlQUdsQyxrQkFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBRS9DLENBQUM7O2dCQVRGLFVBQVU7Ozs7Z0JBREYsYUFBYSx1QkFLakIsUUFBUTs7SUFNYixzQkFBQztDQUFBLEFBVkQsQ0FDcUMsTUFBTSxHQVMxQztTQVRZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNTdGF0dXNTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL1N5c1N0YXR1cycgfSk7XG5cbiAgfVxufVxuIl19