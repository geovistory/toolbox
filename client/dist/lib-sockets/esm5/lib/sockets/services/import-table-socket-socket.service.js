/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL2ltcG9ydC10YWJsZS1zb2NrZXQtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDO0lBQ3VDLDZDQUFNO0lBRzNDLDJCQUNjLE1BQXNCO1FBRHBDLFlBSUUsa0JBQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQyxTQUloRDtRQVZELGVBQVMsR0FBRyxLQUFLLENBQUM7UUFRaEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7O0lBRXhCLENBQUM7Ozs7SUFFRCx3Q0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOztnQkFyQkYsVUFBVTs7OztnQkFERixhQUFhLHVCQU1qQixRQUFROztJQWlCYix3QkFBQztDQUFBLEFBdEJELENBQ3VDLE1BQU0sR0FxQjVDO1NBckJZLGlCQUFpQjs7O0lBQzVCLHNDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEltcG9ydFRhYmxlU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvSW1wb3J0VGFibGUnIH0pO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuXG4gIH1cblxuICBjbGVhbkNvbm5lY3QoKSB7XG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBjbGVhbkRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIl19