import { Component, Input, OnInit } from '@angular/core';
import { lineConfig, TccFormArrayFactory } from '../time-chart-cont-form/time-chart-cont-form.component';

@Component({
  selector: 'gv-time-chart-cont-form-array',
  templateUrl: './time-chart-cont-form-array.component.html',
  styleUrls: ['./time-chart-cont-form-array.component.scss']
})
export class TimeChartContFormArrayComponent implements OnInit {
  @Input() formArrayFactory: TccFormArrayFactory;

  constructor() { }

  ngOnInit() {
    console.log(this.formArrayFactory.children)
  }

  /**
   * adds a new lineConfig
   */
  addLine() {
    this.formArrayFactory.append(lineConfig())
  }
  /**
   * removes lineConfig with given index
   */
  removeLine(index: number) {
    this.formArrayFactory.remove(index)
  }

}
