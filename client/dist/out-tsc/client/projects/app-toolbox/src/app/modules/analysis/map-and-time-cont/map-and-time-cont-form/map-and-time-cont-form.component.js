import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DfhConfig } from "@kleiolab/lib-config";
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
let MapAndTimeContFormComponent = class MapAndTimeContFormComponent {
    constructor(ff, t, i) {
        this.ff = ff;
        this.t = t;
        this.i = i;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
    }
    ngOnInit() {
        this.rootClasses$ = of(DfhConfig.CLASS_PKS_GEO_PE_IT);
        this.t.rootClasses$ = this.rootClasses$;
        if (!this.initVal$) {
            const initVal = {
                queryDefinition: {
                    filter: undefined,
                    columns: [
                        {
                            label: 'path',
                            id: 'col_1'
                        }
                    ]
                }
            };
            this.initVal$ = new BehaviorSubject(initVal);
        }
        const ffConfig = {
            rootFormGroup$: of({
                data: {
                    initVal$: this.initVal$.pipe(map(v => v.queryDefinition))
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
                if (initVal.queryDefinition && initVal.queryDefinition.filter) {
                    const x = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal.queryDefinition.filter), initVal.queryDefinition.filter);
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
                const colConfigs = initVal.queryDefinition.columns.map(colDef => {
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
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    ngAfterViewInit() {
        this.afterViewInit$.next(true);
    }
    checkValidity() {
        this.formFactory.markAllAsTouched();
    }
};
tslib_1.__decorate([
    Input()
], MapAndTimeContFormComponent.prototype, "initVal$", void 0);
MapAndTimeContFormComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-map-and-time-cont-form',
        templateUrl: './map-and-time-cont-form.component.html',
        styleUrls: ['./map-and-time-cont-form.component.scss']
    })
], MapAndTimeContFormComponent);
export { MapAndTimeContFormComponent };
//# sourceMappingURL=map-and-time-cont-form.component.js.map