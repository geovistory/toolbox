import { Component, OnInit, Input } from '@angular/core';
import { FormControlFactory } from 'app/modules/form-factory/core/form-control-factory';
import { FormControlData } from '../form-create-entity/form-create-entity.component';
import { FormControlConfig } from 'app/modules/form-factory/core/form-factory.models';

@Component({
  selector: 'gv-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Input() formControlFactory: FormControlFactory<FormControlData>

  public config: FormControlConfig<FormControlData>
  constructor() { }

  ngOnInit() {
    this.config = this.formControlFactory.config
  }

}
