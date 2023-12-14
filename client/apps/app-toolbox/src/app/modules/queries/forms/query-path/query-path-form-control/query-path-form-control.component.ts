import { Component, OnInit, Input } from '@angular/core';
import { QueryPathFormControlFactory } from '../query-path-form/query-path-form.component';
import { PropertySelectComponent } from '../../../components/property-select/property-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassAndTypeSelectComponent } from '../../../components/class-and-type-select/class-and-type-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-query-path-form-control',
    templateUrl: './query-path-form-control.component.html',
    styleUrls: ['./query-path-form-control.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, ClassAndTypeSelectComponent, FormsModule, ReactiveFormsModule, PropertySelectComponent, AsyncPipe]
})
export class QueryPathFormControlComponent implements OnInit {
  @Input() formControlFactory: QueryPathFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
