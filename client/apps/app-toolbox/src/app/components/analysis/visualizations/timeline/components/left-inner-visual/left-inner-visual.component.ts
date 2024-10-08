import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitive } from '@kleiolab/lib-utils';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: '[leftInnerVisual]',
  templateUrl: './left-inner-visual.component.html',
  styleUrls: ['./left-inner-visual.component.scss'],
  standalone: true
})
export class LeftInnerVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {


  @Input('leftInnerVisual') leftInnerOnXAxis: { timePrimitive: TimePrimitive, timeline: Timeline, color: string };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.color = this.leftInnerOnXAxis.color;

    this.initTimePrimitiveVisual(this.leftInnerOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeLeftInnerVisualOnXAxis(this._element.nativeElement, this.leftInnerOnXAxis.timeline, this);
  }

}
