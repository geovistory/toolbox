
import { OnInit, OnDestroy, Directive, ElementRef, Output, EventEmitter } from '@angular/core';

declare let require: any;
const elementResizeDetectorMaker = require('element-resize-detector');

export interface DimensionChangeEvent extends Event {
  dimensions: { width: number, height: number }
}
@Directive({
    selector: '[gvDimensionChange]',
    standalone: true
})
export class DimensionChangeDirective implements OnInit, OnDestroy {

  public observer: any;
  private nativeElement;
  @Output() dimensionsChange: EventEmitter<DimensionChangeEvent> = new EventEmitter();

  constructor(public el: ElementRef) { }

  ngOnInit() {
    this.nativeElement = this.el.nativeElement;
    const event = new Event('dimensions');

    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.nativeElement, element => {
      const { offsetWidth: width, offsetHeight: height } = element;
      const dimensions = { width, height };
      event['dimensions'] = dimensions;
      this.dimensionsChange.emit(event as DimensionChangeEvent);
    })
  }

  ngOnDestroy() {
    this.observer.uninstall(this.nativeElement);
  }
};
