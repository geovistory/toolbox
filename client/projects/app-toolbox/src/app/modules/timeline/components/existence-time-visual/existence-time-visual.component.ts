/// <reference path="../../../../../../../../node_modules/@types/color/index.d.ts" />
import { Component, DoCheck, Input } from '@angular/core';
import { TimeSpanUtil } from "@kleiolab/lib-utils";
import Color from 'color';
import { Timeline } from '../../models/timeline';


@Component({
  selector: '[existenceTimeVisual]',
  templateUrl: './existence-time-visual.component.html',
  styleUrls: ['./existence-time-visual.component.scss']
})
export class ExistenceTimeVisualComponent implements DoCheck {

  timeline: Timeline;
  innerColor: string;
  outerColor: string;

  inner: { start: number, end: number, color: string };

  outer: { start: number, end: number, color: string };

  @Input('existenceTimeVisual') existenceTimeOnXAxis: {
    existenceTime: TimeSpanUtil,
    timeline: Timeline,
    color: string
  };

  constructor() { }

  ngDoCheck() {
    this.timeline = this.existenceTimeOnXAxis.timeline;

    const newColor = this.existenceTimeOnXAxis.color || Timeline.DEFAULT_COLOR;
    if (this.innerColor !== newColor) {
      this.innerColor = newColor;
      this.outerColor = Color(this.innerColor).lighten(0.5).hex()
    }

    this.createInnerRectangle();
    this.createOuterRectangle();
  }

  createInnerRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p81a && et.p81b) {
      this.inner = {
        start: et.p81a.getJulianSecond(),
        end: et.p81b.getJulianSecond(),
        color: this.innerColor
      };
    }
    if (et.p81) {
      this.inner = {
        start: et.p81.getJulianSecond(),
        end: et.p81.getLastSecond(),
        color: this.innerColor
      };
    }
  }


  createOuterRectangle() {
    const et = this.existenceTimeOnXAxis.existenceTime;
    if (et.p82a && et.p82b) {
      this.outer = {
        start: et.p82a.getJulianSecond(),
        end: et.p82b.getLastSecond(),
        color: this.outerColor
      };

    }
    if (et.p82) {
      this.outer = {
        start: et.p82.getJulianSecond(),
        end: et.p82.getLastSecond(),
        color: this.outerColor
      };
    }
  }
}
