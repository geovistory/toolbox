import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { equals, sum } from 'ramda';
import { first } from 'rxjs/operators';
let FormArrayComponent = class FormArrayComponent {
    constructor(formCreateEntity) {
        this.formCreateEntity = formCreateEntity;
    }
    wrapInCard(child) {
        return false;
        // if (child.factoryType !== 'array') return false
        // else {
        //   const c = child as LocalFormArrayFactory
        //   return (
        //     c.config.data.fieldDefinition.listType.temporalEntity &&
        //     c.config.isList === false
        //   )
        // }
    }
    isFormArray(child) {
        return child.factoryType === 'array';
    }
    isFormControl(child) {
        if (child.factoryType === 'control') {
            return true;
        }
        return false;
    }
    isCtrlTargetClass(formArrayFactory) {
        if (formArrayFactory.factoryType === 'control') {
            const c = formArrayFactory;
            if (c.config.data.controlType === 'ctrl-target-class') {
                return true;
            }
        }
        return false;
    }
    get showAddBtn() {
        return ((this.formArrayFactory.config.maxLength > this.formArrayFactory.children.length));
    }
    get parentListDefsLength() {
        return this.formArrayFactory.parent.config.data &&
            this.formArrayFactory.parent.config.data.lists &&
            this.formArrayFactory.parent.config.data.lists.fieldDefinition.listDefinitions.length;
    }
    showRemoveBtn(child) {
        return this.parentListDefsLength > 1 ||
            ((child.factoryType === 'control' || child.factoryType == 'childFactory')
                && this.parentLength > this.parentMinLength
                && !(child.config.data.controlType && child.config.data.controlType == 'ctrl-time-span'));
    }
    get paddingLeft() {
        return this.showTitle ? this.titleLevel * 15 : 0;
    }
    get showTitle() {
        return this.formArrayFactory.config.isList && !this.formArrayFactory.config.data.hideFieldTitle;
    }
    // get isTemporalEntityList() {
    //   return (this.formArrayFactory.config.data.lists &&
    //     this.formArrayFactory.config.data.lists.fieldDefinition.listType.temporalEntity)
    // }
    get itemNumberFlexible() {
        return (this.formArrayFactory.config.isList &&
            this.formArrayFactory.config.maxLength !== 1 &&
            this.formArrayFactory.config.maxLength !== undefined);
    }
    get maxLength() {
        if (this.formArrayFactory.config.data.lists) {
            return this.formArrayFactory.config.data.lists.maxLength;
        }
    }
    get minLength() {
        if (this.formArrayFactory.config.data.lists) {
            return this.formArrayFactory.config.data.lists.minLength;
        }
    }
    get length() {
        return sum(this.formArrayFactory.control.controls.map((ctrl) => ctrl.controls ? ctrl.controls.length : 0));
    }
    get parentMaxLength() {
        if (this.formArrayFactory.parent.config.data.lists) {
            return this.formArrayFactory.parent.config.data.lists.maxLength;
        }
    }
    get parentMinLength() {
        if (this.formArrayFactory.parent.config.data.lists) {
            return this.formArrayFactory.parent.config.data.lists.minLength;
        }
    }
    get parentLength() {
        const formArray = this.formArrayFactory.parent.control;
        if (formArray.controls && formArray.controls.length > 0) {
            return sum(formArray.controls.map((ctrl) => ctrl.controls ? ctrl.controls.length : 0));
        }
        return 0;
    }
    get titleLevel() {
        return this.formArrayFactory.level;
    }
    ctrlTargetClassIsDisabled(configs) {
        // disable if no config is not disabled
        return !configs.some(c => !c.disabled);
    }
    ngOnInit() {
    }
    add() {
        this.addItemInChildListDef(this.formArrayFactory.config.data.lists.fieldDefinition.listDefinitions[0]);
    }
    remove(i) {
        this.formArrayFactory.remove(i);
    }
    // addSpecific(i, d: FormControlData, j) {
    //   const configs = d.nodeConfigs
    //   const config = configs[j];
    //   if (d.fieldDefinition.targetMaxQuantity === 1) {
    //     const disabledConfig = configs.find(c => c.disabled === true)
    //     if (disabledConfig) {
    //       // remove the previously selected child
    //       this.formArrayFactory.remove(i + 1)
    //       // enable the previously disabled config in options menu
    //       disabledConfig.disabled = false;
    //     }
    //   }
    //   // add the selected child
    //   this.formArrayFactory.add(i + 1, config)
    //   // disable the selected config
    //   config.disabled = true;
    // }
    addItemInChildListDef(lDef) {
        // try to find the existing child FormArray containing the controls
        let childList = this.formArrayFactory.children.find(c => {
            if (c.factoryType == 'array') {
                const d = c.config.data;
                return equals(d.controls.listDefinition, lDef);
            }
            return false;
        });
        // if not available, add a child FormArray containing the controls
        if (!childList) {
            const config = this.formCreateEntity.getListNode(lDef, false, undefined);
            config.array.addOnInit = 0;
            childList = this.formArrayFactory.prepend(config);
        }
        const childFactory = childList.prependDefault();
        // Do some actions after the control is added
        if (childFactory.factoryType == 'control') {
            // Wait for the controls to be initialized by angular and emitted by childFactory
            childFactory.childComponent$
                .pipe(first())
                .subscribe((childComponents) => {
                // if child is gv-ctrl-entity
                if (childComponents.ctrlEntity) {
                    childComponents.ctrlEntity.onContainerClick();
                }
                // if child is gv-ctrl-entity
                else if (childComponents.ctrlType) {
                    childComponents.ctrlType.onContainerClick();
                }
                else if (childComponents.ctrlTimeSpan) {
                    childComponents.ctrlTimeSpan.onContainerClick();
                }
            });
        }
        else if (childFactory.factoryType === 'childFactory') {
            childFactory.childComponent$
                .pipe(first())
                .subscribe((childComponent) => {
                if (childComponent.FgTextPropertyComponent) {
                    childComponent.FgTextPropertyComponent.focusOnCtrlText();
                }
                else if (childComponent.FgPlaceComponent) {
                    childComponent.FgPlaceComponent.focusOnCtrlLat();
                }
                else if (childComponent.FgLangStringComponent) {
                    childComponent.FgLangStringComponent.focusOnCtrlText();
                }
            });
        }
    }
    ngOnDestroy() {
        if (this.formArrayFactory.config.data.removeHook) {
            this.formArrayFactory.config.data.removeHook(this.formArrayFactory.config.data);
        }
    }
};
tslib_1.__decorate([
    Input()
], FormArrayComponent.prototype, "formArrayFactory", void 0);
FormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-form-array',
        templateUrl: './form-array.component.html',
        styleUrls: ['./form-array.component.scss']
    })
], FormArrayComponent);
export { FormArrayComponent };
//# sourceMappingURL=form-array.component.js.map