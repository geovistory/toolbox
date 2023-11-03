import { Component, OnInit, Input } from '@angular/core';
import { TccFormControlFactory } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-form-control',
  templateUrl: './time-chart-cont-form-control.component.html',
  styleUrls: ['./time-chart-cont-form-control.component.scss']
})
export class TimeChartContFormControlComponent implements OnInit {
  @Input() formControlFactory: TccFormControlFactory;

  constructor() { }

  ngOnInit() {
  }

}
