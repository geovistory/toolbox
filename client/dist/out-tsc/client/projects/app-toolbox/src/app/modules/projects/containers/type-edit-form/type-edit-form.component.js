import * as tslib_1 from "tslib";
import { select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, HostBinding, Inject, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TypeEditFormAPIActions } from './api/type-edit-form.actions';
import { typeEditFormReducer } from './api/type-edit-form.reducer';
let TypeEditFormComponent = class TypeEditFormComponent extends TypeEditFormAPIActions {
    constructor(rootEpics, epics, ngRedux, dialogRef, data) {
        super();
        this.rootEpics = rootEpics;
        this.epics = epics;
        this.ngRedux = ngRedux;
        this.dialogRef = dialogRef;
        this.data = data;
        this.h = true;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // Emitted when user clicks close
        this.close = new EventEmitter();
        this.getBasePath = () => this.data.basePath;
    }
    ngOnInit() {
        this.localStore = this.ngRedux.configureSubStore(this.data.basePath, typeEditFormReducer);
        this.rootEpics.addEpic(this.epics.createEpics(this));
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
tslib_1.__decorate([
    HostBinding('class.h-100')
], TypeEditFormComponent.prototype, "h", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], TypeEditFormComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    select()
], TypeEditFormComponent.prototype, "peItDetail$", void 0);
tslib_1.__decorate([
    Output()
], TypeEditFormComponent.prototype, "close", void 0);
TypeEditFormComponent = tslib_1.__decorate([
    WithSubStore({
        basePathMethodName: 'getBasePath',
        localReducer: typeEditFormReducer
    }),
    Component({
        selector: 'gv-type-edit-form',
        templateUrl: './type-edit-form.component.html',
        styleUrls: ['./type-edit-form.component.css']
    }),
    tslib_1.__param(4, Inject(MAT_DIALOG_DATA))
], TypeEditFormComponent);
export { TypeEditFormComponent };
//# sourceMappingURL=type-edit-form.component.js.map