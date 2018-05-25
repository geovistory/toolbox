import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ExistenceTime } from '../../../information/components/existence-time';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { TimePrimitive } from '../../../../core';
import { Timeline } from '../../models/timeline';

@Component({
  selector: '[existenceTimeVisual]',
  templateUrl: './existence-time-visual.component.html',
  styleUrls: ['./existence-time-visual.component.scss']
})
export class ExistenceTimeVisualComponent implements DoCheck {

  timeline:Timeline;

  inner: { start: number, end: number };

  outer: { start: number, end: number };

  @Input('existenceTimeVisual') existenceTimeOnXAxis: { existenceTime: ExistenceTime, timeline: Timeline };

  constructor() { }

  ngDoCheck() {
    this.timeline = this.existenceTimeOnXAxis.timeline;

    this.createInnerRectangle();
    this.createOuterRectangle();
  }

  createInnerRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p81a && et.p81b) {
      this.inner = {
        start : et.p81a.getJulianSecond(),
        end : et.p81b.getJulianSecond(),
      };
    }
    if (et.p81) {
      this.inner = {
        start : et.p81.getJulianSecond(),
        end : et.p81.getLastSecond(),
      };
    }
  }


  createOuterRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p82a && et.p82b) {
      this.outer = {
        start : et.p82a.getJulianSecond(),
        end : et.p82b.getLastSecond(),
      };

    }
    if (et.p82) {
      this.outer = {
        start : et.p82.getJulianSecond(),
        end : et.p82.getLastSecond(),
      };
    }
  }
}
