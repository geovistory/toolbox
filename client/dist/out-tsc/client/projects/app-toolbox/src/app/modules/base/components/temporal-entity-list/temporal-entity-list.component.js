import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { TemporalEntityTable } from './TemporalEntityTable';
import { temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex, createPaginateBy } from '../../base.helpers';
let TemporalEntityListComponent = class TemporalEntityListComponent {
    constructor(p, c, t, i, inf, statementApi, paginationService, listDialog) {
        this.p = p;
        this.c = c;
        this.t = t;
        this.i = i;
        this.inf = inf;
        this.statementApi = statementApi;
        this.paginationService = paginationService;
        this.listDialog = listDialog;
        this.destroy$ = new Subject();
        this.limit$ = new BehaviorSubject(temporalEntityListDefaultLimit);
        this.pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
        this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(map(([limit, pageIndex]) => limit * pageIndex));
    }
    ngOnInit() {
        // custom temporal entity table columns
        const customCols = {
            columnsBefore: ['_classInfo_'],
            columnsAfter: ['_actions_']
        };
        // table loading ect
        const pagination$ = combineLatest(this.limit$.pipe(), this.offset$.pipe(), this.p.pkProject$).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        const paginateBy = createPaginateBy(this.listDefinition, this.pkEntity);
        const nextPage$ = new Subject();
        pagination$.pipe(distinctUntilChanged(equals), takeUntil(this.destroy$)).subscribe(([limit, offset, pkProject]) => {
            nextPage$.next();
            this.paginationService.temporalEntity.addPageLoader(pkProject, this.listDefinition, this.pkEntity, limit, offset, merge(nextPage$, this.destroy$));
        });
        const columns$ = this.c.pipeSpecificAndBasicFields(this.listDefinition.targetClass);
        this.rows$ = combineLatest(pagination$, columns$).pipe(distinctUntilChanged(equals), switchMap(([[limit, offset, pkProject], columns]) => this.i.pipeTemporalEntityTableRows(paginateBy, limit, offset, pkProject, this.listDefinition, columns)), shareReplay({ refCount: true, bufferSize: 1 }));
        this.table = new TemporalEntityTable(this.rows$, columns$, this.destroy$, this.listDefinition, customCols);
        this.itemsCount$ = this.p.inf$.statement$.pagination$.pipeCount(paginateBy);
    }
    onPageChange(e) {
        this.pageIndex$.next(e.pageIndex);
        this.limit$.next(e.pageSize);
    }
    remove(item) {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            // remove the statement
            this.inf.statement.remove([item.statement], pkProject);
            // remove the related temporal entity
            this.p.removeEntityFromProject(item.pkEntity);
        });
        // combineLatest(
        //   this.i.pipeTemporalEntityRemoveProperties(item.pkEntity),
        //   this.p.pkProject$
        // ).pipe(first(), takeUntil(this.destroy$)).subscribe(([d, pkProject]) => {
        //   this.inf.temporal_entity.remove([d.temporalEntity], pkProject);
        //   if (d.statements.length) this.inf.statement.remove(d.statements, pkProject);
        //   if (d.textProperties.length) this.inf.text_property.remove(d.textProperties, pkProject)
        // })
    }
    openList(cell) {
        const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info);
        this.listDialog.open(true, pkEntities, 'Items');
    }
    openInNewTab(item) {
        this.p.addEntityTab(item.pkEntity, this.listDefinition.targetClass);
    }
    addAndOpenInNewTab(item) {
        this.p.addEntityToProject(item.pkEntity, () => {
            this.openInNewTab(item);
        });
    }
    markAsFavorite(item) {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, item.statement.pk_entity, item.isOutgoing);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "listDefinition", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "treeControl", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "readonly$", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "addButtonVisible", void 0);
tslib_1.__decorate([
    Input()
], TemporalEntityListComponent.prototype, "toggleButtonVisible", void 0);
TemporalEntityListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-temporal-entity-list',
        templateUrl: './temporal-entity-list.component.html',
        styleUrls: ['./temporal-entity-list.component.scss']
    })
], TemporalEntityListComponent);
export { TemporalEntityListComponent };
//# sourceMappingURL=temporal-entity-list.component.js.map