import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { equals } from 'ramda';
import { FormArrayData, FormControlData, FormCreateEntityComponent, LocalFormArrayFactory, LocalFormControlFactory, LocalNodeConfig } from '../form-create-entity/form-create-entity.component';
import { FieldDefinition, ListDefinition } from '../properties-tree/properties-tree.models';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit, OnDestroy {

  @Input() formArrayFactory: LocalFormArrayFactory


  wrapInCard(child: LocalFormArrayFactory | LocalFormControlFactory) {
    if (child.factoryType !== 'array') return false
    else {
      const c = child as LocalFormArrayFactory
      return (
        c.config.data.fieldDefinition.listType === 'temporal-entity' &&
        c.config.isList === false
      )
    }
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

  isField() {
    return this.formArrayFactory.config.data.fieldDefinition &&
      !this.formArrayFactory.config.data.listDefinition &&
      this.formArrayFactory.config.data.fieldDefinition.targetClasses &&
      this.formArrayFactory.config.data.fieldDefinition.targetClasses.length > 0
  }


  get showAddBtn() {
    return (
      (
        this.formArrayFactory.config.maxLength > this.formArrayFactory.children.length
      )
    )
  }

  get showRemoveBtn() {
    return (this.itemNumberFlexible || this.isTemporalEntityList)
  }

  get paddingLeft() {
    return this.showTitle ? this.titleLevel * 15 : 0
  }

  get showTitle() {
    return this.formArrayFactory.config.isList && !this.formArrayFactory.config.data.hideFieldTitle;
  }

  get isTemporalEntityList() {
    return (this.formArrayFactory.config.isList &&
      this.formArrayFactory.config.data.fieldDefinition.listType === 'temporal-entity')
  }

  get itemNumberFlexible() {
    return (this.formArrayFactory.config.isList &&
      this.formArrayFactory.config.maxLength !== 1 &&
      this.formArrayFactory.config.maxLength !== undefined)
  }

  get titleLevel(): number {
    return this.formArrayFactory.level
  }

  ctrlTargetClassIsDisabled(configs: LocalNodeConfig[]) {
    // disable if no config is not disabled
    return !configs.some(c => !c.disabled)
  }

  constructor(private formCreateEntity: FormCreateEntityComponent) { }

  ngOnInit() {
  }

  add() {
    this.formArrayFactory.onAdd()
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
  addItemInChildListDef(fDef: FieldDefinition, lDef: ListDefinition, i: number) {
    const childList = this.formArrayFactory.children.find(c => equals(c.config.data.listDefinition, lDef));
    if (childList && childList.factoryType == 'array') {
      const list = childList as FormArrayFactory<FormControlData, FormArrayData>;
      list.onAdd()
    }
    else {
      const config = this.formCreateEntity.getListNode('temporal-entity', fDef, lDef, false, undefined)
      const index = i + 1
      this.formArrayFactory.add(index, config)
      const list = this.formArrayFactory.children[index] as FormArrayFactory<FormControlData, FormArrayData>;
      list.onAdd()
    }
  }

  ngOnDestroy() {
    if (this.formArrayFactory.config.data.removeHook) {
      this.formArrayFactory.config.data.removeHook(this.formArrayFactory.config.data)
    }
  }

}
