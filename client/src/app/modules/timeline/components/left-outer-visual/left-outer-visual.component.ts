import { Component, Input, ElementRef, OnInit, DoCheck } from '@angular/core';
import { TimePrimitive } from 'app/core';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';
import { Timeline } from '../../models/timeline';

@Component({
  selector: '[leftOuterVisual]',
  templateUrl: './left-outer-visual.component.html',
  styleUrls: ['./left-outer-visual.component.scss']
})
export class LeftOuterVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('leftOuterVisual') leftOuterOnXAxis : {timePrimitive:TimePrimitive, timeline:Timeline};

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.initTimePrimitiveVisual(this.leftOuterOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeLeftOuterVisualOnXAxis(this._element.nativeElement, this.leftOuterOnXAxis.timeline, this);
  }

}
