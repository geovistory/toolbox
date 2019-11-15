import { Component, Input, OnInit } from '@angular/core';
import { QueryPathFormGroupFactory } from '../query-path-form/query-path-form.component';

@Component({
  selector: 'gv-query-path-form-group',
  templateUrl: './query-path-form-group.component.html',
  styleUrls: ['./query-path-form-group.component.scss']
})
export class QueryPathFormGroupComponent implements OnInit {
  @Input() formGroupFactory: QueryPathFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
