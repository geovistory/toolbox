import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { latestVersion } from 'projects/app-toolbox/src/app/core';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { DfhConfig } from "@kleiolab/lib-config";
import { ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { flatten, indexBy, values } from 'ramda';
import { combineLatest, Subject } from 'rxjs';
import { filter, first, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
let MentioningListComponent = class MentioningListComponent {
    constructor(rootEpics, ngRedux, p, pp, s, inf, fb, dialog) {
        this.rootEpics = rootEpics;
        this.ngRedux = ngRedux;
        this.p = p;
        this.pp = pp;
        this.s = s;
        this.inf = inf;
        this.dialog = dialog;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.dataSource = new MatTableDataSource();
        this.dataChange = new EventEmitter();
        this.rowMouseenter = new EventEmitter();
        this.rowMouseleave = new EventEmitter();
        this.rowClick = new EventEmitter();
        // displayed columns of the table
        this.displayedColumns = [
            'domainLabel',
            'propertyLabel',
            'rangeInfoEntity',
            'actions'
            // 'rangeLabel',
            // 'isFocusedInText',
            // 'isFocusedInTable'
        ];
        this.getBasePath = () => this.basePath;
        this.mentioningCreateCtrl = new FormControl(null, [Validators.required]);
        this.formGroup = fb.group({ 'mentioningCreateCtrl': this.mentioningCreateCtrl });
    }
    ngOnInit() {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            if (this.listOf.type === 'digital-text') {
                this.displayedColumns = ['domainLabel', 'propertyLabel', 'rangeInfoEntity', 'actions'];
                this.s.dat$.chunk.loadChunksOfDigital(this.listOf.pkEntity, pkProject);
                const chunks$ = this.s.dat$.digital$.by_pk_entity$.key(this.listOf.pkEntity).pipe(filter(digitalVersions => !!digitalVersions && Object.keys(digitalVersions).length > 0), map(digitalVersions => values(digitalVersions)[0].pk_text), mergeMap(pkText => this.s.dat$.chunk$.by_fk_text$.key(pkText)), map(chunksByPk => values(chunksByPk)));
                const addDomain$ = chunks$.pipe(mergeMap(chunks => combineLatest(this.s.inf$.statement$.by_fk_subject_data$.all$, this.chunksToHighligt$)
                    .pipe(map(([easByDataDomain, chunksToHi]) => chunks
                    .map(chunk => {
                    const easOfChunk = values(easByDataDomain[chunk.pk_entity]);
                    const partialRows = easOfChunk.map(statement => ({
                        statement: statement,
                        domainChunk: chunk,
                        highlight: !chunksToHi ? false : chunksToHi.includes(chunk.pk_entity)
                    }));
                    return partialRows;
                })), map(rowsNested => flatten(rowsNested)
                    .filter(row => row.statement)))));
                const addRange$ = addDomain$.pipe(mergeMap((rows) => {
                    const ranges = rows.map(row => row.statement.fk_object_info);
                    const pks = flatten(ranges); // https://github.com/types/npm-ramda/issues/356
                    return combineLatestOrEmpty(pks.map(pk => this.p.streamEntityPreview(pk)))
                        .pipe(map(previews => {
                        const prevs = indexBy((i) => i.pk_entity.toString(), previews);
                        rows = rows.map(row => (Object.assign({}, row, { rangeInfoEntity: prevs[row.statement.fk_object_info], domainLabel: this.getDomainLabel(row), rangeLabel: this.getRangeLabel(prevs, row), propertyLabel: this.getPropertyLabel(row) })));
                        return rows;
                    }));
                }));
                this.data$ = addRange$;
                this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
                    this.dataSource.data = data;
                    this.dataChange.emit(data);
                });
            }
            else if (this.listOf.type === 'entity') {
                this.displayedColumns = ['digital', 'domainLabel', 'actions'];
                this.inf.statement.sourcesAndDigitalsOfEntity(true, pkProject, this.listOf.pkEntity);
                const rows$ = this.s.inf$.statement$.by_object$({ fk_object_info: this.listOf.pkEntity })
                    .pipe(switchMap((statements) => combineLatestOrEmpty(statements.filter(statement => statement.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO)
                    .map(statement => this.s.dat$.chunk$.by_pk_entity$.key(statement.fk_subject_data)
                    .pipe(filter(item => !!item), switchMap(domainChunk => this.s.dat$.digital$.by_pk_text$.key(domainChunk.fk_text).pipe(filter(item => !!item), map(texts => latestVersion(texts)), map(digital => ({
                    statement: statement,
                    domainChunk,
                    domainLabel: this.getStringFromChunk(domainChunk),
                    digital,
                    digitalLabel: digital.string.substr(0, 20) + (digital.string.length > 20 ? '...' : '')
                })))))))));
                this.data$ = rows$;
                this.data$.pipe(takeUntil(this.destroy$)).subscribe(data => {
                    this.dataSource.data = data;
                    this.dataChange.emit(data);
                });
            }
        });
    }
    getPropertyLabel(row) {
        return row.statement.fk_property === DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO ? 'Refers To' : '';
    }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }
    getRangeLabel(prevs, row) {
        if (row.statement && row.statement.fk_object_info) {
            const e = prevs[row.statement.fk_object_info];
            return [e.entity_label, e.class_label, e.type_label].join(' ');
        }
    }
    getDomainLabel(row) {
        if (row.domainChunk) {
            return this.getStringFromChunk(row.domainChunk);
        }
    }
    getStringFromChunk(chunk) {
        if (chunk) {
            return "« " + chunk.quill_doc.ops.map(op => op.insert).join('') + " »";
        }
    }
    submit() {
        if (this.formGroup.valid) {
            this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
                const statement = this.mentioningCreateCtrl.value;
                this.inf.statement.upsert([statement], pkProject).resolved$
                    .pipe(first(r => !!r), takeUntil(this.destroy$)).subscribe(resolved => {
                    // this.create$.next(false)
                });
            });
        }
    }
    remove(row) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Remove Annotation',
                paragraphs: [
                    'Are you sure?',
                    '(This can\'t be undone)',
                ],
                yesBtnColor: 'warn',
                yesBtnText: 'Remove',
                noBtnText: 'Cancel'
            }
        })
            .afterClosed()
            .subscribe(confirmed => {
            if (confirmed) {
                this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
                    this.inf.statement.remove([row.statement], pkProject);
                });
            }
        });
    }
    openEntity(entity) {
        this.pp.addEntityTab(entity.pk_entity, entity.fk_class);
    }
    ngOnDestroy() {
        // this.destroy();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], MentioningListComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], MentioningListComponent.prototype, "expressionPk$", void 0);
tslib_1.__decorate([
    Input()
], MentioningListComponent.prototype, "expressionPortionPk$", void 0);
tslib_1.__decorate([
    Input()
], MentioningListComponent.prototype, "listOf", void 0);
tslib_1.__decorate([
    Input()
], MentioningListComponent.prototype, "chunksToHighligt$", void 0);
tslib_1.__decorate([
    Output()
], MentioningListComponent.prototype, "dataChange", void 0);
tslib_1.__decorate([
    Output()
], MentioningListComponent.prototype, "rowMouseenter", void 0);
tslib_1.__decorate([
    Output()
], MentioningListComponent.prototype, "rowMouseleave", void 0);
tslib_1.__decorate([
    Output()
], MentioningListComponent.prototype, "rowClick", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], MentioningListComponent.prototype, "sort", void 0);
MentioningListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-mentioning-list',
        templateUrl: './mentioning-list.component.html',
        styleUrls: ['./mentioning-list.component.scss'],
        providers: [QuillOpsToStrPipe]
    })
], MentioningListComponent);
export { MentioningListComponent };
//# sourceMappingURL=mentioning-list.component.js.map