import { Directive, ElementRef, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { D3Service } from '../shared/d3.service';
import { RangeChangeEvent } from '../models/timeline';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rangeEmitterOnMouseDown]'
})
export class RangeEmitterOnMouseDownDirective implements OnInit {

  // element from which the mouse position is mesured from
  @Input() rangeEmitterOnMouseDown: HTMLElement;

  @Output() onRangeChange: EventEmitter<RangeChangeEvent> = new EventEmitter();


  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyRangeEmitterOnKeyDown(this._element.nativeElement, this.rangeEmitterOnMouseDown)
      .subscribe((event) => {
        this.onRangeChange.emit(event);
      });
  }

}
