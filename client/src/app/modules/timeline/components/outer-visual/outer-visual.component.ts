import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';
import { D3Service } from '../../shared/d3.service';

@Component({
  selector: '[outerVisual]',
  templateUrl: './outer-visual.component.html',
  styleUrls: ['./outer-visual.component.scss']
})
export class OuterVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('outerVisual') outerOnXAxis: { startEnd: { start: number, end: number, color: string }, timeline: Timeline };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.startDate = this.outerOnXAxis.startEnd.start;
    this.endDate = this.outerOnXAxis.startEnd.end;
    this.color = this.outerOnXAxis.startEnd.color;
  }

  ngDoCheck() {

    this.d3Service.placeOuterVisualOnXAxis(this._element.nativeElement, this.outerOnXAxis.timeline, this);
  }

} 
