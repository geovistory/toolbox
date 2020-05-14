import { Component, OnInit, Input } from '@angular/core';
import { QueryPathFormControlFactory } from '../query-path-form/query-path-form.component';

@Component({
  selector: 'gv-query-path-form-control',
  templateUrl: './query-path-form-control.component.html',
  styleUrls: ['./query-path-form-control.component.scss']
})
export class QueryPathFormControlComponent implements OnInit {
  @Input() formControlFactory: QueryPathFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
