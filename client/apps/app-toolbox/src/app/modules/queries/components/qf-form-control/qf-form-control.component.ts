import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormControlConfig } from '../../../../modules/form-factory/services/FormControlConfig';
import { QfFormControlData, QfFormControlFactory } from '../query-filter/query-filter.component';

@Component({
  selector: 'gv-qf-form-control',
  templateUrl: './qf-form-control.component.html',
  styleUrls: ['./qf-form-control.component.scss']
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