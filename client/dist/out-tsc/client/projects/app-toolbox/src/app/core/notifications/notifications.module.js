import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications.component';
import { NotificationsAPIActions } from './components/api/notifications.actions';
import { NotificationsAPIEpics } from './components/api/notifications.epics';
import { ToastyModule } from '@cime/ngx-toasty';
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            ToastyModule.forRoot()
        ],
        providers: [NotificationsAPIActions, NotificationsAPIEpics],
        declarations: [NotificationsComponent],
        exports: [NotificationsComponent]
    })
], NotificationsModule);
export { NotificationsModule };
//# sourceMappingURL=notifications.module.js.map