import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFormArrayComponent } from '../table-form-array/table-form-array.component';
import { TableFormGroupFactory } from '../table-form/table-form.component';

@Component({
  selector: 'gv-table-form-group',
  templateUrl: './table-form-group.component.html',
  styleUrls: ['./table-form-group.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, TableFormArrayComponent]
})
export class TableFormGroupComponent {
  @Input() formGroupFactory: TableFormGroupFactory
}
