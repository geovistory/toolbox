import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { sum } from 'ramda';
import { combineLatest, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { isValueObjectSubfield } from '../../base.helpers';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ChooseClassDialogComponent } from '../choose-class-dialog/choose-class-dialog.component';
import { temporalEntityListDefaultPageIndex } from "../../base.helpers";
import { temporalEntityListDefaultLimit } from "../../base.helpers";
import { createPaginateBy } from "../../base.helpers";
let FieldComponent = class FieldComponent {
    constructor(t, i, p, inf, dialog, timeSpan, pag) {
        this.t = t;
        this.i = i;
        this.p = p;
        this.inf = inf;
        this.dialog = dialog;
        this.timeSpan = timeSpan;
        this.pag = pag;
        this.destroy$ = new Subject();
    }
    getKey(_, item) {
        return _;
    }
    ngOnInit() {
        const limit = temporalEntityListDefaultLimit;
        const offset = temporalEntityListDefaultPageIndex;
        /**
         * Trigger loading of statement lists
         */
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.fieldDefinition.listDefinitions.forEach(l => {
                if (l.listType.temporalEntity) {
                    this.pag.temporalEntity.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$);
                }
                else if (l.listType.entityPreview) {
                    this.pag.statements.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$);
                }
            });
        });
        if (this.fieldDefinition.isSpecialField !== 'has-type') {
            this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
                let obs$;
                if (l.listType.temporalEntity || l.listType.entityPreview) {
                    obs$ = this.p.inf$.statement$.pagination$.pipeCount(createPaginateBy(l, this.pkEntity));
                }
                else {
                    obs$ = this.i.pipeListLength(l, this.pkEntity);
                }
                return obs$.pipe(map((itemsCount) => (Object.assign({}, l, { itemsCount }))));
            })).pipe(map(lists => lists.filter((list) => list.itemsCount > 0)), shareReplay({ refCount: true, bufferSize: 1 }));
            this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))));
            this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
                .pipe(map(([n, r]) => {
                if (r)
                    return false;
                if (this.fieldDefinition.targetMaxQuantity === -1)
                    return true;
                if (this.fieldDefinition.targetMaxQuantity <= n)
                    return false;
                if (this.fieldDefinition.isSpecialField === 'time-span' && 1 <= n)
                    return false;
                return true;
            }));
        }
        else {
            this.itemsCount$ = this.i.pipeTypeOfEntity(this.pkEntity, this.fieldDefinition.property.pkProperty, this.fieldDefinition.isOutgoing).pipe(map(hasTypeStatement => hasTypeStatement ? 1 : 0));
        }
    }
    addClick() {
        if (this.fieldDefinition.isSpecialField === 'time-span') {
            this.i.pipeItemTimeSpan(this.pkEntity).pipe(first(), takeUntil(this.destroy$)).subscribe(item => {
                this.timeSpan.openModal(item, this.pkEntity);
            });
        }
        // More than one target class?
        else if (this.fieldDefinition.targetClasses && this.fieldDefinition.targetClasses.length > 1) {
            // Let the user select target class first
            const data = {
                pkClasses: this.fieldDefinition.targetClasses,
                title: 'Choose a class'
            };
            this.dialog.open(ChooseClassDialogComponent, { data })
                .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(chosenClass => {
                if (chosenClass) {
                    // open add dialog
                    const listDef = this.fieldDefinition.listDefinitions.find(l => l.targetClass === chosenClass);
                    this.openAddDialog(listDef);
                }
            });
        }
        // Only one target class!
        else {
            // open add dialog
            const listDef = this.fieldDefinition.listDefinitions[0];
            this.openAddDialog(listDef);
        }
    }
    openAddDialog(listDef) {
        const isValueLike = isValueObjectSubfield(listDef.listType);
        const showAddList = (!isValueLike && !listDef.identityDefiningForTarget);
        const data = {
            listDefinition: listDef,
            pkEntity: this.pkEntity
        };
        const config = {
            height: isValueLike ? '50%' : '100%',
            width: showAddList ? '980px' : '500px',
            maxWidth: '100%',
            data,
        };
        // if (!isValueLike) config.height = 'calc(100% - 30px)'
        this.dialog.open(AddDialogComponent, config);
    }
    toggle() {
        if (this.treeControl) {
            this.treeControl.isExpanded(this.fieldDefinition) ?
                this.treeControl.collapse(this.fieldDefinition) :
                this.treeControl.expand(this.fieldDefinition);
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], FieldComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], FieldComponent.prototype, "fieldDefinition", void 0);
tslib_1.__decorate([
    Input()
], FieldComponent.prototype, "treeControl", void 0);
tslib_1.__decorate([
    Input()
], FieldComponent.prototype, "readonly$", void 0);
tslib_1.__decorate([
    Input()
], FieldComponent.prototype, "showOntoInfo$", void 0);
FieldComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-field',
        templateUrl: './field.component.html',
        styleUrls: ['./field.component.scss']
    })
], FieldComponent);
export { FieldComponent };
//# sourceMappingURL=field.component.js.map