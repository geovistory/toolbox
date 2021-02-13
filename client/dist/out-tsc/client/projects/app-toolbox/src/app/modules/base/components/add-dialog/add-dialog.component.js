import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { isLeafItemSubfield, isValueObjectSubfield } from '../../base.helpers';
let AddDialogComponent = class AddDialogComponent {
    constructor(p, c, dialog, dialogRef, data, teEnApi) {
        this.p = p;
        this.c = c;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.teEnApi = teEnApi;
        this.destroy$ = new Subject();
        this.activeElement$ = new BehaviorSubject('add-existing-statements');
        this.showOntoInfo$ = new BehaviorSubject(false);
        this.readonly$ = new BehaviorSubject(false);
        this.searchString$ = new Subject();
        this.loading$ = new BehaviorSubject(false);
        this.isLeafItemList = isLeafItemSubfield(data.listDefinition.listType);
        this.classAndTypePk = { pkClass: data.listDefinition.targetClass, pkType: undefined };
        this.alreadyInProjectBtnText = 'Select';
        this.notInProjectBtnText = 'Add and Select';
        this.notInProjectClickBehavior = 'selectOnly';
    }
    ngOnInit() {
    }
    onClose() {
        this.dialogRef.close();
    }
    onNext() {
        const isValueLike = isValueObjectSubfield(this.data.listDefinition.listType);
        if (isValueLike || this.data.listDefinition.identityDefiningForTarget) {
            this.activeElement$.next('create-form');
        }
        else {
            this.activeElement$.next('create-or-add');
        }
    }
    onSelected(pkEntity, isInProject) {
        const lDef = this.data.listDefinition;
        this.loading$.next(true);
        // create the statement to add
        const r = {};
        if (lDef.isOutgoing) {
            r.fk_subject_info = this.data.pkEntity;
            r.fk_object_info = pkEntity;
        }
        else {
            r.fk_object_info = this.data.pkEntity;
            r.fk_subject_info = pkEntity;
        }
        r.fk_property = lDef.property.pkProperty;
        r.fk_property_of_property = lDef.property.pkPropertyOfProperty;
        combineLatest(this.p.pkProject$, this.c.pipeTableNameOfClass(lDef.targetClass))
            .pipe(first(([pk, model]) => (!!pk && !!model)), takeUntil(this.destroy$))
            .subscribe(([pkProject, model]) => {
            // create api call for upserting the statement
            const obs$ = [this.p.inf.statement.upsert([r], pkProject).resolved$.pipe(first(x => !!x))];
            if (!isInProject && model == 'temporal_entity') {
                // crate api call for adding teEnToProject
                const apiCall = this.p.addEntityToProject(pkEntity);
                obs$.push(apiCall);
            }
            combineLatest(obs$).subscribe(x => {
                this.dialogRef.close();
            });
        });
    }
    /**
     * gets called on change of the search string.
     */
    searchStringChange(term) {
        this.searchString$.next(term);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
AddDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-add-dialog',
        templateUrl: './add-dialog.component.html',
        styleUrls: ['./add-dialog.component.scss']
    }),
    tslib_1.__param(4, Inject(MAT_DIALOG_DATA))
], AddDialogComponent);
export { AddDialogComponent };
//# sourceMappingURL=add-dialog.component.js.map