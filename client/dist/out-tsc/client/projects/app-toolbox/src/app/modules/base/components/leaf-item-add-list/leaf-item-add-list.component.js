import * as tslib_1 from "tslib";
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { equals, indexBy } from 'ramda';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { isLeafItemSubfield } from '../../base.helpers';
let LeafItemAddListComponent = class LeafItemAddListComponent {
    constructor(p, i, t, inf, pagApi) {
        this.p = p;
        this.i = i;
        this.t = t;
        this.inf = inf;
        this.pagApi = pagApi;
        this.destroy$ = new Subject();
        this.close = new EventEmitter();
        this.next = new EventEmitter();
        this.dataSource = new MatTableDataSource();
        this.pageSize$ = new BehaviorSubject(5);
        this.pageIndex$ = new BehaviorSubject(0);
        this.loading = false;
        this.valueObjectsToStore = [];
    }
    ngOnInit() {
        // stop initialization if this is not a leaf item list
        if (!isLeafItemSubfield(this.listDefinition.listType))
            return;
        const relateBy = this.listDefinition.isOutgoing ? 'fk_subject_info' : 'fk_object_info';
        const filterObject = {
            [relateBy]: this.pkEntity,
            fk_property: this.listDefinition.property.pkProperty,
            fk_property_of_property: this.listDefinition.property.pkPropertyOfProperty
        };
        const loadConfig$ = combineLatest(this.pageSize$, this.pageIndex$, this.p.pkProject$).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        const res$ = loadConfig$.pipe(distinctUntilChanged(equals), tap(() => {
            this.loading = true;
        }), switchMap(([pageSize, pageIndex, pkProject,]) => this.pagApi.paginatedStatementsControllerAlternativeLeafItems({
            pkProject,
            filterObject,
            limit: pageSize,
            offset: (pageSize * pageIndex)
        })), tap(() => {
            this.loading = false;
        }), shareReplay({ bufferSize: 1, refCount: true }));
        res$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res.count === 0) {
                this.next.emit();
            }
            else {
                this.itemsCount = res.count;
                this.dataSource.data = this.getItems(res);
            }
        });
        const allowMultiSelect = this.listDefinition.targetMaxQuantity === 1 ? false : true;
        allowMultiSelect ?
            this.displayedColumns = ['checkbox', 'item', 'projects'] :
            this.displayedColumns = ['radiobutton', 'item', 'projects'];
        const initialSelection = [];
        this.selection = new SelectionModel(allowMultiSelect, initialSelection);
        this.selectedCount$ = this.selection.changed.pipe(map(s => s.source.selected.length));
    }
    getItems(res) {
        const relateBy = this.listDefinition.isOutgoing ? 'fk_object_info' : 'fk_subject_info';
        if (this.listDefinition.listType.entityPreview) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.war.entity_preview);
            return res.schemas.inf.statement.map(statement => {
                const preview = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    preview: (!preview ? { pk_entity: statement[relateBy] } : preview),
                    fkClass: !preview ? undefined : preview.fk_class,
                    label: !preview ? undefined : preview.entity_label,
                    ordNum: undefined,
                    projRel: undefined
                };
                return item;
            });
        }
        else if (this.listDefinition.listType.appellation) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.appellation);
            return res.schemas.inf.statement.map(statement => {
                const appellation = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    fkClass: appellation.fk_class,
                    label: appellation.string,
                    ordNum: undefined,
                    projRel: undefined
                };
                const row = Object.assign({}, item, { store: {
                        storeFn: this.p.inf.appellation.loadSucceeded,
                        items: [appellation]
                    } });
                return row;
            });
        }
        else if (this.listDefinition.listType.place) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.place);
            return res.schemas.inf.statement.map(statement => {
                const place = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    fkClass: place.fk_class,
                    label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
                    ordNum: undefined,
                    projRel: undefined
                };
                const row = Object.assign({}, item, { store: {
                        storeFn: this.p.inf.place.loadSucceeded,
                        items: [place]
                    } });
                return row;
            });
        }
        else if (this.listDefinition.listType.langString) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.lang_string);
            const languages = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language);
            return res.schemas.inf.statement.map(statement => {
                const langString = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    fkClass: langString.fk_class,
                    label: langString.string,
                    language: languages[langString.fk_language],
                    fkLanguage: langString.fk_language,
                    ordNum: undefined,
                    projRel: undefined
                };
                const row = Object.assign({}, item, { store: {
                        storeFn: this.p.inf.lang_string.loadSucceeded,
                        items: [langString]
                    } });
                return row;
            });
        }
        else if (this.listDefinition.listType.dimension) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.dimension);
            const entityPreviews = indexBy((x) => x.pk_entity.toString(), res.schemas.war.entity_preview);
            return res.schemas.inf.statement.map(statement => {
                const dimension = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    fkClass: dimension.fk_class,
                    label: `${dimension.numeric_value} ${entityPreviews[dimension.fk_measurement_unit].entity_label}`,
                    ordNum: undefined,
                    projRel: undefined
                };
                const row = Object.assign({}, item, { store: {
                        storeFn: this.p.inf.dimension.loadSucceeded,
                        items: [dimension]
                    } });
                return row;
            });
        }
        else if (this.listDefinition.listType.language) {
            const leafItems = indexBy((x) => x.pk_entity.toString(), res.schemas.inf.language);
            return res.schemas.inf.statement.map(statement => {
                const language = leafItems[statement[relateBy]];
                const item = {
                    statement,
                    fkClass: language.fk_class,
                    label: language.notes,
                    ordNum: undefined,
                    projRel: undefined
                };
                const row = Object.assign({}, item, { store: {
                        storeFn: this.p.inf.language.loadSucceeded,
                        items: [language]
                    } });
                return row;
            });
        }
    }
    onPageChange(e) {
        this.pageIndex$.next(e.pageIndex);
        this.pageSize$.next(e.pageSize);
    }
    ngAfterViewInit() {
        // this.selectionList.selectedOptions = this.selectionModel;
    }
    add() {
        const statements = this.selection.selected.map(option => option.statement);
        this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.statement.upsert(statements, pkProject)
            .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
            this.close.emit();
        }));
        // add leaf values objects to store
        this.selection.selected.forEach(s => {
            if (s.store)
                s.store.storeFn(s.store.items, '');
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    /** The label for the checkbox on the passed row */
    checkboxLabel(row) {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.label}`;
    }
};
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "listDefinition", void 0);
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "readonly$", void 0);
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "addButtonVisible", void 0);
tslib_1.__decorate([
    Input()
], LeafItemAddListComponent.prototype, "toggleButtonVisible", void 0);
tslib_1.__decorate([
    Output()
], LeafItemAddListComponent.prototype, "close", void 0);
tslib_1.__decorate([
    Output()
], LeafItemAddListComponent.prototype, "next", void 0);
LeafItemAddListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-leaf-item-add-list',
        templateUrl: './leaf-item-add-list.component.html',
        styleUrls: ['./leaf-item-add-list.component.scss']
    })
], LeafItemAddListComponent);
export { LeafItemAddListComponent };
//# sourceMappingURL=leaf-item-add-list.component.js.map