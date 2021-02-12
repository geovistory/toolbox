/**
 * @fileoverview added by tsickle
 * Generated from: services/import-table-socket-socket.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbXBvcnQtdGFibGUtc29ja2V0LXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQztJQUN1Qyw2Q0FBTTtJQUczQywyQkFDYyxNQUFzQjtRQURwQyxZQUlFLGtCQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxFQUFFLENBQUMsU0FJaEQ7UUFWRCxlQUFTLEdBQUcsS0FBSyxDQUFDO1FBUWhCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztJQUV4QixDQUFDOzs7O0lBRUQsd0NBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCwyQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Z0JBckJGLFVBQVU7Ozs7Z0JBREYsYUFBYSx1QkFNakIsUUFBUTs7SUFpQmIsd0JBQUM7Q0FBQSxBQXRCRCxDQUN1QyxNQUFNLEdBcUI1QztTQXJCWSxpQkFBaUI7OztJQUM1QixzQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbXBvcnRUYWJsZVNvY2tldCBleHRlbmRzIFNvY2tldCB7XG4gIGNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFNvY2tldHNDb25maWdcbiAgKSB7XG5cbiAgICBzdXBlcih7IHVybDogY29uZmlnLmJhc2VVcmwgKyAnL0ltcG9ydFRhYmxlJyB9KTtcblxuICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgY2xlYW5Db25uZWN0KCkge1xuICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgY2xlYW5EaXNjb25uZWN0KCkge1xuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==