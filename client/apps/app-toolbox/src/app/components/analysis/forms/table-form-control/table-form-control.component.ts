import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClassAndTypeSelectComponent } from '../class-and-type-select/class-and-type-select.component';
import { TableFormControlFactory } from '../table-form/table-form.component';

@Component({
  selector: 'gv-table-form-control',
  templateUrl: './table-form-control.component.html',
  styleUrls: ['./table-form-control.component.scss'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, ClassAndTypeSelectComponent, AsyncPipe]
})
export class TableFormControlComponent {
  @Input() formControlFactory: TableFormControlFactory;
}
