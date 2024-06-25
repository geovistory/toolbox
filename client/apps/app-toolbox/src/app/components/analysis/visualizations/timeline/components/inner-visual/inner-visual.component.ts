import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../services/d3.service';

@Component({
  selector: '[innerVisual]',
  templateUrl: './inner-visual.component.html',
  styleUrls: ['./inner-visual.component.scss'],
  standalone: true
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
