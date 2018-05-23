import { Component, OnInit } from '@angular/core';
import { FieldsetComponent } from '../fieldset/fieldset.component';
import { TimePrimitive } from 'app/core';

@Component({
  selector: 'gv-fieldset-begin',
  templateUrl: './fieldset-begin.component.html',
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
    if (form.get(parentField.ctrlName).value) {
      this.isExpanded = 'expanded';
    }

    // if p82a is defined
    if (exTi.p82a) {
      this.isExpanded = 'expanded';
    }

    if(exTi.p81a) {
      this.fieldset.fields.endBeg.visible = true;
    }

    if(exTi.p82a) {
      this.fieldset.fields.begBeg.visible = true;
    }
  }


  add82aFrom81a() {
    this.existenceTime.p82a = new TimePrimitive(this.existenceTime.p81a);
    this.fieldset.fields.begBeg.state = 'edit';
  }

  add81aFrom82a() {
    this.existenceTime.p81a = new TimePrimitive(this.existenceTime.p82a);
    this.fieldset.fields.endBeg.state = 'edit';
  }

  from82To82a82b() {
    delete this.existenceTime.p82;
    this.existenceTime.p82a = new TimePrimitive(this.existenceTime.p82);
    this.existenceTime.p82b = new TimePrimitive(this.existenceTime.p82);
    // this.fieldset.fields.begBeg.state = 'edit';
    this.fieldset.fields.begBeg.isImplicit = false;
  }

}
