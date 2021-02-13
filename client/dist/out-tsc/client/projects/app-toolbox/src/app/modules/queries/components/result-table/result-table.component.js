import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ResultingEntitiesDialogComponent } from '../resulting-entities-dialog/resulting-entities-dialog.component';
import { ResultingValuesDialogComponent } from '../resulting-values-dialog/resulting-values-dialog.component';
let ResultTableComponent = class ResultTableComponent {
    constructor(dialog, p, a, ref) {
        this.dialog = dialog;
        this.p = p;
        this.a = a;
        this.ref = ref;
        this.destroy$ = new Subject();
        this.colDefs = [];
        this.limit = 50;
    }
    get totalRecords() {
        const result = this.a.results$.value;
        if (!result || !result.rows.length)
            return 0;
        else
            return result.full_count;
    }
    ngOnInit() {
        this.a.fkAnalysisType = SysConfig.PK_ANALYSIS_TYPE__TABLE;
        this.displayedColumns$ = this.definition$.pipe(map(def => def.columns.map(colDef => colDef.label)));
        let count = 0;
        this.a.results$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.items = this.transformResults(res);
            // Hack for updating height of table on first load
            if (res && count === 0) {
                setTimeout(() => { this.ref.detectChanges(); }, 100);
                count++;
            }
        });
    }
    transformResults(res) {
        const rows = (res || { rows: [] }).rows;
        return rows.map(inputRow => {
            const outputRow = {};
            for (const colId in inputRow) {
                if (Object.prototype.hasOwnProperty.call(inputRow, colId)) {
                    const inputCell = inputRow[colId];
                    let outputCell = {};
                    if (inputCell.entities)
                        outputCell = this.transformEntities(inputCell.entities);
                    if (inputCell.values)
                        outputCell = this.transformValues(inputCell.values);
                    if (inputCell.entity)
                        outputCell = this.transformEntity(inputCell.entity);
                    if (inputCell.entityLabel)
                        outputCell = this.transformLabel(inputCell.entityLabel);
                    if (inputCell.entityClassLabel)
                        outputCell = this.transformLabel(inputCell.entityClassLabel);
                    if (inputCell.entityTypeLabel)
                        outputCell = this.transformLabel(inputCell.entityTypeLabel);
                    if (inputCell.value)
                        outputCell = this.transformValue(inputCell.value);
                    outputRow[colId] = outputCell;
                }
            }
            return outputRow;
        });
    }
    transformEntities(x) {
        if (x.length === 1) {
            return { entity: x[0], };
        }
        else {
            return { entities: x };
        }
    }
    transformValues(x) {
        if (x.length === 1) {
            return this.transformValue(x[0]);
        }
        else {
            return { values: x.map(val => this.transformValueToValue(val)) };
        }
    }
    transformValueToValue(x) {
        const v = x.value;
        const res = { fkSubjectInfo: x.fkSubjectInfo };
        if (!v)
            return Object.assign({}, res, { label: '' });
        else if (v.dimension)
            return Object.assign({}, res, { label: v.dimension.numericValue.toString() });
        else if (v.geometry)
            return Object.assign({}, res, { label: v.geometry.geoJSON.coordinates.join(', ') });
        else if (v.language)
            return Object.assign({}, res, { label: v.language.label });
        else if (v.string)
            return Object.assign({}, res, { label: v.string.string });
        else if (v.langString)
            return Object.assign({}, res, { label: v.langString.string });
        else if (v.timePrimitive)
            return Object.assign({}, res, { label: v.timePrimitive.label });
        else
            return Object.assign({}, res, { label: '' });
    }
    transformEntity(x) {
        return { entity: x };
    }
    transformValue(x) {
        return { value: this.transformValueToValue(x) };
    }
    transformLabel(label) {
        return { label };
    }
    ngAfterViewInit() {
        this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
            this.definition = definition;
            this.colDefs = definition.columns;
            const body = this.table.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
            body.scrollTop = 0;
            this.table.reset();
        });
    }
    loadDataOnScroll(event) {
        this.lazyLoadState = event;
        if (this.definition)
            this.load(this.definition, event.first, event.rows);
        // combineLatest([this.p.pkProject$, this.definition$]).pipe(first(), takeUntil(this.destroy$))
        //   .subscribe(([pkProject, definition]) => {
        //   })
    }
    load(definition, offset, rows) {
        const analysisDefinition = {
            queryDefinition: {
                filter: definition.filter,
                columns: definition.columns,
                offset: offset || 0,
                limit: rows
            }
        };
        this.a.callRunApi((fkProject => this.a.analysisApi.analysisControllerTableRun({
            fkProject,
            analysisDefinition
        })));
    }
    download(fileType) {
        this.a.callDownloadApi((fkProject => this.a.analysisApi.analysisControllerTableExport({
            fkProject,
            fileType,
            analysisDefinition: { queryDefinition: this.definition },
        })))
            .subscribe((data) => {
            if (fileType === 'json') {
                const blob = new Blob([data.res], {
                    type: 'text/json'
                });
                saveAs(blob, `table-export-${new Date().getTime()}.json`);
            }
            else if (fileType === 'csv') {
                const blob = new Blob([data.res], {
                    type: 'text/comma-separated-values'
                });
                saveAs(blob, `table-export-${new Date().getTime()}.csv`);
            }
        });
    }
    // onInit() {
    //   this.set([]);
    //   let dataRefreshs = 0;
    //   this.data$.pipe(
    //     tap(() => dataRefreshs++),
    //     takeUntil(this.$destroy)
    //   ).subscribe(data => {
    //     this.dataSource.allData = data;
    //     if (data.length === 0) {
    //       this.viewport.scrollTo({ top: 0, left: 0 })
    //     }
    //   })
    //   this.headerTop$ = this.viewport.renderedRangeStream.pipe(
    //     map(() => -this.viewport.getOffsetToRenderedContentStart())
    //   );
    //   // fake infinite scroll
    //   this.viewport.renderedRangeStream.subscribe(({ start, end }) => {
    //     this.rangeChange.emit({ start, end })
    //   });
    // }
    // afterViewInit() {
    //   this.sticky = true;
    //   this.ref.detectChanges()
    // }
    openEntitiesDialog(entityPreviews) {
        const data = { entityPreviews };
        this.dialog.open(ResultingEntitiesDialogComponent, {
            width: '390px',
            data
        });
    }
    openValuesDialog(values) {
        const data = { values };
        this.dialog.open(ResultingValuesDialogComponent, {
            width: '390px',
            data
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], ResultTableComponent.prototype, "definition$", void 0);
tslib_1.__decorate([
    ViewChild('table', { static: false })
], ResultTableComponent.prototype, "table", void 0);
ResultTableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-result-table',
        templateUrl: './result-table.component.html',
        styleUrls: ['./result-table.component.scss']
    })
], ResultTableComponent);
export { ResultTableComponent };
//# sourceMappingURL=result-table.component.js.map