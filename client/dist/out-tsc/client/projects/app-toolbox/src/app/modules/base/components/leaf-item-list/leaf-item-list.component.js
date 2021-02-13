import * as tslib_1 from "tslib";
import { map, shareReplay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createPaginateBy } from "../../base.helpers";
import { temporalEntityListDefaultPageIndex } from "../../base.helpers";
import { temporalEntityListDefaultLimit } from "../../base.helpers";
import { equals } from 'ramda';
import { ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
let LeafItemListComponent = class LeafItemListComponent {
    constructor(p, t, i, inf, pag, dialog) {
        this.p = p;
        this.t = t;
        this.i = i;
        this.inf = inf;
        this.pag = pag;
        this.dialog = dialog;
        this.destroy$ = new Subject();
        this.limit$ = new BehaviorSubject(temporalEntityListDefaultLimit);
        this.pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
        this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(map(([limit, pageIndex]) => limit * pageIndex));
    }
    ngOnInit() {
        if (this.listDefinition.listType.entityPreview) {
            const pagination$ = combineLatest(this.limit$.pipe(), this.offset$.pipe(), this.p.pkProject$).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
            // Loading from rest api
            const nextPage$ = new Subject();
            pagination$.pipe(distinctUntilChanged(equals), takeUntil(this.destroy$)).subscribe(([limit, offset, pkProject]) => {
                nextPage$.next();
                this.pag.statements.addPageLoader(pkProject, this.listDefinition, this.pkEntity, limit, offset, merge(nextPage$, this.destroy$));
            });
            const paginateBy = createPaginateBy(this.listDefinition, this.pkEntity);
            // Piping from store
            this.items$ = pagination$.pipe(distinctUntilChanged(equals), switchMap(([limit, offset, pkProject]) => this.i.pipeStatementListPage(paginateBy, limit, offset, pkProject, this.listDefinition, false)), shareReplay({ refCount: true, bufferSize: 1 }));
            this.itemsCount$ = this.p.inf$.statement$.pagination$.pipeCount(paginateBy);
        }
        else {
            this.items$ = this.i.pipeList(this.listDefinition, this.pkEntity);
            this.itemsCount$ = this.items$.pipe(map(i => (i || []).length));
        }
    }
    remove(item) {
        if (this.listDefinition.identityDefiningForSource && this.listDefinition.isOutgoing) {
            alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.');
        }
        else {
            this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {
                const statement = item.statement;
                this.inf.statement.remove([statement], pkProject);
            });
        }
    }
    openInNewTab(item) {
        this.p.addEntityTab(item.preview.pk_entity, item.preview.fk_class);
    }
    openPopup(item) {
        const data = {
            hideNoButton: true,
            noBtnText: '',
            yesBtnText: 'Ok',
            title: 'Details',
            paragraphs: [item.label]
        };
        this.dialog.open(ConfirmDialogComponent, { data });
    }
    onPageChange(e) {
        this.pageIndex$.next(e.pageIndex);
        this.limit$.next(e.pageSize);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "listDefinition", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "treeControl", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "readonly$", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "addButtonVisible", void 0);
tslib_1.__decorate([
    Input()
], LeafItemListComponent.prototype, "toggleButtonVisible", void 0);
LeafItemListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-leaf-item-list',
        templateUrl: './leaf-item-list.component.html',
        styleUrls: ['./leaf-item-list.component.scss']
    })
], LeafItemListComponent);
export { LeafItemListComponent };
//# sourceMappingURL=leaf-item-list.component.js.map