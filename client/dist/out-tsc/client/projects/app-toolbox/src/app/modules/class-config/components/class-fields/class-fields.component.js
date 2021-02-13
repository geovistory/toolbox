import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { FieldConfigDialogComponent } from '../field-config-dialog/field-config-dialog.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';
let ClassFieldsComponent = class ClassFieldsComponent {
    constructor(c, p, dialog) {
        this.c = c;
        this.p = p;
        this.dialog = dialog;
        this.destroy$ = new Subject();
        this.reordering = false;
        this.mapFields = (fields) => fields
            .map(field => {
            // If this field is a class Field
            if (!field.property) {
                return Object.assign({}, field);
            }
            // If this field is a property field
            const f = Object.assign({}, field, { propertyField: {
                    identityDefiningForSource: field.listDefinitions[0].identityDefiningForSource,
                    targetClasses: field.listDefinitions.map(ld => ({
                        pkClass: ld.targetClass,
                        label: ld.targetClassLabel
                    }))
                } });
            return f;
        });
    }
    ngOnInit() {
        this.defaultFields$ = this.c.pipeBasicFieldsOfClass(this.fkClass)
            .pipe(map((fields) => this.mapFields(fields)));
        this.specificFields$ = this.c.pipeSpecificFieldOfClass(this.fkClass)
            .pipe(map((fields) => this.mapFields(fields)));
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    openFieldDialog(row) {
        const l = row.listDefinitions[0];
        const o = l.isOutgoing;
        const data = {
            fkProject: this.fkProject,
            fkProperty: row.property.pkProperty,
            fkPropertyDomain: o ? l.sourceClass : null,
            fkPropertyRange: o ? null : l.sourceClass
        };
        this.dialog.open(FieldConfigDialogComponent, {
            data,
            height: 'calc(100% - 30px)',
            // width: 'calc(100% - 30px)',
            width: '690px',
            // maxWidth: '100%',
            maxHeight: '100%'
        });
    }
    onRowReorder(event) {
        this.reordering = true;
        this.specificFields$.pipe(first()).subscribe((specificFields) => {
            //
            const items = specificFields.map(field => {
                const item = {
                    fk_property: field.property.pkProperty,
                    fk_domain_class: field.isOutgoing ? field.sourceClass : undefined,
                    fk_range_class: field.isOutgoing ? undefined : field.sourceClass,
                    fk_project: this.fkProject,
                    pk_entity: field.fieldConfig && field.fieldConfig.fk_project === this.fkProject ?
                        field.fieldConfig.pk_entity : undefined
                };
                return item;
            });
            moveItemInArray(items, event.dragIndex, event.dropIndex);
            const reordered = items.map((item, index) => {
                item.ord_num = index;
                return item;
            });
            this.p.pro$.class_field_config.upsert(reordered, this.fkProject).resolved$
                .pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(() => {
                this.reordering = false;
            });
        });
    }
};
tslib_1.__decorate([
    Input()
], ClassFieldsComponent.prototype, "fkProject", void 0);
tslib_1.__decorate([
    Input()
], ClassFieldsComponent.prototype, "fkClass", void 0);
ClassFieldsComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-class-fields',
        templateUrl: './class-fields.component.html',
        styleUrls: ['./class-fields.component.scss']
    })
], ClassFieldsComponent);
export { ClassFieldsComponent };
//# sourceMappingURL=class-fields.component.js.map