import { Component, OnInit, Input } from '@angular/core';
import { QfFormGroupFactory } from '../query-filter/query-filter.component';

@Component({
  selector: 'gv-qf-form-group',
  templateUrl: './qf-form-group.component.html',
  styleUrls: ['./qf-form-group.component.scss']
})
export class QfFormGroupComponent implements OnInit {

  @Input() formGroupFactory: QfFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
