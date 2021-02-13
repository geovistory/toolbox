var ClassAndTypeSelectComponent_1, ClassOrTypeRequiredValidatorDirective_1;
import * as tslib_1 from "tslib";
import { Component, Input, Optional, Self, Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, of } from 'rxjs';
import { AbstractChecklistControl } from 'projects/app-toolbox/src/app/shared/components/checklist-control/classes/abstract-checklist-control';
import { ChecklistControlService } from 'projects/app-toolbox/src/app/shared/components/checklist-control/services/checklist-control.service';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import { equals } from 'ramda';
let ClassAndTypeSelectComponent = ClassAndTypeSelectComponent_1 = class ClassAndTypeSelectComponent extends AbstractChecklistControl {
    constructor(s, ngControl, i) {
        super(s, ngControl);
        this.s = s;
        this.ngControl = ngControl;
        this.i = i;
        this.selectedText$ = new BehaviorSubject('');
        s.getNodeId = (data) => {
            return data.pkClass + '_' + data.pkType;
        };
    }
    ngOnInit() {
        if (!this.pkClasses$)
            throw new Error('You must provide nestedTree$ input');
        this.nestedTree$ = this.pkClasses$.pipe(distinctUntilChanged(equals), switchMap(pkClasses => (!pkClasses || !pkClasses.length) ? of([]) : this.i.pipeClassesAndTypesOfClasses(pkClasses)), map(nodes => nodes.map(node => {
            const children = node.children.map(typeNode => ({
                data: {
                    label: typeNode.label,
                    pkType: typeNode.data.pkType
                },
                children: []
            }));
            const t = {
                data: {
                    label: node.label,
                    pkClass: node.data.pkClass
                },
                children
            };
            return t;
        })));
        this.s.dataSource.data = [];
        this.nestedTree$.subscribe(tree => {
            this.s.dataSource.data = tree;
        });
    }
    /**
     * input for write value
     */
    controlModelToDataArray(m) {
        let selectedClasses = [];
        let selectedTypes = [];
        if (m && m.classes) {
            selectedClasses = m.classes.map(pkClass => ({ pkClass, label: '' }));
        }
        if (m && m.types) {
            selectedTypes = m.types.map(pkType => ({ pkType, label: '' }));
        }
        const treeNodeDatas = [...selectedClasses, ...selectedTypes];
        return treeNodeDatas;
    }
    /**
     * output on value change
     */
    dataArrayToControlModel(ds) {
        const classes = [], types = [];
        ds.forEach(d => {
            if (d.pkClass)
                classes.push(d.pkClass);
            else if (d.pkType)
                types.push(d.pkType);
        });
        this.selectedText$.next(ds.map(d => d.label).join(', '));
        return { classes, types };
    }
    onOpen() {
        this.focused = true;
        //this.focus.emit();
    }
    onClose() {
        this.focused = false;
        this.onTouch();
        //this.blur.emit();
    }
};
tslib_1.__decorate([
    Input()
], ClassAndTypeSelectComponent.prototype, "pkClasses$", void 0);
ClassAndTypeSelectComponent = ClassAndTypeSelectComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'gv-class-and-type-select',
        templateUrl: './class-and-type-select.component.html',
        styleUrls: ['./class-and-type-select.component.scss'],
        providers: [
            ChecklistControlService,
            { provide: MatFormFieldControl, useExisting: ClassAndTypeSelectComponent_1 }
        ]
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Self())
], ClassAndTypeSelectComponent);
export { ClassAndTypeSelectComponent };
export function classOrTypeRequiredCondition(model) {
    return (!model || !model ||
        [...(model.classes || []), ...(model.types || [])].length === 0);
}
/** At least one class or type must be selected */
export function classOrTypeRequiredValidator() {
    return (control) => {
        const model = control.value;
        return classOrTypeRequiredCondition(model) ? { 'classOrTypeRequired': { value: control.value } } : null;
    };
}
let ClassOrTypeRequiredValidatorDirective = ClassOrTypeRequiredValidatorDirective_1 = class ClassOrTypeRequiredValidatorDirective {
    validate(control) {
        return classOrTypeRequiredValidator()(control);
    }
};
ClassOrTypeRequiredValidatorDirective = ClassOrTypeRequiredValidatorDirective_1 = tslib_1.__decorate([
    Directive({
        selector: '[gvClassOrTypeRequired]',
        providers: [{ provide: NG_VALIDATORS, useExisting: ClassOrTypeRequiredValidatorDirective_1, multi: true }]
    })
], ClassOrTypeRequiredValidatorDirective);
export { ClassOrTypeRequiredValidatorDirective };
//# sourceMappingURL=class-and-type-select.component.js.map