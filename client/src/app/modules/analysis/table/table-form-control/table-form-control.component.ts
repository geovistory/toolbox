import { Component, OnInit, Input } from '@angular/core';
import { TableFormControlFactory } from '../table-form/table-form.component';

@Component({
  selector: 'gv-table-form-control',
  templateUrl: './table-form-control.component.html',
  styleUrls: ['./table-form-control.component.scss']
})
export class TableFormControlComponent implements OnInit {
  @Input() formControlFactory: TableFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
