import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { BehaviorSubject, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SourceListAPIActions } from './api/source-list.actions';
import { sourceListReducer } from './api/source-list.reducer';
let SourceListComponent = class SourceListComponent extends SourceListAPIActions {
    constructor(rootEpics, epics, activatedRoute, ngRedux, router, p, sys, m) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.activatedRoute = activatedRoute;
        this.ngRedux = ngRedux;
        this.router = router;
        this.p = p;
        this.sys = sys;
        this.m = m;
        this.h = true;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // path to the substore
        this.basePath = ['sources'];
        this.selectedEntity$ = new BehaviorSubject(undefined);
        this.pkUiContextCreate = SysConfig.PK_UI_CONTEXT_SOURCES_CREATE;
        this.getBasePath = () => this.basePath;
        this.pkClassesOfAddBtn$ = this.sys.system_relevant_class$.by_required_by_sources$.all$.pipe(first(d => !!d.true), map(reqBySource => U.obj2Arr(reqBySource.true).map(sysRelClass => sysRelClass.fk_class)));
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, sourceListReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
    }
    openEntity(preview) {
        this.p.addEntityTab(preview.pk_entity, preview.fk_class);
    }
    startCreate(classAndTypePk) {
        this.p.setListType('');
        this.m.openModalCreateOrAddEntity({
            alreadyInProjectBtnText: 'Open',
            notInProjectClickBehavior: 'addToProject',
            notInProjectBtnText: 'Add and Open',
            classAndTypePk,
            pkUiContext: SysConfig.PK_UI_CONTEXT_SOURCES_CREATE
        }).subscribe(result => {
            this.p.addEntityTab(result.pkEntity, result.pkClass);
        });
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.h-100')
], SourceListComponent.prototype, "h", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], SourceListComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    select()
], SourceListComponent.prototype, "loading$", void 0);
SourceListComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: sourceListReducer
    }),
    Component({
        selector: 'gv-source-list',
        templateUrl: './source-list.component.html',
        styleUrls: ['./source-list.component.scss']
    })
], SourceListComponent);
export { SourceListComponent };
//# sourceMappingURL=source-list.component.js.map