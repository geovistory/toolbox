import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { DfhConfig } from "@kleiolab/lib-config";
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { equals, indexBy, values, without } from 'ramda';
import { BehaviorSubject, combineLatest, Subject, of } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
// TODO import this interface from backend
// interface TableRow {
//   pk_row: number,
//   [key: number]: TabCell
// }
let TableDetailComponent = class TableDetailComponent {
    constructor(ref, digitalApi, p, worker, tableAPI, s, c, inf) {
        this.ref = ref;
        this.digitalApi = digitalApi;
        this.p = p;
        this.worker = worker;
        this.tableAPI = tableAPI;
        this.s = s;
        this.c = c;
        this.inf = inf;
        this.destroy$ = new Subject();
        this.dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
        this.dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;
        /**
         * configuration parameters that trigger new api call and
         * are needed to generate a SQL query (backend side)
         * Values are updated BEFORW Api call
         */
        this.pageSize$ = new BehaviorSubject(20);
        this.pageIndex$ = new BehaviorSubject(0);
        this.sortBy$ = new BehaviorSubject('pk_row');
        this.sortDirection$ = new BehaviorSubject('ASC');
        this.filters$ = new BehaviorSubject({});
        // control managing the selction of the colToggleOptions, for:
        // a) listening to changes in 'column toggle UI'
        // b) to set the initial value of selected columns to show
        this.colToggleCtrl = new FormControl([]);
        // used to tell stupid table component to show spinner
        this.loading = true;
        this.colFiltersEnabled = false;
        this.lineBrakeInCells = false;
        // Array of pk_entity of columns that have been queried
        // Value is updated after the API call
        // (for optimisation)
        this.queriedCols = [];
        // flag that indicates if the api is called the first time
        // (set to false after the first api call)
        // (for optimisation)
        this.firstApiCall = true;
    }
    ngOnInit() {
        this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
        this.t.setTabTitle('Table ' + this.pkEntity);
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            // this.p.dat$.column.loadColumnsOfTable(this.pkEntity, pkProject);
            this.s.storeGv(this.tableAPI.tableControllerGetTableColumns(pkProject, this.pkEntity), pkProject);
            this.pkProject = pkProject;
        });
        const loadConfig$ = combineLatest(this.pageSize$, this.pageIndex$, this.p.pkProject$, this.sortBy$, this.sortDirection$, this.filters$.pipe(auditTime(10)), this.columnsLoadTrigger$()).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        const res$ = loadConfig$.pipe(distinctUntilChanged(equals), tap(() => {
            this.loading = true;
        }), switchMap(([pageSize, pageIndex, pkProject, sortBy, sortDirection, filters]) => this.tableAPI.tableControllerGetTablePage(pkProject, this.pkEntity, {
            // ]) => this.digitalApi.getTablePage(pkProject, this.pkEntity, {
            limit: pageSize,
            offset: pageSize * pageIndex,
            columns: this.colToggleCtrl.value.map((i) => i.toString()),
            sortBy,
            sortDirection,
            filters: this.filters$.value
        }).pipe(tap((res) => {
            this.s.storeSchemaObjectGv(res.schemaObject, pkProject);
        }))), tap((res) => {
            this.loading = false;
            // this.firstApiCall = false; TODO: check if this would work
        }), shareReplay({ bufferSize: 1, refCount: true }));
        this.length$ = res$.pipe(map(res => res.length));
        // Update this.queriedCols with columns returned by rest api
        res$.pipe(map(res => res.columns), distinctUntilChanged(equals), takeUntil(this.destroy$)).subscribe((columns) => {
            this.queriedCols = columns.map(pk => parseInt(pk, 10));
        });
        /**
         * Get all columns and add them to the column toggle
         */
        this.colToggleOptions$ = this.p.dat$.column$.by_fk_digital$.key(this.pkEntity).pipe(map(indexedCols => values(indexedCols).map(col => col)), tap(cols => {
            // make all checkboxes as checked
            this.colToggleCtrl.setValue(cols.map(col => col.pk_entity));
        }), switchMap(cols => combineLatestOrEmpty(cols.map(datColumn => this.p.dat$.text_property$.by_fk_entity__fk_system_type$
            .key(datColumn.pk_entity + '_' + 3295)
            .pipe(map(textProp => {
            const display = (values(textProp)[0] || { string: '' }).string;
            return { display, value: datColumn.pk_entity, datColumn };
        }))))), shareReplay({ refCount: true, bufferSize: 1 }));
        this.columns$ = combineLatest(this.colToggleCtrl.valueChanges, this.colToggleOptions$).pipe(map(([cols, colToggleOptions]) => {
            const colInd = indexBy(c => c.toString(), cols);
            this.colMapping = ['pk_row'];
            const result = [];
            for (const option of colToggleOptions) {
                if (!!colInd[option.value]) {
                    result.push(option);
                    this.colMapping.push(option.value.toString());
                }
            }
            // return colToggleOptions.filter(o => !!colInd[o.value])
            return result;
        }), shareReplay({ bufferSize: 1, refCount: true }));
        // set the headers
        this.headers$ = this.columns$.pipe(switchMap((cols) => {
            const obs$ = cols.map(col => this.p.dat$.class_column_mapping$.by_fk_column$.key(col.datColumn.pk_entity).pipe(
            // extract the fkClass
            map((mappings) => {
                const mapArr = values(mappings);
                let toReturn;
                if (mapArr.length)
                    toReturn = mapArr[0].fk_class;
                return toReturn;
            }), 
            // create the header for that column
            switchMap((fkClass) => {
                const header = {
                    colLabel: col.display,
                    comment: col.datColumn.fk_data_type == this.dtText ? 'string' : 'number',
                    type: col.datColumn.fk_data_type == this.dtText ? 'string' : 'number',
                    pk_column: col.datColumn.pk_entity,
                };
                if (!fkClass)
                    return of(header);
                // get the class and the class label
                return combineLatest(this.p.dfh$.class$.by_pk_class$.key(fkClass), this.c.pipeClassLabel(fkClass)).pipe(map(([dfhClass, classLabels]) => {
                    header.mapping = {
                        fkClass: fkClass,
                        className: classLabels,
                        icon: dfhClass.basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || dfhClass.basic_type == 30 ? 'peIt' : 'teEn'
                    };
                    return header;
                }));
            })));
            return combineLatestOrEmpty(obs$);
        }), map((cols) => {
            const firstHeader = { colLabel: 'Row ID', comment: 'number', type: 'number' };
            return [firstHeader, ...cols];
        }));
        // creating the table and the data mapping
        this.table$ = combineLatest([res$, this.headers$]).pipe(map(([res, headers]) => {
            this.dataMapping = [];
            const rows = res.rows;
            const table = [];
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const keys = Object.keys(row);
                table[i] = [];
                this.dataMapping[i] = [];
                table[i][0] = row.pk_row.toString();
                this.dataMapping[i][0] = { pk_row: row.pk_row };
                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    if (this.colMapping.indexOf(key) == -1)
                        continue;
                    const str = row[key].string_value ? row[key].string_value : row[key].numeric_value == 0 || row[key].numeric_value ? row[key].numeric_value : '';
                    const theCol = headers.filter(h => h.pk_column == parseInt(key, 10))[0];
                    if (!theCol)
                        continue;
                    if (!theCol.mapping)
                        table[i].push(str);
                    else
                        table[i].push({ text: str, pkCell: row[key].pk_cell });
                    this.dataMapping[i].push({
                        pk_row: row.pk_row,
                        pk_col: parseInt(res.columns[j], 10),
                        pk_cell: row[key].pk_cell,
                        refersTo: -1
                    });
                }
            }
            return table;
        }), takeUntil(this.destroy$));
        if (this.filterOnRow) {
            // this.colFiltersEnabled = true;
            this.filters$.next({
                'pk_row': {
                    numeric: {
                        operator: '=',
                        value: this.filterOnRow
                    }
                }
            });
        }
    }
    /**
     * Returns an Observable that emits an array with the columns to load
     * only when a rest api call is needed.
     * This is to prevent from unnessecary rest api call, e.g. when user
     * hides a column that has been loaded before.
     */
    columnsLoadTrigger$() {
        return this.colToggleCtrl.valueChanges.pipe(filter((current) => {
            let passes = true;
            if (this.firstApiCall === true) {
                // lets pass the first time
                passes = true;
                this.firstApiCall = false;
            }
            else if (this.queriedCols.length === 0) {
                // Blocks the stream if the this.queriedCols  value was empty
                // Remember: calling rest api with options.columns = [], all columns are loaded
                passes = false;
            }
            else if (without(this.queriedCols, current).length === 0) {
                // Blocks the stream, if current has no additional column compared to this.queriedCols
                // (prevents from loading just less than before)
                passes = false;
            }
            return passes;
        }));
    }
    onPageChange(e) {
        this.pageIndex$.next(e.pageIndex);
        this.pageSize$.next(e.pageSize);
    }
    onFilterChange(allFilters) {
        const filters = {};
        allFilters.forEach(incFilter => {
            const colName = this.colMapping[incFilter.col];
            filters[colName] = incFilter.filter;
        });
        this.pageIndex$.next(0);
        this.filters$.next(filters);
    }
    onSortChangesort(sortOpt) {
        const colName = this.colMapping[sortOpt.colNb];
        if (this.sortBy$.value === colName) {
            this.sortDirection$.next(this.sortDirection$.value === 'ASC' ? 'DESC' : 'ASC');
        }
        else {
            this.sortBy$.next(colName);
            this.sortDirection$.next('ASC');
        }
    }
    click(cell) { }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], TableDetailComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], TableDetailComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], TableDetailComponent.prototype, "filterOnRow", void 0);
TableDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-table-detail',
        templateUrl: './table-detail.component.html',
        styleUrls: ['./table-detail.component.scss']
    })
], TableDetailComponent);
export { TableDetailComponent };
//# sourceMappingURL=table-detail.component.js.map