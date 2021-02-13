import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CoreTable } from 'projects/app-toolbox/src/app/shared/components/core-table/table';
import { of } from 'rxjs';
import { delay, exhaustMap, filter, map, tap } from 'rxjs/operators';
let ExampleTableComponent = class ExampleTableComponent extends CoreTable {
    constructor() {
        super();
        this.columns = ['id', 'name', 'actions'];
    }
    set examples(examples) {
        // sets dataSource on CoreTable
        this.set(examples);
        // keep original data because we're cloning it onNext
        this._examples = examples;
    }
    onInit() {
        this.offset$ = this.viewport.renderedRangeStream.pipe(map(() => -this.viewport.getOffsetToRenderedContentStart()));
        // fake infinite scroll
        const buffer = 20;
        this.viewport.renderedRangeStream.pipe(map(x => {
            return x;
        }), map(({ end }) => ({ end, data: this.dataSource.allData })), filter(({ end, data }) => end + buffer > data.length), tap(() => this.pending = true), exhaustMap(({ data }) => of([
            ...data,
            ...this._examples.map(d => (Object.assign({}, d, { id: d.id + data.length })))
        ]).pipe(delay(500) // fake api delay
        ))).subscribe(data => {
            this.dataSource.allData = data;
            this.pending = false;
        });
    }
};
tslib_1.__decorate([
    Input()
], ExampleTableComponent.prototype, "examples", null);
tslib_1.__decorate([
    Input()
], ExampleTableComponent.prototype, "sticky", void 0);
ExampleTableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-example-table',
        templateUrl: './example-table.component.html',
        styleUrls: ['./example-table.component.scss']
    })
], ExampleTableComponent);
export { ExampleTableComponent };
//# sourceMappingURL=example-table.component.js.map