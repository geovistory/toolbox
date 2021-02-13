import * as tslib_1 from "tslib";
import { Component, HostBinding, ViewChild } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
let MapAndTimeContEditComponent = class MapAndTimeContEditComponent {
    constructor(p, a, ts) {
        this.a = a;
        this.ts = ts;
        this.flexFh = true;
        this.destroy$ = new Subject();
        if (this.a.pkEntity) {
            this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(map(i => i.analysis_definition));
        }
        this.a.registerRunAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const analysisDefinition = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                this.a.callRunApi((fkProject => this.a.analysisApi.analysisControllerMapRun({
                    fkProject,
                    analysisDefinition
                })));
                this.ts.t.setLayoutMode('both');
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
            }
        }, SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT);
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
], MapAndTimeContEditComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    ViewChild('c', { static: false })
], MapAndTimeContEditComponent.prototype, "formComponent", void 0);
MapAndTimeContEditComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-map-and-time-cont-edit',
        templateUrl: './map-and-time-cont-edit.component.html',
        styleUrls: ['./map-and-time-cont-edit.component.scss']
    })
], MapAndTimeContEditComponent);
export { MapAndTimeContEditComponent };
//# sourceMappingURL=map-and-time-cont-edit.component.js.map