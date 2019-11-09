import { Component, Input, OnInit } from '@angular/core';
import { TccFormGroupFactory } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-form-group',
  templateUrl: './time-chart-cont-form-group.component.html',
  styleUrls: ['./time-chart-cont-form-group.component.scss']
})
export class TimeChartContFormGroupComponent implements OnInit {
  @Input() formGroupFactory: TccFormGroupFactory

  constructor() { }

  ngOnInit() {
  }

}
