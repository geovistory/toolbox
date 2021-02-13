import * as tslib_1 from "tslib";
import { Component, Inject, Input, Optional, ViewChildren } from '@angular/core';
import { MatInput } from '@angular/material';
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { DfhConfig } from "@kleiolab/lib-config";
import { BehaviorSubject, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
let FgPlaceComponent = class FgPlaceComponent {
    constructor(ff, injectedData) {
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
                this.appearance = injectedData.appearance;
            }
        }
    }
    ngOnInit() {
        if (!this.initVal$) {
            this.initVal$ = new BehaviorSubject({
                pk_entity: undefined,
                fk_class: DfhConfig.CLASS_PK_PLACE,
                lat: undefined,
                long: undefined
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
                                const place = {
                                    pk_entity: undefined,
                                    fk_class: initVal ? initVal.fk_class : null,
                                    lat: x[0],
                                    long: x[1]
                                };
                                return place;
                            }
                        }
                    }];
                return childConfigs;
            }));
        }
        else if (n.array && n.array.data.type === 'root') {
            return this.initVal$.pipe(map(initVal => {
                const latCtrl = {
                    control: {
                        initValue: initVal ? initVal.lat : null,
                        required: true,
                        data: {},
                        mapValue: x => x,
                        placeholder: 'Latitude'
                    }
                };
                const longCtrl = {
                    control: {
                        initValue: initVal ? initVal.long : null,
                        required: true,
                        data: {},
                        mapValue: x => x,
                        placeholder: 'Longitude'
                    }
                };
                return [latCtrl, longCtrl];
            }));
        }
    }
    focusOnCtrlLat() {
        if (this.matInputs.length > 0) {
            this.matInputs.first.focus();
        }
        this.matInputs.changes.pipe(first((x) => x.length > 0)).subscribe((items) => {
            items.first.focus();
        });
    }
    focusOnCtrlLong() {
        if (this.matInputs.length > 1) {
            this.matInputs.last.focus();
        }
        this.matInputs.changes.pipe(first((x) => x.length > 1)).subscribe((items) => {
            items.last.focus();
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
], FgPlaceComponent.prototype, "initVal$", void 0);
tslib_1.__decorate([
    Input()
], FgPlaceComponent.prototype, "appearance", void 0);
tslib_1.__decorate([
    ViewChildren(MatInput)
], FgPlaceComponent.prototype, "matInputs", void 0);
FgPlaceComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-fg-place',
        templateUrl: './fg-place.component.html',
        styleUrls: ['./fg-place.component.scss']
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(CONTAINER_DATA))
], FgPlaceComponent);
export { FgPlaceComponent };
//# sourceMappingURL=fg-place.component.js.map