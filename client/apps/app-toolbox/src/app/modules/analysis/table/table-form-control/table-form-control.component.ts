import { Component, OnInit, Input } from '@angular/core';
import { TableFormControlFactory } from '../table-form/table-form.component';
import { ClassAndTypeSelectComponent } from '../../../queries/components/class-and-type-select/class-and-type-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-table-form-control',
    templateUrl: './table-form-control.component.html',
    styleUrls: ['./table-form-control.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, ClassAndTypeSelectComponent, AsyncPipe]
})
export class TableFormControlComponent implements OnInit {
  @Input() formControlFactory: TableFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
