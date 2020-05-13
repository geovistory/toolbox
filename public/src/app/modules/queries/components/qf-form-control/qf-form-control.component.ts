import { Component, OnInit, Input } from '@angular/core';
import { QfFormControlFactory, QfFormControlData } from '../query-filter/query-filter.component';
import { FormControlConfig } from 'app/modules/form-factory/services/form-factory.service';
import { FormControl, FormGroup } from '@angular/forms';

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
