import { Component, OnInit } from '@angular/core';
import { FieldsetComponent } from '../fieldset/fieldset.component';

@Component({
  selector: 'gv-fieldset-outer',
  templateUrl: '../fieldset/fieldset.component.html',
  styleUrls: ['../fieldset/fieldset.component.scss']
})
export class FieldsetOuterComponent extends FieldsetComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
    const parentField = this.fieldset.fields.outer
    const form = this.formGroup;

    // if the parent field has a value
    if(form.get(parentField.ctrlName).value){
      this.isExpanded = 'expanded';
    }
  }

}
