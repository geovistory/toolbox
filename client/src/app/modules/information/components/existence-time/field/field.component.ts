import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from './field';
import { Fieldset } from '../fieldset/fieldset';

@Component({
  selector: 'gv-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;

  @Input() field: Field

  @Input() fieldset: Fieldset

  @Output() onEdit: EventEmitter<{ field: Field, fieldset: Fieldset }> = new EventEmitter();
  @Output() onRemove: EventEmitter<{ field: Field, fieldset: Fieldset }> = new EventEmitter();
  @Output() onCancel: EventEmitter<{ field: Field, fieldset: Fieldset }> = new EventEmitter();
  @Output() onSubmit: EventEmitter<{ field: Field, fieldset: Fieldset }> = new EventEmitter();

  state: 'explicit' | 'implicit' | 'noData' | 'addBtn';

  constructor() { }

  ngOnChanges() {


    /**
     * If the field has no value, set state to addBtn
     */
    if ((!this.field.isImplicit && this.formGroup.get(this.field.ctrlName).value) || this.field.state === 'edit') {

      this.state = 'implicit';
    }

  }




}
