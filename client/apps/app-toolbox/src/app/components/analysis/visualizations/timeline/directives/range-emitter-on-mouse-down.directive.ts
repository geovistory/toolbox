import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeChangeEvent } from '../models/timeline';
import { D3Service } from '../services/d3.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rangeEmitterOnMouseDown]',
  standalone: true
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
