import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitive } from 'app/core/date-time/time-primitive';

@Component({
  selector: '[leftOuterVisual]',
  templateUrl: './left-outer-visual.component.html',
  styleUrls: ['./left-outer-visual.component.scss']
})
export class LeftOuterVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('leftOuterVisual') leftOuterOnXAxis: { timePrimitive: TimePrimitive, timeline: Timeline, color: string };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.color = this.leftOuterOnXAxis.color;

    this.initTimePrimitiveVisual(this.leftOuterOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeLeftOuterVisualOnXAxis(this._element.nativeElement, this.leftOuterOnXAxis.timeline, this);
  }

}
