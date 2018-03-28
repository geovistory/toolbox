import { Directive, Input, ElementRef, OnChanges } from '@angular/core';
import { Point } from '../models/point';
import { D3Service } from '../shared/d3.service';
import { XAxisDefinition } from '../models/x-axis-definition';

@Directive({
  selector: '[placeOnXAxis]'
})
export class PlaceOnXAxisDirective implements OnChanges {

  @Input('placeOnXAxis') placeOnXAxis: {point:Point, xAxis:XAxisDefinition};

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnChanges() {
    this.d3Service.placeOnXAxis(this._element.nativeElement, this.placeOnXAxis);
  }

}
