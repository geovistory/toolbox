import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlConfig } from '../../../../modules/form-factory/services/FormControlConfig';
import { QfFormControlData, QfFormControlFactory } from '../query-filter/query-filter.component';
import { MatInputModule } from '@angular/material/input';
import { PropertySelectComponent } from '../property-select/property-select.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ClassAndTypeSelectComponent } from '../class-and-type-select/class-and-type-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

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
