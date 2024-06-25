import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassAndTypeSelectComponent } from '../../class-and-type-select/class-and-type-select.component';
import { PropertySelectComponent } from '../../property-select/property-select.component';
import { QueryPathFormControlFactory } from '../query-path-form/query-path-form.component';

@Component({
  selector: 'gv-query-path-form-control',
  templateUrl: './query-path-form-control.component.html',
  styleUrls: ['./query-path-form-control.component.scss'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, ClassAndTypeSelectComponent, FormsModule, ReactiveFormsModule, PropertySelectComponent, AsyncPipe]
})
export class QueryPathFormControlComponent {
  @Input() formControlFactory: QueryPathFormControlFactory;
}
