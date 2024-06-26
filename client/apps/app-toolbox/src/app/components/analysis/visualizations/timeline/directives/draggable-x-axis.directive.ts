import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { D3Service } from '../services/d3.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[draggableXAxis]',
  standalone: true
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
