import * as tslib_1 from "tslib";
import { select } from '@angular-redux/store';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PeItTimelineAPIActions } from './api/pe-it-timeline.actions';
// @WithSubStore({
//   basePathMethodName: 'getBasePath',
//   localReducer: peItTimelineReducer
// })
let PeItTimelineComponent = class PeItTimelineComponent extends PeItTimelineAPIActions {
    constructor(rootEpics, ngRedux, 
    // private teEntActions: TeEntActions,
    i, b) {
        super();
        this.rootEpics = rootEpics;
        this.ngRedux = ngRedux;
        this.i = i;
        this.b = b;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.close = new EventEmitter();
        this.previousAccentuationMap = new Map();
    }
    ngOnInit() {
    }
    rowMouseEnter(row) {
        if (row.accentuation !== 'selected') {
            // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
            // teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
        }
    }
    rowMouseLeave(row) {
        if (row.accentuation === 'highlighted') {
            // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
            // teEntStore.dispatch(this.teEntActions.setAccentuation('none'))
        }
    }
    rowClick(row) {
        // const teEntStore = this.ngRedux.configureSubStore(row.storeConnector.path, teEntReducer);
        // if (row.accentuation !== 'selected') {
        //   teEntStore.dispatch(this.teEntActions.setAccentuation('selected'))
        // } else {
        //   teEntStore.dispatch(this.teEntActions.setAccentuation('highlighted'))
        // }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], PeItTimelineComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Output()
], PeItTimelineComponent.prototype, "close", void 0);
tslib_1.__decorate([
    select()
], PeItTimelineComponent.prototype, "timeLineSettings$", void 0);
PeItTimelineComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-pe-it-timeline',
        templateUrl: './pe-it-timeline.component.html',
        styleUrls: ['./pe-it-timeline.component.css']
    })
], PeItTimelineComponent);
export { PeItTimelineComponent };
//# sourceMappingURL=pe-it-timeline.component.js.map