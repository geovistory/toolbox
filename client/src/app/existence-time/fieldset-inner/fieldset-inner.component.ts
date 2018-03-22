import { Component, OnInit } from '@angular/core';
import { FieldsetComponent } from '../fieldset/fieldset.component';

@Component({
  selector: 'gv-fieldset-inner',
  templateUrl: '../fieldset/fieldset.component.html',
  styleUrls: ['../fieldset/fieldset.component.scss']
})
export class FieldsetInnerComponent extends FieldsetComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
    const parentField = this.fieldset.fields.inner
    const form = this.formGroup;

    // if the parent field has a value
    if(form.get(parentField.ctrlName).value){
      this.isExpanded = 'expanded';
    }
  }

}
