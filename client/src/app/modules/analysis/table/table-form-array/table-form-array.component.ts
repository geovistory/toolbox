import { Component, Input, OnInit } from '@angular/core';
import { ColDef, ColDefDefaultType } from '../../../../../../../src/query/col-def';
import { TableFormArrayFactory } from '../table-form/table-form.component';
import { TableFormService } from '../table-form/table-form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gv-table-form-array',
  templateUrl: './table-form-array.component.html',
  styleUrls: ['./table-form-array.component.scss']
})
export class TableFormArrayComponent implements OnInit {
  @Input() formArrayFactory: TableFormArrayFactory;

  constructor(private t: TableFormService) { }

  ngOnInit() {
    console.log(this.formArrayFactory.children)
  }

  /**
   * adds a new columnConfig
   */
  addPathColumn() {
    const colDef: ColDef = { label: 'New Column' }
    const conf = this.t.columnConfig(colDef)
    this.formArrayFactory.append(conf)
  }
  /**
   * removes lineConfig with given index
   */
  removeColumn(index: number) {
    this.formArrayFactory.remove(index)
  }

  addDefaultColumn(defaultType: ColDefDefaultType) {
    const colDef: ColDef = {
      defaultType,
      label: this.getLabelForDefaulType(defaultType),
      ofRootTable: true
    }
    const conf = this.t.columnConfig(colDef)
    this.formArrayFactory.append(conf)
  }

  getLabelForDefaulType(defaultType?: ColDefDefaultType): string {
    if (defaultType === 'entity_preview') {

      return 'Entity Preview Column'
    }

    else if (defaultType === 'class_label') {

      return 'Class Label Column'
    }

    else if (defaultType === 'type_label') {

      return 'Type Label Column'
    }

    else if (defaultType === 'entity_label') {

      return 'Entity Label Column'

    }
    else {

      return 'Custom Column'

    }
  }

  columnDropped(event: CdkDragDrop<any>) {
    this.formArrayFactory.moveItemInArray(event.previousIndex, event.currentIndex);
  }

}
