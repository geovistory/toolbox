/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
var ImportTableSocket = /** @class */ (function (_super) {
    tslib_1.__extends(ImportTableSocket, _super);
    function ImportTableSocket(config) {
        var _this = _super.call(this, { url: config.baseUrl + '/ImportTable' }) || this;
        _this.connected = false;
        _this.connected = true;
        return _this;
    }
    /**
     * @return {?}
     */
    ImportTableSocket.prototype.cleanConnect = /**
     * @return {?}
     */
    function () {
        if (!this.connected)
            this.connect();
    };
    /**
     * @return {?}
     */
    ImportTableSocket.prototype.cleanDisconnect = /**
     * @return {?}
     */
    function () {
        this.disconnect();
        this.connected = false;
    };
    ImportTableSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ImportTableSocket.ctorParameters = function () { return [
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return ImportTableSocket;
}(Socket));
export { ImportTableSocket };
if (false) {
    /** @type {?} */
    ImportTableSocket.prototype.connected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL2ltcG9ydC10YWJsZS1zb2NrZXQtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQ7SUFDdUMsNkNBQU07SUFHM0MsMkJBQ2MsTUFBc0I7UUFEcEMsWUFJRSxrQkFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFDLFNBSWhEO1FBVkQsZUFBUyxHQUFHLEtBQUssQ0FBQztRQVFoQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7SUFFeEIsQ0FBQzs7OztJQUVELHdDQUFZOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7O2dCQXJCRixVQUFVOzs7O2dCQURGLGFBQWEsdUJBTWpCLFFBQVE7O0lBaUJiLHdCQUFDO0NBQUEsQUF0QkQsQ0FDdUMsTUFBTSxHQXFCNUM7U0FyQlksaUJBQWlCOzs7SUFDNUIsc0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ25neC1zb2NrZXQtaW8nO1xuaW1wb3J0IHsgU29ja2V0c0NvbmZpZyB9IGZyb20gJy4uL21vZGVscy9Tb2NrZXRzQ29uZmlnJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbXBvcnRUYWJsZVNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL0ltcG9ydFRhYmxlJyB9KTtcblxuICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgY2xlYW5Db25uZWN0KCkge1xuICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgY2xlYW5EaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==