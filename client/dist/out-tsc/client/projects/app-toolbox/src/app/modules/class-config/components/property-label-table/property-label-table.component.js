import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, map, mergeMap, takeUntil, filter } from 'rxjs/operators';
import { values } from 'd3';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
let PropertyLabelTableComponent = class PropertyLabelTableComponent {
    constructor(c, p, fb, pro, inf) {
        this.c = c;
        this.p = p;
        this.fb = fb;
        this.pro = pro;
        this.inf = inf;
        this.destroy$ = new Subject();
        this.editing$ = new BehaviorSubject(null); // pk_entity of ProTextProperty being edited
        this.saving$ = new BehaviorSubject(null);
        this.creating$ = new BehaviorSubject(false);
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'language', 'actions'];
        this.labelCtrl = new FormControl('', [Validators.required]);
        this.languageCtrl = new FormControl(null, [Validators.required]);
        // typeCtrl = new FormControl('singular', [Validators.required])
        this.form = this.fb.group({
            labelCtrl: this.labelCtrl,
            langugageCtrl: this.languageCtrl,
        });
    }
    ngOnInit() {
        if (!this.fkSystemType)
            throw new Error('you must provide fkSystemType input');
        if (!this.fkProject)
            throw new Error('you must provide fkProject input');
        if (!((this.fkProperty && this.fkPropertyDomain) ||
            (this.fkProperty && this.fkPropertyRange) ||
            (this.fkClass))) {
            throw new Error('you must provide fkProperty with fkPropertyDomain or fkPropertyRange input');
        }
        this.rows$ = combineLatest(this.p.pro$.text_property$
            .by_fks_without_lang$
            .key(`${this.fkProject}_${this.fkSystemType}_${this.fkClass || null}_${this.fkProperty || null}_${this.fkPropertyDomain || null}_${this.fkPropertyRange || null}`)
            .pipe(map((props) => values(props))), this.editing$, this.saving$, this.creating$).pipe(mergeMap(([textProperties, editing, saving, creating]) => combineLatestOrEmpty(textProperties
            .map(textProp => this.p.inf$.language$.by_pk_entity$.key(textProp.fk_language)
            .pipe(filter(lang => !!lang), map(language => {
            const row = {
                editMode: editing && textProp.pk_entity === editing.pk_entity,
                saving: saving == textProp.pk_entity,
                textProperty: textProp,
                language,
                label: textProp.string,
                languageLabel: language.notes,
            };
            return row;
        })))).pipe(map(rows => creating ?
            [{
                    editMode: true,
                }, ...rows] :
            rows))));
        this.rows$.pipe(takeUntil(this.destroy$)).subscribe(rows => {
            this.dataSource.data = rows;
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    add() {
        this.creating$.next(true);
    }
    delete(r) {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.pro.text_property.delete([r.textProperty], pkProject);
        });
    }
    edit(r) {
        this.labelCtrl.setValue(r.textProperty.string);
        this.languageCtrl.setValue(r.language);
        // this.typeCtrl.setValue(r.type)
        this.editing$.next(r.textProperty);
    }
    cancel() {
        this.labelCtrl.setValue(null);
        this.languageCtrl.setValue(null);
        // this.typeCtrl.setValue(null)
        this.editing$.next(null);
        this.creating$.next(null);
    }
    save() {
        if (this.form.valid) {
            combineLatest(this.p.pkProject$, this.editing$).pipe(first()).subscribe(([pkProject, editing]) => {
                const { fk_project, pk_entity } = editing || {};
                const language = this.languageCtrl.value;
                const model = Object.assign({}, editing, { fk_dfh_class: this.fkClass, fk_dfh_property: this.fkProperty, fk_dfh_property_domain: this.fkPropertyDomain, fk_dfh_property_range: this.fkPropertyRange, pk_entity: (pkProject == fk_project) ? pk_entity : null, fk_project: pkProject, string: this.labelCtrl.value, fk_language: language.pk_entity, fk_system_type: this.fkSystemType });
                this.saving$.next(pk_entity);
                // make sure the language is in store
                this.inf.language.loadSucceeded([language], null, pkProject);
                this.pro.text_property.upsert([model], pkProject).resolved$.pipe(first(x => !!x)).subscribe(res => {
                    this.saving$.next(null);
                    this.editing$.next(null);
                    this.cancel();
                });
            });
        }
        else {
            this.form.markAllAsTouched();
        }
    }
};
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkProject", void 0);
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkSystemType", void 0);
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkProperty", void 0);
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkPropertyDomain", void 0);
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkPropertyRange", void 0);
tslib_1.__decorate([
    Input()
], PropertyLabelTableComponent.prototype, "fkClass", void 0);
PropertyLabelTableComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-property-label-table',
        templateUrl: './property-label-table.component.html',
        styleUrls: ['./property-label-table.component.scss']
    })
], PropertyLabelTableComponent);
export { PropertyLabelTableComponent };
//# sourceMappingURL=property-label-table.component.js.map