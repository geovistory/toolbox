import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlConfig } from 'projects/app-toolbox/src/app/modules/form-factory/services/FormControlConfig';
import { QfFormControlData, QfFormControlFactory } from '../query-filter/query-filter.component';

@Component({
  selector: 'gv-qf-form-control',
  templateUrl: './qf-form-control.component.html',
  styleUrls: ['./qf-form-control.component.scss']
})
export class QfFormControlComponent implements OnInit {

  @Input() formControlFactory: QfFormControlFactory;
  config: FormControlConfig<QfFormControlData>
  rootFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.rootFormGroup = this.formControlFactory.globalConfig.root.control;

    this.config = this.formControlFactory.config
  }

}
