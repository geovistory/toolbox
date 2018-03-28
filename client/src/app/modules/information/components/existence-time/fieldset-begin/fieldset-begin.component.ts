import { Component, OnInit } from '@angular/core';
import { FieldsetComponent } from '../fieldset/fieldset.component';

@Component({
  selector: 'gv-fieldset-begin',
  templateUrl: '../fieldset/fieldset.component.html',
  styleUrls: ['../fieldset/fieldset.component.scss']
})
export class FieldsetBeginComponent extends FieldsetComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
    const parentField = this.fieldset.fields.beg
    const form = this.formGroup;
    const exTi = this.existenceTime;

    // if the parent field has a value
    if(form.get(parentField.ctrlName).value){
      this.isExpanded = 'expanded';
    }

    // if p82a is defined
    if(exTi.p82a){
      this.isExpanded = 'expanded';
    }

  }

}
