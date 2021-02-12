/**
 * @fileoverview added by tsickle
 * Generated from: services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models';
export class ImportTableSocket extends Socket {
    /**
     * @param {?=} config
     */
    constructor(config) {
        super({ url: config.baseUrl + '/ImportTable' });
        this.connected = false;
        this.connected = true;
    }
    /**
     * @return {?}
     */
    cleanConnect() {
        if (!this.connected)
            this.connect();
    }
    /**
     * @return {?}
     */
    cleanDisconnect() {
        this.disconnect();
        this.connected = false;
    }
}
ImportTableSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImportTableSocket.ctorParameters = () => [
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    ImportTableSocket.prototype.connected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy9zcmMvbGliL3NvY2tldHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbXBvcnQtdGFibGUtc29ja2V0LXNvY2tldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTFDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxNQUFNOzs7O0lBRzNDLFlBQ2MsTUFBc0I7UUFHbEMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxFQUFFLENBQUMsQ0FBQztRQU5sRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBUWhCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXhCLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7OztZQXJCRixVQUFVOzs7O1lBREYsYUFBYSx1QkFNakIsUUFBUTs7OztJQUhYLHNDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICduZ3gtc29ja2V0LWlvJztcbmltcG9ydCB7IFNvY2tldHNDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEltcG9ydFRhYmxlU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvSW1wb3J0VGFibGUnIH0pO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuXG4gIH1cblxuICBjbGVhbkNvbm5lY3QoKSB7XG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBjbGVhbkRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIl19