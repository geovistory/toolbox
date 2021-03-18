import { Component, Input, ElementRef, OnInit, DoCheck } from '@angular/core';
import { TimePrimitive } from '@kleiolab/lib-utils';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';

@Component({
  selector: '[rightOuterVisual]',
  templateUrl: './right-outer-visual.component.html',
  styleUrls: ['./right-outer-visual.component.scss']
})
export class RightOuterVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('rightOuterVisual') rightOuterOnXAxis: { timePrimitive: TimePrimitive, timeline: Timeline, color: string };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.color = this.rightOuterOnXAxis.color;

    this.initTimePrimitiveVisual(this.rightOuterOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeRightOuterVisualOnXAxis(this._element.nativeElement, this.rightOuterOnXAxis.timeline, this);
  }

}
