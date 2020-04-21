import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { equals, sum } from 'ramda';
import { FormArrayData, FormControlData, FormCreateEntityComponent, LocalFormArrayFactory, LocalFormControlFactory, LocalNodeConfig, LocalFormChildFactory, FormChildData } from '../form-create-entity/form-create-entity.component';
import { FieldDefinition, ListDefinition } from '../properties-tree/properties-tree.models';
import { ListType } from 'app/core';
import { FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CtrlEntityComponent } from '../ctrl-entity/ctrl-entity.component';
import { ChildComponents } from '../form-control/form-control.component';
import { FgTextPropertyComponent } from '../fg-text-property/fg-text-property.component';
import { FgPlaceComponent } from '../fg-place/fg-place.component';
import { FgLangStringComponent } from '../fg-lang-string/fg-lang-string.component';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit, OnDestroy {

  @Input() formArrayFactory: LocalFormArrayFactory


  wrapInCard(child: LocalFormArrayFactory | LocalFormControlFactory) {
    return false;
    // if (child.factoryType !== 'array') return false
    // else {
    //   const c = child as LocalFormArrayFactory
    //   return (
    //     c.config.data.fieldDefinition.listType === 'temporal-entity' &&
    //     c.config.isList === false
    //   )
    // }
  }

  isFormArray(child: LocalFormArrayFactory | LocalFormControlFactory) {
    return child.factoryType === 'array'
  }

  isFormControl(child: LocalFormArrayFactory | LocalFormControlFactory) {
    if (child.factoryType === 'control') {
      return true
      const c = child as LocalFormControlFactory
      if (c.config.data.controlType !== 'ctrl-target-class') {
      }
    }
    return false
  }

  isCtrlTargetClass(formArrayFactory: LocalFormArrayFactory | LocalFormControlFactory) {
    if (formArrayFactory.factoryType === 'control') {
      const c = formArrayFactory as LocalFormControlFactory
      if (c.config.data.controlType === 'ctrl-target-class') {
        return true
      }
    }
    return false
  }



  get showAddBtn() {
    return (
      (
        this.formArrayFactory.config.maxLength > this.formArrayFactory.children.length
      )
    )
  }

  get parentListDefsLength() {
    return this.formArrayFactory.parent.config.data &&
      this.formArrayFactory.parent.config.data.lists &&
      this.formArrayFactory.parent.config.data.lists.fieldDefinition.listDefinitions.length
  }

  showRemoveBtn(child: LocalFormControlFactory | LocalFormChildFactory) {
    return this.parentListDefsLength > 1 ||
      (
        (child.factoryType === 'control' || child.factoryType == 'childFactory')
        && this.parentLength > this.parentMinLength
        && !((child.config.data as FormControlData).controlType && (child.config.data as FormControlData).controlType == 'ctrl-time-span')
      )
  }

  get paddingLeft() {
    return this.showTitle ? this.titleLevel * 15 : 0
  }

  get showTitle() {
    return this.formArrayFactory.config.isList && !this.formArrayFactory.config.data.hideFieldTitle;
  }

  get isTemporalEntityList() {
    return (this.formArrayFactory.config.data.lists &&
      this.formArrayFactory.config.data.lists.fieldDefinition.listType === 'temporal-entity')
  }

  get itemNumberFlexible() {
    return (this.formArrayFactory.config.isList &&
      this.formArrayFactory.config.maxLength !== 1 &&
      this.formArrayFactory.config.maxLength !== undefined)
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
    return sum(this.formArrayFactory.control.controls.map((ctrl: FormArray) => ctrl.controls ? ctrl.controls.length : 0))
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
    const formArray = this.formArrayFactory.parent.control as FormArray;
    if (formArray.controls && formArray.controls.length > 0) {
      return sum(formArray.controls.map((ctrl: FormArray) => ctrl.controls ? ctrl.controls.length : 0))
    }
    return 0;
  }

  get titleLevel(): number {
    return this.formArrayFactory.level
  }

  ctrlTargetClassIsDisabled(configs: LocalNodeConfig[]) {
    // disable if no config is not disabled
    return !configs.some(c => !c.disabled)
  }

  constructor(
    private formCreateEntity: FormCreateEntityComponent,
  ) { }

  ngOnInit() {
  }

  add() {
    this.addItemInChildListDef(this.formArrayFactory.config.data.lists.fieldDefinition.listDefinitions[0])
  }
  remove(i) {
    this.formArrayFactory.remove(i)
  }

  addSpecific(i, d: FormControlData, j) {

    const configs = d.nodeConfigs
    const config = configs[j];

    if (d.fieldDefinition.targetMaxQuantity === 1) {
      const disabledConfig = configs.find(c => c.disabled === true)
      if (disabledConfig) {
        // remove the previously selected child
        this.formArrayFactory.remove(i + 1)
        // enable the previously disabled config in options menu
        disabledConfig.disabled = false;
      }
    }

    // add the selected child
    this.formArrayFactory.add(i + 1, config)

    // disable the selected config
    config.disabled = true;

  }
  addItemInChildListDef(lDef: ListDefinition) {
    // try to find the existing child FormArray containing the controls
    let childList = this.formArrayFactory.children.find(c => {
      if (c.factoryType == 'array') {
        const d = c.config.data as FormArrayData;
        return equals(d.controls.listDefinition, lDef)
      }
      return false
    }) as FormArrayFactory<FormControlData, FormArrayData, FormChildData>;

    // if not available, add a child FormArray containing the controls
    if (!childList) {
      const config = this.formCreateEntity.getListNode(lDef, false, undefined)
      config.array.addOnInit = 0;
      childList = this.formArrayFactory.prepend(config) as FormArrayFactory<FormControlData, FormArrayData, FormChildData>;
    }
    const childFactory = childList.prependDefault() as LocalFormControlFactory | LocalFormChildFactory;

    // Do some actions after the control is added
    if (childFactory.factoryType == 'control') {

      // Wait for the controls to be initialized by angular and emitted by childFactory
      (childFactory as LocalFormControlFactory).childComponent$
        .pipe(first())
        .subscribe((childComponents: ChildComponents) => {
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

        })
    }
    else if (childFactory.factoryType === 'childFactory') {
      (childFactory as LocalFormChildFactory).childComponent$
        .pipe(first())
        .subscribe((childComponent) => {
          if (childComponent.FgTextPropertyComponent) {
            (childComponent.FgTextPropertyComponent as FgTextPropertyComponent).focusOnCtrlText()
          } else if (childComponent.FgPlaceComponent) {
            (childComponent.FgPlaceComponent as FgPlaceComponent).focusOnCtrlLat()
          } else if (childComponent.FgLangStringComponent) {
            (childComponent.FgLangStringComponent as FgLangStringComponent).focusOnCtrlText()
          }
        })
    }

  }

  ngOnDestroy() {
    if (this.formArrayFactory.config.data.removeHook) {
      this.formArrayFactory.config.data.removeHook(this.formArrayFactory.config.data)
    }
  }

}
