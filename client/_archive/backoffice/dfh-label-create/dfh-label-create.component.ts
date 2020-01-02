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
  @Input() label: DfhLabel;

  @Output() create = new EventEmitter<DfhLabel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<DfhLabel>();


  formGroup: FormGroup;
  labelCtrl: FormControl;

  constructor(fb: FormBuilder) {
    this.labelCtrl = new FormControl()
    this.formGroup = fb.group({ 'labelCtrl': this.labelCtrl })
  }

  ngOnInit() {
    if (this.label) this.labelCtrl.setValue(this.label.label)
  }

  onSubmit() {
    const l = new DfhLabel({
      pk_entity: this.label ? this.label.pk_entity : undefined,
      type: this.comFkSystemType,
      language: this.infFkLanguage,
      label: this.labelCtrl.value,
      fk_property: this.dfhFkProperty,
      fk_class: this.dfhFkClass,
    })
    this.create.emit(l)
  }

}
