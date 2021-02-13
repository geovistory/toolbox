/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXRhYmxlLXNvY2tldC1zb2NrZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc29ja2V0cy8iLCJzb3VyY2VzIjpbImxpYi9zb2NrZXRzL3NlcnZpY2VzL2ltcG9ydC10YWJsZS1zb2NrZXQtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsTUFBTTs7OztJQUczQyxZQUNjLE1BQXNCO1FBR2xDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFObEQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVFoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUV4QixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7WUFyQkYsVUFBVTs7OztZQURGLGFBQWEsdUJBTWpCLFFBQVE7Ozs7SUFIWCxzQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnbmd4LXNvY2tldC1pbyc7XG5pbXBvcnQgeyBTb2NrZXRzQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL1NvY2tldHNDb25maWcnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEltcG9ydFRhYmxlU29ja2V0IGV4dGVuZHMgU29ja2V0IHtcbiAgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU29ja2V0c0NvbmZpZ1xuICApIHtcblxuICAgIHN1cGVyKHsgdXJsOiBjb25maWcuYmFzZVVybCArICcvSW1wb3J0VGFibGUnIH0pO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuXG4gIH1cblxuICBjbGVhbkNvbm5lY3QoKSB7XG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBjbGVhbkRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIl19