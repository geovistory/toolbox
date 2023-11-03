import { Component, OnInit, Input } from '@angular/core';
import { FormGroupFactory } from '../../../../modules/form-factory/core/form-group-factory';


@Component({
  selector: 'gv-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  @Input() formGroupFactory: FormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
