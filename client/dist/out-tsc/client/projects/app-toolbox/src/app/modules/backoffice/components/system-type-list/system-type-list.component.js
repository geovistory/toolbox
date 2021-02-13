import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { WithSubStore, select } from '@angular-redux/store';
import { SystemTypeListAPIActions } from './api/system-type-list.actions';
import { systemtypeListReducer } from './api/system-type-list.reducer';
let SystemTypeListComponent = class SystemTypeListComponent extends SystemTypeListAPIActions {
    constructor(rootEpics, epics, ngRedux) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.ngRedux = ngRedux;
        this.flexFh = true;
        this.scY = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // path to the substore
        this.basePath = ['backoffice', 'systemtypesList'];
        this.getBasePath = () => this.basePath;
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, systemtypeListReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
        this.load();
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], SystemTypeListComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-scroll-y-auto')
], SystemTypeListComponent.prototype, "scY", void 0);
tslib_1.__decorate([
    select()
], SystemTypeListComponent.prototype, "systemtypes$", void 0);
SystemTypeListComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: systemtypeListReducer
    }),
    Component({
        selector: 'gv-system-type-list',
        templateUrl: './system-type-list.component.html',
        styleUrls: ['./system-type-list.component.css']
    })
], SystemTypeListComponent);
export { SystemTypeListComponent };
//# sourceMappingURL=system-type-list.component.js.map