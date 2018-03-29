import { Component, Input, ElementRef, OnInit, DoCheck } from '@angular/core';
import { TimePrimitive } from 'app/core';
import { XAxisDefinition } from '../../models/x-axis-definition';
import { D3Service } from '../../shared/d3.service';
import { TimePrimitiveVisual } from '../../models/time-primitive-visual';

@Component({
  selector: '[rightInnerVisual]',
  templateUrl: './right-inner-visual.component.html',
  styleUrls: ['./right-inner-visual.component.scss']
})
export class RightInnerVisualComponent extends TimePrimitiveVisual implements OnInit, DoCheck {

  @Input('rightInnerVisual') rightInnerOnXAxis : {timePrimitive:TimePrimitive, xAxis:XAxisDefinition};

  constructor(d3Service: D3Service, _element: ElementRef) {
    super(d3Service, _element)
  }

  ngOnInit(): void {
    this.initTimePrimitiveVisual(this.rightInnerOnXAxis)
  }

  ngDoCheck() {

    this.d3Service.placeRightInnerVisualOnXAxis(this._element.nativeElement, this.rightInnerOnXAxis.xAxis, this);
  }

}
