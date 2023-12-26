import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControlConfig } from '../../../../lib/form-factory/types/FormControlConfig';
import { ClassAndTypeSelectComponent } from '../class-and-type-select/class-and-type-select.component';
import { PropertySelectComponent } from '../property-select/property-select.component';
import { QfFormControlData, QfFormControlFactory } from '../query-filter/query-filter.component';

@Component({
  selector: 'gv-qf-form-control',
  templateUrl: './qf-form-control.component.html',
  styleUrls: ['./qf-form-control.component.scss'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, ClassAndTypeSelectComponent, FormsModule, ReactiveFormsModule, MatSelectModule, NgFor, MatOptionModule, PropertySelectComponent, MatInputModule, AsyncPipe]
})
export class QfFormControlComponent implements OnInit {

  @Input() formControlFactory: QfFormControlFactory;
  config: FormControlConfig<QfFormControlData>
  rootFormGroup: UntypedFormGroup;

  constructor() { }

  ngOnInit() {
    this.rootFormGroup = this.formControlFactory.globalConfig.root.formGroup;

    this.config = this.formControlFactory.config
  }

}
