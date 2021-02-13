var QueryFilterComponent_1;
import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, Inject, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { values } from 'd3';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, map, takeUntil, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { equals } from 'ramda';
;
let QueryFilterComponent = QueryFilterComponent_1 = class QueryFilterComponent {
    constructor(ff, c, i, qfs, injectedData) {
        this.ff = ff;
        this.c = c;
        this.i = i;
        this.qfs = qfs;
        this.injectedData = injectedData;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
        this.model$ = new BehaviorSubject(null);
        /**
         * this is used if the query filter gets injected by as child form factory
         */
        if (injectedData) {
            if (injectedData.initVal$) {
                this.initVal$ = injectedData.initVal$;
            }
            if (injectedData.rootClasses$) {
                this.rootClasses$ = injectedData.rootClasses$;
            }
            if (injectedData.disableRootCtrl) {
                this.disableRootCtrl = injectedData.disableRootCtrl;
            }
        }
    }
    ngOnInit() {
        if (this.initVal$) {
            this.initVal$.pipe(takeUntil(this.destroy$)).subscribe(f => {
                this.model$.next(f);
            });
        }
        this.model$.pipe(takeUntil(this.destroy$)).subscribe(initVal => {
            this.initForm(initVal);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    initForm(initVal) {
        this.formFactory = undefined;
        // get all classes
        let pkClasses$;
        if (this.rootClasses$) {
            // if the root classes are defined by input, use those
            pkClasses$ = this.rootClasses$;
        }
        else {
            // else use the selected classes in this project
            pkClasses$ = this.c.pipeClassesInEntitiesOrSources().pipe(map(x => values(x)));
        }
        const config = {
            rootFormGroup$: new BehaviorSubject({
                data: {
                    initVal,
                    pkClasses$
                }
            }),
            getChildNodeConfigs: (c) => this.getChildNodeConfigs(c)
        };
        this.ff.create(config, this.destroy$).pipe(first(), takeUntil(this.destroy$)).subscribe((v) => {
            this.formFactory$.next(v);
            this.formFactory = v;
            console.log(v);
        });
        this.formFactory$.pipe(filter(o => o !== null), switchMap(f => f.formGroupFactory.valueChanges$), takeUntil(this.destroy$)).subscribe((x) => {
            this.onChange(x);
        });
    }
    getChildNodeConfigs(n) {
        if (n.group) {
            /**
            * Create children of root FromGroup
            */
            const childConfigs = [this.qfs.createArrClasses(n.group.data.pkClasses$, n.group.data.initVal, this.disableRootCtrl)];
            return new BehaviorSubject(childConfigs);
        }
        else if (n.array && n.array.data.arrayClasses) {
            /**
             * Create children of ArrClasses
             */
            // create ctrlClasses
            const d = n.array.data.arrayClasses;
            const x = this.qfs.createCtrlClasses(d.pkClasses$, d.initVal.data, new BehaviorSubject(d.disabled));
            // create children according to initVal
            const propertyOptions$ = this.i.getPropertyOptions$(x.value$);
            const children = d.initVal.children.map(child => {
                return this.qfs.createArrSubgroupOfClasses(propertyOptions$, child);
            });
            return new BehaviorSubject([x.ctrlClasses, ...children]);
        }
        else if (n.array && n.array.data.arraySubgroup) {
            /**
             * Create children of ArrSoubgroup
             */
            const d = n.array.data.arraySubgroup;
            const initVal = d.initVal;
            // create the and/or control
            const ctrlOperator = this.qfs.createCtrlOperator(d.initVal.data.operator);
            // create other children
            const children = (initVal.children.length < 1 ?
                [null] : // add one child by default
                initVal.children).map(child => this.qfs.createSubgroupOfArrSoubgroup(n.array.data.arraySubgroup, child));
            return new BehaviorSubject([ctrlOperator, ...children]);
        }
        else if (n.array && n.array.data.arrayCondition) {
            /**
            * Create children of arrayCondition
            */
            const d = n.array.data.arrayCondition;
            const { operator, ingoingProperties, outgoingProperties, searchTerm } = d.initVal.data;
            // create the codition control  (ENTITY_LABEL_CONTAINS / IS NOT / ...)
            const y = this.qfs.createCtrlCondition(operator);
            return y.value$.pipe(distinctUntilChanged(equals), filter(x => !!x), map((condition) => {
                // const rest: QfFormNodeConfig[] = [];
                if (condition == 'ENTITY_LABEL_CONTAINS') {
                    return [
                        y.ctrlCondition,
                        this.qfs.createCtrlSearchTerm(searchTerm)
                    ];
                    // rest.push(this.qfs.createCtrlSearchTerm(searchTerm))
                }
                else if (condition === 'IS' ||
                    condition === 'IS NOT') {
                    const z = this.qfs.createCtrlProperties(d.propertyOptions$, {
                        ingoingProperties,
                        outgoingProperties
                    });
                    const pkClasses$ = this.i.getPkClassesFromPropertySelectModel$(z.value$);
                    return [
                        y.ctrlCondition,
                        z.ctrlProperties,
                        ...d.initVal.children.map(child => {
                            return this.qfs.createArrSubgroupOfProperties(pkClasses$, child);
                        })
                    ];
                    // rest.push(z.ctrlProperties)
                    // d.initVal.children.forEach(child => {
                    //   rest.push(this.qfs.createArrSubgroupOfProperties(pkClasses$, child))
                    // })
                }
                // return [y.ctrlCondition];
            }));
        }
        //  else if (n.array && n.array.data.arrayProperties) {
        //   const d = n.array.data.arrayProperties;
        //   const initValue = d.initVal ? d.initVal.data : {};
        //   const ctrlProperties = this.qfs.createCtrlProperties(d.propertyOptions$, initValue)
        //   return new BehaviorSubject([ctrlProperties])
        // }
        else {
            console.error(`No children found for:`, n);
        }
    }
    markAllAsTouched() {
        const f = this.formFactory.formGroup.controls.childControl;
        U.recursiveMarkAsTouched(f);
    }
    onChange(value) { }
    onTouch() { }
    /***
     * Control Value Accessor
     */
    writeValue(obj) {
        this.model$.next(obj);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        throw new Error('Method not implemented.');
    }
    ngAfterViewInit() {
        this.afterViewInit$.next(true);
    }
};
tslib_1.__decorate([
    Input()
], QueryFilterComponent.prototype, "initVal$", void 0);
tslib_1.__decorate([
    Input()
], QueryFilterComponent.prototype, "rootClasses$", void 0);
tslib_1.__decorate([
    Input()
], QueryFilterComponent.prototype, "disableRootCtrl", void 0);
QueryFilterComponent = QueryFilterComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-query-filter',
        templateUrl: './query-filter.component.html',
        styleUrls: ['./query-filter.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => QueryFilterComponent_1),
                multi: true
            }
        ]
    }),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(CONTAINER_DATA))
], QueryFilterComponent);
export { QueryFilterComponent };
//# sourceMappingURL=query-filter.component.js.map