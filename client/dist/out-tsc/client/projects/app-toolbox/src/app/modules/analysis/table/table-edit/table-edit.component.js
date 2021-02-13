import * as tslib_1 from "tslib";
import { Component, HostBinding, ViewChild } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
let TableEditComponent = class TableEditComponent {
    constructor(a, ts, p) {
        this.a = a;
        this.ts = ts;
        this.flexFh = true;
        this.destroy$ = new Subject();
        this.queryDefinition$ = new Subject();
        if (this.a.pkEntity) {
            this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(map(i => i.analysis_definition), map((def) => def.queryDefinition));
        }
        this.a.registerRunAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                this.queryDefinition$.next(q.queryDefinition);
                this.ts.t.setLayoutMode('both');
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
            }
        }, SysConfig.PK_ANALYSIS_TYPE__TABLE);
        this.a.registerCreateAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                return this.a.callCreateApi(q);
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
                return of();
            }
        });
        this.a.registerSaveAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                this.a.callSaveApi(q);
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
            }
        });
        this.a.registerCopyAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                return this.a.callCopyApi(q);
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
                return of();
            }
        });
        this.a.registerRenameAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                this.a.callRenameApi(q);
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
                of();
            }
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], TableEditComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    ViewChild('c', { static: false })
], TableEditComponent.prototype, "formComponent", void 0);
TableEditComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-table-edit',
        templateUrl: './table-edit.component.html',
        styleUrls: ['./table-edit.component.scss'],
    })
], TableEditComponent);
export { TableEditComponent };
//# sourceMappingURL=table-edit.component.js.map