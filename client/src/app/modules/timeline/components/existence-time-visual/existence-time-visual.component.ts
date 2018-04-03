import { Component, OnInit, Input } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { TimePrimitive } from '../../../../core';

@Component({
  selector: '[existenceTimeVisual]',
  templateUrl: './existence-time-visual.component.html',
  styleUrls: ['./existence-time-visual.component.scss']
})
export class ExistenceTimeVisualComponent implements OnInit {

  inner: { start: Date, end: Date };

  outer: { start: Date, end: Date };

  @Input('existenceTimeVisual') existenceTimeOnXAxis: { existenceTime: ExistenceTime, xAxis: XAxisDefinition };

  constructor() { }

  ngOnInit() {
    this.createInnerRectangle();
    this.createOuterRectangle();
  }

  createInnerRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p81a && et.p81b) {
      this.inner = {
        start : et.p81a.getEndDate(),
        end : et.p81b.getDate(),
      };
    }
    if (et.p81) {
      this.inner = {
        start : et.p81.getDate(),
        end : et.p81.getEndDate(),
      };
    }
  }


  createOuterRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p82a && et.p82b) {
      this.outer = {
        start : et.p82a.getDate(),
        end : et.p82b.getEndDate(),
      };

    }
    if (et.p82) {
      this.outer = {
        start : et.p82.getDate(),
        end : et.p82.getEndDate(),
      };
    }
  }
}
