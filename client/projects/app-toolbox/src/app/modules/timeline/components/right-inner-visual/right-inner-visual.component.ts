import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitive } from '@kleiolab/lib-utils';

import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';

@Component({
  selector: '[rightInnerVisual]',
  templateUrl: './right-inner-visual.component.html',
  styleUrls: ['./right-inner-visual.component.scss']
})
export class RightInnerVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('rightInnerVisual') rightInnerOnXAxis: { timePrimitive: TimePrimitive, timeline: Timeline, color: string };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.color = this.rightInnerOnXAxis.color;

    this.initTimePrimitiveVisual(this.rightInnerOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeRightInnerVisualOnXAxis(this._element.nativeElement, this.rightInnerOnXAxis.timeline, this);
  }

}
