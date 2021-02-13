import * as tslib_1 from "tslib";
import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { values } from 'ramda';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
let TimeChartContEditComponent = class TimeChartContEditComponent {
    constructor(c, a, ts, p, pagEntDialog) {
        this.c = c;
        this.a = a;
        this.ts = ts;
        this.pagEntDialog = pagEntDialog;
        this.flexFh = true;
        this.destroy$ = new Subject();
        this.teEnClasses$ = new BehaviorSubject([]);
        // initVal$ = new Subject<FilterDefinition>()
        this.queryFilter = new FormControl();
        // filter$ = new BehaviorSubject<FilterDefinition>(null);
        this.visualData$ = new BehaviorSubject({
            activeLine: 0,
            chartLines: [
                {
                    label: '',
                    linePoints: []
                }
            ]
        });
        if (this.a.pkEntity) {
            this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(map(i => i.analysis_definition), map((def) => def));
        }
        this.a.registerRunAnalysis(() => {
            if (this.formComponent.formFactory.formGroup.valid) {
                const analysisDefinition = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
                this.a.callRunApi((fkProject => this.a.analysisApi.analysisControllerTimeChartRun({
                    fkProject,
                    lines: analysisDefinition.lines || []
                })));
                this.ts.t.setLayoutMode('both');
            }
            else {
                this.formComponent.formFactory.markAllAsTouched();
            }
        }, SysConfig.PK_ANALYSIS_TYPE__TIME_CONT);
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
    ngOnInit() {
        this.c.pipeSelectedTeEnClassesInProject().pipe(takeUntil(this.destroy$)).subscribe(x => {
            this.teEnClasses$.next(values(x));
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    onShowDetailsClick($event) {
        this.pagEntDialog.open(true, $event.linePoint.data, `${$event.linePoint.data.length} Entities available at ${$event.cursorDateLabel}`);
    }
    onShowAllItemsClick($event) {
        this.pagEntDialog.open(true, $event, `${$event.length} Entities`);
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], TimeChartContEditComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    ViewChild('c', { static: false })
], TimeChartContEditComponent.prototype, "formComponent", void 0);
TimeChartContEditComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-time-chart-cont-edit',
        templateUrl: './time-chart-cont-edit.component.html',
        styleUrls: ['./time-chart-cont-edit.component.scss'],
    })
], TimeChartContEditComponent);
export { TimeChartContEditComponent };
//# sourceMappingURL=time-chart-cont-edit.component.js.map