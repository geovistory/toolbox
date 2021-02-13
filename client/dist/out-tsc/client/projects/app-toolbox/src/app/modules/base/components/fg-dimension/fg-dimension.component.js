import * as tslib_1 from "tslib";
import { Component, Inject, Input, Optional, ViewChildren } from '@angular/core';
import { MatInput } from '@angular/material';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { first, map, takeUntil, filter } from 'rxjs/operators';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
let FgDimensionComponent = class FgDimensionComponent {
    constructor(p, ff, injectedData) {
        this.p = p;
        this.ff = ff;
        this.injectedData = injectedData;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
        /**
         * this gets injected by as child form factory
         */
        if (injectedData) {
            if (injectedData.initVal$) {
                this.initVal$ = injectedData.initVal$;
            }
            this.appearance = injectedData.appearance;
            this.pkClassOfDimension = injectedData.pkClassOfDimension;
        }
        if (!this.pkClassOfDimension)
            throw new Error('this.pkClassOfDimension is missing');
        this.pkClassOfMeasurementUnit$ = this.p.sys$.config$.main$.pipe(filter(c => !!c), map(config => {
            const classConfig = config.classes[this.pkClassOfDimension];
            if (classConfig.valueObjectType && classConfig.valueObjectType.dimension) {
                return classConfig.valueObjectType.dimension.measurementUnitClass;
            }
        }));
    }
    ngOnInit() {
        if (!this.initVal$) {
            this.initVal$ = new BehaviorSubject({
                pk_entity: undefined,
                fk_measurement_unit: undefined,
                numeric_value: undefined,
                fk_class: undefined
            });
        }
        if (!this.appearance)
            this.appearance = 'fill';
        const ffConfig = {
            rootFormGroup$: of({
                data: {}
            }),
            getChildNodeConfigs: (n) => this.getChildNodeConfigs(n)
        };
        this.ff.create(ffConfig, this.destroy$).pipe(first(), takeUntil(this.destroy$)).subscribe((v) => {
            this.formFactory$.next(v);
            this.formFactory = v;
            // console.log(v)
        });
    }
    getChildNodeConfigs(n) {
        if (n.group) {
            return this.initVal$.pipe(map(initVal => {
                const childConfigs = [{
                        array: {
                            data: {
                                type: 'root',
                            },
                            placeholder: '',
                            mapValue: (x) => {
                                const value = {
                                    fk_class: this.pkClassOfDimension,
                                    fk_measurement_unit: x[1],
                                    numeric_value: x[0],
                                    pk_entity: undefined,
                                };
                                return value;
                            }
                        }
                    }];
                return childConfigs;
            }));
        }
        else if (n.array && n.array.data.type === 'root') {
            return this.initVal$.pipe(map((initVal) => {
                const numberCtrl = {
                    control: {
                        initValue: initVal.numeric_value,
                        required: true,
                        data: {
                            type: 'number'
                        },
                        mapValue: x => x,
                        placeholder: 'Value'
                    }
                };
                const measurementUnitCtrl = {
                    control: {
                        initValue: initVal.fk_measurement_unit,
                        required: true,
                        data: {
                            type: 'measurementUnit'
                        },
                        mapValue: x => x,
                        placeholder: 'Unit'
                    }
                };
                return [numberCtrl, measurementUnitCtrl];
            }));
        }
    }
    focusOnCtrlNumber() {
        if (this.ctrlNumber.length > 0) {
            this.ctrlNumber.first.onContainerClick();
        }
        this.ctrlNumber.changes.pipe(first((x) => x.length > 0)).subscribe((items) => {
            items.first.onContainerClick();
        });
    }
    focusOnCtrlMeasurementUnit() {
        if (this.ctrlMeasurementUnit.length > 0) {
            this.ctrlMeasurementUnit.first.onContainerClick();
        }
        this.ctrlMeasurementUnit.changes.pipe(first((x) => x.length > 0)).subscribe((items) => {
            items.first.onContainerClick();
        });
    }
    ngAfterViewInit() {
        this.afterViewInit$.next(true);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], FgDimensionComponent.prototype, "initVal$", void 0);
tslib_1.__decorate([
    Input()
], FgDimensionComponent.prototype, "appearance", void 0);
tslib_1.__decorate([
    Input()
], FgDimensionComponent.prototype, "pkClassOfDimension", void 0);
tslib_1.__decorate([
    ViewChildren(MatInput)
], FgDimensionComponent.prototype, "ctrlNumber", void 0);
tslib_1.__decorate([
    ViewChildren(CtrlTypeComponent)
], FgDimensionComponent.prototype, "ctrlMeasurementUnit", void 0);
FgDimensionComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-fg-dimension',
        templateUrl: './fg-dimension.component.html',
        styleUrls: ['./fg-dimension.component.scss']
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(CONTAINER_DATA))
], FgDimensionComponent);
export { FgDimensionComponent };
//# sourceMappingURL=fg-dimension.component.js.map