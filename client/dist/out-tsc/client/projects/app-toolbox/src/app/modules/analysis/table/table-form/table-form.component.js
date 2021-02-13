import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { getLabelForDefaulType } from '../table-form-array/table-form-array.component';
import { TableFormService } from './table-form.service';
let TableFormComponent = class TableFormComponent {
    constructor(ff, t, i) {
        this.ff = ff;
        this.t = t;
        this.i = i;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
    }
    ngOnInit() {
        if (!this.initVal$) {
            const initVal = {
                filter: undefined,
                columns: [{
                        defaultType: 'entity_preview',
                        label: getLabelForDefaulType('entity_preview'),
                        ofRootTable: true,
                        id: 'col_0'
                    }]
            };
            this.initVal$ = new BehaviorSubject(initVal);
        }
        const ffConfig = {
            rootFormGroup$: of({
                data: {
                    initVal$: this.initVal$
                }
            }),
            getChildNodeConfigs: (n) => this.getChildNodeConfigs(n)
        };
        this.formFactory$.pipe(switchMap(ff => ff.formGroupFactory.valueChanges$), filter((value) => (!!value && !!value.queryDefinition && !!value.queryDefinition.filter && !!value.queryDefinition.filter.data && !!value.queryDefinition.filter.data.classes)), map((value) => value.queryDefinition.filter.data), switchMap((classesAndTypes) => this.i.pipeClassesFromClassesAndTypes(classesAndTypes)), distinctUntilChanged(equals), takeUntil(this.destroy$)).subscribe((v) => {
            this.t.selectedRootClasses$.next(v);
        });
        this.ff.create(ffConfig, this.destroy$).pipe(first(), takeUntil(this.destroy$)).subscribe((v) => {
            console.log(v);
            this.formFactory$.next(v);
            this.formFactory = v;
        });
    }
    getChildNodeConfigs(n) {
        if (n.group) {
            const childConfigs = this.t.rootNodeConfig();
            return of(childConfigs);
        }
        else if (n.array && n.array.data.root) {
            return this.initVal$.pipe(map(initVal => {
                /**
                 * if the root classes are selected
                 */
                if (initVal.filter) {
                    const x = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal.filter), initVal.filter);
                    this.t.initPathSegments$ = this.t.selectedRootClasses$.pipe(map(classes => ([
                        { type: 'classes', data: { classes } }
                    ])));
                    return x.config;
                }
                /**
                 * else, the root classes are not yet selected
                 */
                else {
                    return [this.t.ctrlRootClassesConfig(this.t.rootClasses$, undefined, new BehaviorSubject(false))];
                }
            }));
        }
        else if (n.array && n.array.data.columns) {
            return this.initVal$.pipe(map(initVal => {
                const colConfigs = initVal.columns.map(colDef => {
                    return this.t.columnConfig(colDef);
                });
                return colConfigs;
            }));
        }
        else if (n.array && n.array.data.colDef) {
            return new Observable(subscriber => {
                subscriber.next(this.t.columnFieldsConfig(n.array.data.colDef));
            });
        }
        else if (n.control) {
        }
        else {
            console.error(`No children found for:`, n);
        }
    }
    ngAfterViewInit() {
        this.afterViewInit$.next(true);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    checkValidity() {
        this.formFactory.markAllAsTouched();
    }
};
tslib_1.__decorate([
    Input()
], TableFormComponent.prototype, "initVal$", void 0);
TableFormComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-table-form',
        templateUrl: './table-form.component.html',
        styleUrls: ['./table-form.component.scss'],
        providers: [TableFormService]
    })
], TableFormComponent);
export { TableFormComponent };
//# sourceMappingURL=table-form.component.js.map