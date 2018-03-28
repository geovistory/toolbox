import { Directive, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Point } from '../models/point';
import { D3Service } from '../shared/d3.service';
import { XAxisDefinition } from '../models/x-axis-definition';

@Directive({
  selector: '[draggableXAxis]'
})
export class DraggableXAxisDirective {


  @Output() onDrag: EventEmitter<any> = new EventEmitter();

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableXAxisBehaviour(this._element.nativeElement)
    .subscribe((domain)=>{

      this.onDrag.emit(domain);

    });
  }

}
