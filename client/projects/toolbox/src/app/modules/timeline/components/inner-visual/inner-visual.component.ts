import { Component, Input, ElementRef, OnInit, DoCheck } from '@angular/core';
import { TimePrimitive } from "projects/toolbox/src/app/core/date-time";
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';

@Component({
  selector: '[innerVisual]',
  templateUrl: './inner-visual.component.html',
  styleUrls: ['./inner-visual.component.scss']
})
export class InnerVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('innerVisual') innerOnXAxis: { startEnd: { start: number, end: number, color: string }, timeline: Timeline };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.startDate = this.innerOnXAxis.startEnd.start;
    this.endDate = this.innerOnXAxis.startEnd.end;
    this.color = this.innerOnXAxis.startEnd.color;
  }

  ngDoCheck() {

    this.d3Service.placeInnerVisualOnXAxis(this._element.nativeElement, this.innerOnXAxis.timeline, this);
  }

}
