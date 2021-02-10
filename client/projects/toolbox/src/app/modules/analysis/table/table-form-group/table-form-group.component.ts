import { Component, Input, OnInit } from '@angular/core';
import { TableFormGroupFactory } from '../table-form/table-form.component';

@Component({
  selector: 'gv-table-form-group',
  templateUrl: './table-form-group.component.html',
  styleUrls: ['./table-form-group.component.scss']
})
export class TableFormGroupComponent implements OnInit {
  @Input() formGroupFactory: TableFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
