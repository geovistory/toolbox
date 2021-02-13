/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLXN0YXR1cy1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL3N5cy1zdGF0dXMtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQ7SUFDcUMsMkNBQU07SUFFekMseUJBQ2MsTUFBc0I7ZUFHbEMsa0JBQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUUvQyxDQUFDOztnQkFURixVQUFVOzs7O2dCQURGLGFBQWEsdUJBS2pCLFFBQVE7O0lBTWIsc0JBQUM7Q0FBQSxBQVZELENBQ3FDLE1BQU0sR0FTMUM7U0FUWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4uL21vZGVscy9Tb2NrZXRzQ29uZmlnJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTeXNTdGF0dXNTb2NrZXQgZXh0ZW5kcyBTb2NrZXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL1N5c1N0YXR1cycgfSk7XG5cbiAgfVxufVxuIl19