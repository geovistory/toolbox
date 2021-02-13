import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { QueryFilterComponent } from 'projects/app-toolbox/src/app/modules/queries/components/query-filter/query-filter.component';
import { values } from 'ramda';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
/**
 * Config of a lineArray
 * lineArray contains a list of lines
 */
export const lineArrayConfig = (initVal) => ({
    array: {
        data: {
            type: 'lineArray',
            lineArray: { initVal }
        },
        placeholder: '',
        mapValue: (x) => ({
            lines: x
        })
    }
});
/**
 * Config of a line
 * line is a container for the lineControls
 */
export const lineConfig = (initVal = {
    visualizationDefinition: {
        label: 'My new line'
    },
    queryDefinition: { filter: undefined, columns: undefined }
}) => {
    return {
        array: {
            data: {
                type: 'line',
                line: { initVal }
            },
            placeholder: '',
            mapValue: (x) => {
                const [filter, label] = x;
                return {
                    queryDefinition: {
                        filter,
                        columns: [{
                                id: 'col_0',
                                ofRootTable: true,
                                preventGroupBy: true,
                                defaultType: 'temporal_distribution'
                            }]
                    },
                    visualizationDefinition: {
                        label
                    }
                };
            }
        }
    };
};
/**
 * Config of lineControls
 * lineControls is a container for the individual fields needed for each line
 * @param rootClasses$ the classes that appear in the query filter root select dropdown
 */
export const lineControlConfigs = (initVal) => ([
    {
        childFactory: {
            component: QueryFilterComponent,
            required: true,
            data: {
                type: 'queryFilter',
                queryFilter: initVal.queryFilter
            },
            getInjectData: (d) => (d.queryFilter),
            mapValue: (x) => x
        }
    },
    {
        control: {
            data: {
                type: 'lineLabel',
            },
            required: true,
            initValue: initVal.lineLabel,
            placeholder: 'Name of the line',
            mapValue: (x) => x
        }
    },
]);
let TimeChartContFormComponent = class TimeChartContFormComponent {
    constructor(ff, c) {
        this.ff = ff;
        this.c = c;
        this.destroy$ = new Subject();
        this.afterViewInit$ = new BehaviorSubject(false);
        this.formFactory$ = new Subject();
    }
    ngOnInit() {
        if (!this.initVal$) {
            const initVal = {
                lines: [
                    {
                        visualizationDefinition: {
                            label: 'My first line'
                        },
                        queryDefinition: { filter: undefined, columns: undefined }
                    }
                ]
            };
            this.initVal$ = new BehaviorSubject(initVal);
        }
        this.rootClasses$ = this.c.pipeSelectedTeEnClassesInProject().pipe(map(x => values(x)));
        const ffConfig = {
            rootFormGroup$: of({
                data: {
                    initVal$: this.initVal$
                }
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
            return n.group.data.initVal$.pipe(map((initVal) => [lineArrayConfig(initVal.lines)]));
        }
        else if (n.array && n.array.data.lineArray) {
            return new BehaviorSubject(n.array.data.lineArray.initVal.map(line => lineConfig(line)));
        }
        else if (n.array && n.array.data.line) {
            const initVal = n.array.data.line.initVal;
            const c = {
                queryFilter: {
                    rootClasses$: this.rootClasses$,
                    initVal$: of(initVal.queryDefinition.filter)
                },
                lineLabel: initVal.visualizationDefinition.label
            };
            return new BehaviorSubject(lineControlConfigs(c));
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
], TimeChartContFormComponent.prototype, "initVal$", void 0);
TimeChartContFormComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-time-chart-cont-form',
        templateUrl: './time-chart-cont-form.component.html',
        styleUrls: ['./time-chart-cont-form.component.scss']
    })
], TimeChartContFormComponent);
export { TimeChartContFormComponent };
//# sourceMappingURL=time-chart-cont-form.component.js.map