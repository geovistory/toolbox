import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { DfhConfig } from "@kleiolab/lib-config";
import { Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { FormCreateEntityComponent } from '../../form-create-entity/form-create-entity.component';
let CtrlEntityDialogComponent = class CtrlEntityDialogComponent {
    constructor(p, c, dialogRef, data) {
        this.p = p;
        this.c = c;
        this.dialogRef = dialogRef;
        this.data = data;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        // actual search str
        this.searchString$ = new Subject();
        this.classAndTypePk = data.classAndTypePk;
        this.pkUiContext = data.pkUiContext;
        this.alreadyInProjectBtnText = data.alreadyInProjectBtnText;
        this.notInProjectBtnText = data.notInProjectBtnText;
        this.notInProjectClickBehavior = data.notInProjectClickBehavior;
        this.initVal$ = this.data.initVal$.pipe(map(v => v ? v.temporal_entity || v.persistent_item : null));
    }
    ngOnInit() {
        // this.localStore = this.ngRedux.configureSubStore(this.basePath, createOrAddEntityReducer);
        // this.rootEpics.addEpic(this.epics.createEpics(this));
        if (!this.classAndTypePk || !this.classAndTypePk.pkClass)
            throw new Error('You must provide classAndTypePk as Component @Input().');
        if (!this.alreadyInProjectBtnText)
            throw Error('please provide a alreadyInProjectBtnText');
        if (!this.notInProjectBtnText)
            throw Error('please provide a notInProjectBtnText');
        if (!this.notInProjectClickBehavior)
            throw Error('please provide a notInProjectClickBehavior');
        this.classLabel$ = this.c.pipeClassLabel(this.classAndTypePk.pkClass);
        this.classType$ = this.p.dfh$.class$.by_pk_class$.key(this.classAndTypePk.pkClass).pipe(filter(klass => !!klass), map(klass => {
            const systype = klass.basic_type;
            if (systype === DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || systype === 30)
                return 'peIt';
            else
                return 'teEnt';
        }));
    }
    /**
     * gets called on change of the search string.
     */
    searchStringChange(term) {
        this.searchString$.next(term);
    }
    // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
    onNotInProjectClicked(pkEntity) {
        if (this.notInProjectClickBehavior == 'selectOnly') {
            this.onCreateOrAdd({
                action: 'notInProjectClicked',
                pkEntity,
                pkClass: this.classAndTypePk.pkClass
            });
        }
        else if (this.notInProjectClickBehavior == 'addToProject') {
            this.p.addEntityToProject(pkEntity, (schemaObject) => {
                this.onCreateOrAdd({
                    action: 'added',
                    pkEntity,
                    pkClass: this.classAndTypePk.pkClass
                });
            });
        }
    }
    // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
    onAlreadyInProjectClicked(pkEntity) {
        this.onCreateOrAdd({
            action: 'alreadyInProjectClicked',
            pkEntity,
            pkClass: this.classAndTypePk.pkClass
        });
    }
    // TODO: Integrate this in the concept of using the core services for api calls, using InfActions
    onCreated(entity) {
        this.onCreateOrAdd({
            action: 'created',
            pkEntity: entity.pk_entity,
            pkClass: this.classAndTypePk.pkClass
        });
    }
    onCreateOrAdd(res) {
        this.dialogRef.close(res);
    }
    closeAddForm() {
        this.dialogRef.close();
    }
    // When user confirms that the form is filled
    onFormOk() {
        this.createEntity.submitted = true;
        if (this.createEntity.formFactory.formGroup.valid) {
            this.p.dfh$.class$.by_pk_class$.key(this.classAndTypePk.pkClass).pipe(first(i => !!i)).subscribe((klass) => {
                const value = this.createEntity.formFactory.formGroupFactory.valueChanges$.value;
                this.dialogRef.close(value);
            });
        }
        else {
            const f = this.createEntity.formFactory.formGroup.controls.childControl;
            U.recursiveMarkAsTouched(f);
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    ViewChild(FormCreateEntityComponent, { static: true })
], CtrlEntityDialogComponent.prototype, "createEntity", void 0);
CtrlEntityDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-ctrl-entity-dialog',
        templateUrl: './ctrl-entity-dialog.component.html',
        styleUrls: ['./ctrl-entity-dialog.component.scss']
    }),
    tslib_1.__param(3, Inject(MAT_DIALOG_DATA))
], CtrlEntityDialogComponent);
export { CtrlEntityDialogComponent };
//# sourceMappingURL=ctrl-entity-dialog.component.js.map