import { Component, OnInit, Input, HostBinding, OnDestroy } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormArrayData, LocalNodeConfig, FormControlData, LocalFormArrayFactory, LocalFormControlFactory } from '../form-create-entity/form-create-entity.component';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormArrayConfig, FormControlConfig } from 'app/modules/form-factory/services/form-factory.service';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
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
      const c = child as LocalFormControlFactory
      if (c.config.data.controlType !== 'ctrl-target-class') {
        return true
      }
    }
    return false
  }

  isCtrlTargetClass(child: LocalFormArrayFactory | LocalFormControlFactory) {
    if (child.factoryType === 'control') {
      const c = child as LocalFormControlFactory
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

  get showRemoveBtn() {
    return (this.itemNumberFlexible || this.isTemporalEntityList)
  }

  get paddingLeft() {
    return this.showTitle ? this.titleLevel * 15 : 0
  }

  get showTitle() {
    return this.formArrayFactory.config.isList; // this.itemNumberFlexible || this.isTemporalEntityList
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

  constructor() { }

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

  ngOnDestroy() {
    if (this.formArrayFactory.config.data.removeHook) {
      this.formArrayFactory.config.data.removeHook(this.formArrayFactory.config.data)
    }
  }

}
