import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { WithSubStore, select } from '@angular-redux/store';
import { NamespaceListAPIActions } from './api/namespace-list.actions';
import { namespaceListReducer } from './api/namespace-list.reducer';
let NamespaceListComponent = class NamespaceListComponent extends NamespaceListAPIActions {
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
        this.basePath = ['backoffice', 'namespacesList'];
        this.getBasePath = () => this.basePath;
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, namespaceListReducer);
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
], NamespaceListComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-scroll-y-auto')
], NamespaceListComponent.prototype, "scY", void 0);
tslib_1.__decorate([
    select()
], NamespaceListComponent.prototype, "namespaces$", void 0);
NamespaceListComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: namespaceListReducer
    }),
    Component({
        selector: 'gv-namespace-list',
        templateUrl: './namespace-list.component.html',
        styleUrls: ['./namespace-list.component.css']
    })
], NamespaceListComponent);
export { NamespaceListComponent };
//# sourceMappingURL=namespace-list.component.js.map