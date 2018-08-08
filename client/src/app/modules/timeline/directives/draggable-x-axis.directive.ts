import { Directive, Input, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { Point } from '../models/point';
import { D3Service } from '../shared/d3.service';
import { XAxisDefinition } from '../models/x-axis-definition';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[draggableXAxis]'
})
export class DraggableXAxisDirective implements OnInit {


  @Output() onDrag: EventEmitter<any> = new EventEmitter();
  @Output() onDragStart: EventEmitter<void> = new EventEmitter();
  @Output() onDragEnd: EventEmitter<void> = new EventEmitter();

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableXAxisBehaviour(this._element.nativeElement)
      .subscribe((event) => {
        switch (event.type) {
          case 'onDrag':
            this.onDrag.emit(event.diff);
            break;
          case 'onDragStart':
            this.onDragStart.emit();
            break;
          case 'onDragEnd':
            this.onDragEnd.emit();
            break;
        }

      });
  }

}
