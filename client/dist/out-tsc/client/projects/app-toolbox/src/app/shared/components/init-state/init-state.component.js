import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActiveProjectActions } from 'projects/app-toolbox/src/app/core/active-project';
import { INIT_SANDBOX_STATE, sandboxStateReducer } from 'projects/app-toolbox/src/app/core/redux-store/root-reducer';
import { Subject, timer, combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
let InitStateComponent = class InitStateComponent {
    constructor(ngRedux, p) {
        this.ngRedux = ngRedux;
        this.p = p;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.ok = new EventEmitter();
        this.waitForAll = [];
    }
    ngOnInit() {
        /**
         * Init root slices of the store using the rootReducer of StoreModule
         */
        if (this.activeProject) {
            this.ngRedux.dispatch({
                type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
                payload: this.activeProject
            });
        }
        /**
         * Init fractal store
         */
        this.localStore = this.ngRedux.configureSubStore(['sandboxState'], sandboxStateReducer);
        if (this.sandboxState) {
            this.localStore.dispatch({
                type: INIT_SANDBOX_STATE,
                payload: this.sandboxState
            });
            // const sandboxStateInit = new Subject<boolean>();
            // this.waitForAll.push(sandboxStateInit)
            // this.localStore.select('').pipe(
            //   // first(c => (!!c && c != {})),
            //   takeUntil(this.destroy$)
            // ).subscribe(ok => {
            //   sandboxStateInit.next(true)
            // })
        }
        /**
         * Init project with api call
         */
        if (this.projectFromApi) {
            this.p.initProject(this.projectFromApi);
            this.p.initProjectConfigData(this.projectFromApi);
            const configLoaded = new Subject();
            this.waitForAll.push(configLoaded);
            this.ngRedux.select(['activeProject', 'configDataInitialized']).pipe(first(c => !!c), takeUntil(this.destroy$)).subscribe(ok => {
                configLoaded.next(true);
            });
        }
        this.waitForAll.push(timer(100));
    }
    ngAfterViewInit() {
        combineLatest(this.waitForAll).subscribe(ok => {
            this.initialized = true;
            this.ok.emit();
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
InitStateComponent.INIT_STATE = 'InitState::INIT_STATE';
tslib_1.__decorate([
    Input()
], InitStateComponent.prototype, "activeProject", void 0);
tslib_1.__decorate([
    Input()
], InitStateComponent.prototype, "projectFromApi", void 0);
tslib_1.__decorate([
    Input()
], InitStateComponent.prototype, "sandboxState", void 0);
tslib_1.__decorate([
    Output()
], InitStateComponent.prototype, "ok", void 0);
InitStateComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-init-state',
        templateUrl: './init-state.component.html',
        styleUrls: ['./init-state.component.scss']
    })
], InitStateComponent);
export { InitStateComponent };
//# sourceMappingURL=init-state.component.js.map