import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
let NotificationsComponent = class NotificationsComponent {
    constructor() {
        // emits true on destroy of this component
        this.destroy$ = new Subject();
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
NotificationsComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-notifications',
        templateUrl: './notifications.component.html',
        styleUrls: ['./notifications.component.css']
    })
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map