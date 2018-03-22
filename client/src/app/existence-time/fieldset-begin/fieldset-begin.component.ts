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
  }

}
