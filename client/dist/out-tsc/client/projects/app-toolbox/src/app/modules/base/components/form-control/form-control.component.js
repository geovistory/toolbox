import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CtrlEntityComponent } from '../ctrl-entity/ctrl-entity.component';
import { CtrlTimeSpanComponent } from '../ctrl-time-span/ctrl-time-span.component';
import { CtrlTypeComponent } from '../ctrl-type/ctrl-type.component';
let FormControlComponent = class FormControlComponent {
    constructor(createForm) {
        this.createForm = createForm;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.config = this.formControlFactory.config;
        if (this.config.data.controlType == 'ctrl-entity') {
            this.configureEntityCtrl();
            this.syncTeEnToAdd();
        }
    }
    syncTeEnToAdd() {
        let pkTeEnToAdd;
        this.formControlFactory.control.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
            if (pkTeEnToAdd) {
                const i = this.createForm.temporalEntitiesToAdd.indexOf(pkTeEnToAdd);
                this.createForm.temporalEntitiesToAdd.splice(i, 1);
            }
            if (this.config.data.ctrlEntity.model === 'temporal_entity' && val.pkEntity) {
                pkTeEnToAdd = val.pkEntity;
                this.createForm.temporalEntitiesToAdd.push(pkTeEnToAdd);
            }
        });
        this.destroy$.subscribe(() => {
            if (pkTeEnToAdd) {
                const i = this.createForm.temporalEntitiesToAdd.indexOf(pkTeEnToAdd);
                this.createForm.temporalEntitiesToAdd.splice(i, 1);
            }
        });
    }
    configureEntityCtrl() {
        const lDef = this.config.data.listDefinition;
        if (lDef && lDef.identityDefiningForSource && lDef.sourceMaxQuantity !== -1) {
            this.entityCtrlDisableStatement = {
                sourceClassLabel: lDef.sourceClassLabel,
                propertyLabel: lDef.label,
                maxQuantity: lDef.sourceMaxQuantity,
                relatedStatement: {
                    filter: {
                        key: this.getKeyOfRelatedStatement(),
                        value: (lDef.property.pkProperty || lDef.property.pkPropertyOfProperty)
                    },
                    relateBy: this.getRelateByOfRelatedStatement()
                }
            };
        }
    }
    getKeyOfRelatedStatement() {
        const lDef = this.config.data.listDefinition;
        if (lDef.property.pkProperty)
            return 'fk_property';
        else if (lDef.property.pkPropertyOfProperty)
            return 'fk_property_of_property';
        console.error('key to relate related statement not found');
    }
    getRelateByOfRelatedStatement() {
        const lDef = this.config.data.listDefinition;
        return lDef.isOutgoing ? 'fk_object_info' : 'fk_subject_info';
    }
    ngAfterViewInit() {
        const childComponents = {
            ctrlEntity: this.ctrlEntity,
            ctrlType: this.ctrlType,
            ctrlTimeSpan: this.ctrlTimeSpan
        };
        this.formControlFactory.childComponent$.next(childComponents);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], FormControlComponent.prototype, "formControlFactory", void 0);
tslib_1.__decorate([
    ViewChild(CtrlEntityComponent, { static: false })
], FormControlComponent.prototype, "ctrlEntity", void 0);
tslib_1.__decorate([
    ViewChild(CtrlTypeComponent, { static: false })
], FormControlComponent.prototype, "ctrlType", void 0);
tslib_1.__decorate([
    ViewChild(CtrlTimeSpanComponent, { static: false })
], FormControlComponent.prototype, "ctrlTimeSpan", void 0);
FormControlComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-form-control',
        templateUrl: './form-control.component.html',
        styleUrls: ['./form-control.component.css']
    })
], FormControlComponent);
export { FormControlComponent };
//# sourceMappingURL=form-control.component.js.map