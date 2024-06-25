import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitive } from '@kleiolab/lib-utils';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: '[leftOuterVisual]',
  templateUrl: './left-outer-visual.component.html',
  styleUrls: ['./left-outer-visual.component.scss'],
  standalone: true
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
