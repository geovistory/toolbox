var NotificationsAPIActions_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
;
let NotificationsAPIActions = NotificationsAPIActions_1 = class NotificationsAPIActions {
    constructor() {
        this.addToast = (payload) => ({
            type: NotificationsAPIActions_1.ADD_TOAST,
            meta: null,
            payload
        });
    }
};
NotificationsAPIActions.ADD_TOAST = 'Notifications::ADD_TOAST';
NotificationsAPIActions = NotificationsAPIActions_1 = tslib_1.__decorate([
    Injectable()
], NotificationsAPIActions);
export { NotificationsAPIActions };
//# sourceMappingURL=notifications.actions.js.map