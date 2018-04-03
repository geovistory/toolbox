import { Component, Input, ElementRef, OnInit, DoCheck } from '@angular/core';
import { TimePrimitive } from 'app/core';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';

@Component({
  selector: '[outerVisual]',
  templateUrl: './outer-visual.component.html',
  styleUrls: ['./outer-visual.component.scss']
})
export class OuterVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('outerVisual') outerOnXAxis: { startEnd: { start: Date, end: Date }, xAxis: XAxisDefinition };

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.startDate = this.outerOnXAxis.startEnd.start;
    this.endDate = this.outerOnXAxis.startEnd.end;
  }

  ngDoCheck() {

    this.d3Service.placeOuterVisualOnXAxis(this._element.nativeElement, this.outerOnXAxis.xAxis, this);
  }

} 
