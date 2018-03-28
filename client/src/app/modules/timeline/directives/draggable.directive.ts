import { Directive, Input, ElementRef } from '@angular/core';
import { Point } from '../models/point';
import { D3Service } from '../shared/d3.service';

@Directive({
  selector: '[draggablePoint]'
})
export class DraggableDirective {

  @Input('draggablePoint') draggablePoint: Point;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggablePoint);
  }

}
