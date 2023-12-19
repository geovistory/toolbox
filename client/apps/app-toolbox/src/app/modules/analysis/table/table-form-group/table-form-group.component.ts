import { Component, Input, OnInit } from '@angular/core';
import { TableFormGroupFactory } from '../table-form/table-form.component';
import { TableFormArrayComponent } from '../table-form-array/table-form-array.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-table-form-group',
    templateUrl: './table-form-group.component.html',
    styleUrls: ['./table-form-group.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, TableFormArrayComponent]
})
export class TableFormGroupComponent implements OnInit {
  @Input() formGroupFactory: TableFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
