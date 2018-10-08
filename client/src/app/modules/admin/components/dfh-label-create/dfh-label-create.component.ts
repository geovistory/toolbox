import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DfhLabel } from 'app/core';

@Component({
  selector: 'gv-dfh-label-create',
  templateUrl: './dfh-label-create.component.html',
  styleUrls: ['./dfh-label-create.component.scss']
})
export class DfhLabelCreateComponent implements OnInit {
  @Input() dfhFkProperty: number;
  @Input() dfhFkClass: number;
  @Input() infFkLanguage: number;
  @Input() comFkSystemType: number;

  @Output() create = new EventEmitter<DfhLabel>();
  @Output() cancel = new EventEmitter<void>();


  formGroup: FormGroup;
  labelCtrl: FormControl;

  constructor(fb: FormBuilder) {
    this.labelCtrl = new FormControl()
    this.formGroup = fb.group({ 'labelCtrl': this.labelCtrl })
  }

  ngOnInit() {
  }

  onSubmit() {
    const l = new DfhLabel({
      com_fk_system_type: this.comFkSystemType,
      inf_fk_language: this.infFkLanguage,
      dfh_label: this.labelCtrl.value,
      dfh_fk_property: this.dfhFkProperty,
      dfh_fk_class: this.dfhFkClass,
    })
    this.create.emit(l)
  }

}
