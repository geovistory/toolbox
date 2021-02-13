import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { InformationAPIActions } from './api/entity-list.actions';
import { informationReducer } from './api/entity-list.reducer';
let InformationComponent = class InformationComponent extends InformationAPIActions {
    constructor(rootEpics, epics, ngRedux, activatedRoute, router, p, c, m) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.ngRedux = ngRedux;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.p = p;
        this.c = c;
        this.m = m;
        this.h = true;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // path to the substore
        this.basePath = ['information'];
        this.selectedEntity$ = new BehaviorSubject(undefined);
        this.pkUiContextCreate = SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;
        this.pkAllowedClasses$ = this.c.pipeClassesEnabledInEntities();
        this.getBasePath = () => this.basePath;
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
    }
    openEntity(preview) {
        this.p.addEntityTab(preview.pk_entity, preview.fk_class);
    }
    startCreate(classAndTypePk) {
        this.p.dfh$.class$.by_pk_class$.key(classAndTypePk.pkClass)
            .pipe(first(d => !!d), takeUntil(this.destroy$)).subscribe(klass => {
            this.p.setListType('');
            this.m.openModalCreateOrAddEntity({
                alreadyInProjectBtnText: 'Open',
                notInProjectClickBehavior: 'addToProject',
                notInProjectBtnText: 'Add and Open',
                classAndTypePk,
                pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
            }).subscribe(result => {
                this.p.addEntityTab(result.pkEntity, result.pkClass);
            });
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
], InformationComponent.prototype, "h", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], InformationComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    select()
], InformationComponent.prototype, "loading$", void 0);
InformationComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: informationReducer
    }),
    Component({
        selector: 'gv-information',
        templateUrl: './entity-list.component.html',
        styleUrls: ['./entity-list.component.css']
    })
], InformationComponent);
export { InformationComponent };
//# sourceMappingURL=entity-list.component.js.map