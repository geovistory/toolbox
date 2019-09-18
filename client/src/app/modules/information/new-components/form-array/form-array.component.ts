import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormArrayFactory } from 'app/modules/form-factory/core/form-array-factory';
import { FormArrayData } from '../form-create-entity/form-create-entity.component';

@Component({
  selector: 'gv-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  @Input() formArrayFactory: FormArrayFactory<FormArrayData>



  get showAddBtn() {
    return (
      (
        this.formArrayFactory.config.maxLength > this.formArrayFactory.children.length
      )
    )
  }

  get showRemoveBtn() {
    return this.itemNumberFlexible || this.isTemporalEntityList
  }

  get paddingLeft() {
    return this.showTitle ? this.titleLevel * 15 : 0
  }

  get showTitle() {
    return this.itemNumberFlexible || this.isTemporalEntityList
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

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.formArrayFactory.onAdd()
  }
  remove(i) {
    this.formArrayFactory.onRemove(i)
  }

}
