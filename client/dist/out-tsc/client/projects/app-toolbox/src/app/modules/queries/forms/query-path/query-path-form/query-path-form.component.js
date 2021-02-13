import * as tslib_1 from "tslib";
import { Component, Inject, Input, Optional } from '@angular/core';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { CONTAINER_DATA } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-child-factory';
import { classOrTypeRequiredValidator } from 'projects/app-toolbox/src/app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { propertiesRequiredValidator } from 'projects/app-toolbox/src/app/modules/queries/components/property-select/property-select.component';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
/**
 * Config of a root
 * root contains a list of lines
 */
export const rootConfig = () => ([{
        array: {
            data: {
                type: 'root',
            },
            placeholder: '',
            mapValue: x => x
        }
    }]);
/**
 * Config of a classesSegment
 * classesSegment is a container for the classesSegmentControls
 */
export const classesSegmentConfig = (options$, disabled$, initValue) => {
    const val$ = new Subject();
    return {
        val$,
        c: {
            id: U.uuid(),
            control: {
                data: {
                    classesSegment: {
                        options$
                    }
                },
                placeholder: 'Classes',
                initValue,
                disabled$,
                required: true,
                validators: [classOrTypeRequiredValidator()],
                mapValue: (data) => {
                    val$.next(data);
                    return { data, type: 'classes' };
                }
            }
        }
    };
};
/**
 * Config of a propertiesSegment
 * propertiesSegment is a container for the propertiesSegmentControls
 */
export const propertiesSegmentConfig = (options$, disabled$, initValue) => {
    const val$ = new Subject();
    return {
        val$,
        c: {
            id: U.uuid(),
            control: {
                data: {
                    propertiesSegment: {
                        options$
                    }
                },
                placeholder: 'Properties',
                initValue,
                disabled$,
                required: true,
                validators: [propertiesRequiredValidator()],
                mapValue: (data) => {
                    val$.next(data);
                    return { data, type: 'properties' };
                }
            }
        }
    };
};
let QueryPathFormComponent = class QueryPathFormComponent {
    constructor(ff, i, injectedData) {
        this.ff = ff;
        this.i = i;
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
            if (injectedData.rootClasses$) {
                this.rootClasses$ = injectedData.rootClasses$;
            }
        }
    }
    ngOnInit() {
        if (!this.rootClasses$)
            throw new Error('You must provide input rootClasses$');
        if (!this.initVal$)
            throw new Error('You must provide input initVal$');
        const ffConfig = {
            rootFormGroup$: of({
                data: {}
            }),
            getChildNodeConfigs: (n) => this.getChildNodeConfigs(n)
        };
        this.ff.create(ffConfig, this.destroy$).pipe(first(), takeUntil(this.destroy$)).subscribe((v) => {
            this.formFactory$.next(v);
            this.formFactory = v;
        });
    }
    getChildNodeConfigs(n) {
        if (n.group) {
            const childConfigs = rootConfig();
            return of(childConfigs);
        }
        else if (n.array && n.array.data.type === 'root') {
            return this.initVal$.pipe(map(initValue => {
                const children = [];
                let cOptions$ = this.rootClasses$;
                let pOptions$;
                initValue.forEach((segment, i) => {
                    const disabled = i == 0 || i < initValue.length - 1;
                    if (segment.type === 'classes') {
                        const classesFn = classesSegmentConfig(cOptions$, new BehaviorSubject(disabled), {
                            classes: segment.data.classes,
                            types: segment.data.types
                        });
                        children.push(classesFn.c);
                        pOptions$ = classesFn.val$.pipe(switchMap((v) => this.i.pipePropertyOptionsFromClassesAndTypes(v)));
                    }
                    else if (segment.type === 'properties') {
                        const propsFn = propertiesSegmentConfig(pOptions$, new BehaviorSubject(disabled), {
                            ingoingProperties: segment.data.ingoingProperties,
                            outgoingProperties: segment.data.outgoingProperties
                        });
                        children.push(propsFn.c);
                        cOptions$ = propsFn.val$.pipe(switchMap((v) => this.i.pipePkClassesFromPropertySelectModel(v)));
                    }
                });
                return children;
            }));
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
};
tslib_1.__decorate([
    Input()
], QueryPathFormComponent.prototype, "rootClasses$", void 0);
tslib_1.__decorate([
    Input()
], QueryPathFormComponent.prototype, "initVal$", void 0);
QueryPathFormComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-query-path-form',
        templateUrl: './query-path-form.component.html',
        styleUrls: ['./query-path-form.component.scss']
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(CONTAINER_DATA))
], QueryPathFormComponent);
export { QueryPathFormComponent };
//# sourceMappingURL=query-path-form.component.js.map