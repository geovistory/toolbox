import { Component, OnInit } from '@angular/core';
import { FieldsetComponent } from '../fieldset/fieldset.component';

@Component({
  selector: 'gv-fieldset-end',
  templateUrl: '../fieldset/fieldset.component.html',
  styleUrls: ['../fieldset/fieldset.component.scss']
})
export class FieldsetEndComponent extends FieldsetComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
    const parentField = this.fieldset.fields.end
    const form = this.formGroup;
    const exTi = this.existenceTime;

    // if the parent field has a value
    if(form.get(parentField.ctrlName).value){
      this.isExpanded = 'expanded';
    }

    // if p82b is defined
    if(exTi.p82b){
      this.isExpanded = 'expanded';
    }

  }

}
